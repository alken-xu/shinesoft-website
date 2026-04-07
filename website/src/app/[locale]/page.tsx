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
    color: "from-sky-500 to-blue-600",
    ja: { title: "ソフトウェア開発", desc: "要件定義からPoC・設計・実装・保守まで一貫対応。Java・Python・Go・Kubernetes等に対応。" },
    en: { title: "Software Development", desc: "End-to-end software development from requirements to maintenance. Java, Python, Go, Kubernetes and more." },
    zh: { title: "软件开发", desc: "从需求定义到PoC、设计、实施、维护，提供一站式服务。支持Java、Python、Go、Kubernetes等。" },
  },
  {
    href: "infrastructure",
    icon: Server,
    color: "from-indigo-500 to-purple-600",
    ja: { title: "基盤サービス", desc: "サーバ・ネットワークの設計・構築・運用・保守をトータルサポート。" },
    en: { title: "Infrastructure", desc: "Total support for server and network design, construction, operation, and maintenance." },
    zh: { title: "基础架构服务", desc: "提供服务器和网络的设计、构建、运营、维护全方位支持。" },
  },
  {
    href: "cloud",
    icon: Cloud,
    color: "from-cyan-500 to-teal-600",
    ja: { title: "クラウドサービス", desc: "AWS・Azure・GCPを活用したクラウド構築・移行・サーバ仮想化を支援。" },
    en: { title: "Cloud Services", desc: "Cloud construction, migration, and server virtualization using AWS, Azure, and GCP." },
    zh: { title: "云服务", desc: "利用AWS、Azure、GCP构建云环境、迁移及服务器虚拟化支持。" },
  },
  {
    href: "training",
    icon: GraduationCap,
    color: "from-amber-500 to-orange-600",
    ja: { title: "ITトレーニング", desc: "日本でも数少ないKTP認定。Kubernetes・Linux・Webアプリ開発研修を提供。" },
    en: { title: "IT Training", desc: "One of few KTP-certified providers in Japan. Kubernetes, Linux, and web development training." },
    zh: { title: "IT培训", desc: "日本为数不多的KTP认证机构。提供Kubernetes、Linux及Web应用开发培训。" },
  },
  {
    href: "research",
    icon: FlaskConical,
    color: "from-emerald-500 to-green-600",
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

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.04),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <AnimatedSection>
              <div className="glass-card rounded-2xl p-8 lg:p-10 h-full">
                <span className="inline-block text-sky-400 text-xs font-bold tracking-widest uppercase mb-4">
                  {t.mission.label}
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-snug">
                  {t.mission.title}
                </h2>
                <p className="text-slate-400 leading-relaxed">{t.mission.body}</p>
              </div>
            </AnimatedSection>

            {/* Vision */}
            <AnimatedSection delay={150}>
              <div className="glass-card rounded-2xl p-8 lg:p-10 h-full border border-sky-500/20">
                <span className="inline-block text-indigo-400 text-xs font-bold tracking-widest uppercase mb-4">
                  {t.vision.label}
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold gradient-text mb-4 leading-snug">
                  {t.vision.title}
                </h2>
                <p className="text-slate-400 leading-relaxed">{t.vision.body}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: t.stats.foundedYear, label: t.stats.founded, suffix: "" },
              { value: t.stats.employeesCount, label: t.stats.employees, suffix: t.stats.employeesUnit },
              { value: "KCSP", label: t.stats.kcsp, suffix: "" },
              { value: "KTP", label: t.stats.ktp, suffix: "" },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div>
                  <div className="text-3xl lg:text-4xl font-black gradient-text mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-slate-500 text-sm">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label={t.services.title}
              title={t.services.title}
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const content = svc[locale as "ja" | "en" | "zh"] || svc.ja;
              const Icon = svc.icon;
              return (
                <AnimatedSection key={svc.href} delay={i * 80}>
                  <Link
                    href={`${base}/services/${svc.href}`}
                    className="group block glass-card rounded-2xl p-6 hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/10 h-full"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-5`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-sky-400 transition-colors">
                      {content.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{content.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-sky-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.services.viewAll} <ArrowRight size={14} />
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 lg:py-32 bg-[#080f1e]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-12">
              <SectionHeader label="Latest" title={t.news.title} className="text-left mb-0" />
              <Link
                href={`${base}/news`}
                className="hidden sm:flex items-center gap-1 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
              >
                {t.news.viewAll} <ChevronRight size={16} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {news.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 80}>
                <Link
                  href={`${base}/news/${post.slug}`}
                  className="group flex items-start sm:items-center gap-4 glass-card rounded-xl p-5 hover:border-sky-500/30 transition-all duration-200"
                >
                  <span className="inline-block bg-sky-500/10 text-sky-400 text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap flex-shrink-0">
                    {post.category}
                  </span>
                  <span className="text-slate-400 text-sm whitespace-nowrap flex-shrink-0">
                    {post.date.replace(/-/g, ".")}
                  </span>
                  <span className="text-slate-200 text-sm group-hover:text-white transition-colors line-clamp-1">
                    {post.title}
                  </span>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-sky-400 transition-colors ml-auto flex-shrink-0" />
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href={`${base}/news`} className="text-sky-400 text-sm font-medium">
              {t.news.viewAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* Recruit CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-900/50 to-indigo-900/50 border border-sky-500/20 p-10 lg:p-16 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t.recruit.title}</h2>
                <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                  {t.recruit.body}
                </p>
                <Link
                  href={`${base}/recruit`}
                  className="inline-flex items-center gap-2 bg-white text-sky-900 font-bold px-8 py-4 rounded-xl hover:bg-sky-50 transition-colors"
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
