import { api } from "@/shared/lib/axios"
import { OptionalPostProfile, OptionalProfile } from "../types/profileTypes";

export const getProfile = async (): Promise<OptionalProfile> => {
    const response = await api.get('/business-profile');
    return response.data.data;
}

export const saveProfile = async (data: OptionalPostProfile) => {
    const response = await api.post('/business-profile', data);
    return response.data;
}

export const uploadLogo = async (data: File) => {
    const formData = new FormData();
    formData.append('file', data);

    // By setting Content-Type to undefined, Axios removes the default 'application/json'
    // and allows the browser to automatically set 'multipart/form-data' WITH the correct boundary.
    const response = await api.post('/business-profile/logo', formData, {
        headers: {
            'Content-Type': undefined
        }
    });
    return response.data;
}