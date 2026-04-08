import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactBody {
  type: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  remarks: string;
  locale: string;
  privacy: boolean;
}

const typeLabels: Record<string, Record<string, string>> = {
  ses: { ja: "SES", en: "SES", zh: "SES" },
  software: { ja: "ソフトウェア受託開発", en: "Software Development", zh: "软件外包开发" },
  dispatch: { ja: "労働者派遣", en: "Staff Dispatch", zh: "劳務派遣" },
  recruit: { ja: "リクルート", en: "Recruitment", zh: "招聘" },
  other: { ja: "その他", en: "Other", zh: "其他" },
};

function getTypeLabel(type: string, locale: string): string {
  return typeLabels[type]?.[locale] ?? type;
}

function buildAdminEmail(body: ContactBody): string {
  const locale = body.locale;
  const typeLabel = getTypeLabel(body.type, locale);
  const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【新規お問い合わせ】シャインソフト 公式サイト
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

受信日時：${now}
言語：${locale.toUpperCase()}

■ お問い合わせ内容：${typeLabel}
■ 会社名：${body.company}
■ 氏名：${body.name}
■ メールアドレス：${body.email}
■ 電話番号：${body.phone}
■ 備考：
${body.remarks || "（なし）"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
このメールはシャインソフト公式サイトのお問い合わせフォームから自動送信されています。
  `.trim();
}

// ─── nodemailer SMTP でメール送信 ────────────────────────────────────────────

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();

    if (!body.type || !body.company || !body.name || !body.email || !body.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!/^0\d{1,4}-\d{1,4}-\d{3,4}$/.test(body.phone)) {
      return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.CONTACT_TO_EMAIL) {
      console.log("[Contact] Email not configured. Form data:", body);
      return NextResponse.json({ ok: true });
    }

    const transporter = createTransporter();
    const adminText = buildAdminEmail(body);
    const fromName = "株式会社シャインソフト";
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
    const from = `"${fromName}" <${fromEmail}>`;

    // 社内通知メール（Reply-To に問い合わせユーザーのアドレスを設定）
    await transporter.sendMail({
      from,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: `"${body.name}" <${body.email}>`,
      subject: `【新規お問い合わせ】${getTypeLabel(body.type, body.locale)} - ${body.company}`,
      text: adminText,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
