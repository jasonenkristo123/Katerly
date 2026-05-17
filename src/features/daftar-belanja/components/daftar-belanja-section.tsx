"use client";

import { useState } from "react";
import { ClipboardList, Search, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

import ShoppingRecipeCard from "./shopping-recipe-card";
import ShoppingSummaryCard from "./shopping-summary-card";
import ShoppingChecklist from "./shopping-checklist";
import PaginationPage from "@/shared/components/reusable/PaginationPage";
import {
  useShoppingLists,
  useDeleteShoppingList,
  useUpdateItemStatus,
} from "../hooks/useShoppingList";

import {
  ShoppingListItem,
  ShoppingListResponse,
} from "../schemas/shoppingListSchema";

// Shape internal untuk komponen
interface ShoppingRecipe {
  id: number;
  nama: string;
  bahanCount: number;
  totalHarga: number;
  tanggal: string;
  items: ShoppingListItem[];
}

// ==========================================
// HELPER: FORMAT TANGGAL
// ==========================================

function formatTanggal(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ==========================================
// KOMPONEN UTAMA
// ==========================================

export default function DaftarBelanjaSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: apiResponse, isLoading } = useShoppingLists();
  const { mutate: deleteShoppingList } = useDeleteShoppingList();

  const [selectedRecipe, setSelectedRecipe] = useState<ShoppingRecipe | null>(
    null,
  );
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  // Mapping data API ke shape internal
  const recipes: ShoppingRecipe[] = apiResponse?.data
    ? apiResponse.data
        .map((item: ShoppingListResponse) => ({
          id: item.shoppingListId,
          nama: item.namaResep?.join(", ") || "Daftar Belanja",
          bahanCount: item.items?.length ?? 0,
          totalHarga: item.totalHarga ?? 0,
          tanggal: formatTanggal(item.createdAt),
          items: item.items || [],
        }))
        .sort((a: ShoppingRecipe, b: ShoppingRecipe) => b.id - a.id) // Terbaru di depan
    : [];

  // Filter pencarian
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.nama.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

  if (currentPage !== safePage) {
    setCurrentPage(safePage);
  }

  const paginatedRecipes = filteredRecipes.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  const { mutate: updateItemStatus } = useUpdateItemStatus();

  // Handlers
  function handleToggleIngredient(id: number) {
    const isCurrentlyChecked = checkedItems.includes(id);
    const newStatus = !isCurrentlyChecked;

    // Optimistic UI update
    setCheckedItems((prev) =>
      isCurrentlyChecked ? prev.filter((item) => item !== id) : [...prev, id],
    );

    // Backend update
    updateItemStatus({ itemId: id, isBought: newStatus });
  }

  function handleDeleteConfirm(id: number, nama: string) {
    Swal.fire({
      title: "Hapus Daftar Belanja?",
      text: `Apakah Anda yakin ingin menghapus daftar belanja "${nama}"? Tindakan ini tidak dapat dibatalkan.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteShoppingList(id, {
          onSuccess: () => {
            Swal.fire({
              icon: "success",
              title: "Berhasil Dihapus!",
              text: `Daftar belanja "${nama}" telah dihapus.`,
              timer: 2000,
              showConfirmButton: false,
            });
          },
          onError: () => {
            Swal.fire({
              icon: "error",
              title: "Gagal Menghapus",
              text: "Terjadi kesalahan saat menghapus daftar belanja.",
              confirmButtonColor: "#EF4444",
            });
          },
        });
      }
    });
  }

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-poppins-700 text-black">Daftar Belanja</h1>
        <p className="text-graytext-secondary mt-2">
          Berisi daftar belanja anda yang dapat menjadi catatan belanja anda
        </p>
      </div>

      {/* DETAIL MODE */}
      {selectedRecipe && (
        <div className="space-y-8">
          {/* Top */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-poppins-700 text-black">
                {selectedRecipe.nama}
              </h2>
              <p className="text-graytext-secondary mt-1">
                Breakdown bahan belanja
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedRecipe(null);
                setCheckedItems([]);
              }}
              className="
                px-6 py-3
                rounded-2xl
                border border-gray-300
                hover:bg-gray-100
                transition-all
                cursor-pointer
              "
            >
              Kembali
            </button>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <ShoppingSummaryCard
              title="TOTAL ESTIMASI HARGA"
              value={`Rp ${selectedRecipe.totalHarga.toLocaleString("id-ID")}`}
              subtitle={`Untuk ${selectedRecipe.bahanCount} bahan`}
            />

            <ShoppingSummaryCard
              title="PROGRESS BELANJA"
              value={`${checkedItems.length}/${selectedRecipe.bahanCount}`}
              subtitle={
                checkedItems.length === 0
                  ? "Belum ada checklist"
                  : `${checkedItems.length} bahan selesai dibeli`
              }
            />

            <ShoppingSummaryCard
              title="TANGGAL DIBUAT"
              value={selectedRecipe.tanggal}
              subtitle="Daftar belanja resep"
            />
          </div>

          {/* Checklist */}
          {selectedRecipe.items.length > 0 ? (
            <ShoppingChecklist
              ingredients={selectedRecipe.items}
              checkedItems={checkedItems}
              onToggle={handleToggleIngredient}
            />
          ) : (
            <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm">
              <p className="text-graytext-secondary font-poppins-400">
                Belum ada item bahan baku dalam daftar belanja ini.
              </p>
            </div>
          )}
        </div>
      )}

      {/* LIST MODE */}
      {!selectedRecipe && (
        <>
          {/* Search */}
          <div className="mb-8">
            <div className="relative w-full max-w-sm">
              <Search
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-graytext-secondary
                "
                size={20}
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari Daftar Belanja..."
                className="
                  w-full
                  pl-12
                  pr-6
                  py-3
                  border
                  border-gray-300
                  rounded-full
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-primary/10
                  focus:border-green-primary
                  transition-all
                  font-poppins-400
                  bg-white
                "
              />
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex h-60 w-full flex-col items-center justify-center text-gray-400">
              <Loader2 className="animate-spin mb-2" size={32} />
              <p className="font-poppins-400">Memuat daftar belanja...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && paginatedRecipes.length === 0 && (
            <div
              className="
                bg-white
                border
                border-gray-200
                rounded-3xl
                p-12
                md:p-20
                flex
                flex-col
                items-center
                justify-center
                text-center
                shadow-sm
              "
            >
              <div
                className="
                  w-24 h-24
                  rounded-full
                  bg-green-superlight
                  flex
                  items-center
                  justify-center
                "
              >
                <ClipboardList size={42} className="text-green-primary" />
              </div>

              <h2
                className="
                  mt-8
                  text-3xl
                  font-poppins-700
                  text-graytext-primary
                "
              >
                {searchQuery
                  ? "Daftar Belanja Tidak Ditemukan"
                  : "Belum Ada Daftar Belanja"}
              </h2>

              <div className="flex flex-col items-center justify-center p-2 mt-4 bg-cream-op rounded-2xl text-brown">
                <p
                  className="
                    mt-3
                    text-graytext-secondary
                    font-poppins-400
                    max-w-md
                  "
                >
                  {searchQuery
                    ? "Coba cari dengan kata kunci lain"
                    : 'Klik tombol "Pakai" pada resep untuk membuat daftar belanja otomatis'}
                </p>
              </div>
            </div>
          )}

          {/* Cards */}
          {!isLoading && paginatedRecipes.length > 0 && (
            <div className="flex flex-wrap gap-6">
              {paginatedRecipes.map((recipe) => (
                <ShoppingRecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onBelanja={() => {
                    setSelectedRecipe(recipe);
                    setCheckedItems(
                      recipe.items
                        .filter((i) => i.isBought)
                        .map((i) => i.shoppingListItemId),
                    );
                  }}
                  onDelete={() => handleDeleteConfirm(recipe.id, recipe.nama)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <PaginationPage
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            totalItems={filteredRecipes.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
}
