import { createFileRoute, Link } from "@tanstack/react-router";
import hearse from "@/assets/hearse.jpg";
import chapel from "@/assets/chapel.jpg";
import { Button } from "@/components/ui/button";
import { CTABand, PageHero, Section, SectionHeading } from "@/components/site/Sections";

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
      { property: "og:image", content: "/images/og-capetrust.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Funeral Services in Lagos | Capetrust" },
      {
        name: "twitter:description",
        content: "Complete funeral coordination, hearse fleets, burial vaults, and dignified support in Lagos.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

const services = [
  {
    title: "Funeral Planning & Coordination",
    body: "Our experienced team works closely with you to coordinate every aspect of the service, ensuring your loved one's wishes, family traditions and personal preferences are carefully reflected. Whether a simple service or a larger celebration of life, we guide you through every decision.",
    image: "https://images.unsplash.com/photo-1548625361-16eb16ce3998?q=80&w=800&auto=format&fit=crop",
    cta: "Speak with an Advisor",
    href: "/contact",
  },
  {
    title: "Repatriation Services",
    body: "When a loved one passes away from home, arranging transportation across states or international borders can feel overwhelming. We coordinate documentation, transportation logistics and regulatory requirements to ensure a smooth and respectful journey home.",
    image: "/images/diego-lozano-wuCHIyWheSo-unsplash.jpg",
    cta: "Request Repatriation Assistance",
    href: "/contact",
  },
  {
    title: "Burial & Vault Interments",
    body: "From cemetery arrangements and graveside coordination to vault preparation and burial scheduling at Garden of Peace™, we create a seamless experience during an important moment of remembrance.",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
    cta: "Explore Memorial Park",
    href: "/garden-of-peace",
  },
  {
    title: "Chapel & Reception Venue",
    body: "Our private on-site chapel and reception venue provide a welcoming, air-conditioned setting for funeral services, prayer gatherings, memorial receptions, viewing services and intimate family gatherings.",
    image: "/chapel.jpg",
    cta: "Enquire About Availability",
    href: "/contact",
  },
  {
    title: "Reception & Catering Coordination",
    body: "Gathering together after a funeral offers family and friends an opportunity to share memories and celebrate a life well lived. We coordinate reception arrangements and catering tailored to the size and style of your gathering.",
    image: "/images/adrianna-geo-JWlZS708L1Y-unsplash.jpg",
    cta: "Plan Your Reception",
    href: "/contact",
  },
];

const additional = [
  "Professional Pallbearers",
  "Funeral Livestreaming & Recording",
  "Tribute Video Production",
  "Obituary Design & Printing",
  "Memorial Stationery & Booklets",
  "Funeral Coordination & Event Management",
];

import { useCMS } from "@/lib/cms/cms-store";

function Services() {
  const { content } = useCMS();
  const servicesContent = content.services;
  const servicesList = servicesContent?.servicesList || services;
  const hero = servicesContent?.hero;

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow || "Offerings"}
        title={hero?.title || "Services & Memorial Solutions"}
        intro={hero?.intro || "At Capetrust Funeral Services, we provide a comprehensive range of funeral, burial and memorial services designed to support families before, during and after a loss."}
        image={hearse}
      >
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">Speak with an Advisor</Link>
        </Button>
        <Button asChild variant="pine" size="xl">
          <Link to="/memorial-products">View Memorial Products</Link>
        </Button>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Our services"
          title="Professional support at every stage"
          intro="From the first conversation to the final farewell, our services are designed to simplify the planning process while ensuring every detail is managed with care and professionalism."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((s) => (
            <article
              key={s.title}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:border-[#415825]/50 hover:shadow-md"
            >
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <img
                  src={s.image}
                  alt={s.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-serif font-bold text-foreground transition-colors group-hover:text-[#415825]">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
                <div className="mt-6 pt-4 border-t border-border">
                  <Button asChild variant="outlineForest" size="sm">
                    <Link to={s.href}>{s.cta}</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <img
            src={hearse}
            alt="Capetrust premium hearse service"
            className="rounded-2xl object-cover shadow-soft border border-[#D4AF37]/30"
            loading="lazy"
            width={1200}
            height={900}
          />
          <div>
            <SectionHeading
              eyebrow="Transportation & Logistics"
              title="Reliable, dignified funeral transportation"
              intro="Capetrust offers customized hearses for the dignified transportation of your loved one, together with comfortable Hiace family buses that allow relatives and guests to travel together with ease and peace of mind."
            />
            <ul className="mt-6 space-y-2 text-sm text-foreground/80 font-medium">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#415825]" />
                Executive Hearse Rental &amp; Chauffeur
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#415825]" />
                Air-Conditioned Family Hiace Bus Rental
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#415825]" />
                Full Funeral Motorcade &amp; Procession Escort
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Pricing varies depending on distance, destination, duration and any special requirements.
            </p>
            <Button asChild variant="forest" size="lg" className="mt-7">
              <Link to="/contact">Discuss Rental &amp; Logistics Options</Link>
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
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-5 text-sm font-medium shadow-xs transition-all hover:border-[#415825]/40"
            >
              <span className="size-2.5 rounded-full bg-[#415825]" />
              {item}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="forest" size="lg">
            <Link to="/contact">Personalise Your Service</Link>
          </Button>
          <Button asChild variant="pine" size="lg">
            <Link to="/estimator">Calculate Vault Price</Link>
          </Button>
        </div>
      </Section>

      <CTABand
        title="Let us coordinate every detail"
        intro="Our team is available 24/7 for immediate-need assistance and by appointment for planning consultations."
      />
    </>
  );
}
