import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Atom-lite — local-first, model-agnostic coding agent",
  description:
    "A local-first, model-agnostic coding agent for the terminal. One agent loop, ten built-in tools, durable sessions, no account or telemetry required.",
  openGraph: {
    title: "Atom-lite — local-first, model-agnostic coding agent",
    description:
      "Tiny core, strong primitives. Run it against local or hosted models with no account, telemetry, or control plane.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
