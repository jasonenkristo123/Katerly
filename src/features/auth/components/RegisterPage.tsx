"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegister } from "../hooks/auth-hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterSchema, TRegisterSchema } from "../schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const { mutateAsync } = useRegister();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        },
        reset,
        setError
    } = useForm<TRegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            namaPemilik: "",
            email: "",
            password: ""
        }
    });

    const mySwal = withReactContent(Swal);
    const successAlert = () => {
        mySwal.fire({
            title: "Berhasil Buat Akun!",
            text: "Silahkan Login Akun Anda",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didClose: () => {
                router.push("/dashboard");
            }
        })
    }

    const onSubmit = async (data: TRegisterSchema) => {
        try {
            await mutateAsync(data, {
                onSuccess: () => {
                    successAlert();
                    reset();
                }
            })
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>
            setError('root', {
                message:
                    error?.response?.data?.message || "Gagal membuat akun, pastikan email belum terdaftar"
            })
        }
    }

    return (
        <section className="flex min-h-screen w-full bg-white font-['Poppins']">

            <div className="flex w-full flex-col md:items-center px-6 py-8 lg:w-1/2 lg:px-12">

                <div className="mb-2">
                    <Link href="/">
                        <h1 className="font-anonymous-700 text-4xl lg:text-5xl text-green-bold">
                            Kater<span className="text-black">Ly</span>
                        </h1>
                    </Link>
                </div>

                <div className="flex flex-col mt-40">
                    <div className="mb-6">
                        <h1 className="text-4xl lg:text-5xl font-bold text-black">
                            Buat akun
                        </h1>

                        <div className="mt-2">
                            <span className="text-lg text-graytext-secondary">
                                Sudah punya akun?
                            </span>

                            <Link
                                href="/login"
                                className="ml-2 text-lg font-semibold text-green-primary hover:underline"
                            >
                                Masuk
                            </Link>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-[520px] flex-col gap-4">
                        {errors.root && (
                            <div className="bg-red-100 p-3 text-red-700 rounded-xl text-center">
                                {errors.root.message}
                            </div>
                        )}


                        <div className="flex flex-col gap-2">
                            <label className="text-lg text-black">
                                Nama Anda
                            </label>

                            <input
                                type="text"
                                placeholder="Nama Anda"
                                className="rounded-xl border border-gray-200 px-5 py-3 text-base shadow-sm outline-none focus:border-green-primary"
                                {...register("namaPemilik")}
                            />
                            {errors.namaPemilik && (
                                <span className="text-red-500">{errors.namaPemilik.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-lg text-black">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="nama@gmail.com"
                                className="rounded-xl border border-gray-200 px-5 py-3 text-base shadow-sm outline-none focus:border-green-primary"
                                {...register("email")}
                            />
                            {errors.email && (
                                <span className="text-red-500">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-lg text-black">
                                Password
                            </label>

                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Minimal 8 Karakter"
                                    className="rounded-xl border border-gray-200 px-5 py-3 text-base shadow-sm w-full outline-none relative focus:border-green-primary"
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-4"
                                >
                                    {showPassword ? (
                                        <Eye className="h-6 w-6 text-gray-500" />
                                    ) : (
                                        <EyeOff className="h-6 w-6 text-gray-500" />
                                    )}
                                </button>

                            </div>
                            {errors.password && (
                                <span className="text-red-500">{errors.password.message}</span>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex h-14 w-full items-center justify-center rounded-xl bg-green-bold text-lg text-white shadow-md transition hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Membuat akun...' : 'Buat akun gratis'}
                            </button>

                            <p className="mt-3 text-center text-sm text-graytext-secondary">
                                Dengan mendaftar Anda menyetujui
                                Syarat & Kebijakan Privasi Katerly.
                            </p>
                        </div>

                    </form>
                </div>
            </div>

            <div className="relative hidden lg:block lg:w-1/2">
                <Image
                    className="object-cover"
                    src="/images/Login-bg.webp"
                    alt="Spaghetti"
                    fill
                    priority
                />
            </div>

        </section>
    );
}