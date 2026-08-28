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
    <section className="relative isolate overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover scale-105 transition-transform duration-1000"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0E0E44]/95 via-[#0D2436]/85 to-[#153B26]/45" />
      <div className="absolute inset-0 -z-10 bg-texture-grid opacity-20 pointer-events-none" />
      <div className="container-page py-24 md:py-32">
        <div className="max-w-4xl lg:max-w-5xl text-primary-foreground space-y-4">
          {eyebrow && (
            <span className="inline-block rounded-full bg-[#D4AF37]/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold border border-gold/40 backdrop-blur-xs">
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
    <div className={cn("max-w-4xl lg:max-w-5xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <span className="inline-block rounded-full bg-[#415825]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#415825] border border-[#415825]/20">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-serif font-bold md:text-4xl text-foreground">{title}</h2>
      {intro && <p className="mt-4 leading-relaxed text-muted-foreground text-sm sm:text-base max-w-4xl">{intro}</p>}
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
    <article className="card-interactive group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft">
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
    <section className="relative isolate overflow-hidden py-20 md:py-24 bg-gradient-to-r from-[#0E0E44] via-[#1E3D82] to-[#1E3F20] text-white border-y border-[#D4AF37]/30 shadow-inner">
      <div className="absolute inset-0 bg-texture-grid opacity-20 pointer-events-none" />
      <div className="container-page relative">
        <div className="mx-auto max-w-4xl lg:max-w-5xl text-center space-y-4">
          <span className="inline-block rounded-full bg-[#D4AF37]/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold border border-gold/40 backdrop-blur-xs">
            Garden of Peace™ Memorial
          </span>
          <h2 className="text-3xl font-serif font-bold sm:text-4xl lg:text-5xl text-white">{title}</h2>
          {intro && (
            <p className="mx-auto max-w-2xl text-xs sm:text-sm leading-relaxed text-white/85">
              {intro}
            </p>
          )}
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="xl" className="shadow-lg hover:scale-105 transition-all">
              <Link to={primary.to}>{primary.label}</Link>
            </Button>
            <Button asChild variant="onDark" size="xl" className="transition-all">
              <a href={site.phoneHref}>{secondaryLabel}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
