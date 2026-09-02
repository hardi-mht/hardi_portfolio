import { cn } from "@/lib/cn";

type ChipProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "accent" | "inverted";
  /** Keep the label's own casing — "ReAct" must not read as "REACT". */
  preserveCase?: boolean;
};

export function Chip({
  children,
  className,
  tone = "default",
  preserveCase = false,
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.6875rem] tracking-[0.12em] whitespace-nowrap",
        preserveCase ? "normal-case" : "uppercase",
        tone === "default" && "border-border bg-surface text-muted",
        tone === "accent" && "border-accent/40 bg-accent/10 text-accent",
        tone === "inverted" &&
          "border-inverted-border bg-inverted-surface text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
