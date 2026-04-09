import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "株式会社シャインソフト | SHINESOFT CORPORATION",
  description:
    "最先端のIT技術で社会に貢献する。ソフトウェア開発・クラウドサービス・ITトレーニングを提供する株式会社シャインソフトの公式サイト。",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "ja";

  return (
    <html lang={locale} className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;600;700&display=swap"
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
      <body className="min-h-full flex flex-col bg-white text-[#000000]">
        {children}
      </body>
    </html>
  );
}
