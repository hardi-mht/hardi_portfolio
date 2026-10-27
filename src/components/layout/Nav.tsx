"use client";

import { useEffect, useState } from "react";
// The resume opens in a tab rather than downloading: a visitor reads it
// immediately instead of acquiring a file they may never open, and the same
// URL can be shared on its own — whoever gets it can see the domain it came
// from and find the rest of the portfolio.
import { ExternalLink, Menu, X } from "lucide-react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";

/**
 * No "Home" entry: the HM. logo already links to the top and is the first
 * thing anyone reaches for, so a Home tab would spend one of the few slots
 * in the bar on a destination that is already covered.
 */
const links = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Eight links need 1024px to sit in a row, so below that they live behind a
  // button. Without it the whole of tablet and mobile had no navigation at
  // all — a logo and a Hire me button, and nothing else.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

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
        href="/#hero"
        data-cursor="hover"
        aria-label={`${profile.initials} — ${profile.name}, back to top`}
        className="font-mono text-sm font-bold tracking-[0.18em] text-text"
      >
        {profile.initials}
        <span className="text-accent">.</span>
      </a>

      {/* Eight links plus two buttons need more room than md gives them. */}
      <nav aria-label="Sections" className="hidden lg:block">
        <ul className="flex items-center gap-1 rounded-full border border-border bg-surface/70 px-2 py-1.5 backdrop-blur-xl">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`/#${link.id}`}
                data-cursor="hover"
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "block rounded-full px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.1em] uppercase transition-colors",
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

      <div className="flex items-center gap-2">
        <a
          href={profile.resumePath}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Resume (opens in a new tab)"
          data-cursor="hover"
          className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase transition-colors hover:border-accent hover:text-accent sm:inline-flex"
        >
          <ExternalLink aria-hidden className="size-3.5" />
          Resume
        </a>
        <a
          href="/#contact"
          data-cursor="hover"
          className="rounded-full bg-accent px-4 py-2 font-mono text-[0.6875rem] font-bold tracking-[0.14em] text-on-accent uppercase transition-opacity hover:opacity-90"
        >
          Hire me
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          data-cursor="hover"
          className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent lg:hidden"
        >
          {open ? (
            <X aria-hidden className="size-4" />
          ) : (
            <Menu aria-hidden className="size-4" />
          )}
        </button>
      </div>

      {/* Mobile panel. Rendered only when open so its links stay out of the
          tab order while it is shut. */}
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="absolute inset-x-0 top-full mx-[var(--spacing-gutter)] rounded-2xl border border-border bg-surface p-2 shadow-lg backdrop-blur-xl lg:hidden"
        >
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`/#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "true" : undefined}
                  className={cn(
                    "block rounded-xl px-4 py-3 font-mono text-xs tracking-[0.12em] uppercase transition-colors",
                    active === link.id
                      ? "bg-accent/15 text-accent"
                      : "text-muted hover:bg-overlay hover:text-text",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Resume (opens in a new tab)"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:bg-overlay hover:text-text"
              >
                <ExternalLink aria-hidden className="size-3.5" />
                Resume
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
