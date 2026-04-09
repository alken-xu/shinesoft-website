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
    <footer className="bg-[#0A2540] mt-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#635BFF] to-[#00D4FF] flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-bold text-lg tracking-wide">SHINESOFT</span>
            </div>
            <p className="text-[#ADB5BD] text-sm leading-relaxed mb-4">
              株式会社シャインソフト
            </p>
            <p className="text-[#8898AA] text-xs leading-relaxed">{t.footer.address}</p>
            <p className="text-[#8898AA] text-xs mt-1">{t.footer.tel}</p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white text-xs font-semibold mb-5 uppercase tracking-[1.2px]">
              {t.nav.about}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`${base}/about/corporate`} className="text-[#8898AA] hover:text-white text-sm transition-colors">
                  {t.nav.corporate}
                </Link>
              </li>
              <li>
                <Link href={`${base}/about/feature`} className="text-[#8898AA] hover:text-white text-sm transition-colors">
                  {t.nav.feature}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-xs font-semibold mb-5 uppercase tracking-[1.2px]">
              {t.nav.services}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "software", label: t.nav.software },
                { href: "infrastructure", label: t.nav.infrastructure },
                { href: "cloud", label: t.nav.cloud },
                { href: "training", label: t.nav.training },
                { href: "research", label: t.nav.research },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={`${base}/services/${item.href}`} className="text-[#8898AA] hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other */}
          <div>
            <h3 className="text-white text-xs font-semibold mb-5 uppercase tracking-[1.2px]">
              Other
            </h3>
            <ul className="space-y-3">
              {[
                { href: `${base}/news`, label: t.nav.news },
                { href: `${base}/recruit`, label: t.nav.recruit },
                { href: `${base}/contact`, label: t.nav.contact },
                { href: `${base}/privacypolicy`, label: t.footer.privacy },
                { href: `${base}/sitemap`, label: t.footer.sitemap },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[#8898AA] hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8898AA] text-xs">{t.footer.copyright}</p>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-[#635BFF] to-[#00D4FF] flex items-center justify-center">
              <span className="text-white font-bold" style={{ fontSize: "9px" }}>S</span>
            </div>
            <span className="text-[#8898AA] text-xs font-medium">SHINESOFT CORPORATION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
