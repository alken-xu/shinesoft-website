import fs from "fs";
import path from "path";
import matter from "gray-matter";

const aboutDirectory = path.join(process.cwd(), "src/content/about");

export function getAboutContent(page: string, locale: string): Record<string, unknown> {
  const filePath = path.join(aboutDirectory, page, `${locale}.md`);
  const fallbackPath = path.join(aboutDirectory, page, "ja.md");
  const fullPath = fs.existsSync(filePath) ? filePath : fallbackPath;
  const { data } = matter(fs.readFileSync(fullPath, "utf8"));
  return data;
}
