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
        content: "Answers to common questions about funerals, cemetery vaults, and services in Lagos.",
      },
      { property: "og:image", content: "/images/og-capetrust.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Funeral FAQs | Capetrust Funeral Services" },
      {
        name: "twitter:description",
        content: "Answers to common questions regarding funerals, cemetery vaults, and burial logistics in Lagos.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

type QA = { q: string; a: string[]; category: string };

const faqData: { category: string; icon: any; items: { q: string; a: string[] }[] }[] = [
  {
    category: "Immediate Need & General",
    icon: Heart,
    items: [
      {
        q: "What happens immediately after I contact Capetrust following a death?",
        a: [
          "1. Reach us anytime, 24/7, via phone call (+234 802 6666 655) or WhatsApp.",
          "2. Pickup & Transfer — our professional team collects your loved one and transfers them to a certified mortuary facility.",
          "3. Documentation & Planning — you provide the Medical Certificate of Cause of Death, and our dedicated advisor sits with your family to plan a service tailored to your traditions.",
          "4. Confirmation & Preparation — we finalise caskets, vault reservations, floral tributes, and order of service printing.",
          "5. Day of Burial — seamless execution, hearse motorcade, and dignified interment ceremony at Garden of Peace™.",
        ],
      },
      {
        q: "How quickly can Capetrust respond when a passing occurs?",
        a: [
          "Our emergency response team is on standby 24 hours a day, 7 days a week across Lagos and Ogun states. We dispatch recovery transport immediately upon receipt of notice.",
        ],
      },
    ],
  },
  {
    category: "Cost & Payment",
    icon: DollarSign,
    items: [
      {
        q: "How much does a funeral and cemetery vault cost with Capetrust?",
        a: [
          "Vault options start from ₦4,000,000 for Single Units (with promotional pre-need rates from ₦2,000,000), ₦7,000,000 for Double Units, and ₦9,800,000 for Triple Tier chambers. Mandatory sealed top slabs start at ₦150,000.",
          "You can generate an itemized estimate instantly on our website using our Transparent Price Estimator.",
        ],
      },
      {
        q: "Can I pre-plan and pay in installments for future peace of mind?",
        a: [
          "Yes. Pre-planning allows families to secure prime cemetery locations, lock in current prices against future inflation, and take advantage of 0% interest flexible installment payment plans.",
        ],
      },
      {
        q: "What statutory fees or optional additions apply?",
        a: [
          "• Local Government (LGA) Burial Documentation: ₦20,000 per burial",
          "• Chamber Re-opening Preparation Deposit: ₦300,000 per instance",
          "• Custom Single Headstone: ₦200,000 | Double Headstone: ₦350,000",
          "• Memorial Street Naming inside Garden of Peace™: ₦600,000",
        ],
      },
    ],
  },
  {
    category: "Cemetery & Vaults",
    icon: Shield,
    items: [
      {
        q: "Where is Garden of Peace™ Memorial Park located?",
        a: [
          "Garden of Peace™ is located at Odo-Ayandelu (opposite Government Estate, Agbowa, Lagos State). It spans over 10 acres of secure, beautifully landscaped grounds designed by horticulturists.",
        ],
      },
      {
        q: "What vault chamber configurations are available?",
        a: [
          "• Single Unit Vault: Designed for 1 individual with lifetime structural concrete integrity.",
          "• Double Unit Vault: Accommodates 2 interments within a unified structure.",
          "• Triple Unit Vault: Three-tiered chamber configuration for space efficiency.",
          "• Private Mausoleums & Gated Family Sanctuaries: Multi-chamber estates (4, 6, 8, or 12 units) with private ornamental gates and bespoke family crests.",
        ],
      },
      {
        q: "How is the cemetery secured and maintained over the years?",
        a: [
          "Garden of Peace™ features permanent concrete vault construction, solar-powered CCTV surveillance cameras, 24/7 on-site security personnel, clean paved walkways, and perpetual horticultural maintenance included with every vault.",
        ],
      },
    ],
  },
  {
    category: "Documentation & Legal",
    icon: FileText,
    items: [
      {
        q: "What documents do I need to provide for burial arrangements?",
        a: [
          "You will need to provide the Medical Certificate of Cause of Death issued by the attending hospital doctor. Once provided, our administrative team handles registrar filings, LGA burial permits, and official cemetery certification.",
          "If the passing was sudden or unattended, an autopsy may be required first. Our team provides complete procedural guidance.",
        ],
      },
    ],
  },
  {
    category: "Transport & Repatriation",
    icon: Truck,
    items: [
      {
        q: "Can you transport a loved one for burial outside Lagos State?",
        a: [
          "Yes. We coordinate interstate transportation across Nigeria with executive hearses, fully air-conditioned Hiace family support buses, and interstate transit permits.",
        ],
      },
      {
        q: "Do you handle international repatriation into or out of Nigeria?",
        a: [
          "Yes. We manage international embassy clearance, airline cargo documentation, zinc-lined hermetic shipping caskets, and customs clearance for arrivals and departures.",
        ],
      },
    ],
  },
  {
    category: "Religious & Cultural Practices",
    icon: Sparkles,
    items: [
      {
        q: "Do you accommodate different religious and cultural customs?",
        a: [
          "Yes. We respectfully accommodate Islamic rapid burials (including same-day interment), Christian denominational liturgies (Catholic, Anglican, Methodist, Evangelical), and traditional family customs.",
        ],
      },
      {
        q: "Can we use the on-site chapel for memorial services and receptions?",
        a: [
          "Yes. Garden of Peace™ features a private, air-conditioned on-site chapel and reception garden for prayers, viewings, and family gatherings.",
        ],
      },
    ],
  },
];

function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <PageHero
        eyebrow="Help &amp; Guidance"
        title="Frequently Asked Questions"
        intro="Clear, transparent answers regarding funeral planning, cemetery vault reservations, documentation, costs, and memorial care in Lagos."
        image="https://images.unsplash.com/photo-1548625361-16eb16ce3998?q=80&w=1920&auto=format&fit=crop"
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

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-b border-border pb-6 overflow-x-auto">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-[#1E3F20] text-white shadow-sm border border-[#D4AF37]/40"
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
                <h3 className="mt-4 font-serif text-2xl font-bold text-foreground">No answers found</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  We couldn't find any questions matching "{searchQuery}". Try a different search term or contact our advisors directly.
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
                      <h3 className="font-serif text-xl font-bold text-foreground">{cat.category}</h3>
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
                <span className="inline-block rounded-full bg-[#D4AF37]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold border border-gold/30">
                  24/7 Support
                </span>
                <h3 className="mt-3 font-serif text-2xl font-bold text-white">Have a specific question?</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/85">
                  Our compassionate advisors are available around the clock to guide your family through immediate arrangements, vault selection, and price estimates.
                </p>

                <div className="mt-6 space-y-3">
                  <Button asChild variant="gold" size="lg" className="w-full">
                    <a href={site.phoneHref} className="flex items-center justify-center gap-2">
                      <Phone className="size-4" />
                      Call {site.phone}
                    </a>
                  </Button>
                  <Button asChild variant="onDark" size="lg" className="w-full">
                    <a
                      href={site.whatsapp}
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
                <h4 className="font-serif text-lg font-bold text-foreground">Estimate Your Vault Cost</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Calculate the exact live price for Single, Double, or Triple unit vaults and mandatory surface finishes in real time.
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
