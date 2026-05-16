import { api } from "@/shared/lib/axios"

export const getHistoryInvoice = async () => {
    const response = await api.get('/notas');
    return response.data;
}

export const getHistoryInvoiceById = async (keyword?:string, type?:string) => {
    const response = await api.get(`/notas/search?keyword=${keyword}&type=${type}`);
    return response.data;
}