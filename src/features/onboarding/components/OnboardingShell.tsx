"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSaveBusinessProfile } from "../hooks/useOnboarding";
import { OnboardingData } from "../schemas/onboardingSchema";

// Import Komponen UI
import ProgressSteps from "./ProgressSteps";
import StepCard from "./StepCard";
import NavigationButtons from "./NavigationButtons";
import BusinessInfoStep from "./BusinessInfoStep";
import ProductTypeStep from "./ProductTypeStep";
import ProfitMarginStep from "./ProfitMarginStep";
import CompletionStep from "./CompletionStep";

export default function OnboardingShell() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { mutate: saveProfile, isPending } = useSaveBusinessProfile();

  const [formData, setFormData] = useState<OnboardingData>({
    namaUsaha: "",
    provinsi: "",
    noWhatsapp: "",
    email: "admin@katerly.com",
    alamat: "Alamat belum diatur",
    marginDefault: 30,
    matauang: "IDR",
    pajakDefault: 10,
    biayaPengantaranDefault: 50000,
  });

  const updateFormData = (fields: Partial<OnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const isStepValid = () => {
    if (step === 1) {
      return (
        formData.namaUsaha.trim() !== "" &&
        formData.provinsi.trim() !== "" &&
        formData.noWhatsapp.trim().length >= 10
      );
    }
    return true;
  };

  const handleNext = () => {
    if (!isStepValid()) return;

    if (step < 4) {
      setStep((p) => p + 1);
    } else {
      saveProfile(formData, {
        onSuccess: () => router.push("/dashboard"),
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((p) => p - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BusinessInfoStep data={formData} updateData={updateFormData} />;
      case 2:
        return <ProductTypeStep />;
      case 3:
        return <ProfitMarginStep data={formData} updateData={updateFormData} />;
      case 4:
        return <CompletionStep />;
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen bg-[#F7F7F7]">
      <header className="border-b border-gray-200 bg-white px-8 py-5">
        <h1 className="font-anonymous-700 text-4xl text-green-primary">
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
                onNext={handleNext}
                onBack={handleBack}
                isLoading={isPending}
                isValid={isStepValid()}
              />
            }
          >
            {renderStep()}
          </StepCard>
        </div>
      </main>
    </section>
  );
}
