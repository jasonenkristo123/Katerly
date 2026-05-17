import DaftarBelanjaSection from "@/features/daftar-belanja/components/daftar-belanja-section";
import FadeIn from "@/shared/animations/FadeIn";

export default function DaftarBelanjaPage() {
  return (
    <section>
      <FadeIn>
        <DaftarBelanjaSection />
      </FadeIn>
    </section>
  );
}
