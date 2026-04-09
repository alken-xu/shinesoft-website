import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Cloud, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "クラウドサービス" };

const content = {
  ja: {
    hero: { label: "SERVICES", title: "クラウドサービス", desc: "クラウド活用でビジネスの効率化とコスト削減を実現します。" },
    services: [
      {
        icon: Cloud,
        title: "クラウド構築",
        body: "これまでITインフラの整備・構築にはオンプレミスによる運用が一般的でしたが、現在はクラウドサービスの活用が主流となっています。インターネット上のサーバを利用し、業務システムなどをクラウドで運用できる状態にセットアップを行います。インフラをクラウド化することで、業務の効率化やコストダウンが実現されます。",
        tags: ["AWS", "Azure", "GCP", "クラウド移行", "コスト最適化"],
      },
      {
        icon: Layers,
        title: "サーバ仮想化",
        body: "サーバ仮想化とは、ソフトウェアによって複数のハードウェアを統合することで、1台のサーバを複数台のように作動させる技術です。ベースとなる1台を「物理サーバ」、仮想化されたものを「仮想サーバ」と呼びます。導入により、サーバ台数を大幅に削減できコストカットにつながり、ハードウェアリソースを効率的に利用できるようになります。",
        tags: ["VMware", "Hyper-V", "KVM", "Kubernetes", "Docker"],
      },
    ],
    certs: "自社技術資格",
    certList: ["KCSP（Kubernetes認定サービスプロバイダー）", "KTP（Kubernetesトレーニングパートナー）", "ISMS認証（ISO/IEC 27001:2013）"],
    cta: "お問い合わせはこちら",
  },
  en: {
    hero: { label: "SERVICES", title: "Cloud Services", desc: "Achieve business efficiency and cost reduction through cloud utilization." },
    services: [
      {
        icon: Cloud,
        title: "Cloud Construction",
        body: "While on-premises operation was the norm for IT infrastructure, cloud services have become mainstream. We set up business systems to run on internet servers. Migrating infrastructure to the cloud enables business efficiency improvements and cost reductions.",
        tags: ["AWS", "Azure", "GCP", "Cloud Migration", "Cost Optimization"],
      },
      {
        icon: Layers,
        title: "Server Virtualization",
        body: "Server virtualization is a technology that integrates multiple hardware units through software, making one server operate as if it were multiple servers. The base unit is called a 'physical server,' while the virtualized instances are called 'virtual servers.' This significantly reduces the number of physical servers, cutting costs and enabling efficient use of hardware resources.",
        tags: ["VMware", "Hyper-V", "KVM", "Kubernetes", "Docker"],
      },
    ],
    certs: "Our Technical Certifications",
    certList: ["KCSP (Kubernetes Certified Service Provider)", "KTP (Kubernetes Training Partner)", "ISMS Certification (ISO/IEC 27001:2013)"],
    cta: "Contact Us",
  },
  zh: {
    hero: { label: "服务", title: "云服务", desc: "通过云计算实现业务效率提升和成本降低。" },
    services: [
      {
        icon: Cloud,
        title: "云构建",
        body: "过去IT基础设施的整备和构建通常采用本地部署方式，但如今云服务的利用已成为主流。我们通过互联网服务器为业务系统进行云化部署配置，从而实现业务效率提升和成本降低。",
        tags: ["AWS", "Azure", "GCP", "云迁移", "成本优化"],
      },
      {
        icon: Layers,
        title: "服务器虚拟化",
        body: "服务器虚拟化是通过软件将多台硬件整合，使一台服务器能够像多台服务器一样运行的技术。基础物理机称为「物理服务器」，虚拟化后的实例称为「虚拟服务器」。引入虚拟化可大幅减少物理服务器数量，降低成本，并实现硬件资源的高效利用。",
        tags: ["VMware", "Hyper-V", "KVM", "Kubernetes", "Docker"],
      },
    ],
    certs: "自有技术认证",
    certList: ["KCSP（Kubernetes认定服务提供商）", "KTP（Kubernetes培训合作伙伴）", "ISMS认证（ISO/IEC 27001:2013）"],
    cta: "联系我们",
  },
};

export default async function CloudPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = content[locale as Locale] || content.ja;

  return (
    <>
      <PageHero label={c.hero.label} title={c.hero.title} description={c.hero.desc} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-24 space-y-10">
        {c.services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="glass-card rounded-2xl p-8 lg:p-10">
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white leading-snug pt-1">{svc.title}</h2>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">{svc.body}</p>
                <div className="flex flex-wrap gap-2">
                  {svc.tags.map((tag) => (
                    <span key={tag} className="bg-cyan-500/10 text-cyan-400 text-xs px-3 py-1.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          );
        })}

        {/* Certifications */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-4">{c.certs}</h2>
          <div className="glass-card rounded-xl p-6">
            <ul className="space-y-3">
              {c.certList.map((cert) => (
                <li key={cert} className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                  {cert}
                </li>
              ))}
            </ul>
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
