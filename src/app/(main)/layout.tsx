import MainNavbar from "@/shared/components/ui/MainNavbar";
import SideBarPage from "@/shared/components/ui/sidebar";
import React from "react";

export default function MainLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBarPage />
            <div className="flex flex-col flex-1 overflow-hidden">
                <MainNavbar />
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>

    )
}
