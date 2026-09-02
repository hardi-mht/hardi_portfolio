export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
  /** Highlighted groups get the accent treatment in the grid. */
  primary?: boolean;
};

export const skills: SkillGroup[] = [
  {
    id: "ai",
    label: "AI & Automation",
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
    id: "architecture",
    label: "Architecture",
    primary: true,
    items: ["Microservices", "REST APIs", "System Design"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "Material UI", "Bootstrap", "Chakra UI"],
  },
  { id: "backend", label: "Backend", items: ["Node.js", "Express.js"] },
  { id: "databases", label: "Databases", items: ["MySQL", "MSSQL", "MongoDB"] },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    items: ["AWS EC2", "S3", "Lambda", "API Gateway", "Cognito", "SNS", "SES"],
  },
  { id: "apis", label: "APIs", items: ["RESTful APIs", "Third-party integrations"] },
  { id: "auth", label: "Authentication", items: ["JWT", "OAuth"] },
  {
    id: "tools",
    label: "Tools",
    items: ["Git", "Postman", "VS Code", "DBeaver", "Azure DevOps", "GitHub Actions"],
  },
  { id: "practices", label: "Practices", items: ["Scrum", "Code Reviews"] },
  { id: "languages", label: "Languages", items: ["JavaScript", "TypeScript", "PHP"] },
];
