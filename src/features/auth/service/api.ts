import { api } from "@/shared/lib/axios";
import { TLoginSchema, TRegisterSchema } from "../schemas/auth-schema";


export const RegisterUser = async (data: TRegisterSchema) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};

export const LoginUser = async (data: TLoginSchema) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};

export const LoginGoogle = async (token: string) => {
    const response = await api.post('/auth/google', {token});
    return response.data;
}

export const LogOutUser = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
}