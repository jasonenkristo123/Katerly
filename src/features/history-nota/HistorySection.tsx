"use client";

import React, { useState } from "react";
import { Search, Download } from "lucide-react";
import PaginationPage from "@/shared/components/reusable/PaginationPage";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface NotaItem {
    id: number;
    kode: string;
    acara: string;
    tanggalAcara: string;
    margin: string;
    marginColor: "green" | "red";
    total: string;
}

// ─── Dummy Data ──────────────────────────────────────────────────────────────

const dummyNotaData: NotaItem[] = [
    { id: 1, kode: "INV-101", acara: "Arisan", tanggalAcara: "11 Mei 2025", margin: "5%", marginColor: "green", total: "Rp 250.000" },
    { id: 2, kode: "INV-102", acara: "Arisan", tanggalAcara: "20 Mei 2025", margin: "40%", marginColor: "green", total: "Rp 400.000" },
    { id: 3, kode: "INV-103", acara: "Pernikahan", tanggalAcara: "25 Mei 2025", margin: "15%", marginColor: "green", total: "Rp 1.200.000" },
    { id: 4, kode: "INV-104", acara: "Ulang Tahun", tanggalAcara: "1 Jun 2025", margin: "8%", marginColor: "green", total: "Rp 350.000" },
    { id: 5, kode: "INV-105", acara: "Rapat Kantor", tanggalAcara: "5 Jun 2025", margin: "12%", marginColor: "green", total: "Rp 500.000" },
    { id: 6, kode: "INV-106", acara: "Pengajian", tanggalAcara: "10 Jun 2025", margin: "3%", marginColor: "red", total: "Rp 180.000" },
    { id: 7, kode: "INV-107", acara: "Arisan", tanggalAcara: "12 Jun 2025", margin: "25%", marginColor: "green", total: "Rp 600.000" },
    { id: 8, kode: "INV-108", acara: "Syukuran", tanggalAcara: "18 Jun 2025", margin: "10%", marginColor: "green", total: "Rp 450.000" },
    { id: 9, kode: "INV-109", acara: "Pernikahan", tanggalAcara: "22 Jun 2025", margin: "35%", marginColor: "green", total: "Rp 2.000.000" },
    { id: 10, kode: "INV-110", acara: "Arisan", tanggalAcara: "28 Jun 2025", margin: "7%", marginColor: "green", total: "Rp 300.000" },
    { id: 11, kode: "INV-111", acara: "Rapat Kantor", tanggalAcara: "2 Jul 2025", margin: "18%", marginColor: "green", total: "Rp 550.000" },
    { id: 12, kode: "INV-112", acara: "Ulang Tahun", tanggalAcara: "8 Jul 2025", margin: "2%", marginColor: "red", total: "Rp 200.000" },
    { id: 13, kode: "INV-113", acara: "Pengajian", tanggalAcara: "15 Jul 2025", margin: "20%", marginColor: "green", total: "Rp 750.000" },
    { id: 14, kode: "INV-114", acara: "Arisan", tanggalAcara: "20 Jul 2025", margin: "30%", marginColor: "green", total: "Rp 400.000" },
    { id: 15, kode: "INV-115", acara: "Pernikahan", tanggalAcara: "25 Jul 2025", margin: "22%", marginColor: "green", total: "Rp 1.800.000" },
];

// ─── Stats Data ──────────────────────────────────────────────────────────────

interface StatCard {
    label: string;
    value: string;
}

const statsData: StatCard[] = [
    { label: "Total Nota", value: "142" },
    { label: "Margin Rata-Rata", value: "30%" },
    { label: "Total Profit", value: "RP 2.400.000" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function HistorySection() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter data based on search
    const filteredData = dummyNotaData.filter(
        (item) =>
            item.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.acara.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));

    if (currentPage !== safePage) {
        setCurrentPage(safePage);
    }

    const paginatedData = filteredData.slice(
        (safePage - 1) * itemsPerPage,
        safePage * itemsPerPage
    );

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
                        <p className={`text-2xl md:text-3xl font-poppins-700 ${
                            index === 1
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
                            {paginatedData.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-4 md:px-8 py-4 md:py-5">
                                        <span className="font-poppins-600 text-graytext-primary text-sm md:text-[15px]">
                                            {item.kode}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-8 py-4 md:py-5">
                                        <span className="font-poppins-400 text-graytext-primary text-sm md:text-[15px]">
                                            {item.acara}
                                        </span>
                                    </td>
                                    <td className="hidden sm:table-cell px-4 md:px-8 py-4 md:py-5">
                                        <span className="font-poppins-400 text-graytext-secondary text-sm md:text-[15px]">
                                            {item.tanggalAcara}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-8 py-4 md:py-5 text-center">
                                        <span className={`font-poppins-600 text-sm md:text-[15px] ${
                                            item.marginColor === "green"
                                                ? "text-green-primary"
                                                : "text-red"
                                        }`}>
                                            {item.margin}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-8 py-4 md:py-5 whitespace-nowrap">
                                        <span className="font-poppins-600 text-graytext-primary text-sm md:text-[15px]">
                                            {item.total}
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
                            {paginatedData.length === 0 && (
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