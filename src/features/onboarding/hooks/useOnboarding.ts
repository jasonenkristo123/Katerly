import { useMutation, useQuery } from "@tanstack/react-query";
import { onboardingService } from "../services/onboardingService";
import { OnboardingData } from "../schemas/onboardingSchema";

export const useSaveBusinessProfile = () => {
  return useMutation({
    mutationFn: (data: OnboardingData) => onboardingService.saveProfile(data),
    onSuccess: (response) => {
      console.log("Berhasil menyimpan profil bisnis", response);
    },
    onError: (error) => {
      console.error("Gagal menyimpan profil bisnis", error);
    }
  });
};

export const useCheckProfile = () => {
  return useQuery({
    queryKey: ["business-profile"],
    queryFn: onboardingService.getProfile,
    retry: false,
    staleTime: Infinity,
  });
};