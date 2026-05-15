"use client";

import Image from "next/image";

export default function CompletionStep() {
  return (
    <div className="flex flex-col items-center py-10">
      <Image
        src="/images/checklist-4.svg"
        alt="Setup Selesai"
        width={64}
        height={64}
      />

      <div className="flex flex-col items-center mt-4 text-center">
        <h1 className="text-4xl font-poppins-600 text-black">Setup selesai!</h1>

        <p className="text-md text-gray-500 font-poppins-400 mt-2">
          Katerly sudah siap. Tambah resep pertama Anda atau lihat dashboard.
        </p>
      </div>
    </div>
  );
}
