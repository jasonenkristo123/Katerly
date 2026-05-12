"use client";

import React, { useState, useMemo } from "react";
import {
    Package,
    Plus,
    Trash2,
    ChevronRight,
    Clock,
    Users,
    TrendingDown,
    TrendingUp
} from "lucide-react";
import Button from "@/shared/components/reusable/Button";
import Link from "next/link";

interface NoteItem {
    id: string;
    nama: string;
    hppPerPorsi: number;
    jumlahPorsi: number;
    hargaPerPorsi: number;
}

interface CustomerInfo {
    nama: string;
    whatsapp: string;
    acara: string;
    tanggal: string;
}

export default function BuatNota1Section() {
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        nama: "",
        whatsapp: "",
        acara: "",
        tanggal: "",
    });

    const [items, setItems] = useState<NoteItem[]>([
        {
            id: "1",
            nama: "Nasi Box Ayam Bakar",
            hppPerPorsi: 14500,
            jumlahPorsi: 50,
            hargaPerPorsi: 22000,
        },
        {
            id: "2",
            nama: "Air Mineral 330ml",
            hppPerPorsi: 2200,
            jumlahPorsi: 50,
            hargaPerPorsi: 3000,
        }
    ]);

    const targetMargin = 35;

    const summary = useMemo(() => {
        const totalHpp = items.reduce((acc, item) => acc + (item.hppPerPorsi * item.jumlahPorsi), 0);
        const totalHargaJual = items.reduce((acc, item) => acc + (item.hargaPerPorsi * item.jumlahPorsi), 0);
        const profit = totalHargaJual - totalHpp;
        const marginActual = totalHargaJual > 0 ? (profit / totalHargaJual) * 100 : 0;

        return {
            totalHpp,
            totalHargaJual,
            profit,
            marginActual
        };
    }, [items]);

    const handleUpdateItem = (id: string, field: keyof NoteItem, value: number) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleDeleteItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount).replace("Rp", "Rp ");
    };

    return (
        <div className="w-full mx-auto px-6 md:px-10 lg:px-14 py-8 font-poppins-400">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <p className="text-graytext-secondary text-md md:text-lg font-poppins-500 mb-1">
                        Langkah 1 dari 2
                    </p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-poppins-700">
                        Buat Nota
                    </h1>
                </div>
                <Link href="/buat-nota/preview">
                    <Button
                        variant="primary"
                        size="lg"
                        className="bg-green-primary hover:bg-green-bitdark text-white rounded-full px-6 py-2.5 flex items-center border-none gap-2 transition-all shadow-sm active:scale-95"
                    >
                        Lanjut ke Preview
                        <ChevronRight size={18} />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Main Content Area */}
                <div className="xl:col-span-8 space-y-6">

                    {/* Detail Pelanggan Card */}
                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-green-superlight rounded-xl flex items-center justify-center text-green-primary">
                                <Users size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-graytext-primary font-poppins-700">
                                Detail Pelanggan
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-poppins-600 text-graytext-primary ml-1">Nama Pelanggan</label>
                                <input
                                    type="text"
                                    value={customerInfo.nama}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, nama: e.target.value })}
                                    placeholder="Nama Pelanggan"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-primary/10 focus:border-green-primary transition-all outline-none "
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-poppins-600 text-graytext-primary ml-1">No. WhatsApp</label>
                                <input
                                    type="text"
                                    value={customerInfo.whatsapp}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, whatsapp: e.target.value })}
                                    placeholder="0812-xxxx-xxxx"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-primary/10 focus:border-green-primary transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-poppins-600 text-graytext-primary ml-1">Acara</label>
                                <input
                                    type="text"
                                    value={customerInfo.acara}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, acara: e.target.value })}
                                    placeholder="Nama Acara"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-primary/10 focus:border-green-primary transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-poppins-600 text-graytext-primary ml-1">Tanggal acara</label>
                                <input
                                    type="date"
                                    value={customerInfo.tanggal}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, tanggal: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-primary/10 focus:border-green-primary transition-all outline-none text-graytext-secondary"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Item Nota Card */}
                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-superlight rounded-xl flex items-center justify-center text-green-primary">
                                    <Package size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-graytext-primary font-poppins-700">
                                    Item Nota
                                </h2>
                            </div>
                            <Button
                                variant="secondary"
                                className="flex items-center gap-2 text-sm font-poppins-600 border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors"
                            >
                                <Plus size={16} />
                                Tambah dari Resep
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {items.map((item) => {
                                const itemProfit = (item.hargaPerPorsi - item.hppPerPorsi) * item.jumlahPorsi;
                                const itemMargin = item.hargaPerPorsi > 0 ? ((item.hargaPerPorsi - item.hppPerPorsi) / item.hargaPerPorsi) * 100 : 0;

                                return (
                                    <div key={item.id} className="bg-white border border-gray-100 rounded-[24px] p-5 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-graytext-primary font-poppins-700 mb-1">
                                                    {item.nama}
                                                </h3>
                                                <p className="text-xs text-graytext-secondary font-poppins-500">
                                                    HPP: {formatCurrency(item.hppPerPorsi)} / porsi
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteItem(item.id)}
                                                className="text-gray-300 hover:text-red transition-colors p-1"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-poppins-600 text-graytext-secondary ml-1">Jumlah porsi</label>
                                                <input
                                                    type="number"
                                                    value={item.jumlahPorsi}
                                                    onChange={(e) => handleUpdateItem(item.id, "jumlahPorsi", Number(e.target.value))}
                                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-primary/10 focus:border-green-primary transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-poppins-600 text-graytext-secondary ml-1">Harga per porsi</label>
                                                <input
                                                    type="number"
                                                    value={item.hargaPerPorsi}
                                                    onChange={(e) => handleUpdateItem(item.id, "hargaPerPorsi", Number(e.target.value))}
                                                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-primary/10 focus:border-green-primary transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-poppins-600 text-graytext-secondary ml-1">Margin</label>
                                                <div className="flex items-center justify-between px-4 py-2.5 bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl h-[46px]">
                                                    <span className="text-[15px] font-bold text-[#15803D]">
                                                        {Math.round(itemMargin)}%
                                                    </span>
                                                    <span className="text-[11px] text-[#166534] font-poppins-600">
                                                        {formatCurrency(itemProfit / item.jumlahPorsi)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar Summary Area */}
                <div className="xl:col-span-4">
                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 md:p-8 sticky top-8">
                        <h2 className="text-2xl font-bold text-graytext-primary font-poppins-700 mb-8">
                            Ringkasan
                        </h2>

                        <div className="space-y-6 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-graytext-secondary font-poppins-500">Total HPP</span>
                                <span className="text-graytext-primary font-poppins-600">{formatCurrency(summary.totalHpp)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-graytext-secondary font-poppins-500">Total Harga Jual</span>
                                <span className="text-graytext-primary font-poppins-600">{formatCurrency(summary.totalHargaJual)}</span>
                            </div>
                            <div className="h-px bg-gray-100 w-full" />
                            <div className="flex justify-between items-center">
                                <span className="text-graytext-primary font-poppins-600">Profit</span>
                                <span className="text-green-primary font-bold text-lg">{formatCurrency(summary.profit)}</span>
                            </div>
                        </div>

                        {/* Margin Progress Section */}
                        <div className="bg-gray-50/50 rounded-3xl p-6 mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm font-poppins-500 text-graytext-secondary">
                                    Margin Aktual
                                </span>
                                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF4E5] border border-[#FFE7C7]">
                                    {summary.marginActual >= targetMargin ? (
                                        <TrendingUp size={12} className="text-green-primary" />
                                    ) : (
                                        <TrendingDown size={12} className="text-[#B76E00]" />
                                    )}
                                    <span className={`text-[10px] font-bold ${summary.marginActual >= targetMargin ? 'text-green-primary' : 'text-[#B76E00]'}`}>
                                        {summary.marginActual >= targetMargin ? 'Aman' : 'Tipis'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-5xl font-bold text-graytext-primary font-poppins-700">
                                    {Math.round(summary.marginActual)}%
                                </div>

                                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ease-out ${summary.marginActual >= targetMargin ? 'bg-green-primary' : 'bg-green-primary'}`}
                                        style={{ width: `${Math.min(summary.marginActual, 100)}%` }}
                                    />
                                </div>

                                <p className="text-xs text-graytext-secondary/70">
                                    Target anda: {targetMargin}%
                                </p>
                            </div>
                        </div>

                        {/* Estimation */}
                        <div className="flex items-center gap-2 text-graytext-secondary text-sm font-poppins-500">
                            <Clock size={16} />
                            <span>Estimasi pembuatan: 1m 47s</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}