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

  const footerLink =
    "text-[#d5d7db] hover:text-[#efeff1] text-sm transition-colors leading-loose";

  return (
    /* HashiCorp footer: #15181e bg, matching the nav/hero dark */
    <footer className="bg-[#15181e] border-t border-[rgba(178,182,189,0.12)]">
      <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-md bg-[#2264d6] flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="text-[#efeff1] font-semibold text-sm tracking-wide">SHINESOFT</span>
            </div>
            <p className="text-[#d5d7db] text-sm leading-relaxed mb-3">
              株式会社シャインソフト
            </p>
            <p className="text-[#656a76] text-xs leading-relaxed">{t.footer.address}</p>
            <p className="text-[#656a76] text-xs mt-1">{t.footer.tel}</p>
          </div>

          {/* About */}
          <div>
            <h3 className="hc-label text-[#656a76] mb-4">{t.nav.about}</h3>
            <ul>
              <li><Link href={`${base}/about/corporate`} className={footerLink}>{t.nav.corporate}</Link></li>
              <li><Link href={`${base}/about/feature`} className={footerLink}>{t.nav.feature}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="hc-label text-[#656a76] mb-4">{t.nav.services}</h3>
            <ul>
              {[
                { href: "software", label: t.nav.software },
                { href: "infrastructure", label: t.nav.infrastructure },
                { href: "cloud", label: t.nav.cloud },
                { href: "training", label: t.nav.training },
                { href: "research", label: t.nav.research },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={`${base}/services/${item.href}`} className={footerLink}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other */}
          <div>
            <h3 className="hc-label text-[#656a76] mb-4">Other</h3>
            <ul>
              {[
                { href: `${base}/news`, label: t.nav.news },
                { href: `${base}/recruit`, label: t.nav.recruit },
                { href: `${base}/contact`, label: t.nav.contact },
                { href: `${base}/privacypolicy`, label: t.footer.privacy },
                { href: `${base}/sitemap`, label: t.footer.sitemap },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[rgba(178,182,189,0.12)]">
          <p className="text-[#656a76] text-xs">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
