"use client";

import {
    TrendingUp,
    TrendingDown,
    Clock,
    Plus,
    Calculator
} from 'lucide-react';
import Link from 'next/link';
import { useGetDashboardData } from '../hooks/dashboard-hooks';
import DashboardSkeleton from './DashboardSkeleton';
import KeuntunganLineChart from '../chart/lineChart';
import MenuBarChart from '../chart/barChart';


function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}


function formatPercent(value: number): string {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
}

interface DashboardContentProps {
    year: number;
    month: number;
}

export default function DashboardContent({ year, month }: DashboardContentProps) {
    const { data: response, isLoading } = useGetDashboardData(year, month);
    const dashboard = response?.data;

    if (isLoading || !dashboard) {
        return <DashboardSkeleton />;
    }

    // --- Stats cards config ---
    const stats = dashboard
        ? [
            {
                label: 'Pendapatan',
                value: formatRupiah(dashboard.totalPendapatan),
                trend: formatPercent(dashboard.pendapatanChangePercent),
                isPositive: dashboard.pendapatanChangePercent >= 0,
            },
            {
                label: 'Keuntungan Bersih',
                value: formatRupiah(dashboard.totalKeuntungan),
                trend: formatPercent(dashboard.keuntunganChangePercent),
                isPositive: dashboard.keuntunganChangePercent >= 0,
            },
            {
                label: 'Margin Rata-Rata',
                value: `${dashboard.marginRataRata.toFixed(1)}%`,
                trend: formatPercent(dashboard.marginChangePercent),
                isPositive: dashboard.marginChangePercent >= 0,
            },
            {
                label: 'Nota Dibuat',
                value: dashboard.totalNota.toString(),
                trend: formatPercent(dashboard.notaChangePercent),
                isPositive: dashboard.notaChangePercent >= 0,
            },
        ]
        : [];

    return (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col gap-2">
                        <p className="text-graytext-secondary text-sm font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-black">{stat.value}</p>
                        <div className={`flex items-center gap-1 w-fit px-2 py-0.5 rounded-md text-[10px] font-bold ${stat.isPositive ? 'bg-green-superlight text-green-primary' : 'bg-bg-primary text-brown'
                            }`}>
                            {stat.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {stat.trend}
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts and Lists Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Keuntungan Chart */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col h-[400px]">
                    <h3 className="text-xl font-bold text-black mb-6">Keuntungan Bulan Ini</h3>
                    <div className="flex-1 w-full">
                        {dashboard.keuntunganBulanIni.length > 0 ? (
                            <KeuntunganLineChart data={dashboard.keuntunganBulanIni} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-graytext-secondary">Belum ada data keuntungan</div>
                        )}
                    </div>
                </div>

                {/* Menu Terbaru */}
                <div className="bg-white p-8 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-black">Menu Terbaru</h3>
                        <Clock size={20} className="text-graytext-secondary" />
                    </div>
                    <div className="space-y-6">
                        {dashboard.menuTerakhir.length > 0 ? (
                            dashboard.menuTerakhir.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <span className="font-bold text-graytext-primary">{item.namaResep}</span>
                                    <span className="text-sm text-graytext-secondary">{item.totalPorsi} pesanan bulan ini</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-graytext-secondary text-sm">Belum ada menu</p>
                        )}
                    </div>
                </div>

                {/* Menu Paling Menguntungkan */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col h-[400px]">
                    <h3 className="text-xl font-bold text-black mb-6">Menu Paling Menguntungkan</h3>
                    <div className="flex-1 w-full">
                        {dashboard.menuPalingUntung.length > 0 ? (
                            <MenuBarChart data={dashboard.menuPalingUntung} />
                        ) : (
                            <div className="flex items-center justify-center h-full text-graytext-secondary">Belum ada data menu</div>
                        )}
                    </div>
                </div>

                {/* Nota Terbaru */}
                <div className="bg-white p-8 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-black">Nota Terbaru</h3>
                        <Link href="/history" className="text-sm font-bold text-green-primary">Lihat Semua</Link>
                    </div>
                    <div className="space-y-4">
                        {dashboard.notaTerbaru.length > 0 ? (
                            dashboard.notaTerbaru.map((nota, idx) => (
                                <div key={idx} className="p-4 bg-gray-50/50 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-graytext-primary">{nota.namaClient}</p>
                                        <p className="text-[10px] text-graytext-secondary">{nota.nomorInvoice} • {nota.tanggal}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-graytext-primary">{formatRupiah(nota.totalHargaJual)}</p>
                                        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold ml-auto w-fit ${nota.marginAktual >= 0
                                            ? 'bg-green-superlight text-green-primary'
                                            : 'bg-bg-primary text-brown'
                                            }`}>
                                            {nota.marginAktual >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                            {formatPercent(nota.marginAktual)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-graytext-secondary text-sm">Belum ada nota</p>
                        )}
                    </div>
                </div>
            </div>

            <Link href="/buat-nota">
                <div className="bg-white p-6 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex items-center justify-between group cursor-pointer hover:border-green-primary/30 transition-all">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-green-superlight flex items-center justify-center text-green-primary">
                            <Calculator size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-black">Tambah Nota</h3>
                            <p className="text-graytext-secondary">Hitung & Kirim dalam 2 menit</p>
                        </div>
                    </div>
                    <Plus size={32} className="text-graytext-secondary group-hover:text-green-primary transition-colors" />
                </div>
            </Link>
        </>
    );
}
