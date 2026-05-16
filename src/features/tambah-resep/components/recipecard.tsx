// src/features/resep/components/recipecard.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChefHat,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  UtensilsCrossed,
} from "lucide-react";

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
  onEdit?: (recipe: RecipeItem) => void;
  onDetail?: (id: number) => void;
  onUse?: (id: number) => void;
}

export default function RecipeCard({
  recipe,
  onDelete,
  onEdit,
  onDetail,
  onUse,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="
                group
                relative
                w-full
                max-w-[320px]
                min-h-[255px]
                bg-white
                rounded-[28px]
                border border-gray-100
                p-5
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                overflow-visible
            "
    >
      {/* Glow */}
      <div
        className="
                    absolute
                    -top-20
                    -right-20
                    w-40
                    h-40
                    bg-green-primary/5
                    rounded-full
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                "
      />

      {/* Header */}
      <div className="flex items-start justify-between">
        {/* Left */}
        <div>
          {/* Icon */}
          <div
            className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-gradient-to-br
                            from-amber-100
                            to-amber-50
                            flex
                            items-center
                            justify-center
                            shadow-sm
                        "
          >
            <ChefHat size={24} className="text-green-primary" />
          </div>

          {/* Title */}
          <h2
            className="
                            mt-5
                            text-[22px]
                            leading-tight
                            font-poppins-600
                            text-graytext-primary
                            max-w-[220px]
                            break-words
                        "
          >
            {recipe.nama}
          </h2>

          {/* Meta */}
          <div
            className="
                            mt-3
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-graytext-secondary
                        "
          >
            <span>{recipe.bahanCount} Bahan</span>

            <div className="w-1 h-1 rounded-full bg-gray-400" />

            <span>{recipe.porsi} Porsi</span>
          </div>
        </div>

        {/* Menu */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            hover:bg-gray-100
                            transition-all
                        "
          >
            <MoreVertical size={18} className="text-graytext-secondary" />
          </button>

          {/* Dropdown */}
          {isMenuOpen && (
            <div
              className="
                                absolute
                                top-12
                                right-0
                                w-48
                                bg-white
                                border
                                border-gray-100
                                rounded-2xl
                                shadow-2xl
                                overflow-hidden
                                z-50
                                animate-in
                                fade-in
                                zoom-in-95
                            "
            >
              <button
                onClick={() => {
                  onDetail?.(recipe.id);
                  setIsMenuOpen(false);
                }}
                className="
                                    w-full
                                    px-4
                                    py-3
                                    flex
                                    items-center
                                    gap-3
                                    hover:bg-gray-50
                                    transition-all
                                    text-sm
                                    font-poppins-500
                                    text-left
                                "
              >
                <Eye size={16} />
                Lihat Detail
              </button>

              <button
                onClick={() => {
                  onEdit?.(recipe);
                  setIsMenuOpen(false);
                }}
                className="
                                    w-full
                                    px-4
                                    py-3
                                    flex
                                    items-center
                                    gap-3
                                    hover:bg-gray-50
                                    transition-all
                                    text-sm
                                    font-poppins-500
                                    text-left
                                "
              >
                <Pencil size={16} />
                Edit Resep
              </button>

              <button
                onClick={() => {
                  onUse?.(recipe.id);
                  setIsMenuOpen(false);
                }}
                className="
                                    w-full
                                    px-4
                                    py-3
                                    flex
                                    items-center
                                    gap-3
                                    hover:bg-gray-50
                                    transition-all
                                    text-sm
                                    font-poppins-500
                                    text-left
                                "
              >
                <UtensilsCrossed size={16} />
                Pakai Resep
              </button>

              <div className="h-px bg-gray-100" />

              <button
                onClick={() => {
                  onDelete?.(recipe.id);
                  setIsMenuOpen(false);
                }}
                className="
                                    w-full
                                    px-4
                                    py-3
                                    flex
                                    items-center
                                    gap-3
                                    hover:bg-redlight
                                    transition-all
                                    text-sm
                                    font-poppins-500
                                    text-red
                                    text-left
                                "
              >
                <Trash2 size={16} />
                Hapus Resep
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pricing */}
      <div className="mt-8">
        <p
          className="
                        text-xs
                        text-graytext-secondary
                        font-poppins-400
                    "
        >
          HPP / Porsi
        </p>

        <div className="mt-3 flex items-center justify-between">
          <h3
            className="
                            text-[28px]
                            leading-none
                            font-poppins-700
                            text-black
                        "
          >
            Rp {recipe.hpp.toLocaleString("id-ID")}
          </h3>

          <div
            className="
                            px-4
                            py-2
                            rounded-2xl
                            bg-green-primary/10
                            border
                            border-green-primary/10
                        "
          >
            <span
              className="
                                text-green-primary
                                text-xs
                                font-poppins-700
                            "
            >
              Margin {recipe.margin}%
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <button
          onClick={() => onUse?.(recipe.id)}
          className="
                        h-11
                        rounded-2xl
                        border
                        border-gray-300
                        hover:border-black
                        hover:bg-gray-50
                        transition-all
                        text-sm
                        font-poppins-500
                    "
        >
          Pakai
        </button>

        <button
          onClick={() => onDetail?.(recipe.id)}
          className="
                        h-11
                        rounded-2xl
                        bg-green-primary
                        hover:bg-green-bitdark
                        transition-all
                        text-white
                        text-sm
                        font-poppins-600
                        shadow-sm
                    "
        >
          Detail
        </button>
      </div>
    </div>
  );
}
