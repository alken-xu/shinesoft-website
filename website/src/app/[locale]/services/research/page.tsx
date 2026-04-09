import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { ArrowRight, FlaskConical, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "研究" };

const content = {
  ja: {
    hero: { label: "RESEARCH", title: "研究", desc: "最先端のIT技術で、社会に貢献する。" },
    oss: {
      title: "OSSの研究推進",
      body: "個人またはチームでオープンソースの研究を推進。技術を社会に還元します。",
      steps: ["研究対象の発掘", "オープンソースの検証", "お客様への提案", "技術サポート"],
    },
    cncf: {
      title: "クラウドネイティブ CNCF 活動への参画",
      body: "CNCF（Cloud Native Computing Foundation）��、クラウドネイティブコンピューティング技術を推進する非営利団体。2015年創設、Google・IBM・Intel・Twitter・Dockerなど世界的IT企業が参画。Kubernetesをはじめとするクラウドソフトウェアの重要コンポーネントをホストしています。当社はKCSP・KTP資格を認定されており、CNCF活動に積極的に参画しています。",
    },
    activities: {
      title: "研究活動内容",
      items: ["クラウドネイティブCDツール調査", "オブザーバビリティ（可観測性）調査", "コンサルティング・技術サポート"],
    },
    cta: "研究・技術についてお問い合わせ",
  },
  en: {
    hero: { label: "RESEARCH", title: "Research", desc: "Contributing to society through cutting-edge IT technologies." },
    oss: {
      title: "OSS Research Promotion",
      body: "We promote open source research individually and as teams, returning technology knowledge to society.",
      steps: ["Identifying research targets", "Verifying open source solutions", "Proposing to clients", "Technical support"],
    },
    cncf: {
      title: "Participation in Cloud-Native CNCF Activities",
      body: "The CNCF (Cloud Native Computing Foundation) is a non-profit organization that promotes cloud-native computing technology. Founded in 2015 with participation from global IT companies including Google, IBM, Intel, Twitter, and Docker. It hosts important components including Kubernetes. SHINESOFT holds KCSP and KTP certifications and actively participates in CNCF activities.",
    },
    activities: {
      title: "Research Activities",
      items: ["Cloud-native CD tool investigation", "Observability research", "Consulting & technical support"],
    },
    cta: "Inquire About Research & Technology",
  },
  zh: {
    hero: { label: "研究", title: "研究", desc: "以最前沿的IT技术，贡献社会。" },
    oss: {
      title: "推进OSS研究",
      body: "以个人或团队形式推进开源���究，将技术成果还原于社会。",
      steps: ["发现研究对象", "验证开源方案", "向客户提案", "技术支持"],
    },
    cncf: {
      title: "参与云原生CNCF活动",
      body: "CNCF（云原生计算基金会）是推动云原生计算技术的非营利组织，成立于2015年，Google、IBM、Intel、Twitter、Docker等全球知名IT企业参与其中，托管包括Kubernetes在内的重要云软件组件。本公司获得KCSP和KTP认证，积极参与CNCF活动。",
    },
    activities: {
      title: "研究活动内容",
      items: ["云原生CD工具调研", "可观测性研���", "咨询及技术支持"],
    },
    cta: "咨询研究与技术",
  },
};

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = content[locale as Locale] || content.ja;

  return (
    <>
      <PageHero label={c.hero.label} title={c.hero.title} description={c.hero.desc} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-24 space-y-10">
        {/* OSS */}
        <AnimatedSection>
          <div className="glass-card rounded-2xl p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <FlaskConical size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">{c.oss.title}</h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">{c.oss.body}</p>
            <div className="flex items-center gap-0">
              {c.oss.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-0 flex-1">
                  <div className="flex-1 text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold mx-auto mb-2">
                      {i + 1}
                    </div>
                    <div className="text-slate-300 text-xs leading-snug px-1">{step}</div>
                  </div>
                  {i < c.oss.steps.length - 1 && (
                    <ArrowRight size={14} className="text-slate-600 flex-shrink-0 mb-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CNCF */}
        <AnimatedSection>
          <div className="glass-card rounded-2xl p-8 lg:p-10 border border-emerald-500/20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                <Globe size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">{c.cncf.title}</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">{c.cncf.body}</p>
          </div>
        </AnimatedSection>

        {/* Activities */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-4">{c.activities.title}</h2>
          <div className="glass-card rounded-xl p-6 space-y-3">
            {c.activities.items.map((item) => (
              <div key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="text-center">
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
              {c.cta} <ArrowRight size={18} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
