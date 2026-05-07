import HeroSections from "../components/herosections";
import FeatureSection from "../components/featuresection";
import CaraKerjaSection from "../components/carakerja-section";
import PriceSectionPage from "../components/price-section";
import AdvertisePrice from "../components/advertiseprice-section";

export default function LandingPageContainer() {
    return (
        <>
            <HeroSections />
            <FeatureSection />
            <CaraKerjaSection />
            <PriceSectionPage />
            <AdvertisePrice />
        </>
    )
}