import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getActiveSubscription, getSubscriptionHistory, postSubscription, postWebhookMidtrans } from "../service/subscription-api";

export const useCreateSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => postSubscription(),
        mutationKey: ['createSubscription'],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['subscription']
            })
        }
    })
}

export const useGetActiveSubscription = () => {
    return useQuery({
        queryKey: ['subscription'],
        queryFn: () => getActiveSubscription(),
    })
}

export const useGetSubscriptionHistory = () => {
    return useQuery({
        queryKey: ['subscriptionHistory'],
        queryFn: () => getSubscriptionHistory(),
    })
}

export const usePostWebhook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => postWebhookMidtrans(),
        mutationKey: ['postWebhookMidtrans'],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['subscription']
            })
        }
    })
}


