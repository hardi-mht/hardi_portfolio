import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/**
 * Centre-line timeline.
 *
 * One card per company rather than per role: AppVentory has two roles, and a
 * card each would break the left/right alternation and imply they were two
 * separate jobs. Roles nest inside their company's card instead.
 *
 * Below `md` the rule moves to the left edge and every card stacks to its
 * right — alternating columns on a phone leaves each card about 150px wide.
 */
export function Experience() {
  return (
    <section id="experience" className="section-shell band gutter">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Experience"
          title="Five years, four companies."
          intro="Ownership of core modules, architecture decisions, and the systems other people build on."
        />

        <div className="relative mt-14">
          {/* The spine. Left-aligned on small screens, centred from md. */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-[7px] w-px bg-border md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-8">
            {experience.map((company, index) => {
              const onLeft = index % 2 === 0;
              return (
                <li
                  key={company.id}
                  data-reveal="fade"
                  className="relative pl-10 md:grid md:grid-cols-2 md:gap-12 md:pl-0"
                >
                  {/* Node on the spine. */}
                  <span
                    aria-hidden
                    className="absolute top-7 left-0 size-[15px] rounded-full border-2 border-accent bg-bg md:left-1/2 md:-translate-x-1/2"
                  />

                  <article
                    className={cn(
                      "panel card-hover rounded-2xl p-6",
                      onLeft
                        ? "md:col-start-1"
                        : "md:col-start-2 md:row-start-1",
                    )}
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-accent uppercase">
                        <Calendar aria-hidden className="size-3" />
                        {company.start} — {company.end}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-muted uppercase">
                        <MapPin aria-hidden className="size-3" />
                        {company.location}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold">
                      {company.company}
                    </h3>
                    {company.note ? (
                      <p className="mt-1 font-mono text-xs text-muted">
                        {company.note}
                      </p>
                    ) : null}

                    <div className="mt-5 space-y-4">
                      {company.roles.map((role) => (
                        <div
                          key={role.title}
                          className="border-l-2 border-border pl-4"
                        >
                          <div className="flex flex-wrap items-baseline gap-x-3">
                            <h4 className="font-semibold">{role.title}</h4>
                            {role.current ? (
                              <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-accent uppercase">
                                <span
                                  aria-hidden
                                  className="size-1.5 rounded-full bg-accent"
                                />
                                Current
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted text-pretty">
                            {role.bullets[0]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        <Link
          href="/experience"
          className="mt-12 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-mono text-xs font-bold tracking-[0.16em] uppercase transition-colors hover:border-accent hover:text-accent"
        >
          Full history
          <ArrowUpRight aria-hidden className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
