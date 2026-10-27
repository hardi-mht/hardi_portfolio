import { Mail, ExternalLink, ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/BrandIcons";

/**
 * Only the links that exist get an icon. An empty `github` in the profile
 * means no GitHub button, rather than one pointing at a guess.
 */
const socials = [
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: profile.github, Icon: GitHubIcon },
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
].filter((social) => Boolean(social.href));

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden gutter pt-32 pb-16"
    >
      {/* The glow sits behind the illustration and bleeds off the right edge.
          It is the only light source in the section, so everything else can
          stay flat and the eye still has somewhere to land. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[-10%] -z-10 size-[min(42rem,90vw)] -translate-y-1/2 rounded-full opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, var(--color-accent-alt) 45%, transparent 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
          {/* ---------------- Copy ---------------- */}
          <div>
            <p
              data-reveal="rise"
              className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.14em] text-accent uppercase"
            >
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Available for opportunities
            </p>

            <p
              data-reveal="rise"
              className="mt-7 font-mono text-sm tracking-[0.18em] text-accent uppercase"
            >
              Hi, I&rsquo;m
            </p>

            <h1 className="mt-3 text-display-lg font-bold">
              {/* Each line sits in its own clipping mask so it can slide in. */}
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-reveal="line" className="block">
                  {profile.firstName}
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-reveal="line" className="block text-gradient">
                  {profile.lastName}
                </span>
              </span>
            </h1>

            <p
              data-reveal="rise"
              className="mt-5 font-mono text-sm tracking-[0.12em] text-text uppercase"
            >
              {profile.title}
            </p>

            <p
              data-reveal="rise"
              className="mt-6 max-w-lg text-lead text-muted text-pretty"
            >
              {profile.hook.map((segment, i) =>
                segment.accent ? (
                  <strong key={i} className="font-semibold text-accent">
                    {segment.text}
                  </strong>
                ) : (
                  <span key={i}>{segment.text}</span>
                ),
              )}
            </p>

            {/* ---------------- Calls to action ---------------- */}
            <div
              data-reveal="rise"
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-mono text-xs font-bold tracking-[0.16em] text-on-accent uppercase transition-opacity hover:opacity-90"
              >
                Hire me
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-mono text-xs font-bold tracking-[0.16em] uppercase transition-colors hover:border-accent hover:text-accent"
              >
                Explore my work
              </a>
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Resume (opens in a new tab)"
                className="inline-flex items-center gap-2 px-2 py-3 font-mono text-xs tracking-[0.16em] text-muted uppercase transition-colors hover:text-accent"
              >
                <ExternalLink aria-hidden className="size-4" />
                Resume
              </a>
            </div>
          </div>

          {/* ---------------- Illustration + socials ---------------- */}
          {/* The illustration carries its own deep-navy background and its own
              floating props, so it needs no card, no border and no caption
              overlay — anything added here competes with it. */}
          <div className="mx-auto w-full max-w-xl">
            <img
              data-reveal="rise"
              src="/hero-desk.webp"
              alt=""
              aria-hidden
              fetchPriority="high"
              className="w-full rounded-3xl"
            />

            <div
              data-reveal="rise"
              className="mt-6 flex items-center justify-center gap-3"
            >
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
                  className="grid size-11 place-items-center rounded-xl border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <social.Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
