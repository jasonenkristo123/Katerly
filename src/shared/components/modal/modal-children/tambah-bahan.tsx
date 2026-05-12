"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "@/shared/components/reusable/Button";
import { X } from "lucide-react";
import { IngredientFormValues } from "@/features/bahan-baku/bahanbaku-sections";

const ingredientSchema = z.object({
    nama: z.string().min(1, "Nama bahan harus diisi"),
    satuan: z.string().min(1, "Satuan harus diisi"),
    harga: z.string().min(1, "Harga harus diisi"),
});

type TambahBahanChildModalProps = {
    isOpen: boolean;
    onClose: () => void;
    initialData?: {
        nama: string;
        satuan: string;
        harga: string;
    } | null;
    onSubmit: (data: IngredientFormValues) => void;
}

export default function TambahBahanChildModal({ isOpen, onClose, initialData, onSubmit }: TambahBahanChildModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IngredientFormValues>({
        resolver: zodResolver(ingredientSchema),
        defaultValues: {
            nama: "",
            satuan: "",
            harga: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            // Remove "Rp " and dots from harga if it's coming from the table display
            const cleanPrice = initialData.harga.replace(/[^\d]/g, "");
            reset({
                nama: initialData.nama,
                satuan: initialData.satuan,
                harga: cleanPrice,
            });
        } else {
            reset({
                nama: "",
                satuan: "",
                harga: "",
            });
        }
    }, [initialData, reset, isOpen]);

    const handleFormSubmit = (data: IngredientFormValues) => {
        onSubmit(data);
        onClose();
    };

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-poppins-700 text-graytext-primary">
                    {initialData ? "Update Bahan Baku" : "Tambah Bahan Baku"}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-poppins-600 text-graytext-primary mb-1.5">
                        Nama Bahan
                    </label>
                    <input
                        {...register("nama")}
                        placeholder="Contoh: Beras Premium"
                        className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary/20 transition-all font-poppins-400 ${
                            errors.nama ? "border-red" : "border-gray-200"
                        }`}
                    />
                    {errors.nama && (
                        <p className="text-red text-xs mt-1 font-poppins-400">{errors.nama.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-poppins-600 text-graytext-primary mb-1.5">
                            Satuan
                        </label>
                        <select
                            {...register("satuan")}
                            className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary/20 transition-all font-poppins-400 bg-white ${
                                errors.satuan ? "border-red" : "border-gray-200"
                            }`}
                        >
                            <option value="">Pilih</option>
                            <option value="kg">kg</option>
                            <option value="gr">gr</option>
                            <option value="liter">liter</option>
                            <option value="ml">ml</option>
                            <option value="pcs">pcs</option>
                        </select>
                        {errors.satuan && (
                            <p className="text-red text-xs mt-1 font-poppins-400">{errors.satuan.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-poppins-600 text-graytext-primary mb-1.5">
                            Harga
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-graytext-secondary font-poppins-400">
                                Rp
                            </span>
                            <input
                                {...register("harga")}
                                type="number"
                                placeholder="0"
                                className={`w-full pl-11 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-primary/20 transition-all font-poppins-400 ${
                                    errors.harga ? "border-red" : "border-gray-200"
                                }`}
                            />
                        </div>
                        {errors.harga && (
                            <p className="text-red text-xs mt-1 font-poppins-400">{errors.harga.message}</p>
                        )}
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        className="flex-1 rounded-full py-3 font-poppins-600"
                        onClick={onClose}
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex-1 rounded-full py-3 font-poppins-600 bg-green-primary text-white hover:bg-green-bitdark"
                    >
                        {initialData ? "Update" : "Simpan"}
                    </Button>
                </div>
            </form>
        </div>
    );
}