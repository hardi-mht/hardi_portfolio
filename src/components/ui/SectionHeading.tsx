import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  inverted?: boolean;
  className?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  intro,
  inverted = false,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <div
        className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.18em] uppercase"
        style={{ color: inverted ? "var(--color-ink-muted)" : "var(--color-muted)" }}
      >
        <span className={inverted ? "text-accent-ink" : "text-accent"}>
          {index}
        </span>
        <span
          aria-hidden
          className="h-px w-8"
          style={{
            backgroundColor: inverted
              ? "var(--color-inverted-border)"
              : "var(--color-border)",
          }}
        />
        <span>{label}</span>
      </div>

      <h2
        className="mt-5 text-display-md font-bold text-balance"
        style={{ color: inverted ? "var(--color-ink)" : "var(--color-text)" }}
      >
        {title}
      </h2>

      {intro ? (
        <p
          className="mt-5 text-lead text-pretty"
          style={{ color: inverted ? "var(--color-ink-muted)" : "var(--color-muted)" }}
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
}
