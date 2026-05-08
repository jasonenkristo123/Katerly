"use client"
import { Bell, Search, ChevronDown } from "lucide-react";

export default function MainNavbar() {
    return (
        <nav className="w-full px-4 lg:px-8 py-4 bg-white ">
            <div className="flex items-center justify-between">
                {/* Right side: Notifications & Profile */}
                <div className="flex items-center gap-4 ml-auto">
                    {/* Profile Section */}
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
            </div>
        </nav>
    )
}
