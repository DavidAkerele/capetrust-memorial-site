import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/SafeImage";
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
    <section className="relative isolate overflow-hidden">
      <SafeImage
        src={image}
        alt=""
        context="park"
        className="absolute inset-0 -z-10 size-full object-cover scale-105 transition-transform duration-1000"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0E0E44]/95 via-[#0D2436]/85 to-[#153B26]/45" />
      <div className="absolute inset-0 -z-10 bg-texture-grid opacity-20 pointer-events-none" />
      <div className="container-page py-20 md:py-28">
        <div className="max-w-4xl lg:max-w-5xl text-primary-foreground space-y-4">
          {eyebrow && (
            <span className="inline-block border-l-2 border-[#D4AF37] bg-[#D4AF37]/15 pl-3 pr-4 py-1 text-[11px] font-bold uppercase tracking-widest text-gold backdrop-blur-xs">
              {eyebrow}
            </span>
          )}
          <h1 className="text-4xl font-serif font-bold leading-tight text-white md:text-5xl lg:text-6xl drop-shadow-md">
            {title}
          </h1>
          {intro && (
            <p className="text-base leading-relaxed text-white/90 md:text-lg max-w-4xl drop-shadow-xs">
              {intro}
            </p>
          )}
          {children && <div className="pt-2 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function Section({
  id,
  className,
  children,
  tone = "default",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "default" | "cream" | "primary";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-20",
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
    <div className={cn("max-w-4xl lg:max-w-5xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <span className={cn(
          "inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-[#415825] border-l-2 border-[#415825] pl-2.5 py-0.5 bg-[#415825]/5 pr-3",
          center && "border-x-2 px-3"
        )}>
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-serif font-bold md:text-4xl text-foreground">{title}</h2>
      {intro && <p className="mt-3 leading-relaxed text-muted-foreground text-sm sm:text-base max-w-4xl">{intro}</p>}
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
    <article className="card-interactive group flex h-full flex-col rounded-md border border-border bg-card p-6 shadow-soft">
      <h3 className="text-2xl font-serif font-bold text-foreground transition-colors group-hover:text-primary">{title}</h3>
      <div className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{children}</div>
      {cta && (
        <div className="mt-6 pt-4 border-t border-border/60">
          <Button asChild variant="outlineForest" size="sm">
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
    <section className="bg-primary text-primary-foreground py-14">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-serif font-bold text-white md:text-3xl">{title}</h2>
          {intro && <p className="text-sm leading-relaxed text-primary-foreground/80">{intro}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="gold" size="lg">
            <Link to={primary.to}>{primary.label}</Link>
          </Button>
          <Button asChild variant="onDark" size="lg">
            <a href={site.phoneHref}>{secondaryLabel}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
