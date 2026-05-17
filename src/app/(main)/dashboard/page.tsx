import DashboardSection from "@/features/dashboard/components/dashboardsection";
import FadeIn from "@/shared/animations/FadeIn";

export default function DashboardPage() {
    return (
        <section>
            <FadeIn>
                <DashboardSection />
            </FadeIn>
        </section>
    )
}