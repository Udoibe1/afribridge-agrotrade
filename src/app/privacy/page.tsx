import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for AfriBridge AgroTrade.",
  alternates: {
    canonical: "/privacy"
  }
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 12, 2026">
      <p>
        AfriBridge AgroTrade collects business contact and trade inquiry information only for trade facilitation review, supplier engagement, buyer qualification, communication, and related administrative purposes.
      </p>
      <h2>Information collected</h2>
      <p>
        Information may include names, company details, business email addresses, phone or WhatsApp contacts, websites, product requirements, supply capability details, destination markets, and messages submitted through the website.
      </p>
      <h2>Use of information</h2>
      <p>
        Submitted information is reviewed to assess commercial fit, coordinate introductions, request clarification, and support documentation flow between qualified trade parties. AfriBridge does not sell personal information.
      </p>
      <h2>Sharing</h2>
      <p>
        Information may be shared with relevant counterparties only where needed for legitimate trade facilitation, due diligence, or commercial communication. Counterparties remain responsible for their own verification and compliance checks.
      </p>
      <h2>Contact</h2>
      <p>
        Privacy questions can be sent to{" "}
        <a href={`mailto:${company.primaryEmail}`}>{company.primaryEmail}</a>.
      </p>
    </LegalPage>
  );
}
