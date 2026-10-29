import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  HelpCircle,
  Phone,
  MessageSquare,
  Calculator,
  FileText,
  DollarSign,
  Shield,
  Truck,
  Heart,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CTABand, PageHero, Section, SectionHeading } from "@/components/site/Sections";
import { site } from "@/lib/site";
import { useCMS } from "@/lib/cms/cms-store";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Capetrust Funeral Services & Memorial Park" },
      {
        name: "description",
        content:
          "Answers to common questions about arranging a funeral in Lagos: legal documentation, cemetery vault costs, caskets, religious traditions, repatriation, and day-of-service coordination.",
      },
      { property: "og:title", content: "Frequently Asked Questions | Capetrust" },
      {
        property: "og:description",
        content:
          "Answers to common questions about funerals, cemetery vaults, and services in Lagos.",
      },
      { property: "og:image", content: "/images/og-capetrust.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Funeral FAQs | Capetrust Funeral Services" },
      {
        name: "twitter:description",
        content:
          "Answers to common questions regarding funerals, cemetery vaults, and burial logistics in Lagos.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

const categoryIcons: Record<string, typeof HelpCircle> = {
  General: Heart,
  "Garden of Peace": Shield,
  "Services & Planning": Truck,
  "Pricing & Payment": DollarSign,
  Obituaries: FileText,
};

function FAQ() {
  const { content } = useCMS();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const faqData = useMemo(
    () =>
      content.faq.categories
        .map((category) => ({
          category,
          icon: categoryIcons[category] || HelpCircle,
          items: content.faq.faqs
            .filter((item) => item.category === category)
            .map((item) => ({ q: item.question, a: item.answer.split(/\n\s*\n/).filter(Boolean) })),
        }))
        .filter((category) => category.items.length > 0),
    [content.faq],
  );
  const categories = ["All", ...faqData.map((c) => c.category)];

  const filteredData = useMemo(() => {
    return faqData
      .map((cat) => {
        if (selectedCategory !== "All" && cat.category !== selectedCategory) {
          return null;
        }

        const filteredItems = cat.items.filter((item) => {
          const matchQuery =
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.some((ans) => ans.toLowerCase().includes(searchQuery.toLowerCase()));
          return matchQuery;
        });

        if (filteredItems.length === 0) return null;

        return {
          ...cat,
          items: filteredItems,
        };
      })
      .filter(Boolean) as typeof faqData;
  }, [faqData, searchQuery, selectedCategory]);

  return (
    <>
      <PageHero
        eyebrow={content.faq.hero.eyebrow}
        title={content.faq.hero.title}
        intro={content.faq.hero.intro}
        image="/images/flow-banner.jpg"
      >
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">Speak with an Advisor</Link>
        </Button>
        <Button asChild variant="pine" size="xl">
          <Link to="/estimator">Launch Price Estimator</Link>
        </Button>
      </PageHero>

      <Section>
        {/* Search & Category Filter Header */}
        <div className="w-full space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <SectionHeading
                eyebrow="Knowledge Base"
                title="Browse Answers by Topic"
                intro="Type a question or select a category below to quickly find the information you need."
              />
            </div>
            {/* Search Box */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search questions or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl bg-background border-border text-sm shadow-xs focus:border-[#415825]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Chips - Responsive swipe on mobile */}
          <div className="flex items-center gap-2 pt-2 border-b border-border pb-4 overflow-x-auto no-scrollbar sm:flex-wrap">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-xs px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-[#1E3F20] text-white shadow-sm border-l-2 border-[#D4AF37]"
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordions & Side Help Card */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {/* Main Accordion Column */}
          <div className="lg:col-span-8 space-y-10">
            {filteredData.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <HelpCircle className="mx-auto size-12 text-muted-foreground/40" />
                <h3 className="mt-4 font-serif text-2xl font-bold text-foreground">
                  No answers found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  We couldn't find any questions matching "{searchQuery}". Try a different search
                  term or contact our advisors directly.
                </p>
                <Button
                  type="button"
                  variant="forest"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-6"
                >
                  Reset Search
                </Button>
              </div>
            ) : (
              filteredData.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.category} className="space-y-4">
                    <div className="flex items-center gap-2.5 border-b border-border pb-3">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-[#415825]/10 text-[#415825]">
                        <Icon className="size-4" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-foreground">
                        {cat.category}
                      </h3>
                    </div>

                    <Accordion type="multiple" className="w-full space-y-3">
                      {cat.items.map((item, idx) => (
                        <AccordionItem
                          key={item.q}
                          value={`${cat.category}-${idx}`}
                          className="rounded-xl border border-border bg-card px-5 shadow-xs transition-all data-[state=open]:border-[#415825]/50 data-[state=open]:shadow-sm hover:border-[#415825]/30"
                        >
                          <AccordionTrigger className="py-4 text-left font-serif text-base sm:text-lg font-semibold text-foreground hover:text-[#415825] hover:no-underline">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground space-y-2 border-t border-border/50">
                            {item.a.map((paragraph, pIdx) => (
                              <p key={pIdx}>{paragraph}</p>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Help Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Direct Advisor Assistance Card */}
              <div className="rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#0E0E44] via-[#1E3D82] to-[#1E3F20] p-6 sm:p-8 text-white shadow-soft">
                <span className="inline-block rounded-xs bg-[#D4AF37]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold border-l-2 border-[#D4AF37]">
                  24/7 Support
                </span>
                <h3 className="mt-3 font-serif text-2xl font-bold text-white">
                  Have a specific question?
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/85">
                  Our compassionate advisors are available around the clock to guide your family
                  through immediate arrangements, vault selection, and price estimates.
                </p>

                <div className="mt-6 space-y-3">
                  <Button asChild variant="gold" size="lg" className="w-full">
                    <a
                      href={content.settings.phoneHref || site.phoneHref}
                      className="flex items-center justify-center gap-2"
                    >
                      <Phone className="size-4" />
                      Call {content.settings.phone || site.phone}
                    </a>
                  </Button>
                  <Button asChild variant="onDark" size="lg" className="w-full">
                    <a
                      href={content.settings.whatsapp || site.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="size-4" />
                      WhatsApp Our Team
                    </a>
                  </Button>
                </div>
              </div>

              {/* Price Estimator Tool Link Card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#415825] font-bold text-sm">
                  <Calculator className="size-4 text-[#415825]" />
                  <span>Interactive Pricing Tool</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-foreground">
                  Estimate Your Vault Cost
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Calculate the exact live price for Single, Double, or Triple unit vaults and
                  mandatory surface finishes in real time.
                </p>
                <Button asChild variant="outlineForest" size="sm" className="w-full mt-2">
                  <Link to="/estimator">Open Live Price Estimator</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="We are here to answer every question"
        intro="Whether you are facing an immediate loss or thoughtfully planning for future generations, speak with our dedicated team today."
      />
    </>
  );
}
