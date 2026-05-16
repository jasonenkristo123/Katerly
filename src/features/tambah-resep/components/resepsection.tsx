"use client";

import { useState } from "react";
import { ChefHat, Plus, Search, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import RecipeCard, { RecipeItem } from "./recipecard";
import TambahResepModal from "./tambah-resep-modal";
import PaginationPage from "@/shared/components/reusable/PaginationPage";
import {
  useRecipes,
  useDeleteRecipe,
  useUpdateRecipe,
  useIngredients,
} from "../hooks/useRecipe";
import {
  RecipeResponse,
  RecipeIngredientDetail,
  MasterIngridient,
} from "../schemas/recipeSchema";
import DetailResepModal from "./detail-resep-modal";
import { useGenerateShoppingList } from "@/features/daftar-belanja/hooks/useShoppingList";

export default function RecipeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [editingRecipe, setEditingRecipe] = useState<RecipeResponse | null>(
    null,
  );
  const [detailRecipe, setDetailRecipe] = useState<RecipeResponse | null>(null);

  const { data: apiResponse, isLoading } = useRecipes();
  const { data: ingredientsResponse } = useIngredients();
  const { mutate: deleteRecipe } = useDeleteRecipe();
  const { mutate: updateRecipe } = useUpdateRecipe();
  const { mutate: generateShoppingList } = useGenerateShoppingList();

  const availableIngredients: MasterIngridient[] = ingredientsResponse?.data || [];

  // Helper: hitung HPP total dari bahan baku dengan harga live
  function computeLiveHpp(recipeIngredients: RecipeIngredientDetail[]): number {
    return recipeIngredients.reduce((total, ing) => {
      const master = availableIngredients.find((m) => {
        const masterId = m.ingredientId ?? m.id ?? 0;
        return masterId === ing.ingredientId;
      });
      const harga = master?.hargaPerSatuan ?? 0;
      return total + harga * ing.quantity;
    }, 0);
  }

  // Mapping & Sorting Data Resep
  const recipes: RecipeItem[] = apiResponse?.data
    ? apiResponse.data
        .map((item: RecipeResponse) => {
          const porsi = item.jumlahPorsi ?? 0;
          const totalBahan = item.ingredients?.length ?? 0;

          // Gunakan HPP live dari bahan baku jika ada ingredients, fallback ke hppManual/hppFinal
          let rawHpp: number;
          if (item.ingredients && item.ingredients.length > 0) {
            rawHpp = computeLiveHpp(item.ingredients);
          } else {
            rawHpp = item.hppFinal ?? item.hppManual ?? 0;
          }

          return {
            id: item.recipeId,
            nama: item.namaResep || "Resep Tanpa Nama",
            bahanCount: totalBahan,
            porsi: porsi,
            hpp: porsi > 0 ? rawHpp / porsi : rawHpp,
            margin: item.margin ?? 30,
            isUsed: item.isUsed ?? false,
          };
        })
        .sort((a: RecipeItem, b: RecipeItem) => {
          if (a.isUsed === b.isUsed) return b.id - a.id;
          return a.isUsed ? 1 : -1;
        })
    : [];

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.nama.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

  if (currentPage !== safePage) {
    setCurrentPage(safePage);
  }

  const paginatedRecipes = filteredRecipes.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function handleUseRecipe(id: number, namaResep: string) {
    Swal.fire({
      title: "Pakai Resep Ini?",
      text: `Sistem Katerly akan otomatis mengalkulasi komposisi bahan resep "${namaResep}" ke daftar belanja pusat.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Ya, Pakai!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const rawData = apiResponse?.data?.find(
          (item: RecipeResponse) => item.recipeId === id,
        );
        if (!rawData) return;

        // Step 1: Generate shopping list dari resep
        generateShoppingList([id], {
          onSuccess: () => {
            // Step 2: Tandai resep sebagai "Sudah Terpakai"
            const payload = {
              namaResep: rawData.namaResep,
              jumlahPorsi: Number(rawData.jumlahPorsi),
              margin: Number(rawData.margin),
              hppManual: rawData.hppManual,
              ingredients:
                rawData.ingredients?.map((ing: RecipeIngredientDetail) => ({
                  ingredientId: Number(ing.ingredientId),
                  quantity: Number(ing.quantity),
                })) || [],
              isUsed: true,
            };

            updateRecipe(
              { id, payload },
              {
                onSuccess: () => {
                  Swal.fire({
                    icon: "success",
                    title: "Daftar Belanja Dibuat!",
                    text: "Komposisi bahan resep berhasil dikonversi ke daftar belanja.",
                    timer: 2000,
                    showConfirmButton: false,
                  });
                },
                onError: () => {
                  Swal.fire({
                    icon: "error",
                    title: "Gagal Memproses",
                    text: "Resep berhasil ditambahkan ke daftar belanja, tetapi gagal mengubah status resep.",
                    confirmButtonColor: "#EF4444",
                  });
                },
              },
            );
          },
          onError: () => {
            Swal.fire({
              icon: "error",
              title: "Gagal Membuat Daftar Belanja",
              text: "Terjadi kesalahan koneksi saat membuat daftar belanja.",
              confirmButtonColor: "#EF4444",
            });
          },
        });
      }
    });
  }

  function handleDeleteConfirm(id: number, namaResep: string) {
    Swal.fire({
      title: "Hapus Resep?",
      text: `Apakah Anda yakin ingin menghapus resep "${namaResep}"? Tindakan ini tidak dapat dibatalkan.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecipe(id, {
          onSuccess: () => {
            Swal.fire({
              icon: "success",
              title: "Berhasil Dihapus!",
              text: `Resep "${namaResep}" telah dihapus dari daftar.`,
              timer: 2000,
              showConfirmButton: false,
            });
          },
        });
      }
    });
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-graytext-primary mb-2 font-poppins-700">
            Resep
          </h1>
          <p className="text-graytext-secondary text-base font-poppins-400 max-w-2xl">
            Kelola resep catering untuk menghitung HPP dan margin keuntungan
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-primary text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-green-bitdark transition-all font-poppins-600 shadow-sm active:scale-95 self-start md:self-auto hover:cursor-pointer"
        >
          Tambah Resep
          <Plus size={20} />
        </button>
      </div>

      <div className="mb-8">
        <div className="relative w-full max-w-sm">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-graytext-secondary"
            size={20}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari Resep..."
            className="w-full pl-12 pr-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-primary/10 focus:border-green-primary transition-all font-poppins-400 bg-white"
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex h-60 w-full flex-col items-center justify-center text-gray-400">
          <Loader2 className="animate-spin mb-2" size={32} />
          <p className="font-poppins-400">Memuat resep...</p>
        </div>
      )}

      {!isLoading && paginatedRecipes.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-3xl p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-24 h-24 rounded-full bg-green-superlight flex items-center justify-center">
            <ChefHat size={42} className="text-green-primary" />
          </div>
          <h2 className="mt-8 text-3xl font-poppins-700 text-graytext-primary">
            {searchQuery ? "Resep Tidak Ditemukan" : "Belum Ada Resep"}
          </h2>
        </div>
      )}

      {!isLoading && paginatedRecipes.length > 0 && (
        <div className="flex flex-wrap gap-6">
          {paginatedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={(id) => handleDeleteConfirm(id, recipe.nama)}
              onUse={(id) => handleUseRecipe(id, recipe.nama)}
              onEdit={(r) => {
                const rawData = apiResponse?.data?.find(
                  (item: RecipeResponse) => item.recipeId === r.id,
                );
                setEditingRecipe(rawData ?? null);
                setIsModalOpen(true);
              }}
              onDetail={(id) => {
                const rawData = apiResponse?.data?.find(
                  (item: RecipeResponse) => item.recipeId === id,
                );
                setDetailRecipe(rawData ?? null);
              }}
            />
          ))}
        </div>
      )}

      <PaginationPage
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={filteredRecipes.length}
        itemsPerPage={itemsPerPage}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <TambahResepModal
            recipeToEdit={editingRecipe}
            onClose={() => {
              setIsModalOpen(false);
              setEditingRecipe(null);
            }}
          />
        </div>
      )}

      {detailRecipe && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <DetailResepModal
            recipe={detailRecipe}
            onClose={() => setDetailRecipe(null)}
          />
        </div>
      )}
    </div>
  );
}
