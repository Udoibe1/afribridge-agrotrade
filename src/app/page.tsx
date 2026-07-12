import Link from "next/link";
import { InquiryTabs } from "@/components/inquiry-tabs";
import { ProductGlyph } from "@/components/product-glyph";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TradeRouteVisual } from "@/components/trade-route-visual";
import {
  company,
  companyDescription,
  complianceExclusion,
  complianceStatement,
  engagementStatement,
  leadership,
  processSteps,
  productDisclaimer,
  products,
  services
} from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="home">
        <HeroSection />
        <TrustStatement />
        <AboutSection />
        <LeadershipSection />
        <ProductsSection />
        <ServicesSection />
        <MarketsSection />
        <HowItWorksSection />
        <FormsSection />
        <ComplianceSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(214,189,116,0.15),transparent_30rem)]" />
      <div className="container-shell relative grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-16 xl:gap-10">
        <div className="max-w-2xl">
          <p className="eyebrow">Independent trade facilitation</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
            {company.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-warm-100/90">
            {engagementStatement}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#buyer-inquiry"
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg bg-gold-300 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-100"
            >
              Submit Buyer Inquiry
            </Link>
            <Link
              href="#supplier-partnership"
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg border border-warm-100/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Become a Supply Partner
            </Link>
          </div>
        </div>
        <TradeRouteVisual />
      </div>
    </section>
  );
}

