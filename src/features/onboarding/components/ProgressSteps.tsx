import Image from "next/image";

type Props = {
  currentStep: number;
};

export default function ProgressSteps({ currentStep }: Props) {
  const totalSteps = 4;

  return (
    <div className="flex items-center">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;

        const completed = step < currentStep;
        const active = step === currentStep;

        return (
          <div key={step} className="flex items-center">
            <div
              className={`
                                flex h-8 w-8 items-center justify-center rounded-full border text-sm
                                ${
                                  completed || active
                                    ? "border-green-primary bg-green-primary text-white"
                                    : "border-gray-300 text-gray-400"
                                }
                            `}
            >
              {completed ? (
                <Image
                  src="/images/vectorcheck.svg"
                  alt="check"
                  width={16}
                  height={16}
                />
              ) : (
                step
              )}
            </div>

            {step !== totalSteps && (
              <div
                className={`
                                    h-[2px] w-16
                                    ${
                                      step < currentStep
                                        ? "bg-green-primary"
                                        : "bg-gray-300"
                                    }
                                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
