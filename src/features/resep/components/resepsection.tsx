"use client";

import Link from "next/link";
import { ChefHat, Plus, Search } from "lucide-react";

export default function RecipeSection() {
    const recipes: [] = [];

    return (
        <section className="space-y-8 w-full">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-poppins-700 text-black">
                        Resep
                    </h1>

                    <p className="mt-2 text-graytext-secondary">
                        Kelola resep menu catering Anda
                    </p>
                </div>

                <button
                    className="
                        flex items-center gap-3
                        bg-green-primary
                        hover:bg-green-bitdark
                        transition-colors
                        text-white
                        px-6 py-4
                        rounded-full
                        shadow-lg shadow-green-primary/20
                    "
                >
                    <Plus size={20} />

                    <span className="font-poppins-500">
                        Tambah Resep
                    </span>
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search
                    size={20}
                    className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                    "
                />

                <input
                    type="text"
                    placeholder="Cari resep..."
                    className="
                        w-full
                        rounded-2xl
                        border border-gray-200
                        bg-white
                        py-4
                        pl-14
                        pr-4
                        outline-none
                        transition-all
                        focus:border-green-primary
                        focus:ring-2
                        focus:ring-green-primary/20
                    "
                />
            </div>

            {/* Empty State */}
            {!recipes.length && (
                <div
                    className="
                        bg-white
                        border border-gray-100
                        rounded-[32px]
                        shadow-md shadow-gray-200
                        p-10 md:p-16
                        flex flex-col items-center justify-center
                        text-center
                    "
                >
                    {/* Icon */}
                    <div
                        className="
                            w-24 h-24
                            rounded-full
                            bg-green-superlight
                            flex items-center justify-center
                            mb-8
                        "
                    >
                        <ChefHat
                            size={44}
                            className="text-green-primary"
                        />
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-poppins-700 text-black">
                        Belum Ada Resep
                    </h2>

                    {/* Description */}
                    <p
                        className="
                            mt-4
                            max-w-xl
                            text-graytext-secondary
                            leading-relaxed
                        "
                    >
                        Tambahkan resep pertama Anda untuk mulai menghitung HPP,
                        margin keuntungan, dan membuat quotation catering
                        secara otomatis.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <button
                            className="
                                flex items-center justify-center gap-3
                                bg-green-primary
                                hover:bg-green-bitdark
                                transition-colors
                                text-white
                                px-8 py-4
                                rounded-2xl
                                font-poppins-500
                            "
                        >
                            <Plus size={20} />

                            Tambah Resep
                        </button>

                        <Link
                            href="/bahan-baku"
                            className="
                                flex items-center justify-center
                                border border-gray-200
                                hover:border-green-primary
                                hover:text-green-primary
                                transition-all
                                px-8 py-4
                                rounded-2xl
                                font-poppins-500
                            "
                        >
                            Kelola Bahan Baku
                        </Link>
                    </div>
                </div>
            )}
        </section>
    );
}