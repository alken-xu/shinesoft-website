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
    <html lang={locale} className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" hrefLang="ja" href="/ja" />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="zh" href="/zh" />
        <link rel="alternate" hrefLang="x-default" href="/ja" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "株式会社シャインソフト",
              alternateName: "SHINESOFT CORPORATION",
              url: "https://shinesoft.co.jp",
              logo: "https://shinesoft.co.jp/logo.png",
              foundingDate: "2006-06-01",
              address: {
                "@type": "PostalAddress",
                streetAddress: "西新橋1-24-16 平和ビル8F",
                addressLocality: "港区",
                addressRegion: "東京都",
                postalCode: "105-0003",
                addressCountry: "JP",
              },
              telephone: "+81-3-6721-5778",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0f172a] text-slate-100">
        <Header locale={locale as Locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
      </body>
    </html>
  );
}
