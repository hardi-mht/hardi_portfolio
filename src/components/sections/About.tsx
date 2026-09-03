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

        {/* Copy stays in the left lane; the right lane belongs to the 3D
            workstation, where she stands and turns to face the reader. */}
        <div
          data-pin-stage
          className="mt-10 md:mt-14 md:flex md:min-h-[70svh] md:items-center"
        >
          <div className="w-full md:max-w-[48%]">
            <h2 className="text-display-md font-bold text-balance">
              Senior engineer,
              <br />
              <span className="text-gradient">agentic systems.</span>
            </h2>
            <p className="mt-6 text-lead text-muted text-pretty">
              {profile.summary}
            </p>

            <ol data-pin-panels className="mt-10 space-y-5 md:space-y-6">
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
      </div>
    </section>
  );
}
