"use client";

import { useState } from "react";
import { ClipboardList, Search, ShoppingCart } from "lucide-react";

import ShoppingRecipeCard from "./shopping-recipe-card";
import ShoppingSummaryCard from "./shopping-summary-card";
import ShoppingChecklist from "./shopping-checklist";

interface IngredientItem {
  id: number;
  nama: string;
  qty: string;
  harga: number;
}

interface ShoppingRecipe {
  id: number;
  nama: string;
  bahanCount: number;
  porsi: number;
  totalHarga: number;
  tanggal: string;
  ingredients: IngredientItem[];
}

export default function DaftarBelanjaSection() {
  const [recipes] = useState<ShoppingRecipe[]>([
    {
      id: 1,
      nama: "Nasi Box Ayam Geprek",
      bahanCount: 9,
      porsi: 120,
      totalHarga: 1745000,
      tanggal: "19 Dec 2026",
      ingredients: [
        { id: 1, nama: "Ayam Potong", qty: "15 kg", harga: 200000 },
        { id: 2, nama: "Beras Premium", qty: "20 kg", harga: 350000 },
        { id: 3, nama: "Minyak Goreng", qty: "5 liter", harga: 120000 },
        { id: 4, nama: "Tepung Terigu", qty: "5 kg", harga: 75000 },
        { id: 5, nama: "Cabai Merah", qty: "3 kg", harga: 150000 },
        { id: 6, nama: "Bawang Putih", qty: "2 kg", harga: 60000 },
        { id: 7, nama: "Garam", qty: "1 kg", harga: 15000 },
        { id: 8, nama: "Penyedap Rasa", qty: "500 gr", harga: 25000 },
        { id: 9, nama: "Sambal Sachet", qty: "120 pcs", harga: 750000 },
      ],
    },
    {
      id: 2,
      nama: "Nasi Kuning Komplit",
      bahanCount: 7,
      porsi: 80,
      totalHarga: 1250000,
      tanggal: "25 Dec 2026",
      ingredients: [
        { id: 10, nama: "Beras Premium", qty: "15 kg", harga: 262500 },
        { id: 11, nama: "Santan Kelapa", qty: "10 liter", harga: 200000 },
        { id: 12, nama: "Kunyit", qty: "1 kg", harga: 45000 },
        { id: 13, nama: "Ayam Suwir", qty: "8 kg", harga: 320000 },
        { id: 14, nama: "Telur Ayam", qty: "80 butir", harga: 240000 },
        { id: 15, nama: "Kacang Tanah", qty: "3 kg", harga: 105000 },
        { id: 16, nama: "Minyak Goreng", qty: "3 liter", harga: 77500 },
      ],
    },
  ]);

  const [selectedRecipe, setSelectedRecipe] = useState<ShoppingRecipe | null>(
    null,
  );

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  function handleToggleIngredient(id: number) {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
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
              title="UNTUK ACARA"
              value={selectedRecipe.tanggal}
              subtitle={`${selectedRecipe.porsi} porsi total`}
            />
          </div>

          {/* Checklist */}
          <ShoppingChecklist
            ingredients={selectedRecipe.ingredients}
            checkedItems={checkedItems}
            onToggle={handleToggleIngredient}
          />
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

          {/* Empty State */}
          {recipes.length === 0 && (
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
                Belum Ada Daftar Belanja
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
                  Tambahkan resep terlebih dahulu untuk membuat daftar belanja
                  catering
                </p>
              </div>

              <button
                className="
                  mt-8
                  bg-green-primary
                  text-white
                  px-7 py-3
                  rounded-full
                  flex
                  items-center
                  gap-2
                  hover:bg-green-bitdark
                  transition-all
                  font-poppins-600
                  hover:cursor-pointer
                "
              >
                <ShoppingCart size={18} />
                Buat Daftar Belanja
              </button>
            </div>
          )}

          {/* Cards */}
          {recipes.length > 0 && (
            <div className="flex flex-wrap gap-6 mt-8">
              {recipes.map((recipe) => (
                <ShoppingRecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onBelanja={() => {
                    setSelectedRecipe(recipe);
                    setCheckedItems([]);
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
