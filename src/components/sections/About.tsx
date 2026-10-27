import {
  Compass,
  Code2,
  Layers,
  Users,
  Sparkles,
  Handshake,
  Lightbulb,
  Clock,
  MapPin,
} from "lucide-react";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * "Who I am" — baseline, career vision, quick facts, illustration.
 *
 * Quick facts are statements about how I work, not a second copy of the
 * contact card. Name, email and phone all live in the contact section and
 * the footer; the only personal details kept here are experience and
 * location, which a client weighing a contract wants before anything else.
 */
const arc = profile.aboutPanels.map((panel) => panel.heading);

const factIcons = {
  code: Code2,
  layers: Layers,
  users: Users,
  compass: Compass,
  sparkles: Sparkles,
  handshake: Handshake,
} as const;

export function About() {
  return (
    <section id="about" className="section-shell gutter">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="About"
          title="Who I am."
          // intro={profile.baseline}
        />

        {/* The two details worth surfacing early. */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">
            <Clock aria-hidden className="size-3.5 text-accent" />
            {profile.yearsExperience} years experience
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">
            <MapPin aria-hidden className="size-3.5 text-accent" />
            {profile.location}
          </span>
        </div>

        {/* ---------------- Career vision ---------------- */}
        <div
          data-reveal="fade"
          className="mt-10 rounded-2xl border border-accent/30 bg-accent/[0.04] p-6 md:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
              <Compass aria-hidden className="size-5" />
            </span>
            <h3 className="text-lg font-semibold">Career vision</h3>
          </div>

          <p className="mt-5 leading-relaxed text-muted text-pretty">
            {profile.careerVision.map((segment, i) =>
              segment.accent ? (
                <span key={i} className="font-medium text-accent">
                  {segment.text}
                </span>
              ) : (
                <span key={i}>{segment.text}</span>
              ),
            )}
          </p>
        </div>

        {/* ---------------- Quick facts + illustration ---------------- */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_0.55fr] lg:gap-8">
          <div className="panel rounded-2xl p-6 md:p-8">
            <h3 className="flex items-center gap-2.5 text-lg font-semibold">
              <Lightbulb aria-hidden className="size-5 text-accent" />
              Quick facts
            </h3>

            <ul
              data-reveal-group
              className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2"
            >
              {profile.quickFacts.map((fact) => {
                const Icon = factIcons[fact.icon];
                return (
                  <li
                    key={fact.text}
                    data-reveal="fade"
                    className="flex items-start gap-3"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                      <Icon aria-hidden className="size-4" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted text-pretty">
                      {fact.text}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* <ul className="mt-8 space-y-3 border-t border-border pt-6">
              {arc.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-sm font-medium"
                >
                  <span
                    aria-hidden
                    className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {line}
                </li>
              ))}
            </ul> */}

            {/* <a
              href={profile.resumePath}
              download
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-mono text-xs font-bold tracking-[0.16em] uppercase transition-colors hover:border-accent hover:text-accent"
            >
              <Download aria-hidden className="size-4" />
              Download CV..
            </a> */}
          </div>

          <img
            src="/about-wave.webp"
            alt=""
            aria-hidden
            loading="lazy"
            className="mx-auto w-full max-w-xs self-start rounded-2xl lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
