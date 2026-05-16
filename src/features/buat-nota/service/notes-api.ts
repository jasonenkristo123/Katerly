import { api } from "@/shared/lib/axios";
import { PostType } from "../types/notes-types";

export const createNotes = async (data: PostType) => {
    const response = await api.post('/notas', data);
    return response.data;
}

export const getNoteById = async (id: number) => {
    const response = await api.get(`/notas/${id}`);
    return response.data;
}

export const downloadPdf = async (idNota: number) => {
    const response = await api.get(`/notas/${idNota}/pdf`, { responseType: 'blob' });
    return response.data;
}