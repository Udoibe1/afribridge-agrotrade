import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { ProductGlyph } from "@/components/product-glyph";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TradeRouteVisual } from "@/components/trade-route-visual";
import {
  company,
  complianceExclusion,
  complianceStatement,
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
      <TradeRouteVisual />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,13,24,0.98)_0%,rgba(7,13,24,0.88)_42%,rgba(7,13,24,0.24)_100%)]" />
      <div className="container-shell relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">AfriBridge AgroTrade</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
            Connecting Russian Agro Supply with West African Demand
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-warm-100/90">
            AfriBridge AgroTrade facilitates credible trade opportunities between established suppliers and qualified buyers across Ghana, Nigeria, and West Africa.
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
            AfriBridge AgroTrade coordinates supplier engagement, buyer inquiries, commercial communication, documentation flow, and transaction support for agro-commodity opportunities connected to Ghana, Nigeria, and West Africa.
          </p>
          <p>
            The company is not a direct producer, seller, exporter, buyer, supplier mandate, or owner of commodities unless specifically supported by written authorization. AfriBridge works to bring qualified parties into clearer commercial engagement while each party remains responsible for its own verification, approvals, contracts, and risk decisions.
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
            <p className="eyebrow">Products</p>
          <h2 className="section-title mt-4">Commodity categories reviewed through supplier-side engagement.</h2>
          </div>
          <p className="section-copy md:max-w-md">
            Product discussions begin with documented buyer requirements and supplier-side availability checks.
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
          <p className="eyebrow">Services</p>
          <h2 className="section-title mt-4">Commercial coordination without overstated guarantees.</h2>
          <p className="section-copy mt-5">
            AfriBridge supports the communication and document flow that helps credible parties evaluate whether a trade can proceed.
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
          <p className="eyebrow">Markets</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            Supplier engagement and buyer markets are handled with clear role boundaries.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-normal text-gold-300">
              Supplier engagement origins
            </p>
            <p className="mt-4 text-2xl font-semibold text-white">
              Russia and selected international origins
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-normal text-gold-300">
              Buyer markets
            </p>
            <p className="mt-4 text-2xl font-semibold text-white">
              Ghana, Nigeria, and West Africa
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
        </div>
        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          <div id="buyer-inquiry" className="scroll-mt-24">
            <InquiryForm
              kind="buyer"
              title="Buyer inquiry form"
              description="For qualified buyers requesting sugar, wheat, wheat flour, sunflower oil, or fertilizer supply discussions."
            />
          </div>
          <div id="supplier-partnership" className="scroll-mt-24">
            <InquiryForm
              kind="supplier"
              title="Supplier partnership form"
              description="For producers, exporters, traders, and authorized representatives with verifiable product availability."
            />
          </div>
        </div>
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
            <ContactItem label="Founder" value={`${company.founder}, ${company.title}`} />
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
