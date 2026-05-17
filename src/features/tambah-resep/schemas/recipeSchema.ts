import { z } from "zod";

export const createRecipeSchema = z.object({
  namaResep: z.string().min(1, "Nama resep wajib diisi"),
  jumlahPorsi: z.number().min(1, "Jumlah porsi minimal 1"),
  margin: z.number().min(0).max(100),
  hppManual: z.number().nullable().optional(),
  ingredients: z.array(
    z.object({
      ingredientId: z.number(),
      quantity: z.number(),
    })
  ).optional(),
  isUsed: z.boolean().optional(), // Validasi payload isUsed aman dari Zod error
});

export type CreateRecipePayload = z.infer<typeof createRecipeSchema>;

// --- INTERFACE RESPONSE DATA (SINKRON FRONTEND) ---

export interface MasterIngridient {
  id?: number;
  ingredientId?: number; 
  name?: string;
  namaBahan?: string;
  nama?: string;        
  unit?: string;
  satuan?: string;
  hargaPerSatuan?: number; 
}

export interface RecipeIngredientDetail {
  ingredientId: number;
  quantity: number;
}

export interface RecipeResponse {
  recipeId: number;
  namaResep: string;
  jumlahPorsi: number;
  margin: number;
  hppManual: number | null;
  hppFinal: number;
  hargaJual: number;
  ingredients?: RecipeIngredientDetail[]; 
  isUsed?: boolean; 
}