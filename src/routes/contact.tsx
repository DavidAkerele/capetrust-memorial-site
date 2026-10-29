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
        content:
          "24/7 immediate assistance, head office in Ikorodu, and cemetery tours at Agbowa, Lagos.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

import { useCMS } from "@/lib/cms/cms-store";

function Contact() {
  const { content } = useCMS();
  const currentSettings = content.settings || site;
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
    window.location.href = `mailto:${currentSettings.email || site.email}?subject=${encodeURIComponent(
      `Website enquiry — ${data.get("interest")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow={content.contact.hero.eyebrow}
        title={content.contact.hero.title}
        intro="Call, message us on WhatsApp, or prepare an email using the form below."
        image="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1920&auto=format&fit=crop"
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
                <a href={currentSettings.phoneHref || site.phoneHref}>Call Us Now</a>
              </Button>
              <Button asChild variant="outlineDark" size="lg">
                <a
                  href={currentSettings.whatsapp || site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
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
              intro="Complete the form to open an email draft. Send it from your email app to reach our team."
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
                    defaultValue={content.contact.inquirySubjects[0]}
                    className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {content.contact.inquirySubjects.map((i) => (
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
                <Button type="submit" variant="forest" size="xl">
                  Open Email Draft
                </Button>
                {sent && (
                  <p className="text-sm text-muted-foreground">
                    Your email draft should now be open. Please send it from your email app.
                  </p>
                )}
              </div>
            </form>
          </div>

          <aside className="space-y-8">
            <div className="rounded-xl border border-border bg-card p-7 shadow-xs">
              <h3 className="font-serif text-xl font-bold">Contact information</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 text-[#415825]" />
                  <a
                    href={currentSettings.phoneHref || site.phoneHref}
                    className="hover:underline font-semibold"
                  >
                    {currentSettings.phone || site.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 text-[#415825]" />
                  <a
                    href={`mailto:${currentSettings.email || site.email}`}
                    className="hover:underline"
                  >
                    {currentSettings.email || site.email}
                  </a>
                </li>
              </ul>
            </div>

            {content.contact.branches.map((branch) => (
              <div
                key={branch.title}
                className="rounded-xl border border-border bg-card p-7 shadow-xs"
              >
                <h3 className="font-serif text-xl font-bold">{branch.title}</h3>
                <p className="mt-3 flex gap-3 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[#415825]" />
                  {branch.address}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">{branch.hours}</p>
                {branch.mapLink && (
                  <Button asChild variant="outlineForest" size="sm" className="mt-5">
                    <a href={branch.mapLink} target="_blank" rel="noreferrer">
                      Get directions
                    </a>
                  </Button>
                )}
              </div>
            ))}

            <div className="rounded-lg border border-border bg-card p-7">
              <h3 className="flex items-center gap-2 text-xl">
                <Clock className="size-4 text-gold" /> Business hours
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {currentSettings.hours.map(({ days, hours }) => (
                  <li key={days} className="flex justify-between gap-4">
                    <span>{days}</span>
                    <span className="text-foreground">{hours}</span>
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
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl">Before You Visit</h2>
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
