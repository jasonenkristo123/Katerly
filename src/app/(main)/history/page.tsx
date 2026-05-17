import HistorySection from "@/features/history-nota/components/HistorySection";
import FadeIn from "@/shared/animations/FadeIn";

export default function History() {
    return (
        <section>
            <FadeIn>
                <HistorySection />
            </FadeIn>
        </section>
    );
}