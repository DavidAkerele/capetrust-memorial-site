import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  HandHeart,
  Landmark,
  Leaf,
  ShieldCheck,
  Wallet,
  Calculator,
  Flame,
  Heart,
  Calendar,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import heroPark from "@/assets/hero-park.jpg";
import familyComfort from "@/assets/family-comfort.jpg";
import chapel from "@/assets/chapel.jpg";
import { Button } from "@/components/ui/button";
import { CTABand, InfoCard, Section, SectionHeading } from "@/components/site/Sections";
import { site } from "@/lib/site";
import { INITIAL_OBITUARIES } from "@/lib/obituaries-data";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Capetrust Funeral Services | Funerals & Memorial Park in Lagos" },
      {
        name: "description",
        content:
          "Professional funeral planning, burial, repatriation and memorial services in Lagos, Nigeria. Home of Garden of Peace™ Memorial Park, Agbowa.",
      },
      { property: "og:title", content: "Capetrust Funeral Services | Lagos, Nigeria" },
      {
        property: "og:description",
        content:
          "Honouring every life with dignity, care and excellence. Funeral services, memorial gardens, cost estimator and online tributes.",
      },
    ],
  }),
});

const services = [
  {
    title: "Funeral Planning & Coordination",
    body: "From your first call to the day of the farewell, we carefully coordinate every aspect of the funeral, ensuring a seamless and dignified experience.",
  },
  {
    title: "Burial & Interment Services",
    body: "Every stage of the burial process is expertly coordinated, including interment at our private memorial park, Garden of Peace™.",
  },
  {
    title: "Cemetery Vaults & Burial Spaces",
    body: "Choose from a range of professionally constructed vault options, thoughtfully designed to provide a secure and lasting place of remembrance.",
  },
  {
    title: "Funeral Consultation & Family Support",
    body: "Whether you are making immediate arrangements or planning ahead, we provide trusted guidance to help you make informed decisions with confidence.",
  },
];

const reasons = [
  { icon: HandHeart, text: "Professional & compassionate service" },
  { icon: Leaf, text: "Peaceful private cemetery" },
  { icon: Wallet, text: "Transparent pricing" },
  { icon: ShieldCheck, text: "Flexible payment options (where applicable)" },
  { icon: Landmark, text: "Respectful, well-maintained grounds" },
  { icon: Clock, text: "24/7 immediate-need assistance" },
];

