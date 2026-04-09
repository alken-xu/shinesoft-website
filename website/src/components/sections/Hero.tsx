import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  locale: string;
  dict: {
    home: {
      hero: {
        catch1: string;
        catch2: string;
        sub: string;
        cta: string;
        contact: string;
      };
    };
  };
}

export default function Hero({ locale, dict }: HeroProps) {
  const t = dict.home.hero;

  return (
    /*
     * Notion-style hero:
     * - Off-white (#F7F6F3) background — like a Notion page
     * - Serif (Lora/Georgia) large heading, centered
     * - Notion Blue CTA + ghost secondary
     * - Minimal decoration: subtle divider line bottom
     */
    <section className="bg-[#F7F6F3] pt-28 pb-24 lg:pt-36 lg:pb-32 relative overflow-hidden">
      {/* Very subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(35,131,226,0.3)] to-transparent" aria-hidden="true" />

      <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Notion-style page icon */}
        <div className="text-5xl mb-6 select-none" aria-hidden="true">💡</div>

        {/* Headline — serif display font */}
        <h1
          className="text-[#37352F] leading-[1.15] mb-5"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 3.75rem)",
            fontWeight: 700,
            fontFamily: "Lora, Georgia, 'Times New Roman', serif",
          }}
        >
          <span className="block">{t.catch1}</span>
          <span className="block text-[#2383E2]">{t.catch2}</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-[#787774] mx-auto max-w-[560px] mb-10"
          style={{ fontSize: "17px", lineHeight: 1.75 }}
        >
          {t.sub}
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/${locale}/services/software`}
            className="inline-flex items-center gap-2 bg-[#2383E2] hover:bg-[#1A73D1] text-[#ffffff] px-6 py-2.5 rounded-md font-medium text-sm transition-colors"
          >
            {t.cta}
            <ArrowRight size={15} />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#F1F0ED] border border-[rgba(55,53,47,0.16)] text-[#37352F] px-6 py-2.5 rounded-md font-medium text-sm transition-colors"
          >
            {t.contact}
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Stats — Notion table-like row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 divide-x divide-[rgba(55,53,47,0.09)] border border-[rgba(55,53,47,0.09)] rounded-md overflow-hidden bg-white">
          {[
            { value: "2006", label: "設立年" },
            { value: "103", label: "社員数" },
            { value: "ISMS", label: "MSA-IS-338" },
            { value: "KCSP", label: "Kubernetes認定" },
          ].map((stat) => (
            <div key={stat.value} className="py-5 px-4 text-center">
              <div className="text-[#37352F] font-semibold text-lg" style={{ fontFamily: "Lora, Georgia, serif" }}>
                {stat.value}
              </div>
              <div className="text-[#9B9A97] text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgba(55,53,47,0.09)]" aria-hidden="true" />
    </section>
  );
}
