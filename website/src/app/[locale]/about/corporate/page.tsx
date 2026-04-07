import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { MapPin, Phone, Building2, Award, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "会社概要" };

const content = {
  ja: {
    hero: { label: "ABOUT", title: "会社概要", desc: "株式会社シャインソフトの基本情報をご紹介します。" },
    profile: "会社プロフィール",
    certs: "認証・資格",
    offices: "拠点",
    business: "事業内容",
    rows: [
      { label: "商号", value: "株式会社シャインソフト（英称：SHINESOFT CORPORATION）" },
      { label: "設立", value: "2006年6月1日" },
      { label: "資本金", value: "3,000万円" },
      { label: "代表者", value: "劉 健（代表取締役）" },
      { label: "社員数", value: "103名（契約社員含む / 2024年現在）" },
      { label: "取引銀行", value: "三井住友銀行 新宿支店 / みずほ銀行 新橋中央支店" },
      { label: "労働者派遣", value: "派13-312580" },
    ],
    certList: [
      { name: "ISMS認証", detail: "ISO/IEC 27001:2013（認証番号：MSA-IS-338）" },
      { name: "KCSP", detail: "Kubernetes認定サービスプロバイダー" },
      { name: "KTP", detail: "Kubernetesトレーニングパートナー" },
      { name: "埼玉DXパートナー", detail: "2023年11月登録" },
    ],
    officeList: [
      { name: "本社", address: "〒105-0003 東京都港区西新橋1-24-16 平和ビル8F", tel: "03-6721-5778 / FAX：03-6721-5779" },
      { name: "R&Dセンター", address: "〒105-0003 東京都港区西新橋1-12-10 一景ビル4F", tel: "" },
      { name: "大阪営業所", address: "〒555-0034 大阪府大阪市西淀川区福町2-20-11", tel: "" },
    ],
    businessList: [
      "ソフトウェア開発（要件定義〜保守まで一貫対応）",
      "基盤サービス（サーバ・ネットワーク設計構築運用）",
      "クラウドサービス（クラウド構築・サーバ仮想化）",
      "ITトレーニング（Kubernetes・Linux・Web開発研修）",
      "技術研究（OSS研究・CNCF活動）",
    ],
  },
  en: {
    hero: { label: "ABOUT", title: "Company Profile", desc: "Basic information about SHINESOFT CORPORATION." },
    profile: "Company Profile",
    certs: "Certifications",
    offices: "Offices",
    business: "Business Areas",
    rows: [
      { label: "Company Name", value: "SHINESOFT CORPORATION（株式会社シャインソフト）" },
      { label: "Founded", value: "June 1, 2006" },
      { label: "Capital", value: "¥30,000,000" },
      { label: "CEO", value: "Jian Liu (Representative Director)" },
      { label: "Employees", value: "103 (including contract employees, as of 2024)" },
      { label: "Banks", value: "SMBC Shinjuku Br. / Mizuho Shimbashi-chuo Br." },
      { label: "Dispatch License", value: "No. 13-312580" },
    ],
    certList: [
      { name: "ISMS Certification", detail: "ISO/IEC 27001:2013 (No. MSA-IS-338)" },
      { name: "KCSP", detail: "Kubernetes Certified Service Provider" },
      { name: "KTP", detail: "Kubernetes Training Partner" },
      { name: "Saitama DX Partner", detail: "Registered November 2023" },
    ],
    officeList: [
      { name: "Head Office", address: "Heiwa Bldg. 8F, 1-24-16 Nishi-Shimbashi, Minato-ku, Tokyo 105-0003", tel: "+81-3-6721-5778" },
      { name: "R&D Center", address: "Ikkei Bldg. 4F, 1-12-10 Nishi-Shimbashi, Minato-ku, Tokyo 105-0003", tel: "" },
      { name: "Osaka Office", address: "2-20-11 Fukumachi, Nishiyodogawa-ku, Osaka 555-0034", tel: "" },
    ],
    businessList: [
      "Software Development (end-to-end from requirements to maintenance)",
      "Infrastructure Services (server & network design, construction, operation)",
      "Cloud Services (cloud construction & server virtualization)",
      "IT Training (Kubernetes, Linux, Web development)",
      "Research (OSS research & CNCF activities)",
    ],
  },
  zh: {
    hero: { label: "关于我们", title: "公司概况", desc: "介绍株式会社SHINESOFT的基本信息。" },
    profile: "公司简介",
    certs: "认证资质",
    offices: "办公地点",
    business: "业务内容",
    rows: [
      { label: "公司名称", value: "株式会社シャインソフト（SHINESOFT CORPORATION）" },
      { label: "成立日期", value: "2006年6月1日" },
      { label: "注册资本", value: "3,000万日元" },
      { label: "代表人", value: "刘 健（代表取締役）" },
      { label: "员工人数", value: "103名（含合同工，截至2024年）" },
      { label: "合作银行", value: "三井住友银行 新宿支店 / 瑞穗银行 新桥中央支店" },
      { label: "劳务派遣许可", value: "派13-312580" },
    ],
    certList: [
      { name: "ISMS认证", detail: "ISO/IEC 27001:2013（认证号：MSA-IS-338）" },
      { name: "KCSP", detail: "Kubernetes认定服务提供商" },
      { name: "KTP", detail: "Kubernetes培训合作伙伴" },
      { name: "埼玉DX合作伙伴", detail: "2023年11月注册" },
    ],
    officeList: [
      { name: "总部", address: "〒105-0003 东京都港区西新桥1-24-16 平和大楼8F", tel: "03-6721-5778" },
      { name: "R&D中心", address: "〒105-0003 东京都港区西新桥1-12-10 一景大楼4F", tel: "" },
      { name: "大阪营业所", address: "〒555-0034 大阪府大阪市西淀川区福町2-20-11", tel: "" },
    ],
    businessList: [
      "软件开发（从需求定义到维护的一站式服务）",
      "基础架构服务（服务器及网络设计、构建、运营）",
      "云服务（云构建及服务器虚拟化）",
      "IT培训（Kubernetes、Linux、Web开发培训）",
      "技术研究（OSS研究及CNCF活动）",
    ],
  },
};

