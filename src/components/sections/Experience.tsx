import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";

/** Inverted (light) section — the colour flip that punctuates the scroll. */
export function Experience() {
  return (
    <section
      id="experience"
      className="section-shell gutter bg-inverted text-ink"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          label="Experience"
          title="Five years, four companies, one throughline."
          intro="Ownership of core modules, architecture decisions, and the systems other people build on."
          inverted
        />

        <ol className="mt-16 space-y-14 md:space-y-20">
          {experience.map((company) => (
            <li
              key={company.id}
              className="grid gap-6 border-t border-inverted-border pt-8 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-12"
            >
              {/* Sticky company rail */}
              <div className="md:sticky md:top-28 md:self-start">
                <h3 className="text-2xl font-bold tracking-tight">
                  {company.company}
                </h3>
                {company.note ? (
                  <p className="mt-1 font-mono text-xs text-ink-muted">
                    {company.note}
                  </p>
                ) : null}
                <p className="mt-3 font-mono text-xs tracking-[0.1em] text-ink-muted uppercase">
                  {company.start} — {company.end}
                </p>
                <p className="mt-1 font-mono text-xs text-ink-muted">
                  {company.location}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {company.stack.map((tech) => (
                    <Chip key={tech} tone="inverted">
                      {tech}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-10">
                {company.roles.map((role) => (
                  <article key={role.title} data-reveal="fade">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h4 className="text-lg font-semibold">{role.title}</h4>
                      {role.current ? (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-ink-muted uppercase">
                          <span
                            aria-hidden
                            className="size-1.5 rounded-full bg-accent"
                          />
                          Current
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 font-mono text-xs tracking-[0.1em] text-ink-muted uppercase">
                      {role.start} — {role.end}
                    </p>

                    <ul className="mt-4 space-y-3">
                      {role.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="relative pl-6 text-[0.9375rem] leading-relaxed text-ink-muted text-pretty"
                        >
                          <span
                            aria-hidden
                            className="absolute top-[0.6875em] left-0 h-px w-3 bg-ink-muted/50"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
