import Link from "next/link";
import type { Locale } from "@/lib/dictionaries";

interface FooterProps {
  locale: Locale;
  dict: {
    footer: {
      address: string;
      tel: string;
      copyright: string;
      privacy: string;
      sitemap: string;
    };
    nav: {
      about: string;
      corporate: string;
      feature: string;
      services: string;
      software: string;
      infrastructure: string;
      cloud: string;
      training: string;
      research: string;
      news: string;
      recruit: string;
      contact: string;
    };
  };
}

export default function Footer({ locale, dict }: FooterProps) {
  const base = `/${locale}`;
  const t = dict;

  return (
    <footer className="bg-[#F7F6F3] border-t border-[rgba(55,53,47,0.09)] mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-[#37352F] flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-[#37352F] font-semibold text-sm">SHINESOFT</span>
            </div>
            <p className="text-[#787774] text-sm leading-relaxed mb-3">株式会社シャインソフト</p>
            <p className="text-[#9B9A97] text-xs leading-relaxed">{t.footer.address}</p>
            <p className="text-[#9B9A97] text-xs mt-1">{t.footer.tel}</p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-[#9B9A97] text-xs font-medium mb-4 uppercase tracking-widest">
              {t.nav.about}
            </h3>
            <ul className="space-y-2.5">
              <li><Link href={`${base}/about/corporate`} className="text-[#787774] hover:text-[#37352F] text-sm transition-colors">{t.nav.corporate}</Link></li>
              <li><Link href={`${base}/about/feature`} className="text-[#787774] hover:text-[#37352F] text-sm transition-colors">{t.nav.feature}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[#9B9A97] text-xs font-medium mb-4 uppercase tracking-widest">
              {t.nav.services}
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "software", label: t.nav.software },
                { href: "infrastructure", label: t.nav.infrastructure },
                { href: "cloud", label: t.nav.cloud },
                { href: "training", label: t.nav.training },
                { href: "research", label: t.nav.research },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={`${base}/services/${item.href}`} className="text-[#787774] hover:text-[#37352F] text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other */}
          <div>
            <h3 className="text-[#9B9A97] text-xs font-medium mb-4 uppercase tracking-widest">
              Other
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: `${base}/news`, label: t.nav.news },
                { href: `${base}/recruit`, label: t.nav.recruit },
                { href: `${base}/contact`, label: t.nav.contact },
                { href: `${base}/privacypolicy`, label: t.footer.privacy },
                { href: `${base}/sitemap`, label: t.footer.sitemap },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[#787774] hover:text-[#37352F] text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[rgba(55,53,47,0.09)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#9B9A97] text-xs">{t.footer.copyright}</p>
          <p className="text-[#C1BEBB] text-xs">株式会社シャインソフト</p>
        </div>
      </div>
    </footer>
  );
}
