"use client"

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Button from "../reusable/Button";

const navbarMenu = [
    {
        title: "Fitur",
        id: "fitur",
    },
    {
        title: "Cara Kerja",
        id: "cara-kerja",
    },
    {
        title: "Harga",
        id: "harga",
    },
];


export default function NavbarHome() {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [activeNav, setActiveNav] = useState("");

    return (
        <>
            <nav className=" hidden w-full bg-white md:flex flex-row justify-between items-center px-12 py-6 fixed z-999">
                <div>
                    <Link href="/home" className="cursor-pointer">
                        <h1 className="font-anonymous-700 text-3xl lg:text-4xl text-green-bold  xl:text-[56px]">
                            Kater<span className="text-black">Ly</span>
                        </h1>
                    </Link>
                </div>
                <div className="flex gap-10 font-poppins-400 text-[16px] lg:text-lg  xl:text-[21px] text-black/50">
                    {
                        navbarMenu.map((item) => (
                            <Link href={`#${item.id}`} onClick={() => setActiveNav(item.id)} className={`hover:text-black ${activeNav === item.id ? "text-black" : "text-black/50"} cursor-pointer`} key={item.id}>
                                {item.title}
                            </Link>
                        ))
                    }
                </div>
                <div className="gap-4 flex ">
                    <Link href="/login">
                        <Button variant="secondary" size="md">
                            Masuk
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="primary" size="md">
                            Daftar
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* mobile navbar */}
            <nav className="w-full md:hidden bg-white flex flex-col items-center fixed z-999 px-12 py-6">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h1 className="font-anonymous-700 text-3xl text-green-bold lg:text-4xl xl:text-[56px]">
                            Kater<span className="text-black">Ly</span>
                        </h1>
                    </div>
                    <div onClick={() => setHamburgerOpen(!hamburgerOpen)}>
                        {hamburgerOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </div>
                </div>

                {hamburgerOpen && (
                    <div className="flex flex-col bg-white w-full pt-4 mt-6 border-t border-black/40 duration-500 delay-300 ease-in-out transition-all ">
                        <div className="flex flex-col gap-3 font-poppins-400 text-[16px] lg:text-lg  xl:text-[21px] text-black/50">
                            {
                                navbarMenu.map((item) => (
                                    <Link href={`#${item.id}`} onClick={() => setActiveNav(item.id)} className={`hover:text-black ${activeNav === item.id ? "text-black" : "text-black/50"} cursor-pointer`} key={item.id}>
                                        {item.title}
                                    </Link>
                                ))
                            }
                        </div>
                        <div className="gap-4 flex flex-col justify-center w-full mt-6">
                            <Link href="/login" className="w-full">
                                <Button variant="secondary" size="md" className="w-full">
                                    Masuk
                                </Button>
                            </Link>
                            <Link href="/register" className="w-full">
                                <Button variant="primary" size="md" className="w-full">
                                    Daftar
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}