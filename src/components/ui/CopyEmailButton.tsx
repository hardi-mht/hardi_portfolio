"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard can be blocked (insecure context, permissions). The address
      // is visible next to the button, so failing quietly is acceptable here.
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      data-cursor="hover"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 font-mono text-xs tracking-[0.1em] text-muted uppercase transition-colors hover:border-accent/50 hover:text-accent"
    >
      {copied ? (
        <Check aria-hidden className="size-3.5 text-accent" />
      ) : (
        <Copy aria-hidden className="size-3.5" />
      )}
      {copied ? "Copied" : "Copy email"}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </button>
  );
}
