import { api } from "@/shared/lib/axios";
import { GenerateShoppingListPayload } from "../schemas/shoppingListSchema";

export const shoppingListService = {
  getAllShoppingLists: async () => {
    const response = await api.get("/shopping-lists");
    return response.data;
  },

  generateShoppingList: async (payload: GenerateShoppingListPayload) => {
    const response = await api.post("/shopping-lists/generate", payload);
    return response.data;
  },

  deleteShoppingList: async (id: number) => {
    const response = await api.delete(`/shopping-lists/${id}`);
    return response.data;
  },

  updateItemStatus: async (itemId: number, isBought: boolean) => {
    const response = await api.patch(`/shopping-lists/items/${itemId}`, { isBought });
    return response.data;
  },
};
