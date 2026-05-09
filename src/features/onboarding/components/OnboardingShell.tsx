"use client";

import { useState } from "react";

import ProgressSteps from "./ProgressSteps";
import StepCard from "./StepCard";
import NavigationButtons from "./NavigationButtons";

import BusinessInfoStep from "./BusinessInfoStep";
import ProductTypeStep from "./ProductTypeStep";
import ProfitMarginStep from "./ProfitMarginStep";
import CompletionStep from "./CompletionStep";

export default function OnboardingShell() {
    const [step, setStep] = useState(1);

    const nextStep = () => {
        if (step < 4) {
            setStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep((prev) => prev - 1);
        }
    };

    const steps = {
        1: <BusinessInfoStep />,
        2: <ProductTypeStep />,
        3: <ProfitMarginStep />,
        4: <CompletionStep />,
    };

    return (
        <section className="min-h-screen bg-[#F7F7F7]">

            <header className="border-b border-gray-200 bg-white px-8 py-5">
                <h1 className="font-anonymous-700 text-4xl text-green-bold">
                    Kater<span className="text-black">Ly</span>
                </h1>
            </header>

            <main className="flex flex-col items-center px-6 py-10">

                <ProgressSteps currentStep={step} />

                <div className="mt-10 w-full max-w-[720px]">

                    <StepCard
                        footer={
                            <NavigationButtons
                                step={step}
                                onNext={nextStep}
                                onBack={prevStep}
                            />
                        }
                    >
                        {steps[step as keyof typeof steps]}
                    </StepCard>

                </div>

            </main>
        </section>
    );
}