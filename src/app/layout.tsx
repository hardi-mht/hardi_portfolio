import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { ScrollProvider } from "@/components/layout/ScrollProvider";
import { Nav } from "@/components/layout/Nav";
import { Preloader } from "@/components/layout/Preloader";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SoundToggle } from "@/components/layout/SoundToggle";
import { SceneMount } from "@/components/three/SceneMount";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const siteUrl = "https://hardimehta.dev";
const description =
  "Senior Software Engineer with 5+ years building and scaling web applications with React, Node.js and the MERN stack — now architecting agentic AI systems with LLM tool-calling and RAG.";

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
  themeColor: "#0a0a0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Preloader />
        <SceneMount />
        <ScrollProvider />
        <CustomCursor />
        <Nav />
        {children}
        <SoundToggle />
      </body>
    </html>
  );
}
