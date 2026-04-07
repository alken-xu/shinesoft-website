import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Cpu, Zap, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "シャインソフトの強み" };

const content = {
  ja: {
    hero: { label: "FEATURE", title: "シャインソフトの強み", desc: "技術力・開発手法・人材育成の3つの強みで、お客様のプロジェクトを成功に導きます。" },
    features: [
      {
        icon: Cpu,
        title: "最先端技術を取り込む技術力の高さ",
        body: "シャインソフトでは、積極的に最先端技術に関する研究を行い、特にAIやクラウドサービスにおいて高い技術力と数多くの実績を持っています。コンテナ化技術がIT業界のトレンドとなる中、KubernetesのKCSP（認定サービスプロバイダー）とKTP（トレーニングパートナー）の認定を取得。日本でも数社のみが保有する資格であり、クラウド提供のコア技術として多くのプロジェクトに活用しています。",
        tags: ["Kubernetes KCSP", "KTP認定", "AI・クラウド", "ISMS認証"],
      },
      {
        icon: Zap,
        title: "先進的な開発手法「アジャイル開発」を採用",
        body: "アジャイル開発は、重要な機能からスタートし、小規模なサイクルで段階的に開発を進めるアプローチです。社内にアジャイル専門部隊を育成し、スクラムマスターなどの専門家が在籍しています。",
        tags: ["仕様変更への柔軟対応", "導入期間の短縮", "開発コスト削減", "スクラム開発"],
      },
      {
        icon: Users,
        title: "優秀な人材が集まり育っていく環境",
        body: "社員教育に力を入れている当社では、国籍に関係なく優秀な人材が集まり、常に技術力の向上に向けたフォローアップを実施しています。",
        supports: ["資格取得支援・費用補助", "書籍購入補助（年間1万円支給）", "資格手当支給", "新卒社内研修（約2年間）", "キャリア面談", "技術研究推進"],
      },
    ],
  },
  en: {
    hero: { label: "FEATURE", title: "Our Strengths", desc: "Our three strengths in technology, development methodology, and human resource development lead your projects to success." },
    features: [
      {
        icon: Cpu,
        title: "High Technical Capability in Cutting-Edge Technologies",
        body: "SHINESOFT actively researches cutting-edge technologies, particularly excelling in AI and cloud services. As containerization became an industry trend, we obtained KCSP (Certified Service Provider) and KTP (Training Partner) certifications for Kubernetes — held by only a handful of companies in Japan.",
        tags: ["Kubernetes KCSP", "KTP Certified", "AI & Cloud", "ISMS Certified"],
      },
      {
        icon: Zap,
        title: "Agile Development Methodology",
        body: "Agile development starts with critical features and progresses in small cycles. We have a dedicated agile team with certified Scrum Masters, enabling flexible responses to specification changes, shorter lead times, and reduced development costs.",
        tags: ["Flexible spec changes", "Shorter delivery", "Cost reduction", "Scrum"],
      },
      {
        icon: Users,
        title: "An Environment Where Talented People Gather and Grow",
        body: "We invest heavily in employee education, welcoming talented people of all nationalities with continuous technical skill support.",
        supports: ["Certification support & cost coverage", "Book allowance (¥10,000/year)", "Certification bonus", "New graduate training (~2 years)", "Career counseling", "Technical research promotion"],
      },
    ],
  },
  zh: {
    hero: { label: "我们的优势", title: "SHINESOFT的优势", desc: "以技术实力、开发方法和人才培育三大优势，引领您的项目走向成功。" },
    features: [
      {
        icon: Cpu,
        title: "引入前沿技术的强大技术实力",
        body: "SHINESOFT积极开展最前沿技术研究，尤其在AI和云服务领域拥有丰富经验和卓越技术。在容器化技术成为IT行业趋势之际，我们获得了Kubernetes KCSP和KTP认证，是日本为数不多的持证机构。",
        tags: ["Kubernetes KCSP", "KTP认证", "AI & 云", "ISMS认证"],
      },
      {
        icon: Zap,
        title: '采用先进的"敏捷开发"方法',
        body: "敏捷开发从核心功能出发，以小周期循环推进开发。公司内部培养了专业敏捷团队，配备Scrum Master等专业人员，实现灵活应对需求变更、缩短交付周期、降低开发成本。",
        tags: ["灵活应对变更", "缩短交付周期", "降低开发成本", "Scrum开发"],
      },
      {
        icon: Users,
        title: "优秀人才汇聚、共同成长的环境",
        body: "我们重视员工教育，欢迎各国优秀人才加入，并持续提供技术提升方面的支持。",
        supports: ["考证支持及费用补助", "书籍购买补贴（每年1万日元）", "资格证奖金", "应届生内部培训（约2年）", "职业规划面谈", "技术研究推进"],
      },
    ],
  },
};

export default async function FeaturePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = content[locale as Locale] || content.ja;

  return (
    <>
      <PageHero label={c.hero.label} title={c.hero.title} description={c.hero.desc} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
        {c.features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="glass-card rounded-2xl p-8 lg:p-10">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white leading-snug pt-1">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">{feature.body}</p>
                {"tags" in feature && feature.tags && (
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <span key={tag} className="bg-sky-500/10 text-sky-400 text-xs px-3 py-1.5 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {"supports" in feature && feature.supports && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {feature.supports.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </>
  );
}
