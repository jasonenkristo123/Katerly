import { z } from "zod";

// ==========================================
// PAYLOAD SCHEMA (REQUEST)
// ==========================================

export const generateShoppingListSchema = z.object({
  recipeIds: z.array(z.number().min(1)).min(1, "Minimal 1 resep dipilih"),
});

export type GenerateShoppingListPayload = z.infer<typeof generateShoppingListSchema>;

// ==========================================
// INTERFACE RESPONSE DATA (SINKRON FRONTEND)
// ==========================================

export interface ShoppingListItem {
  shoppingListItemId: number;
  ingredientId: number;
  namaIngredient: string;
  satuan: string;
  totalQuantity: number;
  hargaPerSatuan: number;
  totalHarga: number;
  isBought: boolean;
}

export interface ShoppingListResponse {
  shoppingListId: number;
  namaResep: string[];
  items: ShoppingListItem[];
  totalHarga: number;
  createdAt: string;
}
