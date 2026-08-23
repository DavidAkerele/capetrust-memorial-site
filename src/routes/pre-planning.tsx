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

const steps = [
  ["Start the Conversation", "Meet with one of our Pre-Planning Advisors to discuss your wishes, answer your questions and explain the options available."],
  ["Create Your Personal Plan", "Together, we'll document your preferences, including burial arrangements, cemetery options and any personal requests you would like your family to know."],
  ["Review Your Choices", "Take time to review your plan, make any adjustments and ensure every detail reflects your wishes before it's finalised."],
  ["Keep Your Plan Secure", "Your plan is safely documented with Capetrust and can be updated if your circumstances or preferences change in the future."],
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

      <Section tone="cream">
        <SectionHeading eyebrow="How it works" title="A simple four-step process" />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, body], i) => (
            <li key={title} className="rounded-lg border border-border bg-card p-7 shadow-soft">
              <span className="font-serif text-4xl text-gold">{i + 1}</span>
              <h3 className="mt-3 text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
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
          <div className="rounded-lg border border-border bg-card p-8 shadow-soft">
            <h3 className="text-2xl">Estate Settlement Guidance</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Planning ahead often extends beyond funeral arrangements. As part of our pre-planning
              services, we can guide families on important estate planning considerations to help
              ensure personal wishes are clearly documented.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Where required, we can facilitate access to trusted professionals for estate
              administration, wills, probate guidance and other related matters.
            </p>
            <Button asChild variant="outlineDark" size="lg" className="mt-6">
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
