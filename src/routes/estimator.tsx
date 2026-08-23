import { createFileRoute } from "@tanstack/react-router";
import heroPark from "@/assets/hero-park.jpg";
import { CTABand, PageHero, Section, SectionHeading } from "@/components/site/Sections";
import { PriceEstimator } from "@/components/site/PriceEstimator";

export const Route = createFileRoute("/estimator")({
  component: EstimatorPage,
  head: () => ({
    meta: [
      { title: "Price Estimator | Garden of Peace™ Memorial Park | Capetrust" },
      {
        name: "description",
        content:
          "Calculate estimated costs for single, double, and triple vaults, custom headstones, and surface finishes at Garden of Peace Memorial Park, Agbowa, Lagos.",
      },
      { property: "og:title", content: "Vault & Service Price Estimator | Capetrust Funeral Services" },
      {
        property: "og:description",
        content:
          "Transparent pricing and instant itemized quotes for cemetery vaults, headstones, and memorial services in Lagos.",
      },
      { property: "og:image", content: "/images/og-capetrust.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Price Estimator | Garden of Peace™ Memorial Park" },
      {
        name: "twitter:description",
        content:
          "Instant cost calculation for cemetery vaults, surface finishes, and memorial services in Lagos.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

function EstimatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Garden of Peace™ Cost Inquirer"
        title="Interactive Vault & Service Estimator"
        intro="Select your preferred vault chamber configuration, surface finishes, headstones, and optional services below to calculate an estimated itemized summary with transparent pricing."
        image={heroPark}
      />

      <Section>
        <SectionHeading
          eyebrow="Custom Itemized Estimate"
          title="Plan with total transparency and peace of mind"
          intro="Customize your memorial package below. Real-time calculations include perpetual maintenance and care at Garden of Peace™ Memorial Park."
        />
        <div className="mt-10">
          <PriceEstimator />
        </div>
      </Section>

      <CTABand
        title="Need a personalized consultation?"
        intro="Our pre-planning advisors are available 24/7 to guide you through customized estate packages, family vaults, and payment plans."
      />
    </>
  );
}
