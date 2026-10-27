import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Every project in one grid, Clara included.
 *
 * Clara used to have a featured band of its own above this section. That gave
 * one piece of AI work more weight than the rest of the portfolio combined,
 * which is the wrong signal for someone selling web development — so it is a
 * card here like everything else, strong on its own merits.
 *
 * Each card shows the stack, the first four things that were actually built,
 * and one impact line. The remaining detail stays at /projects/<id> — this
 * section is the index, not the case study.
 */
const FEATURE_COUNT = 4;

export function Projects() {
  return (
    <section id="projects" className="section-shell gutter">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Selected work"
          title="Things I've built."
          intro="Open one for the full story."
        />

        <ul
          data-reveal-group
          className="mt-12 grid gap-5 md:grid-cols-2"
        >
          {projects.map((project) => (
            <li key={project.id} data-reveal="fade">
              <Link
                href={`/projects/${project.id}`}
                className="panel card-hover group flex h-full flex-col rounded-2xl p-6"
              >
                {/* Stack pills sit where the reference puts a cover image. */}
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-accent/10 px-2 py-1 font-mono text-[0.625rem] tracking-[0.08em] text-accent uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold md:text-xl">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-muted transition-colors group-hover:text-accent"
                  />
                </div>

                <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                  {project.tagline}
                </p>

                <h4 className="mt-6 font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
                  Core features
                </h4>
                {/* Two columns throughout: the cards are half-width now, not
                    thirds, so the features have the room for it. */}
                <ul className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                  {project.approach.slice(0, FEATURE_COUNT).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.45em] size-1 shrink-0 rounded-full bg-accent"
                      />
                      {/* The long form of each bullet is on the detail page. */}
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>

                {project.impact ? (
                  <p className="mt-auto flex items-start gap-2 rounded-lg border border-accent/20 bg-accent/[0.06] px-3 py-2.5 pt-2.5 text-xs leading-relaxed text-pretty">
                    <Check
                      aria-hidden
                      className="mt-0.5 size-3.5 shrink-0 text-accent"
                    />
                    {project.impact}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
