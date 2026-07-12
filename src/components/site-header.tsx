import Image from "next/image";
import Link from "next/link";
import { company, navigation } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-forest-900/10 bg-warm-50/95 backdrop-blur">
      <div className="container-shell flex min-h-16 items-center justify-between gap-6">
        <Link
          href="#home"
          className="focus-ring flex items-center gap-3 rounded-lg py-3"
          aria-label="AfriBridge AgroTrade home"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-forest-900/10 bg-white p-1 shadow-sm">
            <Image
              src="/afribridge-logo-mark.png"
              alt=""
              width={44}
              height={44}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-normal text-navy-950">
              {company.name}
            </span>
            <span className="hidden text-xs text-slate-600 sm:block">
              {company.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-forest-900/5 hover:text-forest-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#buyer-inquiry"
          className="focus-ring hidden rounded-lg bg-forest-900 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-forest-700 md:inline-flex"
        >
          Submit Inquiry
        </Link>
      </div>
      <nav
        className="container-shell flex flex-wrap gap-1 border-t border-forest-900/10 py-2 lg:hidden"
        aria-label="Primary navigation"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="focus-ring shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-forest-900/5 hover:text-forest-900"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
