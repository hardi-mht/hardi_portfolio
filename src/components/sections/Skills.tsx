import { skills } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function Skills() {
  return (
    <section id="skills" className="section-shell gutter bg-inverted text-ink">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          label="Toolkit"
          title="What I work with."
          inverted
        />

        {/* Grid lines are per-cell borders; the negative margin lets the wrapper
            clip the trailing edges, so a short last row leaves no stray block. */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-inverted-border">
          <ul className="-mr-px -mb-px grid sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group) => (
              <li
                key={group.id}
                data-reveal="fade"
                className={cn(
                  "border-r border-b border-inverted-border p-6 md:p-7",
                  group.primary ? "bg-ink text-inverted" : "bg-inverted",
                )}
              >
                <p
                  className={cn(
                    "font-mono text-[0.6875rem] tracking-[0.18em] uppercase",
                    group.primary ? "text-accent" : "text-ink-muted",
                  )}
                >
                  {group.label}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "rounded-md border px-2.5 py-1 font-mono text-xs",
                        group.primary
                          ? "border-white/15 bg-white/5 text-inverted"
                          : "border-inverted-border bg-inverted-surface text-ink-muted",
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
