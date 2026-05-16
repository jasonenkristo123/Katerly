"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { DashboardKeuntunganBulanIni } from '../types/dashboard-types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface KeuntunganLineChartProps {
    data: DashboardKeuntunganBulanIni[];
}

function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

const KeuntunganLineChart = ({ data }: KeuntunganLineChartProps) => {
    const chartData: ChartData<'line'> = {
        labels: data.map((k) => {
            const d = new Date(k.tanggal);
            return d.getDate().toString();
        }),
        datasets: [
            {
                label: 'Keuntungan',
                data: data.map((k) => k.keuntungan),
                borderColor: '#5AC18B',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(90, 193, 139, 0.2)');
                    gradient.addColorStop(1, 'rgba(90, 193, 139, 0)');
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHitRadius: 10,
                borderWidth: 3,
            },
        ],
    };

    const chartOptions: ChartOptions<'line'> = {
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

    return <Line data={chartData} options={chartOptions} />;
};

export default KeuntunganLineChart;