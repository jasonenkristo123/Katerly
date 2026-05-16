"use client";

import { useState } from "react";
import { Plus, Trash2, X, Loader2 } from "lucide-react";
import Button from "@/shared/components/reusable/Button";
import Swal from "sweetalert2";
import {
  useCreateRecipe,
  useUpdateRecipe,
  useIngredients,
} from "../hooks/useRecipe";
import {
  RecipeResponse,
  RecipeIngredientDetail,
  MasterIngredient,
} from "../schemas/recipeSchema";

interface Props {
  onClose: () => void;
  recipeToEdit?: RecipeResponse | null;
}

interface IngredientFormItem {
  ingredientId: string;
  quantity: string;
}

export default function TambahResepModal({ onClose, recipeToEdit }: Props) {
  const isEditMode = !!recipeToEdit;

  const [namaResep, setNamaResep] = useState<string>(
    recipeToEdit?.namaResep || "",
  );
  const [jumlahPorsi, setJumlahPorsi] = useState<string>(
    recipeToEdit?.jumlahPorsi?.toString() || "",
  );
  const [margin, setMargin] = useState<string>(
    recipeToEdit?.margin?.toString() || "30",
  );
  const [hppManual, setHppManual] = useState<string>(
    recipeToEdit?.hppManual?.toString() || "",
  );

  const { data: ingredientsResponse, isLoading: isLoadingIngredients } =
    useIngredients();
  const { mutate: createRecipe, isPending: isCreating } = useCreateRecipe();
  const { mutate: updateRecipe, isPending: isUpdating } = useUpdateRecipe();

  const isSaving = isCreating || isUpdating;
  const availableIngredients = ingredientsResponse?.data || [];

  const [ingredients, setIngredients] = useState<IngredientFormItem[]>(
    recipeToEdit?.ingredients && recipeToEdit.ingredients.length > 0
      ? recipeToEdit.ingredients.map((ing: RecipeIngredientDetail) => ({
          ingredientId: ing.ingredientId.toString(),
          quantity: ing.quantity.toString(),
        }))
      : [{ ingredientId: "", quantity: "" }],
  );

  const hasSelectedIngredients = ingredients.some(
    (ing) => ing.ingredientId !== "",
  );

  function handleAddIngredient() {
    setIngredients((prev) => [...prev, { ingredientId: "", quantity: "" }]);
  }

  function handleDeleteIngredient(index: number) {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }

  function handleIngredientChange(
    index: number,
    field: keyof IngredientFormItem,
    value: string,
  ) {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);

    if (field === "ingredientId" && value !== "" && !isEditMode) {
      setHppManual("");
    }
  }

  function handleSaveRecipe() {
    if (!namaResep || !jumlahPorsi || !margin) {
      Swal.fire({
        icon: "warning",
        title: "Form Belum Lengkap",
        text: "Mohon lengkapi Nama Resep, Jumlah Porsi, dan Margin terlebih dahulu.",
        confirmButtonColor: "#10B981",
      });
      return;
    }

    if (!hasSelectedIngredients && !hppManual) {
      Swal.fire({
        icon: "warning",
        title: "Komponen HPP Kosong",
        text: "Mohon isi HPP Manual ATAU tambahkan minimal 1 Bahan Baku.",
        confirmButtonColor: "#10B981",
      });
      return;
    }

    const payload = {
      namaResep,
      jumlahPorsi: Number(jumlahPorsi),
      margin: Number(margin),
      hppManual: hppManual ? Number(hppManual) : null,
      ingredients: hasSelectedIngredients
        ? ingredients
            .filter((item) => item.ingredientId && item.quantity)
            .map((item) => ({
              ingredientId: Number(item.ingredientId),
              quantity: Number(item.quantity),
            }))
        : [],
    };

    if (isEditMode && recipeToEdit) {
      updateRecipe(
        { id: recipeToEdit.recipeId, payload },
        {
          onSuccess: () => {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: "Perubahan resep berhasil disimpan.",
              timer: 2000,
              showConfirmButton: false,
            });
            onClose();
          },
          onError: () => {
            Swal.fire({
              icon: "error",
              title: "Gagal Mengupdate",
              text: "Terjadi kesalahan sistem saat memperbarui data resep.",
              confirmButtonColor: "#EF4444",
            });
          },
        },
      );
    } else {
      createRecipe(payload, {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Resep Ditambahkan!",
            text: "Resep baru berhasil dimasukkan ke daftar catering.",
            timer: 2000,
            showConfirmButton: false,
          });
          onClose();
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "Gagal Menyimpan",
            text: "Terjadi masalah autentikasi atau jaringan saat menyimpan resep baru.",
            confirmButtonColor: "#EF4444",
          });
        },
      });
    }
  }

  return (
    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-white rounded-[32px] p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-poppins-700">
            {isEditMode ? "Edit Resep" : "Tambah Resep"}
          </h2>
          <p className="text-graytext-secondary mt-1">
            {isEditMode
              ? "Ubah detail menu catering"
              : "Buat resep menu catering"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-11 h-11 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
        >
          <X size={22} />
        </button>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <label className="text-sm font-poppins-600">Nama Resep</label>
          <input
            type="text"
            value={namaResep}
            onChange={(e) => setNamaResep(e.target.value)}
            placeholder="Nasi Box Ayam Geprek"
            className="mt-2 w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-green-primary"
          />
        </div>

        {/* GRID 3 KOLOM: Jumlah Porsi, Margin, HPP Manual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-poppins-600">Jumlah Porsi</label>
            <input
              type="number"
              min={0}
              value={jumlahPorsi}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v < 0) {
                  setJumlahPorsi("0");
                  return;
                }
                setJumlahPorsi(e.target.value);
              }}
              placeholder="120"
              className="mt-2 w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-green-primary"
            />
          </div>

          <div>
            <label className="text-sm font-poppins-600">Margin (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              step="1"
              value={margin}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v < 0) {
                  setMargin("0");
                  return;
                }
                if (v > 100) {
                  setMargin("100");
                  return;
                }
                setMargin(e.target.value);
              }}
              placeholder="30"
              className="mt-2 w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-green-primary"
            />
          </div>

          <div>
            <label className="text-sm font-poppins-600">
              HPP Manual (Opsional)
            </label>
            <input
              type="number"
              min={0}
              value={hppManual}
              disabled={hasSelectedIngredients}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v < 0) {
                  setHppManual("0");
                  return;
                }
                setHppManual(e.target.value);
              }}
              placeholder="Contoh: 15000"
              className={`mt-2 w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none transition-all ${hasSelectedIngredients ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200" : "focus:border-green-primary bg-white"}`}
            />
            {hasSelectedIngredients && (
              <p className="text-xs text-orange-500 mt-2 font-poppins-400">
                HPP akan dihitung otomatis dari bahan baku.
              </p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-poppins-700">Bahan Baku</h3>
              <p className="text-sm text-graytext-secondary">
                Tambahkan bahan resep (Opsional jika HPP Manual diisi)
              </p>
            </div>
            <button
              onClick={handleAddIngredient}
              className="flex items-center gap-2 bg-green-superlight text-green-primary px-5 py-3 rounded-2xl font-poppins-600 cursor-pointer hover:bg-green-primary/10 transition-colors"
            >
              <Plus size={18} /> Tambah
            </button>
          </div>
          <div className="space-y-4">
            {ingredients.map((ingredient, index) => {
              const selectedMaster = availableIngredients.find(
                (i: MasterIngredient) =>
                  i.id === Number(ingredient.ingredientId),
              );
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-3xl p-5 bg-white"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-poppins-600 text-sm">
                      Bahan {index + 1}
                    </h4>
                    {ingredients.length > 1 && (
                      <button
                        onClick={() => handleDeleteIngredient(index)}
                        className="w-10 h-10 rounded-xl bg-redlight text-red flex items-center justify-center cursor-pointer hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                      value={ingredient.ingredientId}
                      onChange={(e) =>
                        handleIngredientChange(
                          index,
                          "ingredientId",
                          e.target.value,
                        )
                      }
                      disabled={isLoadingIngredients}
                      className="border border-gray-300 rounded-2xl px-4 py-4 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[size:20px_20px] bg-no-repeat bg-[position:right_1rem_center] focus:border-green-primary outline-none"
                    >
                      <option value="">
                        {isLoadingIngredients ? "Memuat..." : "Pilih Bahan"}
                      </option>
                      {availableIngredients.map((ing: MasterIngredient) => (
                        <option key={ing.id} value={ing.id}>
                          {ing.name || ing.namaBahan || `Bahan ID ${ing.id}`}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min={0}
                      step="any"
                      placeholder="Jumlah"
                      value={ingredient.quantity}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (v < 0) {
                          handleIngredientChange(index, "quantity", "0");
                          return;
                        }
                        handleIngredientChange(
                          index,
                          "quantity",
                          e.target.value,
                        );
                      }}
                      className="border border-gray-300 rounded-2xl px-4 py-4 outline-none focus:border-green-primary"
                    />
                    <input
                      type="text"
                      placeholder="Satuan"
                      value={
                        selectedMaster?.unit || selectedMaster?.satuan || ""
                      }
                      disabled
                      className="border border-gray-200 bg-gray-50 text-gray-400 rounded-2xl px-4 py-4 outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Button
          onClick={onClose}
          variant="secondary"
          disabled={isSaving}
          className="flex-1 rounded-2xl py-4"
        >
          Batal
        </Button>
        <Button
          onClick={handleSaveRecipe}
          variant="primary"
          disabled={isSaving}
          className="flex-1 rounded-2xl py-4 bg-green-primary text-white border-none flex items-center justify-center gap-2 hover:bg-green-bitdark cursor-pointer"
        >
          {isSaving && <Loader2 className="animate-spin" size={18} />}
          {isSaving
            ? "Menyimpan..."
            : isEditMode
              ? "Simpan Perubahan"
              : "Simpan Resep"}
        </Button>
      </div>
    </div>
  );
}
