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
     * Vercel-style hero:
     * - Pure black (#000) background
     * - Huge centered headline, white → gray gradient text
     * - White primary CTA button (black text), ghost secondary
     * - Minimal decorations: subtle radial glow + grid lines
     */
    <section className="relative bg-[#000000] overflow-hidden pt-28 pb-32 lg:pt-40 lg:pb-44">
      {/* Subtle radial glow at top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top center, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Very subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow — thin bordered badge */}
        <div className="inline-flex items-center gap-2 border border-[#333333] rounded-full px-4 py-1 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff] inline-block" />
          <span className="text-[#888888] text-xs font-medium tracking-[0.8px] uppercase">
            SHINESOFT CORPORATION
          </span>
        </div>

        {/* Headline — white → gray gradient */}
        <h1
          className="font-bold leading-[1.08] mb-6 mx-auto max-w-4xl"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 800,
            background: "linear-gradient(180deg, #FFFFFF 30%, #888888 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <span className="block">{t.catch1}</span>
          <span className="block">{t.catch2}</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-[#888888] mx-auto max-w-[540px] mb-10"
          style={{ fontSize: "17px", lineHeight: 1.7 }}
        >
          {t.sub}
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Primary: white button, black text */}
          <Link
            href={`/${locale}/services/software`}
            className="inline-flex items-center gap-2 bg-[#ffffff] hover:bg-[#EDEDED] text-[#000000] px-6 py-2.5 rounded-md font-medium text-sm transition-colors"
          >
            {t.cta}
            <ArrowRight size={15} />
          </Link>
          {/* Secondary: ghost button */}
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 border border-[#333333] hover:border-[#555555] text-[#888888] hover:text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors"
          >
            {t.contact}
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Divider + Stats */}
        <div className="mt-20 border-t border-[#222222]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#222222] mt-px">
            {[
              { value: "2006", label: "設立年" },
              { value: "103", label: "社員数" },
              { value: "ISMS", label: "MSA-IS-338" },
              { value: "KCSP", label: "Kubernetes認定" },
            ].map((stat) => (
              <div key={stat.value} className="bg-[#000000] py-8 px-4 text-center">
                <div
                  className="text-[#ffffff] font-semibold mb-1"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
                >
                  {stat.value}
                </div>
                <div className="text-[#555555] text-xs tracking-[0.8px] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
