import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Upload,
  Plus,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, CTABand } from "@/components/site/Sections";
import { saveObituary, Obituary, ServiceEvent } from "@/lib/obituaries-data";

export const Route = createFileRoute("/obituaries/create")({
  component: CreateObituaryPage,
  head: () => ({
    meta: [
      { title: "Publish a Memorial Tribute | Capetrust Funeral Services" },
      {
        name: "description",
        content:
          "Create and publish a lasting online memorial tribute for your loved one with service schedules, biography, photo gallery, and condolence guestbook.",
      },
    ],
  }),
});

function CreateObituaryPage() {
  const navigate = useNavigate();

  // Form State
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfDeath, setDateOfDeath] = useState("");
  const [age, setAge] = useState<string>("");
  const [summaryQuote, setSummaryQuote] = useState("");
  const [lifeStory, setLifeStory] = useState("");
  const [familyNote, setFamilyNote] = useState("");
  const [imagePreview, setImagePreview] = useState<string>(
    "/images/jacinta-christos-pJ8WXG5C_5U-unsplash.jpg"
  );

  // Service Events List
  const [services, setServices] = useState<ServiceEvent[]>([
    {
      title: "Service of Songs & Night of Tributes",
      date: "Thursday, March 12, 2026",
      time: "5:00 PM",
      location: "Capetrust Private Chapel",
      address: "194, Elepe Rd, Opp Elepe School, Ikorodu, Lagos",
    },
    {
      title: "Interment & Committal",
      date: "Friday, March 13, 2026",
      time: "1:00 PM",
      location: "Garden of Peace™ Memorial Park",
      address: "Odo-Ayandelu, Agbowa, Lagos State",
    },
  ]);

  const [publishing, setPublishing] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addServiceEvent = () => {
    setServices([
      ...services,
      {
        title: "Funeral & Thanksgiving Service",
        date: "",
        time: "",
        location: "",
        address: "",
      },
    ]);
  };

  const removeServiceEvent = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateServiceEvent = (
    index: number,
    field: keyof ServiceEvent,
    value: string
  ) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .concat(`-${Math.floor(100 + Math.random() * 900)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !dateOfDeath || !lifeStory.trim()) return;

    setPublishing(true);

    const slug = generateSlug(fullName);
    const newObituary: Obituary = {
      id: `ob_${Date.now()}`,
      slug,
      fullName: fullName.trim(),
      title: title.trim() || undefined,
      dateOfBirth: dateOfBirth || "Unknown",
      dateOfDeath: dateOfDeath,
      age: parseInt(age) || 0,
      featuredImage: imagePreview,
      galleryImages: [imagePreview],
      summaryQuote:
        summaryQuote.trim() ||
        "Forever remembered, deeply missed, and held in eternal love.",
      lifeStory: lifeStory.trim(),
      familyNote: familyNote.trim() || undefined,
      services: services.filter((s) => s.title && s.location),
      candlesCount: 1,
      condolences: [],
      createdAt: new Date().toISOString(),
    };

    saveObituary(newObituary);

    setTimeout(() => {
      setPublishing(false);
      navigate({
        to: "/obituaries/$slug",
        params: { slug },
      });
    }, 600);
  };

  return (
    <>
      <div className="bg-primary py-12 text-primary-foreground">
        <div className="container-page">
          <Link
            to="/obituaries"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold hover:underline"
          >
            <ArrowLeft className="size-3.5" />
            Back to Obituaries
          </Link>
          <div className="mt-4">
            <span className="eyebrow text-gold">Eternal Remembrance</span>
            <h1 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">
              Publish a Memorial Tribute
            </h1>
            <p className="mt-2 text-xs text-primary-foreground/80">
              Create a dedicated online memorial where friends and family worldwide can share tributes, light candles, and view service arrangements.
            </p>
          </div>
        </div>
      </div>

      <Section>
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-10">
          {/* Section 1: Basic Information */}
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="border-b border-border pb-3">
              <span className="eyebrow text-gold">Step 1</span>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Personal &amp; Vital Details
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-foreground">
                  Full Name of the Departed *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Chief (Dr.) Babatunde Adeleke"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground">
                  Honorific Title / Epithet (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Otunba of Lagos, Matriarch, Beloved Father"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground">
                  Date of Birth
                </label>
                <input
                  type="text"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  placeholder="e.g. May 14, 1945"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground">
                  Date of Passing *
                </label>
                <input
                  type="text"
                  required
                  value={dateOfDeath}
                  onChange={(e) => setDateOfDeath(e.target.value)}
                  placeholder="e.g. February 01, 2026"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground">
                  Age at Passing
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 81"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground">
                  Summary Quote / Farewell Words
                </label>
                <input
                  type="text"
                  value={summaryQuote}
                  onChange={(e) => setSummaryQuote(e.target.value)}
                  placeholder="e.g. A life of faith, grace, and community dedication."
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="border-t border-border pt-4">
              <label className="block text-xs font-semibold text-foreground">
                Featured Portrait / Photo
              </label>
              <div className="mt-3 flex items-center gap-6">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border-2 border-gold/40 bg-muted">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="size-full object-cover"
                  />
                </div>
                <div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground hover:bg-gold hover:text-primary transition-colors">
                    <Upload className="size-3.5" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Recommended: High quality JPG or PNG portrait.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Biography & Family Note */}
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="border-b border-border pb-3">
              <span className="eyebrow text-gold">Step 2</span>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Biography &amp; Life Story
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground">
                Life Story &amp; Achievements *
              </label>
              <textarea
                required
                rows={6}
                value={lifeStory}
                onChange={(e) => setLifeStory(e.target.value)}
                placeholder="Share the story of their life, career, community impact, surviving family members, and cherished memories..."
                className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground">
                Family Appreciation Note (Optional)
              </label>
              <textarea
                rows={3}
                value={familyNote}
                onChange={(e) => setFamilyNote(e.target.value)}
                placeholder="e.g. The family deeply appreciates the prayers and support received during this period."
                className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Section 3: Funeral & Service Events */}
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="eyebrow text-gold">Step 3</span>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Funeral &amp; Memorial Service Events
                </h2>
              </div>
              <Button
                type="button"
                variant="outlineDark"
                size="sm"
                onClick={addServiceEvent}
                className="flex items-center gap-1 text-xs"
              >
                <Plus className="size-3.5" />
                Add Event
              </Button>
            </div>

            <div className="space-y-4">
              {services.map((svc, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-background p-4 relative space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-bold text-primary">
                      Event #{index + 1}
                    </span>
                    {services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeServiceEvent(index)}
                        className="text-xs text-destructive hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="size-3.5" />
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground">
                        Event Title
                      </label>
                      <input
                        type="text"
                        value={svc.title}
                        onChange={(e) =>
                          updateServiceEvent(index, "title", e.target.value)
                        }
                        placeholder="e.g. Service of Songs"
                        className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground">
                        Date
                      </label>
                      <input
                        type="text"
                        value={svc.date}
                        onChange={(e) =>
                          updateServiceEvent(index, "date", e.target.value)
                        }
                        placeholder="e.g. Thursday, March 12, 2026"
                        className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground">
                        Time
                      </label>
                      <input
                        type="text"
                        value={svc.time}
                        onChange={(e) =>
                          updateServiceEvent(index, "time", e.target.value)
                        }
                        placeholder="e.g. 10:00 AM"
                        className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground">
                        Venue / Church / Location
                      </label>
                      <input
                        type="text"
                        value={svc.location}
                        onChange={(e) =>
                          updateServiceEvent(index, "location", e.target.value)
                        }
                        placeholder="e.g. Capetrust Private Chapel"
                        className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-muted-foreground">
                        Full Address
                      </label>
                      <input
                        type="text"
                        value={svc.address}
                        onChange={(e) =>
                          updateServiceEvent(index, "address", e.target.value)
                        }
                        placeholder="e.g. 194, Elepe Rd, Ikorodu, Lagos"
                        className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
            <Button asChild variant="outlineDark" size="lg">
              <Link to="/obituaries">Cancel</Link>
            </Button>
            <Button
              type="submit"
              variant="gold"
              size="xl"
              disabled={publishing}
              className="flex items-center justify-center gap-2"
            >
              <Sparkles className="size-4" />
              {publishing ? "Publishing Memorial..." : "Publish Memorial Tribute"}
            </Button>
          </div>
        </form>
      </Section>

      <CTABand
        title="Need professional assistance coordinating services?"
        intro="Capetrust Funeral Services provides full event coordination, casket logistics, and burial services in Lagos."
      />
    </>
  );
}
