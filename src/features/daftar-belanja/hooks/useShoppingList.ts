import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { shoppingListService } from "../services/shoppingListService";
import { GenerateShoppingListPayload } from "../schemas/shoppingListSchema";

// ==========================================
// REACT QUERY HOOKS (MANAJEMEN CACHE)
// ==========================================

export const useShoppingLists = () => {
  return useQuery({
    queryKey: ["shopping-lists"],
    queryFn: shoppingListService.getAllShoppingLists,
  });
};

export const useGenerateShoppingList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recipeIds: number[]) => {
      const payload: GenerateShoppingListPayload = { recipeIds };
      return shoppingListService.generateShoppingList(payload);
    },
    onSuccess: () => {
      // Refresh daftar belanja & resep setelah generate sukses
      queryClient.invalidateQueries({ queryKey: ["shopping-lists"] });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};

export const useDeleteShoppingList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shoppingListService.deleteShoppingList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-lists"] });
    },
  });
};

export const useUpdateItemStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, isBought }: { itemId: number; isBought: boolean }) =>
      shoppingListService.updateItemStatus(itemId, isBought),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-lists"] });
    },
  });
};
