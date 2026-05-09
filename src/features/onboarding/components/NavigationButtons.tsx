type Props = {
    step: number;
    onNext: () => void;
    onBack: () => void;
};

export default function NavigationButtons({
    step,
    onNext,
    onBack,
}: Props) {
    const isLastStep = step === 4;

    return (
        <div className="flex items-center justify-between">

            <div>
                {step > 1 && (
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-sm text-gray-500 transition hover:text-black cursor-pointer"
                    >
                        ← Kembali
                    </button>
                )}
            </div>

            <button
                type="button"
                onClick={onNext}
                className="cursor-pointer rounded-full bg-green-primary px-6 py-3 text-sm font-medium text-white shadow-md transition hover:opacity-90"
            >
                {isLastStep ? "Buka Dashboard" : "Lanjut →"}
            </button>

        </div>
    );
}