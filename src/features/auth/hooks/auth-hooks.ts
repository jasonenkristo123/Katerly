import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LogOutUser, LoginGoogle, LoginUser, RegisterUser } from "../service/api";
import useAuthStore from "../store/auth-store";
import { TLoginSchema, TRegisterSchema } from "../schemas/auth-schema";


export const useLogin = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((s) => s.setUser);

    return useMutation({
        mutationFn: (data: TLoginSchema) => LoginUser(data),
        onSuccess: (data) => {
            setUser(data);
            queryClient.invalidateQueries({queryKey: ['user']});
        }
    })
}

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TRegisterSchema) => RegisterUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })
};

export const useLoginGoogle = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((s) => s.setUser);

    return useMutation({
        mutationFn: (token: string) => LoginGoogle(token),
        onSuccess: (data) => {
            setUser(data);
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })
}

export const useLogOut = () => {
    const queryClient = useQueryClient();
    const logout = useAuthStore((s) => s.logout);

    return useMutation({
        mutationFn: () => LogOutUser(),
        onSuccess: () => {
            logout();
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })
}