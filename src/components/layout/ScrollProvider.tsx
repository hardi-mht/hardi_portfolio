"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Owns scrolling for the whole page: Lenis drives it, GSAP's ticker drives
 * Lenis, and ScrollTrigger reads from it. Every animation lives inside a
 * gsap.matchMedia() block, so `prefers-reduced-motion` users get the plain
 * document with no pinning, no parallax, and nothing hidden.
 */
export function ScrollProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    // Exposed as the conventional escape hatch: lets anything outside React
    // (debugging, tooling) drive the page through the same scroll instance.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /**
     * Anchor links go through Lenis so they land in the right place.
     *
     * Two forms are handled. "#about" is a same-page jump. "/#about" is what
     * the nav and footer use, because they also render on /experience and the
     * project pages, where a bare hash finds nothing — it fails silently *and*
     * pushes a history entry, so the back button then returns you to the page
     * you were already on and the whole nav feels dead.
     *
     * On the home page a "/#id" link is intercepted and scrolled. Anywhere
     * else it is left alone, so the browser really does navigate home.
     */
    const onAnchorClick = (event: MouseEvent) => {
      // Let modified clicks (new tab, download, middle-click) behave normally.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"], a[href^="/#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const hash = href.startsWith("/#") ? href.slice(1) : href;
      if (hash === "#") return;

      // Away from home, "/#id" is a genuine navigation — don't swallow it.
      const onHome = window.location.pathname === "/";
      if (href.startsWith("/#") && !onHome) return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -24 });
    };
    document.addEventListener("click", onAnchorClick);

    // Arriving at "/#projects" from another page: the browser's own jump
    // happens before Lenis exists, so it has to be redone once.
    let hashFrame = 0;
    if (window.location.hash.length > 1) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        hashFrame = window.requestAnimationFrame(() => {
          lenis.scrollTo(target as HTMLElement, {
            offset: -24,
            immediate: true,
          });
        });
      }
    }

    const mm = gsap.matchMedia();

    mm.add(
      {
        motionOk: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        const { motionOk, desktop } = context.conditions as {
          motionOk: boolean;
          desktop: boolean;
        };
        if (!motionOk) return;

        // --- Hero headline lines ---
        gsap.set("[data-reveal='line']", { yPercent: 110 });
        gsap.to("[data-reveal='line']", {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          delay: 0.15,
        });

        // --- Hero supporting copy: on load, not on scroll ---
        gsap.fromTo(
          "[data-reveal='rise']",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.09,
            delay: 0.35,
          },
        );

        // --- Grid staggers ---
        // A [data-reveal-group] animates its own children in sequence, so a
        // row of cards arrives one after another instead of as one block.
        // Collected first, and skipped by the generic pass below, or each
        // card would be animated twice and fight itself.
        const grouped = new Set<HTMLElement>();
        gsap.utils
          .toArray<HTMLElement>("[data-reveal-group]")
          .forEach((group) => {
            const children = gsap.utils.toArray<HTMLElement>(
              group.querySelectorAll("[data-reveal='fade']"),
            );
            if (children.length === 0) return;
            children.forEach((child) => grouped.add(child));

            gsap.fromTo(
              children,
              { opacity: 0, y: 26 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.08,
                scrollTrigger: { trigger: group, start: "top 85%", once: true },
              },
            );
          });

        // --- Generic scroll reveals ---
        const reveals = gsap.utils
          .toArray<HTMLElement>("[data-reveal='fade']")
          .filter((el) => !grouped.has(el));
        reveals.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        // --- Pointer tilt on cards (fine pointers only) ---
        const tiltCleanups: Array<() => void> = [];
        if (desktop && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((card) => {
            const rotX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
            const rotY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });

            const onMove = (e: PointerEvent) => {
              const r = card.getBoundingClientRect();
              rotX(-((e.clientY - r.top) / r.height - 0.5) * 5);
              rotY(((e.clientX - r.left) / r.width - 0.5) * 5);
            };
            const onLeave = () => {
              rotX(0);
              rotY(0);
            };

            gsap.set(card, { transformPerspective: 900, transformOrigin: "center" });
            card.addEventListener("pointermove", onMove);
            card.addEventListener("pointerleave", onLeave);
            tiltCleanups.push(() => {
              card.removeEventListener("pointermove", onMove);
              card.removeEventListener("pointerleave", onLeave);
            });
          });
        }

        // --- Pinned About sequence (desktop only) ---
        if (desktop) {
          const stage = document.querySelector<HTMLElement>("[data-pin-stage]");
          const panelList =
            document.querySelector<HTMLElement>("[data-pin-panels]");
          const panels = gsap.utils.toArray<HTMLElement>("[data-pin-panel]");

          if (stage && panelList && panels.length > 1) {
            // Stacking is opt-in so the un-animated document stays readable.
            panelList.dataset.stacked = "true";

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: stage,
                start: "center center",
                end: () => `+=${panels.length * 60}%`,
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            gsap.set(panels[0], { opacity: 1, y: 0 });
            gsap.set(panels.slice(1), { opacity: 0, y: 40 });

            // Sequential hand-offs: hold, swap, hold. Relative positions keep
            // exactly one transition in flight at any scroll position.
            panels.forEach((panel, i) => {
              if (i === 0) return;
              tl.to(
                panels[i - 1],
                { opacity: 0, y: -40, duration: 0.4, ease: "power2.in" },
                "+=0.5",
              ).to(
                panel,
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                "<0.15",
              );
            });
            tl.to({}, { duration: 0.5 });
          }
        }

        return () => {
          tiltCleanups.forEach((fn) => fn());
          const panelList =
            document.querySelector<HTMLElement>("[data-pin-panels]");
          if (panelList) delete panelList.dataset.stacked;
          gsap.set(
            "[data-reveal='fade'], [data-reveal='rise'], [data-reveal='line'], [data-pin-panel], [data-tilt]",
            { clearProps: "all" },
          );
        };
      },
    );

    ScrollTrigger.refresh();

    return () => {
      if (hashFrame) window.cancelAnimationFrame(hashFrame);
      document.removeEventListener("click", onAnchorClick);
      mm.revert();
      gsap.ticker.remove(raf);
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return null;
}
