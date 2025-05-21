import AboutUs from "@/components/aboutUs/aboutUs";

/**
 * Renders the About Page component which displays information about the project team and purpose.
 * This page imports and displays the <AboutUs /> component.
 *
 * It serves a static informational role and does not include interactivity or backend integration.
 *
 * @returns {JSX.Element} The AboutPage component.
 */

export default function AboutPage() {
  return (
    <main className="flex-1 mt-20">
      <AboutUs />
    </main>
  );
}
