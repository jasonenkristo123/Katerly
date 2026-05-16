import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProfile, saveProfile, uploadLogo } from "../service/profileApi"
import { OptionalPostProfile } from "../types/profileTypes"


export const useGetProfile = () => {
    return useQuery({
        queryFn: () => getProfile(),
        queryKey: ['profile'],
    })
}

export const useSetProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: OptionalPostProfile) => saveProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
        onError: (error) => {
            console.error('Error updating profile:', error);
        },
    })
}

export const useUploadLogo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: File) => uploadLogo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
        onError: (error) => {
            console.error('Error uploading logo:', error);
        },
    })
}