function Home() {
  const featuredObituaries = INITIAL_OBITUARIES.slice(0, 3);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative isolate">
        <img
          src={heroPark}
          alt="Garden of Peace Memorial Park at golden hour"
          className="absolute inset-0 -z-10 size-full object-cover"
          width={1920}
          height={1088}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/20" />
        <div className="container-page py-28 md:py-40">
          <div className="max-w-xl rounded-2xl bg-background/95 p-8 shadow-soft md:p-12">
            <p className="eyebrow text-gold">Every life. Honoured.™</p>
            <h1 className="mt-4 text-4xl leading-tight text-primary md:text-5xl">
              When words are difficult to find, compassionate care matters most.
            </h1>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Capetrust Funeral Services provides professional funeral, cemetery and memorial care
              in Lagos, designed to bring comfort, clarity and peace of mind during life's most
              challenging moments.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="xl">
                <Link to="/contact">Speak with an Advisor</Link>
              </Button>
              <Button asChild variant="outlineDark" size="xl">
                <Link to="/estimator">Calculate Vault Price</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Need Banner */}
      <Section tone="cream" className="py-12 md:py-14">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gold/40 bg-background p-7 shadow-sm md:flex-row">
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground">Has a death occurred?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Immediate support is available 24 hours a day, 7 days a week across Lagos and surrounding states.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="default" size="lg">
              <a href={site.phoneHref}>Call Us 24/7</a>
            </Button>
            <Button asChild variant="outlineDark" size="lg">
              <a href={site.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Who We Are */}
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <img
            src={familyComfort}
            alt="A daughter comforting her mother in a quiet garden"
            className="rounded-2xl object-cover shadow-soft"
            loading="lazy"
            width={1200}
            height={912}
          />
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="Guiding you every step of the way"
              intro="At Capetrust Funeral Services, we believe every life deserves to be honoured with dignity and every family deserves support they can rely on."
            />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Whether you're making arrangements for a loved one or planning ahead for the future,
              our team is committed to guiding you with empathy, integrity and exceptional
              attention to every detail, so you can focus on what truly matters: celebrating a life
              well lived.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="outlineDark" size="lg">
                <Link to="/about">More About Capetrust</Link>
              </Button>
              <Button asChild variant="gold" size="lg">
                <Link to="/investment">Family Estates &amp; Pre-Planning</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Our services"
          title="Comprehensive funeral services, thoughtfully delivered"
          intro="Every family deserves the confidence of working with a trusted team that can coordinate every aspect of a funeral with professionalism, clarity and attention to detail."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <InfoCard key={s.title} title={s.title} cta="Learn More" href="/services">
              {s.body}
            </InfoCard>
          ))}
        </div>
      </Section>

      {/* Interactive Price Estimator Callout */}
      <Section>
        <div className="rounded-3xl border border-gold/40 bg-primary p-8 text-primary-foreground shadow-soft sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-4">
              <span className="eyebrow text-gold inline-flex items-center gap-1.5 bg-gold/15 px-3 py-1 rounded-full">
                <Calculator className="size-3.5" />
                Transparent Pricing Tool
              </span>
              <h2 className="font-serif text-3xl font-bold sm:text-4xl text-primary-foreground">
                Plan and estimate your cemetery vault cost in real time
              </h2>
              <p className="text-sm leading-relaxed text-primary-foreground/80 max-w-2xl">
                Choose single, double, or triple vaults, surface finishes (granite, pebble, flower beds), headstones, and optional services with transparent pricing in Nigerian Naira.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 sm:flex-row lg:flex-col justify-center">
              <Button asChild variant="gold" size="xl">
                <Link to="/estimator" className="flex items-center justify-center gap-2">
                  <Calculator className="size-4" />
                  Launch Price Estimator
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                <Link to="/garden-of-peace">View Memorial Park</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Garden of Peace Sanctuary */}
      <Section tone="cream">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Garden of Peace™"
              title="Capetrust's private memorial park"
              intro="Located in the serene surroundings of Agbowa, Lagos State, Garden of Peace Memorial Park spans over 10 acres of thoughtfully planned memorial grounds."
            />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Designed to respectfully accommodate families of all faiths and traditions, the park
              features an on-site chapel, a selection of professionally constructed vault options,
              beautifully maintained grounds and dedicated long-term care.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link to="/garden-of-peace">Explore the Memorial Park</Link>
              </Button>
              <Button asChild variant="outlineDark" size="lg">
                <Link to="/contact">Book a Cemetery Tour</Link>
              </Button>
            </div>
          </div>
          <img
            src={chapel}
            alt="On-site chapel at Garden of Peace Memorial Park"
            className="rounded-2xl object-cover shadow-soft"
            loading="lazy"
            width={1200}
            height={900}
          />
        </div>
      </Section>

      {/* Featured Obituaries & Tributes */}
      <Section>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Cherished Legacies"
            title="Recent Obituaries &amp; Life Celebrations"
            intro="Honour beloved memories, light a tribute candle, and share heartfelt condolences with bereaved families."
          />
          <Button asChild variant="outlineDark" size="lg" className="shrink-0">
            <Link to="/obituaries" className="flex items-center gap-1.5">
              View All Obituaries <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {featuredObituaries.map((obituary) => (
            <div
              key={obituary.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-soft hover:border-gold/50"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  <img
                    src={obituary.featuredImage}
                    alt={obituary.fullName}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-medium text-gold">Aged {obituary.age}</span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <Flame className="size-3.5 text-gold fill-gold" />
                        {obituary.candlesCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="size-3.5 text-red-400 fill-red-400" />
                        {obituary.condolences.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  {obituary.title && (
                    <span className="eyebrow text-gold text-[0.62rem]">{obituary.title}</span>
                  )}
                  <h3 className="mt-1.5 font-serif text-xl font-bold text-foreground group-hover:text-primary">
                    {obituary.fullName}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-xs italic text-muted-foreground">
                    "{obituary.summaryQuote}"
                  </p>
                </div>
              </div>

              <div className="border-t border-border p-5 pt-3">
                <Link
                  to="/obituaries/$slug"
                  params={{ slug: obituary.slug }}
                  className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-primary group-hover:text-gold transition-colors"
                >
                  <span>Read Tribute</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Families Choose Us */}
      <Section tone="cream">
        <SectionHeading center eyebrow="Why families choose us" title="Care you can rely on" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-xs"
            >
              <Icon className="mt-0.5 size-5 text-gold shrink-0" />
              <p className="text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABand
        title="Let's start the conversation"
        intro="Reach out today and speak with a member of the Capetrust team. From the first call to the final farewell, we are honoured to walk this journey with you."
      />
    </>
  );
}
