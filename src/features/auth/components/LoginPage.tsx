import Link from "next/link";
import Image from "next/image";


export default function LoginPage() {
    return (
        <section className="flex min-h-screen w-full bg-white font-['Poppins']">
            <div className="flex w-1/2 flex-col pt-[40px] pb-[60px] px-[41px]">

                <div className="mb-4">
                    <h1 className="font-anonymous-700 text-[56px] text-green-bold">
                        Kater<span className="text-black">Ly</span>
                    </h1>
                </div>

                <div>
                    <h1 className="text-[56px] font-bold text-black">Selamat Datang</h1>
                    <div className="mb-10 mt-4">
                        <span className="text-[24px] font-poppins-400 text-graytext-secondary">Belum punya akun? </span>
                        <Link href="/register" className="text-[24px] font-poppins-600 text-green-primary hover:underline">Daftar</Link>
                    </div>
                </div>

                <form className="flex w-full max-w-[595px] flex-col gap-[23px] px-[10px] py-[10px]">

                    <div className="flex flex-col gap-[10px] px-[10px] pb-[7px]">
                        <label className="text-[24px] font-poppins-400 text-black">Email</label>
                        <input
                            type="email"
                            placeholder="nama@gmail.com"
                            className="bg-white rounded-[18px] px-[30px] py-[15px] shadow-[0_4px_11px_0_rgba(0,0,0,0.25)] text-[24px] font-poppins-400 text-graytext-secondary"
                        />
                    </div>

                    <div className="flex flex-col gap-[10px] px-[10px] pb-[7px]">
                        <label className="text-[24px] font-poppins-400 text-black">Password</label>
                        <input
                            type="password"
                            placeholder="Minimal 8 Karakter"
                            className="bg-white rounded-[18px] px-[30px] py-[15px] shadow-[0_4px_11px_0_rgba(0,0,0,0.25)] text-[24px] font-poppins-400 text-graytext-secondary"
                        />
                    </div>

                    <div className="flex flex-col w-full justify-center px-[10px] pt-[46px] gap-[10px]">
                        <button
                            type="submit"
                            className="flex h-[75px] w-full max-w-[555px] items-center justify-center gap-[14px] rounded-[18px] bg-green-bold px-[50px] font-poppins-400 text-[24px] text-white shadow-[0_4px_11px_0_rgba(0,0,0,0.25)] cursor-pointer"
                        >
                            Masuk
                        </button>

                        <p className="text-center font-poppins-400 text-graytext-secondary text-[24px] my-[12px] ">
                            ATAU
                        </p>

                        <button
                            className="flex h-[75px] w-full max-w-[555px] items-center justify-center gap-[14px] rounded-[18px] bg-white px-[50px] font-poppins-400 text-[24px] text-green-bold shadow-[0_4px_11px_0_rgba(0,0,0,0.25)] cursor-pointer"
                        >
                            <Image
                                src="/images/Google-logo-1.webp"
                                alt="Google Icon"
                                width={75}
                                height={57}
                            />
                            Masuk dengan Google 
                        </button>
                        
                        <p className="text-center font-poppins-400 text-graytext-secondary text-[16px]">
                            Dengan mendaftar Anda menyetujui Syarat & Kebijakan Privasi Katerly.
                        </p>
                    </div>
                </form>

            </div>

            <div className="relative hidden w-1/2 lg:block">
                <Image
                    className="h-full w-full object-cover"
                    src="/images/Login-bg.webp"
                    alt="Spaghetti"
                    width={720}
                    height={1080}
                />
            </div>
        </section>
    )
}  