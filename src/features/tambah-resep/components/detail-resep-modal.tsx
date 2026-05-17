"use client";

import { X, ChefHat } from "lucide-react";
import { RecipeResponse, MasterIngridient } from "../schemas/recipeSchema";
import { useIngredients } from "../hooks/useRecipe";

interface Props {
  recipe: RecipeResponse;
  onClose: () => void;
}

export default function DetailResepModal({ recipe, onClose }: Props) {
  const { data: ingredientsResponse, isLoading } = useIngredients();
  const availableIngredients: MasterIngridient[] = ingredientsResponse?.data || [];

  // Hitung HPP live dari harga bahan baku terkini
  const liveHpp: number = (() => {
    if (recipe.hppManual !== null) return recipe.hppManual;
    if (!recipe.ingredients || recipe.ingredients.length === 0) return recipe.hppFinal ?? 0;
    return recipe.ingredients.reduce((total, ing) => {
      const master = availableIngredients.find((m) => {
        const masterId = m.ingredientId ?? m.id ?? 0;
        return masterId === ing.ingredientId;
      });
      const harga = master?.hargaPerSatuan ?? 0;
      return total + harga * ing.quantity;
    }, 0);
  })();

  const liveHargaJual = liveHpp * (1 + (recipe.margin ?? 30) / 100);

  return (
    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-white rounded-[32px] p-8">
      {/* Header Modal */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center shadow-sm">
            <ChefHat size={28} className="text-green-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-poppins-700 text-graytext-primary leading-tight">
              {recipe.namaResep}
            </h2>
            <p className="text-graytext-secondary mt-1 font-poppins-400">
              Detail kalkulasi menu catering
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X size={22} className="text-graytext-secondary" />
        </button>
      </div>

      {/* Ringkasan Finansial / Porsi */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
          <p className="text-xs text-graytext-secondary font-poppins-500 mb-1">
            Jumlah Porsi
          </p>
          <p className="text-xl font-poppins-700 text-black">
            {recipe.jumlahPorsi}{" "}
            <span className="text-sm font-poppins-400 text-gray-500">
              porsi
            </span>
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
          <p className="text-xs text-graytext-secondary font-poppins-500 mb-1">
            Margin Keuntungan
          </p>
          <p className="text-xl font-poppins-700 text-green-primary">
            {recipe.margin}%
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
          <p className="text-xs text-graytext-secondary font-poppins-500 mb-1">
            Total HPP
          </p>
          <p className="text-lg font-poppins-700 text-black">
            Rp {liveHpp?.toLocaleString("id-ID") || 0}
          </p>
        </div>
        <div className="bg-green-superlight border border-green-primary/10 rounded-2xl p-4">
          <p className="text-xs text-green-primary font-poppins-500 mb-1">
            Harga Jual
          </p>
          <p className="text-lg font-poppins-700 text-green-primary">
            Rp {Math.round(liveHargaJual)?.toLocaleString("id-ID") || 0}
          </p>
        </div>
      </div>

      {/* Rincian Komposisi Bahan Baku */}
      <div className="mt-8">
        <h3 className="text-lg font-poppins-700 text-graytext-primary mb-4">
          Komposisi Bahan Baku
        </h3>

        {recipe.hppManual !== null ? (
          <div className="border border-orange-200 bg-orange-50 rounded-2xl p-5 text-center">
            <p className="text-orange-600 font-poppins-500 text-sm">
              Resep ini menggunakan HPP Manual (Rp{" "}
              {recipe.hppManual.toLocaleString("id-ID")}).
            </p>
            <p className="text-orange-400 font-poppins-400 text-xs mt-1">
              Tidak ada rincian bahan baku yang dicatat.
            </p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-3xl overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-gray-400 font-poppins-400 text-sm">
                Memuat rincian bahan...
              </div>
            ) : recipe.ingredients && recipe.ingredients.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {recipe.ingredients.map((ing, index) => {
                  // SINKRONISASI PENCARIAN ID & NAMA DENGAN FORMAT TYPO 'I'
                  const masterData = availableIngredients.find(
                    (m: MasterIngridient) => {
                      const masterId = m.ingredientId ?? m.id ?? 0;
                      return masterId === ing.ingredientId;
                    },
                  );
                  const namaBahan =
                    masterData?.nama ||
                    masterData?.name ||
                    masterData?.namaBahan ||
                    `Bahan ID ${ing.ingredientId}`;
                  const satuan = masterData?.satuan || masterData?.unit || "";

                  return (
                    <div
                      key={index}
                      className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-poppins-600 text-gray-500">
                          {index + 1}
                        </div>
                        <p className="font-poppins-600 text-graytext-primary text-sm">
                          {namaBahan}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-poppins-600 text-black">
                          {ing.quantity}{" "}
                          <span className="text-gray-400 text-xs font-poppins-400">
                            {satuan}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-400 font-poppins-400 text-sm">
                Belum ada bahan baku yang ditambahkan.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Modal */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-right">
        <button
          onClick={onClose}
          className="bg-gray-100 text-graytext-primary px-8 py-3 rounded-2xl font-poppins-600 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
