import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale } from "@/lib/dictionaries";
import { getAllNews } from "@/lib/news";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "ニュース" };

const labels = {
  ja: { label: "NEWS", title: "ニュース", desc: "シャインソフトの最新情報をお届けします。" },
  en: { label: "NEWS", title: "News", desc: "Latest updates from SHINESOFT." },
  zh: { label: "新闻", title: "新闻", desc: "SHINESOFT最新资讯。" },
};

export default async function NewsListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const posts = getAllNews();
  const l = labels[locale as "ja" | "en" | "zh"] || labels.ja;

  return (
    <>
      <PageHero label={l.label} title={l.title} description={l.desc} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-4">
          {posts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 60}>
              <Link
                href={`/${locale}/news/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-3 glass-card rounded-xl p-5 hover:border-sky-500/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3 sm:flex-shrink-0">
                  <span className="text-slate-400 text-sm whitespace-nowrap">
                    {post.date.replace(/-/g, ".")}
                  </span>
                  <span className="bg-sky-500/10 text-sky-400 text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap">
                    {post.category}
                  </span>
                </div>
                <span className="text-slate-200 text-sm group-hover:text-white transition-colors sm:flex-1">
                  {post.title}
                </span>
                <ChevronRight
                  size={16}
                  className="text-slate-600 group-hover:text-sky-400 transition-colors ml-auto flex-shrink-0 hidden sm:block"
                />
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </>
  );
}
