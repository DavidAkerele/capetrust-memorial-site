import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Flame, Heart, Calendar, PlusCircle, ArrowRight } from "lucide-react";
import heroPark from "@/assets/hero-park.jpg";
import { Button } from "@/components/ui/button";
import { PageHero, Section, SectionHeading, CTABand } from "@/components/site/Sections";
import { getStoredObituaries, Obituary } from "@/lib/obituaries-data";

export const Route = createFileRoute("/obituaries/")({
  component: ObituariesIndexPage,
  head: () => ({
    meta: [
      { title: "Obituaries & Memorial Tributes | Capetrust Funeral Services" },
      {
        name: "description",
        content:
          "Honour cherished memories and celebrate the lives of departed loved ones. Search obituaries, light virtual memorial candles, and send condolences.",
      },
      { property: "og:title", content: "Obituaries & Memorial Tributes | Capetrust" },
      {
        property: "og:description",
        content: "A sacred space where cherished lives are honoured and legacies celebrated.",
      },
    ],
  }),
});

function ObituariesIndexPage() {
  const [obituaries, setObituaries] = useState<Obituary[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  useEffect(() => {
    setObituaries(getStoredObituaries());
  }, []);

  const filteredObituaries = obituaries.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.lifeStory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesYear =
      selectedYear === "all" || item.dateOfDeath.includes(selectedYear);

    return matchesSearch && matchesYear;
  });

  return (
    <>
      <PageHero
        eyebrow="Cherished Memories"
        title="Obituaries &amp; Life Stories"
        intro="A sacred space where cherished lives are honoured, beautiful memories are preserved, and families around the world can celebrate legacies of dignity and grace."
        image={heroPark}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="gold" size="xl">
            <Link to="/obituaries/create">Publish a Memorial Tribute</Link>
          </Button>
        </div>
      </PageHero>

      <Section>
        {/* Actions Bar: Search, Year Filters, and Publish Button */}
        <div className="flex flex-col items-stretch justify-between gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, title, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          {/* Filters & CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-border bg-secondary/50 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSelectedYear("all")}
                className={`rounded-full px-3.5 py-1.5 transition-all ${
                  selectedYear === "all"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                All Years
              </button>
              <button
                type="button"
                onClick={() => setSelectedYear("2026")}
                className={`rounded-full px-3.5 py-1.5 transition-all ${
                  selectedYear === "2026"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                2026
              </button>
              <button
                type="button"
                onClick={() => setSelectedYear("2025")}
                className={`rounded-full px-3.5 py-1.5 transition-all ${
                  selectedYear === "2025"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                2025
              </button>
            </div>

            <Button asChild variant="gold" size="lg">
              <Link to="/obituaries/create" className="flex items-center gap-2">
                <PlusCircle className="size-4" />
                Publish Tribute
              </Link>
            </Button>
          </div>
        </div>

        {/* Obituaries Grid */}
        <div className="mt-12">
          {filteredObituaries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-16 text-center">
              <p className="text-base text-muted-foreground">No memorial tributes matched your search criteria.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedYear("all");
                }}
                className="mt-4 text-xs font-bold uppercase tracking-wider text-primary underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredObituaries.map((obituary) => (
                <div
                  key={obituary.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-soft hover:border-gold/50"
                >
                  <div>
                    {/* Portrait Frame */}
                    <div className="relative h-72 w-full overflow-hidden bg-muted">
                      <img
                        src={obituary.featuredImage}
                        alt={obituary.fullName}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
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

                    {/* Card Content */}
                    <div className="p-6">
                      {obituary.title && (
                        <span className="eyebrow text-gold">{obituary.title}</span>
                      )}
                      <h3 className="mt-2 font-serif text-2xl font-bold text-foreground group-hover:text-primary">
                        {obituary.fullName}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="size-3.5 text-primary" />
                        <span>
                          {obituary.dateOfBirth} — {obituary.dateOfDeath}
                        </span>
                      </div>
                      <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-muted-foreground italic">
                        "{obituary.summaryQuote}"
                      </p>
                    </div>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="border-t border-border p-6 pt-4">
                    <Link
                      to="/obituaries/$slug"
                      params={{ slug: obituary.slug }}
                      className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-primary group-hover:text-gold transition-colors"
                    >
                      <span>View Tribute &amp; Condolences</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      <CTABand
        title="Honour your family member with an eternal memorial"
        intro="Our obituary platform allows family and friends worldwide to celebrate legacies, light candles, and share personal condolences."
      />
    </>
  );
}
