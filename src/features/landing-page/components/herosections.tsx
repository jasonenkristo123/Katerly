

import Button from "@/shared/components/reusable/Button";
import SvgWrapper from "@/shared/components/reusable/SvgWrapper";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



const dataSection = [
    {
        desc: "Tanpa Kartu Kredit",
        img: "/images/checklist.svg"
    },
    {
        desc: "Setup 1 menit",
        img: "/images/checklist.svg"
    },
    {
        desc: "Bahasa Indonesia",
        img: "/images/checklist.svg"
    }
]

export default function HeroSections() {
    return (
        <section className="bg-hero-gradient w-full min-h-screen pt-36 pb-20 px-6 md:pt-40 md:px-12 lg:pt-48 lg:px-16 xl:pt-[180px] xl:px-[100px] flex flex-col lg:flex-row items-center gap-12 lg:gap-8 xl:gap-0 overflow-hidden">
            <div className="w-full lg:w-1/2 flex flex-col space-y-6 lg:space-y-8">
                <div className="flex items-center w-max max-w-full gap-3 rounded-full border border-green-bold/30 bg-green-superlight px-3 py-1.5">
                    <div className="w-[10px] h-[10px] rounded-full bg-green-primary shrink-0" />
                    <p className="text-[12px] sm:text-[14px] lg:text-[14px] xl:text-[16px] font-poppins-500 text-green-primary truncate">
                        Khusus untuk UMKM Catering Indonesia
                    </p>
                </div>

                <h1 className="text-[36px] sm:text-[48px] lg:text-[48px] xl:text-[64px] font-poppins-700 text-black leading-[1.2] xl:leading-[70px] 2xl:w-[660px]">
                    Hitung <span className="text-green-primary">HPP</span> & <br className="hidden sm:block" />
                    buat <span className="text-green-primary">nota</span> catering dalam 2 menit.
                </h1>

                <p className="text-[16px] sm:text-[20px] lg:text-[18px] xl:text-[24px] font-poppins-300 text-graytext-primary ">
                    Katerly bantu Anda menentukan harga jual yang
                    menguntungkan, otomatisasi belanja
                    dan pembuatan nota Anda.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-7 w-full sm:w-auto">
                    <Link href="/register" className="w-full sm:w-auto">
                        <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-black/50 shadow-lg justify-center lg:px-2 xl:px-12" >
                            Coba gratis sekarang
                            <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                    <Link href="/login" className="w-full sm:w-auto">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-black/50 shadow-md justify-center">
                            Masuk
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 xl:gap-8 pt-2">
                    {dataSection.map((item) => (
                        <div key={item.desc} className="flex items-center gap-2">
                            <SvgWrapper src={item.img} className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] shrink-0" color="text-green-primary fill-current" />
                            <p className="text-[14px] lg:text-[14px] xl:text-[16px] font-poppins-500 text-graytext-primary">{item.desc}</p>
                        </div>
                    ))}
                </div>

            </div>

            <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center mt-12 lg:mt-0 relative">
                <div className="relative w-full max-w-[400px] xl:max-w-[563px]">
                    <Image src="/images/hero-bg.webp" width={563} height={532} alt="hero bg" className="w-full h-auto object-contain relative z-10" />

                    <div className="flex flex-col bg-white items-start justify-center px-4 sm:px-6 py-2 rounded-2xl w-[140px] xl:w-[162px] h-auto shadow-gray/30 shadow-xl absolute top-[5%] xl:top-[6%] -left-[5%] xl:-left-[5%] z-20">
                        <p className="font-poppins-400 text-graytext-secondary text-[12px] xl:text-[16px]">
                            HPP/Porsi
                        </p>
                        <p className="font-poppins-600 text-md xl:text-xl">
                            Rp 18.500
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-gray/30 shadow-xl absolute flex items-center justify-start px-3 py-3 w-[180px] xl:w-[234px] bottom-[10%] xl:bottom-[5%] -right-[5%] xl:-right-[20%] z-20">
                        <div className="flex gap-2 xl:gap-3 items-center">
                            <SvgWrapper src="/images/upgraph.svg" className="w-[32px] h-[32px] xl:w-[46px] xl:h-[46px] shrink-0" color="text-green-primary fill-current" />
                            <div>
                                <p className="font-poppins-400 text-graytext-primary text-[12px] xl:text-[14px]">
                                    Margin aman
                                </p>
                                <p className="text-green-primary font-poppins-700 text-[14px] xl:text-[16px]">
                                    +67%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}