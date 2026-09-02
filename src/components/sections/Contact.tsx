import { ArrowUpRight, Download, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";

export function Contact() {
  return (
    <section id="contact" className="section-shell gutter">
      <div className="mx-auto max-w-6xl">
        <p className="mono-label">
          <span className="text-accent">07</span>
          <span aria-hidden className="mx-3 inline-block h-px w-8 align-middle bg-border" />
          Contact
        </p>

        <h2 className="mt-8 text-display-lg font-bold text-balance">
          Let&rsquo;s build
          <br />
          <span className="text-gradient">something real.</span>
        </h2>

        <p className="mt-8 max-w-xl text-lead text-muted text-pretty">
          Open to senior and staff engineering roles, and to conversations about
          agentic AI in production. Based in {profile.locationShort}.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs font-bold tracking-[0.14em] text-bg uppercase transition-opacity hover:opacity-90"
          >
            <Mail aria-hidden className="size-4" />
            {profile.email}
          </a>

          <CopyEmailButton email={profile.email} />

          <a
            href={profile.resumePath}
            download
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 font-mono text-xs tracking-[0.1em] text-muted uppercase transition-colors hover:border-accent/50 hover:text-accent"
          >
            <Download aria-hidden className="size-3.5" />
            Download CV
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 font-mono text-xs tracking-[0.1em] text-muted uppercase transition-colors hover:border-accent/50 hover:text-accent"
          >
            LinkedIn
            <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
