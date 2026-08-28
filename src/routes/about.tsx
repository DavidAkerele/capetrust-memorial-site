import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Heart,
  Shield,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  Lightbulb,
  Sparkles,
  TreePine,
  CheckCircle2,
  Lock,
  Eye,
  HandHeart,
  ArrowRight,
} from "lucide-react";
import advisor from "@/assets/advisor.jpg";
import familyComfort from "@/assets/family-comfort.jpg";
import heroPark from "@/assets/hero-park.jpg";
import chapel from "@/assets/chapel.jpg";
import { Button } from "@/components/ui/button";
import { CTABand, PageHero, Section, SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Us | Capetrust Funeral Services & Garden of Peace™" },
      {
        name: "description",
        content:
          "Learn about Capetrust Funeral Services: a family-owned institution founded by Juwon Osibanjo to deliver dignity, care, and foresight across funeral, cemetery, and memorial care in Lagos.",
      },
      { property: "og:title", content: "About Capetrust Funeral Services | Our Story & Values" },
      {
        property: "og:description",
        content: "A family-owned funeral home founded on the belief that every life leaves a unique mark, and every departure deserves dignity, care, and foresight.",
      },
      { property: "og:image", content: "/images/og-capetrust.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Capetrust Funeral Services" },
      {
        name: "twitter:description",
        content: "Our story, vision, mission, and family-led commitment to dignified memorial care in Nigeria.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

const coreValues = [
  {
    title: "Dignity",
    desc: "Every departed person deserves absolute respect, reverence, and honour.",
    icon: ShieldCheck,
  },
  {
    title: "Compassion",
    desc: "We serve families with deep understanding, empathy, and attentive practical care.",
    icon: HandHeart,
  },
  {
    title: "Security",
    desc: "We prioritize a safe, protected environment for families, resting grounds, and visitors.",
    icon: Lock,
  },
  {
    title: "Integrity",
    desc: "We conduct all operations with total honesty, transparent pricing, and accountability.",
    icon: Shield,
  },
  {
    title: "Innovation",
    desc: "We continuously elevate our operational standards, logistics, and memorial facilities.",
    icon: Lightbulb,
  },
  {
    title: "Beauty",
    desc: "We maintain clean, professionally landscaped environments that reflect lasting peace.",
    icon: Sparkles,
  },
];

const pillars = [
  {
    title: "Family-Led Accountability",
    desc: "As a family-owned institution, we manage every service with personal dedication and deep respect for kinship and community values.",
    icon: Users,
  },
  {
    title: "Complete End-to-End Solutions",
    desc: "From immediate planning and professional logistics (including customized hearse and Hiace bus rentals) to serene cemetery spaces, we coordinate every detail to keep the process structured and organized.",
    icon: Building2,
  },
  {
    title: "Proactive Planning",
    desc: "Rooted in our founding lessons, we help families put clear structures in place ahead of time, eliminating chaos and securing peace of mind for the future.",
    icon: Compass,
  },
  {
    title: "Innovation Rooted in Tradition",
    desc: "We combine modern operational efficiency and smart memorial technology with deep African values of respect, community, and reverence.",
    icon: Sparkles,
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Capetrust"
        title="Dignity, Care &amp; Foresight in Every Farewell"
        intro="Welcome to Capetrust Funeral Services, a family-owned funeral home founded on the belief that every life leaves a unique mark, and every departure deserves to be handled with utmost dignity, care, and foresight."
        image={advisor}
      >
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">Speak with Our Team</Link>
        </Button>
        <Button asChild variant="pine" size="xl">
          <Link to="/garden-of-peace">Explore Garden of Peace™</Link>
        </Button>
      </PageHero>

      {/* Our Story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 space-y-5">
            <SectionHeading eyebrow="Our Story" title="Born from Conviction &amp; Compassion" />
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Capetrust was born out of a pivotal event witnessed by our founder, <strong className="text-foreground font-semibold">Juwon Osibanjo</strong>. In his local church, there was a remarkable 87-year-old woman who was an active, vibrant participant and a dedicated contributor to the community. However, when her time came, all her children were in the diaspora.
              </p>
              <p>
                With no prior arrangements or plans in place, she unfortunately passed away alone in Nigeria, leaving a vacuum of chaos, confusion, and grief where there should have been a proper celebration of life and a peaceful send-off.
              </p>
              <p>
                That heartbreaking reality sparked a clear vision: <strong className="text-foreground">no family should ever have to navigate the weight of loss unprepared, and no elder should pass without a laid out structure of honourable care.</strong>
              </p>
              <p>
                Driven by this conviction, Juwon established Capetrust Funeral Services as a family-owned organization where families can find complete support before, during, and after a loss. As a family-owned business, we treat every client family with the same accountability and dedication we would extend to our own.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1666717576644-5701d3406840?w=1200&auto=format&fit=crop&q=80"
                alt="Capetrust family-led compassionate care and remembrance"
                className="rounded-2xl object-cover shadow-soft border border-[#D4AF37]/30 w-full h-[360px] sm:h-[440px]"
                loading="lazy"
                width={1200}
                height={912}
              />
              <div className="mt-4 rounded-xl border border-[#415825]/30 bg-[#415825]/10 p-5 text-xs leading-relaxed text-[#1E3F20] dark:text-emerald-300">
                <p className="font-semibold italic">
                  "Every life leaves a mark. We make sure the final chapter is handled with the order, respect, and dignity deserved."
                </p>
                <p className="mt-1 font-bold tracking-wider uppercase text-[10px] text-[#415825]">
                  — Juwon Osibanjo, Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Garden of Peace™ Memorial Park Callout */}
      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <img
              src={chapel}
              alt="Garden of Peace Memorial Park Chapel and grounds"
              className="rounded-2xl object-cover shadow-soft border border-[#D4AF37]/30"
              loading="lazy"
              width={1200}
              height={900}
            />
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <SectionHeading
              eyebrow="Garden of Peace™ Memorial Park"
              title="A Dedicated Sanctuary for Reflection"
            />
            <p className="text-xs font-semibold text-[#415825]">
              Located at Odo-Ayandelu (opposite Government Estate, Agbowa, Lagos State)
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                At the heart of our services is Garden of Peace™ Memorial Park. We recognize that a cemetery is not merely a burial ground; it is a dedicated space where families return to remember, reflect, honour their loved ones, and preserve their memories.
              </p>
              <p>
                Conceived as a <strong className="text-foreground">garden cemetery</strong> rather than a simple plot of land, the environment is professionally designed by horticulturists to maintain a clean, secure, and serene setting. It is supported by solar-powered security cameras and guarded by experienced personnel to ensure absolute peace of mind during burials and visits.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button asChild variant="forest" size="lg">
                <Link to="/garden-of-peace">Explore the Memorial Park</Link>
              </Button>
              <Button asChild variant="outlineForest" size="lg">
                <Link to="/contact">Book a Grounds Tour</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Vision */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#0E0E44] via-[#1E3D82] to-[#0A192F] p-8 text-white shadow-soft sm:p-10">
            <div>
              <span className="inline-block rounded-full bg-[#D4AF37]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold border border-gold/30">
                Our Vision
              </span>
              <h2 className="mt-4 font-serif text-2xl font-bold sm:text-3xl text-white">
                Redefining Memorial Care Across Africa
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/90">
                To redefine funeral, cemetery, and memorial services across Africa by building trusted institutions where every family finds comfort, every life is honoured, and every legacy is preserved.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-gold">
              <Sparkles className="size-4" />
              <span>Comfort • Honour • Legacy</span>
            </div>
          </div>

          {/* Mission */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#0E0E44] via-[#1E3D82] to-[#1E3F20] p-8 text-white shadow-soft sm:p-10">
            <div>
              <span className="inline-block rounded-full bg-[#415825]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold border border-gold/30">
                Our Mission
              </span>
              <h2 className="mt-4 font-serif text-2xl font-bold sm:text-3xl text-white">
                Complete, Compassionate &amp; Innovative Solutions
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/90">
                To provide complete funeral, cemetery, and memorial solutions, delivered with care, in a professional and compassionate manner, while embracing innovation to give families peace of mind and create meaningful experiences that honour every life.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-gold">
              <CheckCircle2 className="size-4 text-gold" />
              <span>Professionalism • Empathy • Innovation</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Community Development */}
      <Section tone="cream">
        <div className="w-full rounded-2xl border border-[#D4AF37]/30 bg-card p-8 shadow-soft sm:p-12">
          <SectionHeading
            eyebrow="Community Development"
            title="An Active Partner in Shared Growth"
            intro="Beyond providing a serene final resting place, we believe in being an active partner to the communities we serve."
          />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground max-w-5xl">
            As we grow, we remain deeply committed to contributing to local government development initiatives and community empowerment, ensuring that our presence brings tangible infrastructure, shared growth, and mutual upliftment wherever we establish our roots.
          </p>
        </div>
      </Section>

      {/* Why Choose Capetrust? */}
      <Section>
        <SectionHeading
          center
          eyebrow="Why Choose Capetrust?"
          title="Built on Four Enduring Pillars"
          intro="We combine personal family accountability with comprehensive, modern memorial solutions."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:border-[#415825]/50 hover:shadow-md"
              >
                <div>
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#415825]/10 text-[#415825] group-hover:bg-[#415825] group-hover:text-white transition-colors duration-300">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-[#415825]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Core Values */}
      <Section tone="cream">
        <SectionHeading
          center
          eyebrow="Our Core Values"
          title="The Principles That Guide Every Action"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="flex items-start gap-4 rounded-2xl border border-border bg-background p-6 shadow-xs transition-all hover:border-[#415825]/40"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#415825]/10 text-[#415825]">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground">{val.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{val.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Our Promise & CTA */}
      <CTABand
        title="Our Promise to You"
        intro="At Capetrust, we provide the clarity and seamless guidance you need from the first phone call to the final resting place at the Garden of Peace. Every life leaves a mark. We make sure the final chapter is handled with the order, respect, and dignity deserved."
        primary={{ label: "Speak with Our Family Advisors", to: "/contact" }}
      />
    </>
  );
}
