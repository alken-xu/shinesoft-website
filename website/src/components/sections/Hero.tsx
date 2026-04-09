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
     * HashiCorp hero: full-width dark (#15181e), generous vertical padding
     * Large bold heading (600), relaxed subtitle, dual CTA buttons
     */
    <section className="bg-[#15181e] pt-16 pb-0 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="max-w-[720px]">
          {/* Uppercase eyebrow label */}
          <p className="hc-label text-[#656a76] mb-5">
            SHINESOFT CORPORATION
          </p>

          {/* Display headline: weight 600, tight line-height */}
          <h1
            className="text-[#efeff1] leading-[1.17] mb-6 font-semibold"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            {t.catch1}
            <br />
            <span className="text-[#2b89ff]">{t.catch2}</span>
          </h1>

          {/* Subtitle: system-ui 20px, relaxed 1.50 */}
          <p
            className="text-[#d5d7db] mb-10 max-w-[560px]"
            style={{ fontSize: "18px", lineHeight: 1.6 }}
          >
            {t.sub}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Primary: dark with border */}
            <Link
              href={`/${locale}/services/software`}
              className="inline-flex items-center gap-2 bg-[#1e2028] hover:bg-[#262830] border border-[rgba(178,182,189,0.3)] text-[#d5d7db] hover:text-[#efeff1] px-5 py-2.5 rounded-md text-sm font-medium transition-all shadow-sm"
              style={{ boxShadow: "rgba(97,104,117,0.05) 0px 1px 1px, rgba(97,104,117,0.05) 0px 2px 2px" }}
            >
              {t.cta} <ArrowRight size={15} />
            </Link>
            {/* Secondary: white bg */}
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#f1f2f3] text-[#3b3d45] px-5 py-2.5 rounded-md text-sm font-medium transition-all"
              style={{ boxShadow: "rgba(97,104,117,0.05) 0px 1px 1px, rgba(97,104,117,0.05) 0px 2px 2px" }}
            >
              {t.contact} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats band — dark surface, border top */}
      <div className="border-t border-[rgba(178,182,189,0.12)] bg-[#0d0e12]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[rgba(178,182,189,0.12)]">
            {[
              { value: "2006", label: "設立年" },
              { value: "103", label: "社員数" },
              { value: "ISMS", label: "MSA-IS-338" },
              { value: "KCSP / KTP", label: "Kubernetes 認定" },
            ].map((stat) => (
              <div key={stat.value} className="py-6 px-6 text-center">
                <div
                  className="text-[#efeff1] font-semibold leading-tight mb-1"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                >
                  {stat.value}
                </div>
                <div className="hc-label text-[#656a76]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
