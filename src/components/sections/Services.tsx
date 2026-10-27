import { Layers, Smartphone, Wrench, Gauge, Bot, Plug } from "lucide-react";
import { services, type Service } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<Service["icon"], typeof Layers> = {
  layers: Layers,
  smartphone: Smartphone,
  wrench: Wrench,
  gauge: Gauge,
  bot: Bot,
  plug: Plug,
};

export function Services() {
  return (
    <section id="services" className="section-shell gutter">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Services"
          title="What I can do for you."
          intro="What I get hired for."
        />

        <ul
          data-reveal-group
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <li
                key={service.id}
                data-reveal="fade"
                className="panel card-hover group rounded-2xl p-6"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-on-accent">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                  {service.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
