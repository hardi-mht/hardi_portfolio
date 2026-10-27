"use client";

import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";

type Field = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Where submissions go.
 *
 * Set to the Apps Script /exec URL from tools/contact-relay.gs and messages
 * land in a Google Sheet and in Telegram. Left unset — which it is until that
 * script is deployed — the form composes a prefilled message in the visitor's
 * own mail client instead. The site is a static export, so there is no server
 * here to post to, and a form that silently goes nowhere is worse than one
 * that visibly hands off.
 *
 * Inlined at build time, so it is public. That is fine: it only accepts
 * messages. The Telegram bot token stays inside the Apps Script, which is
 * the whole reason for the relay.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export function ContactForm({ to }: { to: string }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    // Honeypot. Hidden from people, irresistible to bots.
    company: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (field: Field | "company") =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) =>
        prev[field as Field] ? { ...prev, [field]: undefined } : prev,
      );
      if (status === "error") setStatus("idle");
    };

  const validate = () => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Tell me your name";
    if (!values.email.trim()) next.email = "I need an address to reply to";
    else if (!EMAIL.test(values.email.trim()))
      next.email = "That address looks wrong";
    if (!values.message.trim()) next.message = "Add a message";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const openMailClient = () => {
    const subject = values.subject.trim() || `Message from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    if (!ENDPOINT) {
      openMailClient();
      return;
    }

    setStatus("sending");
    try {
      // text/plain keeps this a "simple" request, so the browser sends it
      // without a CORS preflight — Apps Script does not answer OPTIONS.
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const result = await res.json();
      if (!result.ok) throw new Error(result.error ?? "Relay refused it");

      setStatus("sent");
      setValues({ name: "", email: "", subject: "", message: "", company: "" });
    } catch {
      // Deliberately no automatic retry: the first POST may well have been
      // delivered and only the reply lost, and a retry would arrive twice.
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/45 transition-colors focus:outline-none focus-visible:border-white/60";

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-6">
        <span className="grid size-10 place-items-center rounded-full bg-accent/20 text-accent">
          <Check aria-hidden className="size-5" />
        </span>
        <p className="font-semibold text-white">Message sent.</p>
        <p className="text-sm text-white/65 text-pretty">
          Thanks — it&rsquo;s in my inbox. I usually reply within a day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 font-mono text-[0.625rem] tracking-[0.14em] text-white/55 uppercase underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="sr-only">
            Your name
          </label>
          <input
            id="cf-name"
            value={values.name}
            onChange={update("name")}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            className={`${fieldClass} ${errors.name ? "border-red-400" : "border-white/15"}`}
          />
          {errors.name ? (
            <p className="mt-1.5 text-xs text-red-300">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="cf-email" className="sr-only">
            Your email
          </label>
          <input
            id="cf-email"
            type="email"
            value={values.email}
            onChange={update("email")}
            placeholder="Your email"
            aria-invalid={Boolean(errors.email)}
            className={`${fieldClass} ${errors.email ? "border-red-400" : "border-white/15"}`}
          />
          {errors.email ? (
            <p className="mt-1.5 text-xs text-red-300">{errors.email}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className="sr-only">
          Subject
        </label>
        <input
          id="cf-subject"
          value={values.subject}
          onChange={update("subject")}
          placeholder="Subject"
          className={`${fieldClass} border-white/15`}
        />
      </div>

      <div>
        <label htmlFor="cf-message" className="sr-only">
          Your message
        </label>
        <textarea
          id="cf-message"
          rows={4}
          value={values.message}
          onChange={update("message")}
          placeholder="Your message"
          aria-invalid={Boolean(errors.message)}
          className={`${fieldClass} resize-y ${errors.message ? "border-red-400" : "border-white/15"}`}
        />
        {errors.message ? (
          <p className="mt-1.5 text-xs text-red-300">{errors.message}</p>
        ) : null}
      </div>

      {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-company">Company</label>
        <input
          id="cf-company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update("company")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        data-cursor="hover"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-accent to-accent-alt px-6 py-3 font-mono text-xs font-bold tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-70"
      >
        {status === "sending" ? "Sending" : "Send message"}
        {status === "sending" ? (
          <Loader2 aria-hidden className="size-4 animate-spin" />
        ) : (
          <Send aria-hidden className="size-4" />
        )}
      </button>

      {status === "error" ? (
        <p role="alert" className="text-xs text-red-300">
          That didn&rsquo;t go through.{" "}
          <button
            type="button"
            onClick={openMailClient}
            className="underline underline-offset-4"
          >
            Email me directly
          </button>{" "}
          instead.
        </p>
      ) : null}
    </form>
  );
}
