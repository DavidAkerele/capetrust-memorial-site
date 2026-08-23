import { createFileRoute, Link } from "@tanstack/react-router";
import flowers from "@/assets/flowers.jpg";
import { Button } from "@/components/ui/button";
import { CTABand, PageHero, Section, SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/memorial-products")({
  component: MemorialProducts,
  head: () => ({
    meta: [
      { title: "Memorial Products | Funeral Stationery, Caskets & Tributes | Capetrust" },
      {
        name: "description",
        content:
          "Capetrust memorial products: funeral stationery, caskets, floral tributes, keepsakes and memorial accessories joining our collection.",
      },
      { property: "og:title", content: "Memorial Products | Capetrust Funeral Services" },
      {
        property: "og:description",
        content: "Quality, thoughtful design and lasting craftsmanship for a meaningful farewell.",
      },
      { property: "og:image", content: "/images/og-capetrust.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Memorial Products | Capetrust" },
      {
        name: "twitter:description",
        content: "Premium caskets, headstones, and memorial keepsakes in Lagos.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

const upcoming = [
  {
    title: "Coffins & Caskets",
    body: "A carefully curated range of coffins and caskets in various materials, finishes and styles, both made in Nigeria and imported. Detailed specifications and product catalogues will be available upon launch.",
    items: [],
  },
  {
    title: "Floral Tributes",
    body: "Flowers offer a timeless expression of remembrance and appreciation.",
    items: [
      "Funeral Wreaths",
      "Standing Floral Arrangements",
      "Casket Sprays",
      "Sympathy Bouquets",
      "Custom Floral Tributes",
    ],
  },
  {
    title: "Memorial Keepsakes",
    body: "Some memories deserve to be held close. Thoughtfully selected items that allow families to preserve meaningful memories for generations.",
    items: ["Decorative Urns", "Memorial Keepsakes", "Personalised Tribute Items"],
  },
  {
    title: "Memorial Accessories",
    body: "Every detail contributes to a meaningful farewell.",
    items: [
      "Casket Ornaments",
      "Religious Symbols",
      "Name Plates",
      "Decorative Memorial Pieces",
      "Personal Tribute Accessories",
    ],
  },
];

function MemorialProducts() {
  return (
    <>
      <PageHero
        eyebrow="Offerings"
        title="Memorial products"
        intro="Alongside our professional funeral services, Capetrust offers a growing collection of memorial products designed to help families honour their loved ones with quality, thoughtful design and lasting craftsmanship."
        image={flowers}
      />

      <Section>
        <SectionHeading eyebrow="Available now" title="Funeral stationery" intro="Beautifully designed stationery helps families communicate, honour and remember." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Memorial Cards",
            "Order of Service Booklets",
            "Guest Registers",
            "Thank You Cards",
            "Funeral Programmes",
          ].map((item) => (
            <div key={item} className="rounded-lg border border-border bg-card px-6 py-5 text-sm">
              {item}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Professionally designed and customised to reflect each family's preferences.
        </p>
        <Button asChild variant="gold" size="lg" className="mt-6">
          <Link to="/contact">Request Funeral Stationery</Link>
        </Button>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="Expanding our collection"
          title="More ways to honour a life"
          intro="While some products are available today, we're continuing to expand our collection to better serve families."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {upcoming.map((p) => (
            <article key={p.title} className="rounded-lg border border-border bg-card p-7 shadow-soft">
              <h3 className="text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              {p.items.length > 0 && (
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {p.items.map((i) => (
                    <li key={i}>· {i}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            center
            eyebrow="Looking ahead"
            title="A complete funeral and memorial experience"
            intro="As our services continue to expand, so too will our range of memorial products, ensuring families can arrange every aspect of a funeral with confidence, convenience and professional guidance."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="xl">
              <Link to="/contact">Contact an Advisor</Link>
            </Button>
            <Button asChild variant="outlineDark" size="xl">
              <Link to="/contact">Request Product Updates</Link>
            </Button>
          </div>
        </div>
      </Section>

      <CTABand title="Have a question about our products?" intro="Our team is happy to talk through the options available to your family." />
    </>
  );
}
