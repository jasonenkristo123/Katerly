type Props = {
  step: number;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
  isValid?: boolean; // <-- Tambahkan ini
};

export default function NavigationButtons({
  step,
  onNext,
  onBack,
  isLoading = false,
  isValid = true, // Default true jika tidak diatur
}: Props) {
  const isLastStep = step === 4;
  // Tombol dinonaktifkan jika sedang loading ATAU data belum valid
  const isButtonDisabled = isLoading || !isValid;

  return (
    <div className="flex items-center justify-between w-full">
      {/* Container Tombol Kembali */}
      <div className="min-w-[100px]">
        {step > 1 && (
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className={`text-sm text-gray-400 font-poppins-400 transition hover:text-black ${
              isLoading ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            ← Kembali
          </button>
        )}
      </div>

      {/* Tombol Lanjut / Buka Dashboard */}
      <button
        type="button"
        onClick={onNext}
        disabled={isButtonDisabled} // <-- Kunci di sini
        className={`rounded-full bg-green-primary px-8 py-3 text-sm font-poppins-600 text-white shadow-md transition active:scale-[0.98] ${
          isButtonDisabled
            ? "opacity-40 cursor-not-allowed" // <-- Efek visual saat terkunci
            : "cursor-pointer hover:opacity-90"
        }`}
      >
        {isLoading
          ? "Menyimpan..."
          : isLastStep
            ? "Buka Dashboard"
            : "Lanjut →"}
      </button>
    </div>
  );
}
