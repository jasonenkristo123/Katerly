import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/axios";
import { CreateRecipePayload } from "../schemas/recipeSchema";

// ==========================================
// 1. API SERVICES (FUNGSI AKSES BACKEND)
// ==========================================

const getRecipes = async () => {
  const response = await api.get("/recipes");
  return response.data;
};

const getIngredients = async () => {
  const response = await api.get("/ingredients"); // Jalur URL asli backend tetep 'e'
  return response.data;
};

const createRecipe = async (payload: CreateRecipePayload) => {
  const response = await api.post("/recipes", payload);
  return response.data;
};

const updateRecipe = async (id: number, payload: CreateRecipePayload) => {
  const response = await api.put(`/recipes/${id}`, payload);
  return response.data;
};

const deleteRecipe = async (id: number) => {
  const response = await api.delete(`/recipes/${id}`);
  return response.data;
};

// ==========================================
// 2. REACT QUERY HOOKS (MANAJEMEN CACHE)
// ==========================================

export const useRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });
};

export const useIngredients = () => {
  return useQuery({
    queryKey: ["ingridients"], // Stiker lokal 'i' biar sinkron & rebutan cache sama Bahan Baku
    queryFn: getIngredients,
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      // Refresh otomatis daftar resep di layar setelah tambah data sukses
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CreateRecipePayload }) =>
      updateRecipe(id, payload),
    onSuccess: () => {
      // Refresh otomatis daftar resep saat resep diedit ATAU status berubah jadi "Sudah Terpakai"
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      // Refresh otomatis daftar resep setelah aksi hapus sukses
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};