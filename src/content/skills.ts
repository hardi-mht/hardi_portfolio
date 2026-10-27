/**
 * Filter buckets for the skills section.
 *
 * The plan called for seven pills, but "Languages" would then have had to sit
 * under Frontend, and PHP is not a frontend language. Eight pills still fit on
 * one row at desktop width, so accuracy wins over the round number.
 */
export const SKILL_FILTERS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "data", label: "Data" },
  { id: "cloud", label: "Cloud" },
  { id: "practice", label: "Practice" },
] as const;

export type SkillFilter = Exclude<
  (typeof SKILL_FILTERS)[number]["id"],
  "all"
>;

export type SkillGroup = {
  id: string;
  label: string;
  /** Which pill reveals this card. "all" is handled by the component. */
  filter: SkillFilter;
  items: string[];
  /** Highlighted groups get the accent treatment in the grid. */
  primary?: boolean;
};

export const skills: SkillGroup[] = [
  {
    id: "ai",
    label: "AI & Automation",
    filter: "ai",
    primary: true,
    items: [
      "LLM Integration",
      "AI Agents (ReAct)",
      "RAG (Qdrant)",
      "Prompt Engineering",
      "OpenAI / Claude / Grok APIs",
      "Workflow Automation",
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    filter: "frontend",
    items: [
      "React.js",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Material UI",
      "Bootstrap",
      "Chakra UI",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    filter: "backend",
    items: ["Node.js", "Express.js"],
  },
  {
    id: "databases",
    label: "Databases",
    filter: "data",
    items: ["MySQL", "MSSQL", "MongoDB"],
  },
  {
    id: "languages",
    label: "Languages",
    filter: "languages",
    items: ["JavaScript", "TypeScript", "PHP"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    filter: "cloud",
    items: ["AWS EC2", "S3", "Lambda", "API Gateway", "Cognito", "SNS", "SES"],
  },
  {
    id: "architecture",
    label: "Architecture",
    filter: "practice",
    primary: true,
    items: ["Microservices", "REST APIs", "System Design"],
  },
  {
    id: "apis",
    label: "APIs",
    filter: "backend",
    items: ["RESTful APIs", "Third-party integrations"],
  },
  {
    id: "auth",
    label: "Authentication",
    filter: "backend",
    items: ["JWT", "OAuth"],
  },
  // {
  //   id: "tools",
  //   label: "Tools",
  //   filter: "practice",
  //   items: ["Git", "Postman", "VS Code", "DBeaver", "Azure DevOps", "GitHub Actions"],
  // },
  // {
  //   id: "practices",
  //   label: "Practices",
  //   filter: "practice",
  //   items: ["Scrum", "Code Reviews"],
  // },

];
