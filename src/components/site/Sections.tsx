import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate">
      <img
        src={image}
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 -z-10 bg-primary/70" />
      <div className="container-page py-24 md:py-32">
        <div className="max-w-2xl text-primary-foreground">
          {eyebrow && <p className="eyebrow text-primary-foreground/75">{eyebrow}</p>}
          <h1 className="mt-4 text-4xl leading-tight md:text-6xl">{title}</h1>
          {intro && (
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/85 md:text-lg">
              {intro}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function Section({
  className,
  children,
  tone = "default",
}: {
  className?: string;
  children: ReactNode;
  tone?: "default" | "cream" | "primary";
}) {
  return (
    <section
      className={cn(
        "py-20 md:py-24",
        tone === "cream" && "bg-cream",
        tone === "primary" && "bg-primary text-primary-foreground",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 leading-relaxed text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function InfoCard({
  title,
  children,
  cta,
  href,
}: {
  title: string;
  children: ReactNode;
  cta?: string;
  href?: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-7 shadow-soft">
      <h3 className="text-2xl">{title}</h3>
      <div className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{children}</div>
      {cta && (
        <div className="mt-6">
          <Button asChild variant="outlineDark" size="sm">
            <Link to={href ?? "/contact"}>{cta}</Link>
          </Button>
        </div>
      )}
    </article>
  );
}

export function CTABand({
  title,
  intro,
  primary = { label: "Contact an Advisor", to: "/contact" },
  secondaryLabel = "Call Now",
}: {
  title: string;
  intro?: string;
  primary?: { label: string; to: string };
  secondaryLabel?: string;
}) {
  return (
    <Section tone="primary">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl">{title}</h2>
        {intro && (
          <p className="mt-4 leading-relaxed text-primary-foreground/85">{intro}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="gold" size="xl">
            <Link to={primary.to}>{primary.label}</Link>
          </Button>
          <Button asChild variant="onDark" size="xl">
            <a href={site.phoneHref}>{secondaryLabel}</a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
