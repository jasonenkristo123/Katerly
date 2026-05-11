"use client";

import { useState } from "react";
import Link from "next/link";
import { ChefHat, Plus, Search } from "lucide-react";
import RecipeCard from "./recipecard";
import TambahResepModal from "./tambah-resep-modal";

export interface RecipeItem {
    id: number;
    nama: string;
    porsi: number;
    totalBahan: number;
}

export default function RecipeSection() {
    const [recipes, setRecipes] = useState<RecipeItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="w-full space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div>
                    <h1 className="text-4xl font-poppins-700 text-graytext-primary">
                        Resep
                    </h1>

                    <p className="mt-2 text-base text-graytext-secondary font-poppins-400">
                        Kelola resep menu catering Anda
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="
                        flex items-center gap-2
                        bg-green-primary
                        hover:bg-green-bitdark
                        transition-all
                        text-white
                        px-7 py-3
                        rounded-full
                        font-poppins-600
                    "
                >
                    Tambah Resep

                    <Plus size={20} />
                </button>
            </div>

            {/* Search */}
            <div className="relative w-full max-w-sm">

                <Search
                    size={20}
                    className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-graytext-secondary
                    "
                />

                <input
                    type="text"
                    placeholder="Cari Resep..."
                    className="
                        w-full
                        pl-12
                        pr-6
                        py-3
                        border
                        border-gray-300
                        rounded-full
                        bg-white
                    "
                />
            </div>

            {/* Empty State */}
            {!recipes.length && (
                <div
                    className="
                        bg-white
                        border
                        border-gray-200
                        rounded-3xl
                        px-8 py-16
                        flex flex-col
                        items-center
                        justify-center
                        text-center
                    "
                >

                    <div
                        className="
                            w-24 h-24
                            rounded-full
                            bg-green-superlight
                            flex items-center
                            justify-center
                            mb-8
                        "
                    >
                        <ChefHat
                            size={42}
                            className="text-green-primary"
                        />
                    </div>

                    <h2 className="text-3xl font-poppins-700 text-graytext-primary">
                        Belum Ada Resep
                    </h2>

                    <p className="mt-4 text-graytext-secondary max-w-2xl">
                        Tambahkan resep pertama Anda untuk mulai menghitung
                        HPP dan margin keuntungan catering.
                    </p>

                    <div
                        className="
                            mt-6
                            bg-yellow-50
                            border
                            border-yellow-200
                            text-yellow-700
                            px-5 py-4
                            rounded-2xl
                            text-sm
                            max-w-xl
                        "
                    >
                        Belum ada bahan baku tersedia.
                        Resep masih dapat dibuat untuk testing frontend.
                    </div>

                    <div className="mt-10 flex gap-4">

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="
                                flex items-center gap-2
                                bg-green-primary
                                text-white
                                px-8 py-4
                                rounded-2xl
                            "
                        >
                            <Plus size={20} />

                            Tambah Resep
                        </button>

                        <Link
                            href="/bahan-baku"
                            className="
                                px-8 py-4
                                rounded-2xl
                                border
                                border-gray-300
                            "
                        >
                            Kelola Bahan Baku
                        </Link>
                    </div>
                </div>
            )}

            {/* Recipe Cards */}
            

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/50
                        z-50
                        flex
                        items-center
                        justify-center
                        p-4
                    "
                >
                    <TambahResepModal
                        onClose={() => setIsModalOpen(false)}
                        onSave={(newRecipe) => {
                            setRecipes((prev) => [newRecipe, ...prev]);
                            setIsModalOpen(false);
                        }}
                    />
                </div>
            )}
        </section>
    );
}