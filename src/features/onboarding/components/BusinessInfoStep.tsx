export default function BusinessInfoStep() {
    return (
        <div className="flex flex-col">

            <h1 className="font-poppins-600 text-4xl text-black">
                Informasi mengenai usaha Anda
            </h1>

            <p className="mt-2 font-poppins-400 text-base text-gray-500">
                Kami sesuaikan Katerly untuk Anda.
            </p>

            <div className="mt-8 flex flex-col gap-3">
                <label className="font-poppins-400 text-lg text-black">
                    Nama Usaha
                </label>

                <input
                    type="text"
                    placeholder="Nama Catering"
                    className="rounded-xl border border-gray-200 px-5 py-3 text-base shadow-sm outline-none focus:border-green-primary "
                />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">

                <div className="flex flex-col gap-3">
                    <label className="font-poppins-400 text-lg text-black">
                        Kota
                    </label>

                    <input
                        type="text"
                        placeholder="Kota"
                        className="rounded-xl border border-gray-200 px-5 py-3 text-base shadow-sm outline-none focus:border-green-primary"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label className="font-poppins-400 text-lg text-black">
                        No. WhatsApp
                    </label>

                    <input
                        type="text"
                        placeholder="0812-3456-7890"
                        className="rounded-xl border border-gray-200 px-5 py-3 text-base shadow-sm outline-none focus:border-green-primary"
                    />
                </div>

            </div>

        </div>
    );
}