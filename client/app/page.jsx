// Import individual sections of the landing page from their respective components
import HeroSection from "@/components/Landing/HeroSection";
import LogoSection from "@/components/Landing/LogoSection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import WorksSection from "@/components/Landing/WorksSection";
import TestinomialSection from "@/components/Landing/TestinomialSection";
import FaqSection from "@/components/Landing/FaqSection";
import CtaSection from "@/components/Landing/CtaSection";

/**
 * LandingPage component renders the main sections of the landing page.
 *
 * @function
 * @returns {JSX.Element} JSX structure representing the landing page layout.
 */
export default function LandingPage() {
  return (
    // Main content wrapper with top margin
    <main className="flex-1 mt-20">
      {/* Hero banner with title and CTA */}
      <HeroSection />

      {/* Logos of featured partners/clients */}
      <LogoSection />

      {/* Highlight of product or service features */}
      <FeaturesSection />

      {/* Explanation of how the product works */}
      <WorksSection />

      {/* Testimonials from users or customers */}
      <TestinomialSection />

      {/* Frequently asked questions */}
      <FaqSection />

      {/* Final call to action for user engagement */}
      <CtaSection />
    </main>
  );
}
