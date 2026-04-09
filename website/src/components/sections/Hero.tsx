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
     * Stripe-style hero:
     * - Deep navy (#0A2540) base with purple/cyan gradient mesh
     * - Center-aligned headline with gradient text accent
     * - Pill CTA buttons with glow shadow
     * - Stats band at bottom
     */
    <section className="relative overflow-hidden bg-[#0A2540] pt-24 pb-28 lg:pt-36 lg:pb-40">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #635BFF 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,91,255,0.3) 0%, transparent 50%, rgba(0,212,255,0.2) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#635BFF]" />
          <span className="text-white/80 text-xs font-medium tracking-[0.8px] uppercase">
            SHINESOFT CORPORATION
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-[#ffffff] font-bold leading-[1.12] mb-6 mx-auto max-w-4xl"
          style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)", fontWeight: 700 }}
        >
          <span className="block">{t.catch1}</span>
          <span
            className="block mt-1"
            style={{
              background: "linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.catch2}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-[#ADB5BD] mx-auto max-w-[600px] mb-10"
          style={{ fontSize: "18px", lineHeight: 1.7 }}
        >
          {t.sub}
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/services/software`}
            className="inline-flex items-center gap-2 bg-[#635BFF] hover:bg-[#4F46E5] text-[#ffffff] px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 shadow-[rgba(99,91,255,0.5)_0px_8px_30px] hover:shadow-[rgba(99,91,255,0.65)_0px_10px_36px] hover:-translate-y-0.5"
          >
            {t.cta}
            <ArrowRight size={16} />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-[#ffffff] px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
          >
            {t.contact}
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Stats band */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto border-t border-white/10 pt-10">
          {[
            { value: "2006", label: "設立年" },
            { value: "103", label: "社員数" },
            { value: "ISMS", label: "MSA-IS-338" },
            { value: "KCSP", label: "Kubernetes認定" },
          ].map((stat) => (
            <div key={stat.value} className="text-center">
              <div
                className="text-[#ffffff] font-bold"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
              >
                {stat.value}
              </div>
              <div className="text-[#8898AA] text-xs tracking-[0.8px] uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
