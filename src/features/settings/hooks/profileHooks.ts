import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../service/profileApi"


export const useGetProfile = () => {
    return useQuery({
        queryFn: () => getProfile(),
        queryKey: ['profile'],
    })
}

