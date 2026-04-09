import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "ソフトウェア開発" };

const phases = {
  ja: ["要件定義", "PoC", "基本設計", "コーディング実装", "テスト", "保守・サポート"],
  en: ["Requirements", "PoC", "Design", "Implementation", "Testing", "Maintenance"],
  zh: ["需求定义", "PoC", "基本设计", "编码实现", "测试", "维护支持"],
};

const phaseDesc = {
  ja: [
    "プロジェクト目的と必要機能の詳細定義",
    "新技術の実現可能性検証とリスク評価",
    "アーキテクチャ・機能設計・技術スタック決定",
    "設計に基づく機能開発",
    "バグ特定と要件確認",
    "バグ修正、機能追加、パフォーマンス改善",
  ],
  en: [
    "Detailed definition of project goals and required functions",
    "Verification of feasibility and risk assessment for new technologies",
    "Architecture, function design, and technology stack decisions",
    "Feature development based on design",
    "Bug identification and requirements verification",
    "Bug fixes, feature additions, and performance improvements",
  ],
  zh: [
    "明确项目目标和所需功能的详细定义",
    "验证新技术的可行性并评估风险",
    "确定架构、功能设计及技术栈",
    "基于设计进行功能开发",
    "识别缺陷并验证需求",
    "错误修复、功能追加和性能优化",
  ],
};

const content = {
  ja: {
    hero: { label: "SERVICES", title: "ソフトウェア開発", desc: "要件定義からPoC・設計・実装・保守まで、すべてのフェーズに一貫対応。" },
    lead: "先端技術に精通した経験豊かなシステムエンジニアが、あらゆる機種構成・OS・言語等を駆使した技術で、お客様のニーズにお応えします。",
    phasesTitle: "対応フェーズ",
    langsTitle: "開発言語・技術",
    methodTitle: "開発手法",
    methodBody: "ウォーターフォールモデルとアジャイルモデルの両方に対応。プロジェクトの特性に応じて最適な手法を提案します。",
    resultsTitle: "実績事例",
    results: ["キャッシュレスシステム PoC", "POS機端末アプリ開発", "物体画像認識システム", "ビルエネルギー管理システム"],
    cta: "お問い合わせはこちら",
  },
  en: {
    hero: { label: "SERVICES", title: "Software Development", desc: "End-to-end support across all phases from requirements to maintenance." },
    lead: "Experienced system engineers proficient in cutting-edge technologies respond to your needs using a wide range of hardware configurations, OS, and programming languages.",
    phasesTitle: "Development Phases",
    langsTitle: "Languages & Technologies",
    methodTitle: "Development Methodology",
    methodBody: "We support both waterfall and agile models, proposing the optimal approach based on project characteristics.",
    resultsTitle: "Case Studies",
    results: ["Cashless System PoC", "POS Terminal App", "Object Image Recognition System", "Building Energy Management System"],
    cta: "Contact Us",
  },
  zh: {
    hero: { label: "服务", title: "软件开发", desc: "从需求定义到PoC、设计、实现、维护，提供全阶段一站式支持。" },
    lead: "经验丰富、精通前沿技术的系统工程师，利用各种硬件配置、操作系统和编程语言，满足您的各类需求。",
    phasesTitle: "开发阶段",
    langsTitle: "开发语言和技术",
    methodTitle: "开发方法",
    methodBody: "支持瀑布模型和敏捷模型，根据项目特性提出最佳方法。",
    resultsTitle: "实绩案例",
    results: ["无现金支付系统PoC", "POS终端应用开发", "物体图像识别系统", "建筑能源管理系统"],
    cta: "联系我们",
  },
};

const languages = ["Java", "Python", "C#", "PHP", "Go", "iOS", "Android", "Lambda"];
const devEnv = ["GitHub / GitLab", "Jenkins / Argo CD", "Docker / Kubernetes", "AWS / Azure / GCP"];

export default async function SoftwarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = content[locale as Locale] || content.ja;
  const ph = phases[locale as Locale] || phases.ja;
  const pd = phaseDesc[locale as Locale] || phaseDesc.ja;

  return (
    <>
      <PageHero label={c.hero.label} title={c.hero.title} description={c.hero.desc} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-24 space-y-14">
        <AnimatedSection>
          <p className="text-slate-300 text-lg leading-relaxed glass-card rounded-2xl p-8">{c.lead}</p>
        </AnimatedSection>

        {/* Phases */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-6">{c.phasesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ph.map((phase, i) => (
              <div key={i} className="glass-card rounded-xl p-5">
                <div className="text-4xl font-black text-sky-500/20 mb-2">0{i + 1}</div>
                <div className="text-white font-semibold mb-1">{phase}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{pd[i]}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Languages */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-4">{c.langsTitle}</h2>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {languages.map((lang) => (
                <span key={lang} className="bg-indigo-500/10 text-indigo-400 text-sm px-3 py-1.5 rounded-lg font-mono font-medium">
                  {lang}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {devEnv.map((tool) => (
                <span key={tool} className="bg-sky-500/10 text-sky-400 text-sm px-3 py-1.5 rounded-lg font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Methodology */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-4">{c.methodTitle}</h2>
          <div className="glass-card rounded-xl p-6 text-slate-300 leading-relaxed">{c.methodBody}</div>
        </AnimatedSection>

        {/* Results */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-4">{c.resultsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.results.map((r) => (
              <div key={r} className="glass-card rounded-xl px-5 py-4 text-slate-300 text-sm flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0" />
                {r}
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
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
