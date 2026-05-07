import FeatureCard from "@/shared/components/reusable/FeatureCard";



export default function featureSection() {
    return (
        <section id="fitur" className="bg-white min-h-screen w-full pt-20 md:pt-32 lg:pt-40 pb-20">
            <div className="flex flex-col items-center justify-center gap-4 px-6">
                <h1 className="text-black font-poppins-700 text-3xl md:text-4xl lg:text-5xl text-center max-w-4xl">
                    Dari resep ke nota, satu aplikasi.
                </h1>

                <p className="font-poppins-300 text-base md:text-lg lg:text-xl xl:text-2xl text-black text-center max-w-2xl">
                    Dari resep, harga bahan, sampai kirim nota - Katerly otomatiskan semuanya
                </p>
            </div>

            <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 justify-center items-stretch px-6 md:px-12 lg:px-20">
                <FeatureCard title="Harga Resep Otomatis" iconImage="/images/calc.svg"
                    desc="Masukkan bahan, sistem hitung HPP per porsi seketika. Lengkap dengan biaya kemasan & overhead. " colorBg="bg-green-primary/40" colorSvg="text-green-primary/70 fill-current" className="w-8 h-8" />
                <FeatureCard title="Penentuan Harga Cerdas" iconImage="/images/uptrend.svg"
                    desc="Saran harga jual berdasarkan target margin Anda. Lihat profit secara real-time. " colorBg="bg-green-primary/40" colorSvg="text-green-bold fill" className="w-6 h-6" />
                <FeatureCard title="Nota Profesional" iconImage="/images/invoice.svg"
                    desc="Buat nota rapi dengan logo Anda. Kirim ke WhatsApp atau download PDF. " colorBg="bg-cream" colorSvg="text-brown fill" className="w-8 h-8" />
                <FeatureCard title="Belanja Otomatis" iconImage="/images/shopping.svg"
                    desc="Daftar belanja terbentuk otomatis dari pesanan, lengkap dengan estimasi total. " colorBg="bg-cream" colorSvg="text-brown fill" className="w-6 h-6" />
                <FeatureCard title="Bahan Baku Tersinkron" iconImage="/images/chef.svg"
                    desc="Update harga sekali, semua resep ikut update. Tidak ada lagi harga kadaluarsa. " colorBg="bg-green-superlight" colorSvg="text-green-primary fill" className="w-8 h-8" />
                <FeatureCard title="Insight Bisnis" iconImage="/images/insight.svg"
                    desc="Lihat menu paling untung, tren penjualan, dan margin rata-rata dalam dashboard simpel. " colorBg="bg-redlight" colorSvg="text-red fill" className="w-8 h-8" />
            </div>

        </section>
    )
}