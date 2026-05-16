import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recipeService } from "../services/recipeService";
import { CreateRecipePayload } from "../schemas/recipeSchema";

export const useRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: recipeService.getAllRecipes,
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateRecipePayload) => recipeService.createRecipe(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => recipeService.deleteRecipe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};

export const useIngredients = () => {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: recipeService.getIngredients,
  });
};

// Di dalam useRecipe.ts tambahkan ini
export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CreateRecipePayload }) => 
      recipeService.updateRecipe({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};