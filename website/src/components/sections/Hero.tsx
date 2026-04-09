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
     * IBM Carbon hero:
     * - White (#ffffff) left half + IBM Blue 60 (#0f62fe) right accent band
     * - Headline: 60px IBM Plex Sans weight 300, line-height 1.17
     * - Rectangular buttons (0px radius), 48px height
     */
    <section className="relative pt-12 overflow-hidden">
      {/* Blue accent band on the right (decorative) */}
      <div
        className="absolute top-0 right-0 h-full w-1/3 bg-[#0f62fe] hidden lg:block"
        aria-hidden="true"
      />
      {/* Subtle grid lines — IBM blueprint feel */}
      <div
        className="absolute inset-0 opacity-[0.04] hidden lg:block"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(#161616 1px, transparent 1px), linear-gradient(90deg, #161616 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[calc(100vh-48px)]">
          {/* Text column — spans 2/3 */}
          <div className="lg:col-span-2 flex flex-col justify-center py-16 lg:py-24 lg:pr-16">
            {/* Eyebrow label */}
            <p className="text-xs font-semibold text-[#0f62fe] tracking-[0.32px] uppercase mb-6">
              SHINESOFT CORPORATION
            </p>

            {/* Display headline — IBM Plex Sans Light 300, 60px */}
            <h1
              className="font-light text-[#161616] leading-[1.17] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 300 }}
            >
              <span className="block">{t.catch1}</span>
              <span className="block text-[#0f62fe]">{t.catch2}</span>
            </h1>

            {/* Subtitle — 16px regular, Gray 70 */}
            <p
              className="text-[#525252] mb-10 max-w-[560px]"
              style={{ fontSize: "16px", lineHeight: 1.5 }}
            >
              {t.sub}
            </p>

            {/* CTA row — IBM Carbon buttons, 0px radius, 48px height */}
            <div className="flex flex-col sm:flex-row gap-0 sm:gap-px">
              <Link
                href={`/${locale}/services/software`}
                className="inline-flex items-center justify-between gap-4 bg-[#0f62fe] hover:bg-[#0353e9] active:bg-[#002d9c] text-white px-4 h-12 text-sm tracking-[0.16px] transition-colors min-w-[200px]"
              >
                {t.cta}
                <ArrowRight size={16} />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-between gap-4 border border-[#0f62fe] text-[#0f62fe] hover:bg-[#edf5ff] px-4 h-12 text-sm tracking-[0.16px] transition-colors min-w-[200px]"
              >
                {t.contact}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right blue panel — decorative content */}
          <div className="hidden lg:flex flex-col justify-center items-start pl-12 py-24 relative z-10">
            {/* Stats floated on blue background */}
            <div className="space-y-8">
              {[
                { value: "2006", label: "設立年" },
                { value: "103", label: "社員数" },
                { value: "ISMS", label: "MSA-IS-338" },
                { value: "KCSP", label: "Kubernetes認定" },
              ].map((stat) => (
                <div key={stat.value} className="border-l-2 border-white/40 pl-4">
                  <div
                    className="text-[#ffffff] leading-tight"
                    style={{ fontSize: "2rem", fontWeight: 300 }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[#ffffff]/70 text-xs tracking-[0.32px] uppercase mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
