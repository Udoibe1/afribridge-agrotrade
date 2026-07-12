import Link from "next/link";
import { company } from "@/lib/site-data";

export function SiteFooter() {
  const links = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Trade Facilitation Disclaimer", href: "/trade-facilitation-disclaimer" },
    { label: "Cookie Notice", href: "/cookie-notice" },
    { label: "Contact", href: "/#contact" }
  ];

  return (
    <footer className="border-t border-forest-900/10 bg-navy-950 text-warm-50">
      <div className="container-shell py-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div>
            <p className="text-lg font-semibold">{company.name}</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-warm-100/80">
              Independent agro-commodity trade facilitation connecting credible supplier engagement with qualified buyer demand across West Africa.
            </p>
          </div>
          <nav className="flex flex-wrap gap-3 md:justify-end" aria-label="Footer navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring rounded-lg px-2 py-1 text-sm text-warm-100/80 underline-offset-4 hover:text-white hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-warm-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>{company.markets}</p>
        </div>
      </div>
    </footer>
  );
}
