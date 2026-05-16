"use client";
import { useState } from "react";

const productTypes = [
  "Nasi Box",
  "Tumpeng",
  "Snack Box",
  "Prasmanan",
  "Katering Harian",
  "Lainnya",
];

export default function ProductTypeStep() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const toggleProduct = (product: string) => {
    setSelectedProducts((prev) =>
      prev.includes(product)
        ? prev.filter((i) => i !== product)
        : [...prev, product],
    );
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-poppins-600 text-4xl text-black">
        Apa yang Anda jual?
      </h1>
      <p className="mt-2 text-gray-500 font-poppins-400">
        Pilih semua yang sesuai.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {productTypes.map((product) => (
          <button
            key={product}
            onClick={() => toggleProduct(product)}
            className={`rounded-xl border px-4 py-4 text-sm transition-all shadow-sm ${
              selectedProducts.includes(product)
                ? "border-green-primary bg-green-primary text-white"
                : "border-gray-300 bg-white text-black hover:bg-green-50"
            }`}
          >
            {product}
          </button>
        ))}
      </div>
    </div>
  );
}
