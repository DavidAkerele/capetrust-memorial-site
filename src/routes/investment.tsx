import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  TrendingUp,
  HeartHandshake,
  CheckCircle2,
  Users,
  Lock,
  FileCheck,
  Building2,
  Landmark,
  Scale,
} from "lucide-react";
import heroPark from "@/assets/hero-park.jpg";
import chapel from "@/assets/chapel.jpg";
import { Button } from "@/components/ui/button";
import { CTABand, PageHero, Section, SectionHeading } from "@/components/site/Sections";
import { site } from "@/lib/site";

export const Route = createFileRoute("/investment")({
  component: InvestmentPage,
  head: () => ({
    meta: [
      { title: "Investment & Family Estates | Garden of Peace™ | Capetrust" },
      {
        name: "description",
        content:
          "Invest in tomorrow's legacy. Garden of Peace™ Real Estate Investment Programme, multi-vault family estates, and inflation-hedged cemetery pre-planning in Lagos.",
      },
      { property: "og:title", content: "Estate Planning & Cemetery Investment | Capetrust" },
      {
        property: "og:description",
        content:
          "Secure family memorial plots and capital appreciation in Lagos State's fastest growing serene memorial corridor.",
      },
      { property: "og:image", content: "/images/og-capetrust.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Family Estates & Cemetery Investment | Garden of Peace™" },
      {
        name: "twitter:description",
        content:
          "Protect against inflation and secure multi-generational family plots in Lagos.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

const steps = [
  {
    num: "01",
    title: "Start the Conversation",
    desc: "Meet with one of our Pre-Planning Advisors to discuss your wishes, answer your questions, and review options.",
    icon: Users,
  },
  {
    num: "02",
    title: "Create Your Personal Plan",
    desc: "Together, we document your preferences, including burial arrangements, vault options, and personal requests.",
    icon: FileCheck,
  },
  {
    num: "03",
    title: "Review Your Choices",
    desc: "Take time to review your customized plan, adjust selections, and ensure every detail reflects your desires.",
    icon: CheckCircle2,
  },
  {
    num: "04",
    title: "Keep Your Plan Secure",
    desc: "Your plan is safely documented with Capetrust, protected from inflation, and can be updated anytime.",
    icon: Lock,
  },
];

const investmentBenefits = [
  {
    icon: TrendingUp,
    title: "Hedge Against Inflation",
    desc: "Lock in today's vault and land prices. Future funeral service and cemetery real estate costs are fully protected from inflation.",
  },
  {
    icon: Landmark,
    title: "Prime Growth Corridor",
    desc: "Located in Agbowa-Ikosi near the expanding Lagos-Ogun enterprise zone, where land and infrastructure values appreciate steadily.",
  },
  {
    icon: Building2,
    title: "Exclusive Family Estates",
    desc: "Reserve multi-chamber family mausoleums and gated private plots ensuring generations of loved ones remain together.",
  },
  {
    icon: Scale,
    title: "Perpetual Maintenance Guarantee",
    desc: "Every plot includes long-term landscaping, 24/7 security patrol, structural care, and manicured walkways.",
  },
];

function InvestmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Legacy &amp; Estate Planning"
        title="Invest in Tomorrow's Legacy with Confidence"
        intro="Planning and reserving memorial estate plots in advance is one of the most thoughtful decisions you can make. Protect your family's future, secure prime memorial real estate, and gain lasting peace of mind."
        image={heroPark}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="gold" size="xl">
            <Link to="/contact">Speak with an Estate Advisor</Link>
          </Button>
          <Button asChild variant="outlineDark" size="xl">
            <Link to="/estimator">Explore Vault Pricing</Link>
          </Button>
        </div>
      </PageHero>

      {/* Investment Value Pillars */}
      <Section>
        <SectionHeading
          eyebrow="Why Invest Ahead"
          title="Strategic value for your family and legacy"
          intro="Memorial real estate at Garden of Peace™ offers both financial security and deep emotional reassurance for families planning for generations."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {investmentBenefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-foreground">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 4-Step Process */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="How It Works"
          title="Simple, transparent 4-step planning journey"
          intro="Our dedicated advisors guide you through every milestone with compassion and discretion."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="relative rounded-2xl border border-border bg-background p-6 shadow-sm">
                <span className="text-3xl font-serif font-bold text-gold/40">{s.num}</span>
                <div className="mt-2 flex items-center gap-2">
                  <Icon className="size-5 text-primary" />
                  <h3 className="font-serif text-lg font-bold text-foreground">{s.title}</h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Family Estates Feature */}
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <img
            src={chapel}
            alt="Garden of Peace Memorial Park Chapel and grounds"
            className="rounded-2xl object-cover shadow-soft"
            width={1200}
            height={900}
          />
          <div>
            <SectionHeading
              eyebrow="Private Family Sanctuaries"
              title="Dedicated mausoleums &amp; gated family plots"
              intro="For families who desire a private, distinguished space of remembrance, Garden of Peace™ offers customizable multi-chamber family sanctuaries."
            />
            <ul className="mt-6 space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-gold shrink-0" />
                <span>Custom architecture, ornamental gates, and personalized family crest plaques</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-gold shrink-0" />
                <span>Exclusive multi-generational vaults (4, 6, 8 or 12 chamber configurations)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-gold shrink-0" />
                <span>Priority access to the on-site memorial chapel and private reception gardens</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-gold shrink-0" />
                <span>Flexible installment plans with 0% interest during pre-planning reservation</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link to="/contact">Request Estate Brochure</Link>
              </Button>
              <Button asChild variant="outlineDark" size="lg">
                <a href={site.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp Private Inquiry
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="Start securing your family estate today"
        intro="Schedule a private grounds tour at Garden of Peace™ or arrange a discreet consultation with our senior estate director."
      />
    </>
  );
}
