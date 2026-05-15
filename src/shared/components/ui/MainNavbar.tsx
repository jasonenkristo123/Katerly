"use client"

import { LogOut } from "lucide-react"
import { useLogOut } from "@/features/auth/hooks/auth-hooks"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

export default function MainNavbar() {
    const { mutateAsync: mutateAsyncLogOut } = useLogOut();
    const mySwal = withReactContent(Swal);
    const router = useRouter();

    const alertHandleLogout = async () => {
        mySwal.fire({
            title: "Keluar",
            text: "Apakah Anda yakin ingin keluar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Keluar",
            cancelButtonText: "Batal"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await mutateAsyncLogOut();
                router.push("/");
            }
        })
    }
    return (
        <nav className="w-full px-4 lg:px-8 py-4 bg-white ">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4 ml-auto">
                    <div className="bg-white rounded-2xl p-1.5 pr-4 shadow-md flex gap-3 items-center border border-gray-50 cursor-pointer hover:shadow-lg transition-all group">
                        <div className="bg-green-primary flex items-center justify-center rounded-xl w-10 h-10 text-white font-poppins-600 text-sm shadow-inner">
                            KS
                        </div>
                        <div className="block text-left">
                            <p className="font-poppins-600 text-sm text-green-bold leading-tight tracking-wide">
                                Katering
                            </p>
                            <p className="font-poppins-400 text-[11px] text-gray-400 leading-tight">
                                Sejahtera
                            </p>
                        </div>
                    </div>
                </div>
                <button onClick={alertHandleLogout} className="text-red-800 flex items-center bg-gray-100 cursor-pointer">
                    <LogOut size={31} className="mt-1" />
                </button>
            </div>
        </nav>
    )
}
