import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Calculator, Flame } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-[#0A192F] text-white border-t border-[#415825]/40">
      <div className="container-page grid gap-10 py-16 md:grid-cols-12">
        {/* Brand & Mission Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3.5">
            <img
              src="/logo.png"
              alt="Capetrust Logo"
              className="h-12 w-auto object-contain shrink-0"
            />
            <div>
              <p className="font-serif text-2xl font-bold tracking-tight text-white">Capetrust</p>
              <p className="eyebrow text-gold text-[0.6rem]">Funeral Services</p>
            </div>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-white/80">
            {site.tagline} Providing compassionate funeral planning, dignified burials, and serene resting grounds at Garden of Peace™ Memorial Park, Agbowa, Lagos.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center rounded-full bg-[#1E3F20] px-3 py-1 text-xs font-semibold text-white border border-[#D4AF37]/30">
              24/7 Immediate Need: <a href={site.phoneHref} className="ml-1 hover:underline text-gold font-bold">{site.phone}</a>
            </span>
          </div>
        </div>

        {/* Quick Links / Services */}
        <div className="md:col-span-3">
          <h3 className="eyebrow text-gold tracking-widest text-xs">Services &amp; Park</h3>
          <ul className="mt-4 space-y-2 text-xs text-primary-foreground/85">
            <li>
              <Link to="/about" className="hover:text-gold hover:underline">
                About Capetrust
              </Link>
            </li>
            <li>
              <Link to="/garden-of-peace" className="hover:text-gold hover:underline">
                Garden of Peace™ Memorial Park
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gold hover:underline">
                Funeral &amp; Burial Services
              </Link>
            </li>
            <li>
              <Link to="/memorial-products" className="hover:text-gold hover:underline">
                Memorial Products &amp; Caskets
              </Link>
            </li>
            <li>
              <Link to="/investment" className="hover:text-gold hover:underline">
                Family Estates &amp; Land Investment
              </Link>
            </li>
          </ul>
        </div>

        {/* Interactive Tools & Remembrance */}
        <div className="md:col-span-2">
          <h3 className="eyebrow text-gold tracking-widest text-xs">Tools &amp; Tributes</h3>
          <ul className="mt-4 space-y-2 text-xs text-primary-foreground/85">
            <li>
              <Link to="/estimator" className="flex items-center gap-1.5 hover:text-gold hover:underline">
                <Calculator className="size-3 text-gold" />
                Price Estimator
              </Link>
            </li>
            <li>
              <Link to="/obituaries" className="flex items-center gap-1.5 hover:text-gold hover:underline">
                <Flame className="size-3 text-gold" />
                Obituaries &amp; Tributes
              </Link>
            </li>
            <li>
              <Link to="/obituaries/create" className="hover:text-gold hover:underline">
                Publish a Memorial
              </Link>
            </li>
            <li>
              <Link to="/pre-planning" className="hover:text-gold hover:underline">
                Pre-Planning Guide
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-gold hover:underline">
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold hover:underline">
                Contact &amp; Tour Booking
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="md:col-span-3">
          <h3 className="eyebrow text-gold tracking-widest text-xs">Direct Contact</h3>
          <ul className="mt-4 space-y-3 text-xs text-primary-foreground/85">
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-3.5 text-gold shrink-0" />
              <a href={site.phoneHref} className="hover:underline">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-3.5 text-gold shrink-0" />
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-3.5 text-gold shrink-0" />
              <span>
                <strong>Head Office:</strong> {site.headOffice}
              </span>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-3.5 text-gold shrink-0" />
              <span>
                <strong>Memorial Park:</strong> {site.park}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Capetrust Funeral Services Ltd. All rights reserved.</span>
          <span>Garden of Peace™ Memorial Park · Agbowa-Ikosi, Lagos State</span>
        </div>
      </div>
    </footer>
  );
}
