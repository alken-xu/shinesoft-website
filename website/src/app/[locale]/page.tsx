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
    ja: { title: "ソフトウェア開発", desc: "要件定義からPoC・設計・実装・保守まで一貫対応。Java・Python・Go・Kubernetes等に対応。" },
    en: { title: "Software Development", desc: "End-to-end software development from requirements to maintenance. Java, Python, Go, Kubernetes and more." },
    zh: { title: "软件开发", desc: "从需求定义到PoC、设计、实施、维护，提供一站式服务。支持Java、Python、Go、Kubernetes等。" },
  },
  {
    href: "infrastructure",
    icon: Server,
    ja: { title: "基盤サービス", desc: "サーバ・ネットワークの設計・構築・運用・保守をトータルサポート。" },
    en: { title: "Infrastructure", desc: "Total support for server and network design, construction, operation, and maintenance." },
    zh: { title: "基础架构服务", desc: "提供服务器和网络的设计、构建、运营、维护全方位支持。" },
  },
  {
    href: "cloud",
    icon: Cloud,
    ja: { title: "クラウドサービス", desc: "AWS・Azure・GCPを活用したクラウド構築・移行・サーバ仮想化を支援。" },
    en: { title: "Cloud Services", desc: "Cloud construction, migration, and server virtualization using AWS, Azure, and GCP." },
    zh: { title: "云服务", desc: "利用AWS、Azure、GCP构建云环境、迁移及服务器虚拟化支持。" },
  },
  {
    href: "training",
    icon: GraduationCap,
    ja: { title: "ITトレーニング", desc: "日本でも数少ないKTP認定。Kubernetes・Linux・Webアプリ開発研修を提供。" },
    en: { title: "IT Training", desc: "One of few KTP-certified providers in Japan. Kubernetes, Linux, and web development training." },
    zh: { title: "IT培训", desc: "日本为数不多的KTP认证机构。提供Kubernetes、Linux及Web应用开发培训。" },
  },
  {
    href: "research",
    icon: FlaskConical,
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

      {/* Mission & Vision — alternating gray-10 / white */}
      <section className="py-16 lg:py-24 bg-[#f4f4f4]">
        <div className="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#e0e0e0]">
            {/* Mission */}
            <AnimatedSection>
              <div className="bg-[#f4f4f4] p-8 lg:p-12 h-full">
                <p className="text-xs font-semibold text-[#0f62fe] tracking-[0.32px] uppercase mb-4">
                  {t.mission.label}
                </p>
                <h2
                  className="text-[#161616] mb-4 leading-[1.25]"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 300 }}
                >
                  {t.mission.title}
                </h2>
                <p className="text-[#525252] text-sm leading-[1.5] tracking-[0.16px]">
                  {t.mission.body}
                </p>
              </div>
            </AnimatedSection>

            {/* Vision */}
            <AnimatedSection delay={150}>
              <div className="bg-white p-8 lg:p-12 h-full border-l-4 border-[#0f62fe]">
                <p className="text-xs font-semibold text-[#0f62fe] tracking-[0.32px] uppercase mb-4">
                  {t.vision.label}
                </p>
                <h2
                  className="text-[#161616] mb-4 leading-[1.25]"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 300 }}
                >
                  {t.vision.title}
                </h2>
                <p className="text-[#525252] text-sm leading-[1.5] tracking-[0.16px]">
                  {t.vision.body}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats — white bg, full-width border row */}
      <section className="py-0 border-y border-[#e0e0e0] bg-white">
        <div className="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#e0e0e0]">
            {[
              { value: t.stats.foundedYear, label: t.stats.founded, suffix: "" },
              { value: t.stats.employeesCount, label: t.stats.employees, suffix: t.stats.employeesUnit },
              { value: "KCSP", label: t.stats.kcsp, suffix: "" },
              { value: "KTP", label: t.stats.ktp, suffix: "" },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="py-10 px-8 text-center">
                  <div
                    className="text-[#0f62fe] leading-tight mb-2"
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 300 }}
                  >
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-[#525252] text-xs tracking-[0.32px] uppercase">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services — gray-10 bg, Carbon tiles */}
      <section className="py-16 lg:py-24 bg-[#f4f4f4]">
        <div className="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-16">
          <AnimatedSection>
            <SectionHeader
              label={t.services.title}
              title={t.services.title}
              className="text-left mb-10"
            />
          </AnimatedSection>

          {/* 5 tiles in 2+3 layout — separated by 1px gaps (Carbon hairline) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e0e0e0]">
            {services.map((svc, i) => {
              const content = svc[locale as "ja" | "en" | "zh"] || svc.ja;
              const Icon = svc.icon;
              return (
                <AnimatedSection key={svc.href} delay={i * 60}>
                  <Link
                    href={`${base}/services/${svc.href}`}
                    className="group block bg-[#f4f4f4] hover:bg-[#e8e8e8] p-8 h-full transition-colors duration-150"
                  >
                    {/* Icon — flat, IBM Blue */}
                    <div className="w-10 h-10 bg-[#0f62fe] flex items-center justify-center mb-6">
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3
                      className="text-[#161616] mb-3 leading-[1.4]"
                      style={{ fontSize: "20px", fontWeight: 600 }}
                    >
                      {content.title}
                    </h3>
                    <p className="text-[#525252] text-sm leading-[1.5] tracking-[0.16px] mb-6">
                      {content.desc}
                    </p>
                    <div className="flex items-center gap-1 text-[#0f62fe] text-sm tracking-[0.16px] group-hover:gap-2 transition-all">
                      {t.services.viewAll} <ArrowRight size={14} />
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* News — white bg */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-16">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <SectionHeader label="Latest" title={t.news.title} className="mb-0" />
              <Link
                href={`${base}/news`}
                className="hidden sm:flex items-center gap-1 text-[#0f62fe] hover:text-[#0043ce] text-sm tracking-[0.16px] transition-colors"
              >
                {t.news.viewAll} <ChevronRight size={14} />
              </Link>
            </div>
          </AnimatedSection>

          {/* Carbon news tiles — 1px gap rows */}
          <div className="border-t border-[#e0e0e0]">
            {news.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 60}>
                <Link
                  href={`${base}/news/${post.slug}`}
                  className="group flex items-center gap-6 py-4 border-b border-[#e0e0e0] hover:bg-[#f4f4f4] px-2 transition-colors"
                >
                  {/* Category tag — pill (only rounded element in Carbon) */}
                  <span className="inline-block bg-[#edf5ff] text-[#0f62fe] text-xs px-2 py-0.5 rounded-full tracking-[0.16px] whitespace-nowrap flex-shrink-0">
                    {post.category}
                  </span>
                  <span className="text-[#525252] text-sm tracking-[0.16px] whitespace-nowrap flex-shrink-0">
                    {post.date.replace(/-/g, ".")}
                  </span>
                  <span className="text-[#161616] text-sm tracking-[0.16px] group-hover:text-[#0f62fe] transition-colors line-clamp-1 flex-1">
                    {post.title}
                  </span>
                  <ChevronRight size={14} className="text-[#8d8d8d] group-hover:text-[#0f62fe] transition-colors flex-shrink-0" />
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link href={`${base}/news`} className="text-[#0f62fe] text-sm tracking-[0.16px]">
              {t.news.viewAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* Recruit CTA — IBM Blue 60 bg */}
      <section className="py-16 lg:py-24 bg-[#0f62fe]">
        <div className="max-w-[1584px] mx-auto px-4 sm:px-8 lg:px-16">
          <AnimatedSection>
            <div className="max-w-[640px]">
              <h2
                className="text-white mb-4 leading-[1.25]"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 300 }}
              >
                {t.recruit.title}
              </h2>
              <p className="text-white/80 text-sm tracking-[0.16px] leading-[1.5] mb-8 max-w-[480px]">
                {t.recruit.body}
              </p>
              <Link
                href={`${base}/recruit`}
                className="inline-flex items-center gap-4 bg-white hover:bg-[#f4f4f4] text-[#0f62fe] px-4 h-12 text-sm tracking-[0.16px] font-semibold transition-colors"
              >
                {t.recruit.cta} <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
