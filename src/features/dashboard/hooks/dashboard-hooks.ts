import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { getDashboardData } from "../service/dashboard-api"
import { DashboardData } from "../types/dashboard-types"


export const useGetDashboardData = (year: number, month: number) => {
    return useQuery<DashboardData>({
        queryKey: ['dashboard', year, month],
        queryFn: () => getDashboardData(year, month)
    })
}

export const useSuspenseGetDashboardData = (year: number, month: number) => {
    return useSuspenseQuery<DashboardData>({
        queryKey: ['dashboard', year, month],
        queryFn: () => getDashboardData(year, month)
    })
}