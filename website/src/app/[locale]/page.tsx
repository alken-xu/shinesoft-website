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
    en: { title: "Software Development", desc: "End-to-end software development from requirements to maintenance." },
    zh: { title: "软件开发", desc: "从需求定义到PoC、设计、实施、维护，提供一站式服务。" },
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
    zh: { title: "IT培训", desc: "提供Kubernetes、Linux及Web応用开発培训。" },
  },
  {
    href: "research",
    icon: FlaskConical,
    ja: { title: "研究", desc: "OSSの研究推進とCNCF活動への参画。クラウドネイティブ技術を最前線で研究。" },
    en: { title: "Research", desc: "OSS research promotion and CNCF participation. Researching cloud-native technologies." },
    zh: { title: "研究", desc: "推进OSS研究并参与CNCF活动。" },
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

      {/* Mission & Vision */}
      <section className="bg-[#0A0A0A] border-b border-[#222222] py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#222222]">
            <AnimatedSection>
              <div className="bg-[#0A0A0A] p-10 lg:p-14 h-full">
                <p className="text-[#888888] text-xs font-medium tracking-widest uppercase mb-4">{t.mission.label}</p>
                <h2 className="text-[#ffffff] text-2xl lg:text-3xl font-bold mb-5 leading-snug">{t.mission.title}</h2>
                <p className="text-[#888888] leading-relaxed text-sm">{t.mission.body}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="bg-[#111111] p-10 lg:p-14 h-full">
                <p className="text-[#888888] text-xs font-medium tracking-widest uppercase mb-4">{t.vision.label}</p>
                <h2
                  className="text-2xl lg:text-3xl font-bold mb-5 leading-snug"
                  style={{
                    background: "linear-gradient(180deg,#FFFFFF 30%,#888888 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t.vision.title}
                </h2>
                <p className="text-[#888888] leading-relaxed text-sm">{t.vision.body}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#000000] border-b border-[#222222]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#222222]">
            {[
              { value: t.stats.foundedYear, label: t.stats.founded, suffix: "" },
              { value: t.stats.employeesCount, label: t.stats.employees, suffix: t.stats.employeesUnit },
              { value: "KCSP", label: t.stats.kcsp, suffix: "" },
              { value: "KTP", label: t.stats.ktp, suffix: "" },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <div className="bg-[#000000] py-10 px-6 text-center">
                  <div className="text-[#ffffff] text-3xl lg:text-4xl font-bold mb-1">{stat.value}{stat.suffix}</div>
                  <div className="text-[#555555] text-xs tracking-widest uppercase">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader label="Services" title={t.services.title} />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#222222] border border-[#222222]">
            {services.map((svc, i) => {
              const content = svc[locale as "ja" | "en" | "zh"] || svc.ja;
              const Icon = svc.icon;
              return (
                <AnimatedSection key={svc.href} delay={i * 60}>
                  <Link
                    href={`${base}/services/${svc.href}`}
                    className="group block bg-[#0A0A0A] hover:bg-[#111111] p-8 transition-colors h-full"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#333333] flex items-center justify-center mb-5 group-hover:border-[#555555] transition-colors">
                      <Icon size={18} className="text-[#888888] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-[#ffffff] font-semibold text-base mb-2">{content.title}</h3>
                    <p className="text-[#888888] text-sm leading-relaxed">{content.desc}</p>
                    <div className="mt-5 flex items-center gap-1 text-[#555555] group-hover:text-white text-xs transition-colors">
                      {t.services.viewAll} <ArrowRight size={12} />
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="bg-[#000000] border-t border-[#222222] py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <SectionHeader label="Latest" title={t.news.title} className="mb-0" />
              <Link href={`${base}/news`} className="hidden sm:flex items-center gap-1 text-[#888888] hover:text-white text-xs transition-colors mb-1">
                {t.news.viewAll} <ChevronRight size={14} />
              </Link>
            </div>
          </AnimatedSection>
          <div className="border border-[#222222] divide-y divide-[#222222]">
            {news.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 60}>
                <Link
                  href={`${base}/news/${post.slug}`}
                  className="group flex items-center gap-4 px-6 py-4 hover:bg-[#0A0A0A] transition-colors"
                >
                  <span className="inline-block border border-[#333333] text-[#888888] text-xs px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0">{post.category}</span>
                  <span className="text-[#555555] text-sm whitespace-nowrap flex-shrink-0">{post.date.replace(/-/g, ".")}</span>
                  <span className="text-[#888888] text-sm group-hover:text-white transition-colors line-clamp-1 flex-1">{post.title}</span>
                  <ChevronRight size={14} className="text-[#333333] group-hover:text-[#888888] transition-colors flex-shrink-0" />
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-4 text-center sm:hidden">
            <Link href={`${base}/news`} className="text-[#888888] text-xs">{t.news.viewAll} →</Link>
          </div>
        </div>
      </section>

      {/* Recruit CTA */}
      <section className="bg-[#111111] border-t border-[#222222] py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2
                className="font-bold mb-4"
                style={{
                  fontSize: "clamp(1.5rem,3vw,2.25rem)",
                  background: "linear-gradient(180deg,#FFFFFF 30%,#888888 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.recruit.title}
              </h2>
              <p className="text-[#888888] text-base max-w-lg mx-auto mb-8 leading-relaxed">{t.recruit.body}</p>
              <Link
                href={`${base}/recruit`}
                className="inline-flex items-center gap-2 bg-[#ffffff] hover:bg-[#EDEDED] text-[#000000] font-medium px-6 py-2.5 rounded-md text-sm transition-colors"
              >
                {t.recruit.cta} <ArrowRight size={15} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
