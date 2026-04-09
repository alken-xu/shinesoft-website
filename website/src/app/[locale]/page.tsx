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
  { href: "software",      icon: Code2,        emoji: "💻", ja: { title: "ソフトウェア開発", desc: "要件定義からPoC・設計・実装・保守まで一貫対応。Java・Python・Go・Kubernetes等に対応。" }, en: { title: "Software Development", desc: "End-to-end software development from requirements to maintenance." }, zh: { title: "软件开发", desc: "从需求定义到PoC、设计、实施、维护，提供一站式服务。" } },
  { href: "infrastructure", icon: Server,       emoji: "🖥", ja: { title: "基盤サービス", desc: "サーバ・ネットワークの設計・構築・運用・保守をトータルサポート。" }, en: { title: "Infrastructure", desc: "Total support for server and network design, construction, operation, and maintenance." }, zh: { title: "基础架构服务", desc: "提供服务器和网络的设计、构建、运营、维护全方位支持。" } },
  { href: "cloud",          icon: Cloud,        emoji: "☁️", ja: { title: "クラウドサービス", desc: "AWS・Azure・GCPを活用したクラウド構築・移行・サーバ仮想化を支援。" }, en: { title: "Cloud Services", desc: "Cloud construction, migration, and server virtualization using AWS, Azure, and GCP." }, zh: { title: "云服务", desc: "利用AWS、Azure、GCP构建云环境、迁移及服务器虚拟化支持。" } },
  { href: "training",       icon: GraduationCap, emoji: "🎓", ja: { title: "ITトレーニング", desc: "日本でも数少ないKTP認定。Kubernetes・Linux・Webアプリ開発研修を提供。" }, en: { title: "IT Training", desc: "One of few KTP-certified providers in Japan. Kubernetes, Linux, and web development training." }, zh: { title: "IT培训", desc: "提供Kubernetes、Linux及Web应用开发培训。" } },
  { href: "research",       icon: FlaskConical,  emoji: "🔬", ja: { title: "研究", desc: "OSSの研究推進とCNCF活動への参画。クラウドネイティブ技術を最前線で研究。" }, en: { title: "Research", desc: "OSS research promotion and CNCF participation. Researching cloud-native technologies." }, zh: { title: "研究", desc: "推进OSS研究并参与CNCF活动。" } },
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

      {/* Mission & Vision — white bg, Notion callout style */}
      <section className="bg-white py-16 lg:py-24 border-b border-[rgba(55,53,47,0.09)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedSection>
              <div className="bg-[#F7F6F3] rounded-md p-8 h-full border border-[rgba(55,53,47,0.09)]">
                <div className="text-2xl mb-3">🎯</div>
                <p className="text-[#9B9A97] text-xs font-medium tracking-widest uppercase mb-2">{t.mission.label}</p>
                <h2 className="text-[#37352F] text-xl font-bold mb-3 leading-snug" style={{ fontFamily: "Lora, Georgia, serif" }}>
                  {t.mission.title}
                </h2>
                <p className="text-[#787774] text-sm leading-relaxed">{t.mission.body}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="bg-[rgba(35,131,226,0.05)] rounded-md p-8 h-full border border-[rgba(35,131,226,0.15)]">
                <div className="text-2xl mb-3">🚀</div>
                <p className="text-[#9B9A97] text-xs font-medium tracking-widest uppercase mb-2">{t.vision.label}</p>
                <h2 className="text-[#2383E2] text-xl font-bold mb-3 leading-snug" style={{ fontFamily: "Lora, Georgia, serif" }}>
                  {t.vision.title}
                </h2>
                <p className="text-[#787774] text-sm leading-relaxed">{t.vision.body}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats — Notion table style */}
      <section className="bg-[#F7F6F3] border-b border-[rgba(55,53,47,0.09)] py-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[rgba(55,53,47,0.09)] border border-[rgba(55,53,47,0.09)] rounded-md overflow-hidden bg-white">
            {[
              { value: t.stats.foundedYear, label: t.stats.founded, suffix: "" },
              { value: t.stats.employeesCount, label: t.stats.employees, suffix: t.stats.employeesUnit },
              { value: "KCSP", label: t.stats.kcsp, suffix: "" },
              { value: "KTP", label: t.stats.ktp, suffix: "" },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <div className="py-8 px-4 text-center">
                  <div className="text-[#37352F] text-2xl lg:text-3xl font-bold mb-1" style={{ fontFamily: "Lora, Georgia, serif" }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-[#9B9A97] text-xs">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services — white bg, Notion database-card style */}
      <section className="bg-white py-16 lg:py-24 border-b border-[rgba(55,53,47,0.09)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader label="Services" title={t.services.title} />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((svc, i) => {
              const content = svc[locale as "ja" | "en" | "zh"] || svc.ja;
              return (
                <AnimatedSection key={svc.href} delay={i * 60}>
                  <Link
                    href={`${base}/services/${svc.href}`}
                    className="group block bg-white hover:bg-[rgba(55,53,47,0.03)] border border-[rgba(55,53,47,0.09)] hover:border-[rgba(55,53,47,0.18)] rounded-md p-6 transition-all duration-200 h-full"
                  >
                    <div className="text-2xl mb-4">{svc.emoji}</div>
                    <h3 className="text-[#37352F] font-semibold text-base mb-2 group-hover:text-[#2383E2] transition-colors">
                      {content.title}
                    </h3>
                    <p className="text-[#787774] text-sm leading-relaxed">{content.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-[#2383E2] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.services.viewAll} <ArrowRight size={11} />
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* News — off-white bg, Notion list style */}
      <section className="bg-[#F7F6F3] py-16 lg:py-24 border-b border-[rgba(55,53,47,0.09)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-8">
              <SectionHeader label="Latest" title={t.news.title} className="mb-0" />
              <Link href={`${base}/news`} className="hidden sm:flex items-center gap-1 text-[#787774] hover:text-[#37352F] text-xs transition-colors mb-1">
                {t.news.viewAll} <ChevronRight size={13} />
              </Link>
            </div>
          </AnimatedSection>
          <div className="bg-white border border-[rgba(55,53,47,0.09)] rounded-md divide-y divide-[rgba(55,53,47,0.06)]">
            {news.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 60}>
                <Link
                  href={`${base}/news/${post.slug}`}
                  className="group flex items-center gap-4 px-5 py-3.5 hover:bg-[rgba(55,53,47,0.03)] transition-colors"
                >
                  <span className="inline-block bg-[rgba(55,53,47,0.06)] text-[#787774] text-xs px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0">
                    {post.category}
                  </span>
                  <span className="text-[#9B9A97] text-sm whitespace-nowrap flex-shrink-0">
                    {post.date.replace(/-/g, ".")}
                  </span>
                  <span className="text-[#37352F] text-sm group-hover:text-[#2383E2] transition-colors line-clamp-1 flex-1">
                    {post.title}
                  </span>
                  <ChevronRight size={13} className="text-[#C1BEBB] group-hover:text-[#9B9A97] transition-colors flex-shrink-0" />
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-3 text-center sm:hidden">
            <Link href={`${base}/news`} className="text-[#787774] text-xs">{t.news.viewAll} →</Link>
          </div>
        </div>
      </section>

      {/* Recruit CTA — off-white, centered document style */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-xl mx-auto text-center border border-[rgba(55,53,47,0.09)] rounded-md p-10 bg-[#F7F6F3]">
              <div className="text-4xl mb-4">🙌</div>
              <h2
                className="text-[#37352F] font-bold mb-3"
                style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)", fontFamily: "Lora, Georgia, serif" }}
              >
                {t.recruit.title}
              </h2>
              <p className="text-[#787774] text-sm max-w-sm mx-auto mb-6 leading-relaxed">{t.recruit.body}</p>
              <Link
                href={`${base}/recruit`}
                className="inline-flex items-center gap-2 bg-[#2383E2] hover:bg-[#1A73D1] text-[#ffffff] font-medium px-6 py-2.5 rounded-md text-sm transition-colors"
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
