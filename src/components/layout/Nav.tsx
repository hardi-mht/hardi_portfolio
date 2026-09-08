"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

/**
 * Clara is deliberately absent: it is work done inside the AppVentory role,
 * not a thing of its own, and a menu entry alongside About/Projects would read
 * as a product owned outright. Its section still scrolls past in place, and
 * the spy leaves "Experience" lit while you are in it — which is accurate.
 */
const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    // A band across the middle of the viewport decides what counts as "here".
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));

    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between gutter py-4 transition-colors duration-300",
        scrolled && "bg-bg/70 backdrop-blur-xl",
      )}
    >
      <a
        href="#hero"
        data-cursor="hover"
        aria-label={`${profile.initials} — ${profile.name}, back to top`}
        className="font-mono text-sm font-bold tracking-[0.18em] text-text"
      >
        {profile.initials}
        <span className="text-accent">.</span>
      </a>

      <nav aria-label="Sections" className="hidden md:block">
        <ul className="flex items-center gap-1 rounded-full border border-border bg-surface/70 px-2 py-1.5 backdrop-blur-xl">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                data-cursor="hover"
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "block rounded-full px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors",
                  active === link.id
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:text-text",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href="#contact"
        data-cursor="hover"
        className="rounded-full bg-accent px-4 py-2 font-mono text-[0.6875rem] font-bold tracking-[0.14em] text-on-accent uppercase transition-opacity hover:opacity-90"
      >
        Get in touch
      </a>
    </header>
  );
}
