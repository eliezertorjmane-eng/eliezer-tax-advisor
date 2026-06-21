import type { Metadata } from "next";
import { siteUrl } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eliezer Torjmane",
    template: "%s"
  },
  description:
    "Conseiller fiscal agréé en Israël pour francophones : ouverture d’un עסק, déclarations fiscales, Ehzer Mass / החזר מס, calculateurs et suivi administratif.",
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
