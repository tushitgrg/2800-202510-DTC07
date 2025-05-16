import HeroSection from "@/components/Landing/HeroSection";
import LogoSection from "@/components/Landing/LogoSection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import WorksSection from "@/components/Landing/WorksSection";
import TestinomialSection from "@/components/Landing/TestinomialSection";
import FaqSection from "@/components/Landing/FaqSection";
import CtaSection from "@/components/Landing/CtaSection";

export default function LandingPage() {
  return (
    <main className="flex-1 mt-20">
      <HeroSection />
      <LogoSection />
      <FeaturesSection />
      <WorksSection />
      <TestinomialSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
