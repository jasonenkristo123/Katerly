"use client";

import { ChefHat } from "lucide-react";

export interface RecipeItem {
    id: number;
    nama: string;
    bahanCount: number;
    porsi: number;
    hpp: number;
    margin: number;
}

interface Props {
    recipe: RecipeItem;
    onDelete?: (id: number) => void;
    onDetail?: (id: number) => void;
    onUse?: (id: number) => void;
}

export default function RecipeCard({
    recipe,
    onDelete,
    onDetail,
    onUse,
}: Props) {
    return (
        <div
            className="
                w-80 h-64
                relative
                bg-white
                rounded-xl
                outline outline-[0.10px] outline-black
                overflow-hidden
                p-5
                flex flex-col
                justify-between
            "
        >
            {/* Icon */}
            <div className="flex items-center gap-3">

                <div className="size-11 bg-amber-100/60 rounded-full flex items-center justify-center">

                    <ChefHat size={22} className="text-emerald-600" />
                </div>

                <div>
                    <h3 className="text-black text-xl font-normal font-poppins">
                        {recipe.nama}
                    </h3>
                </div>
            </div>

            {/* Info */}
            <div className="flex items-center gap-3 text-xs text-gray-600">

                <span>{recipe.bahanCount} Bahan</span>

                <span>•</span>

                <span>{recipe.porsi} Porsi</span>
            </div>

            {/* HPP */}
            <div>
                <p className="text-xs text-gray-500">
                    HPP / Porsi
                </p>

                <p className="text-xl font-bold text-black">
                    Rp {recipe.hpp.toLocaleString("id-ID")}
                </p>
            </div>

            {/* Margin Badge */}
            <div
                className="
                    w-fit
                    px-4 py-1
                    bg-emerald-600/25
                    rounded-xl
                "
            >
                <span className="text-emerald-600 text-xs font-bold">
                    Margin {recipe.margin}%
                </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-3">

                <button
                    onClick={() => onUse?.(recipe.id)}
                    className="
                        flex-1
                        border
                        border-black
                        rounded-xl
                        py-2
                        text-xs
                    "
                >
                    Pakai
                </button>

                <button
                    onClick={() => onDetail?.(recipe.id)}
                    className="
                        flex-1
                        bg-emerald-600
                        text-white
                        rounded-xl
                        py-2
                        text-xs
                    "
                >
                    Detail
                </button>
            </div>

            {/* Delete (optional future hook) */}
            <button
                onClick={() => onDelete?.(recipe.id)}
                className="
                    absolute
                    top-3 right-3
                    text-xs
                    text-gray-500
                "
            >
                ⋯
            </button>
        </div>
    );
}