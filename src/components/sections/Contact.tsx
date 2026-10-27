import { Mail, Phone, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { ContactForm } from "@/components/ui/ContactForm";

/**
 * The contact card from reference 4: details, a form and the illustration
 * inside one panel.
 *
 * The card is dark in both themes, deliberately. The illustration carries a
 * baked-in purple background, so a card that followed the light palette would
 * leave it sitting on the page as a cut-out rectangle. Fixing the card to the
 * illustration's own colours lets the two merge, and the section reads as the
 * closing statement it is.
 */
const details = [
  {
    icon: Mail,
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
  { icon: MapPin, value: profile.location },
];

export function Contact() {
  return (
    <section id="contact" className="section-shell gutter">
      <div className="mx-auto max-w-6xl">
        <div
          className="overflow-hidden rounded-3xl"
          style={{
            background:
              "linear-gradient(135deg, #171034 0%, #231750 45%, #2d1f66 100%)",
          }}
        >
          {/* No right padding on wide screens: the illustration runs to the
              card's edge, the way it does in the reference, instead of
              floating in the middle of a column. */}
          <div className="grid items-center gap-10 p-8 md:p-10 lg:grid-cols-[0.9fr_1.05fr_1fr] lg:gap-8 lg:pr-0">
            {/* ---------------- Details ---------------- */}
            <div>
              {/* The eyebrow is "Contact", not "Let's connect": the heading
                  already opens with "Let's", and the pair read as a stutter. */}
              <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-white/55 uppercase">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-bold text-balance text-white md:text-4xl">
                Let&rsquo;s work together.
              </h2>
              {/* Full-time leads, because word order is what tells a hiring
                  manager this page is for them too. */}
              <p className="mt-3 text-white/65 text-pretty">
                Open to full-time roles, contract and freelance work. Tell me
                what you need.
              </p>

              <ul className="mt-8 space-y-4">
                {details.map((detail) => (
                  <li key={detail.value}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        data-cursor="hover"
                        className="inline-flex items-start gap-3 text-sm text-white/75 transition-colors hover:text-white"
                      >
                        <detail.icon
                          aria-hidden
                          className="mt-0.5 size-4 shrink-0 text-accent"
                        />
                        <span className="break-all">{detail.value}</span>
                      </a>
                    ) : (
                      <span className="inline-flex items-start gap-3 text-sm text-white/75">
                        <detail.icon
                          aria-hidden
                          className="mt-0.5 size-4 shrink-0 text-accent"
                        />
                        {detail.value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* ---------------- Form ---------------- */}
            <ContactForm to={profile.email} />

            {/* ---------------- Illustration ---------------- */}
            <img
              src="/contact-point.webp"
              alt=""
              aria-hidden
              loading="lazy"
              className="hidden w-full lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
