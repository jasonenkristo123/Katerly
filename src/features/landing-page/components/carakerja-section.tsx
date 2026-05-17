import CaraKerjaCard from "@/shared/components/reusable/carakerja-card";
import { ArrowDown, ArrowRight } from "lucide-react";



export default function CaraKerjaSection() {
    return (
        <section id="cara-kerja" className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 overflow-hidden bg-bg-carakerja">
            <div className="flex flex-col items-center text-center gap-6 mb-16 md:mb-24">

                <h1 className="font-poppins-700 text-3xl md:text-4xl lg:text-5xl text-black max-w-4xl leading-tight">
                    <span className="text-green-primary">Tiga</span> langkah, harga siap kirim.
                </h1>
            </div>

            <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-4">
                <div className="flex-1 w-full flex justify-center">
                    <CaraKerjaCard
                        numberTitle="01"
                        title="Masukan bahan dan resep"
                        desc="Tambahkan bahan & jumlah per porsi. Katerly otomatis menghitung HPP."
                    />
                </div>

                <div className="hidden lg:flex items-center text-green-primary/30 mx-2">
                    <ArrowRight size={34} />
                </div>

                <div className="lg:hidden text-green-primary/30 py-2 w-full flex items-center justify-center">
                    <ArrowDown size={34} />
                </div>

                <div className="flex-1 w-full flex justify-center">
                    <CaraKerjaCard
                        numberTitle="02"
                        title="Atur Margin"
                        desc="Geser slider margin sesuai target. Lihat harga rekomendasi langsung."
                    />
                </div>

                <div className="hidden lg:flex items-center text-green-primary/30 mx-2">
                    <ArrowRight size={34} />
                </div>

                <div className="lg:hidden text-green-primary/30 py-2 w-full flex items-center justify-center">
                    <ArrowDown size={34} />
                </div>

                <div className="flex-1 w-full flex justify-center">
                    <CaraKerjaCard
                        numberTitle="03"
                        title="Kirim penawaran"
                        desc="Generate nota profesional, kirim ke WhatsApp atau download PDF."
                    />
                </div>
            </div>
        </section>
    )
}