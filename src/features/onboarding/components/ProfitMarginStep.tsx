"use client";

import { useState } from "react";

export default function ProfitMarginStep() {
    const [margin, setMargin] = useState(30);

    return (
        <div className="flex flex-col">

            <h1 className="font-poppins-600 text-4xl text-black">
                Pilih target keuntungan Anda
            </h1>

            <p className="mt-2 font-poppins-400 text-base text-gray-500">
                Bisa diubah kapan saja nanti.
            </p>

            <div className="mt-12 flex flex-col">

                <div className="rounded-2xl flex flex-col items-center gap-3 py-4 bg-[#D9F0E4]">

                    <span className="font-poppins-400 text-md text-graytext-secondary">
                        Target Margin
                    </span>

                    <span className="font-poppins-600 text-5xl text-green-primary">
                        {margin}%
                    </span>

                </div>

                <div className="mt-8">

                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={margin}
                        onChange={(e) =>
                            setMargin(Number(e.target.value))
                        }
                        className="
                            h-2 w-full cursor-pointer appearance-none rounded-full
                            bg-gray-200 accent-green-primary
                        "
                    />
                </div>


            </div>

        </div>
    );
}