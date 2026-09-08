import { featuredProject } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";

const beforeSteps = ["Question", "Fixed prompt", "One query", "Answer"];

const loopNodes = [
  { id: "reason", label: "Reason", detail: "Model decides what it needs next" },
  { id: "act", label: "Act", detail: "Calls a registered tool via function-calling" },
  { id: "observe", label: "Observe", detail: "Reads the tool result back into context" },
];

const supportingSystems = [
  { label: "Tool router", detail: "Capabilities registered, not hard-wired" },
  { label: "Qdrant", detail: "Vector retrieval over product & tenant data" },
  { label: "Redis", detail: "Conversation memory + fast multi-step runs" },
];

export function Clara() {
  return (
    <section id="clara" className="section-shell gutter">
      <div className="mx-auto max-w-6xl">
        {/* Leads with the work, not the product name — Clara is a module of
            AppVentory's product, and the heading should not imply otherwise. */}
        <SectionHeading
          index="03"
          label="Case study — AppVentory"
          title={
            <>
              Re-architecting a fixed pipeline
              <br className="hidden sm:block" /> into an{" "}
              <span className="text-gradient">agent</span>.
            </>
          }
          context={
            <>
              Clara — AppVentory&rsquo;s in-product AI assistant.{" "}
              <span className="text-accent">{featuredProject.role}</span>.
            </>
          }
          intro={featuredProject.problem}
        />

        {/* Before / after */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          {/* Before */}
          <div className="glass rounded-2xl p-6 md:p-8">
            <p className="mono-label">Before — fixed pipeline</p>
            <ol className="mt-6 space-y-3">
              {beforeSteps.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-md border border-border bg-surface-2 font-mono text-[0.625rem] text-muted">
                    {i + 1}
                  </span>
                  <span className="font-mono text-sm text-muted">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-muted text-pretty">
              Every question took the same path. No combining sources, no
              follow-up, nothing outside what had been scripted in advance.
            </p>
          </div>

          {/* After — the ReAct loop */}
          <div className="glass rounded-2xl p-6 md:p-8">
            <p className="mono-label">
              After — <span className="text-accent">ReAct loop</span>
            </p>

            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {loopNodes.map((node, i) => (
                <li
                  key={node.id}
                  className="relative rounded-xl border border-accent/25 bg-accent/[0.06] p-4"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.16em] text-accent uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 font-semibold">{node.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted text-pretty">
                    {node.detail}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-4 flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-accent-alt uppercase">
              <span aria-hidden>↻</span> repeats until the answer is complete
            </p>

            <div className="mt-6 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
              {supportingSystems.map((system) => (
                <div key={system.label}>
                  <p className="font-mono text-xs font-medium text-text">
                    {system.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted text-pretty">
                    {system.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What I did */}
        <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-12">
          <div>
            <p className="mono-label">What I did</p>
            <p className="mt-3 font-mono text-xs text-muted">
              {featuredProject.context}
            </p>
          </div>
          <ul className="space-y-4">
            {featuredProject.approach.map((item) => (
              <li
                key={item}
                data-reveal="fade"
                className="relative border-l border-border pl-6 text-[0.9375rem] leading-relaxed text-muted text-pretty"
              >
                <span
                  aria-hidden
                  className="absolute top-[0.55em] -left-[3.5px] size-[7px] rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {featuredProject.stack.map((tech) => (
            <Chip key={tech} tone="accent" preserveCase>
              {tech}
            </Chip>
          ))}
        </div>
      </div>
    </section>
  );
}
