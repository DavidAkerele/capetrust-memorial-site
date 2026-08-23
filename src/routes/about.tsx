import { createFileRoute } from "@tanstack/react-router";
import advisor from "@/assets/advisor.jpg";
import familyComfort from "@/assets/family-comfort.jpg";
import { CTABand, PageHero, Section, SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Capetrust Funeral Services | Compassionate Care in Lagos" },
      {
        name: "description",
        content:
          "Learn about Capetrust Funeral Services: professional funeral, cemetery and memorial care in Lagos, guided by empathy, integrity and attention to detail.",
      },
      { property: "og:title", content: "About Capetrust Funeral Services" },
      {
        property: "og:description",
        content: "Honouring every life with dignity, care and excellence in Lagos, Nigeria.",
      },
    ],
  }),
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Compassionate care, from the first call to the final farewell"
        intro="When words are difficult to find, compassionate care matters most."
        image={advisor}
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading eyebrow="Who we are" title="A trusted name in funeral care" />
            <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                At Capetrust Funeral Services, we believe every life deserves to be honoured with
                dignity and every family deserves support they can rely on. We provide professional
                funeral, cemetery and memorial services designed to bring comfort, clarity and peace
                of mind during life's most challenging moments.
              </p>
              <p>
                Whether you're making arrangements for a loved one or planning ahead for the future,
                our team is committed to guiding you with empathy, integrity and exceptional
                attention to every detail so you can focus on what truly matters: celebrating a life
                well lived.
              </p>
              <p>
                From the moment you reach out to us, our experienced team coordinates every aspect
                of the funeral, allowing you to focus on honouring your loved one.
              </p>
            </div>
          </div>
          <img
            src={familyComfort}
            alt="A Capetrust advisor supporting a family"
            className="rounded-lg object-cover shadow-soft"
            loading="lazy"
            width={1200}
            height={912}
          />
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="Looking ahead"
          title="A complete funeral and memorial experience under one trusted name"
          intro="As we continue to expand, our vision includes professional mortuary services, floral tributes and additional support services, all delivered with the same standard of care."
        />
        <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
          We proudly welcome partnerships with religious institutions, corporate organisations and
          community groups so we can better serve families across Lagos and beyond.
        </p>
      </Section>

      <CTABand
        title="Speak with a member of our team"
        intro="Our advisors are available to answer your questions and explain every option available to your family."
      />
    </>
  );
}
