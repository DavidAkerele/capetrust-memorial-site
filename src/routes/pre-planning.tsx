import { createFileRoute, Link } from "@tanstack/react-router";
import advisor from "@/assets/advisor.jpg";
import { Button } from "@/components/ui/button";
import { CTABand, PageHero, Section, SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/pre-planning")({
  component: PrePlanning,
  head: () => ({
    meta: [
      { title: "Funeral Pre-Planning in Lagos | Capetrust Funeral Services" },
      {
        name: "description",
        content:
          "Plan ahead with Capetrust: document your wishes, choose burial arrangements and give your family clarity and peace of mind. Free, no-obligation consultations.",
      },
      { property: "og:title", content: "Funeral Pre-Planning | Capetrust" },
      {
        property: "og:description",
        content: "Plan ahead. Give your loved ones clarity and peace of mind.",
      },
      { property: "og:image", content: "/images/og-capetrust.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Funeral Pre-Planning in Lagos | Capetrust" },
      {
        name: "twitter:description",
        content: "Document wishes, protect from inflation, and relieve future burdens on your family.",
      },
      { name: "twitter:image", content: "/images/og-capetrust.png" },
    ],
  }),
});

import { Users, FileText, CheckCircle2, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

const steps = [
  {
    title: "Start the Conversation",
    body: "Meet with one of our Pre-Planning Advisors in person, over the phone, or via video to discuss your wishes, ask questions, and explore options without pressure.",
    icon: Users,
  },
  {
    title: "Create Your Personal Plan",
    body: "Together, we document your exact preferences, including resting plots at Garden of Peace™, service structure, transport logistics, and personal tributes.",
    icon: FileText,
  },
  {
    title: "Review & Customize Choices",
    body: "Take time to review your itemized estimate and memorial plan, make adjustments at your pace, and ensure every detail honors your legacy perfectly.",
    icon: CheckCircle2,
  },
  {
    title: "Keep Your Plan Secured",
    body: "Your plan is permanently recorded in Capetrust's secure registry, protecting your family against future inflation and eliminating uncertainty.",
    icon: ShieldCheck,
  },
];

function PrePlanning() {
  return (
    <>
      <PageHero
        eyebrow="Pre-planning"
        title="Plan ahead. Give your loved ones clarity and peace of mind."
        intro="Planning a funeral in advance is one of the most thoughtful decisions you can make for yourself and your family. It gives you the opportunity to make informed choices, record your wishes and reduce the pressure your loved ones may face in the future."
        image={advisor}
      >
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">Speak with a Pre-Planning Advisor</Link>
        </Button>
        <Button asChild variant="onDark" size="xl">
          <Link to="/contact">Book a Consultation</Link>
        </Button>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Why plan ahead?"
          title="Decisions made calmly, at your own pace"
          intro="By making important decisions in advance, you can ensure your preferences are understood, help reduce uncertainty for your family, and make future arrangements simpler when the time comes."
        />
        <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
          Pre-planning gives you time to consider your options without the urgency that often
          accompanies an immediate need. From choosing a burial space to discussing the type of
          service you would like, every decision can be made at your own pace.
        </p>
      </Section>

      <Section tone="cream" className="bg-texture-dots">
        <SectionHeading center eyebrow="How it works" title="A simple, thoughtful four-step process" intro="Structured step-by-step guidance to ensure complete clarity, legal certainty, and family peace of mind." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group relative rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-soft transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-bold text-[#415825]/40 group-hover:text-[#D4AF37] transition-colors">
                      0{i + 1}
                    </span>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#415825]/10 text-[#415825] group-hover:bg-[#415825] group-hover:text-white transition-colors">
                      <Icon className="size-5" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold text-[#415825]">
                  <span>Milestone {i + 1}</span>
                  <span className="size-1.5 rounded-full bg-[#415825]" />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Consult an advisor"
              title="Personal guidance, every step of the way"
              intro="Planning ahead is a personal decision, and you don't have to make it alone."
            />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Our Pre-Planning Advisors are available to answer your questions, explain your options
              and help you create a plan that suits your needs and circumstances. There's no
              obligation to make immediate decisions; our role is simply to help you understand your
              options and plan with confidence.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-8 shadow-soft transition-all hover:border-[#415825]/40">
            <span className="inline-block rounded-xs bg-[#415825]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#415825] border-l-2 border-[#415825]">Support Services</span>
            <h3 className="mt-3 text-2xl font-serif">Estate Settlement Guidance</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Planning ahead often extends beyond funeral arrangements. As part of our pre-planning
              services, we can guide families on important estate planning considerations to help
              ensure personal wishes are clearly documented.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Where required, we can facilitate access to trusted professionals for estate
              administration, wills, probate guidance and other related matters.
            </p>
            <Button asChild variant="forest" size="lg" className="mt-6">
              <Link to="/contact">Speak with a Pre-Planning Advisor</Link>
            </Button>
          </div>
        </div>
      </Section>

      <CTABand
        title="Take the first step today"
        intro="Planning ahead is one of the most meaningful ways to support the people you love. We're here to help whenever you're ready."
        primary={{ label: "Start Your Pre-Planning Journey", to: "/contact" }}
      />
    </>
  );
}
