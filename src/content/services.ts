/**
 * "What I can do for you" — the services grid from references 1 and 2.
 *
 * One line each, deliberately. The long version of every one of these already
 * exists in the experience and project detail pages; this section is for
 * someone deciding in ten seconds whether to keep reading.
 */

export type Service = {
  id: string;
  /** Lucide icon name, resolved in the component. */
  icon: "layers" | "smartphone" | "wrench" | "gauge" | "bot" | "plug";
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "full-stack",
    icon: "layers",
    title: "Full-stack development",
    description:
      "React and Next.js front ends on Node.js services, built end to end.",
  },
  {
    id: "responsive",
    icon: "smartphone",
    title: "Responsive design",
    description:
      "Interfaces that hold up from a phone in one hand to a wide desktop.",
  },
  {
    id: "maintenance",
    icon: "wrench",
    title: "Website maintenance",
    description:
      "Keeping a live product patched, dependable and safe to change.",
  },
  {
    id: "performance",
    icon: "gauge",
    title: "Performance optimization",
    description:
      "Finding what makes a page slow under real traffic, and fixing it.",
  },
  {
    id: "agentic-ai",
    icon: "bot",
    title: "Agentic AI integration",
    description:
      "LLM tool-calling, RAG and multi-step agents that do real work in a product.",
  },
  {
    id: "integrations",
    icon: "plug",
    title: "APIs & integrations",
    description:
      "REST APIs and the third-party services that hang off them, built to last.",
  },
];
