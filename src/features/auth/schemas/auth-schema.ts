import z from "zod";


export const RegisterSchema = z.object({
    namaPemilik: z.string().min(1, "Nama pemilik harus diisi"),
    email: z.email("Email tidak valid"),
    password: z.string().min(8, "Password harus minimal 8 karakter")
});

export const LoginSchema = z.object({
    email: z.email("Email tidak valid"),
    password: z.string().min(8, "Password harus minimal 8 karakter")
});

export type TLoginSchema = z.infer<typeof LoginSchema>;
export type TRegisterSchema = z.infer<typeof RegisterSchema>;

