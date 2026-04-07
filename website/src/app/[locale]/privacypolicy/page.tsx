import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "プライバシーポリシー" };

const content = {
  ja: {
    hero: { title: "プライバシーポリシー", desc: "個人情報保護方針" },
    body: `
## 個人情報保護方針

株式会社シャインソフトは、個人情報の取得・利用・提供について、利用目的を明らかにした上で、事業の内容及び規模を考慮し適切に管理する社内規程に従い取り扱います。

## 基本方針

**1. 個人情報の保護**

個人情報に関する本人の権利を尊重し、利用目的の通知、開示、内容訂正等、および利用停止等の要求に対応します。

**2. 安全対策**

情報セキュリティ対策および管理組織体制の両面から合理的な安全対策を講じ、個人情報への不正アクセス、紛失、破壊、改ざん、漏洩等の予防処置を講じます。

**3. 法令遵守**

個人情報保護関連法令および国の指針に従います。

**4. 継続的改善**

ISO/IEC 27001:2013認証（ISMS）を取得し、情報セキュリティ管理の継続的改善に取り組みます。

## 個人情報の利用目的

1. システムエンジニアリング業務
2. セミナー案内
3. ソフトウェア販売
4. 採用選考
5. 取引先管理
6. 顧客満足度調査
7. その他事業に関連する各種目的

## WEBサイトにおける取扱い

- SSL暗号化通信を使用しています
- クッキー（Cookie）を使用しています
- アクセス解析のため匿名情報を収集しています

## 個人情報に関するお問い合わせ

〒105-0003 東京都港区西新橋1-24-16 平和ビル8F
株式会社シャインソフト 個人情報相談窓口
TEL：03-6721-5778
    `,
  },
  en: {
    hero: { title: "Privacy Policy", desc: "Personal Information Protection Policy" },
    body: `
## Privacy Policy

SHINESOFT CORPORATION handles the acquisition, use, and provision of personal information in accordance with internal regulations that clarify the purpose of use and consider the nature and scale of our business.

## Basic Policy

**1. Protection of Personal Information**

We respect the rights of individuals regarding their personal information, and will respond to requests for notification of purpose of use, disclosure, correction of content, and suspension of use.

**2. Security Measures**

We implement reasonable security measures from both information security and organizational management perspectives to prevent unauthorized access, loss, destruction, falsification, and leakage of personal information.

**3. Legal Compliance**

We comply with all laws and regulations related to personal information protection and national guidelines.

**4. Continuous Improvement**

We hold ISO/IEC 27001:2013 certification (ISMS) and are committed to continuous improvement of information security management.

## Purposes of Use

1. Systems engineering business
2. Seminar announcements
3. Software sales
4. Employment screening
5. Business partner management
6. Customer satisfaction surveys
7. Other purposes related to business operations

## Website Handling

- SSL encrypted communication is used
- Cookies are used
- Anonymous information is collected for access analysis

## Contact for Personal Information Inquiries

SHINESOFT CORPORATION Personal Information Consultation Desk
Heiwa Bldg. 8F, 1-24-16 Nishi-Shimbashi, Minato-ku, Tokyo 105-0003
TEL: 03-6721-5778
    `,
  },
  zh: {
    hero: { title: "隐私政策", desc: "个人信息保护方针" },
    body: `
## 隐私政策

株式会社SHINESOFT在明确利用目的的前提下，依据考虑本公司业务内容及规模的内部规章，对个人信息的获取、利用及提供进行适当管理。

## 基本方针

**1. 个人信息保护**

尊重本人对个人信息的权利，对利用目的通知、公开、内容更正以及停止利用等要求予以响应。

**2. 安全措施**

从信息安全对策和管理组织体制两方面采取合理安全措施，防止个人信息的非法访问、丢失、破坏、篡改、泄露等风险。

**3. 法令遵守**

遵守个人信息保护相关法律法规及国家指导方针。

**4. 持续改进**

已取得ISO/IEC 27001:2013认证（ISMS），致力于持续改进信息安全管理。

## 个人信息的利用目的

1. 系统工程业务
2. 研讨会通知
3. 软件销售
4. 招聘录用
5. 合作伙伴管理
6. 客户满意度调查
7. 其他与业务相关的各类目的

## 网站中的处理方式

- 使用SSL加密通信
- 使用Cookie
- 为访问分析收集匿名信息

## 个人信息咨询联系方式

〒105-0003 东京都港区西新桥1-24-16 平和大楼8F
株式会社シャインソフト 个人信息咨询窗口
TEL：03-6721-5778
    `,
  },
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = content[locale as Locale] || content.ja;

  // Simple markdown-like rendering
  const renderBody = (text: string) => {
    return text
      .trim()
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("## ")) return `<h2 class="text-xl font-bold text-white mt-8 mb-4 border-l-4 border-sky-500 pl-4">${line.slice(3)}</h2>`;
        if (line.startsWith("**") && line.endsWith("**")) return `<h3 class="text-white font-semibold mt-4 mb-2">${line.slice(2, -2)}</h3>`;
        if (line.match(/^\d+\./)) return `<li class="text-slate-400 text-sm ml-4">${line}</li>`;
        if (line.startsWith("- ")) return `<li class="text-slate-400 text-sm ml-4 list-disc">${line.slice(2)}</li>`;
        if (line.trim() === "") return `<div class="h-2" key="${i}"></div>`;
        return `<p class="text-slate-400 text-sm leading-relaxed">${line}</p>`;
      })
      .join("");
  };

  return (
    <>
      <PageHero title={c.hero.title} description={c.hero.desc} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatedSection>
          <div className="glass-card rounded-2xl p-8 lg:p-12">
            <div dangerouslySetInnerHTML={{ __html: renderBody(c.body) }} />
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
