import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Flame,
  Heart,
  Calendar,
  MapPin,
  Clock,
  Share2,
  Check,
  ArrowLeft,
  Sparkles,
  Send,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand } from "@/components/site/Sections";
import {
  getStoredObituaries,
  getObituaryBySlug,
  addCondolence,
  incrementCandle,
  Obituary,
  INITIAL_OBITUARIES,
} from "@/lib/obituaries-data";

export const Route = createFileRoute("/obituaries/$slug")({
  component: SingleObituaryPage,
  head: () => ({
    meta: [
      { title: "Memorial Tribute & Life Celebration | Capetrust" },
      {
        name: "description",
        content: "Celebrating an iconic life with honor, dignity, and lasting remembrance.",
      },
    ],
  }),
});

function SingleObituaryPage() {
  const { slug } = useParams({ from: "/obituaries/$slug" });

  const [obituary, setObituary] = useState<Obituary | null>(null);
  const [candles, setCandles] = useState<number>(0);
  const [hasLitCandle, setHasLitCandle] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // New Condolence Form State
  const [authorName, setAuthorName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [message, setMessage] = useState("");
  const [submittingCondolence, setSubmittingCondolence] = useState(false);
  const [submittedCondolenceSuccess, setSubmittedCondolenceSuccess] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const found =
      getObituaryBySlug(slug) ||
      INITIAL_OBITUARIES.find((o) => o.slug === slug);
    if (found) {
      setObituary(found);
      setCandles(found.candlesCount || 0);
    }
  }, [slug]);

  if (!obituary) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-foreground">Memorial Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The memorial tribute you are looking for may have moved or does not exist.
        </p>
        <div className="mt-6">
          <Button asChild variant="gold" size="lg">
            <Link to="/obituaries" className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Return to Obituaries
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleLightCandle = () => {
    if (!slug) return;
    const newCount = incrementCandle(slug);
    setCandles(newCount);
    setHasLitCandle(true);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleCondolenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim() || !slug) return;

    setSubmittingCondolence(true);
    setTimeout(() => {
      const updated = addCondolence(slug, {
        name: authorName.trim(),
        relationship: relationship.trim() || "Family Friend",
        message: message.trim(),
      });

      if (updated) {
        setObituary(updated);
      }
      setAuthorName("");
      setRelationship("");
      setMessage("");
      setSubmittingCondolence(false);
      setSubmittedCondolenceSuccess(true);
      setTimeout(() => setSubmittedCondolenceSuccess(false), 4000);
    }, 400);
  };

  return (
    <>
      {/* Memorial Hero & Portrait */}
      <section className="relative bg-primary py-16 text-primary-foreground">
        <div className="container-page">
          <Link
            to="/obituaries"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold hover:underline"
          >
            <ArrowLeft className="size-3.5" />
            Back to Obituaries
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Portrait Frame */}
            <div className="lg:col-span-4">
              <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border-4 border-gold/40 shadow-soft bg-black/20">
                <img
                  src={obituary.featuredImage}
                  alt={obituary.fullName}
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-black/75 p-3 text-center backdrop-blur">
                  <span className="text-xs font-medium text-gold">Aged {obituary.age} Years</span>
                  <p className="mt-0.5 text-[11px] text-white/80">
                    {obituary.dateOfBirth} — {obituary.dateOfDeath}
                  </p>
                </div>
              </div>
            </div>

            {/* Info and Quotes */}
            <div className="space-y-5 lg:col-span-8">
              {obituary.title && (
                <span className="eyebrow inline-block rounded-full bg-gold/15 px-3 py-1 text-gold">
                  {obituary.title}
                </span>
              )}
              <h1 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
                {obituary.fullName}
              </h1>

              <blockquote className="border-l-2 border-gold pl-4 text-base italic leading-relaxed text-primary-foreground/90 sm:text-lg">
                "{obituary.summaryQuote}"
              </blockquote>

              {/* Interaction Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleLightCandle}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                    hasLitCandle
                      ? "bg-gold text-primary font-bold"
                      : "bg-background text-foreground hover:bg-gold hover:text-primary"
                  }`}
                >
                  <Flame className={`size-4 ${hasLitCandle ? "fill-primary text-primary" : "text-gold fill-gold"}`} />
                  <span>{hasLitCandle ? "Candle Lit" : "Light a Candle"} ({candles})</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-3 text-xs font-semibold text-primary-foreground hover:bg-primary-foreground/20 transition-all"
                >
                  {copiedLink ? <Check className="size-4 text-green-400" /> : <Share2 className="size-4" />}
                  <span>{copiedLink ? "Link Copied!" : "Share Tribute"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Biography & Gallery */}
          <div className="space-y-12 lg:col-span-7">
            {/* Biography */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <span className="eyebrow text-gold">Celebration of Life</span>
              <h2 className="mt-2 font-serif text-2xl font-bold text-foreground">Biography &amp; Life Story</h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
                {obituary.lifeStory}
              </div>

              {obituary.familyNote && (
                <div className="mt-8 rounded-xl border border-gold/30 bg-secondary/60 p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">A Note from the Family</h4>
                  <p className="mt-2 text-xs italic text-foreground/80">{obituary.familyNote}</p>
                </div>
              )}
            </div>

            {/* Gallery */}
            {obituary.galleryImages && obituary.galleryImages.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                <span className="eyebrow text-gold">Memories &amp; Moments</span>
                <h2 className="mt-2 font-serif text-2xl font-bold text-foreground">Photo Gallery</h2>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {obituary.galleryImages.map((img, i) => (
                    <div key={i} className="overflow-hidden rounded-xl bg-muted">
                      <img
                        src={img}
                        alt={`Memorial photo ${i + 1}`}
                        className="aspect-square size-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Condolences List */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="eyebrow text-gold">Words of Comfort</span>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Condolences &amp; Tributes ({obituary.condolences.length})
                  </h2>
                </div>
                <Heart className="size-6 text-red-500 fill-red-500/20" />
              </div>

              <div className="mt-6 space-y-4">
                {obituary.condolences.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic">
                    Be the first to share a warm condolence message or memory with the family.
                  </p>
                ) : (
                  obituary.condolences.map((c) => (
                    <div key={c.id} className="rounded-xl border border-border/80 bg-background p-4 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <User className="size-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-foreground">{c.name}</span>
                            <span className="ml-2 text-[10px] text-gold font-medium">({c.relationship})</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{c.date}</span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-foreground/80">"{c.message}"</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Service Schedule & Condolence Form */}
          <div className="space-y-8 lg:col-span-5">
            {/* Service Events Schedule */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <span className="eyebrow text-gold">Order of Events</span>
              <h3 className="mt-2 font-serif text-2xl font-bold text-foreground">Service Schedule</h3>

              <div className="mt-6 space-y-4">
                {obituary.services.map((svc, i) => (
                  <div key={i} className="rounded-xl border border-border bg-background p-4">
                    <h4 className="font-serif text-base font-bold text-primary">{svc.title}</h4>
                    <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-3.5 text-gold shrink-0" />
                        <span>{svc.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="size-3.5 text-gold shrink-0" />
                        <span>{svc.time}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="size-3.5 text-gold shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">{svc.location}</strong>
                          <br />
                          {svc.address}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave a Tribute Form */}
            <div className="rounded-2xl border border-gold/40 bg-card p-6 sm:p-8 shadow-soft">
              <span className="eyebrow text-gold">Support the Family</span>
              <h3 className="mt-2 font-serif text-2xl font-bold text-foreground">Leave a Tribute</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Your message will be displayed publicly on this eternal memorial page.
              </p>

              {submittedCondolenceSuccess && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/30 p-3 text-xs text-green-700">
                  <Check className="size-4 shrink-0" />
                  <span>Your condolence message has been posted successfully.</span>
                </div>
              )}

              <form onSubmit={handleCondolenceSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Chief & Mrs. Adebayo"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground">Relationship to the Family</label>
                  <input
                    type="text"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="e.g. Childhood Friend, Colleague, Niece"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground">Your Tribute / Condolence Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your words of tribute, comfort, or cherished memories..."
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  disabled={submittingCondolence}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send className="size-4" />
                  {submittingCondolence ? "Posting..." : "Post Tribute"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="Planning a service for a loved one?"
        intro="Capetrust Funeral Services coordinates every step of planning, committal, and obituary management with complete dignity."
      />
    </>
  );
}
