import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "株式会社シャインソフト | SHINESOFT CORPORATION",
  description:
    "最先端のIT技術で社会に貢献する。ソフトウェア開発・クラウドサービス・ITトレーニングを提供する株式会社シャインソフトの公式サイト。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
