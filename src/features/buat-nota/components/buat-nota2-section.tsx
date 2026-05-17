"use client";

import React, { useRef } from "react";
import { Link2, Download, MessageCircle, CheckCircle, ChevronLeft, Loader2 } from "lucide-react";
import Button from "@/shared/components/reusable/Button";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetNoteById, useDownloadPdf } from "../hooks/notes-hooks";
import { useGetProfile } from "@/features/settings/hooks/profileHooks";

// ─── Types ────────────────────────────────────────────────────────────────────

interface InvoiceItem {
    id: string;
    nama: string;
    deskripsi: string;
    qty: number;
    harga: number;
}

interface InvoiceData {
    invoiceNumber: string;
    tanggalDibuat: string;
    berlakuHingga: string;

    // Business info
    namaUsaha: string;
    tipeUsaha: string;
    alamat: string;
    teleponUsaha: string;

    // Customer info
    namaPelanggan: string;
    acara: string;
    teleponPelanggan: string;
    tanggalAcara: string;
    jumlahPorsi: number;
    waktuPengiriman: string;

    // Items
    items: InvoiceItem[];

    // Financials
    pajak: number; // percentage e.g. 0 = 0%

    // Notes
    catatan: string;
}

interface ApiInvoiceItem {
    notaItemId: number;
    namaResep: string;
    jumlahPorsi: number;
    hargaJualPerPorsi: number;
}

interface ApiInvoice {
    notaId: number;
    nomorInvoice: string;
    createdAt: string;
    namaClient: string;
    namaAcara: string;
    noWaClient: string;
    tanggalAcara: string;
    items: ApiInvoiceItem[];
    pajakPersen: number;
}



const mockInvoice: InvoiceData = {
    invoiceNumber: "INV-0231",
    tanggalDibuat: "27 Apr 2026",
    berlakuHingga: "4 Mei 2026",
    namaUsaha: "KaterLy",
    tipeUsaha: "Catering",
    alamat: "Jl. Mawar, Jakarta",
    teleponUsaha: "0812-3456-7890",
    namaPelanggan: "Bu Lina",
    acara: "Arisan Keluarga",
    teleponPelanggan: "0811-2233-4455",
    tanggalAcara: "5 Mei 2026",
    jumlahPorsi: 50,
    waktuPengiriman: "11:00",
    items: [
        {
            id: "1",
            nama: "Nasi Box Ayam Bakar",
            deskripsi: "Nasi, ayam bakar, sayur, sambal, kerupuk",
            qty: 50,
            harga: 22000,
        },
        {
            id: "2",
            nama: "Nasi Box Ayam Bakar",
            deskripsi: "Nasi, ayam bakar, sayur, sambal, kerupuk",
            qty: 50,
            harga: 22000,
        },
        {
            id: "3",
            nama: "Nasi Box Ayam Bakar",
            deskripsi: "Nasi, ayam bakar, sayur, sambal, kerupuk",
            qty: 50,
            harga: 22000,
        },
    ],
    pajak: 0,
    catatan: "Timunnya habis",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatRp = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    })
        .format(amount)
        .replace("Rp", "Rp ");

// ─── Component ────────────────────────────────────────────────────────────────

