import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Server, Network } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "基盤サービス" };

const content = {
  ja: {
    hero: { label: "SERVICES", title: "基盤サービス", desc: "実現したいサービスに応じて、最適なサーバを設計・構築します。" },
    services: [
      {
        icon: Server,
        title: "サーバ設計・構築・運用・保守",
        body: "サーバはその用途に応じて必要なハードウェア・ソフトウェアの構成を考える必要があります。CPUのコア数・クロック周波数、ストレージの容量、OS、ミドルウェア、セキュリティ、ネットワーク機器など、予算と優先順位のバランスを考えながら、適切なサーバの選定と設計を行っていきます。\n\n構築したサーバが想定通りのパフォーマンスを発揮・維持できるように、監視・障害対応、各種設定の管理・変更、バックアップ、セキュリティチェックなどの運用・保守を行います。",
        tags: ["サーバ設計", "ハードウェア選定", "OS設定", "監視・障害対応", "バックアップ"],
      },
      {
        icon: Network,
        title: "ネットワーク設計・構築・運用・保守",
        body: "お客様が実現したいサービス・システムに応じて、最適なネットワーク設計・構築を行います。当社では、ネットワーク計画策定の段階から実際の設計・構築・運用・保守に至るまでトータルサポートを行います。",
        tags: ["ネットワーク設計", "構築・設定", "運用・保守", "セキュリティ"],
      },
    ],
    cta: "お問い合わせはこちら",
  },
  en: {
    hero: { label: "SERVICES", title: "Infrastructure Services", desc: "We design and build the optimal server infrastructure for your needs." },
    services: [
      {
        icon: Server,
        title: "Server Design, Construction, Operation & Maintenance",
        body: "Server configuration requires careful consideration of hardware and software based on its intended use — CPU cores, clock speed, storage capacity, OS, middleware, security, and network equipment. We balance budget and priorities to select and design the appropriate server.\n\nWe also provide operation and maintenance services including monitoring, incident response, configuration management, backups, and security checks to ensure your server performs as expected.",
        tags: ["Server Design", "Hardware Selection", "OS Configuration", "Monitoring", "Backup"],
      },
      {
        icon: Network,
        title: "Network Design, Construction, Operation & Maintenance",
        body: "We provide optimal network design and construction based on your desired service or system. From network planning through design, construction, operation, and maintenance — we provide total support.",
        tags: ["Network Design", "Construction", "Operation & Maintenance", "Security"],
      },
    ],
    cta: "Contact Us",
  },
  zh: {
    hero: { label: "服务", title: "基础架构服务", desc: "根据您希望实现的服务，设计和构建最优服务器环境。" },
    services: [
      {
        icon: Server,
        title: "服务器设计、构建、运营、维护",
        body: "服务器需要根据其用途来规划所需的硬件和软件配置——CPU核心数、主频、存储容量、操作系统、中间件、安全以及网络设备等，我们在综合考虑预算和优先级的基础上，进行合理的服务器选型与设计。\n\n同时，为确保所构建的服务器能够发挥并维持预期性能，我们还提供监控、故障响应、配置管理、备份及安全检查等运营维护服务。",
        tags: ["服务器设计", "硬件选型", "操作系统配置", "监控/故障响应", "备份"],
      },
      {
        icon: Network,
        title: "网络设计、构建、运营、维护",
        body: "根据客户希望实现的服务或系统，提供最优的网络设计和构建方案。从网络规划阶段到实际设计、构建、运营和维护，我们提供全方位支持。",
        tags: ["网络设计", "构建配置", "运营维护", "安全"],
      },
    ],
    cta: "联系我们",
  },
};

export default async function InfrastructurePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = content[locale as Locale] || content.ja;

  return (
    <>
      <PageHero label={c.hero.label} title={c.hero.title} description={c.hero.desc} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-10">
        {c.services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="glass-card rounded-2xl p-8 lg:p-10">
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white leading-snug pt-1">{svc.title}</h2>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6 whitespace-pre-line">{svc.body}</p>
                <div className="flex flex-wrap gap-2">
                  {svc.tags.map((tag) => (
                    <span key={tag} className="bg-indigo-500/10 text-indigo-400 text-xs px-3 py-1.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          );
        })}

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
