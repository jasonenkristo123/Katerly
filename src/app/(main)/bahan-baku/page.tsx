import BahanBaku from "@/features/bahan-baku/components/bahanbaku-sections";
import FadeIn from "@/shared/animations/FadeIn";


export default function BahanBakuPage() {
    return (
        <section>
            <FadeIn>
                <BahanBaku />
            </FadeIn>
        </section>
    )
}