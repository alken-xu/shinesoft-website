import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale } from "@/lib/dictionaries";
import { getNewsPost, getAllNews } from "@/lib/news";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const news = getAllNews();
  const locales = ["ja", "en", "zh"];
  return locales.flatMap((locale) =>
    news.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  return { title: post?.title || "News" };
}

const backLabels = { ja: "ニュース一覧に戻る", en: "Back to News", zh: "返回新闻列表" };

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();

  const post = await getNewsPost(slug);
  if (!post) notFound();

  const backLabel = backLabels[locale as "ja" | "en" | "zh"] || backLabels.ja;

  return (
    <>
      <PageHero
        label={post.category}
        title={post.title}
        description={post.date.replace(/-/g, ".")}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-24">
        <AnimatedSection>
          <div className="glass-card rounded-2xl p-8 lg:p-12 mb-8">
            <div
              className="prose-dark"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} /> {backLabel}
          </Link>
        </AnimatedSection>
      </div>
    </>
  );
}
