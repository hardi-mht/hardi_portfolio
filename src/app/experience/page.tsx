import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { experience, education } from "@/content/experience";
import { Chip } from "@/components/ui/Chip";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Full role history — AppVentory, and the companies before it: ownership, architecture decisions and the systems other people build on.",
};

/**
 * The long version. The homepage prints one line per role; everything that
 * used to crowd it — every bullet, every stack, the education dates — lives
 * here, where someone has chosen to read it.
 */
export default function ExperiencePage() {
  return (
    <>
      <main className="gutter pt-32 pb-24">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/#experience"
            className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors hover:text-accent"
          >
            <ArrowLeft aria-hidden className="size-3.5" />
            Back
          </Link>

          <h1 className="mt-10 text-display-md font-bold text-balance">
            Full history.
          </h1>

          <ol className="mt-14 space-y-14">
            {experience.map((company) => (
              <li
                key={company.id}
                className="ruled grid gap-6 pt-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10"
              >
                <div className="md:sticky md:top-28 md:self-start">
                  <h2 className="text-xl font-bold">{company.company}</h2>
                  {company.note ? (
                    <p className="mt-1 font-mono text-xs text-muted">
                      {company.note}
                    </p>
                  ) : null}
                  <p className="mt-3 font-mono text-xs tracking-[0.1em] text-muted uppercase">
                    {company.start} — {company.end}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {company.location}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {company.stack.map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                  </div>
                </div>

                <div className="space-y-9">
                  {company.roles.map((role) => (
                    <article key={role.title}>
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <h3 className="text-lg font-semibold">{role.title}</h3>
                        {role.current ? (
                          <span className="font-mono text-[0.625rem] tracking-[0.14em] text-accent uppercase">
                            Current
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 font-mono text-xs tracking-[0.1em] text-muted uppercase">
                        {role.start} — {role.end}
                      </p>

                      <ul className="mt-4 space-y-3">
                        {role.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="relative pl-6 text-[0.9375rem] leading-relaxed text-muted text-pretty"
                          >
                            <span
                              aria-hidden
                              className="absolute top-[0.7em] left-0 h-px w-3 bg-muted/50"
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

          <section className="mt-20">
            <h2 className="text-2xl font-bold">Education</h2>
            <ul className="mt-8">
              {education.map((item) => (
                <li
                  key={item.degree}
                  className="ruled grid gap-x-10 gap-y-2 py-7 md:grid-cols-[minmax(0,14rem)_1fr] md:items-baseline"
                >
                  <p className="mono-label">
                    {item.start} — {item.end}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold">{item.degree}</h3>
                    <p className="mt-1 text-sm text-muted">{item.institution}</p>
                    <p className="mt-2 font-mono text-sm text-accent">
                      {item.score}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
