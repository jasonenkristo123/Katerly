"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLogin, useLoginGoogle } from "../hooks/auth-hooks";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

import { LoginSchema, TLoginSchema } from "../schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { getProfile } from "@/features/settings/service/profileApi";

export default function LoginPage() {
    const router = useRouter();
    const { mutateAsync } = useLogin();
    const { mutateAsync: mutateAsyncGoogle } = useLoginGoogle();
    const [uxMode, setUxMode] = useState<"popup" | "redirect">("popup");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Use setTimeout to avoid 'setState synchronously within an effect' warning
        const timer = setTimeout(() => {
            if (typeof window !== "undefined") {
                setUxMode(window.innerWidth > 768 ? "popup" : "redirect");
            }
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError
    } = useForm<TLoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const mySwal = withReactContent(Swal);

    const onSubmit = async (data: TLoginSchema) => {
        try {
            await mutateAsync(data);
            
            // Check if profile exists after successful login
            let hasBusinessProfile = false;
            try {
                const profile = await getProfile();
                if (profile && Object.keys(profile).length > 0) {
                    hasBusinessProfile = true;
                }
            } catch {
                console.log("No profile found, routing to onboarding");
            }
            
            successAlert(hasBusinessProfile);
            reset();
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>
            setError("root", {
                message: error?.response?.data?.message || "Gagal login, silahkan cek kembali email atau password Anda"
            })
        }
    }

    const successAlert = (hasBusinessProfile: boolean) => {
        mySwal.fire({
            title: "Login Berhasil!",
            icon: "success",
            text: "Selamat Datang di Katerly",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didClose: () => {
                if (hasBusinessProfile) {
                    router.push("/dashboard")
                } else {
                    router.push("/onboarding");
                }
            }
        })
    }

    const errorAlert = (message: string) => {
        mySwal.fire({
            title: "Login Gagal!",
            icon: "error",
            text: message,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })
    }

    const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
        try {
            const token = credentialResponse.credential || "";
            await mutateAsyncGoogle(token);
            
            // Check if profile exists after successful Google login
            let hasBusinessProfile = false;
            try {
                const profile = await getProfile();
                if (profile && Object.keys(profile).length > 0) {
                    hasBusinessProfile = true;
                }
            } catch {
                console.log("No profile found, routing to onboarding");
            }
            
            successAlert(hasBusinessProfile);
        } catch {
            errorAlert("Coba Login Kembali");
        }
    }



    return (
        <section className="flex h-screen w-full bg-white font-['Poppins']">

            <div className="flex w-full flex-col md:items-center px-6 py-8 lg:w-1/2 lg:px-12">

                <div className="flex flex-col mt-20 xl:mt-40">

                    <div className="mb-6">
                        <h1 className="text-4xl lg:text-5xl font-bold text-black">
                            Selamat Datang
                        </h1>

                        <div className="mt-2">
                            <span className="text-lg text-graytext-secondary">
                                Belum punya akun?
                            </span>

                            <Link
                                href="/register"
                                className="ml-2 text-lg font-semibold text-green-primary hover:underline"
                            >
                                Daftar
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
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="nama@gmail.com"
                                className="rounded-xl border border-gray-200 px-5 py-3 text-base text-graytext-secondary shadow-sm outline-none focus:border-green-primary"
                                {...register("email")}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-lg text-black">
                                Password
                            </label>

                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Minimal 8 Karakter"
                                    className="rounded-xl border border-gray-200 px-5 py-3 text-base text-graytext-secondary shadow-sm w-full outline-none focus:border-green-primary"
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
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        <div className="flex flex-col gap-3 pt-4">

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex h-14 w-full items-center justify-center rounded-xl bg-green-bold text-lg text-white shadow-md transition hover:opacity-90"
                            >
                                {isSubmitting ? "Loading..." : "Masuk"}
                            </button>

                            <p className="text-center text-sm text-graytext-secondary">
                                ATAU
                            </p>

                            <div className="flex w-full justify-center">
                                <GoogleLogin
                                    size="large"
                                    type="standard"
                                    text="signin_with"
                                    theme="outline"
                                    shape="rectangular"
                                    ux_mode={uxMode}
                                    onSuccess={handleGoogleLogin}
                                    onError={() => {
                                        console.log("Login Failed")
                                    }}
                                />
                            </div>



                            <p className="pt-2 text-center text-sm text-graytext-secondary">
                                Dengan mendaftar Anda menyetujui
                                Syarat & Kebijakan Privasi Katerly.
                            </p>

                        </div>

                    </form>
                </div>

            </div>

            <div className="relative hidden lg:block lg:w-1/2">
                <Image
                    src="/images/Login-bg.webp"
                    alt="Spaghetti"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

        </section>
    );
}