export type Role = {
  title: string;
  start: string;
  end: string;
  current?: boolean;
  bullets: string[];
};

export type Company = {
  id: string;
  company: string;
  note?: string;
  location: string;
  start: string;
  end: string;
  stack: string[];
  roles: Role[];
};

export const experience: Company[] = [
  {
    id: "appventory",
    company: "AppVentory",
    note: "formerly Coachbar",
    location: "Ahmedabad, India",
    start: "Feb 2024",
    end: "Present",
    stack: ["React", "Node.js", "MongoDB", "Redis", "Qdrant", "AWS", "LLM APIs"],
    roles: [
      {
        title: "Senior Software Engineer",
        start: "Feb 2026",
        end: "Present",
        current: true,
        bullets: [
          "Architected the redesign of Clara, AppVentory's in-product AI assistant, from a rigid fixed pipeline into an agentic, tool-calling system (ReAct architecture) using LLM function-calling, RAG (Qdrant), Node.js and Redis",
          "Drove architecture decisions for Clara and contributed technical input across other modules, working closely with the team on system design",
          "Review pull requests and enforce code quality standards across the team; guide and mentor junior engineers, including involvement in technical interviews",
          "Built and maintained cloud infrastructure using AWS (EC2, S3, Lambda, API Gateway, Cognito, SNS, SES) to support application deployment, performance, and scalability",
        ],
      },
      {
        title: "Software Engineer",
        start: "Feb 2024",
        end: "Jan 2026",
        bullets: [
          "Owned end-to-end architecture and delivery of a multi-tenant SaaS platform built from the ground up using the MERN stack, within a broader system that also included Java-based services",
          "Took ownership of core system modules and contributed to technical decisions, working closely with the team to align delivery with product goals",
          "Built RESTful APIs and backend systems, integrating third-party platforms including QuickBooks, Xero, Mailchimp, SendGrid, Google APIs, and Microsoft Entra ID",
          "Introduced AI-powered features and contributed to code quality standards, improving development velocity",
        ],
      },
    ],
  },
  {
    id: "autodap",
    company: "AutoDAP",
    note: "A Gateway Group Company",
    location: "Ahmedabad, India",
    start: "Jan 2021",
    end: "Jan 2024",
    stack: ["React", "Node.js", "MySQL", "PostgreSQL", "AWS", "REST APIs"],
    roles: [
      {
        title: "Engineer — Software Developer",
        start: "Aug 2021",
        end: "Jan 2024",
        bullets: [
          "Contributed to the design and development of an e-commerce platform managing 5M+ product records, optimized using MySQL",
          "Built reusable, responsive React UI components, reducing development time for new features",
          "Developed and integrated multiple RESTful APIs for third-party integrations; automated background processes using scheduled CRON jobs",
          "Collaborated directly with clients to gather requirements and deliver end-to-end features",
        ],
      },
      {
        title: "Project Trainee",
        start: "Jan 2021",
        end: "Jul 2021",
        bullets: [
          "Built full-stack applications using JavaScript, React, Node.js, and PostgreSQL",
          "Deployed applications on AWS, including a blog platform, hospital management system, and 360° image viewer",
        ],
      },
    ],
  },
  {
    id: "navpad",
    company: "Navpad Infotech",
    location: "Vadodara, India",
    start: "Apr 2020",
    end: "May 2020",
    stack: ["Android", "Java"],
    roles: [
      {
        title: "Intern, Android Developer",
        start: "Apr 2020",
        end: "May 2020",
        bullets: [
          "Developed an Android-based apartment management application for gated communities",
        ],
      },
    ],
  },
  {
    id: "leeway",
    company: "Leeway Softech Private Limited",
    location: "Bhavnagar, India",
    start: "May 2019",
    end: "Jun 2019",
    stack: ["Android", "PHP"],
    roles: [
      {
        title: "Intern, Android Developer",
        start: "May 2019",
        end: "Jun 2019",
        bullets: [
          "Built Android applications for educational and community-based use cases",
          "Developed an admin portal using PHP for managing application data",
        ],
      },
    ],
  },
];

export type Education = {
  degree: string;
  institution: string;
  start: string;
  end: string;
  score: string;
};

export const education: Education[] = [
  {
    degree: "B.Tech in Information Technology",
    institution: "CSPIT, Charusat University",
    start: "Aug 2018",
    end: "Jun 2021",
    score: "CGPA 9.33",
  },
  {
    degree: "Diploma in Information Technology",
    institution: "Sir Bhavsinhji Polytechnic Institute, GTU",
    start: "Aug 2015",
    end: "Jul 2018",
    score: "CGPA 9.87",
  },
];
