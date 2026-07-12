import Link from "next/link";
import { SiteFooter } from "./site-footer";
import { company } from "@/lib/site-data";

type LegalPageProps = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-warm-50 text-navy-950">
      <div className="container-shell py-6">
        <Link
          href="/"
          className="focus-ring inline-flex rounded-lg px-2 py-2 text-sm font-semibold text-forest-900 underline-offset-4 hover:underline"
        >
          Back to {company.name}
        </Link>
      </div>
      <article className="container-shell max-w-4xl pb-20 pt-8">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-navy-950">
          {title}
        </h1>
        <p className="mt-3 text-sm text-slate-600">Last updated: {updated}</p>
        <div className="legal-content mt-10">
          {children}
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
