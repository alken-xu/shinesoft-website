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
    "text-[#c6c6c6] hover:text-white text-sm tracking-[0.16px] transition-colors leading-loose";

  return (
    /* IBM Carbon footer: #161616 bg, no rounded corners */
    <footer className="bg-[#161616] border-t border-[#393939] mt-0">
      <div className="max-w-[1584px] mx-auto px-4 sm:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 bg-[#0f62fe] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="text-white font-semibold text-sm tracking-wide">SHINESOFT</span>
            </div>
            <p className="text-[#c6c6c6] text-sm leading-relaxed mb-3 tracking-[0.16px]">
              株式会社シャインソフト
            </p>
            <p className="text-[#6f6f6f] text-xs leading-relaxed tracking-[0.16px]">{t.footer.address}</p>
            <p className="text-[#6f6f6f] text-xs mt-1 tracking-[0.16px]">{t.footer.tel}</p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white text-xs font-semibold mb-4 uppercase tracking-[0.32px]">
              {t.nav.about}
            </h3>
            <ul className="space-y-0">
              <li>
                <Link href={`${base}/about/corporate`} className={footerLink}>
                  {t.nav.corporate}
                </Link>
              </li>
              <li>
                <Link href={`${base}/about/feature`} className={footerLink}>
                  {t.nav.feature}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-xs font-semibold mb-4 uppercase tracking-[0.32px]">
              {t.nav.services}
            </h3>
            <ul className="space-y-0">
              {[
                { href: "software", label: t.nav.software },
                { href: "infrastructure", label: t.nav.infrastructure },
                { href: "cloud", label: t.nav.cloud },
                { href: "training", label: t.nav.training },
                { href: "research", label: t.nav.research },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={`${base}/services/${item.href}`} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other */}
          <div>
            <h3 className="text-white text-xs font-semibold mb-4 uppercase tracking-[0.32px]">
              Other
            </h3>
            <ul className="space-y-0">
              {[
                { href: `${base}/news`, label: t.nav.news },
                { href: `${base}/recruit`, label: t.nav.recruit },
                { href: `${base}/contact`, label: t.nav.contact },
                { href: `${base}/privacypolicy`, label: t.footer.privacy },
                { href: `${base}/sitemap`, label: t.footer.sitemap },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#393939] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#6f6f6f] text-xs tracking-[0.32px]">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
