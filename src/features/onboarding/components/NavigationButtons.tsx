type Props = {
  step: number;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean; // Tambahkan ini
};

export default function NavigationButtons({
  step,
  onNext,
  onBack,
  isLoading = false, // Default-nya false
}: Props) {
  const isLastStep = step === 4;

  return (
    <div className="flex items-center justify-between">
      <div>
        {step > 1 && (
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading} // Jangan biarkan back saat loading
            className={`text-sm text-gray-500 transition hover:text-black cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            ← Kembali
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isLoading} // Cegah double-click saat kirim data
        className={`cursor-pointer rounded-full bg-green-primary px-6 py-3 text-sm font-medium text-white shadow-md transition hover:opacity-90 active:scale-[0.98] ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            {/* Kamu bisa ganti ini dengan icon spinner jika ada */}
            Menyimpan...
          </span>
        ) : isLastStep ? (
          "Buka Dashboard"
        ) : (
          "Lanjut →"
        )}
      </button>
    </div>
  );
}
