"use client";

import { useState } from "react";
import { skills, SKILL_FILTERS } from "@/content/skills";
import { logoFor } from "@/content/technologies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/**
 * Eleven skill groups behind eight filter pills.
 *
 * Every card stays mounted and non-matching ones are hidden, rather than the
 * list being filtered down to a new array. Remounting would re-trigger the
 * scroll reveal on every pill press, so each click would fade the whole grid
 * back in — which looks broken once you have clicked twice.
 */
export function Skills() {
  const [active, setActive] = useState<string>("all");

  return (
    <section id="skills" className="section-shell gutter">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Tech stack"
          title="Technologies I work with."
          intro="Eleven areas, filtered however you want to read them."
        />

        {/* ---------------- Filter pills ---------------- */}
        <div
          role="tablist"
          aria-label="Filter skills by area"
          className="mt-10 flex flex-wrap gap-2"
        >
          {SKILL_FILTERS.map((filter) => {
            const selected = active === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(filter.id)}
                data-cursor="hover"
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors",
                  selected
                    ? "border-accent bg-accent text-on-accent"
                    : "border-border text-muted hover:border-accent/50 hover:text-accent",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* ---------------- Category cards ---------------- */}
        <ul data-reveal-group className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => {
            const shown = active === "all" || active === group.filter;
            return (
              <li
                key={group.id}
                data-reveal="fade"
                hidden={!shown}
                className={cn(
                  "panel card-hover rounded-2xl p-6",
                  group.primary && "border-accent/30",
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className={cn(
                      "font-semibold",
                      group.primary && "text-accent",
                    )}
                  >
                    {group.label}
                  </h3>
                  <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted uppercase">
                    {group.items.length} tech
                  </span>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const logo = logoFor(item);
                    return (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-xs"
                      >
                        {logo ? (
                          <img
                            src={logo}
                            alt=""
                            aria-hidden
                            width={14}
                            height={14}
                            loading="lazy"
                            className="size-3.5 object-contain"
                          />
                        ) : null}
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
