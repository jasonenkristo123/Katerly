import { ChefHat, Trash2 } from "lucide-react";

interface Props {
  recipe: {
    id: number;
    nama: string;
    bahanCount: number;
    totalHarga: number;
    tanggal: string;
  };

  onBelanja: () => void;
  onDelete: () => void;
}

export default function ShoppingRecipeCard({
  recipe,
  onBelanja,
  onDelete,
}: Props) {
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

          <span>{recipe.tanggal}</span>
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
          Estimasi Belanja
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
            Rp {recipe.totalHarga.toLocaleString("id-ID")}
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <button
          onClick={onDelete}
          className="
            h-11
            rounded-2xl
            border
            border-gray-300
            hover:border-red-400
            hover:bg-red-50
            hover:text-red-500
            transition-all
            text-sm
            font-poppins-500
            cursor-pointer
            flex
            items-center
            justify-center
            gap-1.5
          "
        >
          <Trash2 size={14} />
          Hapus
        </button>

        <button
          onClick={onBelanja}
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
            cursor-pointer
          "
        >
          Belanja
        </button>
      </div>
    </div>
  );
}
