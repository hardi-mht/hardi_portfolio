import { profile } from "@/content/profile";

/**
 * The pinned narrative beat. Markup is written so it reads correctly with no
 * JavaScript at all: three stacked panels in document order. The scroll engine
 * later pins the section and cross-fades between them.
 */
export function About() {
  return (
    <section
      id="about"
      data-pin-section
      className="relative gutter py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase">
          <span className="text-accent">01</span>
          <span aria-hidden className="h-px w-8 bg-border" />
          <span>About</span>
        </div>

        <div
          data-pin-stage
          className="mt-10 grid gap-8 md:mt-14 md:min-h-[70svh] md:grid-cols-[1fr_1.15fr] md:items-center md:gap-16"
        >
          {/* Left rail: the running summary, always visible. */}
          <div data-pin-rail>
            <p className="text-display-md font-bold text-balance">
              Senior engineer,
              <br />
              <span className="text-gradient">agentic systems.</span>
            </p>
            <p className="mt-6 max-w-md text-lead text-muted text-pretty">
              {profile.summary}
            </p>
          </div>

          {/* Right: the three panels the pin sequence steps through. */}
          <ol data-pin-panels className="space-y-5 md:space-y-6">
            {profile.aboutPanels.map((panel, i) => (
              <li
                key={panel.label}
                data-pin-panel={i}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-accent uppercase">
                  {panel.label}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-balance md:text-3xl">
                  {panel.heading}
                </h3>
                <p className="mt-3 font-mono text-sm leading-relaxed text-muted text-pretty">
                  {panel.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
