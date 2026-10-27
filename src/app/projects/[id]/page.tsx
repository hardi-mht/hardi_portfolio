import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { Chip } from "@/components/ui/Chip";
import { Footer } from "@/components/layout/Footer";

type Params = { params: Promise<{ id: string }> };

/** Static export needs the full set of routes up front. */
export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <>
      <main className="gutter pt-32 pb-24">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors hover:text-accent"
          >
            <ArrowLeft aria-hidden className="size-3.5" />
            All projects
          </Link>

          <header className="mt-10">
            <p className="mono-label">
              {project.context} · {project.year}
            </p>
            <h1 className="mt-4 text-display-md font-bold text-balance">
              {project.title}
            </h1>
            <p className="mt-4 text-lead text-muted text-pretty">
              {project.tagline}
            </p>
            <p className="mt-6 font-mono text-sm text-accent">{project.role}</p>
          </header>

          <section className="mt-14">
            <h2 className="mono-label">The problem</h2>
            <p className="mt-4 text-lead text-pretty">{project.problem}</p>
          </section>

          <section className="mt-12">
            <h2 className="mono-label">What I did</h2>
            <ul className="mt-5 space-y-4">
              {project.approach.map((item) => (
                <li
                  key={item}
                  className="relative border-l border-border pl-6 leading-relaxed text-muted text-pretty"
                >
                  <span
                    aria-hidden
                    className="absolute top-[0.55em] -left-[3.5px] size-[7px] rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="mono-label">Built with</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Chip key={item} tone="accent" preserveCase>
                  {item}
                </Chip>
              ))}
            </div>
          </section>

          {project.links.length > 0 ? (
            <section className="mt-12 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-mono text-xs font-bold tracking-[0.16em] uppercase transition-colors hover:border-accent hover:text-accent"
                >
                  {link.label}
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </a>
              ))}
            </section>
          ) : null}

          <div className="mt-16 border-t border-border pt-8">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-mono text-xs font-bold tracking-[0.16em] text-on-accent uppercase transition-opacity hover:opacity-90"
            >
              Hire me
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
