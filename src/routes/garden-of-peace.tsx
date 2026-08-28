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
    title: "Manicured Memorial Lawns",
    desc: "Landscaped by horticulturists for eternal serenity",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "On-Site Chapel Sanctuary",
    desc: "A peaceful hall for memorial prayers and services",
    image: "/chapel.jpg",
  },
  {
    title: "Private Family Sanctuaries",
    desc: "Gated multi-generational mausoleums and estates",
    image: "https://images.unsplash.com/photo-1548625361-16eb16ce3998?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Solar-Powered Security & 24/7 Care",
    desc: "Continuous surveillance and dedicated personnel",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?q=80&w=800&auto=format&fit=crop",
  },
];

function GardenOfPeace() {
  return (
    <>
      <PageHero
        eyebrow="Garden of Peace™ Memorial Park"
        title="A Place of Lasting Remembrance"
        intro="Tucked away in Odo-Ayandelu (opposite Government Estate, Agbowa, Lagos), Garden of Peace Memorial Park is more than a cemetery: it is a garden sanctuary where lives are honoured, memories are preserved, and generations can return to reflect."
        image={heroPark}
      >
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">Speak with an Advisor</Link>
        </Button>
        <Button asChild variant="pine" size="xl">
          <Link to="/estimator">Calculate Vault Price</Link>
        </Button>
      </PageHero>

      {/* The Park Overview */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading
              eyebrow="The park"
              title="Thoughtfully designed, professionally maintained"
              intro="Our memorial park offers families a serene environment for remembrance while providing a range of burial options to meet different needs and preferences."
            />
            <p className="mt-5 leading-relaxed text-muted-foreground text-sm">
              Spanning over 10 acres near the Lagos–Ogun boundary, the park combines easy
              accessibility with the quiet beauty of nature. Developed to modern standards and
              designed to respectfully accommodate families of all faiths and traditions, it
              features an on-site chapel, professionally constructed vaults, beautifully maintained
              grounds, solar-powered security cameras, and a safe, guarded environment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="forest" size="lg">
                <Link to="/contact">Schedule a Grounds Tour</Link>
              </Button>
            </div>
          </div>
          <img
            src={chapel}
            alt="Chapel within Garden of Peace Memorial Park"
            className="rounded-2xl object-cover shadow-soft border border-[#D4AF37]/30"
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
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((g) => (
            <div
              key={g.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-[#415825]/50 hover:shadow-md"
            >
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <img
                  src={g.image}
                  alt={g.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-foreground transition-colors group-hover:text-[#415825]">
                  {g.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Vault Options */}
      <Section>
        <SectionHeading
          eyebrow="Vault options"
          title="Burial spaces designed for every family"
          intro="Every family has unique needs. Our range of vault options allows you to choose a resting place that reflects your wishes today while preserving space for tomorrow."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {vaults.map((v) => (
            <article
              key={v.title}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:border-[#415825]/50 hover:shadow-md"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <img
                    src={v.image}
                    alt={v.title}
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
                  <Link to="/contact">Enquire About This Option</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Monuments & Memorialisation */}
      <Section tone="cream">
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
        <Button asChild variant="forest" size="lg" className="mt-10">
          <Link to="/contact">Contact an Advisor to Discuss Memorial Options</Link>
        </Button>
      </Section>

      {/* Mausoleums & Private Estates */}
      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-8 shadow-soft transition-all hover:border-[#415825]/40">
            <span className="inline-block rounded-full bg-[#415825]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#415825]">
              Mausoleums
            </span>
            <h2 className="mt-3 text-3xl font-serif">A distinguished memorial</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground text-sm">
              For families seeking a private and architecturally significant resting place, our
              mausoleums provide an enduring memorial that combines permanence, privacy and
              elegance. Available in a range of configurations for individual or family
              requirements.
            </p>
            <Button asChild variant="outlineForest" size="lg" className="mt-6">
              <Link to="/contact">Arrange a Consultation</Link>
            </Button>
          </div>
          <div className="rounded-xl border border-border bg-card p-8 shadow-soft transition-all hover:border-[#415825]/40">
            <span className="inline-block rounded-full bg-[#415825]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#415825]">
              Private family estates
            </span>
            <h2 className="mt-3 text-3xl font-serif">Create a legacy for generations</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground text-sm">
              A Private Estate is a dedicated family memorial designed to serve future generations.
              By reserving a private section within Garden of Peace, families gain the reassurance
              of knowing loved ones can remain together in one carefully maintained location.
            </p>
            <Button asChild variant="forest" size="lg" className="mt-6">
              <Link to="/contact">Speak with an Estate Advisor</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Real Estate Investment Programme */}
      <Section tone="cream">
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
