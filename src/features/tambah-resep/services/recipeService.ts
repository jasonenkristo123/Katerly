import { api } from "@/shared/lib/axios";
import { CreateRecipePayload } from "../schemas/recipeSchema";

export const recipeService = {
  getAllRecipes: async () => {
    const response = await api.get("/recipes");
    return response.data; // Mengembalikan objek yang berisi { success, message, data }
  },

  createRecipe: async (payload: CreateRecipePayload) => {
    const response = await api.post("/recipes", payload);
    return response.data;
  },

  updateRecipe: async ({ id, payload }: { id: number; payload: CreateRecipePayload }) => {
    const response = await api.put(`/recipes/${id}`, payload);
    return response.data;
  },

  deleteRecipe: async (id: number) => {
    const response = await api.delete(`/recipes/${id}`);
    return response.data;
  },

  // Mengambil daftar master bahan baku untuk isi dropdown modal
  getIngredients: async () => {
    const response = await api.get("/ingredients");
    return response.data;
  }
};