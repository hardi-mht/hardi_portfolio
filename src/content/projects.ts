export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  context: string;
  problem: string;
  approach: string[];
  stack: string[];
  links: ProjectLink[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "clara",
    title: "Clara",
    tagline: "An in-product AI assistant, re-architected as an agent",
    year: "2026",
    role: "Architect & lead engineer",
    context: "AppVentory — production",
    problem:
      "Clara ran on a rigid fixed pipeline: every question took the same path, so it could not combine sources, follow up on itself, or handle anything its authors had not scripted in advance.",
    approach: [
      "Replaced the fixed pipeline with a ReAct loop — the model reasons, picks a tool, observes the result, and decides again",
      "Exposed product capabilities as LLM function-calling tools behind a router, so new capabilities are registered rather than hard-wired",
      "Added retrieval over a Qdrant vector store so answers are grounded in product and tenant data",
      "Used Redis for conversation memory and to keep multi-step tool runs fast under load",
    ],
    stack: ["LLM function-calling", "ReAct", "RAG", "Qdrant", "Node.js", "Redis", "AWS"],
    links: [],
    featured: true,
  },
  {
    id: "a-chosen-son",
    title: "A Chosen Son",
    tagline: "Serverless platform for Vedic astrology consultations",
    year: "2023",
    role: "Full-stack",
    context: "Personal project",
    problem:
      "Personalized astrology and numerology reports had to be generated, stored securely and delivered on demand — without running a server to sit idle between consultations.",
    approach: [
      "Built a serverless backend on AWS Lambda so compute exists only while a report is being produced",
      "Stored personalized reports in S3 with scoped access",
      "Fronted the whole thing with API Gateway for frontend–backend communication",
    ],
    stack: ["React", "Chakra UI", "AWS Lambda", "S3", "API Gateway", "HTML", "CSS"],
    links: [],
  },
  {
    id: "finance-tracker",
    title: "Personal Finance Tracker",
    tagline: "Shared-household spending dashboard",
    year: "2025",
    role: "Frontend & dashboard",
    context: "Collaboration",
    problem:
      "Family finances are messy: spending is split across people, categories and time, and some of it arrives automatically while some has to be typed in by hand.",
    approach: [
      "Built the spending dashboard in Next.js and TypeScript, breaking expenses down by category, member and time period",
      "Designed per-member attribution so shared and family finances stay legible",
      "Supported manual transaction entry alongside automated ingestion",
      "Worked with a backend engineer whose pipeline used hybrid rule-based + AI extraction to feed the dashboard",
    ],
    stack: ["Next.js", "TypeScript", "React", "Node.js", "MongoDB"],
    links: [],
  },
  {
    id: "screening-agent",
    title: "AI Application-Screening Agent",
    tagline: "Reviewable candidate evaluations for a hiring team",
    year: "2025",
    role: "Frontend & dashboard",
    context: "Collaboration",
    problem:
      "An automated screening pipeline is only useful if a human can audit what it decided — raw model output is not a hiring decision.",
    approach: [
      "Built a Next.js and TypeScript dashboard for viewing screened applications and evaluation results from MongoDB",
      "Designed the UI to present candidate evaluations and outcomes in a clear, reviewable format for the hiring team",
      "Worked with a backend engineer on the Python screening pipeline — ingestion via the Telegram Bot API, evaluation against role criteria",
    ],
    stack: ["Next.js", "TypeScript", "Python", "MongoDB", "Telegram Bot API"],
    links: [],
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
export const otherProjects = projects.filter((p) => !p.featured);
