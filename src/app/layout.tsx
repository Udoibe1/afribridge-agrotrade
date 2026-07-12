import type { Metadata } from "next";
import { company, companyDescription } from "@/lib/site-data";
import "./globals.css";

const siteUrl = "https://afribridgeagro.trade";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AfriBridge AgroTrade | Russia to Africa Trade Facilitation",
    template: "%s | AfriBridge AgroTrade"
  },
  description: companyDescription,
  applicationName: "AfriBridge AgroTrade",
  keywords: [
    "AfriBridge AgroTrade",
    "agro commodity trade facilitation",
    "Russia Africa trade",
    "African commodity buyers",
    "Africa agro trade",
    "wheat",
    "sugar",
    "sunflower oil",
    "fertilizer"
  ],
  authors: [{ name: "AfriBridge AgroTrade" }],
  creator: "AfriBridge AgroTrade",
  publisher: "AfriBridge AgroTrade",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "AfriBridge AgroTrade",
    title: `AfriBridge AgroTrade | ${company.tagline}`,
    description: companyDescription
  },
  twitter: {
    card: "summary_large_image",
    title: "AfriBridge AgroTrade",
    description:
      "Independent agro-commodity trade facilitation between suppliers and qualified African buyers."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
