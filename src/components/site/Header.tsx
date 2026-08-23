import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Phone, X, MapPin, Calculator, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-xs">
      {/* Top Utility Ribbon */}
      <div className="bg-primary text-primary-foreground">
        <div className="container-page flex h-9 items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline tracking-wide text-primary-foreground/90 font-medium">
              Garden of Peace™ Memorial Park • Agbowa, Lagos
            </span>
            <span className="inline-flex items-center font-semibold text-gold">
              24/7 Immediate Assistance
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={site.parkMap}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 hover:underline md:flex text-primary-foreground/90"
            >
              <MapPin className="size-3.5 text-gold" /> Our Locations
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 hover:underline font-semibold"
            >
              <Phone className="size-3.5 text-gold" /> {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container-page flex h-20 items-center justify-between gap-4">
          {/* Brand Logo & Name (Clean, without circle frame) */}
          <Link to="/" className="flex items-center gap-3.5 group shrink-0">
            <img
              src="/logo.png"
              alt="Capetrust Logo"
              className="h-12 w-auto object-contain"
            />
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-primary">
                  Capetrust
                </span>
                <span className="eyebrow text-[0.62rem] text-gold font-bold">
                  Funerals
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-3.5 xl:gap-5 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-xs font-semibold uppercase tracking-wider text-foreground/80 transition-colors hover:text-primary py-1"
                activeProps={{ className: "text-primary font-bold border-b-2 border-gold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Button asChild variant="outlineDark" size="sm" className="hidden sm:inline-flex text-xs">
              <Link to="/estimator" className="flex items-center gap-1.5">
                <Calculator className="size-3.5 text-gold" />
                Estimator
              </Link>
            </Button>

            <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex text-xs">
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                <MessageSquare className="size-3.5" />
                WhatsApp
              </a>
            </Button>

            <button
              className="inline-flex size-10 items-center justify-center rounded-md border border-border lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav className="border-t border-border bg-background lg:hidden">
            <div className="container-page flex flex-col py-3">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3 text-sm font-medium last:border-0 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-4 grid grid-cols-2 gap-3 pb-2">
                <Button asChild variant="outlineDark" size="sm">
                  <Link to="/estimator" onClick={() => setOpen(false)}>
                    Price Estimator
                  </Link>
                </Button>
                <Button asChild variant="gold" size="sm">
                  <a href={site.whatsapp} target="_blank" rel="noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
