// src/features/resep/components/resepsection.tsx

"use client";

import { useState } from "react";
import { ChefHat, Plus, Search } from "lucide-react";
import Image from "next/image";
import RecipeCard, { RecipeItem } from "./recipecard";
import TambahResepModal from "./tambah-resep-modal";

export default function RecipeSection() {

    const [recipes, setRecipes] = useState<RecipeItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full">

            {/* Header */}
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
                    className="
                        bg-green-primary
                        text-white
                        px-8 py-3
                        rounded-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        hover:bg-green-bitdark
                        transition-all
                        font-poppins-600
                        shadow-sm
                        active:scale-95
                        self-start
                        md:self-auto
                        hover:cursor-pointer
                    "
                >
                    Tambah Resep
                    <Plus size={20} />
                </button>
            </div>

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
                        placeholder="Cari Resep..."
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
                        <ChefHat
                            size={42}
                            className="text-green-primary"
                        />
                    </div>

                    <h2
                        className="
                            mt-8
                            text-3xl
                            font-poppins-700
                            text-graytext-primary
                        "
                    >
                        Belum Ada Resep
                    </h2>

                <div className="flex flex-col items-center justify-center  p-2 mt-4 bg-cream-op rounded-2xl text-brown">
                    <p
                        className="
                        mt-3
                        text-graytext-secondary
                        font-poppins-400
                        max-w-md
                        "
                        >
                        Tambahkan resep pertama Anda untuk mulai menghitung HPP dan margin keuntungan menu catering
                    </p>
                
                </div>


                    <button
                        onClick={() => setIsModalOpen(true)}
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
                        <Plus size={18} />

                        Tambah Resep
                    </button>
                </div>
            )}

            {/* Cards */}
            {recipes.length > 0 && (
                <div className="flex flex-wrap gap-6">

                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onDelete={(id) => {
                                setRecipes((prev) =>
                                    prev.filter((r) => r.id !== id)
                                );
                            }}
                            onEdit={(recipe) => {
                                console.log("edit", recipe);
                            }}
                            onDetail={(id) => {
                                console.log("detail", id);
                            }}
                            onUse={(id) => {
                                console.log("use", id);
                            }}
                        />
                    ))}
                </div>
            )}

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

                            setRecipes((prev) => [
                                newRecipe,
                                ...prev,
                            ]);

                            setIsModalOpen(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
}