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
                ? prev.filter((item) => item !== product)
                : [...prev, product]
        );
    };

    return (
        <div className="flex flex-col">

            <h1 className="font-poppins-600 text-4xl text-black">
                Apa yang Anda jual?
            </h1>

            <p className="mt-2 font-poppins-400 text-base text-gray-500">
                Pilih semua yang sesuai.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">

                {productTypes.map((product) => {
                    const isSelected =
                        selectedProducts.includes(product);

                    return (
                        <button
                            key={product}
                            type="button"
                            onClick={() => toggleProduct(product)}
                            className={`
                                rounded-xl border px-4 py-4 text-sm shadow-sm transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-green-primary
                                active:scale-[0.98]

                                ${
                                    isSelected
                                        ? "border-green-primary bg-green-primary text-white"
                                        : "border-gray-300 bg-white text-black hover:border-green-primary hover:bg-green-50"
                                }
                            `}
                        >
                            {product}
                        </button>
                    );
                })}

            </div>

        </div>
    );
}