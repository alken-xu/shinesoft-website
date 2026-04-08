import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

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

function buildAutoReplyEmail(body: ContactBody): { subject: string; text: string } {
  const locale = body.locale;
  const typeLabel = getTypeLabel(body.type, locale);

  const templates: Record<string, { subject: string; text: string }> = {
    ja: {
      subject: "【シャインソフト】お問い合わせを受け付けました",
      text: `
${body.name} 様

このたびはお問い合わせいただきありがとうございます。
以下の内容でお問い合わせを受け付けました。

━━━━━━━━━━━━━━━━━━━━━━
■ お問い合わせ内容：${typeLabel}
■ 会社名：${body.company}
■ 氏名：${body.name}
■ メールアドレス：${body.email}
■ 電話番号：${body.phone}
${body.remarks ? `■ 備考：${body.remarks}` : ""}
━━━━━━━━━━━━━━━━━━━━━━

担当者より2〜3営業日以内にご連絡いたします。
お急ぎの場合は、下記電話番号までお問い合わせください。

株式会社シャインソフト
〒105-0003 東京都港区西新橋1-24-16 平和ビル8F
TEL: 03-6721-5778
https://shinesoft.co.jp/
      `.trim(),
    },
    en: {
      subject: "[SHINESOFT] We have received your inquiry",
      text: `
Dear ${body.name},

Thank you for contacting SHINESOFT CORPORATION.
We have received your inquiry with the following details:

━━━━━━━━━━━━━━━━━━━━━━
■ Inquiry Type: ${typeLabel}
■ Company: ${body.company}
■ Name: ${body.name}
■ Email: ${body.email}
■ Phone: ${body.phone}
${body.remarks ? `■ Notes: ${body.remarks}` : ""}
━━━━━━━━━━━━━━━━━━━━━━

A member of our team will contact you within 2–3 business days.
For urgent inquiries, please call us at the number below.

SHINESOFT CORPORATION
Heiwa Bldg. 8F, 1-24-16 Nishi-Shimbashi, Minato-ku, Tokyo 105-0003
TEL: +81-3-6721-5778
https://shinesoft.co.jp/
      `.trim(),
    },
    zh: {
      subject: "【SHINESOFT】我们已收到您的咨询",
      text: `
尊敬的 ${body.name} 先生/女士，

感谢您联系株式会社SHINESOFT。
我们已收到您的咨询，详情如下：

━━━━━━━━━━━━━━━━━━━━━━
■ 咨询类型：${typeLabel}
■ 公司名称：${body.company}
■ 姓名：${body.name}
■ 邮箱：${body.email}
■ 电话：${body.phone}
${body.remarks ? `■ 备注：${body.remarks}` : ""}
━━━━━━━━━━━━━━━━━━━━━━

我们的工作人员将在2〜3个工作日内与您联系。
如需紧急处理，请拨打以下电话。

株式会社シャインソフト
〒105-0003 东京都港区西新桥1-24-16 平和大楼8F
TEL: +81-3-6721-5778
https://shinesoft.co.jp/
      `.trim(),
    },
  };

  return templates[locale] || templates.ja;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();

    if (!body.type || !body.company || !body.name || !body.email || !body.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!/^\d{10,11}$/.test(body.phone)) {
      return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
    }

    if (!process.env.SMTP_USER || !process.env.CONTACT_TO_EMAIL) {
      console.log("[Contact] Email not configured. Form data:", body);
      return NextResponse.json({ ok: true });
    }

    // tls.family:4 でDNS解決をIPv4に強制する
    // setDefaultResultOrder や NODE_OPTIONS が効かない環境でも
    // dns.lookup({ family: 4 }) が直接呼ばれるため確実にIPv4で接続される
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      tls: {
        servername: "smtp.gmail.com",
        family: 4, // IPv4強制
      },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } as SMTPTransport.Options);

    const autoReply = buildAutoReplyEmail(body);
    const adminText = buildAdminEmail(body);
    const fromName = "株式会社シャインソフト";
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@shinesoft.co.jp";

    // 社内通知メール（Reply-Toに問い合わせユーザーのアドレスを設定）
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: `"${body.name}" <${body.email}>`,
      subject: `【新規お問い合わせ】${getTypeLabel(body.type, body.locale)} - ${body.company}`,
      text: adminText,
    });

    // 自動返信メール（送信者宛）
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: body.email,
      subject: autoReply.subject,
      text: autoReply.text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
