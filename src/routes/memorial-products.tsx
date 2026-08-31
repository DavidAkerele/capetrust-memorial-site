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

const collections = [
  {
    title: "Coffins & Caskets",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    body: "A carefully curated range of coffins and caskets in solid hardwood, bronze, brushed steel, and bespoke finishes, both crafted in Nigeria and imported to international standards.",
    items: ["Solid Mahogany & Oak Caskets", "Executive Metal & Bronze Caskets", "Eco-Friendly Wood Coffins", "Custom Interior Upholstery"],
  },
  {
    title: "Floral Tributes & Wreaths",
    image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=800&auto=format&fit=crop",
    body: "Flowers offer a timeless, elegant expression of remembrance, celebration, and gratitude for a cherished life.",
    items: [
      "Custom Funeral Wreaths",
      "Standing Floral Sympathy Sprays",
      "Casket Full & Half Sprays",
      "Church Altar Arrangements",
      "Condolence Bouquets",
    ],
  },
  {
    title: "Memorial Keepsakes & Urns",
    image: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=800&auto=format&fit=crop",
    body: "Some memories deserve to be held close. Thoughtfully selected items that allow families to preserve meaningful memories for generations.",
    items: ["Handcrafted Decorative Urns", "Memorial Keepsake Plaques", "Engraved Memory Boxes", "Personalised Tribute Frames"],
  },
  {
    title: "Headstones & Memorial Accessories",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop",
    body: "Every detail contributes to a dignified farewell, from solid granite headstone engravings to brass accents.",
    items: [
      "Polished Black & Grey Granite Headstones",
      "Custom Engraved Epitaph Plaques",
      "Brass Casket Ornaments & Crux",
      "Evergreen Artificial Turf & Flower Bed Finishes",
    ],
  },
];

import { useCMS } from "@/lib/cms/cms-store";

function MemorialProducts() {
  const { content } = useCMS();
  const productsContent = content.memorialProducts;
  const productCollections = productsContent?.collections || collections;
  const hero = productsContent?.hero;

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow || "Offerings"}
        title={hero?.title || "Memorial Products & Craftsmanship"}
        intro={hero?.intro || "Alongside our professional funeral services, Capetrust offers a growing collection of memorial products designed to help families honour their loved ones with quality, thoughtful design and lasting craftsmanship."}
        image={flowers}
      >
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">Speak with an Advisor</Link>
        </Button>
        <Button asChild variant="pine" size="xl">
          <Link to="/estimator">Calculate Vault &amp; Finish Price</Link>
        </Button>
      </PageHero>

      {/* Funeral Stationery */}
      <Section>
        <SectionHeading
          eyebrow="Available now"
          title="Bespoke Funeral Stationery"
          intro="Beautifully designed stationery helps families communicate service schedules, honour biographies, and create lasting keepsakes."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Order of Service Booklets",
            "Biography & Life Celebration Brochures",
            "Memorial Service Keepsake Cards",
            "Condolence Guest Attendance Registers",
            "Personalized Thank You Cards",
            "Framed Memorial Portrait Enlargements",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-5 text-sm font-medium shadow-xs transition-all hover:border-[#415825]/50"
            >
              <span className="size-2.5 rounded-full bg-[#415825]" />
              {item}
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Professionally designed, proofed, and printed on luxury textured paper stock to reflect each family's preferences.
        </p>
        <Button asChild variant="forest" size="lg" className="mt-6">
          <Link to="/contact">Request Funeral Stationery Samples</Link>
        </Button>
      </Section>

      {/* Product Collections Grid */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Curated collection"
          title="Dignified Products for Every Tribute"
          intro="Explore our quality selection of caskets, floral arrangements, and permanent memorial accessories."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {productCollections.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:border-[#415825]/50 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-[#1E3F20]/90 px-3.5 py-1 text-xs font-bold text-white border border-[#D4AF37]/30 backdrop-blur-xs">
                    Capetrust Memorial
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-2xl font-bold text-foreground transition-colors group-hover:text-[#415825]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
                  {p.items.length > 0 && (
                    <ul className="mt-5 space-y-2 text-xs text-foreground/80 font-medium">
                      {p.items.map((i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-[#415825]" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="p-7 pt-0">
                <Button asChild variant="outlineForest" size="sm" className="w-full">
                  <Link to="/contact">Enquire About {p.title}</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            center
            eyebrow="Looking ahead"
            title="A Complete Funeral and Memorial Experience"
            intro="As our services continue to expand, so too will our range of memorial products, ensuring families can arrange every aspect of a funeral with confidence, convenience and professional guidance."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="forest" size="xl">
              <Link to="/contact">Speak with an Advisor</Link>
            </Button>
            <Button asChild variant="pine" size="xl">
              <Link to="/estimator">Estimate Cemetery Vaults</Link>
            </Button>
          </div>
        </div>
      </Section>

      <CTABand
        title="Have a question about our memorial products?"
        intro="Our team is happy to discuss specifications, catalogues, and bespoke customizations available for your family."
      />
    </>
  );
}
