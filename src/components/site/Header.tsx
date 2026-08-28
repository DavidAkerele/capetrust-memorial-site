import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Phone,
  X,
  MapPin,
  Calculator,
  MessageSquare,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems, site } from "@/lib/site";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 shadow-xs" ref={navRef}>
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
          {/* Brand Logo & Wordmark */}
          <Link
            to="/"
            onClick={() => setOpenDropdown(null)}
            className="flex items-center gap-3.5 group shrink-0"
          >
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

          {/* Desktop Navigation Links with Nested Dropdowns */}
          <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
            {navItems.map((item) => {
              if (item.to) {
                const isActive =
                  item.to === "/"
                    ? currentPath === "/"
                    : currentPath === item.to || currentPath.startsWith(item.to + "/");

                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpenDropdown(null)}
                    className={`text-xs font-semibold uppercase tracking-wider px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "text-primary font-bold bg-primary/5"
                        : "text-foreground/80 hover:text-primary hover:bg-secondary/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              if (item.children) {
                const isOpen = openDropdown === item.label;
                const isGroupActive = item.children.some(
                  (child) =>
                    currentPath === child.to ||
                    currentPath.startsWith(child.to + "/")
                );

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(isOpen ? null : item.label)
                      }
                      className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider px-3 py-2 rounded-md transition-colors ${
                        isGroupActive
                          ? "text-primary font-bold bg-primary/5"
                          : isOpen
                          ? "text-primary bg-secondary/80"
                          : "text-foreground/80 hover:text-primary hover:bg-secondary/60"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`size-3 text-gold transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Floating Card */}
                    {isOpen && (
                      <div className="absolute left-0 top-full pt-1.5 w-72 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                        <div className="rounded-xl border border-border bg-card p-2 shadow-soft">
                          <div className="space-y-1">
                            {item.children.map((child) => {
                              const isChildActive =
                                currentPath === child.to ||
                                currentPath.startsWith(child.to + "/");

                              return (
                                <Link
                                  key={child.to}
                                  to={child.to}
                                  onClick={() => setOpenDropdown(null)}
                                  className={`block rounded-lg p-2.5 transition-colors group/item ${
                                    isChildActive
                                      ? "bg-primary/10 border-l-2 border-primary"
                                      : "hover:bg-secondary/70"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span
                                      className={`text-xs font-bold leading-none ${
                                        isChildActive
                                          ? "text-primary"
                                          : "text-foreground group-hover/item:text-primary"
                                      }`}
                                    >
                                      {child.label}
                                    </span>
                                    <ArrowRight className="size-3 text-gold opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                                  </div>
                                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                                    {child.description}
                                  </p>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return null;
            })}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              asChild
              variant="outlineForest"
              size="sm"
              className="hidden sm:inline-flex text-xs"
            >
              <Link to="/estimator" className="flex items-center gap-1.5">
                <Calculator className="size-3.5 text-[#415825]" />
                Estimator
              </Link>
            </Button>

            <Button
              asChild
              variant="pine"
              size="sm"
              className="hidden sm:inline-flex text-xs"
            >
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5"
              >
                <MessageSquare className="size-3.5 text-gold" />
                WhatsApp
              </a>
            </Button>

            <button
              className="inline-flex size-10 items-center justify-center rounded-md border border-border lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <nav className="border-t border-border bg-background lg:hidden max-h-[80vh] overflow-y-auto">
            <div className="container-page flex flex-col py-3 space-y-1">
              {navItems.map((item) => {
                if (item.to) {
                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="border-b border-border/60 py-2.5 text-sm font-medium last:border-0 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  );
                }

                if (item.children) {
                  const isExpanded = mobileExpandedGroup === item.label;

                  return (
                    <div
                      key={item.label}
                      className="border-b border-border/60 py-2"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpandedGroup(isExpanded ? null : item.label)
                        }
                        className="flex w-full items-center justify-between text-sm font-medium text-foreground hover:text-primary py-1"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`size-4 text-gold transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="mt-2 space-y-2 pl-3 border-l-2 border-gold/40">
                          {item.children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              onClick={() => setMobileOpen(false)}
                              className="block py-1 text-xs text-foreground/80 hover:text-primary"
                            >
                              <span className="font-semibold">{child.label}</span>
                              <p className="text-[10px] text-muted-foreground">
                                {child.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return null;
              })}

              <div className="mt-4 grid grid-cols-2 gap-3 pt-3 pb-3">
                <Button asChild variant="outlineForest" size="default" className="w-full text-xs font-bold">
                  <Link to="/estimator" onClick={() => setMobileOpen(false)}>
                    Price Estimator
                  </Link>
                </Button>
                <Button asChild variant="pine" size="default" className="w-full text-xs font-bold">
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
