import HeroSections from "../components/herosections";
import FeatureSection from "../components/featuresection";
import CaraKerjaSection from "../components/carakerja-section";
import PriceSectionPage from "../components/price-section";
import AdvertisePrice from "../components/advertiseprice-section";
import FadeIn from "@/shared/animations/FadeIn";

export default function LandingPageContainer() {
    return (
        <div className="overflow-hidden">
            <FadeIn delay={0.1}>
                <HeroSections />
            </FadeIn>
            <FadeIn delay={0.2}>
                <FeatureSection />
            </FadeIn>
            <FadeIn delay={0.2}>
                <CaraKerjaSection />
            </FadeIn>
            <FadeIn delay={0.2}>
                <PriceSectionPage />
            </FadeIn>
            <FadeIn delay={0.2}>
                <AdvertisePrice />
            </FadeIn>
        </div>
    )
}