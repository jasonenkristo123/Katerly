"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

interface RecipeItem {
    id: number;
    nama: string;
    porsi: number;
    totalBahan: number;
}

interface TambahResepModalProps {
    onClose: () => void;
    onSave: (recipe: RecipeItem) => void;
}

interface IngredientItem {
    bahan: string;
    quantity: string;
    unit: string;
}

export default function TambahResepModal({
    onClose,
    onSave,
}: TambahResepModalProps) {

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
        setIngredients((prev) =>
            prev.filter((_, i) => i !== index)
        );
    }

    function handleIngredientChange(
        index: number,
        field: keyof IngredientItem,
        value: string
    ) {
        const updated = [...ingredients];

        updated[index][field] = value;

        setIngredients(updated);
    }

    function handleSaveRecipe() {
        const newRecipe: RecipeItem = {
            id: Date.now(),
            nama,
            porsi: Number(porsi),
            totalBahan: ingredients.length,
        };

        onSave(newRecipe);
    }

    return (
        <div
            className="
                w-full
                max-w-3xl
                bg-white
                rounded-[32px]
                shadow-2xl
                overflow-hidden
                animate-in fade-in zoom-in duration-200
            "
        >

            {/* Header */}
            <div
                className="
                    px-8 py-6
                    border-b
                    border-gray-100
                    flex
                    items-center
                    justify-between
                "
            >

                <div>
                    <h2 className="text-3xl font-poppins-700 text-graytext-primary">
                        Tambah Resep
                    </h2>

                    <p className="mt-1 text-sm text-graytext-secondary">
                        Buat resep baru untuk menu catering
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="
                        w-11 h-11
                        rounded-full
                        hover:bg-gray-100
                        transition-all
                        flex
                        items-center
                        justify-center
                    "
                >
                    <X size={22} />
                </button>
            </div>

            {/* Body */}
            <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">

                {/* Recipe Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div className="space-y-2">
                        <label className="text-sm font-poppins-600 text-graytext-primary">
                            Nama Resep
                        </label>

                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Contoh: Nasi Box Ayam Bakar"
                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-2xl
                                px-5 py-4
                                outline-none
                                focus:border-green-primary
                                focus:ring-4
                                focus:ring-green-primary/10
                                transition-all
                            "
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-poppins-600 text-graytext-primary">
                            Jumlah Porsi
                        </label>

                        <input
                            type="number"
                            value={porsi}
                            onChange={(e) => setPorsi(e.target.value)}
                            placeholder="50"
                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-2xl
                                px-5 py-4
                                outline-none
                                focus:border-green-primary
                                focus:ring-4
                                focus:ring-green-primary/10
                                transition-all
                            "
                        />
                    </div>
                </div>

                {/* Ingredient Section */}
                <div className="space-y-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <h3 className="text-xl font-poppins-700 text-graytext-primary">
                                Bahan Baku
                            </h3>

                            <p className="text-sm text-graytext-secondary mt-1">
                                Tambahkan bahan untuk resep ini
                            </p>
                        </div>

                        <button
                            onClick={handleAddIngredient}
                            className="
                                flex items-center gap-2
                                bg-green-superlight
                                text-green-primary
                                hover:bg-green-primary
                                hover:text-white
                                transition-all
                                px-5 py-3
                                rounded-2xl
                                font-poppins-600
                            "
                        >
                            <Plus size={18} />

                            Tambah Bahan
                        </button>
                    </div>

                    {/* Ingredient List */}
                    <div className="space-y-4">

                        {ingredients.map((ingredient, index) => (
                            <div
                                key={index}
                                className="
                                    border
                                    border-gray-200
                                    rounded-3xl
                                    p-5
                                    bg-gray-50/40
                                "
                            >

                                <div className="flex items-center justify-between mb-4">

                                    <h4 className="font-poppins-600 text-graytext-primary">
                                        Bahan #{index + 1}
                                    </h4>

                                    {ingredients.length > 1 && (
                                        <button
                                            onClick={() =>
                                                handleDeleteIngredient(index)
                                            }
                                            className="
                                                w-10 h-10
                                                rounded-xl
                                                bg-redlight
                                                text-red
                                                hover:scale-105
                                                transition-all
                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                    {/* Ingredient Select */}
                                    <select
                                        value={ingredient.bahan}
                                        onChange={(e) =>
                                            handleIngredientChange(
                                                index,
                                                "bahan",
                                                e.target.value
                                            )
                                        }
                                        className="
                                            border
                                            border-gray-300
                                            rounded-2xl
                                            px-4 py-4
                                            outline-none
                                            focus:border-green-primary
                                            focus:ring-4
                                            focus:ring-green-primary/10
                                        "
                                    >
                                        <option value="">
                                            Pilih Bahan
                                        </option>

                                        <option value="Beras Premium">
                                            Beras Premium
                                        </option>

                                        <option value="Dada Ayam">
                                            Dada Ayam
                                        </option>

                                        <option value="Telur">
                                            Telur
                                        </option>

                                        <option value="Minyak Goreng">
                                            Minyak Goreng
                                        </option>
                                    </select>

                                    {/* Quantity */}
                                    <input
                                        type="number"
                                        value={ingredient.quantity}
                                        onChange={(e) =>
                                            handleIngredientChange(
                                                index,
                                                "quantity",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Jumlah"
                                        className="
                                            border
                                            border-gray-300
                                            rounded-2xl
                                            px-4 py-4
                                            outline-none
                                            focus:border-green-primary
                                            focus:ring-4
                                            focus:ring-green-primary/10
                                        "
                                    />

                                    {/* Unit */}
                                    <input
                                        type="text"
                                        value={ingredient.unit}
                                        onChange={(e) =>
                                            handleIngredientChange(
                                                index,
                                                "unit",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Satuan"
                                        className="
                                            border
                                            border-gray-300
                                            rounded-2xl
                                            px-4 py-4
                                            outline-none
                                            focus:border-green-primary
                                            focus:ring-4
                                            focus:ring-green-primary/10
                                        "
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                className="
                    px-8 py-6
                    border-t
                    border-gray-100
                    flex
                    flex-col-reverse
                    md:flex-row
                    gap-4
                    justify-end
                "
            >

                <button
                    onClick={onClose}
                    className="
                        px-6 py-4
                        rounded-2xl
                        border
                        border-gray-300
                        font-poppins-600
                        hover:bg-gray-50
                        transition-all
                    "
                >
                    Batal
                </button>

                <button
                    onClick={handleSaveRecipe}
                    className="
                        px-8 py-4
                        rounded-2xl
                        bg-green-primary
                        hover:bg-green-bitdark
                        text-white
                        font-poppins-600
                        transition-all
                        shadow-lg
                        shadow-green-primary/20
                    "
                >
                    Simpan Resep
                </button>
            </div>
        </div>
    );
}