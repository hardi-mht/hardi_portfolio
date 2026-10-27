/** One run of the hero line; `accent` lifts it out of the sentence. */
export type HookSegment = { text: string; accent?: boolean };

export const profile = {
  name: "Hardi Mehta",
  firstName: "Hardi",
  lastName: "Mehta",
  initials: "HM",
  title: "Senior Software Engineer",
  location: "Ahmedabad, Gujarat, India",
  locationShort: "Ahmedabad, India",
  email: "hardi.mht45@gmail.com",
  phone: "+91 74350 84418",
  linkedin: "https://www.linkedin.com/in/hardi-mehta/",
  /** Left empty until the real profile exists — the hero hides the icon
   *  rather than linking somewhere invented. */
  github: "",
  resumePath: "/HardiMehta_Resume.pdf",
  yearsExperience: "5+",

  /**
   * The hero line. Two sentences, because nobody reads a third one standing
   * up — it has to land the claim and the proof before the scroll starts.
   *
   * Segments rather than a string so the component can accent the words that
   * matter without any markup living in content, and without the fragile
   * find-and-replace that highlighting a plain string would need.
   */
  hook: [
    { text: "I build " },
    { text: "web applications", accent: true },
    { text: " end to end — the interface, the API, and the infrastructure underneath. Five years with " },
    { text: "React, Node.js and the MERN stack", accent: true },
    { text: ", and the " },
    { text: "AI features", accent: true },
    { text: " that increasingly live inside them." },
  ] as HookSegment[],

  /** One line under the About heading — and it has to stay one line. */
  baseline: "Building web applications that hold up in production.",

  /** The career-vision card. Segments, same as `hook`. */
  careerVision: [
    { text: "Five years building and scaling production web applications on " },
    { text: "React, Node.js and the MERN stack", accent: true },
    {
      text: " — multi-tenant SaaS platforms, e-commerce systems, RESTful APIs, third-party integrations and the AWS infrastructure underneath. I drive architecture decisions, review the work that ships, and mentor the engineers around me. I also build ",
    },
    { text: "AI into products", accent: true },
    {
      text: " where it earns its place — LLM tool-calling, retrieval and agent loops — as part of the same stack rather than a separate specialism.",
    },
  ] as HookSegment[],

  /**
   * "Quick facts" — how I work, not what my phone number is. Contact details
   * live in the contact card and the footer; repeating them here would make
   * this a second business card instead of a reason to keep reading.
   */
  quickFacts: [
    { icon: "code", text: "Clean, maintainable code the next person can change safely" },
    { icon: "layers", text: "Comfortable across the stack — React through Node to AWS" },
    { icon: "users", text: "Mentor junior engineers and run technical interviews" },
    { icon: "compass", text: "Drive architecture decisions and review what ships" },
    { icon: "sparkles", text: "Build AI features into products where they earn their place" },
    { icon: "handshake", text: "Open to contract, freelance and full-time work" },
  ] as const,

  /** The three beats of the About arc — headings are what the page shows. */
  aboutPanels: [
    {
      label: "01 / FOUNDATION",
      heading: "Five years of shipping the web.",
      body: "React, Node.js and the MERN stack, from an e-commerce platform handling 5M+ product records to a multi-tenant SaaS built from the ground up. Hands-on with AWS and application deployment throughout.",
    },
    {
      label: "02 / FOCUS",
      heading: "Full stack: interface to infrastructure.",
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
