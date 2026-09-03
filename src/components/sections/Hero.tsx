import { MapPin, ArrowDown } from "lucide-react";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col justify-between gutter pt-32 pb-10"
    >
      <div className="flex-1 flex flex-col justify-center">
        <p
          data-reveal="rise"
          className="mono-label flex items-center gap-2"
        >
          <MapPin aria-hidden className="size-3.5" />
          {profile.locationShort}
        </p>

        <h1 className="mt-6 text-display-xl font-bold">
          {/* Each line sits in its own clipping mask so it can slide in. */}
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-reveal="line" className="block">
              {profile.firstName}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-reveal="line" className="block text-gradient">
              {profile.lastName}
            </span>
          </span>
        </h1>

        <div
          data-reveal="rise"
          className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          <span className="inline-flex items-center rounded-md bg-accent px-3 py-1.5 font-mono text-xs font-bold tracking-[0.2em] text-on-accent uppercase">
            {profile.title}
          </span>
          <span className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
            {profile.yearsExperience} years
          </span>
        </div>

        <p
          data-reveal="rise"
          className="mt-10 max-w-xl text-lead text-muted text-pretty"
        >
          I build and scale web applications with React, Node.js and the MERN
          stack — and I architect the agentic AI systems that sit on top of them.
        </p>
      </div>

      <a
        href="#about"
        data-reveal="rise"
        className="group mx-auto flex flex-col items-center gap-2 font-mono text-[0.625rem] tracking-[0.2em] text-muted uppercase transition-colors hover:text-accent"
      >
        Scroll
        <ArrowDown
          aria-hidden
          className="size-4 transition-transform group-hover:translate-y-1"
        />
      </a>
    </section>
  );
}
