// src/app/(main)/resep/page.tsx

import ResepSection from "@/features/tambah-resep/components/resepsection";
import FadeIn from "@/shared/animations/FadeIn";

export default function ResepPage() {
    return (
        <section className="w-full">
            <FadeIn>
                <ResepSection />
            </FadeIn>
        </section>
    );
}