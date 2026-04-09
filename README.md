# 株式会社シャインソフト ホームページ リニューアルプロジェクト

**SHINESOFT CORPORATION** の[公式サイト](https://shinesoft.co.jp/)全面リニューアルのソースコードリポジトリです。

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
    │   ├── content/
    │   │   ├── news/      # ニュース記事（Markdown）
    │   │   └── about/     # 会社紹介ページ（Markdown）
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
| コンテンツCMS | Markdown + gray-matter + remark | - |
| ホスティング | Render | - |

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

### コンテンツ管理（Markdown CMS）

```
src/content/
├── news/*.md
│   ├── frontmatter: title / date / category / slug
│   └── body: Markdown 本文
└── about/
    ├── corporate/{ja,en,zh}.md   # 会社概要ページ
    └── feature/{ja,en,zh}.md    # シャインソフトの強みページ

src/lib/news.ts
  ├── getAllNews()         → 一覧取得（日付降順）
  └── getNewsPost(slug)   → 記事詳細取得（HTML変換済み）

src/lib/about.ts
  └── getAboutContent(page, locale) → ページコンテンツ取得
```

### お問い合わせフォーム

```
[ContactForm.tsx]  ←── Client Component（バリデーション・送信）
      │ POST /api/contact
      ▼
[app/api/contact/route.ts]  ←── Server（SMTP経由でメール送信）
      │
      └── 社内担当者へ通知メール（Reply-To に問い合わせ者アドレスを設定）
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

## デプロイ（Render）

1. Render にリポジトリを接続
2. **Root Directory** を `website` に設定
3. **Build Command**: `npm install && npm run build`
4. Environment Variables に `.env.local` の値を設定
5. デプロイ実行

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

---

## コンテンツのメンテナンス方法

### ファイル構成

```
website/src/content/
├── news/                    # ニュース記事
│   ├── article-slug.md
│   └── ...
└── about/                   # 会社紹介ページ
    ├── corporate/           # 会社概要（/about/corporate）
    │   ├── ja.md
    │   ├── en.md
    │   └── zh.md
    └── feature/             # シャインソフトの強み（/about/feature）
        ├── ja.md
        ├── en.md
        └── zh.md
```

---

### ニュース記事の更新

#### 新しい記事を追加する

`website/src/content/news/` に Markdown ファイルを作成します。

**ファイル名のルール：** 英数字とハイフンのみ（例: `isms-renewal-2025.md`）  
ファイル名がそのまま URL のスラッグになります。

```markdown
---
title: "記事タイトル"
date: "2026-04-08"
category: "お知らせ"
slug: "isms-renewal-2025"
---

ここから本文を Markdown で書く。

**太字**、*斜体*、リスト、リンクなど通常の Markdown 記法が使えます。

## 見出し

- リスト項目1
- リスト項目2
```

**frontmatter の項目：**

| 項目 | 説明 | 例 |
|------|------|----|
| `title` | 記事タイトル | `"ISMS再認証取得のお知らせ"` |
| `date` | 公開日（YYYY-MM-DD） | `"2026-04-08"` |
| `category` | カテゴリ | `"お知らせ"` / `"プレスリリース"` / `"出展告知"` |
| `slug` | URL スラッグ（ファイル名と同じ） | `"isms-renewal-2025"` |

#### 記事を編集する

該当の `.md` ファイルを直接書き換えます。

#### 記事を削除する

該当の `.md` ファイルを削除します。

---

### 会社紹介ページの更新

各ページは言語ごとに Markdown ファイルで管理します。**3言語すべてを同時に更新**してください。

| ページ | URL | 編集フォルダ |
|--------|-----|-------------|
| 会社概要 | `/about/corporate` | `website/src/content/about/corporate/` |
| シャインソフトの強み | `/about/feature` | `website/src/content/about/feature/` |

---

#### 会社概要（/about/corporate）を更新する

**ステップ 1 — 編集するファイルを開く**

```
website/src/content/about/corporate/
├── ja.md   ← 日本語
├── en.md   ← 英語
└── zh.md   ← 中国語
```

**ステップ 2 — 該当箇所を書き換える**

ファイルの構成（ja.md を例に）：

```yaml
---
hero:
  label: "ABOUT"
  title: "会社概要"
  desc: "株式会社シャインソフトの基本情報をご紹介します。"
profile: "会社プロフィール"
certs: "認証・資格"
offices: "拠点"
business: "事業内容"

# 会社基本情報テーブル
rows:
  - label: "商号"
    value: "株式会社シャインソフト（英称：SHINESOFT CORPORATION）"
  - label: "設立"
    value: "2006年6月1日"
  - label: "社員数"
    value: "103名（契約社員含む / 2024年現在）"  # ← 例：社員数が変わったらここを変更

# 認証・資格（追加する場合は - name/detail の行をコピーして追記）
certList:
  - name: "ISMS認証"
    detail: "ISO/IEC 27001:2013（認証番号：MSA-IS-338）"
  - name: "KCSP"
    detail: "Kubernetes認定サービスプロバイダー"

# 拠点（追加・変更する場合は - name/address/tel の行を編集）
officeList:
  - name: "本社"
    address: "〒105-0003 東京都港区西新橋1-24-16 平和ビル8F"
    tel: "03-6721-5778 / FAX：03-6721-5779"
  - name: "R&Dセンター"
    address: "〒105-0003 東京都港区西新橋1-12-10 一景ビル4F"
    tel: ""   # 電話番号なしの場合は空文字のままにする

# 事業内容（追加・変更する場合は - の行を編集）
businessList:
  - "ソフトウェア開発（要件定義〜保守まで一貫対応）"
  - "基盤サービス（サーバ・ネットワーク設計構築運用）"
---
```

**よくある更新パターン：**

| 更新内容 | 編集箇所 | 編集方法 |
|----------|----------|----------|
| 社員数の変更 | `rows` の `社員数` の `value` | 数字を書き換える |
| 新しい認証取得 | `certList` | `- name: / detail:` の2行をコピーして末尾に追加 |
| 拠点の追加 | `officeList` | `- name: / address: / tel:` の3行をコピーして末尾に追加 |
| 拠点の削除 | `officeList` | 該当の `- name: / address: / tel:` 3行をまるごと削除 |
| 事業内容の追加 | `businessList` | `- "内容"` の行を末尾に追加 |

**ステップ 3 — 3言語ぶん同じ変更を en.md・zh.md にも適用する**

**ステップ 4 — コミット・プッシュ**

```bash
git add website/src/content/about/corporate/
git commit -m "content: 社員数を110名に更新"
git push origin master
```

---

#### シャインソフトの強み（/about/feature）を更新する

**ステップ 1 — 編集するファイルを開く**

```
website/src/content/about/feature/
├── ja.md   ← 日本語
├── en.md   ← 英語
└── zh.md   ← 中国語
```

**ステップ 2 — 該当箇所を書き換える**

ファイルの構成（ja.md を例に）：

```yaml
---
hero:
  label: "FEATURE"
  title: "シャインソフトの強み"
  desc: "技術力・開発手法・人材育成の3つの強みで、お客様のプロジェクトを成功に導きます。"

features:
  - icon: "cpu"            # アイコン種類（下記参照）
    title: "最先端技術を取り込む技術力の高さ"
    body: "本文テキスト。改行せず1段落で書く。"
    tags:                  # タグバッジ（省略可）
      - "Kubernetes KCSP"
      - "KTP認定"

  - icon: "zap"
    title: "先進的な開発手法「アジャイル開発」を採用"
    body: "本文テキスト。"
    tags:
      - "仕様変更への柔軟対応"

  - icon: "users"
    title: "優秀な人材が集まり育っていく環境"
    body: "本文テキスト。"
    supports:              # 箇条書きリスト（省略可）
      - "資格取得支援・費用補助"
      - "書籍購入補助（年間1万円支給）"
---
```

**icon の種類：**

| 値 | 用途 |
|----|------|
| `cpu` | テクノロジー・技術系 |
| `zap` | 開発手法・スピード系 |
| `users` | 人材・チーム系 |

**tags と supports の違い：**

| フィールド | 表示形式 | 用途 |
|-----------|----------|------|
| `tags` | 丸バッジ（横並び） | 技術キーワード・認定資格など |
| `supports` | 箇条書き（2列グリッド） | 制度・サポート内容の列挙 |

どちらも省略可能です。両方同時に使うことはできません。

**ステップ 3 — 3言語ぶん同じ変更を en.md・zh.md にも適用する**

**ステップ 4 — コミット・プッシュ**

```bash
git add website/src/content/about/feature/
git commit -m "content: シャインソフトの強みを更新"
git push origin master
```

---

### 変更を本番環境へ反映する手順（共通）

```bash
# ニュース記事の変更
git add website/src/content/news/
git commit -m "news: 記事タイトル"
git push origin master

# 会社紹介ページの変更
git add website/src/content/about/
git commit -m "content: 更新内容の説明"
git push origin master
```

GitHub へプッシュ後、Render が自動的にビルドを開始します。数分でサイトに反映されます。
