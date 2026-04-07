import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/dictionaries";
import PageHero from "@/components/layout/PageHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Briefcase, Users, Laptop } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "採用情報" };

const content = {
  ja: {
    hero: { label: "RECRUIT", title: "採用情報", desc: "シャインソフトで一緒に未来を創りませんか。" },
    tabs: ["新卒採用", "中途採用", "フリーランス"],
    graduate: {
      icon: Users,
      title: "新卒採用",
      jobs: ["開発エンジニア", "インフラエンジニア"],
      table: [
        { label: "勤務地", value: "本社（東京都港区西新橋）または都内クライアント先" },
        { label: "勤務時間", value: "9:30〜18:30（プロジェクトにより異なる）" },
        { label: "休日", value: "完全週休2日制、設立記念日（6/1）、有給・慶弔・産前産後・育児・介護休暇" },
      ],
      salary: [
        { label: "専門・短大2年卒", value: "230,000円（固定残業代32,000円含）" },
        { label: "大学卒・4年課程卒", value: "250,000円（固定残業代34,000円含）" },
        { label: "大学院卒", value: "270,000円（固定残業代37,000円含）" },
        { label: "外部研修期間中", value: "198,000円＋別途手当" },
      ],
      models: [
        { age: "25歳", role: "開発エンジニア（入社3年目）", salary: "約410万円" },
        { age: "29歳", role: "開発エンジニア（入社7年目）", salary: "約600万円" },
        { age: "32歳", role: "インフラエンジニア（入社7年目）", salary: "約620万円" },
      ],
      benefits: ["社会保険完備", "通勤手当（上限25,000円）", "家賃手当（新卒2年間：月20,000円）", "資格手当・職務手当・能力手当・家族手当", "外部研修費用補助", "産休・育休制度", "リモートワーク（社員の約80%実施）", "選択制退職金制度", "高度専門職VISAポイント20点加点企業"],
      education: ["新人研修", "フォローアップ研修", "OJT研修", "社外研修", "資格取得費用補助"],
    },
    midCareer: {
      icon: Briefcase,
      title: "中途採用",
      jobs: [
        { role: "SE", detail: "プロジェクトマネジメント、要件定義〜設計・開発" },
        { role: "PG", detail: "設計・開発・テスト" },
        { role: "OPEN系", detail: "C / Java / .NET / Python / Ruby 等" },
        { role: "汎用系", detail: "COBOL / C / PL/I / ASM 等" },
        { role: "制御系", detail: "C / C++ / VC++ 等" },
      ],
      salary: "経験を考慮の上、月給30〜90万円（固定残業代40,600〜121,700円含）",
    },
    freelance: {
      icon: Laptop,
      title: "フリーランス",
      body: "SE・PG（各種言語）、金融業務知識者歓迎。50代のプロジェクト参入も可能です。",
      area: "勤務地：首都圏各地（東京・神奈川・千葉・埼玉）",
      salary: "報酬：案件条件に応じて応相談",
    },
    cta: "採用についてお問い合わせ",
  },
  en: {
    hero: { label: "RECRUIT", title: "Careers", desc: "Join us in building the future at SHINESOFT." },
    tabs: ["New Graduate", "Mid-Career", "Freelance"],
    graduate: {
      icon: Users,
      title: "New Graduate Hiring",
      jobs: ["Development Engineer", "Infrastructure Engineer"],
      table: [
        { label: "Location", value: "Head office (Nishi-Shimbashi, Tokyo) or client sites in Tokyo" },
        { label: "Hours", value: "9:30–18:30 (may vary by project)" },
        { label: "Leave", value: "Full 2-day weekend, anniversary day (6/1), paid, condolence, maternity/paternity, childcare, nursing leave" },
      ],
      salary: [
        { label: "2-year vocational/junior college grad", value: "¥230,000 (incl. ¥32,000 fixed OT)" },
        { label: "4-year university grad", value: "¥250,000 (incl. ¥34,000 fixed OT)" },
        { label: "Graduate school", value: "¥270,000 (incl. ¥37,000 fixed OT)" },
        { label: "During external training", value: "¥198,000 + allowances" },
      ],
      models: [
        { age: "25", role: "Development Engineer (3rd year)", salary: "~¥4.1M/year" },
        { age: "29", role: "Development Engineer (7th year)", salary: "~¥6.0M/year" },
        { age: "32", role: "Infrastructure Engineer (7th year)", salary: "~¥6.2M/year" },
      ],
      benefits: ["Full social insurance", "Commuting allowance (up to ¥25,000)", "Housing allowance (¥20,000/mo, 2 yrs for new grads)", "Skill, job, ability, and family allowances", "External training cost support", "Maternity/paternity leave system", "Remote work (~80% of staff)", "Selective retirement plan", "Highly-skilled professional VISA +20 points company"],
      education: ["New employee training", "Follow-up training", "OJT", "External training", "Certification cost coverage"],
    },
    midCareer: {
      icon: Briefcase,
      title: "Mid-Career Hiring",
      jobs: [
        { role: "SE", detail: "Project management, requirements to design/development" },
        { role: "PG", detail: "Design, development, testing" },
        { role: "Open Systems", detail: "C / Java / .NET / Python / Ruby, etc." },
        { role: "General Purpose", detail: "COBOL / C / PL/I / ASM, etc." },
        { role: "Embedded", detail: "C / C++ / VC++, etc." },
      ],
      salary: "Based on experience: ¥300,000–¥900,000/mo (incl. fixed OT ¥40,600–¥121,700)",
    },
    freelance: {
      icon: Laptop,
      title: "Freelance",
      body: "SE/PG (various languages), financial domain knowledge welcome. Professionals in their 50s are also welcome.",
      area: "Location: Greater Tokyo area (Tokyo, Kanagawa, Chiba, Saitama)",
      salary: "Compensation: Negotiable based on project",
    },
    cta: "Contact Us About Careers",
  },
  zh: {
    hero: { label: "招聘", title: "招聘信息", desc: "加入SHINESOFT，共创未来。" },
    tabs: ["应届生招聘", "中途招聘", "自由职业者"],
    graduate: {
      icon: Users,
      title: "应届生招聘",
      jobs: ["开发工程师", "基础架构工程师"],
      table: [
        { label: "工作地点", value: "总部（东京都港区西新桥）或东京都内客户现场" },
        { label: "工作时间", value: "9:30〜18:30（因项目而异）" },
        { label: "假期", value: "完全双休制、周年纪念日（6/1）、带薪假、婚丧假、产假、育儿假、护理假" },
      ],
      salary: [
        { label: "专科·短大2年毕业", value: "230,000日元（含固定加班费32,000日元）" },
        { label: "大学·4年制课程毕业", value: "250,000日元（含固定加班费34,000日元）" },
        { label: "研究生毕业", value: "270,000日元（含固定加班费37,000日元）" },
        { label: "外部培训期间", value: "198,000日元＋另付补贴" },
      ],
      models: [
        { age: "25岁", role: "开发工程师（入职第3年）", salary: "约410万日元/年" },
        { age: "29岁", role: "开发工程师（入职第7年）", salary: "约600万日元/年" },
        { age: "32岁", role: "基础架构工程师（入职第7年）", salary: "约620万日元/年" },
      ],
      benefits: ["社会保险完备", "通勤补贴（上限25,000日元）", "住房补贴（应届生前2年：每月20,000日元）", "资格、职务、能力、家庭补贴", "外部培训费用补助", "产假·育儿假制度", "远程办公（约80%员工实施）", "可选退休金制度", "高度专业职业VISA加20分企业"],
      education: ["新员工培训", "追踪培训", "OJT培训", "外部研修", "考证费用补助"],
    },
    midCareer: {
      icon: Briefcase,
      title: "中途招聘",
      jobs: [
        { role: "SE", detail: "项目管理、需求定义〜设计/开发" },
        { role: "PG", detail: "设计、开发、测试" },
        { role: "开放系统", detail: "C / Java / .NET / Python / Ruby 等" },
        { role: "通用系统", detail: "COBOL / C / PL/I / ASM 等" },
        { role: "控制系统", detail: "C / C++ / VC++ 等" },
      ],
      salary: "根据经验，月薪30〜90万日元（含20小时固定加班费40,600〜121,700日元）",
    },
    freelance: {
      icon: Laptop,
      title: "自由职业者",
      body: "SE・PG（各种语言），欢迎有金融业务知识者。50岁以上人员参与项目也欢迎。",
      area: "工作地点：首都圈各地（东京・神奈川・千叶・埼玉）",
      salary: "报酬：根据项目条件协商",
    },
    cta: "咨询招聘信息",
  },
};

