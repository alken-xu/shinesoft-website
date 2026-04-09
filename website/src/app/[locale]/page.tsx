import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "@/lib/dictionaries";
import { getAllNews } from "@/lib/news";
import Hero from "@/components/sections/Hero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { ArrowRight, Code2, Server, Cloud, GraduationCap, FlaskConical, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ja: "株式会社シャインソフト | 最先端IT技術で社会に貢献する",
    en: "SHINESOFT CORPORATION | Innovating Society with Cutting-Edge IT",
    zh: "株式会社SHINESOFT | 以尖端IT技术贡献社会",
  };
  return { title: titles[locale] || titles.ja };
}

const services = [
  {
    href: "software",
    icon: Code2,
    color: "from-[#635BFF] to-[#4F46E5]",
    ja: { title: "ソフトウェア開発", desc: "要件定義からPoC・設計・実装・保守まで一貫対応。Java・Python・Go・Kubernetes等に対応。" },
    en: { title: "Software Development", desc: "End-to-end software development from requirements to maintenance. Java, Python, Go, Kubernetes and more." },
    zh: { title: "软件开发", desc: "从需求定义到PoC、设计、实施、维护，提供一站式服务。支持Java、Python、Go、Kubernetes等。" },
  },
  {
    href: "infrastructure",
    icon: Server,
    color: "from-[#0A2540] to-[#0D3563]",
    ja: { title: "基盤サービス", desc: "サーバ・ネットワークの設計・構築・運用・保守をトータルサポート。" },
    en: { title: "Infrastructure", desc: "Total support for server and network design, construction, operation, and maintenance." },
    zh: { title: "基础架构服务", desc: "提供服务器和网络的设计、构建、运营、维护全方位支持。" },
  },
  {
    href: "cloud",
    icon: Cloud,
    color: "from-[#00D4FF] to-[#0284C7]",
    ja: { title: "クラウドサービス", desc: "AWS・Azure・GCPを活用したクラウド構築・移行・サーバ仮想化を支援。" },
    en: { title: "Cloud Services", desc: "Cloud construction, migration, and server virtualization using AWS, Azure, and GCP." },
    zh: { title: "云服务", desc: "利用AWS、Azure、GCP构建云环境、迁移及服务器虚拟化支持。" },
  },
  {
    href: "training",
    icon: GraduationCap,
    color: "from-[#F59E0B] to-[#D97706]",
    ja: { title: "ITトレーニング", desc: "日本でも数少ないKTP認定。Kubernetes・Linux・Webアプリ開発研修を提供。" },
    en: { title: "IT Training", desc: "One of few KTP-certified providers in Japan. Kubernetes, Linux, and web development training." },
    zh: { title: "IT培训", desc: "日本为数不多的KTP认证机构。提供Kubernetes、Linux及Web应用开发培训。" },
  },
  {
    href: "research",
    icon: FlaskConical,
    color: "from-[#10B981] to-[#059669]",
    ja: { title: "研究", desc: "OSSの研究推進とCNCF活動への参画。クラウドネイティブ技術を最前線で研究。" },
    en: { title: "Research", desc: "OSS research promotion and CNCF participation. Researching cloud-native technologies at the forefront." },
    zh: { title: "研究", desc: "推进OSS研究并参与CNCF活动。在云原生技术最前沿开展研究。" },
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const news = getAllNews().slice(0, 4);
  const t = dict.home;
  const base = `/${locale}`;

  return (
    <>
      <Hero locale={locale} dict={dict} />

      {/* Mission & Vision — white bg */}
      <section className="py-20 lg:py-28 bg-[#ffffff]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <AnimatedSection>
              <div className="bg-[#F6F9FC] rounded-xl p-8 lg:p-10 h-full border border-[#E6EBF1]">
                <p
                  className="text-xs font-semibold tracking-[1.2px] uppercase mb-4"
                  style={{
                    background: "linear-gradient(135deg, #635BFF, #00D4FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t.mission.label}
                </p>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#0A2540] mb-4 leading-snug">
                  {t.mission.title}
                </h2>
                <p className="text-[#425466] leading-relaxed">{t.mission.body}</p>
              </div>
            </AnimatedSection>

            {/* Vision */}
            <AnimatedSection delay={150}>
              <div className="bg-[#0A2540] rounded-xl p-8 lg:p-10 h-full relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at top right, #635BFF, transparent 70%)" }}
                  aria-hidden="true"
                />
                <p className="relative text-xs font-semibold tracking-[1.2px] uppercase mb-4 text-[#635BFF]">
                  {t.vision.label}
                </p>
                <h2
                  className="relative text-2xl lg:text-3xl font-bold mb-4 leading-snug"
                  style={{
                    background: "linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t.vision.title}
                </h2>
                <p className="relative text-[#ADB5BD] leading-relaxed">{t.vision.body}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats — subtle gray */}
      <section className="py-14 bg-[#F6F9FC] border-y border-[#E6EBF1]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: t.stats.foundedYear, label: t.stats.founded, suffix: "" },
              { value: t.stats.employeesCount, label: t.stats.employees, suffix: t.stats.employeesUnit },
              { value: "KCSP", label: t.stats.kcsp, suffix: "" },
              { value: "KTP", label: t.stats.ktp, suffix: "" },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div>
                  <div
                    className="font-bold mb-1"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      background: "linear-gradient(135deg, #635BFF 0%, #00D4FF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-[#8898AA] text-sm">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services — white bg */}
      <section className="py-20 lg:py-28 bg-[#ffffff]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader label="Services" title={t.services.title} />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const content = svc[locale as "ja" | "en" | "zh"] || svc.ja;
              const Icon = svc.icon;
              return (
                <AnimatedSection key={svc.href} delay={i * 80}>
                  <Link
                    href={`${base}/services/${svc.href}`}
                    className="group block bg-[#ffffff] rounded-xl p-6 border border-[#E6EBF1] hover:border-[#635BFF]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[rgba(99,91,255,0.15)_0px_10px_30px] h-full"
                    style={{ boxShadow: "rgba(50,50,93,0.1) 0px 2px 5px -1px, rgba(0,0,0,0.06) 0px 1px 3px -1px" }}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-5`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="text-[#0A2540] font-semibold text-lg mb-2 group-hover:text-[#635BFF] transition-colors">
                      {content.title}
                    </h3>
                    <p className="text-[#425466] text-sm leading-relaxed">{content.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-[#635BFF] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.services.viewAll} <ArrowRight size={14} />
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* News — light gray bg */}
      <section className="py-20 lg:py-28 bg-[#F6F9FC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <SectionHeader label="Latest" title={t.news.title} className="mb-0" />
              <Link
                href={`${base}/news`}
                className="hidden sm:flex items-center gap-1 text-[#635BFF] hover:text-[#4F46E5] text-sm font-medium transition-colors"
              >
                {t.news.viewAll} <ChevronRight size={16} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="space-y-3">
            {news.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 80}>
                <Link
                  href={`${base}/news/${post.slug}`}
                  className="group flex items-start sm:items-center gap-4 bg-[#ffffff] rounded-xl p-5 border border-[#E6EBF1] hover:border-[#635BFF]/40 hover:shadow-[rgba(99,91,255,0.08)_0px_4px_16px] transition-all duration-200"
                >
                  <span className="inline-block bg-[#EEF2FF] text-[#635BFF] text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap flex-shrink-0">
                    {post.category}
                  </span>
                  <span className="text-[#8898AA] text-sm whitespace-nowrap flex-shrink-0">
                    {post.date.replace(/-/g, ".")}
                  </span>
                  <span className="text-[#425466] text-sm group-hover:text-[#0A2540] transition-colors line-clamp-1 flex-1">
                    {post.title}
                  </span>
                  <ChevronRight size={16} className="text-[#ADB5BD] group-hover:text-[#635BFF] transition-colors ml-auto flex-shrink-0" />
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href={`${base}/news`} className="text-[#635BFF] text-sm font-medium">
              {t.news.viewAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* Recruit CTA — dark navy + purple */}
      <section className="py-20 lg:py-28 bg-[#0A2540]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-2xl bg-[#0D1F35] border border-white/10 p-10 lg:p-16 text-center">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top, #635BFF, transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <h2
                  className="font-bold text-[#ffffff] mb-4"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                >
                  {t.recruit.title}
                </h2>
                <p className="text-[#ADB5BD] text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                  {t.recruit.body}
                </p>
                <Link
                  href={`${base}/recruit`}
                  className="inline-flex items-center gap-2 bg-[#635BFF] hover:bg-[#4F46E5] text-[#ffffff] font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-[rgba(99,91,255,0.5)_0px_8px_30px] hover:-translate-y-0.5"
                >
                  {t.recruit.cta} <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
