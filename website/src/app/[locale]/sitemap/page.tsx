import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale, getDictionary, type Locale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "サイトマップ" };

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const n = dict.nav;
  const base = `/${locale}`;

  const siteLabels = { ja: "サイトマップ", en: "Sitemap", zh: "网站地图" };

  const sections = [
    {
      title: n.about,
      links: [
        { href: `${base}/about/corporate`, label: n.corporate },
        { href: `${base}/about/feature`, label: n.feature },
      ],
    },
    {
      title: n.services,
      links: [
        { href: `${base}/services/software`, label: n.software },
        { href: `${base}/services/infrastructure`, label: n.infrastructure },
        { href: `${base}/services/cloud`, label: n.cloud },
        { href: `${base}/services/training`, label: n.training },
        { href: `${base}/services/research`, label: n.research },
      ],
    },
    {
      title: "Other",
      links: [
        { href: `${base}/news`, label: n.news },
        { href: `${base}/recruit`, label: n.recruit },
        { href: `${base}/contact`, label: n.contact },
        { href: `${base}/privacypolicy`, label: dict.footer.privacy },
      ],
    },
  ];

  return (
    <>
      <PageHero title={siteLabels[locale as "ja" | "en" | "zh"] || "Sitemap"} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-24">
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.title} className="glass-card rounded-2xl p-6">
                <h2 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-slate-400 hover:text-sky-400 text-sm transition-colors flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-600 flex-shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
