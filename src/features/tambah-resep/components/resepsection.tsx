"use client";

import { useState } from "react";
import { ChefHat, Plus, Search, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import RecipeCard, { RecipeItem } from "./recipecard";
import TambahResepModal from "./tambah-resep-modal";
import { useRecipes, useDeleteRecipe } from "../hooks/useRecipe";
import { RecipeResponse } from "../schemas/recipeSchema";
import DetailResepModal from "./detail-resep-modal";

export default function RecipeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRecipe, setEditingRecipe] = useState<RecipeResponse | null>(
    null,
  );
  const [detailRecipe, setDetailRecipe] = useState<RecipeResponse | null>(null);

  const { data: apiResponse, isLoading } = useRecipes();
  const { mutate: deleteRecipe } = useDeleteRecipe();

  const recipes: RecipeItem[] = apiResponse?.data
    ? apiResponse.data.map((item: RecipeResponse) => {
        const rawHpp = item.hppFinal ?? item.hppManual ?? 0;
        const porsi = item.jumlahPorsi ?? 0;
        const totalBahan = item.ingredients?.length || 0;

        return {
          id: item.recipeId,
          nama: item.namaResep || "Resep Tanpa Nama",
          bahanCount: totalBahan,
          porsi: porsi,

          hpp: porsi > 0 ? rawHpp / porsi : rawHpp,
          margin: item.margin ?? 30,
        };
      })
    : [];

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.nama.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          onError: () => {
            Swal.fire({
              icon: "error",
              title: "Gagal Menghapus",
              text: "Terjadi kesalahan sistem atau masalah autentikasi saat menghapus resep.",
              confirmButtonColor: "#EF4444",
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
            onChange={(e) => setSearchQuery(e.target.value)}
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

      {!isLoading && filteredRecipes.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-3xl p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-24 h-24 rounded-full bg-green-superlight flex items-center justify-center">
            <ChefHat size={42} className="text-green-primary" />
          </div>

          <h2 className="mt-8 text-3xl font-poppins-700 text-graytext-primary">
            {searchQuery ? "Resep Tidak Ditemukan" : "Belum Ada Resep"}
          </h2>

          <div className="flex flex-col items-center justify-center p-2 mt-4 bg-cream-op rounded-2xl text-brown">
            <p className="mt-3 text-graytext-secondary font-poppins-400 max-w-md">
              {searchQuery
                ? `Tidak ada resep dengan nama "${searchQuery}". Coba kata kunci lain.`
                : "Tambahkan resep pertama Anda untuk mulai menghitung HPP dan margin keuntungan menu catering"}
            </p>
          </div>

          {!searchQuery && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 bg-green-primary text-white px-7 py-3 rounded-full flex items-center gap-2 hover:bg-green-bitdark transition-all font-poppins-600 hover:cursor-pointer"
            >
              <Plus size={18} />
              Tambah Resep
            </button>
          )}
        </div>
      )}

      {!isLoading && filteredRecipes.length > 0 && (
        <div className="flex flex-wrap gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={(id) => handleDeleteConfirm(id, recipe.nama)}
              onEdit={(r) => {
                const rawData = apiResponse?.data?.find(
                  (item: RecipeResponse) => item.recipeId === r.id,
                );
                setEditingRecipe(rawData || null);
                setIsModalOpen(true);
              }}
              onDetail={(id) => {
                const rawData = apiResponse?.data?.find(
                  (item: RecipeResponse) => item.recipeId === id,
                );
                setDetailRecipe(rawData || null);
              }}
              onUse={(id) => console.log("Pakai ID:", id)}
            />
          ))}
        </div>
      )}

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
