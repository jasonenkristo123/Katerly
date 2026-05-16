import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { getDashboardData } from "../service/dashboard-api"
import { DashboardApiResponse } from "../types/dashboard-types"


export const useGetDashboardData = (year: number, month: number) => {
    return useQuery<DashboardApiResponse>({
        queryKey: ['dashboard', year, month],
        queryFn: () => getDashboardData(year, month)
    })
}

export const useSuspenseGetDashboardData = (year: number, month: number) => {
    return useSuspenseQuery<DashboardApiResponse>({
        queryKey: ['dashboard', year, month],
        queryFn: () => getDashboardData(year, month)
    })
}