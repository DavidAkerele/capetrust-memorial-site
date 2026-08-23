import { createFileRoute, Link } from "@tanstack/react-router";
import hearse from "@/assets/hearse.jpg";
import { Button } from "@/components/ui/button";
import { CTABand, InfoCard, PageHero, Section, SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Funeral Services in Lagos | Capetrust Funeral Services" },
      {
        name: "description",
        content:
          "Funeral planning, burial, repatriation, hearse and bus transportation, chapel and reception venue, catering and additional funeral services in Lagos, Nigeria.",
      },
      { property: "og:title", content: "Our Funeral Services | Capetrust" },
      {
        property: "og:description",
        content: "Professional support at every stage, from the first conversation to the final farewell.",
      },
    ],
  }),
});

const services = [
  {
    title: "Funeral Planning",
    body: "Our experienced team works closely with you to coordinate every aspect of the service, ensuring your loved one's wishes, family traditions and personal preferences are carefully reflected. Whether a simple service or a larger celebration of life, we guide you through every decision.",
    cta: "Speak with an Advisor",
    href: "/contact",
  },
  {
    title: "Repatriation Services",
    body: "When a loved one passes away from home, arranging transportation across states or international borders can feel overwhelming. We coordinate documentation, transportation logistics and regulatory requirements to ensure a smooth and respectful journey home.",
    cta: "Request Repatriation Assistance",
    href: "/contact",
  },
  {
    title: "Burial Services",
    body: "From cemetery arrangements and graveside coordination to vault preparation and burial scheduling, we work alongside families to create a seamless experience during an important moment of remembrance.",
    cta: "Explore Our Cemetery",
    href: "/garden-of-peace",
  },
  {
    title: "Chapel & Reception Venue",
    body: "Our private chapel and reception venue provide a welcoming setting for funeral services, prayer gatherings, memorial receptions, viewing services and intimate family gatherings. Availability is subject to advance booking.",
    cta: "Enquire About Availability",
    href: "/contact",
  },
  {
    title: "Reception & Catering",
    body: "Gathering together after a funeral offers family and friends an opportunity to share memories and celebrate a life well lived. We coordinate reception arrangements and catering tailored to the size and style of your gathering.",
    cta: "Plan Your Reception",
    href: "/contact",
  },
];

const additional = [
  "Professional Pallbearers",
  "Funeral Livestreaming",
  "Tribute Video Production",
  "Obituary Design & Printing",
  "Memorial Stationery",
  "Funeral Coordination & Event Management",
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Offerings"
        title="Services & memorial products"
        intro="At Capetrust Funeral Services, we provide a comprehensive range of funeral, burial and memorial services designed to support families before, during and after a loss."
        image={hearse}
      >
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">Speak with an Advisor</Link>
        </Button>
        <Button asChild variant="onDark" size="xl">
          <Link to="/memorial-products">View Memorial Products</Link>
        </Button>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Our services"
          title="Professional support at every stage"
          intro="From the first conversation to the final farewell, our services are designed to simplify the planning process while ensuring every detail is managed with care and professionalism."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <InfoCard key={s.title} title={s.title} cta={s.cta} href={s.href}>
              {s.body}
            </InfoCard>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <img
            src={hearse}
            alt="Capetrust premium hearse service"
            className="rounded-lg object-cover shadow-soft"
            loading="lazy"
            width={1200}
            height={900}
          />
          <div>
            <SectionHeading
              eyebrow="Transportation"
              title="Reliable funeral transportation"
              intro="Capetrust offers well-maintained hearses for the dignified transportation of your loved one, together with comfortable family buses that allow relatives and guests to travel together with ease."
            />
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>· Hearse Rental</li>
              <li>· Family Bus Rental</li>
              <li>· Funeral Procession Coordination</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Pricing varies depending on distance, destination, duration and any special
              requirements.
            </p>
            <Button asChild variant="outlineDark" size="lg" className="mt-7">
              <Link to="/contact">Discuss Rental Options</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Additional funeral services"
          title="Every family has different needs"
          intro="To provide a more complete experience, Capetrust also offers a range of additional services that can be incorporated into your funeral arrangements."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {additional.map((item) => (
            <div key={item} className="rounded-lg border border-border bg-card px-6 py-5 text-sm">
              {item}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          If you require a service not listed, our team will be happy to discuss your requirements.
        </p>
        <Button asChild variant="gold" size="lg" className="mt-6">
          <Link to="/contact">Personalise Your Service</Link>
        </Button>
      </Section>

      <CTABand
        title="Let us coordinate every detail"
        intro="Our team is available 24/7 for immediate-need assistance and by appointment for planning consultations."
      />
    </>
  );
}
