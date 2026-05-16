import { api } from "@/shared/lib/axios"

export const getDashboardData = async (year?: number, month?: number) => {
    const response = await api.get(`/dashboard?year=${year}&month=${month}`)
    console.log(response.data);
    return response.data
}