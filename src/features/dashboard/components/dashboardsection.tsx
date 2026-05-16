"use client";

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
    TrendingUp,
    TrendingDown,
    Clock,
    Plus,
    ChevronDown,
    Calculator
} from 'lucide-react';
import Link from 'next/link';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const DashboardSection = () => {
    // Mock Data for Line Chart
    const lineData: ChartData<'line'> = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Keuntungan',
                data: [30, 45, 40, 55, 60, 75, 95],
                borderColor: '#0fa05c',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(15, 160, 92, 0.2)');
                    gradient.addColorStop(1, 'rgba(15, 160, 92, 0)');
                    return gradient;
                },
                fill: false,
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 4,
            },
        ],
    };

    const lineOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                display: true,
            },
            y: {
                display: true,
            },
        },
    };

    // Mock Data for Bar Chart
    const barData: ChartData<'bar'> = {
        labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        datasets: [
            {
                label: 'Menu',
                data: [40, 65, 45, 45, 80, 85, 35, 68, 80, 80],
                backgroundColor: '#5AC18B',
                borderRadius: 6,
                maxBarThickness: 60
            },
        ],
    };

    const barOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        datasets: {
            bar: {
                maxBarThickness: 60
            }
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
    };

    return (
        <div className="space-y-8 w-full mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-poppins-700 text-black">Hai, Katering Sejahtera!</h1>
                    <p className="text-graytext-secondary mt-1">Ringkasan singkat usaha catering hari ini.</p>
                </div>
                <button className="flex items-center gap-2 bg-green-primary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-green-bitdark transition-colors w-fit">
                    Bulan ini <ChevronDown size={20} />
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Pendapatan', value: 'Rp 18.000.000', trend: '+20%', isPositive: true },
                    { label: 'Keuntungan Bersih', value: 'Rp 18.000.000', trend: '+20%', isPositive: true },
                    { label: 'Margin Rata-Rata', value: '30,3%', trend: '-1,4%', isPositive: false },
                    { label: 'Nota Dibuat', value: '24', trend: '+20%', isPositive: true },
                ].map((stat, i) => (
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
                        <Line data={lineData} options={lineOptions} />
                    </div>
                </div>

                {/* Menu Terbaru */}
                <div className="bg-white p-8 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-black">Menu Terbaru</h3>
                        <Clock size={20} className="text-graytext-secondary" />
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex items-center justify-between">
                                <span className="font-bold text-graytext-primary">Nasi Box</span>
                                <span className="text-sm text-graytext-secondary">200 pesanan bulan ini</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Menu Paling Menguntungkan */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col h-[400px]">
                    <h3 className="text-xl font-bold text-black mb-6">Menu Paling Menguntungkan</h3>
                    <div className="flex-1 w-full">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>

                {/* Quotation Terbaru */}
                <div className="bg-white p-8 rounded-3xl shadow-md shadow-gray-300 border border-gray-50 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-black">Quotation Terbaru</h3>
                        <Link href="/history" className="text-sm font-bold text-green-primary">Lihat Semua</Link>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="p-4 bg-gray-50/50 rounded-2xl flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-graytext-primary">Nasi Box</p>
                                    <p className="text-[10px] text-graytext-secondary">INV-0231 • Hari ini</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-graytext-primary">Rp 1.500.000</p>
                                    <div className="flex items-center gap-1 bg-green-superlight text-green-primary px-1.5 py-0.5 rounded text-[8px] font-bold ml-auto w-fit">
                                        <TrendingUp size={10} /> +20%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Action */}
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
        </div>
    );
};

export default DashboardSection;
