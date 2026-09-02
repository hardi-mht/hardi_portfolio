export const profile = {
  name: "Hardi Mehta",
  firstName: "Hardi",
  lastName: "Mehta",
  initials: "HM",
  title: "Senior Software Engineer",
  tagline: "I architect agentic AI systems.",
  location: "Ahmedabad, Gujarat, India",
  locationShort: "Ahmedabad, India",
  email: "hardi.mht45@gmail.com",
  phone: "+91 74350 84418",
  linkedin: "https://www.linkedin.com/in/hardi-mehta/",
  resumePath: "/HardiMehta_Resume.pdf",
  yearsExperience: "5+",

  summary:
    "Senior Software Engineer with 5+ years of experience building and scaling modern web applications using React, Node.js, and the MERN stack. Currently focused on architecting agentic AI systems — including the redesign of an in-product AI assistant using LLM tool-calling, RAG, and multi-tool orchestration — alongside backend development, RESTful APIs, and third-party integrations.",

  /** The three beats of the pinned About sequence. */
  aboutPanels: [
    {
      label: "01 / FOUNDATION",
      heading: "Five years of shipping the web.",
      body: "React, Node.js and the MERN stack, from an e-commerce platform handling 5M+ product records to a multi-tenant SaaS built from the ground up. Hands-on with AWS and application deployment throughout.",
    },
    {
      label: "02 / FOCUS",
      heading: "Now: agentic AI systems.",
      body: "I redesigned Clara, AppVentory's in-product AI assistant, from a rigid fixed pipeline into an agentic tool-calling system on a ReAct architecture — LLM function-calling, RAG over Qdrant, Node.js and Redis.",
    },
    {
      label: "03 / PRACTICE",
      heading: "Decisions, reviews, mentorship.",
      body: "I drive technical decision-making and architecture direction within the team, review pull requests, enforce code quality standards, and mentor junior engineers — including running technical interviews. Domains: SaaS, FinOps, and e-commerce.",
    },
  ],
} as const;

export type Profile = typeof profile;
