import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const newsDirectory = path.join(process.cwd(), "src/content/news");

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  content?: string;
}

export function getAllNews(): NewsPost[] {
  const fileNames = fs.readdirSync(newsDirectory);

  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(newsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: data.slug || slug,
        title: data.title as string,
        date: data.date as string,
        category: data.category as string,
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  const fileNames = fs.readdirSync(newsDirectory);
  const fileName = fileNames.find((name) => {
    const fullPath = path.join(newsDirectory, name);
    const { data } = matter(fs.readFileSync(fullPath, "utf8"));
    return (data.slug || name.replace(/\.md$/, "")) === slug;
  });

  if (!fileName) return null;

  const fullPath = path.join(newsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(remarkHtml).process(content);

  return {
    slug: data.slug || slug,
    title: data.title as string,
    date: data.date as string,
    category: data.category as string,
    content: processedContent.toString(),
  };
}
