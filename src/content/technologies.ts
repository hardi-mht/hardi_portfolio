/**
 * Technology marks, used as small logos on the skill tags.
 *
 * Icons come from Devicon over a CDN rather than being committed here: there
 * are a lot of them, they are trademarks belonging to other people, and a
 * pinned CDN path keeps them out of the repo. The version is pinned, not
 * "latest", so a logo redraw upstream cannot silently change the section.
 *
 * `aliases` exist because the skill list and this list name the same things
 * differently — "React.js" against "React", "AWS EC2" against "AWS". Rather
 * than normalising with string surgery that would guess wrong on "S3", each
 * mark declares exactly which skill entries it belongs to.
 */

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

export type Technology = {
  name: string;
  /** Devicon path fragment, e.g. "react/react-original". */
  icon: string;
  /** Other names the same mark should answer to, matched case-insensitively. */
  aliases?: string[];
};

const tech = (
  name: string,
  icon: string,
  aliases?: string[],
): Technology => ({ name, icon: `${DEVICON}/${icon}.svg`, aliases });

export const technologies: Technology[] = [
  tech("React", "react/react-original", ["React.js"]),
  tech("Next.js", "nextjs/nextjs-original"),
  tech("TypeScript", "typescript/typescript-original"),
  tech("JavaScript", "javascript/javascript-original"),
  tech("Node.js", "nodejs/nodejs-original"),
  tech("Express", "express/express-original", ["Express.js"]),
  tech("MongoDB", "mongodb/mongodb-original"),
  tech("MySQL", "mysql/mysql-original"),
  tech("Redis", "redis/redis-original"),
  tech("AWS", "amazonwebservices/amazonwebservices-original-wordmark", [
    "AWS EC2",
    "S3",
    "Lambda",
    "API Gateway",
    "Cognito",
    "SNS",
    "SES",
  ]),
  tech("Tailwind", "tailwindcss/tailwindcss-original", ["Tailwind CSS"]),
  tech("Python", "python/python-original"),
  tech("Git", "git/git-original"),
  tech("HTML5", "html5/html5-original", ["HTML"]),
  tech("CSS3", "css3/css3-original", ["CSS"]),
  tech("Postman", "postman/postman-original"),
  tech("PHP", "php/php-original"),
  tech("Bootstrap", "bootstrap/bootstrap-original"),
  tech("Material UI", "materialui/materialui-original", ["MUI"]),
  tech("VS Code", "vscode/vscode-original"),
];

/** Built once, not per render — this is called for every tag on the page. */
const byName = new Map<string, string>();
for (const item of technologies) {
  byName.set(item.name.toLowerCase(), item.icon);
  for (const alias of item.aliases ?? []) {
    byName.set(alias.toLowerCase(), item.icon);
  }
}

/** The mark for a skill entry, or undefined when there isn't one. */
export function logoFor(name: string): string | undefined {
  return byName.get(name.toLowerCase());
}
