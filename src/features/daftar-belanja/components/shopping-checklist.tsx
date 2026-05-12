"use client";

import { useState } from "react";

interface Ingredient {
  id: number;
  nama: string;
  qty: string;
  harga: number;
}

interface Props {
  ingredients: Ingredient[];
}

export default function ShoppingChecklist({ ingredients }: Props) {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  function toggleItem(id: number) {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  return (
    <div
      className="
                bg-white
                rounded-3xl
                border border-gray-200
                shadow-sm
                overflow-hidden
            "
    >
      <div className="divide-y divide-gray-100">
        {ingredients.map((ingredient) => {
          const isChecked = checkedItems.includes(ingredient.id);

          return (
            <div
              key={ingredient.id}
              className="
                                px-8 py-6
                                flex items-center justify-between
                                gap-4
                            "
            >
              <div className="flex items-center gap-5">
                <button
                  onClick={() => toggleItem(ingredient.id)}
                  className={`
                                        w-5 h-5
                                        rounded-full
                                        border-2
                                        cursor-pointer
                                        transition-all
                                        ${
                                          isChecked
                                            ? "bg-green-primary border-green-primary"
                                            : "border-green-primary bg-white"
                                        }
                                    `}
                />

                <span
                  className={`
                                        text-base
                                        ${
                                          isChecked
                                            ? "line-through text-gray-400"
                                            : "text-black"
                                        }
                                    `}
                >
                  {ingredient.nama}
                </span>
              </div>

              <div className="flex items-center gap-12">
                <span className="text-graytext-secondary">
                  {ingredient.qty}
                </span>

                <span className="font-poppins-600 text-black min-w-[120px] text-right">
                  Rp {ingredient.harga.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
