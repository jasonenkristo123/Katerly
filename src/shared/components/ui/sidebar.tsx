"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
    LayoutDashboard, 
    Beef, 
    BookPlus, 
    ShoppingCart, 
    Receipt, 
    History, 
    Settings,
    Menu,
    X,
} from "lucide-react";
import Button from "../reusable/Button";

const sidebarData = [
    {
        icon: LayoutDashboard,
        name: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: Beef,
        name: "Bahan Baku",
        href: "/bahan-baku",
    },
    {
        icon: BookPlus,
        name: "Tambah Resep",
        href: "/tambah-resep",
    },
    {
        icon: ShoppingCart,
        name: "Daftar Belanja",
        href: "/daftar-belanja",
    },
    {
        icon: Receipt,
        name: "Buat Nota",
        href: "/buat-nota",
    },
    {
        icon: History,
        name: "Riwayat Transaksi",
        href: "/history",
    },
    {
        icon: Settings,
        name: "Pengaturan Akun",
        href: "/settings",
    }
]

export default function SideBarPage() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button 
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-green-primary"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar container */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-[280px] bg-white border-r border-gray-100 
                flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
                {/* Logo Section */}
                <div className="p-8">
                    <h1 className="font-anonymous-700 text-green-bold text-3xl">
                        Kater<span className="text-black">Ly</span>
                    </h1>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 px-4 space-y-2">
                    {sidebarData.map((item) => {
                        const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
                        const Icon = item.icon;
                        
                        return (
                            <Link 
                                href={item.href} 
                                key={item.name}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                    ${isActive 
                                        ? "bg-green-primary text-white shadow-lg shadow-green-primary/20" 
                                        : "text-gray-500 hover:bg-green-50 hover:text-green-primary"}
                                `}
                            >
                                <Icon size={22} className={isActive ? "text-white" : "text-inherit"} />
                                <span className="font-poppins-400 text-[15px]">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Upgrade Card Section */}
                <div className="p-6">
                    <div className="bg-bg-advertise rounded-3xl p-5 relative overflow-hidden group">
                        {/* Decorative circle */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                        
                        <p className="text-white/80 text-xs font-poppins-400 mb-1">Paket Starter</p>
                        <h3 className="text-white font-poppins-700 text-lg mb-2">Tingkatkan ke Pro</h3>
                        <p className="text-white/90 text-[11px] font-poppins-400 mb-4 leading-relaxed">
                            Nota tanpa batas untuk maksimalkan usahamu
                        </p>
                        
                        <Button
                            variant="secondary"
                            className="w-full bg-white text-green-primary hover:bg-gray-100 font-poppins-600 py-2.5 rounded-2xl shadow-sm text-sm"
                        >
                            Upgrade
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    )
}
