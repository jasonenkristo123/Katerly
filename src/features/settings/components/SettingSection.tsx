"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Trash2, Receipt } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useGetProfile, useSetProfile, useUploadLogo } from "../hooks/profileHooks";
import { useGetActiveSubscription, useGetSubscriptionHistory } from "@/features/subscription/hooks/subscription-hooks";
import Link from "next/link";


const profileSchema = z.object({
    namaUsaha: z.string().min(1, "Nama usaha wajib diisi"),
    namaPemilik: z.string().optional(),
    email: z.string().email("Email tidak valid").or(z.literal("")).optional(),
    noWhatsApp: z.string().optional(),
    alamat: z.string().optional(),
    marginDefault: z.number().min(0).max(100),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type TabKey = "profil" | "akun" | "pricing" | "berlangganan";

interface Tab {
    key: TabKey;
    label: string;
}

const tabs: Tab[] = [
    { key: "profil", label: "Profil Usaha" },
    { key: "pricing", label: "Default Pricing" },
    { key: "berlangganan", label: "Berlangganan" },
];

export default function SettingSection() {
    const [activeTab, setActiveTab] = useState<TabKey>("profil");

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: profileData } = useGetProfile();
    const { data: activeSub } = useGetActiveSubscription();
    const { data: subHistory } = useGetSubscriptionHistory();
    const setProfile = useSetProfile();
    const uploadLogo = useUploadLogo();
    const mySwal = withReactContent(Swal);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            namaUsaha: profileData?.namaUsaha || "",
            namaPemilik: "",
            email: profileData?.email,
            noWhatsApp: profileData?.noWhatsapp || "",
            alamat: profileData?.alamat === "Alamat belum diatur" ? "" : (profileData?.alamat || ""),
            marginDefault: profileData?.marginDefault || 30,
        }
    });

    const currentMarginDefault = watch("marginDefault");

    const getLogoUrl = (path: string | null | undefined) => {
        if (!path) return null;
        if (path.startsWith('http') || path.startsWith('data:image')) return path;

        // Use a relative path so the Next.js proxy (in next.config.ts) handles it, bypassing CORS
        return path.startsWith('/') ? path : `/${path}`;
    };

    const displayLogo = logoPreview || getLogoUrl(profileData?.logoPath);
    console.log(profileData?.email);

    useEffect(() => {
        if (profileData) {
            reset({
                namaUsaha: profileData.namaUsaha || "",
                namaPemilik: profileData.namaPemilik || "",
                email: profileData.email === "admin@katerly.com" ? "" : (profileData.email || ""),
                noWhatsApp: profileData.noWhatsapp || "",
                alamat: profileData.alamat === "Alamat belum diatur" ? "" : (profileData.alamat || ""),
                marginDefault: profileData.marginDefault ?? 35,
            });
        }
    }, [profileData, reset]);

    const onSubmit = (data: ProfileFormValues) => {
        const profilePayload = {
            namaUsaha: data.namaUsaha,
            email: data.email,
            noWhatsapp: data.noWhatsApp,
            alamat: data.alamat,
            marginDefault: data.marginDefault,
        };
        console.log("Saving profile payload:", profilePayload);
        setProfile.mutate(profilePayload, {
            onSuccess: () => {
                console.log("Profile saved successfully");
                mySwal.fire({
                    title: "Profil berhasil diubah!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                })
            }
        });

        if (logoFile) {
            console.log("Uploading logo file:", logoFile.name);
            uploadLogo.mutate(logoFile, {
                onSuccess: () => {
                    console.log("Logo uploaded successfully");
                    setLogoFile(null); // Clear logo file state after successful upload
                }
            });
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check if file is larger than 1MB (1 * 1024 * 1024 bytes)
            if (file.size > 1 * 1024 * 1024) {
                mySwal.fire({
                    icon: 'error',
                    title: 'File Terlalu Besar',
                    text: 'Maksimal ukuran logo adalah 1MB! Server menolak file yang lebih besar.',
                });
                // Reset input
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                return;
            }

            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteLogo = () => {
        setLogoFile(null);
        setLogoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const initials = getInitials(watch("namaUsaha") || "");

    return (
        <div className="w-full">

            <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-poppins-700 text-graytext-primary mb-1">
                    Pengaturan
                </h1>
                <p className="text-graytext-secondary text-sm md:text-base font-poppins-400">
                    Atur preferensi dan profil usaha Anda.
                </p>
            </div>

            <div className="border-b border-gray-200 mb-8 overflow-x-auto ">
                <nav className="flex gap-1 min-w-max" aria-label="Settings tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`
                                relative px-4 py-3 text-sm font-poppins-500 transition-colors whitespace-nowrap cursor-pointer
                                ${activeTab === tab.key
                                    ? "text-green-primary"
                                    : "text-graytext-secondary hover:text-graytext-primary"
                                }
                            `}
                        >
                            {tab.label}
                            {/* Active indicator bar */}
                            {activeTab === tab.key && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-primary rounded-t-full" />
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {activeTab === "profil" && (
                <div className="space-y-10">
                    <section>
                        <h2 className="text-lg md:text-xl font-poppins-700 text-graytext-primary mb-1">
                            Profil Usaha
                        </h2>
                        <p className="text-graytext-secondary text-sm font-poppins-400 mb-6">
                            Mohon perbarui pengaturan profil usaha anda di sini.
                        </p>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 shadow-sm space-y-5">
                            {/* Row 1: Nama Usaha + Nama Pemilik */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-poppins-600 text-graytext-primary mb-1.5">
                                        Nama Usaha
                                    </label>
                                    <input
                                        type="text"
                                        {...register("namaUsaha")}
                                        placeholder="Katering Mama"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-poppins-400 text-graytext-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all bg-white"
                                    />
                                    {errors.namaUsaha && <p className="text-red-500 text-xs mt-1">{errors.namaUsaha.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-poppins-600 text-graytext-primary mb-1.5">
                                        Nama Pemilik
                                    </label>
                                    <input
                                        type="text"
                                        {...register("namaPemilik")}
                                        placeholder="Bu Una"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-poppins-400 text-graytext-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all bg-white"
                                    />
                                    {errors.namaPemilik && <p className="text-red-500 text-xs mt-1">{errors.namaPemilik.message}</p>}
                                </div>
                            </div>

                            {/* Row 2: Email + No. WhatsApp */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-poppins-600 text-graytext-primary mb-1.5">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        disabled
                                        value={profileData?.email || ""}
                                        placeholder="email@gmail.com"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-poppins-400 text-graytext-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all bg-gray-100 cursor-not-allowed"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-poppins-600 text-graytext-primary mb-1.5">
                                        No. WhatsApp
                                    </label>
                                    <input
                                        type="text"
                                        {...register("noWhatsApp")}
                                        placeholder="nomor anda"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-poppins-400 text-graytext-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all bg-white"
                                    />
                                    {errors.noWhatsApp && <p className="text-red-500 text-xs mt-1">{errors.noWhatsApp.message}</p>}
                                </div>
                            </div>

                            {/* Row 3: Alamat (full width) */}
                            <div>
                                <label className="block text-xs font-poppins-600 text-graytext-primary mb-1.5">
                                    Alamat
                                </label>
                                <input
                                    type="text"
                                    {...register("alamat")}
                                    placeholder="jalan kebayoran"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-poppins-400 text-graytext-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all bg-white"
                                />
                                {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat.message}</p>}
                            </div>
                        </div>
                    </section>

                    {/* Logo & Branding */}
                    <section>
                        <h2 className="text-lg md:text-xl font-poppins-700 text-graytext-primary mb-6">
                            Logo & Branding
                        </h2>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 shadow-sm">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                {/* Logo Preview / Initials Avatar */}
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-green-primary flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                                    {displayLogo ? (
                                        <Image
                                            src={displayLogo}
                                            width={80}
                                            height={80}
                                            alt="Logo preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white text-2xl md:text-3xl font-poppins-700">
                                            {initials}
                                        </span>
                                    )}
                                </div>

                                {/* Upload & Delete Buttons */}
                                <div className="flex items-center gap-3">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                        id="logo-upload"
                                    />
                                    <button
                                        onClick={triggerFileInput}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-full text-sm font-poppins-500 text-graytext-primary hover:border-green-primary hover:text-green-primary transition-all cursor-pointer bg-white hover:shadow-sm"
                                    >
                                        <Upload size={16} />
                                        Upload Logo
                                    </button>
                                    {(logoPreview || logoFile) && (
                                        <button
                                            onClick={handleDeleteLogo}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red text-white rounded-full text-sm font-poppins-500 hover:bg-red/90 transition-all cursor-pointer shadow-sm"
                                        >
                                            <Trash2 size={16} />
                                            Hapus Logo
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* ── DEFAULT PRICING ── */}
            {activeTab === "pricing" && (
                <div className="space-y-10">
                    <section>
                        <h2 className="text-lg md:text-xl font-poppins-700 text-graytext-primary mb-1">
                            Default Pricing
                        </h2>
                        <p className="text-graytext-secondary text-sm font-poppins-400 mb-6">
                            Margin & overhead default yang akan dipakai untuk semua resep baru.
                        </p>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 shadow-sm">
                            {/* Label + Value */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-poppins-600 text-graytext-primary">
                                    Margin Default
                                </span>
                                <span className="text-2xl md:text-3xl font-poppins-700 text-green-primary">
                                    {currentMarginDefault}%
                                </span>
                            </div>

                            {/* Slider */}
                            <div className="relative w-full">
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    {...register("marginDefault", { valueAsNumber: true })}
                                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-green-primary"
                                    style={{
                                        background: `linear-gradient(to right, var(--color-green-primary) 0%, var(--color-green-primary) ${currentMarginDefault}%, #e5e7eb ${currentMarginDefault}%, #e5e7eb 100%)`,
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* ── BERLANGGANAN ── */}
            {activeTab === "berlangganan" && (
                <div className="space-y-10">
                    {/* Current Plan */}
                    <section>
                        <h2 className="text-lg md:text-xl font-poppins-700 text-graytext-primary mb-6">
                            Paket Saat Ini
                        </h2>

                        <div className="bg-linear-to-r from-green-primary to-green-bitdark rounded-2xl p-5 md:p-8 shadow-sm relative overflow-hidden">
                            {/* Decorative subtle pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <span className="inline-block text-[10px] font-poppins-600 text-white/70 uppercase tracking-wider mb-1">
                                        AKTIF
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-poppins-700 text-white mb-1">
                                        Katerly <span>{(profileData?.premium || activeSub) ? 'Pro' : 'Starter'}</span>
                                    </h3>
                                    <p className="text-white/70 text-xs md:text-sm font-poppins-400">
                                        {activeSub?.endDate ? `Berlaku sampai ${new Date(activeSub.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` : '-'}
                                    </p>
                                </div>
                                <Link href="/subscription">
                                    <button className="px-6 py-2.5 bg-white text-green-primary rounded-full text-sm font-poppins-600 hover:shadow-md transition-all cursor-pointer shrink-0">
                                        Kelola
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Payment History */}
                    <section>
                        <h2 className="text-lg md:text-xl font-poppins-700 text-graytext-primary mb-6">
                            Riwayat Pembayaran Terbaru
                        </h2>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 shadow-sm">
                            {subHistory ? (
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                                            <Receipt size={20} className="text-green-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-poppins-600 text-graytext-primary">
                                                Pembayaran Paket Pro
                                            </p>
                                            <p className="text-xs font-poppins-400 text-graytext-secondary">
                                                Order ID: {subHistory.midtransOrderId} • {new Date(subHistory.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-poppins-600 text-graytext-primary">
                                            Rp {subHistory.amount.toLocaleString('id-ID')}
                                        </p>
                                        <p className={`text-xs font-poppins-500 uppercase ${subHistory.status === 'settlement' || subHistory.status === 'capture' ? 'text-green-primary' : 'text-orange-500'}`}>
                                            {subHistory.status}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm font-poppins-400 text-graytext-secondary text-center py-4">Belum ada riwayat pembayaran.</p>
                            )}
                        </div>
                    </section>
                </div>
            )}

            {/* ── SAVE BUTTON ── */}
            <div className="flex justify-end mt-8 mb-8">
                <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={setProfile.isPending || uploadLogo.isPending}
                    className="px-6 py-2.5 bg-green-primary text-white rounded-xl text-sm font-poppins-600 hover:bg-green-primary/90 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                >
                    {setProfile.isPending || uploadLogo.isPending ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
            </div>

        </div>
    );
}