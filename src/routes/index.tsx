import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Building2,
  Users,
  Award,
  Sparkles,
  Calculator,
  ArrowRight,
  Flame,
  CheckCircle2,
  Compass,
  TreePine,
} from "lucide-react";
import chapel from "@/assets/chapel.jpg";
import { Button } from "@/components/ui/button";
import { CTABand, Section, SectionHeading } from "@/components/site/Sections";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Capetrust Funeral Services & Garden of Peace™ Memorial Park | Lagos" },
      {
        name: "description",
        content:
          "Dignified funeral planning, private cemetery vaults, and comprehensive memorial care at Garden of Peace Memorial Park in Agbowa, Lagos.",
      },
      { property: "og:title", content: "Capetrust Funeral Services | Lagos, Nigeria" },
      {
        property: "og:description",
        content: "Honouring Every Life with Dignity, Care & Excellence.",
      },
      { property: "og:image", content: "/images/og-capetrust.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Capetrust Funeral Services & Memorial Park" },
      {
        name: "twitter:description",
        content: "Serene 10+ acre private memorial park, single/double/triple vaults, and 24/7 care.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

const services = [
  {
    icon: Building2,
    title: "Burial & Vault Options",
    body: "Single, double and triple unit vaults, as well as family estates and private mausoleums, within a well-maintained and permanently preserved memorial park.",
    href: "/garden-of-peace",
    badge: "Garden of Peace™",
  },
  {
    icon: Calendar,
    title: "Funeral Coordination & Planning",
    body: "Full funeral coordination, order of service design, floral arrangements, transport coordination, and on-site chapel access to ensure a seamless service.",
    href: "/services",
    badge: "Full Coordination",
  },
  {
    icon: Compass,
    title: "Estate Pre-Planning",
    body: "Plan ahead with confidence. Secure resting spaces, protect your family from future costs, and ensure your wishes are documented with absolute clarity.",
    href: "/investment",
    badge: "0% Installments",
  },
  {
    icon: Sparkles,
    title: "Memorialisation & Monuments",
    body: "Headstones, pebblestone surrounds, evergreen artificial flower bed finishes, memorial street naming and memorial wall plaques designed to preserve cherished memories.",
    href: "/memorial-products",
    badge: "Granite & Stone",
  },
];

const reasons = [
  { icon: ShieldCheck, text: "Licensed and professionally managed memorial park", tag: "Certified" },
  { icon: Building2, text: "Permanent concrete vault construction with lifetime structural integrity", tag: "Permanent" },
  { icon: TreePine, text: "Perpetual landscape care, clean paved walkways and 24/7 security", tag: "Perpetual" },
  { icon: Users, text: "Compassionate, dedicated advisors to guide your family through every step", tag: "Compassion" },
  { icon: Clock, text: "24-hour immediate assistance available whenever you need us", tag: "24/7 Support" },
  { icon: Award, text: "Clear, transparent pricing in Nigerian Naira with no hidden fees", tag: "Transparent" },
];

function Home() {
  return (
    <>
      {/* 100vh Full Screen Hero Banner with Ambient Motion & Dynamic Textures */}
      <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
        {/* Background Image with Slow Ambient Scale Effect */}
        <img
          src="https://images.pexels.com/photos/7317677/pexels-photo-7317677.jpeg"
          alt="Capetrust Memorial & Funeral Care"
          className="absolute inset-0 -z-20 size-full object-cover scale-105 transition-transform duration-1000 ease-out"
          width={1920}
          height={1088}
        />
        
        {/* Deep Royal Midnight Blue with Subtle Pine Green Undertones */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0E0E44]/95 via-[#0D2436]/85 to-[#153B26]/45" />
        <div className="absolute inset-0 -z-10 bg-texture-grid opacity-30 pointer-events-none" />

        {/* Ambient Floating Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 -z-10 size-96 rounded-full bg-[#D4AF37]/10 blur-3xl animate-glow-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 -z-10 size-96 rounded-full bg-[#2E5E3A]/25 blur-3xl animate-glow-pulse pointer-events-none" />

        <div className="container-page py-16 sm:py-24 lg:py-32 w-full">
          {/* Main Transparent Hero Content */}
          <div className="max-w-3xl space-y-6">
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold border border-gold/40 backdrop-blur-md shadow-xs animate-float-slow">
              <span className="flex size-2 rounded-full bg-[#415825] animate-pulse" />
              <span>Every life. Honoured.™</span>
            </div>

            <h1 className="text-4xl font-serif font-bold text-white leading-tight sm:text-5xl lg:text-6xl drop-shadow-md">
              When words are difficult to find, compassionate care matters most.
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-white/90 max-w-2xl drop-shadow-xs">
              Capetrust Funeral Services provides professional funeral, cemetery and memorial care
              in Lagos, designed to bring comfort, clarity and peace of mind during life's most
              challenging moments.
            </p>

            {/* Action Buttons with Dynamic Hover Micro-Motions */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button asChild variant="gold" size="xl" className="w-full sm:w-auto shadow-lg hover:shadow-gold/25 transition-all duration-300 hover:scale-105">
                <Link to="/contact">Speak with an Advisor</Link>
              </Button>
              <Button asChild variant="pine" size="xl" className="w-full sm:w-auto shadow-lg hover:shadow-pine/30 transition-all duration-300 hover:scale-105">
                <Link to="/estimator" className="flex items-center justify-center gap-2">
                  <Calculator className="size-4" />
                  Calculate Vault Price
                </Link>
              </Button>
              <Button asChild variant="onDark" size="xl" className="w-full sm:w-auto backdrop-blur-md transition-all duration-300 hover:bg-white/20">
                <Link to="/garden-of-peace">Explore Memorial Park</Link>
              </Button>
            </div>

            {/* Quick Live Stats Ribbon */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/15 max-w-xl">
              <div className="flex items-center gap-2 text-xs text-white/80">
                <CheckCircle2 className="size-4 text-gold shrink-0" />
                <span>10+ Acre Sanctuary</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/80">
                <CheckCircle2 className="size-4 text-gold shrink-0" />
                <span>24/7 Lagos Response</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/80 col-span-2 sm:col-span-1">
                <CheckCircle2 className="size-4 text-gold shrink-0" />
                <span>Perpetual Upkeep</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Need Banner with Pulse Motion */}
      <Section tone="cream" className="py-10 md:py-12 bg-texture-dots">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#D4AF37]/40 bg-card p-6 sm:p-8 shadow-soft transition-all duration-300 hover:border-[#D4AF37] md:flex-row">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#415825] opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-[#415825]" />
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">Has a death occurred?</h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Immediate professional support is available 24 hours a day, 7 days a week across Lagos and surrounding states.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <Button asChild variant="default" size="lg" className="flex-1 sm:flex-none hover:shadow-md transition-all">
              <a href={site.phoneHref}>Call Us 24/7</a>
            </Button>
            <Button asChild variant="pine" size="lg" className="flex-1 sm:flex-none hover:shadow-md transition-all">
              <a href={site.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Who We Are with Layered Textures & Visual Elegance */}
      <Section className="relative overflow-hidden bg-texture-mesh">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Image with Decorative Gold Frame & Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative group overflow-hidden rounded-2xl border border-[#D4AF37]/40 shadow-soft">
              <img
                src="https://plus.unsplash.com/premium_photo-1666717576644-5701d3406840?w=1200&auto=format&fit=crop&q=80"
                alt="Memorial candle of eternal remembrance and compassionate care"
                className="w-full h-[360px] sm:h-[460px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                width={1200}
                height={912}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E44]/80 via-transparent to-transparent" />
              
              {/* Floating Remembrance Badge */}
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 bg-background/90 p-4 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                    <Flame className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Dedicated Family Care</p>
                    <p className="text-[11px] text-muted-foreground">Preserving cherished legacies with reverence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content with Value Bullets */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="Who we are"
              title="Guiding you every step of the way"
              intro="At Capetrust Funeral Services, we believe every life deserves to be honoured with dignity and every family deserves support they can rely on."
            />
            <p className="leading-relaxed text-muted-foreground text-sm sm:text-base">
              Whether you're making arrangements for a loved one or planning ahead for the future,
              our team is committed to guiding you with empathy, integrity and exceptional
              attention to every detail, so you can focus on what truly matters: celebrating a life
              well lived.
            </p>

            {/* Interactive Feature List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-card p-3.5 shadow-2xs transition-all hover:border-[#415825]/40 hover:bg-[#415825]/5">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#415825]/15 text-[#415825] mt-0.5">
                  <CheckCircle2 className="size-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Family-Led Accountability</h4>
                  <p className="text-[11px] text-muted-foreground">Every arrangement handled with personal care and institutional excellence.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-card p-3.5 shadow-2xs transition-all hover:border-[#415825]/40 hover:bg-[#415825]/5">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#415825]/15 text-[#415825] mt-0.5">
                  <CheckCircle2 className="size-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">End-to-End Funeral &amp; Vault Solutions</h4>
                  <p className="text-[11px] text-muted-foreground">From documentation and mortuary care to graveside committal and perpetual park maintenance.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button asChild variant="outlineForest" size="lg" className="w-full sm:w-auto hover:shadow-sm">
                <Link to="/about">More About Capetrust</Link>
              </Button>
              <Button asChild variant="forest" size="lg" className="w-full sm:w-auto hover:shadow-sm">
                <Link to="/investment">Family Estates &amp; Pre-Planning</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Comprehensive Services with Hover Motion */}
      <Section tone="cream" className="bg-texture-dots">
        <SectionHeading
          center
          eyebrow="Our services"
          title="Comprehensive funeral services, thoughtfully delivered"
          intro="Every family deserves the confidence of working with a trusted team that coordinates every aspect of a funeral with professionalism, clarity and attention to detail."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="card-interactive group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[#1E3F20]/10 text-[#1E3F20] transition-colors group-hover:bg-[#1E3F20] group-hover:text-white">
                      <Icon className="size-6" />
                    </div>
                    <span className="rounded-full bg-[#D4AF37]/15 px-2.5 py-0.5 text-[10px] font-bold text-gold border border-gold/20">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/60">
                  <Link
                    to={s.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#415825] transition-all group-hover:translate-x-1 group-hover:text-[#1E3F20]"
                  >
                    Learn More <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Interactive Price Estimator Callout */}
      <Section>
        <div className="relative isolate overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#0E0E44] via-[#1E3D82] to-[#1E3F20] p-8 sm:p-12 text-white shadow-soft">
          {/* Subtle Shimmer Sweep Overlay */}
          <div className="absolute inset-0 bg-texture-grid opacity-20 pointer-events-none" />
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-[#D4AF37]/15 blur-3xl animate-glow-pulse pointer-events-none" />

          <div className="relative grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/20 px-3.5 py-1 text-xs font-bold text-gold border border-gold/30 backdrop-blur-xs">
                <Calculator className="size-3.5" />
                Transparent Pricing Tool
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Plan and estimate your cemetery vault cost in real time
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-white/85 max-w-2xl">
                Choose single, double, or triple vaults, surface finishes (granite, pebble, flower beds), headstones, and optional services with transparent pricing in Nigerian Naira.
              </p>

              {/* Price Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 border border-white/15">
                  Single Vault: ₦4,000,000
                </span>
                <span className="rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 border border-white/15">
                  Double Vault: ₦7,000,000
                </span>
                <span className="rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 border border-white/15">
                  Triple Vault: ₦9,800,000
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 sm:flex-row lg:flex-col justify-center">
              <Button asChild variant="gold" size="xl" className="w-full shadow-lg hover:scale-105 transition-all">
                <Link to="/estimator" className="flex items-center justify-center gap-2">
                  <Calculator className="size-4" />
                  Launch Price Estimator
                </Link>
              </Button>
              <Button asChild variant="onDark" size="xl" className="w-full transition-all">
                <Link to="/garden-of-peace">View Memorial Park</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Garden of Peace Sanctuary Showcase */}
      <Section tone="cream" className="bg-texture-dots">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-4">
            <SectionHeading
              eyebrow="Garden of Peace™"
              title="Capetrust's private memorial park"
              intro="Located in the serene surroundings of Odo-Ayandelu, opposite Government Estate, Agbowa, Lagos State, Garden of Peace Memorial Park spans over 10 acres of thoughtfully planned memorial grounds."
            />
            <p className="leading-relaxed text-muted-foreground text-sm sm:text-base">
              Designed to respectfully accommodate families of all faiths and traditions, the park
              features an on-site chapel, a selection of professionally constructed vault options,
              beautifully maintained grounds and dedicated long-term care.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button asChild variant="forest" size="lg" className="w-full sm:w-auto hover:shadow-md transition-all">
                <Link to="/garden-of-peace">Explore the Memorial Park</Link>
              </Button>
              <Button asChild variant="outlineForest" size="lg" className="w-full sm:w-auto hover:shadow-md transition-all">
                <Link to="/contact">Book a Cemetery Tour</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="group relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 shadow-soft">
              <img
                src={chapel}
                alt="On-site chapel at Garden of Peace Memorial Park"
                className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                width={1200}
                height={900}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/60 p-3 backdrop-blur-xs text-white text-xs">
                <p className="font-bold">On-Site Chapel Sanctuary</p>
                <p className="text-[11px] text-white/80">Air-conditioned chapel for private liturgical and memorial services</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Memorial Tributes & Life Celebrations Portal */}
      <Section className="bg-texture-mesh">
        <div className="w-full rounded-2xl border border-[#D4AF37]/40 bg-card p-6 sm:p-10 lg:p-12 shadow-soft">
          <div className="text-center">
            <span className="inline-block rounded-full bg-[#415825]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#415825] border border-[#415825]/20">
              Eternal Remembrance
            </span>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Memorial Tributes &amp; Life Stories
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
              A sacred space where cherished lives are honoured, beautiful memories preserved, and families around the world can share condolences, light virtual candles, and view service arrangements.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="card-interactive flex flex-col justify-between rounded-xl border border-border bg-background p-6">
              <div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#415825]/10 text-[#415825]">
                  <Flame className="size-5" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-foreground">Submit a Family Tribute</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Submit tribute announcements, life biographies, and funeral service schedules directly to our administration team for verified publication.
                </p>
              </div>
              <Button asChild variant="forest" size="lg" className="mt-6 w-full sm:w-auto">
                <Link to="/obituaries/create" className="flex items-center justify-center gap-2">
                  Submit Memorial Tribute <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="card-interactive flex flex-col justify-between rounded-xl border border-border bg-background p-6">
              <div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#1E3D82]/10 text-[#1E3D82]">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-foreground">Search Memorial Registry</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Explore published memorials, send condolences to bereaved families, and light candles in memory of departed loved ones.
                </p>
              </div>
              <Button asChild variant="outlineForest" size="lg" className="mt-6 w-full sm:w-auto">
                <Link to="/obituaries" className="flex items-center justify-center gap-2">
                  Browse Tributes <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Families Choose Us with Dynamic Interactive Grid */}
      <Section tone="cream" className="bg-texture-dots">
        <SectionHeading center eyebrow="Why families choose us" title="Care you can rely on" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {reasons.map(({ icon: Icon, text, tag }) => (
            <div
              key={text}
              className="card-interactive group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#415825]/10 text-[#415825] transition-all group-hover:scale-110 group-hover:bg-[#415825] group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <p className="text-xs leading-relaxed text-foreground/90 font-medium">{text}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-[#415825]">
                  {tag}
                </span>
              </div>
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
