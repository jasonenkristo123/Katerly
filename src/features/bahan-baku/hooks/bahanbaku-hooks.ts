import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteIngridient, getAllIngridients, postIngridient, putIngridient, searchIngrediens } from "../service/bahanbaku-api"
import { TDeleteIngridients, TPostIngridients, TPutIngridients } from "../types/bahanbaku-types"

export const useGetAllIngridients = () => {
    return useQuery({
        queryKey: ['ingridients'],
        queryFn: () => getAllIngridients()
    })
}

export const usePostIngridients = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TPostIngridients) => postIngridient(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingridients'] });
        }
    })
}

export const usePutIngridients = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ingredientId, ...data}: TPutIngridients) => putIngridient({ingredientId, ...data}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingridients'] });
        }
    })
}

export const useDeleteIngridients = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ingredientId}: TDeleteIngridients) => deleteIngridient({ingredientId}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingridients'] });
        }
    })
}

export const useSearchIngrediens = (keyword: string) => {
    return useQuery({
        queryKey: ['ingridients', 'search', keyword],
        queryFn: () => searchIngrediens(keyword),
        enabled: !!keyword
    })
}