export default async function CorporatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = content[locale as Locale] || content.ja;

  return (
    <>
      <PageHero label={c.hero.label} title={c.hero.title} description={c.hero.desc} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
        {/* Profile table */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Building2 size={20} className="text-sky-400" /> {c.profile}
          </h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            {c.rows.map((row, i) => (
              <div key={i} className={`flex flex-col sm:flex-row ${i !== 0 ? "border-t border-white/5" : ""}`}>
                <dt className="sm:w-40 px-6 py-4 text-slate-500 text-sm font-medium flex-shrink-0 bg-white/2">
                  {row.label}
                </dt>
                <dd className="px-6 py-4 text-slate-200 text-sm">{row.value}</dd>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Award size={20} className="text-sky-400" /> {c.certs}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.certList.map((cert, i) => (
              <div key={i} className="glass-card rounded-xl p-5">
                <div className="text-sky-400 font-bold mb-1">{cert.name}</div>
                <div className="text-slate-400 text-sm">{cert.detail}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Offices */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <MapPin size={20} className="text-sky-400" /> {c.offices}
          </h2>
          <div className="space-y-4">
            {c.officeList.map((office, i) => (
              <div key={i} className="glass-card rounded-xl p-5">
                <div className="text-white font-semibold mb-1">{office.name}</div>
                <div className="text-slate-400 text-sm">{office.address}</div>
                {office.tel && (
                  <div className="flex items-center gap-2 mt-2 text-slate-400 text-sm">
                    <Phone size={12} /> {office.tel}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Business */}
        <AnimatedSection>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Users size={20} className="text-sky-400" /> {c.business}
          </h2>
          <div className="glass-card rounded-2xl p-6">
            <ul className="space-y-3">
              {c.businessList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
