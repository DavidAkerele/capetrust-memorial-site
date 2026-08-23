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
    body: "Designed for one individual, the Single Unit Vault offers a private and permanent burial space within Garden of Peace Memorial Park. An ideal choice for families seeking a well-maintained resting place preserved for generations.",
  },
  {
    title: "Double Unit Vault",
    body: "The Double Unit Vault accommodates two interments, making it suitable for couples or close family members who wish to rest together. It provides both practicality and the reassurance of planning ahead.",
  },
  {
    title: "Triple Unit Vault",
    body: "Designed for families who wish to reserve additional space within a shared location, offering greater flexibility while ensuring loved ones remain together in a dedicated family area.",
  },
];

const memorialisation: [string, string][] = [
  ["Headstones", "Professionally crafted headstones designed to honour each individual with elegance and permanence."],
  ["Pebblestone Finish", "A decorative pebblestone surround that provides a refined, low-maintenance finish while enhancing the memorial space."],
  ["Artificial Flower Bed Finish", "A beautifully arranged memorial flower bed designed to provide year-round presentation with minimal upkeep."],
  ["Memorial Street Naming", "Commemorate a loved one through the naming of selected streets within the memorial park, creating a tribute remembered for generations."],
  ["Memorial Wall Recognition", "Dedicated spaces for commemorative plaques, family recognition and carefully approved memorial displays."],
];

function GardenOfPeace() {
  return (
    <>
      <PageHero
        eyebrow="Garden of Peace™ Memorial Park"
        title="A place of lasting remembrance"
        intro="Tucked away in Odo-Ayandelu, Agbowa, Lagos, Garden of Peace Memorial Park is more than a cemetery: it is a place where lives are honoured, memories are preserved, and generations can return to reflect."
        image={heroPark}
      >
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">Speak with an Advisor</Link>
        </Button>
        <Button asChild variant="onDark" size="xl">
          <Link to="/contact">Book a Cemetery Tour</Link>
        </Button>
      </PageHero>

      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading
              eyebrow="The park"
              title="Thoughtfully designed, professionally maintained"
              intro="Our memorial park offers families a serene environment for remembrance while providing a range of burial options to meet different needs and preferences."
            />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Spanning over 10 acres near the Lagos–Ogun boundary, the park combines easy
              accessibility with the quiet beauty of nature. Developed to modern standards and
              designed to respectfully accommodate families of all faiths and traditions, it
              features an on-site chapel, professionally constructed vaults, beautifully maintained
              grounds and a secure environment.
            </p>
          </div>
          <img
            src={chapel}
            alt="Chapel within Garden of Peace Memorial Park"
            className="rounded-lg object-cover shadow-soft"
            loading="lazy"
            width={1200}
            height={900}
          />
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="Vault options"
          title="Burial spaces designed for every family"
          intro="Every family has unique needs. Our range of vault options allows you to choose a resting place that reflects your wishes today while preserving space for tomorrow."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {vaults.map((v) => (
            <InfoCard key={v.title} title={v.title} cta="Enquire About This Option">
              {v.body}
            </InfoCard>
          ))}
        </div>
      </Section>

      <Section>
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
        <Button asChild variant="outlineDark" size="lg" className="mt-10">
          <Link to="/contact">Contact an Advisor to Discuss Memorial Options</Link>
        </Button>
      </Section>

      <Section tone="cream">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-8 shadow-soft">
            <p className="eyebrow text-gold">Mausoleums</p>
            <h2 className="mt-3 text-3xl">A distinguished memorial</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              For families seeking a private and architecturally significant resting place, our
              mausoleums provide an enduring memorial that combines permanence, privacy and
              elegance. Available in a range of configurations for individual or family
              requirements.
            </p>
            <Button asChild variant="outlineDark" size="lg" className="mt-6">
              <Link to="/contact">Arrange a Consultation</Link>
            </Button>
          </div>
          <div className="rounded-lg border border-border bg-card p-8 shadow-soft">
            <p className="eyebrow text-gold">Private family estates</p>
            <h2 className="mt-3 text-3xl">Create a legacy for generations</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              A Private Estate is a dedicated family memorial designed to serve future generations.
              By reserving a private section within Garden of Peace, families gain the reassurance
              of knowing loved ones can remain together in one carefully maintained location. Our
              team will guide you through available options, layouts and long-term planning.
            </p>
            <Button asChild variant="outlineDark" size="lg" className="mt-6">
              <Link to="/contact">Speak with an Estate Advisor</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Real estate investment programme"
            title="Invest in tomorrow's legacy"
            intro="Garden of Peace Memorial Park represents not only thoughtful planning for families but also a unique long-term investment opportunity."
          />
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
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
          <Button asChild variant="gold" size="xl" className="mt-8">
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
