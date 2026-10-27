import { ArrowUp, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/BrandIcons";

/**
 * A closing CTA band, then one compact row.
 *
 * This replaces a four-column footer. Quick links, services and contact
 * details were all repeating sections the reader had just scrolled past, and
 * a footer that restates the whole page is just a second page.
 *
 * Section links are written as "/#id" rather than "#id" because this footer
 * also renders on the experience and project pages, where a bare hash would
 * look for a section that is not there.
 */
const links = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

const socials = [
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: profile.github, Icon: GitHubIcon },
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
].filter((social) => Boolean(social.href));

export function Footer() {
  return (
    <footer className="gutter">
      {/* No closing CTA band here. It sat directly beneath the contact
          section and asked for the same thing a second time, which reads as
          nagging rather than inviting. */}
      <div className="mx-auto max-w-6xl border-t border-border py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xs">
            <p className="font-mono text-base font-bold tracking-[0.18em]">
              {profile.initials}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
              Web developer building applications end to end — available for
              contract, freelance and full-time work.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noreferrer noopener"
                    : undefined
                }
                aria-label={social.label}
                data-cursor="hover"
                className="grid size-10 place-items-center rounded-xl border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <social.Icon className="size-4" />
              </a>
            ))}

            <a
              href="#"
              aria-label="Back to top"
              data-cursor="hover"
              className="group grid size-10 place-items-center rounded-xl border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowUp
                aria-hidden
                className="size-4 transition-transform group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center font-mono text-xs text-muted">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
