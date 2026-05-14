"use client";

import React, { useState, useRef } from "react";
import { Upload, Trash2, CreditCard } from "lucide-react";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BusinessProfile {
    namaUsaha: string;
    namaPemilik: string;
    email: string;
    noWhatsApp: string;
    alamat: string;
}

interface AccountInfo {
    namaLengkap: string;
    email: string;
}

type TabKey = "profil" | "akun" | "pricing" | "berlangganan";

interface Tab {
    key: TabKey;
    label: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const tabs: Tab[] = [
    { key: "profil", label: "Profil Usaha" },
    { key: "akun", label: "Akun & Keamanan" },
    { key: "pricing", label: "Default Pricing" },
    { key: "berlangganan", label: "Berlangganan" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function SettingSection() {
    const [activeTab, setActiveTab] = useState<TabKey>("profil");

    // ── Business Profile State ──
    const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
        namaUsaha: "",
        namaPemilik: "",
        email: "",
        noWhatsApp: "",
        alamat: "",
    });

    // ── Account Info State ──
    const [accountInfo] = useState<AccountInfo>({
        namaLengkap: "",
        email: "",
    });

    // ── Logo State ──
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ── Default Pricing State ──
    const [marginDefault, setMarginDefault] = useState(35);

    // ── Handlers ──

    const handleProfileChange = (field: keyof BusinessProfile, value: string) => {
        setBusinessProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
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

    // ── Initials for fallback avatar ──
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const initials = getInitials(businessProfile.namaUsaha);

    return (
        <div className="w-full">
            {/* ─── Header ─────────────────────────────────────────────────── */}
            <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-poppins-700 text-graytext-primary mb-1">
                    Pengaturan
                </h1>
                <p className="text-graytext-secondary text-sm md:text-base font-poppins-400">
                    Atur preferensi dan profil usaha Anda.
                </p>
            </div>

            {/* ─── Tab Navigation ────────────────────────────────────────── */}
            <div className="border-b border-gray-200 mb-8 overflow-x-auto ">
                <nav className="flex gap-1 min-w-max" aria-label="Settings tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`
                                relative px-4 py-3 text-sm font-poppins-500 transition-colors whitespace-nowrap cursor-pointer
                                ${
                                    activeTab === tab.key
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

            {/* ─── Tab Content ───────────────────────────────────────────── */}

            {/* ── PROFIL USAHA ── */}
            {activeTab === "profil" && (
                <div className="space-y-10">
                    {/* Business Profile Form */}
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
                                        value={businessProfile.namaUsaha}
                                        onChange={(e) =>
                                            handleProfileChange("namaUsaha", e.target.value)
                                        }
                                        placeholder="Katering Mama"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-poppins-400 text-graytext-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-poppins-600 text-graytext-primary mb-1.5">
                                        Nama Pemilik
                                    </label>
                                    <input
                                        type="text"
                                        value={businessProfile.namaPemilik}
                                        onChange={(e) =>
                                            handleProfileChange("namaPemilik", e.target.value)
                                        }
                                        placeholder="Bu Una"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-poppins-400 text-graytext-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all bg-white"
                                    />
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
                                        value={businessProfile.email}
                                        onChange={(e) =>
                                            handleProfileChange("email", e.target.value)
                                        }
                                        placeholder="email@gmail.com"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-poppins-400 text-graytext-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-poppins-600 text-graytext-primary mb-1.5">
                                        No. WhatsApp
                                    </label>
                                    <input
                                        type="text"
                                        value={businessProfile.noWhatsApp}
                                        onChange={(e) =>
                                            handleProfileChange("noWhatsApp", e.target.value)
                                        }
                                        placeholder="nomor anda"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-poppins-400 text-graytext-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all bg-white"
                                    />
                                </div>
                            </div>

                            {/* Row 3: Alamat (full width) */}
                            <div>
                                <label className="block text-xs font-poppins-600 text-graytext-primary mb-1.5">
                                    Alamat
                                </label>
                                <input
                                    type="text"
                                    value={businessProfile.alamat}
                                    onChange={(e) =>
                                        handleProfileChange("alamat", e.target.value)
                                    }
                                    placeholder="jalan kebayoran"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-poppins-400 text-graytext-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 focus:border-green-primary transition-all bg-white"
                                />
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
                                    {logoPreview ? (
                                        <Image
                                            src={logoPreview}
                                            width={50}
                                            height={50}
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

            {/* ── AKUN & KEAMANAN ── */}
            {activeTab === "akun" && (
                <div className="space-y-10">
                    <section>
                        <h2 className="text-lg md:text-xl font-poppins-700 text-graytext-primary mb-1">
                            Informasi Akun
                        </h2>
                        <p className="text-graytext-secondary text-sm font-poppins-400 mb-6">
                            Detail informasi akun Anda.
                        </p>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-poppins-600 text-graytext-primary mb-1.5">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        value={accountInfo.namaLengkap}
                                        readOnly
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-poppins-400 text-graytext-secondary bg-gray-50 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-poppins-600 text-graytext-primary mb-1.5">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={accountInfo.email}
                                        readOnly
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-poppins-400 text-graytext-secondary bg-gray-50 cursor-not-allowed"
                                    />
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
                                    {marginDefault}%
                                </span>
                            </div>

                            {/* Slider */}
                            <div className="relative w-full">
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={marginDefault}
                                    onChange={(e) => setMarginDefault(Number(e.target.value))}
                                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-green-primary"
                                    style={{
                                        background: `linear-gradient(to right, var(--color-green-primary) 0%, var(--color-green-primary) ${marginDefault}%, #e5e7eb ${marginDefault}%, #e5e7eb 100%)`,
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
                                        Katerly Pro
                                    </h3>
                                    <p className="text-white/70 text-xs md:text-sm font-poppins-400">
                                        Diperbarui otomatis pada 27 Mei 2026
                                    </p>
                                </div>
                                <button className="px-6 py-2.5 bg-white text-green-primary rounded-full text-sm font-poppins-600 hover:shadow-md transition-all cursor-pointer shrink-0">
                                    Kelola
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section>
                        <h2 className="text-lg md:text-xl font-poppins-700 text-graytext-primary mb-6">
                            Metode Pembayaran
                        </h2>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-8 shadow-sm">
                            <div className="flex items-center gap-4">
                                {/* Card Icon */}
                                <div className="w-12 h-8 bg-[#1a1f71] rounded-md flex items-center justify-center shrink-0">
                                    <span className="text-white text-[10px] font-poppins-700 tracking-widest">
                                        VISA
                                    </span>
                                </div>

                                {/* Card Details */}
                                <div>
                                    <p className="text-sm font-poppins-600 text-graytext-primary flex items-center gap-1.5">
                                        <CreditCard size={14} className="text-graytext-secondary" />
                                        •••• 4242
                                    </p>
                                    <p className="text-xs font-poppins-400 text-graytext-secondary">
                                        Berlaku s/d 12/27
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}