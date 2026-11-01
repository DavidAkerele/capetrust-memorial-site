import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, ArrowLeft, CheckCircle2, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, CTABand } from "@/components/site/Sections";
import { submitMemorialForReview } from "@/lib/obituaries-data";

export interface SubmitServiceEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
}

export const Route = createFileRoute("/obituaries/create")({
  component: CreateObituaryPage,
  head: () => ({
    meta: [
      { title: "Submit a Memorial Tribute | Capetrust Funeral Services" },
      {
        name: "description",
        content:
          "Submit an official memorial tribute, biography, and funeral service schedule for your departed loved one to Capetrust Funeral Services.",
      },
      { property: "og:title", content: "Submit a Memorial Tribute | Capetrust" },
      {
        property: "og:description",
        content: "Submit memorial tribute details and service schedules directly to Capetrust.",
      },
      { property: "og:image", content: "/images/og-capetrust.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Submit a Memorial Tribute | Capetrust" },
      {
        name: "twitter:description",
        content: "Submit an online memorial tribute to Capetrust Funeral Services.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

function CreateObituaryPage() {
  // Contact Submitter Details
  const [submitterName, setSubmitterName] = useState("");
  const [submitterRelationship, setSubmitterRelationship] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [submitterPhone, setSubmitterPhone] = useState("");

  // Deceased Details
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfDeath, setDateOfDeath] = useState("");
  const [age, setAge] = useState<string>("");
  const [summaryQuote, setSummaryQuote] = useState("");
  const [lifeStory, setLifeStory] = useState("");
  const [familyNote, setFamilyNote] = useState("");

  // Service Events List
  const [services, setServices] = useState<SubmitServiceEvent[]>([
    {
      title: "Service of Songs & Night of Tributes",
      date: "",
      time: "",
      location: "",
      address: "",
    },
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const addServiceEvent = () => {
    setServices([
      ...services,
      {
        title: "Funeral & Committal Service",
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

  const updateServiceEvent = (index: number, field: keyof SubmitServiceEvent, value: string) => {
    const updated = [...services];
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: value };
      setServices(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !fullName.trim() || !submitterName.trim() || !submitterPhone.trim()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitMemorialForReview({
        submitter_name: submitterName.trim(),
        submitter_relationship: submitterRelationship.trim(),
        submitter_email: submitterEmail.trim(),
        submitter_phone: submitterPhone.trim(),
        full_name: fullName.trim(),
        title: title.trim(),
        date_of_birth: dateOfBirth.trim(),
        date_of_death: dateOfDeath.trim(),
        age: age ? Number(age) : null,
        summary_quote: summaryQuote.trim(),
        life_story: lifeStory.trim(),
        family_note: familyNote.trim(),
        services: services.filter((service) =>
          [service.date, service.time, service.location, service.address].some((value) =>
            value.trim(),
          ),
        ),
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Could not submit your memorial. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
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
              Submit a Memorial Tribute
            </h1>
            <p className="mt-2 max-w-2xl text-xs text-primary-foreground/80">
              Complete this form to send your memorial details to our team for review before
              publication.
            </p>
          </div>
        </div>
      </div>

      <Section>
        {submitted ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-gold/40 bg-card p-8 text-center shadow-soft sm:p-12">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gold/10 text-gold">
              <CheckCircle2 className="size-8" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-bold text-foreground">
              Your memorial has been submitted
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Thank you, <strong className="text-foreground">{submitterName}</strong>. The memorial
              for <strong className="text-foreground">{fullName}</strong> is in our review queue.
              Our team will check the details with your family before publication.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              An advisor may contact you at{" "}
              <strong className="text-foreground">{submitterPhone}</strong> to confirm photos and
              publication.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild variant="gold" size="lg">
                <Link to="/obituaries">Return to Obituaries</Link>
              </Button>
              <Button asChild variant="outlineDark" size="lg">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-10">
            {/* Step 1: Submitter / Family Contact Details */}
            <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="border-b border-border pb-3">
                <span className="eyebrow text-gold">Step 1</span>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Family / Submitter Contact
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  We use these details to verify and coordinate the memorial tribute with your
                  family.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-foreground">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={160}
                    value={submitterName}
                    onChange={(e) => setSubmitterName(e.target.value)}
                    placeholder="e.g. Adeola Adeleke"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground">
                    Relationship to Deceased *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    value={submitterRelationship}
                    onChange={(e) => setSubmitterRelationship(e.target.value)}
                    placeholder="e.g. Daughter, Son, Spouse, Family Representative"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={254}
                    value={submitterEmail}
                    onChange={(e) => setSubmitterEmail(e.target.value)}
                    placeholder="e.g. adeola@example.com"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    minLength={5}
                    maxLength={40}
                    value={submitterPhone}
                    onChange={(e) => setSubmitterPhone(e.target.value)}
                    placeholder="e.g. +234 802 123 4567"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Details of the Departed */}
            <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="border-b border-border pb-3">
                <span className="eyebrow text-gold">Step 2</span>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Personal Details of the Departed
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
                    minLength={2}
                    maxLength={160}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Chief (Dr.) Babatunde Olawale"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground">
                    Honorific Title / Epithet (Optional)
                  </label>
                  <input
                    type="text"
                    maxLength={160}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Otunba of Agbowa, Beloved Matriarch"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    maxLength={80}
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    placeholder="e.g. March 14, 1944"
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
                    minLength={2}
                    maxLength={80}
                    value={dateOfDeath}
                    onChange={(e) => setDateOfDeath(e.target.value)}
                    placeholder="e.g. January 18, 2026"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground">
                    Age at Passing
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="130"
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
                    maxLength={300}
                    value={summaryQuote}
                    onChange={(e) => setSummaryQuote(e.target.value)}
                    placeholder="e.g. A life of selfless service and enduring faith."
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Biography & Life Story */}
            <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="border-b border-border pb-3">
                <span className="eyebrow text-gold">Step 3</span>
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
                  minLength={2}
                  maxLength={10000}
                  rows={6}
                  value={lifeStory}
                  onChange={(e) => setLifeStory(e.target.value)}
                  placeholder="Share the story of their life, achievements, family legacy, and cherished memories..."
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground">
                  Family Appreciation Note (Optional)
                </label>
                <textarea
                  rows={3}
                  maxLength={3000}
                  value={familyNote}
                  onChange={(e) => setFamilyNote(e.target.value)}
                  placeholder="e.g. The family deeply appreciates the prayers, visits, and support received during this solemn celebration."
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Step 4: Funeral & Service Events */}
            <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <span className="eyebrow text-gold">Step 4</span>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Service Schedules &amp; Arrangements
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
                        Service Event #{index + 1}
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
                          onChange={(e) => updateServiceEvent(index, "title", e.target.value)}
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
                          onChange={(e) => updateServiceEvent(index, "date", e.target.value)}
                          placeholder="e.g. Thursday, Feb 26, 2026"
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
                          onChange={(e) => updateServiceEvent(index, "time", e.target.value)}
                          placeholder="e.g. 10:00 AM"
                          className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground">
                          Venue / Location
                        </label>
                        <input
                          type="text"
                          value={svc.location}
                          onChange={(e) => updateServiceEvent(index, "location", e.target.value)}
                          placeholder="e.g. Capetrust Private Chapel"
                          className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground">
                          Address / Area
                        </label>
                        <input
                          type="text"
                          value={svc.address}
                          onChange={(e) => updateServiceEvent(index, "address", e.target.value)}
                          placeholder="e.g. 194, Elepe Rd, Ikorodu, Lagos"
                          className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Notice */}
            <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 text-xs text-foreground/90 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-primary">
                <ShieldCheck className="size-4 text-gold shrink-0" />
                <span>Verification Policy</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                To maintain authenticity and privacy, submitted tributes are verified directly with
                the bereaved family before publication. High-resolution portrait photographs may be
                sent directly via email or WhatsApp to our administrative desk.
              </p>
            </div>

            {/* Submit Action */}
            {submitError && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
              >
                {submitError}
              </p>
            )}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
              <Button asChild variant="outlineDark" size="lg">
                <Link to="/obituaries">Cancel</Link>
              </Button>
              <Button
                type="submit"
                variant="gold"
                size="xl"
                disabled={submitting}
                className="flex items-center justify-center gap-2"
              >
                <Send className="size-4" />
                {submitting ? "Submitting…" : "Submit for Review"}
              </Button>
            </div>
          </form>
        )}
      </Section>

      <CTABand
        title="Need assistance coordinating funeral services?"
        intro="Capetrust Funeral Services provides full event coordination, casket logistics, and burial support across Lagos."
      />
    </>
  );
}
