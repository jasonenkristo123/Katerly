"use client";

import React, { useState } from "react";
import { Search, Plus, ArrowUp, ArrowDown, Edit, Trash2 } from "lucide-react";
import Button from "@/shared/components/reusable/Button";
import ModalParent from "@/shared/components/modal/ModalParent";
import TambahBahanChildModal from "@/shared/components/modal/modal-children/tambah-bahan";

export interface BahanBakuItem {
    id: number;
    nama: string;
    satuan: string;
    harga: string;
    perubahan: string;
    trend: 'up' | 'down';
    diupdate: string;
}

export interface IngredientFormValues {
    nama: string;
    satuan: string;
    harga: string;
}

const initialBahanBakuData: BahanBakuItem[] = [
    {
        id: 1,
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up",
        diupdate: "1 hari lalu",
    },
    {
        id: 2,
        nama: "Dada Ayam",
        satuan: "kg",
        harga: "Rp 10.000",
        perubahan: "5%",
        trend: "down",
        diupdate: "20 hari lalu",
    },
    // Adding more rows for demonstration
    ...Array(10).fill(null).map((_, i) => ({
        id: i + 3,
        nama: "Beras Premium",
        satuan: "kg",
        harga: "Rp 15.000",
        perubahan: "5%",
        trend: "up" as const,
        diupdate: "1 hari lalu",
    }))
];

export default function BahanBaku() {
    const [data, setData] = useState<BahanBakuItem[]>(initialBahanBakuData);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<BahanBakuItem | null>(null);
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

    const handleOpenAddModal = () => {
        setSelectedItem(null);
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = (item: BahanBakuItem) => {
        setSelectedItem(item);
        setIsFormModalOpen(true);
        setActiveMenuId(null);
    };

    const handleOpenDeleteModal = (item: BahanBakuItem) => {
        setSelectedItem(item);
        setIsDeleteModalOpen(true);
        setActiveMenuId(null);
    };

    const handleFormSubmit = (formData: IngredientFormValues) => {
        if (selectedItem) {
            // Update existing
            setData(prev => prev.map(item => 
                item.id === selectedItem.id 
                ? { ...item, ...formData, harga: `Rp ${Number(formData.harga).toLocaleString('id-ID')}` } 
                : item
            ));
        } else {
            // Add new
            const nextId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
            const newItem: BahanBakuItem = {
                id: nextId,
                ...formData,
                harga: `Rp ${Number(formData.harga).toLocaleString('id-ID')}`,
                perubahan: "0%",
                trend: "up",
                diupdate: "Baru saja",
            };
            setData(prev => [newItem, ...prev]);
        }
        setIsFormModalOpen(false);
    };

    const handleDeleteConfirm = () => {
        if (!selectedItem) return;
        setData(prev => prev.filter(item => item.id !== selectedItem.id));
        setIsDeleteModalOpen(false);
        setSelectedItem(null);
    };

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

                <Button 
                    onClick={handleOpenAddModal}
                    size="lg" 
                    variant="primary" 
                    className="bg-green-primary border-none text-white px-8 py-3 md:px-3 md:py-2 xl:px-7 xl:py-3 rounded-full flex items-center justify-center gap-2 hover:bg-green-bitdark transition-all font-poppins-600 shadow-sm active:scale-95 self-start md:mt-1"
                >
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
                                <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider text-center">No</th>
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
                            {data.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-4 md:px-8 py-4 md:py-5 text-center text-graytext-secondary font-poppins-400 text-sm">
                                        {index + 1}
                                    </td>
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
                                    <td className="px-4 md:px-8 py-4 md:py-5 text-right whitespace-nowrap relative">
                                        <button 
                                            onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                                            className="inline-flex items-center gap-1 md:gap-2 text-xs md:text-[15px] font-poppins-600 text-graytext-secondary hover:text-green-primary transition-colors"
                                        >
                                            <Edit size={16} className="md:w-[18px] md:h-[18px]" />
                                            <span className="hidden sm:inline">Edit</span>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeMenuId === item.id && (
                                            <>
                                                <div 
                                                    className="fixed inset-0 z-10" 
                                                    onClick={() => setActiveMenuId(null)}
                                                />
                                                <div className="absolute right-8 top-12 bg-white border border-gray-100 shadow-xl rounded-xl py-2 w-32 z-20 overflow-hidden">
                                                    <button 
                                                        onClick={() => handleOpenEditModal(item)}
                                                        className="w-full px-4 py-2 text-left text-sm font-poppins-500 text-graytext-primary hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <Edit size={14} />
                                                        Ubah
                                                    </button>
                                                    <button 
                                                        onClick={() => handleOpenDeleteModal(item)}
                                                        className="w-full px-4 py-2 text-left text-sm font-poppins-500 text-red hover:bg-redlight flex items-center gap-2"
                                                    >
                                                        <Trash2 size={14} />
                                                        Hapus
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Form Modal */}
            <ModalParent 
                isOpen={isFormModalOpen} 
                onClose={() => setIsFormModalOpen(false)}
            >
                <TambahBahanChildModal 
                    isOpen={isFormModalOpen}
                    onClose={() => setIsFormModalOpen(false)}
                    initialData={selectedItem}
                    onSubmit={handleFormSubmit}
                />
            </ModalParent>

            {/* Delete Confirmation Modal */}
            <ModalParent
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
            >
                <div className="text-center p-4">
                    <div className="w-16 h-16 bg-redlight rounded-full flex items-center justify-center mx-auto mb-4 text-red">
                        <Trash2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold font-poppins-700 text-graytext-primary mb-2">
                        Hapus Bahan Baku?
                    </h3>
                    <p className="text-graytext-secondary font-poppins-400 mb-8">
                        Apakah Anda yakin ingin menghapus <span className="font-bold">&quot;{selectedItem?.nama}&quot;</span>? Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <div className="flex gap-3">
                        <Button 
                            variant="secondary" 
                            className="flex-1 rounded-full py-3"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="primary" 
                            className="flex-1 rounded-full py-3 bg-red text-white hover:bg-red/90 border-none"
                            onClick={handleDeleteConfirm}
                        >
                            Hapus
                        </Button>
                    </div>
                </div>
            </ModalParent>
        </div>
    );
}


