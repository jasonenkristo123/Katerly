"use client";

interface Ingredient {
  id: number;
  nama: string;
  qty: string;
  harga: number;
}

interface Props {
  ingredients: Ingredient[];

  checkedItems: number[];

  onToggle: (id: number) => void;
}

export default function ShoppingChecklist({
  ingredients,
  checkedItems,
  onToggle,
}: Props) {
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
                  type="button"
                  onClick={() => onToggle(ingredient.id)}
                  className={`
                    w-5 h-5
                    rounded-full
                    border-2
                    cursor-pointer
                    transition-all
                    flex-shrink-0
                    ${
                      isChecked
                        ? "bg-green-primary border-green-primary"
                        : "border-green-primary bg-white"
                    }
                  `}
                />

                <span
                  className={`
                    text-base transition-all
                    ${isChecked ? "line-through text-gray-400" : "text-black"}
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
