import { api } from "@/shared/lib/axios";
import { OnboardingData } from "../schemas/onboardingSchema";

export const onboardingService = {
  saveProfile: async (data: OnboardingData) => {
    const response = await api.post("/business-profile", data);
    return response.data;
  },
};