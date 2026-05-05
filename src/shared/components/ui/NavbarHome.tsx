

export default function NavbarHome() {
    return (
        <div className="w-full bg-white flex justify-between items-center px-12 py-2 fixed z-999 ">
            <div>
                <h1 className="font-anonymous-700 text-[56px]">
                    Kater<span className="text-green-bold">Ly</span>
                </h1>
            </div>
            <div className="flex gap-10 font-poppins-400 text-[21px]">
                <p>
                    Fitur
                </p>
                <p>
                    Cara Kerja
                </p>
                <p>
                    harga
                </p>
            </div>
            <div className="gap-10 flex ">
                <button>
                    Login
                </button>
                <button>
                    Daftar
                </button>
            </div>
        </div>
    )
}