import { education } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  return (
    <section id="education" className="section-shell gutter">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="06" label="Education" title="Where it started." />

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {education.map((item) => (
            <li
              key={item.degree}
              data-reveal="fade"
              className="glass rounded-2xl p-6 md:p-8"
            >
              <p className="mono-label">
                {item.start} — {item.end}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-balance">
                {item.degree}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.institution}</p>
              <p className="mt-5 font-mono text-sm text-accent">{item.score}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
