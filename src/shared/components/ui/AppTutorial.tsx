"use client";

import { useEffect, useState } from "react";
import { Joyride, Step, STATUS, EventData } from "react-joyride";
import { useGetProfile } from "@/features/settings/hooks/profileHooks";

export default function AppTutorial() {
    const [run, setRun] = useState(false);
    const { data: profileData, isLoading } = useGetProfile();

    // Only run on client-side and after profile is loaded
    useEffect(() => {
        if (isLoading || !profileData?.profileId) return;

        const storageKey = `katerly_tour_completed_${profileData.profileId}`;
        const hasSeenTour = localStorage.getItem(storageKey);
        
        if (!hasSeenTour) {
            // Small delay to ensure the UI is fully rendered
            const timer = setTimeout(() => {
                setRun(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [profileData, isLoading]);

    const steps: Step[] = [
        {
            target: "body",
            placement: "center",
            content: (
                <div className="text-left font-poppins-400">
                    <h2 className="text-xl font-poppins-700 text-green-bold mb-2">Selamat Datang di Katerly! 🎉</h2>
                    <p className="text-sm text-graytext-secondary">Mari kita lihat bagaimana Katerly dapat membantu mempermudah bisnis katering Anda. Klik &quot;Lanjut&quot; untuk memulai tur singkat ini.</p>
                </div>
            ),
        },
        {
            target: "#tour-bahan-baku",
            content: (
                <div className="text-left font-poppins-400">
                    <h3 className="text-lg font-poppins-700 text-graytext-primary mb-1">1. Tambah Bahan Baku</h3>
                    <p className="text-sm text-graytext-secondary">Langkah pertama: Masukkan semua bahan baku yang Anda beli beserta harga terbarunya di sini.</p>
                </div>
            ),
            placement: "right",
        },
        {
            target: "#tour-tambah-resep",
            content: (
                <div className="text-left font-poppins-400">
                    <h3 className="text-lg font-poppins-700 text-graytext-primary mb-1">2. Buat Resep</h3>
                    <p className="text-sm text-graytext-secondary">Gunakan bahan baku yang sudah Anda masukkan untuk meracik resep. Katerly akan otomatis menghitung Harga Pokok Penjualan (HPP).</p>
                </div>
            ),
            placement: "right",
        },
        {
            target: "#tour-daftar-belanja",
            content: (
                <div className="text-left font-poppins-400">
                    <h3 className="text-lg font-poppins-700 text-graytext-primary mb-1">3. Daftar Belanja</h3>
                    <p className="text-sm text-graytext-secondary">Jika ada pesanan, cek halaman ini untuk melihat total belanja yang harus disiapkan beserta estimasi modalnya.</p>
                </div>
            ),
            placement: "right",
        },
        {
            target: "#tour-buat-nota",
            content: (
                <div className="text-left font-poppins-400">
                    <h3 className="text-lg font-poppins-700 text-graytext-primary mb-1">4. Buat Nota & Invoice</h3>
                    <p className="text-sm text-graytext-secondary">Pesanan selesai? Buat nota profesional dengan mudah dan langsung bagikan PDF ke pelanggan Anda.</p>
                </div>
            ),
            placement: "right",
        },
        {
            target: "#tour-dashboard",
            content: (
                <div className="text-left font-poppins-400">
                    <h3 className="text-lg font-poppins-700 text-graytext-primary mb-1">5. Pantau Keuangan</h3>
                    <p className="text-sm text-graytext-secondary">Semua pemasukan dari nota akan masuk ke Dashboard ini. Pantau omset dan keuntungan bulanan Anda dengan mudah!</p>
                </div>
            ),
            placement: "right",
        }
    ];

    const handleJoyrideCallback = (data: EventData) => {
        const { status } = data;
        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            // Stop the tour and mark it as completed so it never runs again
            setRun(false);
            if (profileData?.profileId) {
                localStorage.setItem(`katerly_tour_completed_${profileData.profileId}`, "true");
            }
        }
    };

    return (
        <Joyride
            onEvent={handleJoyrideCallback}
            continuous
            run={run}
            scrollToFirstStep
            steps={steps}
            options={{
                showProgress: true,
                buttons: ['back', 'skip', 'primary'],
                zIndex: 10000,
                primaryColor: "#055038", // green-primary
                textColor: "#333333",
                backgroundColor: "#ffffff",
                overlayColor: "rgba(0, 0, 0, 0.5)",
            }}
            styles={{
                buttonPrimary: {
                    backgroundColor: "#055038",
                    fontFamily: "var(--font-poppins)",
                    borderRadius: "8px",
                    padding: "8px 16px",
                },
                buttonBack: {
                    color: "#6b7280",
                    fontFamily: "var(--font-poppins)",
                },
                buttonSkip: {
                    color: "#ef4444", // red
                    fontFamily: "var(--font-poppins)",
                },
                tooltip: {
                    borderRadius: "16px",
                    fontFamily: "var(--font-poppins)",
                    padding: "20px",
                },
            }}
            locale={{
                back: "Kembali",
                close: "Tutup",
                last: "Selesai",
                next: "Lanjut",
                skip: "Lewati Tur",
            }}
        />
    );
}
