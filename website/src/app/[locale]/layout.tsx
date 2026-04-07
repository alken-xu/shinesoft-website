import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return [{ locale: "ja" }, { locale: "en" }, { locale: "zh" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ja: "株式会社シャインソフト | 最先端IT技術で社会に貢献する",
    en: "SHINESOFT CORPORATION | Innovating Society with Cutting-Edge IT",
    zh: "株式会社SHINESOFT | 以尖端IT技术贡献社会",
  };
  const descriptions: Record<string, string> = {
    ja: "ソフトウェア開発・クラウドサービス・ITトレーニングを提供。Kubernetes認定（KCSP/KTP）・ISMS取得。東京都港区。",
    en: "Software development, cloud services, and IT training. KCSP/KTP certified, ISMS certified. Tokyo, Japan.",
    zh: "提供软件开发、云服务及IT培训。获得Kubernetes认证（KCSP/KTP）及ISMS认证。日本东京。",
  };

  return {
    title: {
      default: titles[locale] || titles.ja,
      template: `%s | SHINESOFT`,
    },
    description: descriptions[locale] || descriptions.ja,
    alternates: {
      languages: {
        ja: "/ja",
        en: "/en",
        zh: "/zh",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} dict={dict} />
    </>
  );
}
