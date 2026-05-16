import { createNotes, downloadPdf, getNoteById } from "../service/notes-api";
import { PostType } from "../types/notes-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePostNotes = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PostType) => createNotes(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['history-invoice'] });
        },
        onError: (error) => {
            console.error('Error creating nota:', error);
        },
    })
}

export const useGetNoteById = (id: number | null) => {
    return useQuery({
        queryKey: ['nota', id],
        queryFn: () => getNoteById(id!),
        enabled: !!id,
    });
}

export const useDownloadPdf = (idNota: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => downloadPdf(idNota),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nota', idNota] });
        },
        onError: (error) => {
            console.error('Error downloading pdf:', error);
        },
    })
}