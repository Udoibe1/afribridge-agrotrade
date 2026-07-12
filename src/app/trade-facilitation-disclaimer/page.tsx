import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { complianceExclusion, complianceStatement } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Trade Facilitation Disclaimer",
  description: "Trade facilitation disclaimer for AfriBridge AgroTrade.",
  alternates: {
    canonical: "/trade-facilitation-disclaimer"
  }
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Trade Facilitation Disclaimer" updated="July 12, 2026">
      <p>{complianceStatement}</p>
      <p>{complianceExclusion}</p>
      <h2>Independent verification</h2>
      <p>
        Buyers, suppliers, brokers, agents, exporters, importers, financiers, inspectors, logistics providers, and other parties must conduct their own due diligence before relying on any commercial information or proceeding with any transaction.
      </p>
      <h2>No authority unless documented</h2>
      <p>
        AfriBridge AgroTrade should not be treated as a producer, seller, supplier mandate, allocation holder, buyer, exporter, or legal representative unless valid written authorization has been provided and independently verified.
      </p>
    </LegalPage>
  );
}
