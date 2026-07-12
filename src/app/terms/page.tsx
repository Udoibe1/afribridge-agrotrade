import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Website terms of use for AfriBridge AgroTrade.",
  alternates: {
    canonical: "/terms"
  }
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="July 12, 2026">
      <p>
        This website provides general information about AfriBridge AgroTrade and its independent trade facilitation activities. Website content is not an offer to sell, buy, export, finance, inspect, or guarantee any commodity transaction.
      </p>
      <h2>No transaction guarantee</h2>
      <p>
        Any trade opportunity is subject to supplier availability, buyer qualification, counterparty due diligence, contractual agreement, applicable sanctions, trade-control, export-control, customs, and regulatory requirements, and relevant laws.
      </p>
      <h2>User responsibility</h2>
      <p>
        Users are responsible for ensuring that submitted information is accurate, authorized, and not confidential beyond what is necessary for commercial review. Users must obtain independent legal, financial, banking, inspection, tax, customs, and compliance advice where needed.
      </p>
      <h2>Contact</h2>
      <p>
        Terms questions can be sent to{" "}
        <a href={`mailto:${company.primaryEmail}`}>{company.primaryEmail}</a>.
      </p>
    </LegalPage>
  );
}
