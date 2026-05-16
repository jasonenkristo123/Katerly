import { useGetProfile } from "@/features/settings/hooks/profileHooks";

export const ProfileChecking = () => {
    const { data } = useGetProfile();

    if (!data) {
        return false;
    } 

    return true;
}