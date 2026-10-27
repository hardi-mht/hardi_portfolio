import { GraduationCap } from "lucide-react";
import { education } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Two degrees, two chips. Deliberately the shortest section on the page —
 * for someone five years into their career the education is context, not
 * evidence, and the full entries stay on the experience page.
 */
export function Education() {
  return (
    <section id="education" className="section-shell gutter">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Education" title="Where it started." />

        <ul data-reveal-group className="mt-10 grid gap-4 md:grid-cols-2">
          {education.map((item) => (
            <li
              key={item.degree}
              data-reveal="fade"
              className="panel card-hover flex items-start gap-4 rounded-2xl p-5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <GraduationCap aria-hidden className="size-5" />
              </span>

              <div className="min-w-0">
                <h3 className="font-semibold text-balance">{item.degree}</h3>
                <p className="mt-1 text-sm text-muted">{item.institution}</p>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.625rem] tracking-[0.1em] uppercase">
                  <span className="text-muted">
                    {item.start} — {item.end}
                  </span>
                  <span className="text-accent">{item.score}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