function TrustStatement() {
  const principles = [
    {
      title: "Role clarity",
      text: "Independent facilitation only; qualified trade parties remain responsible for direct commercial decisions."
    },
    {
      title: "Document discipline",
      text: "Requirements, procedures, specifications, and supporting documents are coordinated for review."
    },
    {
      title: "Qualification first",
      text: "Buyer requirements and supplier-side information are screened before introductions proceed."
    }
  ];

  return (
    <section className="border-b border-forest-900/10 bg-warm-50">
      <div className="container-shell py-8">
        <p className="max-w-5xl text-lg font-semibold leading-8 text-forest-900">
          Independent trade facilitation built around verification, transparency, documentation, and direct engagement between qualified trade parties.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded-lg border border-forest-900/10 bg-white/70 p-4"
            >
              <h2 className="text-sm font-semibold text-navy-950">{principle.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{principle.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-20">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="eyebrow">About</p>
          <h2 className="section-title mt-4">
            Independent facilitation for serious commodity trade conversations.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-slate-700">
          <p>
            {companyDescription}
          </p>
          <p>
            {engagementStatement}
          </p>
        </div>
      </div>
    </section>
  );
}

function LeadershipSection() {
  return (
    <section className="bg-warm-50 py-16 sm:py-20">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="eyebrow">Leadership</p>
          <h2 className="section-title mt-4">Founded for disciplined Russia-Africa trade coordination.</h2>
        </div>
        <div>
          <p className="text-base leading-8 text-slate-700">
            AfriBridge AgroTrade was established by:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {leadership.map((leader) => (
              <article
                key={leader.name}
                className="rounded-lg border border-forest-900/10 bg-white p-5 shadow-soft"
              >
                <h3 className="text-lg font-semibold text-navy-950">{leader.name}</h3>
                <p className="mt-2 text-sm font-semibold text-forest-800">{leader.role}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-base leading-8 text-slate-700">
            Together, they support independent trade facilitation, commercial coordination, and market development between Russian supplier-side parties and African buyers.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section id="products" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="container-shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Product scope</p>
            <h2 className="section-title mt-4">Products</h2>
          </div>
          <p className="section-copy md:max-w-md">
            Agro-commodity opportunities supported through verified supplier engagement.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product}
              className="rounded-lg border border-forest-900/10 bg-warm-50 p-5 transition hover:border-forest-700/30 hover:shadow-soft"
            >
              <ProductGlyph name={product} />
              <h3 className="mt-5 text-lg font-semibold text-navy-950">{product}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">{productDisclaimer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 py-16 sm:py-20">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Trade support</p>
          <h2 className="section-title mt-4">Services</h2>
          <p className="section-copy mt-5">
            Structured trade coordination from inquiry to qualified counterparty engagement.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service}
              className="flex min-h-20 items-start gap-3 rounded-lg border border-forest-900/10 bg-white/60 p-4"
            >
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gold-500" aria-hidden="true" />
              <p className="text-sm font-semibold leading-6 text-navy-950">{service}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl rounded-lg border border-gold-500/25 bg-gold-100/40 p-4 text-sm leading-6 text-slate-800">
          AfriBridge does not claim to provide legal, banking, inspection, customs, financial, or transaction outcome guarantees.
        </p>
      </div>
    </section>
  );
}

function MarketsSection() {
  return (
    <section id="markets" className="scroll-mt-20 bg-forest-900 py-16 text-white sm:py-20">
      <div className="container-shell grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow">Our Markets</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            AfriBridge AgroTrade supports agro-commodity trade opportunities between Russia and markets across Africa.
          </h2>
          <p className="mt-5 text-base leading-8 text-warm-100/85">
            We work to connect credible suppliers with qualified buyers throughout the continent, subject to product availability, commercial viability, due diligence, logistics, and applicable trade requirements.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-normal text-gold-300">
              Supply Focus
            </p>
            <p className="mt-4 text-2xl font-semibold text-white">
              Russia and selected international origins
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-normal text-gold-300">
              Target Market
            </p>
            <p className="mt-4 text-2xl font-semibold text-white">
              Africa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title mt-4">A disciplined path from inquiry to direct contracting.</h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <article key={step.title} className="border-l border-forest-900/20 pl-5">
              <p className="text-sm font-semibold text-gold-500">Step {index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-navy-950">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Inquiries</p>
          <h2 className="section-title mt-4">Submit a qualified requirement or supplier profile.</h2>
          <p className="section-copy mt-5">
            These forms collect the details needed to review fit, reduce ambiguity, and keep commercial discussions grounded in verifiable information.
          </p>
          <p className="mt-5 rounded-lg border border-forest-900/10 bg-warm-50 px-4 py-3 text-sm font-semibold leading-6 text-forest-900">
            We welcome documented buyer requirements and verifiable supplier profiles for serious commercial review.
          </p>
        </div>
        <InquiryTabs />
      </div>
    </section>
  );
}

function ComplianceSection() {
  return (
    <section id="compliance" className="scroll-mt-20 py-16 sm:py-20">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Compliance</p>
          <h2 className="section-title mt-4">Clear representation boundaries protect every serious transaction.</h2>
        </div>
        <div className="space-y-5 rounded-lg border border-forest-900/10 bg-warm-50 p-6">
          <p className="text-base leading-8 text-slate-800">{complianceStatement}</p>
          <p className="text-base font-semibold leading-8 text-navy-950">
            {complianceExclusion}
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-navy-950 py-16 text-white sm:py-20">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            Commercial contact for supplier and buyer engagement.
          </h2>
        </div>
        <address className="not-italic">
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactItem
              label="Managing Partner"
              value={leadership[0].name}
            />
            <ContactItem
              label="Trade Partner"
              value={leadership[1].name}
            />
            <ContactItem label="Location" value={company.location} />
            <ContactItem
              label="Email"
              value={company.primaryEmail}
              href={`mailto:${company.primaryEmail}`}
            />
            <ContactItem
              label="Trade contact"
              value={company.tradeEmail}
              href={`mailto:${company.tradeEmail}`}
            />
            <ContactItem
              label="Call"
              value={company.phone}
              href={company.phoneUrl}
            />
            <ContactItem
              label="WhatsApp"
              value={company.whatsapp}
              href={company.whatsappUrl}
            />
            <ContactItem label="Markets" value={company.markets} />
          </div>
        </address>
      </div>
    </section>
  );
}

function ContactItem({
  label,
  value,
  href
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/10 p-5">
      <p className="text-xs font-semibold uppercase tracking-normal text-gold-300">{label}</p>
      {href ? (
        <a
          href={href}
          className="focus-ring mt-3 inline-flex rounded-lg text-base font-semibold text-white underline-offset-4 hover:underline"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
        >
          {value}
        </a>
      ) : (
        <p className="mt-3 text-base font-semibold text-white">{value}</p>
      )}
    </div>
  );
}
