
import BuatNota1Section from "@/features/buat-nota/components/buat-nota1-section";
import FadeIn from "@/shared/animations/FadeIn";

export default function BuatNotaPageSection() {
    return (
        <section className="min-h-screen bg-white py-8">
            <FadeIn>
                <BuatNota1Section />
            </FadeIn>
        </section>
    );
}

