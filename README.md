# 株式会社シャインソフト ホームページ リニューアルプロジェクト

**SHINESOFT CORPORATION** の公式サイト（https://shinesoft.co.jp/）全面リニューアルのソースコードリポジトリです。

---

## リポジトリ構成

```
/
├── README.md              # 本ファイル
├── requirements.md        # 要件定義書（コンテンツバックアップ含む）
├── CLAUDE.md              # AI開発エージェント向けガイド
└── website/               # Next.js アプリケーション本体
    ├── src/
    │   ├── app/[locale]/  # 全ページ（13ページ × 3言語）
    │   ├── components/    # UIコンポーネント
    │   ├── content/news/  # ニュース記事（Markdown）
    │   ├── lib/           # ユーティリティ
    │   ├── messages/      # 翻訳ファイル（ja/en/zh）
    │   └── proxy.ts       # 言語リダイレクト
    ├── .env.local.example # 環境変数テンプレート
    └── next.config.ts     # リダイレクト設定
```

---

## 概要設計

### 技術スタック

| レイヤー | 技術 | バージョン |
|---------|------|----------|
| フレームワーク | Next.js (App Router) | 16.x |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | v4 |
| アニメーション | Intersection Observer API / Canvas API | - |
| アイコン | Lucide React | - |
| メール送信 | Nodemailer (SMTP) | - |
| ニュースCMS | Markdown + gray-matter + remark | - |
| ホスティング | Vercel（推奨） | - |

### アーキテクチャ図

```
ブラウザ
  │
  ▼
[src/proxy.ts]  ←── Accept-Language ヘッダーで言語判定
  │
  ├─ /ja/...   日本語（デフォルト）
  ├─ /en/...   英語
  └─ /zh/...   中国語（簡体字）
       │
       ▼
[app/[locale]/layout.tsx]  ←── 辞書（messages/*.json）を読み込み
       │
       ├── Header（ナビゲーション・言語切替）
       ├── [page.tsx] 各ページ
       └── Footer
```

### 多言語（i18n）設計

```
src/messages/
  ├── ja.json   日本語
  ├── en.json   英語
  └── zh.json   中国語

src/lib/dictionaries.ts
  └── getDictionary(locale) → 辞書オブジェクトを返す（Server Only）

src/proxy.ts
  └── proxy()  → ブラウザ言語を検出し /{locale}/path へリダイレクト
```

### ニュース管理（Markdown CMS）

```
src/content/news/*.md
  ├── frontmatter: title / date / category / slug
  └── body: Markdown 本文

src/lib/news.ts
  ├── getAllNews()         → 一覧取得（日付降順）
  └── getNewsPost(slug)   → 記事詳細取得（HTML変換済み）
```

**新記事の追加方法：**
1. `src/content/news/` に `.md` ファイルを追加
2. frontmatter（title / date / category / slug）を記入
3. デプロイするだけで自動反映

### お問い合わせフォーム

```
[ContactForm.tsx]  ←── Client Component（バリデーション・送信）
      │ POST /api/contact
      ▼
[app/api/contact/route.ts]  ←── Server（SMTP経由でメール送信）
      │
      ├── 送信者へ自動返信メール（ja/en/zh 対応）
      └── 社内担当者へ通知メール
```

### SEO / GEO 対策

| 対策 | 実装箇所 |
|------|---------|
| JSON-LD 構造化データ（Organization） | `app/[locale]/layout.tsx` |
| hreflang タグ | `app/[locale]/layout.tsx` |
| XMLサイトマップ自動生成 | `app/sitemap.ts` |
| robots.txt | `app/robots.ts` |
| ページ別メタタイトル・説明 | 各 `page.tsx` の `generateMetadata` |
| 301リダイレクト（旧URL保護） | `next.config.ts` |

### ページ一覧

| ページ | パス | SSG |
|--------|------|-----|
| トップ | `/[locale]` | ✅ |
| 会社概要 | `/[locale]/about/corporate` | ✅ |
| シャインソフトの強み | `/[locale]/about/feature` | ✅ |
| ソフトウェア開発 | `/[locale]/services/software` | ✅ |
| 基盤サービス | `/[locale]/services/infrastructure` | ✅ |
| クラウドサービス | `/[locale]/services/cloud` | ✅ |
| ITトレーニング | `/[locale]/services/training` | ✅ |
| 研究 | `/[locale]/services/research` | ✅ |
| ニュース一覧 | `/[locale]/news` | ✅ |
| ニュース詳細 | `/[locale]/news/[slug]` | ✅ |
| 採用情報 | `/[locale]/recruit` | ✅ |
| お問い合わせ | `/[locale]/contact` | ✅ |
| プライバシーポリシー | `/[locale]/privacypolicy` | ✅ |
| サイトマップ | `/[locale]/sitemap` | ✅ |

---

## 開発環境セットアップ

```bash
cd website
npm install
cp .env.local.example .env.local
# .env.local を編集してSMTP設定を入力

npm run dev      # 開発サーバー（http://localhost:3000）
npm run build    # プロダクションビルド
npm run lint     # ESLint
```

### 環境変数（`website/.env.local`）

| 変数名 | 説明 |
|--------|------|
| `SMTP_HOST` | SMTPサーバーホスト名 |
| `SMTP_PORT` | ポート番号（通常 587） |
| `SMTP_SECURE` | TLS使用の場合 `true` |
| `SMTP_USER` | SMTPユーザー名 |
| `SMTP_PASS` | SMTPパスワード |
| `SMTP_FROM` | 送信元メールアドレス |
| `CONTACT_TO_EMAIL` | 問い合わせ受信先メール |

---

## デプロイ（Vercel）

1. Vercel にリポジトリを接続
2. **Root Directory** を `website` に設定
3. Environment Variables に `.env.local` の値を設定
4. デプロイ実行

---

## 旧URL → 新URL リダイレクト対応表

| 旧URL | 新URL | ステータス |
|-------|-------|----------|
| `/feature` | `/about/feature` | 301 |
| `/company` | `/about/corporate` | 301 |
| `/software` | `/services/software` | 301 |
| `/infrastructure-services` | `/services/infrastructure` | 301 |
| `/cloudservice` | `/services/cloud` | 301 |
| `/ittraining` | `/services/training` | 301 |
| `/techstudy` | `/services/research` | 301 |
| `/recruitinfo` | `/recruit` | 301 |
| `/archives/news` | `/news` | 301 |
| `/archives/news/:slug` | `/news/:slug` | 301 |
