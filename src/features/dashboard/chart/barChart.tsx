"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { DashboardMenuPalingUntung } from '../types/dashboard-types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface MenuBarChartProps {
    data: DashboardMenuPalingUntung[];
}

function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

const MenuBarChart = ({ data }: MenuBarChartProps) => {
    const chartData: ChartData<'bar'> = {
        labels: data.map((m) => m.namaResep),
        datasets: [
            {
                label: 'Keuntungan',
                data: data.map((m) => m.profit),
                backgroundColor: '#5AC18B',
                borderRadius: 6,
                maxBarThickness: 60,
            },
        ],
    };

    const chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (ctx) => formatRupiah(ctx.parsed.y || 0),
                },
            },
        },
        datasets: {
            bar: { maxBarThickness: 60 },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#9CA3AF', font: { size: 11 } },
            },
            y: {
                grid: { color: '#F3F4F6' },
                ticks: {
                    color: '#9CA3AF',
                    font: { size: 11 },
                    callback: (v) => formatRupiah(Number(v)),
                },
            },
        },
    };

    return <Bar data={chartData} options={chartOptions} />;
};

export default MenuBarChart;