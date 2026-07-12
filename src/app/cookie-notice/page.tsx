import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Cookie Notice",
  description: "Cookie notice for AfriBridge AgroTrade.",
  alternates: {
    canonical: "/cookie-notice"
  }
};

export default function CookieNoticePage() {
  return (
    <LegalPage title="Cookie Notice" updated="July 12, 2026">
      <p>
        This website is designed to operate without advertising cookies or third-party tracking cookies. Basic technical data may be processed by the hosting provider to deliver pages, protect the service, and maintain security logs.
      </p>
      <h2>Forms</h2>
      <p>
        Form submissions may process the information entered by the user for trade facilitation review. The website does not require cookies for inquiry forms.
      </p>
      <h2>Contact</h2>
      <p>
        Cookie questions can be sent to{" "}
        <a href={`mailto:${company.primaryEmail}`}>{company.primaryEmail}</a>.
      </p>
    </LegalPage>
  );
}
