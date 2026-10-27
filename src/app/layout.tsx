import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import { profile } from "@/content/profile";
import { ScrollProvider } from "@/components/layout/ScrollProvider";
import { Nav } from "@/components/layout/Nav";
import { Preloader } from "@/components/layout/Preloader";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ControlDock } from "@/components/layout/ControlDock";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/**
 * Body text only. Space Grotesk is a display face — its tight apertures and
 * characterful g and y earn their keep in a headline and work against you in
 * a paragraph. Inter was drawn for small sizes and gets out of the way.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const siteUrl = "https://hardimehta.dev";
const description =
  "Web developer with 5+ years building and scaling applications with React, Node.js and the MERN stack — SaaS platforms, REST APIs and AWS infrastructure. Available for contract, freelance and full-time work.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Hardi Mehta",
    "Senior Software Engineer",
    "Agentic AI",
    "LLM tool-calling",
    "RAG",
    "React",
    "Node.js",
    "MERN",
    "Ahmedabad",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  colorScheme: "light dark",
};

/**
 * Applies a stored theme choice before first paint. Without this the page
 * renders in the system theme and then snaps to the chosen one.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("hm-theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The theme script sets data-theme before React hydrates, so the server
    // HTML and the client tree differ on <html> by design.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Preloader />
        <ScrollProvider />
        <CustomCursor />
        <Nav />
        {children}
        <ControlDock />
      </body>
    </html>
  );
}
