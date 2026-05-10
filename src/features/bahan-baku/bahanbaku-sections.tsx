"use client";

import { Search, Plus, ArrowUp, ArrowDown, Edit } from "lucide-react";
import Button from "@/shared/components/reusable/Button";

const bahanBakuData = [
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        nama: "Dada Ayam",
        satuan: "kg",
        harga: "Rp 10.000",
        perubahan: "5%",
        trend: "down",
        diupdate: "20 hari lalu",
    },
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    }
];

export default function BahanBaku() {
    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-graytext-primary mb-2 font-poppins-700">
                        Bahan Baku
                    </h1>
                    <p className="text-graytext-secondary text-base font-poppins-400 max-w-2xl">
                        Tambah dan perbarui bahan agar dapat membuat resep dan menjaga HPP tetap akurat
                    </p>
                </div>
                <Button size="lg" variant="primary" className="bg-green-primary border-none text-white px-8 py-3 md:px-3 md:py-2 xl:px-7 xl:py-3 rounded-full flex items-center justify-center gap-2 hover:bg-green-bitdark transition-all font-poppins-600 shadow-sm active:scale-95 self-start md:mt-1">
                    Tambah Bahan
                    <Plus size={20} />
                </Button>
            </div>

            <div className="mb-8">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-graytext-secondary" size={20} />
                    <input
                        type="text"
                        placeholder="Cari Bahan..."
                        className="w-full pl-12 pr-6 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-primary/10 focus:border-green-primary transition-all font-poppins-400 bg-white"
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/30">
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider">
                                    Bahan
                                </th>
                                <th className="hidden lg:table-cell px-8 py-6 text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider">
                                    Satuan
                                </th>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider">
                                    Harga Terbaru
                                </th>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider text-center">
                                    Perubahan
                                </th>
                                <th className="hidden sm:table-cell px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider">
                                    Diupdate
                                </th>
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider text-right">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {bahanBakuData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-4 md:px-8 py-4 md:py-5">
                                        <span className="font-poppins-600 text-graytext-primary text-sm md:text-[15px] block truncate max-w-[120px] md:max-w-none">
                                            {item.nama}
                                        </span>
                                    </td>
                                    <td className="hidden lg:table-cell px-8 py-5">
                                        <span className="font-poppins-400 text-graytext-secondary text-[15px]">
                                            {item.satuan}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-8 py-4 md:py-5 whitespace-nowrap">
                                        <div className="flex flex-col md:flex-row md:items-baseline">
                                            <span className="font-poppins-600 text-graytext-primary text-sm md:text-[15px]">
                                                {item.harga}
                                            </span>
                                            <span className="text-graytext-secondary text-xs md:text-[15px] md:ml-1 font-poppins-400">
                                                / {item.satuan}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 md:px-8 py-4 md:py-5 text-center whitespace-nowrap">
                                        <div className={`inline-flex items-center gap-0.5 md:gap-1 text-xs md:text-[15px] font-poppins-600 ${item.trend === "up" ? "text-red" : "text-green-primary"
                                            }`}>
                                            {item.trend === "up" ? <ArrowUp size={14} className="md:w-4 md:h-4" /> : <ArrowDown size={14} className="md:w-4 md:h-4" />}
                                            {item.perubahan}
                                        </div>
                                    </td>
                                    <td className="hidden sm:table-cell px-4 md:px-8 py-4 md:py-5">
                                        <span className="font-poppins-400 text-graytext-secondary text-xs md:text-[15px]">
                                            {item.diupdate}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-8 py-4 md:py-5 text-right whitespace-nowrap">
                                        <button className="inline-flex items-center gap-1 md:gap-2 text-xs md:text-[15px] font-poppins-600 text-graytext-secondary hover:text-green-primary transition-colors">
                                            <Edit size={16} className="md:w-[18px] md:h-[18px]" />
                                            <span className="hidden sm:inline">Edit</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

