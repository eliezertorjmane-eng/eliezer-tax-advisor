import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Eliezer Torjmane Tax Advisor",
    template: "%s"
  },
  description: "French-speaking tax advisor in Israel.",
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-ink font-sans antialiased">{children}</body>
    </html>
  );
}
