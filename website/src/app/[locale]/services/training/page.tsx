import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { ArrowRight, GraduationCap, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "ITトレーニング" };

const content = {
  ja: {
    hero: { label: "SERVICES", title: "ITトレーニング", desc: "日本でも数少ないKubernetesトレーニングパートナー（KTP）として、実践的な研修を提供します。" },
    lead: "顧客ニーズに応じた教育・研修プログラムを提供し、クラウド研修からサーバ・ネットワーク研修まで多様なプログラムを展開しています。",
    courses: [
      { no: "01", title: "クラウドネイティブ研修", desc: "オンラインとハンズオン型を組み合わせた研修。Kubernetesを中心技術として学習し、AKS・EKS・GCPなどのサービス運用を習得。", tags: ["Kubernetes", "AKS", "EKS", "GKE"] },
      { no: "02", title: "新卒研修", desc: "IT未経験者向けの基礎プログラム。ハードウェア、OS、アプリケーションの基本からネットワーク・データベース基礎を修得。", tags: ["IT基礎", "ネットワーク", "データベース"] },
      { no: "03", title: "WEBアプリケーション開発研修", desc: "Java技術による実践的教育。サーブレット/JSP/JDBC実装、JUnit・DbUnitを用いた単体テスト教育。", tags: ["Java", "Servlet/JSP", "JDBC", "JUnit"] },
      { no: "04", title: "Linuxサーバ基礎研修", desc: "初学者向けのわかりやすい授業。Linuxの操作・構築・システム管理を習得。", tags: ["Linux", "コマンド操作", "システム管理"] },
      { no: "05", title: "ネットワーク研修", desc: "ネットワーク構築・運用管理スキル。実機演習を多く取り入れた実践コース。", tags: ["ネットワーク構築", "実機演習", "運用管理"] },
      { no: "06", title: "LPI-Japan LinuC-1 & LinuC-2", desc: "クラウド時代の認定試験対策。Level 1（101・102試験）、Level 2（201・202試験）対応。", tags: ["LinuC Level1", "LinuC Level2", "試験対策"] },
    ],
    istudy: "i-study 専用サイト",
    istudyDesc: "研修の詳細・お申し込みはi-study専用サイトをご覧ください。",
    cta: "研修についてお問い合わせ",
  },
  en: {
    hero: { label: "SERVICES", title: "IT Training", desc: "As one of the few Kubernetes Training Partners (KTP) in Japan, we provide practical training programs." },
    lead: "We offer customized education and training programs tailored to your needs, spanning cloud training to server and network training.",
    courses: [
      { no: "01", title: "Cloud-Native Training", desc: "Combines online and hands-on training with Kubernetes as the core technology. Covers operation of AKS, EKS, GKE, and other managed services.", tags: ["Kubernetes", "AKS", "EKS", "GKE"] },
      { no: "02", title: "New Graduate Training", desc: "Foundational program for IT beginners covering hardware, OS, applications, networking, and database basics.", tags: ["IT Basics", "Networking", "Database"] },
      { no: "03", title: "Web Application Development", desc: "Practical Java education covering Servlet/JSP/JDBC implementation and unit testing with JUnit and DbUnit.", tags: ["Java", "Servlet/JSP", "JDBC", "JUnit"] },
      { no: "04", title: "Linux Server Basics", desc: "Beginner-friendly course covering Linux operations, construction, and system administration.", tags: ["Linux", "CLI", "System Admin"] },
      { no: "05", title: "Network Training", desc: "Network construction and operations management skills. Practical course with extensive hands-on exercises.", tags: ["Network Construction", "Hands-on", "Operations"] },
      { no: "06", title: "LPI-Japan LinuC-1 & LinuC-2", desc: "Exam preparation for cloud-era Linux certifications. Covers Level 1 (101/102) and Level 2 (201/202).", tags: ["LinuC Level1", "LinuC Level2", "Exam Prep"] },
    ],
    istudy: "i-study Dedicated Site",
    istudyDesc: "For course details and registration, please visit the i-study website.",
    cta: "Inquire About Training",
  },
  zh: {
    hero: { label: "服务", title: "IT培训", desc: "作为日本为数不多的Kubernetes培训合作伙伴（KTP），提供实践性培训课程。" },
    lead: "根据客户需求提供定制化的教育培训方案，涵盖从云计算培训到服务器、网络培训的多样化课程。",
    courses: [
      { no: "01", title: "云原生培训", desc: "结合线上与实操的培训课程，以Kubernetes为核心技术，掌握AKS、EKS、GKE等服务的运营管理。", tags: ["Kubernetes", "AKS", "EKS", "GKE"] },
      { no: "02", title: "应届生培训", desc: "面向IT零基础人员的基础课程，涵盖硬件、操作系统、应用程序基础及网络、数据库基础。", tags: ["IT基础", "网络", "数据库"] },
      { no: "03", title: "Web应用开发培训", desc: "基于Java技术的实践教育，包括Servlet/JSP/JDBC实现及JUnit、DbUnit单元测试。", tags: ["Java", "Servlet/JSP", "JDBC", "JUnit"] },
      { no: "04", title: "Linux服务器基础培训", desc: "面向初学者的易懂课程，掌握Linux操作、构建及系统管理。", tags: ["Linux", "命令操作", "系统管理"] },
      { no: "05", title: "网络培训", desc: "网络构建和运营管理技能培训，大量融入实机演练的实践课程。", tags: ["网络构建", "实机演练", "运营管理"] },
      { no: "06", title: "LPI-Japan LinuC-1 & LinuC-2", desc: "云时代Linux认定考试对策课程，对应Level 1（101/102）及Level 2（201/202）。", tags: ["LinuC Level1", "LinuC Level2", "考试对策"] },
    ],
    istudy: "i-study 专用网站",
    istudyDesc: "课程详情及报名请访问i-study专用网站。",
    cta: "咨询培训课程",
  },
};

export default async function TrainingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = content[locale as Locale] || content.ja;

  return (
    <>
      <PageHero label={c.hero.label} title={c.hero.title} description={c.hero.desc} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-10">
        <AnimatedSection>
          <p className="text-slate-300 text-lg leading-relaxed glass-card rounded-2xl p-8">{c.lead}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {c.courses.map((course, i) => (
            <AnimatedSection key={i} delay={i * 80}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <div className="flex items-start gap-3 mb-4">
                  <GraduationCap size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-amber-400/50 text-xs font-mono mb-1">{course.no}</div>
                    <h3 className="text-white font-semibold leading-snug">{course.title}</h3>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{course.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {course.tags.map((tag) => (
                    <span key={tag} className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-1 rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* i-study link */}
        <AnimatedSection>
          <div className="glass-card rounded-2xl p-8 border border-amber-500/20">
            <h3 className="text-white font-bold text-lg mb-2">{c.istudy}</h3>
            <p className="text-slate-400 text-sm mb-4">{c.istudyDesc}</p>
            <a
              href="https://i-study.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
            >
              i-study.jp <ExternalLink size={14} />
            </a>
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
