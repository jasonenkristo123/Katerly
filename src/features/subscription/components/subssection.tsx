import SvgWrapper from "@/shared/components/reusable/SvgWrapper";

const starterData = [
  {
    svgIcon: "/images/checklist.svg",
    desc: "4 Resep",
  },
  {
    svgIcon: "/images/checklist.svg",
    desc: "4 Nota",
  },
  {
    svgIcon: "/images/checklist.svg",
    desc: "Daftar belanja otomatis",
  },
  {
    svgIcon: "/images/checklist.svg",
    desc: "Input bahan tidak terbatas",
  },
];

const proData = [
  {
    svgIcon: "/images/checklist.svg",
    desc: "Resep tidak terbatas",
  },
  {
    svgIcon: "/images/checklist.svg",
    desc: "Nota tidak terbatas",
  },
  {
    svgIcon: "/images/checklist.svg",
    desc: "Daftar belanja otomatis",
  },
  {
    svgIcon: "/images/checklist.svg",
    desc: "Input bahan tidak terbatas",
  },
];

export default function SubsSection() {
  return (
    <section className="bg-hero-gradient min-h-screen w-full py-20 flex justify-center">
      <div className="flex flex-col items-center gap-4 mt-10">
        <div className="flex gap-3 px-6 bg-white/70 rounded-full xl:max-w-[216px] items-center justify-center py-2">
          <div className="bg-brown rounded-full w-[8px] h-[8px] xl:w-[10px] xl:h-[10px]" />
          <p className="font-poppins-500 text-brown text-[16px]">
            Berlangganan
          </p>
        </div>
        <h1 className="font-poppins-700 text-black text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-3 sm:mb-3">
          Mulai gratis, upgrade saat siap.
        </h1>
        <div className="flex grow mt-6 gap-10 flex-col mx-5 sm:m-0 lg:flex-row">
          <div className="bg-white rounded-2xl shadow-gray-700 shadow-xs px-8 py-6 sm:w-[420px] xl:w-[477px] space-y-5 flex flex-col">
            <h3 className="font-poppins-700 xl:text-2xl">Starter</h3>
            <p className="font-poppins-300 xl:text-[16px]">
              Untuk yang baru mulai
            </p>
            <h2 className="font-poppins-700 xl:text-5xl">Gratis</h2>

            <div className="flex flex-col flex-grow">
              {starterData.map((item) => (
                <div key={item.desc} className="flex gap-2 space-y-5">
                  <SvgWrapper
                    src={item.svgIcon}
                    className="w-8 h-8"
                    color="text-green-primary fill-current"
                  />
                  <p className="font-poppins-500 text-black xl:text-lg">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <button className="bg-white rounded-2xl w-full flex items-center justify-center font-poppins-500 text-black shadow-sm shadow-black border border-gray-200 py-3 mt-auto hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer">
              Pilih Starter
            </button>
          </div>

          {/* pro card */}
          <div className="bg-green-primary rounded-2xl shadow-gray-700 shadow-xs px-8 py-6 sm:w-[420px] xl:w-[477px] space-y-5 flex flex-col">
            <h3 className="font-poppins-700 xl:text-2xl text-white">Pro</h3>
            <p className="font-poppins-300 xl:text-[16px] text-white">
              Untuk katering yang berkembang
            </p>
            <h2 className="font-poppins-700 xl:text-5xl text-white">
              Rp 39.000 /{" "}
              <span className="font-poppins-300 xl:text-2xl">Bulan</span>
            </h2>

            <div className="flex flex-col flex-grow">
              {proData.map((item) => (
                <div key={item.desc} className="flex gap-2 space-y-5">
                  <SvgWrapper
                    src={item.svgIcon}
                    className="w-8 h-8"
                    color="text-white fill-current"
                  />
                  <p className="font-poppins-500 text-white xl:text-lg">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <button className="bg-white rounded-2xl w-full flex items-center justify-center font-poppins-600 text-green-primary shadow-sm shadow-black border border-white py-3 mt-auto hover:bg-gray-100 transition-colors duration-150 ease-in-out cursor-pointer">
              Pilih Pro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
