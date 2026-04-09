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
    color: "bg-[#2264d6]",
    ja: { title: "ソフトウェア開発", desc: "要件定義からPoC・設計・実装・保守まで一貫対応。Java・Python・Go・Kubernetes等に対応。" },
    en: { title: "Software Development", desc: "End-to-end software development from requirements to maintenance. Java, Python, Go, Kubernetes and more." },
    zh: { title: "软件开发", desc: "从需求定义到PoC、设计、实施、维护，提供一站式服务。支持Java、Python、Go、Kubernetes等。" },
  },
  {
    href: "infrastructure",
    icon: Server,
    color: "bg-[#3b3d45]",
    ja: { title: "基盤サービス", desc: "サーバ・ネットワークの設計・構築・運用・保守をトータルサポート。" },
    en: { title: "Infrastructure", desc: "Total support for server and network design, construction, operation, and maintenance." },
    zh: { title: "基础架构服务", desc: "提供服务器和网络的设计、构建、运营、维护全方位支持。" },
  },
  {
    href: "cloud",
    icon: Cloud,
    color: "bg-[#1a6e9e]",
    ja: { title: "クラウドサービス", desc: "AWS・Azure・GCPを活用したクラウド構築・移行・サーバ仮想化を支援。" },
    en: { title: "Cloud Services", desc: "Cloud construction, migration, and server virtualization using AWS, Azure, and GCP." },
    zh: { title: "云服务", desc: "利用AWS、Azure、GCP构建云环境、迁移及服务器虚拟化支持。" },
  },
  {
    href: "training",
    icon: GraduationCap,
    color: "bg-[#5a3e8a]",
    ja: { title: "ITトレーニング", desc: "日本でも数少ないKTP認定。Kubernetes・Linux・Webアプリ開発研修を提供。" },
    en: { title: "IT Training", desc: "One of few KTP-certified providers in Japan. Kubernetes, Linux, and web development training." },
    zh: { title: "IT培训", desc: "日本为数不多的KTP认证机构。提供Kubernetes、Linux及Web应用开发培训。" },
  },
  {
    href: "research",
    icon: FlaskConical,
    color: "bg-[#1a7a4e]",
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
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedSection>
              <div className="hc-card p-8 lg:p-10 h-full">
                <p className="hc-label text-[#656a76] mb-4">{t.mission.label}</p>
                <h2
                  className="text-[#000000] font-semibold leading-[1.19] mb-4"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)" }}
                >
                  {t.mission.title}
                </h2>
                <p className="text-[#3b3d45] text-sm leading-relaxed">{t.mission.body}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="hc-card p-8 lg:p-10 h-full" style={{ borderLeft: "3px solid #2264d6" }}>
                <p className="hc-label text-[#656a76] mb-4">{t.vision.label}</p>
                <h2
                  className="text-[#000000] font-semibold leading-[1.19] mb-4"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)" }}
                >
                  {t.vision.title}
                </h2>
                <p className="text-[#3b3d45] text-sm leading-relaxed">{t.vision.body}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services — subtle gray bg */}
      <section className="py-16 lg:py-24 bg-[#f1f2f3]">
        <div className="max-w-[1200px] mx-auto px-6">
          <AnimatedSection>
            <SectionHeader label={t.services.title} title={t.services.title} className="text-left" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc, i) => {
              const content = svc[locale as "ja" | "en" | "zh"] || svc.ja;
              const Icon = svc.icon;
              return (
                <AnimatedSection key={svc.href} delay={i * 60}>
                  <Link
                    href={`${base}/services/${svc.href}`}
                    className="group block hc-card bg-white p-6 h-full hover:shadow-md transition-shadow"
                  >
                    <div className={`w-9 h-9 ${svc.color} rounded-md flex items-center justify-center mb-5`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="text-[#000000] font-semibold mb-3 leading-[1.21]" style={{ fontSize: "19px" }}>
                      {content.title}
                    </h3>
                    <p className="text-[#3b3d45] text-sm leading-relaxed mb-5">{content.desc}</p>
                    <div className="flex items-center gap-1 text-[#2264d6] text-sm font-medium group-hover:gap-2 transition-all">
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
        <div className="max-w-[1200px] mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <SectionHeader label="Latest" title={t.news.title} className="mb-0" />
              <Link
                href={`${base}/news`}
                className="hidden sm:flex items-center gap-1 text-[#2264d6] hover:text-[#1a4fb8] text-sm font-medium transition-colors"
              >
                {t.news.viewAll} <ChevronRight size={14} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="space-y-2">
            {news.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 60}>
                <Link
                  href={`${base}/news/${post.slug}`}
                  className="group flex items-center gap-5 hc-card bg-white px-5 py-4 hover:shadow-md transition-shadow"
                >
                  <span className="inline-block bg-[#e8f0fd] text-[#2264d6] text-xs px-2.5 py-0.5 rounded font-medium whitespace-nowrap flex-shrink-0">
                    {post.category}
                  </span>
                  <span className="text-[#656a76] text-sm whitespace-nowrap flex-shrink-0">
                    {post.date.replace(/-/g, ".")}
                  </span>
                  <span className="text-[#000000] text-sm group-hover:text-[#2264d6] transition-colors line-clamp-1 flex-1">
                    {post.title}
                  </span>
                  <ChevronRight size={14} className="text-[#b2b6bd] group-hover:text-[#2264d6] transition-colors flex-shrink-0" />
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link href={`${base}/news`} className="text-[#2264d6] text-sm font-medium">
              {t.news.viewAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* Recruit CTA — dark section */}
      <section className="py-16 lg:py-24 bg-[#15181e]">
        <div className="max-w-[1200px] mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-[600px]">
              <p className="hc-label text-[#656a76] mb-4">RECRUIT</p>
              <h2
                className="text-[#efeff1] font-semibold leading-[1.19] mb-5"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                {t.recruit.title}
              </h2>
              <p className="text-[#d5d7db] text-sm leading-relaxed mb-8 max-w-[480px]">
                {t.recruit.body}
              </p>
              <Link
                href={`${base}/recruit`}
                className="inline-flex items-center gap-2 bg-white hover:bg-[#f1f2f3] text-[#3b3d45] px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
                style={{ boxShadow: "rgba(97,104,117,0.05) 0px 1px 1px, rgba(97,104,117,0.05) 0px 2px 2px" }}
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
