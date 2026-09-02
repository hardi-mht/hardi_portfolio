import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="gutter border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <p className="font-mono text-xs text-muted">
          Built with Next.js, Three.js &amp; GSAP
        </p>

        <a
          href="#hero"
          data-cursor="hover"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-accent"
        >
          Back to top
          <ArrowUp
            aria-hidden
            className="size-3.5 transition-transform group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </footer>
  );
}
