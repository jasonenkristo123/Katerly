"use client";
import SvgWrapper from "@/shared/components/reusable/SvgWrapper";
import { useCreateSubscription, useGetActiveSubscription } from "../hooks/subscription-hooks";
import Script from "next/script";
import Swal from "sweetalert2";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetProfile } from "@/features/settings/hooks/profileHooks";

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
  const router = useRouter();
  const { data: profile } = useGetProfile();
  const { data: activeSub } = useGetActiveSubscription();
  const { mutateAsync: createSubscription } = useCreateSubscription();
  const [activeSnapToken, setActiveSnapToken] = useState<string | null>(null);

  const openMidtransModal = (token: string) => {
    window.snap.pay(token, {
      onSuccess: (result) => {
        console.log(result);
        setActiveSnapToken(null);
        router.push("/dashboard");
      },
      onPending: (result) => {
        console.log("Pending:", result);
      },
      onError: (result) => {
        console.error("Error:", result);
      },
      onClose: () => {
        console.log("Modal closed by user");
        // We do NOT clear the token here so they can click the button again
      }
    });
  };

  const handleCreateSubscription = async () => {
    try {
      // If we already have a token from a previous click, reuse it
      if (activeSnapToken) {
        openMidtransModal(activeSnapToken);
        return;
      }

      const res = await createSubscription();
      setActiveSnapToken(res.snapToken);
      openMidtransModal(res.snapToken);
      
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: error.response.data?.message || 'Terjadi kesalahan saat memproses langganan',
          confirmButtonColor: '#10b981'
        });
      } else if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }

  }


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

            <button
              disabled
              className="bg-gray-200 rounded-2xl w-full flex items-center justify-center font-poppins-500 text-gray-500 shadow-[inset_0_6px_10px_rgba(0,0,0,0.15),inset_0_1px_3px_rgba(0,0,0,0.2)] border border-gray-300 py-3 mt-auto cursor-pointer opacity-90"
            >
              Pilih Starter
            </button>
          </div>

          <Script
            src="https://app.sandbox.midtrans.com/snap/snap.js"
            data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
            strategy="afterInteractive"
          />

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

            {(profile?.premium || activeSub) ? (
              <button
                disabled
                className="bg-gray-200 rounded-2xl w-full flex items-center justify-center font-poppins-600 text-gray-500 shadow-[inset_0_6px_10px_rgba(0,0,0,0.15),inset_0_1px_3px_rgba(0,0,0,0.2)] border border-gray-300 py-3 mt-auto cursor-not-allowed translate-y-1 opacity-90"
              >
                Paket Anda Saat Ini
              </button>
            ) : (
              <button onClick={handleCreateSubscription} className="bg-white rounded-2xl w-full flex items-center justify-center font-poppins-600 text-green-primary shadow-sm shadow-black border border-white py-3 mt-auto hover:bg-gray-100 transition-colors duration-300 ease-in-out cursor-pointer active:translate-y-1 active:shadow-inner">
                Pilih Pro
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
