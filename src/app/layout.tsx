import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://afribridgeagro.trade";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AfriBridge AgroTrade | Russia to West Africa Trade Facilitation",
    template: "%s | AfriBridge AgroTrade"
  },
  description:
    "AfriBridge AgroTrade facilitates credible agro-commodity trade opportunities between suppliers and qualified buyers across Ghana, Nigeria, and West Africa.",
  applicationName: "AfriBridge AgroTrade",
  keywords: [
    "AfriBridge AgroTrade",
    "agro commodity trade facilitation",
    "Russia West Africa trade",
    "Ghana commodity buyers",
    "Nigeria agro trade",
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
    title: "AfriBridge AgroTrade | Connecting Russian Supply with West African Demand",
    description:
      "Independent agro-commodity trade facilitation for credible suppliers and qualified buyers across Ghana, Nigeria, and West Africa."
  },
  twitter: {
    card: "summary_large_image",
    title: "AfriBridge AgroTrade",
    description:
      "Independent agro-commodity trade facilitation between suppliers and qualified West African buyers."
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
