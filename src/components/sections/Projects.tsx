import { ArrowUpRight } from "lucide-react";
import { otherProjects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";

export function Projects() {
  return (
    <section id="projects" className="section-shell gutter">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          label="Selected work"
          title="Projects."
          intro="Things I built outside the day job — and a couple where I owned the interface while someone else owned the pipeline."
        />

        <ul className="mt-16 grid gap-5 md:grid-cols-2">
          {otherProjects.map((project) => (
            <li
              key={project.id}
              data-reveal="fade"
              data-tilt
              className="glass group flex flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-accent/40 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mono-label">
                    {project.context} · {project.year}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{project.tagline}</p>
                </div>
                {project.links.length > 0 ? (
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                ) : null}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted text-pretty">
                {project.problem}
              </p>

              <ul className="mt-5 space-y-2.5">
                {project.approach.map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 text-sm leading-relaxed text-muted/85 text-pretty"
                  >
                    <span
                      aria-hidden
                      className="absolute top-[0.65em] left-0 h-px w-2.5 bg-accent/60"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border pt-5">
                {project.stack.map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </div>

              {project.links.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-mono text-xs tracking-[0.1em] text-text uppercase underline underline-offset-4 hover:text-accent"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