export default function NotaPreview() {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const idParam = searchParams.get('id');
    const invoiceId = idParam ? Number(idParam) : null;
    const { data: responseData, isPending } = useGetNoteById(invoiceId);
    const { mutate: downloadPdfMutate, isPending: isDownloading } = useDownloadPdf(invoiceId as number);
    
    const { data: profile, isPending: isProfilePending } = useGetProfile();

    const apiInvoice = responseData?.data as ApiInvoice | undefined;

    if (isPending || isProfilePending) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-green-primary" />
                <p className="mt-4 text-gray-500 font-poppins-500">Memuat nota...</p>
            </div>
        );
    }

    if (!apiInvoice) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <p className="text-gray-500 font-poppins-500">Data nota tidak ditemukan.</p>
                <Button variant="secondary" onClick={() => router.push('/history')} className="mt-4">
                    Kembali ke Riwayat
                </Button>
            </div>
        );
    }

    const invoice: InvoiceData = {
        invoiceNumber: apiInvoice.nomorInvoice || `INV-${apiInvoice.notaId}`,
        tanggalDibuat: new Date(apiInvoice.createdAt || new Date()).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }),
        berlakuHingga: new Date(new Date(apiInvoice.createdAt || new Date()).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }),
        namaUsaha: profile?.namaUsaha || "KaterLy",
        tipeUsaha: "Catering",
        alamat: profile?.alamat || "Alamat belum diatur",
        teleponUsaha: profile?.noWhatsapp || "Telepon belum diatur",
        namaPelanggan: apiInvoice.namaClient,
        acara: apiInvoice.namaAcara,
        teleponPelanggan: apiInvoice.noWaClient,
        tanggalAcara: new Date(apiInvoice.tanggalAcara || new Date()).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }),
        jumlahPorsi: apiInvoice.items?.reduce((acc: number, item: ApiInvoiceItem) => acc + item.jumlahPorsi, 0) || 0,
        waktuPengiriman: "Menyesuaikan",
        items: apiInvoice.items?.map((item: ApiInvoiceItem) => ({
            id: item.notaItemId.toString(),
            nama: item.namaResep,
            deskripsi: "Sesuai daftar pesanan",
            qty: item.jumlahPorsi,
            harga: item.hargaJualPerPorsi
        })) || [],
        pajak: apiInvoice.pajakPersen || 0,
        catatan: "Terima kasih atas pesanan Anda.",
    };

    const subtotal = invoice.items.reduce(
        (sum, item) => sum + item.qty * item.harga,
        0
    );
    const pajakAmount = Math.round(subtotal * (invoice.pajak / 100));
    const total = subtotal + pajakAmount;

    // ── Handlers (wired up later with react-pdf / Web Share API) ──────────────

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link berhasil disalin!");
    };

    const handleDownloadPDF = () => {
        if (!invoiceId) {
            alert("ID Nota tidak ditemukan.");
            return;
        }

        downloadPdfMutate(undefined, {
            onSuccess: (data: unknown) => {
                try {
                    let url: string;
                    if (data instanceof Blob) {
                        url = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
                    } else if (typeof data === 'string' && data.startsWith('http')) {
                        // In case backend actually returns a URL string
                        window.open(data, '_blank');
                        return;
                    } else {
                        // Fallback blob creation for raw data
                        url = window.URL.createObjectURL(new Blob([data as BlobPart], { type: 'application/pdf' }));
                    }
                    
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Nota_${invoice.invoiceNumber}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode?.removeChild(link);
                    
                    if (data instanceof Blob || !(typeof data === 'string' && data.startsWith('http'))) {
                        window.URL.revokeObjectURL(url);
                    }
                } catch (error) {
                    console.error("Error processing PDF blob", error);
                    alert("Gagal mengunduh PDF. Format tidak sesuai.");
                }
            }
        });
    };

    const handleShareWhatsApp = async () => {
        const text = `Halo ${invoice.namaPelanggan},\n\nBerikut adalah tautan rincian nota untuk acara ${invoice.acara}.\nTotal Tagihan: ${formatRp(total)}\n\nLihat Nota Online:\n${window.location.href}\n\nTerima kasih!`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Nota ${invoice.invoiceNumber}`,
                    text: text,
                    url: window.location.href
                });
            } catch {
                const waUrl = `https://wa.me/${invoice.teleponPelanggan.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
                window.open(waUrl, "_blank");
            }
        } else {
            const waUrl = `https://wa.me/${invoice.teleponPelanggan.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
            window.open(waUrl, "_blank");
        }
    };

    // ── Render ─────────────────────────────────────────────────────────────────

    return (
        <div className="w-full mx-auto px-6 md:px-10 lg:px-14 py-8 font-poppins-400">

            {/* ── Page Header ─────────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <p className="text-graytext-secondary text-sm font-poppins-500 mb-1">
                        Quotation #{invoice.invoiceNumber}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-black font-poppins-700">
                        Preview &amp; Kirim
                    </h1>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-poppins-600 text-graytext-primary hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                    >
                        <Link2 size={16} />
                        Salin link
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-poppins-600 text-graytext-primary hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                    >
                        <Download size={16} />
                        PDF
                    </button>
                    <button
                        onClick={handleShareWhatsApp}
                        className="flex items-center gap-2 px-5 py-2.5 bg-green-primary text-white rounded-full text-sm font-poppins-600 hover:bg-green-bitdark transition-all shadow-sm active:scale-95"
                    >
                        <MessageCircle size={16} />
                        Kirim ke WhatsApp
                    </button>
                </div>
            </div>

            {/* ── Two-column Layout ───────────────────────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                {/* ── Invoice Card (printable area) ────────────────────────── */}
                <div className="xl:col-span-8" ref={invoiceRef}>
                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">

                        {/* Green Header */}
                        <div className="bg-green-primary px-8 pt-8 pb-10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-bold text-white font-poppins-700 mb-1">
                                        {invoice.namaUsaha}
                                    </h2>
                                    <p className="text-white/90 font-poppins-500 text-sm">
                                        {invoice.tipeUsaha}
                                    </p>
                                    <p className="text-white/80 text-sm font-poppins-400 mt-1">
                                        {invoice.alamat} &bull; {invoice.teleponUsaha}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-white/80 text-xs font-poppins-500 uppercase tracking-wider mb-1">
                                        Quotation
                                    </p>
                                    <p className="text-white text-3xl font-bold font-poppins-700">
                                        #{invoice.invoiceNumber}
                                    </p>
                                    <p className="text-white/80 text-sm font-poppins-400 mt-1">
                                        {invoice.tanggalDibuat}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="px-8 py-7 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between gap-6">
                                <div>
                                    <p className="text-graytext-secondary text-xs font-poppins-600 uppercase tracking-wider mb-2">
                                        Untuk
                                    </p>
                                    <p className="text-graytext-primary text-xl font-bold font-poppins-700 mb-1">
                                        {invoice.namaPelanggan}
                                    </p>
                                    <p className="text-graytext-secondary text-sm font-poppins-400">
                                        {invoice.acara}
                                    </p>
                                    <p className="text-graytext-secondary text-sm font-poppins-400">
                                        {invoice.teleponPelanggan}
                                    </p>
                                </div>
                                <div className="sm:text-right">
                                    <p className="text-graytext-secondary text-xs font-poppins-600 uppercase tracking-wider mb-2">
                                        Tanggal Acara
                                    </p>
                                    <p className="text-graytext-primary text-xl font-bold font-poppins-700 mb-1">
                                        {invoice.tanggalAcara}
                                    </p>
                                    <p className="text-graytext-secondary text-sm font-poppins-400">
                                        {invoice.jumlahPorsi} porsi &bull; Pengantaran {invoice.waktuPengiriman}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="px-8 py-6">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="pb-3 text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider">
                                            Item
                                        </th>
                                        <th className="pb-3 text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider text-center">
                                            QTY
                                        </th>
                                        <th className="pb-3 text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider text-right">
                                            Harga
                                        </th>
                                        <th className="pb-3 text-xs font-poppins-600 text-graytext-secondary uppercase tracking-wider text-right">
                                            Subtotal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {invoice.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="py-4 pr-4">
                                                <p className="text-graytext-primary font-poppins-700 text-sm">
                                                    {item.nama}
                                                </p>
                                                <p className="text-graytext-secondary text-xs font-poppins-400 mt-0.5">
                                                    {item.deskripsi}
                                                </p>
                                            </td>
                                            <td className="py-4 text-center text-graytext-secondary text-sm font-poppins-400">
                                                {item.qty}
                                            </td>
                                            <td className="py-4 text-right text-graytext-secondary text-sm font-poppins-400 whitespace-nowrap">
                                                {formatRp(item.harga)}
                                            </td>
                                            <td className="py-4 text-right text-graytext-primary text-sm font-poppins-600 whitespace-nowrap">
                                                {formatRp(item.qty * item.harga)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="px-8 pb-6">
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex justify-between w-full sm:w-72 text-sm">
                                    <span className="text-graytext-secondary font-poppins-400">Subtotal</span>
                                    <span className="text-graytext-primary font-poppins-600">{formatRp(subtotal)}</span>
                                </div>
                                <div className="flex justify-between w-full sm:w-72 text-sm">
                                    <span className="text-graytext-secondary font-poppins-400">Pajak ({invoice.pajak}%)</span>
                                    <span className="text-graytext-primary font-poppins-600">{formatRp(pajakAmount)}</span>
                                </div>
                                <div className="flex justify-between items-center w-full sm:w-72 bg-green-primary text-white rounded-full px-5 py-3 mt-2">
                                    <span className="text-sm font-poppins-600">Total</span>
                                    <span className="text-sm font-bold font-poppins-700">{formatRp(total)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {invoice.catatan && (
                            <div className="px-8 pb-6">
                                <p className="text-graytext-primary text-sm font-poppins-700 mb-1">Catatan:</p>
                                <p className="text-graytext-secondary text-sm font-poppins-400">{invoice.catatan}</p>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="px-8 py-5 border-t border-gray-100 flex justify-between items-center">
                            <p className="text-graytext-secondary text-xs font-poppins-400">
                                Berlaku hingga {invoice.berlakuHingga}
                            </p>
                            <div className="text-right">
                                <p className="text-graytext-primary text-xs font-poppins-600">
                                    {invoice.namaPelanggan}
                                </p>
                                <p className="text-graytext-secondary text-xs font-poppins-400">
                                    {invoice.tipeUsaha} {invoice.namaUsaha.replace("KaterLy", "Sejahtera")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right Sidebar ────────────────────────────────────────── */}
                <div className="xl:col-span-4">
                    <div className="sticky top-8 space-y-4">

                        {/* Nota Siap! Badge */}
                        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-3">
                            <CheckCircle size={24} className="text-green-primary flex-shrink-0" />
                            <span className="text-graytext-primary text-xl font-bold font-poppins-700">
                                Nota Siap!
                            </span>
                        </div>

                        {/* Share action cards */}
                        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 space-y-3">
                            <p className="text-graytext-primary font-poppins-700 text-sm mb-4">
                                Bagikan Nota
                            </p>
                            <button
                                onClick={handleShareWhatsApp}
                                className="w-full flex items-center gap-3 px-4 py-3 bg-green-primary text-white rounded-2xl font-poppins-600 text-sm hover:bg-green-bitdark transition-all active:scale-95"
                            >
                                <MessageCircle size={18} />
                                Kirim ke WhatsApp
                            </button>
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isDownloading}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 text-graytext-primary rounded-2xl font-poppins-600 text-sm hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
                            >
                                <Download size={18} />
                                {isDownloading ? "Mengunduh..." : "Unduh PDF"}
                            </button>
                            <button
                                onClick={handleCopyLink}
                                className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 text-graytext-primary rounded-2xl font-poppins-600 text-sm hover:bg-gray-50 transition-all active:scale-95"
                            >
                                <Link2 size={18} />
                                Salin Link
                            </button>
                        </div>

                        {/* Back to edit */}
                        <button 
                            onClick={() => router.back()}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-graytext-secondary text-sm font-poppins-500 hover:text-graytext-primary transition-colors"
                        >
                            <ChevronLeft size={16} />
                            Kembali ke Edit
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}