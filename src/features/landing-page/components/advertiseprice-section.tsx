import Button from "@/shared/components/reusable/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function AdvertisePrice() {
    return (
        <section className="bg-white min-h-screen w-full flex items-center justify-center">
            <div className="bg-bg-advertise w-full max-w-[1296px] mx-5 sm:mx-10 md:mx-16 lg:mx-20 xl:mx-auto px-6 py-12 md:px-12 md:py-20 xl:px-[86px] xl:py-[67px] rounded-[32px] md:rounded-4xl shadow-xl">
                <h1 className="font-poppins-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[60px] xl:leading-[80px] text-white text-center">
                    Mulai hitung dengan benar hari ini.
                </h1>

                <p className="font-poppins-400 text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-[28px] text-white text-center mt-4 md:mt-6 opacity-90">
                    Gratis untuk 4 resep pertama, tanpa Instalasi
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 items-center justify-center mt-8 md:mt-12">
                    <Link href="/register" className="w-full sm:w-auto">
                        <Button variant="secondary" size="lg" className="w-full border-none text-green-primary flex gap-3 shadow-lg hover:scale-105 active:scale-95 transition-transform">
                            Buat akun gratis
                            <ArrowRight size={24} className="md:w-7 md:h-7" />
                        </Button>
                    </Link>

                    <Link href="/login" className="w-full sm:w-auto">
                        <Button variant="custom" size="lg" className="w-full shadow-md hover:bg-white/10 transition-colors">
                            Masuk
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}