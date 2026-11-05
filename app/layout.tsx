import type { Metadata } from "next";
import { siteUrl } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: { type: "website", siteName: "Eliezer Torjmane", images: [{ url: `${siteUrl}/logo.png`, width: 200, height: 200, alt: "Eliezer Torjmane" }] },
  twitter: { card: "summary_large_image", images: [`${siteUrl}/logo.png`] },
  title: {
    default: "Eliezer Torjmane",
    template: "%s"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
