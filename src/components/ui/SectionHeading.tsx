import { cn } from "@/lib/cn";

/**
 * The heading every section opens with: a small label, a display title and an
 * optional line of intro.
 *
 * It used to carry `index`, `context`, `size` and `inverted` props too. The
 * numbering was commented out of the markup, and the other three were only
 * ever passed by the Clara section, which no longer exists — so each was a
 * branch that could not be reached. Dropping `inverted` is what removed the
 * inline `style` attributes: with one colour scheme to serve, ordinary
 * utility classes do the job.
 */
type SectionHeadingProps = {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
};

export function SectionHeading({
  label,
  title,
  intro,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <div className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.18em] text-muted uppercase">
        <span aria-hidden className="h-px w-8 bg-border" />
        <span>{label}</span>
      </div>

      <h2 className="mt-5 text-display-md font-bold text-balance">{title}</h2>

      {intro ? (
        <p className="mt-5 text-lead text-muted text-pretty">{intro}</p>
      ) : null}
    </header>
  );
}
