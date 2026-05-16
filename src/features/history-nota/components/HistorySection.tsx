"use client";

import React, { useState } from "react";
import { Search, Download } from "lucide-react";
import PaginationPage from "@/shared/components/reusable/PaginationPage";
import { useGetHistoryInvoice } from "../hooks/history-hooks";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface NotaItem {
    notaId: number;
    nomorInvoice: string;
    namaClient: string;
    noWaClient: string;
    namaAcara: string;
    tanggalAcara: string;
    pajakPersen: number;
    biayaPengantaran: number;
    totalHpp: number;
    totalHargaJual: number;
    totalProfit: number;
    marginAktual: number;
    status: string;
}

interface StatCard {
    label: string;
    value: string;
}


export default function HistorySection() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { data: historyData, isPending, error } = useGetHistoryInvoice();

    const filteredData = (historyData?.data?.notas || []).filter((item: NotaItem) =>
        item.namaClient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nomorInvoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.namaAcara.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

    if (currentPage !== safePage && totalPages > 0) {
        setCurrentPage(safePage);
    }

    const paginatedData = filteredData.slice(
        (safePage - 1) * itemsPerPage,
        safePage * itemsPerPage
    );

    const statsData: StatCard[] = [
        { label: "Total Nota", value: (historyData?.data?.totalNota || 0).toString() },
        { 
            label: "Margin Rata-Rata", 
            value: historyData?.data?.marginRataRata 
                ? `${historyData.data.marginRataRata}%`
                : "0%"
        },
        { 
            label: "Total Profit", 
            value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(
                historyData?.data?.totalProfit || 0
            )
        },
    ];

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="w-full">
            {/* ─── Header ─────────────────────────────────────────────────── */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-graytext-primary mb-2 font-poppins-700">
                    Daftar Nota
                </h1>
                <p className="text-graytext-secondary text-base font-poppins-400 max-w-3xl">
                    Lacak seluruh nota yang anda pernah buat
                </p>
            </div>

            {/* ─── Stat Cards ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
                {statsData.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl px-6 py-5 md:px-8 md:py-6 shadow-sm"
                    >
                        <p className="text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider mb-2">
                            {stat.label}
                        </p>
                        <p className={`text-2xl md:text-3xl font-poppins-700 ${index === 1
                                ? "text-green-primary"
                                : index === 2
                                    ? "text-green-primary"
                                    : "text-graytext-primary"
                            }`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* ─── Search Bar ─────────────────────────────────────────────── */}
            <div className="mb-8">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-graytext-secondary" size={20} />
                    <input
                        type="text"
                        placeholder="Cari Klien..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-12 pr-6 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-primary/10 focus:border-green-primary transition-all font-poppins-400 bg-white"
                    />
                </div>
            </div>

            {/* ─── Table ──────────────────────────────────────────────────── */}
            <div className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/30">
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider">
                                    Kode
                                </th>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider">
                                    Acara
                                </th>
                                <th className="hidden sm:table-cell px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider">
                                    Tanggal Acara
                                </th>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider text-center">
                                    Margin
                                </th>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isPending ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-16 text-center">
                                        <p className="text-graytext-secondary font-poppins-400 text-base">
                                            Memuat data...
                                        </p>
                                    </td>
                                </tr>
                            ) : paginatedData.map((item: NotaItem) => (
                                <tr key={item.notaId} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-4 md:px-8 py-4 md:py-5">
                                        <span className="font-poppins-600 text-graytext-primary text-sm md:text-[15px]">
                                            {item.nomorInvoice}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-8 py-4 md:py-5">
                                        <span className="font-poppins-400 text-graytext-primary text-sm md:text-[15px]">
                                            {item.namaAcara}
                                        </span>
                                    </td>
                                    <td className="hidden sm:table-cell px-4 md:px-8 py-4 md:py-5">
                                        <span className="font-poppins-400 text-graytext-secondary text-sm md:text-[15px]">
                                            {item.tanggalAcara}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-8 py-4 md:py-5 text-center">
                                        <span className={`font-poppins-600 text-sm md:text-[15px] ${item.marginAktual >= 30
                                                ? "text-green-primary"
                                                : "text-red-500"
                                            }`}>
                                            {item.marginAktual}%
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-8 py-4 md:py-5 whitespace-nowrap">
                                        <span className="font-poppins-600 text-graytext-primary text-sm md:text-[15px]">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.totalHargaJual)}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-8 py-4 md:py-5 text-center">
                                        <button
                                            className="inline-flex items-center justify-center text-graytext-secondary hover:text-green-primary transition-colors p-1.5 rounded-lg hover:bg-green-light"
                                            title="Download Nota"
                                        >
                                            <Download size={18} className="md:w-5 md:h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {/* Empty state */}
                            {!isPending && paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-8 py-16 text-center">
                                        <p className="text-graytext-secondary font-poppins-400 text-base">
                                            Tidak ada nota ditemukan.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ─── Pagination ─────────────────────────────────────────────── */}
            <PaginationPage
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={filteredData.length}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
}