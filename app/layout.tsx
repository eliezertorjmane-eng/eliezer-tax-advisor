import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Eliezer Torjmane Tax Advisor",
    template: "%s"
  },
  description:
    "Conseiller fiscal en Israël pour francophones : ouverture de esek, déclarations, החזר מס et suivi administratif.",
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
