// src/features/resep/components/tambah-resep-modal.tsx

"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { RecipeItem } from "./recipecard";

interface Props {
  onClose: () => void;
  onSave: (recipe: RecipeItem) => void;
}

interface IngredientItem {
  bahan: string;
  quantity: string;
  unit: string;
}

export default function TambahResepModal({ onClose, onSave }: Props) {
  const [nama, setNama] = useState("");
  const [porsi, setPorsi] = useState("");

  const [ingredients, setIngredients] = useState<IngredientItem[]>([
    {
      bahan: "",
      quantity: "",
      unit: "",
    },
  ]);

  function handleAddIngredient() {
    setIngredients((prev) => [
      ...prev,
      {
        bahan: "",
        quantity: "",
        unit: "",
      },
    ]);
  }

  function handleDeleteIngredient(index: number) {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }

  function handleIngredientChange(
    index: number,
    field: keyof IngredientItem,
    value: string,
  ) {
    const updated = [...ingredients];

    updated[index][field] = value;

    setIngredients(updated);
  }

  function handleSaveRecipe() {
    const newRecipe: RecipeItem = {
      id: Date.now(),
      nama,
      bahanCount: ingredients.length,
      porsi: Number(porsi),
      hpp: 18500,
      margin: 30,
    };

    onSave(newRecipe);
  }

  return (
    <div
      className="
        w-full
        max-w-3xl
        max-h-[90vh]
        overflow-y-auto

        scrollbar-thin
        scrollbar-thumb-gray-300
        scrollbar-track-transparent

        bg-white
        rounded-[32px]
        p-8
    "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-poppins-700">Tambah Resep</h2>

          <p className="text-graytext-secondary mt-1">
            Buat resep menu catering
          </p>
        </div>

        <button
          onClick={onClose}
          className="
            w-11 h-11
            rounded-full
            hover:bg-gray-100
            flex
            items-center
            justify-center
            cursor-pointer
          "
        >
          <X size={22} />
        </button>
      </div>

      {/* Body */}
      <div className="mt-8 space-y-6">
        {/* Nama */}
        <div>
          <label className="text-sm font-poppins-600">Nama Resep</label>

          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nasi Box Ayam Geprek"
            className="
              mt-2
              w-full
              border border-gray-300
              rounded-2xl
              px-5 py-4
              outline-none
            "
          />
        </div>

        {/* Porsi */}
        <div>
          <label className="text-sm font-poppins-600">Jumlah Porsi</label>

          <input
            type="number"
            min={0}
            value={porsi}
            onChange={(e) => {
              const value = Number(e.target.value);

              if (value < 0) {
                setPorsi("0");
                return;
              }

              setPorsi(e.target.value);
            }}
            placeholder="120"
            className="
              mt-2
              w-full
              border border-gray-300
              rounded-2xl
              px-5 py-4
              outline-none
            "
          />
        </div>

        {/* Ingredients */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-poppins-700">Bahan Baku</h3>

              <p className="text-sm text-graytext-secondary">
                Tambahkan bahan resep
              </p>
            </div>

            <button
              onClick={handleAddIngredient}
              className="
                flex items-center gap-2
                bg-green-superlight
                text-green-primary
                px-5 py-3
                rounded-2xl
                font-poppins-600
                cursor-pointer
              "
            >
              <Plus size={18} />
              Tambah
            </button>
          </div>

          <div className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="
                  border border-gray-200
                  rounded-3xl
                  p-5
                "
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-poppins-600">Bahan {index + 1}</h4>

                  {ingredients.length > 1 && (
                    <button
                      onClick={() => handleDeleteIngredient(index)}
                      className="
                        w-10 h-10
                        rounded-xl
                        bg-redlight
                        text-red
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                      "
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={ingredient.bahan}
                    onChange={(e) =>
                      handleIngredientChange(index, "bahan", e.target.value)
                    }
                    className="
                      border border-gray-300
                      rounded-2xl
                      px-4 py-4
                      cursor-pointer
                      appearance-none

                      bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]

                      bg-[size:20px_20px]
                      bg-no-repeat
                      bg-[position:right_1rem_center]
                    "
                  >
                    <option value="">Pilih Bahan</option>

                    <option>Beras Premium</option>

                    <option>Dada Ayam</option>

                    <option>Telur</option>
                  </select>

                  <input
                    type="number"
                    min={0}
                    placeholder="Jumlah"
                    value={ingredient.quantity}
                    onChange={(e) => {
                      const value = Number(e.target.value);

                      if (value < 0) {
                        handleIngredientChange(index, "quantity", "0");

                        return;
                      }

                      handleIngredientChange(index, "quantity", e.target.value);
                    }}
                    className="
                      border border-gray-300
                      rounded-2xl
                      px-4 py-4
                    "
                  />

                  <input
                    type="text"
                    placeholder="Satuan"
                    value={ingredient.unit}
                    onChange={(e) =>
                      handleIngredientChange(index, "unit", e.target.value)
                    }
                    className="
                      border border-gray-300
                      rounded-2xl
                      px-4 py-4
                    "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={onClose}
          className="
            flex-1
            border border-gray-300
            rounded-2xl
            py-4
            cursor-pointer
          "
        >
          Batal
        </button>

        <button
          onClick={handleSaveRecipe}
          className="
            flex-1
            bg-green-primary
            text-white
            rounded-2xl
            py-4
            cursor-pointer
          "
        >
          Simpan Resep
        </button>
      </div>
    </div>
  );
}
