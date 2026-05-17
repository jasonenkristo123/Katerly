import SettingSection from "@/features/settings/components/SettingSection";
import FadeIn from "@/shared/animations/FadeIn";

export default function SettingsPage() {
    return (
        <section>
            <FadeIn>
                <SettingSection />
            </FadeIn>
        </section>
    );
}