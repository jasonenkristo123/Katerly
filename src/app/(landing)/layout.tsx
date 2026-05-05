import NavbarHome from "@/shared/components/ui/NavbarHome";


export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavbarHome />
            {children}
        </>
    )
}