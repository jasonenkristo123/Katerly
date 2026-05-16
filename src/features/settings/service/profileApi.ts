import { api } from "@/shared/lib/axios"

export const getProfile = async () => {
    const response = await api.get('/business-profile');
    return response.data;
}