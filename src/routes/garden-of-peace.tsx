import { createFileRoute } from "@tanstack/react-router";
import heroPark from "@/assets/hero-park.jpg";
import chapel from "@/assets/chapel.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { CTABand, InfoCard, PageHero, Section, SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/garden-of-peace")({
  component: GardenOfPeace,
  head: () => ({
    meta: [
      { title: "Garden of Peace™ Memorial Park | Cemetery in Agbowa, Lagos" },
      {
        name: "description",
        content:
          "Garden of Peace Memorial Park in Odo-Ayandelu, Agbowa, Lagos: single, double and triple vaults, mausoleums, private family estates and memorialisation options.",
      },
      { property: "og:title", content: "Garden of Peace™ Memorial Park | Agbowa, Lagos" },
      {
        property: "og:description",
        content:
          "A place of lasting remembrance: over 10 acres of thoughtfully planned memorial grounds.",
      },
      { property: "og:image", content: "/images/og-capetrust.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Garden of Peace™ Memorial Park | Lagos" },
      {
        name: "twitter:description",
        content: "Over 10 acres of serene memorial parkland, private family vaults, and memorial gardens.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

const vaults = [
  {
    title: "Single Unit Vault",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
    body: "Designed for one individual, the Single Unit Vault offers a private and permanent burial space within Garden of Peace Memorial Park. An ideal choice for those seeking a dignified, well-maintained resting place preserved for generations.",
  },
  {
    title: "Double Unit Vault",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    body: "The Double Unit Vault accommodates two interments within a unified structure, providing practicality and the reassurance of planning resting spaces together in advance.",
  },
  {
    title: "Triple Unit Vault",
    image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=800&auto=format&fit=crop",
    body: "The Triple Unit Vault accommodates three tiered interments within a shared dedicated location, offering optimal space efficiency and lasting peace of mind.",
  },
];

const memorialisation: [string, string][] = [
  ["Headstones", "Professionally crafted headstones designed to honour each individual with elegance and permanence."],
  ["Pebblestone Finish", "A decorative pebblestone surround that provides a refined, low-maintenance finish while enhancing the memorial space."],
  ["Artificial Flower Bed Finish", "A beautifully arranged memorial flower bed designed to provide year-round presentation with minimal upkeep."],
  ["Memorial Street Naming", "Commemorate a loved one through the naming of selected streets within the memorial park, creating a tribute remembered for generations."],
  ["Memorial Wall Recognition", "Dedicated spaces for commemorative plaques, family recognition and carefully approved memorial displays."],
];

const gallery = [
  {
    title: "The On-Site Chapel",
    desc: "A serene, air-conditioned multi-faith sanctuary for memorial services and prayers.",
    image: chapel,
  },
  {
    title: "Sanctuary & Manicured Lawns",
    desc: "Tranquil landscaped gardens and paved walkways for peaceful reflection.",
    image: "/images/tranquil_spaces_1_1778053447528.png",
  },
  {
    title: "Private Family Sanctuary",
    desc: "Gated, multi-generational private plots set within exclusive landscaped groves.",
    image: "/images/memorial_estate_card_1778053361538.png",
  },
  {
    title: "Solar Power & Clean Energy",
    desc: "Uninterrupted eco-friendly solar illumination and continuous clean power.",
    image: "/images/panyawat-auitpol-eq254Cqvmk8-unsplash.jpg",
  },
  {
    title: "Security & 24/7 Care",
    desc: "Continuous CCTV monitoring, uniformed personnel, and perpetual groundskeeping.",
    image: "/images/visiting_guide_card_1778053407107.png",
  },
  {
    title: "Private Family Mausoleum Architecture",
    desc: "Above-ground granite and marble walk-in crypts designed for lasting distinction.",
    image: "/images/tranquil_spaces_2_1778053473712.png",
  },
];

import { SafeImage } from "@/components/ui/SafeImage";
import { useCMS } from "@/lib/cms/cms-store";

function GardenOfPeace() {
  const { content } = useCMS();
  const parkContent = content.gardenOfPeace;
  const hero = parkContent?.hero;

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow || "Garden of Peace™ Memorial Park"}
        title={hero?.title || "A Place of Lasting Remembrance"}
        intro={hero?.intro || "Tucked away in Odo-Ayandelu (opposite Government Estate, Agbowa, Lagos), Garden of Peace Memorial Park is more than a cemetery: it is a garden sanctuary where lives are honoured, memories are preserved, and generations can return to reflect."}
        image={heroPark}
      >
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">Speak with an Advisor</Link>
        </Button>
        <Button asChild variant="pine" size="xl">
          <Link to="/estimator">Calculate Vault Price</Link>
        </Button>
      </PageHero>

      {/* Quick Jump Navigation Bar - Clean, straight architectural styling */}
      <div className="sticky top-16 z-20 border-y border-border bg-[#0A122E]/95 py-3 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto no-scrollbar px-4 sm:justify-center sm:gap-3 text-xs font-semibold">
          <span className="shrink-0 text-[#D4AF37] uppercase tracking-wider text-[11px] font-bold border-l-2 border-[#D4AF37] pl-2">Explore Grounds:</span>
          <a href="#vault-spaces" className="shrink-0 border border-[#1E3D82]/60 bg-[#1E3D82]/40 px-3.5 py-1.5 text-slate-200 hover:bg-[#D4AF37] hover:text-[#0A122E] transition-colors whitespace-nowrap">
            Vault Spaces (1–3 Units)
          </a>
          <a href="#mausoleums-estates" className="shrink-0 border border-[#D4AF37]/60 bg-[#D4AF37]/15 px-3.5 py-1.5 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A122E] transition-colors font-bold whitespace-nowrap">
            Private Mausoleums &amp; Family Estates
          </a>
          <a href="#monuments-finishes" className="shrink-0 border border-[#1E3D82]/60 bg-[#1E3D82]/40 px-3.5 py-1.5 text-slate-200 hover:bg-[#D4AF37] hover:text-[#0A122E] transition-colors whitespace-nowrap">
            Monuments &amp; Finishes
          </a>
          <a href="#investment-programme" className="shrink-0 border border-[#1E3D82]/60 bg-[#1E3D82]/40 px-3.5 py-1.5 text-slate-200 hover:bg-[#D4AF37] hover:text-[#0A122E] transition-colors whitespace-nowrap">
            Investment Programme
          </a>
        </div>
      </div>

      {/* The Park Overview */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading
              eyebrow={parkContent?.aboutPark?.eyebrow || "The park"}
              title={parkContent?.aboutPark?.title || "Thoughtfully designed, professionally maintained"}
              intro={parkContent?.aboutPark?.description || "Our memorial park offers families a serene environment for remembrance while providing a range of burial options to meet different needs and preferences."}
            />
            <p className="mt-5 leading-relaxed text-muted-foreground text-sm">
              {parkContent?.aboutPark?.locationNote ||
                "Spanning over 10 acres near the Lagos–Ogun boundary, the park combines easy accessibility with the quiet beauty of nature. Developed to modern standards and designed to respectfully accommodate families of all faiths and traditions, it features an on-site chapel, professionally constructed vaults, beautifully maintained grounds, solar-powered security cameras, and a safe, guarded environment."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="forest" size="lg">
                <Link to="/contact">Schedule a Grounds Tour</Link>
              </Button>
            </div>
          </div>
          <SafeImage
            src="/images/chapel.jpg"
            alt="Chapel within Garden of Peace Memorial Park"
            context="chapel"
            className="object-cover shadow-soft border border-[#D4AF37]/30"
            loading="lazy"
            width={1200}
            height={900}
          />
        </div>
      </Section>

      {/* Visual Grounds Gallery */}
      <Section tone="cream">
        <SectionHeading
          center
          eyebrow="Park Features"
          title="Designed as a Serene Garden Cemetery"
          intro="Explore the manicured gardens, modern vault architecture, and dedicated sanctuary facilities at Garden of Peace™."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g) => (
            <div
              key={g.title}
              className="group overflow-hidden border border-border bg-card shadow-xs transition-all duration-300 hover:border-[#415825]/50 hover:shadow-md flex flex-col"
            >
              <div className="relative h-52 w-full overflow-hidden bg-[#0A122E]/5">
                <SafeImage
                  src={g.image}
                  alt={g.title}
                  context="park"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground transition-colors group-hover:text-[#415825]">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{g.desc}</p>
                </div>
                <div className="mt-4 flex items-center text-[11px] font-semibold text-[#415825]">
                  <span>Park Amenity Guaranteed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* HIGHLIGHTED FLAGSHIP: Mausoleums & Private Family Estates */}
      <section id="mausoleums-estates" className="bg-[#0A122E] py-20 text-white scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end border-b border-[#1E3D82]/40 pb-8">
            <div className="max-w-2xl">
              <span className="inline-block border-l-2 border-[#D4AF37] bg-[#D4AF37]/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Exclusive Memorial Sanctuaries
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Private Mausoleums &amp; Gated Family Estates
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                For families seeking the pinnacle of permanence, privacy, and architectural distinction. Gated multi-chamber estates ensure your heritage and loved ones remain together in one perpetual sanctuary.
              </p>
            </div>
            <Button asChild variant="gold" size="lg" className="shrink-0">
              <Link to="/contact">Speak with a Family Estate Advisor</Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Card 1: Mausoleums */}
            <div className="group flex flex-col justify-between overflow-hidden border border-[#D4AF37]/40 bg-[#070D1F] shadow-2xl transition-all duration-300 hover:border-[#D4AF37]">
              <div>
                <div className="relative h-64 w-full overflow-hidden">
                  <SafeImage
                    src="/images/tranquil_spaces_2_1778053473712.png"
                    alt="Private Family Mausoleum Architecture"
                    context="mausoleum"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D1F] via-[#070D1F]/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-[#D4AF37] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0A122E]">
                      Private Mausoleums
                    </span>
                    <span className="text-xs font-semibold text-slate-200 bg-[#0A122E]/80 backdrop-blur-sm px-2.5 py-1 border border-[#1E3D82]/50">
                      4 to 8 Chambers
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    A Distinguished Architectural Memorial
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    For families seeking a private and architecturally significant resting place, our custom above-ground and walk-in mausoleums provide an enduring memorial combining permanence, security, and elegance.
                  </p>

                  <div className="mt-6 space-y-2.5 border-t border-[#1E3D82]/40 pt-6 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 bg-[#D4AF37]" />
                      <span>Bespoke Granite &amp; Marble Exterior Cladding</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 bg-[#D4AF37]" />
                      <span>Cast Bronze Memorial Gates &amp; Family Crest Plaque</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 bg-[#D4AF37]" />
                      <span>Dedicated Perpetual Maintenance &amp; 24/7 Security</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0">
                <Button asChild variant="gold" size="lg" className="w-full">
                  <Link to="/contact">Arrange a Mausoleum Consultation</Link>
                </Button>
              </div>
            </div>

            {/* Card 2: Private Family Estates */}
            <div className="group flex flex-col justify-between overflow-hidden border border-[#415825]/60 bg-[#070D1F] shadow-2xl transition-all duration-300 hover:border-[#D4AF37]">
              <div>
                <div className="relative h-64 w-full overflow-hidden">
                  <SafeImage
                    src="/images/memorial_estate_card_1778053361538.png"
                    alt="Gated Private Family Estate Grounds"
                    context="mausoleum"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D1F] via-[#070D1F]/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-[#1E3F20] border border-[#D4AF37]/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      Private Family Estates
                    </span>
                    <span className="text-xs font-semibold text-slate-200 bg-[#0A122E]/80 backdrop-blur-sm px-2.5 py-1 border border-[#1E3D82]/50">
                      6 to 12 Chambers
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Multi-Generational Heritage Sanctuaries
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    A private gated estate with manicured hedge surrounds, stone paving, and personalized entryways ensuring your family rests together with distinction.
                  </p>

                  <div className="mt-6 space-y-2.5 border-t border-[#1E3D82]/40 pt-6 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 bg-[#D4AF37]" />
                      <span>Custom Wrought-Iron Private Gated Perimeter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 bg-[#D4AF37]" />
                      <span>Dedicated Paved Family Gathering Area &amp; Benches</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 bg-[#D4AF37]" />
                      <span>Generational Title with Priority Chamber Expansion</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0">
                <Button asChild variant="pine" size="lg" className="w-full">
                  <Link to="/contact">Reserve a Private Family Estate</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standard Vault Options (Single, Double, Triple) */}
      <Section id="vault-spaces">
        <SectionHeading
          eyebrow="Individual & Companion Vaults"
          title="Chamber Vault Spaces (1–3 Units)"
          intro="Constructed with reinforced concrete and sealed waterproof engineering, our standard vault tiers offer optimal space efficiency, hygiene, and lasting dignity."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {vaults.map((v) => (
            <article
              key={v.title}
              className="group flex flex-col justify-between overflow-hidden border border-border bg-card shadow-xs transition-all duration-300 hover:border-[#415825]/50 hover:shadow-md"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <SafeImage
                    src={v.image}
                    alt={v.title}
                    context="park"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground transition-colors group-hover:text-[#415825]">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{v.body}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button asChild variant="outlineForest" size="sm" className="w-full">
                  <Link to="/estimator">Calculate Pricing for {v.title}</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Monuments & Memorialisation */}
      <Section id="monuments-finishes" tone="cream">
        <SectionHeading
          eyebrow="Monuments & memorialisation"
          title="Personalise a lasting tribute"
          intro="Every life tells a unique story. Our memorialisation options allow families to create a thoughtful and lasting tribute that complements the natural surroundings."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {memorialisation.map(([title, body]) => (
            <InfoCard key={title} title={title}>
              {body}
            </InfoCard>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild variant="forest" size="lg">
            <Link to="/contact">Contact an Advisor to Discuss Memorial Options</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/estimator">Add Headstone &amp; Finishes in Price Estimator</Link>
          </Button>
        </div>
      </Section>

      {/* Real Estate Investment Programme */}
      <Section id="investment-programme">
        <div className="max-w-5xl">
          <SectionHeading
            eyebrow="Real estate investment programme"
            title="Invest in tomorrow's legacy"
            intro="Garden of Peace Memorial Park represents not only thoughtful planning for families but also a unique long-term investment opportunity."
          />
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground text-sm">
            <p>
              Through our Real Estate Investment Programme, eligible investors may purchase selected
              vaults within the memorial park for future resale, subject to our policies and
              applicable regulations.
            </p>
            <p>
              As available burial spaces become increasingly limited and demand continues to grow,
              early purchasers may benefit from long-term appreciation in the value of their
              holdings. While no investment can guarantee future returns, many investors recognise
              the potential value of securing memorial property before it is needed.
            </p>
            <p>
              Our advisors are available to explain how the programme works, eligibility
              requirements and available investment opportunities.
            </p>
          </div>
          <Button asChild variant="pine" size="xl" className="mt-8">
            <Link to="/contact">Book an Investment Consultation</Link>
          </Button>
        </div>
      </Section>

      <CTABand
        title="Ready to learn more?"
        intro="We welcome you to visit Garden of Peace Memorial Park, experience the surroundings firsthand and discuss the solutions that best meet your family's needs."
        primary={{ label: "Schedule a Visit", to: "/contact" }}
      />
    </>
  );
}
