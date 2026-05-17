import { Suspense } from "react";
import NotaPreview from "@/features/buat-nota/components/buat-nota2-section";

export default function BuatNotaPreviewPage() {
    return (
        <section className="min-h-screen bg-white py-8">
            <Suspense fallback={<div className="flex justify-center items-center min-h-[50vh]">Loading preview...</div>}>
                <NotaPreview />
            </Suspense>
        </section>
    );
}