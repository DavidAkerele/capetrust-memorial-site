import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import chapel from "@/assets/chapel.jpg";
import { CTABand, PageHero, Section, SectionHeading } from "@/components/site/Sections";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "Funeral FAQs | Capetrust Funeral Services, Lagos" },
      {
        name: "description",
        content:
          "Answers to common questions about arranging a funeral in Nigeria: documentation, costs, caskets and vaults, religious practices, repatriation and day-of-service support.",
      },
      { property: "og:title", content: "Frequently Asked Questions | Capetrust" },
      {
        property: "og:description",
        content: "13 answers across 7 sections to help you plan with confidence.",
      },
    ],
  }),
});

type QA = { q: string; a: string[] };

const sections: { title: string; items: QA[] }[] = [
  {
    title: "General Services",
    items: [
      {
        q: "What happens after I contact Capetrust following a death?",
        a: [
          "Reach us anytime, 24/7, via call or WhatsApp.",
          "Pickup & transfer — we collect your loved one and transfer them to a mortuary.",
          "Documentation & planning — you provide the Medical Certificate of Cause of Death, and we sit with you to plan a service that fits your needs.",
          "Confirmation & preparation — we finalise every detail before the burial day.",
          "Day of burial — full setup and execution of the event.",
        ],
      },
    ],
  },
  {
    title: "Documentation & Legal",
    items: [
      {
        q: "What documents do I need to provide?",
        a: [
          "You'll need to provide the Medical Certificate of Cause of Death, issued by the attending doctor in the hospital. Once that's provided, we handle everything else.",
          "If it's not available (e.g. sudden or unsupervised death), an autopsy may be required first. Our team can guide you through this.",
        ],
      },
    ],
  },
  {
    title: "Cost & Payment",
    items: [
      {
        q: "How much does a funeral cost with Capetrust?",
        a: [
          "We offer Basic, Standard and Premium packages to suit different budgets, with cost varying by casket, headstone and vault choice. Contact us for a personalised quote.",
        ],
      },
      {
        q: "Can I pre-plan my own funeral arrangements?",
        a: [
          "Yes. Set out your wishes in advance, lock in today's rates and spare your family difficult decisions later.",
        ],
      },
      {
        q: "What additional statutory fees or options apply?",
        a: [
          "Local Government Documentation — ₦20,000 per burial",
          "Vault Re-opening — ₦300,000 per instance",
          "Custom Single Headstone — ₦200,000",
          "Custom Double Headstone — ₦350,000",
          "Street Naming / Wall Advert — ₦600,000",
        ],
      },
    ],
  },
  {
    title: "Caskets & Vaults",
    items: [
      {
        q: "What casket options are available?",
        a: [
          "We offer a range of caskets, from locally made wooden options to imported wood and metal caskets. Book a viewing appointment to see the collection.",
        ],
      },
      {
        q: "What vault options are available?",
        a: [
          "Single Chamber — for one person",
          "Double Chamber — for two",
          "Triple Chamber — for three",
          "Mausoleum — a private above-ground structure, built and maintained by Capetrust",
          "Private Estate — a dedicated section for your lineage, built and maintained by Capetrust",
        ],
      },
    ],
  },
  {
    title: "Religious & Cultural Practices",
    items: [
      {
        q: "Do you accommodate custom or religious burial practices?",
        a: [
          "Yes. We accommodate a wide range of practices, including Islamic (same-day burial), Christian denominational services, and traditional or ethnic customs. Contact us to plan around your specific needs.",
        ],
      },
      {
        q: "Can you help coordinate a wake-keep or lying-in-state event?",
        a: [
          "Yes. We handle hearse, transport, venue and other logistics for wake-keep or lying-in-state events. Contact us for a detailed breakdown.",
        ],
      },
    ],
  },
  {
    title: "Transport & Repatriation",
    items: [
      {
        q: 'Can I have a burial done in another state (e.g. burial "back home")?',
        a: ["Yes. We handle interstate burial arrangements, including transport and the required permits."],
      },
      {
        q: "Do you handle repatriation and collection?",
        a: ["Yes. We handle the documentation and logistics for international repatriation and collection."],
      },
    ],
  },
  {
    title: "Day-of-Service & Support",
    items: [
      {
        q: "Do you provide hearse/transport service to the burial ground?",
        a: [
          "Yes. Hearse service and transport buses for family members are available for hire, to and from the burial ground.",
        ],
      },
      {
        q: "What event support do you provide (venue, rentals, printing)?",
        a: [
          "We provide canopies, chairs and a 200-seater hall for hire, and help design and arrange obituary posters, funeral programmes, newspaper announcements and other printing materials. For any other needs, please contact us.",
        ],
      },
    ],
  },
];

function FAQ() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Frequently asked questions"
        intro="Clear answers to the questions families ask us most often, from documentation and costs to religious practices and repatriation."
        image={chapel}
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <SectionHeading title={section.title} />
              <Accordion type="single" collapsible className="mt-4">
                {section.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q}>
                    <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                        {item.a.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            Can't find what you're looking for?{" "}
            <Link to="/contact" className="text-primary underline">
              Contact our team
            </Link>
            .
          </p>
        </div>
      </Section>

      <CTABand
        title="Still have questions?"
        intro="Our advisors are available 24/7 for immediate-need assistance and by appointment for planning consultations."
      />
    </>
  );
}
