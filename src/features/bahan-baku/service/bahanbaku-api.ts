    import { api } from "@/shared/lib/axios"
    import type { TDeleteIngridients, TPostIngridients, TPutIngridients, TResponseAllIngridients } from "../types/bahanbaku-types";

export const getAllIngridients = async (): Promise<TResponseAllIngridients[]> => {
    const response = await api.get('/ingredients');
    return response.data;
}

    export const postIngridient = async (data: TPostIngridients) => {
        const response = await api.post('/ingredients', data);
        return response.data;
    }

    export const putIngridient = async (data: TPutIngridients) => {
        const response = await api.put(`/ingredients/${data.ingredientId}`, data);
        return response.data;
    }

    export const deleteIngridient = async (data: TDeleteIngridients) => {
        const response = await api.delete(`/ingredients/${data.ingredientId}`);
        return response.data;
    }
