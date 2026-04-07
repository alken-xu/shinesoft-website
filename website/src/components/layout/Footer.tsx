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
    <footer className="bg-[#080f1e] border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-bold text-lg tracking-wide">SHINESOFT</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              株式会社シャインソフト
            </p>
            <p className="text-slate-500 text-xs leading-relaxed">{t.footer.address}</p>
            <p className="text-slate-500 text-xs mt-1">{t.footer.tel}</p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              {t.nav.about}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`${base}/about/corporate`} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                  {t.nav.corporate}
                </Link>
              </li>
              <li>
                <Link href={`${base}/about/feature`} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                  {t.nav.feature}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              {t.nav.services}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "software", label: t.nav.software },
                { href: "infrastructure", label: t.nav.infrastructure },
                { href: "cloud", label: t.nav.cloud },
                { href: "training", label: t.nav.training },
                { href: "research", label: t.nav.research },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={`${base}/services/${item.href}`} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Other
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`${base}/news`} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                  {t.nav.news}
                </Link>
              </li>
              <li>
                <Link href={`${base}/recruit`} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                  {t.nav.recruit}
                </Link>
              </li>
              <li>
                <Link href={`${base}/contact`} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href={`${base}/privacypolicy`} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`${base}/sitemap`} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                  {t.footer.sitemap}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-slate-600 text-xs text-center">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
