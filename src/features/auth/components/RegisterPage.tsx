import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <section className="flex min-h-screen w-full bg-white font-['Poppins']">

            <div className="flex w-full flex-col justify-center px-6 py-8 lg:w-1/2 lg:px-12">

                <div className="mb-2">
                    <h1 className="font-anonymous-700 text-4xl lg:text-5xl text-green-bold">
                        Kater<span className="text-black">Ly</span>
                    </h1>
                </div>

                <div className="mb-6">
                    <h1 className="text-4xl lg:text-5xl font-bold text-black">
                        Buat akun
                    </h1>

                    <div className="mt-2">
                        <span className="text-lg text-graytext-secondary">
                            Sudah punya akun?
                        </span>

                        <Link
                            href="/login"
                            className="ml-2 text-lg font-semibold text-green-primary hover:underline"
                        >
                            Masuk
                        </Link>
                    </div>
                </div>

                <form className="flex w-full max-w-[520px] flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label className="text-lg text-black">
                            Nama Usaha
                        </label>

                        <input
                            type="text"
                            placeholder="Nama Catering"
                            className="rounded-xl border border-gray-200 px-5 py-3 text-base shadow-sm outline-none focus:border-green-primary"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-lg text-black">
                            Nama Anda
                        </label>

                        <input
                            type="text"
                            placeholder="Nama Anda"
                            className="rounded-xl border border-gray-200 px-5 py-3 text-base shadow-sm outline-none focus:border-green-primary"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-lg text-black">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="nama@gmail.com"
                            className="rounded-xl border border-gray-200 px-5 py-3 text-base shadow-sm outline-none focus:border-green-primary"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-lg text-black">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Minimal 8 Karakter"
                            className="rounded-xl border border-gray-200 px-5 py-3 text-base shadow-sm outline-none focus:border-green-primary"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="h-14 w-full rounded-xl bg-green-bold text-lg text-white shadow-md transition hover:opacity-90"
                        >
                            Buat akun gratis
                        </button>

                        <p className="mt-3 text-center text-sm text-graytext-secondary">
                            Dengan mendaftar Anda menyetujui
                            Syarat & Kebijakan Privasi Katerly.
                        </p>
                    </div>

                </form>
            </div>

            <div className="relative hidden lg:block lg:w-1/2">
                <Image
                    className="object-cover"
                    src="/images/Login-bg.webp"
                    alt="Spaghetti"
                    fill
                    priority
                />
            </div>

        </section>
    );
}