import { TSubsResponse } from "@/features/subscription/types/snap";
import { api } from "@/shared/lib/axios"


export const postSubscription = async (): Promise<TSubsResponse> => {
    const response = await api.post('/subscriptions/create');
    console.log(response.data.data);
    return response.data.data;
}

export const postWebhookMidtrans = async () => {
    const response = await api.post('/subscriptions/webhook');
    console.log(response.data.data);
    return response.data.data;
}

export const getActiveSubscription = async () => {
    const response = await api.get('/subscriptions/active');
    return response.data.data;
}

export const getSubscriptionHistory = async () => {
    const response = await api.get('/subscriptions/history');
    // Ensure we return null instead of undefined for React Query, 
    // and correctly handle the data wrapper if present.
    const dataArray = Array.isArray(response.data) ? response.data : response.data?.data;
    return (dataArray && dataArray.length > 0) ? dataArray[0] : null;
}