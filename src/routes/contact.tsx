import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import familyComfort from "@/assets/family-comfort.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, Section, SectionHeading } from "@/components/site/Sections";
import { site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact Capetrust Funeral Services | Ikorodu & Agbowa, Lagos" },
      {
        name: "description",
        content:
          "Contact Capetrust Funeral Services in Lagos: call +234 802 6666 655, WhatsApp us, or complete our enquiry form. Immediate funeral assistance 24/7.",
      },
      { property: "og:title", content: "Contact Capetrust Funeral Services | Lagos, Nigeria" },
      {
        property: "og:description",
        content: "Head Office in Ikorodu and Garden of Peace Memorial Park in Agbowa, Lagos.",
      },
      { property: "og:image", content: "/images/og-capetrust.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Capetrust Funeral Services" },
      {
        name: "twitter:description",
        content: "24/7 immediate assistance, head office in Ikorodu, and cemetery tours at Agbowa, Lagos.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

const interests = [
  "Pre-Planning Enquiry",
  "Billing, Payment & Account Enquiry",
  "General Enquiry",
  "Immediate Need Assistance",
  "Repatriation Services",
  "Investment & Partnership Enquiry",
  "Directions to Our Locations",
];

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Interest: ${data.get("interest")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Website enquiry — ${data.get("interest")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We're here whenever you need us"
        intro="Please get in touch using the contact details below or complete our enquiry form, and we'll respond as soon as possible."
        image={familyComfort}
      />

      <Section tone="cream" className="py-12 md:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gold/40 bg-background p-8">
            <h2 className="text-2xl">Has a death occurred?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              If you need immediate funeral assistance, please contact our team as soon as possible.
              Immediate support is available 24 hours a day, 7 days a week.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={site.phoneHref}>Call Us Now</a>
              </Button>
              <Button asChild variant="outlineDark" size="lg">
                <a href={site.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-8">
            <h2 className="text-2xl">Do you need help with planning?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Book a consultation. We'll take the time to understand your needs, explain your
              options and answer any questions you may have.
            </p>
            <Button asChild variant="gold" size="lg" className="mt-6">
              <a href="#enquiry">Book a Consultation</a>
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div id="enquiry">
            <SectionHeading
              eyebrow="Enquiry & reservation"
              title="Send us a message"
              intro="Complete the form below and a member of our team will be in touch."
            />
            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="interest">Service / interest</Label>
                  <select
                    id="interest"
                    name="interest"
                    required
                    defaultValue={interests[2]}
                    className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {interests.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">How can we help?</Label>
                <Textarea id="message" name="message" rows={5} required />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" variant="gold" size="xl">
                  Submit Enquiry
                </Button>
                {sent && (
                  <p className="text-sm text-muted-foreground">
                    Thank you — your email client should now open with your enquiry.
                  </p>
                )}
              </div>
            </form>
          </div>

          <aside className="space-y-8">
            <div className="rounded-lg border border-border bg-card p-7">
              <h3 className="text-xl">Contact information</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 text-gold" />
                  <a href={site.phoneHref} className="hover:underline">
                    {site.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 text-gold" />
                  <a href={`mailto:${site.email}`} className="hover:underline">
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-7">
              <h3 className="text-xl">Head Office</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The best place to discuss funeral arrangements, pre-planning, billing enquiries and
                general consultations.
              </p>
              <p className="mt-3 flex gap-3 text-sm">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                {site.headOffice}
              </p>
              <Button asChild variant="outlineDark" size="sm" className="mt-5">
                <a href={site.headOfficeMap} target="_blank" rel="noreferrer">
                  Get Directions
                </a>
              </Button>
            </div>

            <div className="rounded-lg border border-border bg-card p-7">
              <h3 className="text-xl">Garden of Peace Memorial Park</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We welcome families, prospective buyers and visitors to tour our memorial park.
                Appointments are recommended so an advisor is available to assist you.
              </p>
              <p className="mt-3 flex gap-3 text-sm">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                {site.park}
              </p>
              <Button asChild variant="outlineDark" size="sm" className="mt-5">
                <a href={site.parkMap} target="_blank" rel="noreferrer">
                  Visit the Memorial Park
                </a>
              </Button>
            </div>

            <div className="rounded-lg border border-border bg-card p-7">
              <h3 className="flex items-center gap-2 text-xl">
                <Clock className="size-4 text-gold" /> Business hours
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {site.hours.map(([day, time]) => (
                  <li key={day} className="flex justify-between gap-4">
                    <span>{day}</span>
                    <span className="text-foreground">{time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Emergency funeral assistance available 24 hours a day, 7 days a week.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-10 md:grid-cols-2">
          <iframe
            title="Capetrust Head Office location map"
            src="https://www.google.com/maps?q=194%20Elepe%20Road%20Ikorodu%20Lagos&output=embed"
            className="h-80 w-full rounded-lg border border-border"
            loading="lazy"
          />
          <iframe
            title="Garden of Peace Memorial Park location map"
            src="https://www.google.com/maps?q=Odo-Ayandelu%20Agbowa%20Lagos&output=embed"
            className="h-80 w-full rounded-lg border border-border"
            loading="lazy"
          />
        </div>
        <div className="mx-auto mt-14 max-w-2xl text-center">
          <h2 className="text-3xl">Before you visit</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            To provide you with the best possible service, we recommend booking an appointment for
            consultations, cemetery tours and investment enquiries. This allows our advisors to
            dedicate time to your visit and answer your questions without interruption.
          </p>
        </div>
      </Section>
    </>
  );
}