export default async function RecruitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = content[locale as Locale] || content.ja;

  return (
    <>
      <PageHero label={c.hero.label} title={c.hero.title} description={c.hero.desc} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
        {/* New Graduate */}
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
              <Users size={18} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">{c.graduate.title}</h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {c.graduate.jobs.map((job) => (
              <span key={job} className="bg-sky-500/10 text-sky-400 px-4 py-2 rounded-lg text-sm font-medium">
                {job}
              </span>
            ))}
          </div>

          <div className="glass-card rounded-2xl overflow-hidden mb-6">
            {c.graduate.table.map((row, i) => (
              <div key={i} className={`flex flex-col sm:flex-row ${i !== 0 ? "border-t border-white/5" : ""}`}>
                <dt className="sm:w-32 px-6 py-4 text-slate-500 text-sm font-medium flex-shrink-0 bg-white/2">{row.label}</dt>
                <dd className="px-6 py-4 text-slate-200 text-sm">{row.value}</dd>
              </div>
            ))}
          </div>

          {/* Salary */}
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider text-slate-400">給与 / Salary</h3>
          <div className="glass-card rounded-xl overflow-hidden mb-6">
            {c.graduate.salary.map((row, i) => (
              <div key={i} className={`flex flex-col sm:flex-row ${i !== 0 ? "border-t border-white/5" : ""}`}>
                <dt className="sm:w-48 px-5 py-3 text-slate-500 text-sm flex-shrink-0">{row.label}</dt>
                <dd className="px-5 py-3 text-slate-200 text-sm font-mono">{row.value}</dd>
              </div>
            ))}
          </div>

          {/* Model salary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {c.graduate.models.map((m, i) => (
              <div key={i} className="glass-card rounded-xl p-4 text-center">
                <div className="text-slate-400 text-xs mb-1">{m.age}</div>
                <div className="text-slate-300 text-xs mb-2">{m.role}</div>
                <div className="text-sky-400 font-bold text-lg">{m.salary}</div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider text-slate-400">福利厚生</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {c.graduate.benefits.map((b) => (
              <div key={b} className="flex items-center gap-2 text-slate-300 text-sm px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                {b}
              </div>
            ))}
          </div>

          {/* Education */}
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider text-slate-400">教育制度</h3>
          <div className="flex flex-wrap gap-2">
            {c.graduate.education.map((e) => (
              <span key={e} className="bg-white/5 text-slate-300 text-xs px-3 py-1.5 rounded-lg">
                {e}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Mid-career */}
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">{c.midCareer.title}</h2>
          </div>
          <div className="glass-card rounded-xl overflow-hidden mb-4">
            {c.midCareer.jobs.map((job, i) => (
              <div key={i} className={`flex ${i !== 0 ? "border-t border-white/5" : ""}`}>
                <dt className="w-28 px-5 py-3 text-sky-400 font-semibold text-sm flex-shrink-0">{job.role}</dt>
                <dd className="px-5 py-3 text-slate-300 text-sm">{job.detail}</dd>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm glass-card rounded-xl px-5 py-4">{c.midCareer.salary}</p>
        </AnimatedSection>

        {/* Freelance */}
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Laptop size={18} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">{c.freelance.title}</h2>
          </div>
          <div className="glass-card rounded-xl p-6 space-y-3">
            <p className="text-slate-300 text-sm leading-relaxed">{c.freelance.body}</p>
            <p className="text-slate-400 text-sm">{c.freelance.area}</p>
            <p className="text-slate-400 text-sm">{c.freelance.salary}</p>
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
