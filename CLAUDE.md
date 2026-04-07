# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

株式会社シャインソフト（https://shinesoft.co.jp/）のホームページ全面リニューアルプロジェクトです。

- **要件定義書**: `requirements.md`（コンテンツバックアップ含む）
- **ソースコード**: `website/` ディレクトリ

## コマンド

```bash
cd website

npm run dev      # 開発サーバー起動（http://localhost:3000）
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
npm run lint     # ESLint
```

## 技術スタック（実装済み）

```
フレームワーク:   Next.js 16.x（App Router）+ TypeScript
スタイリング:     Tailwind CSS v4（@import "tailwindcss"）
多言語:          Next.js 組み込み i18n（[locale] ルーティング）
プロキシ:        src/proxy.ts（旧 middleware.ts）※ Next.js 16 の変更点
メール送信:       nodemailer（SMTP設定が必要）
ニュースCMS:      src/content/news/*.md（Markdown + gray-matter）
アニメーション:   Intersection Observer API（CSS transition）
```

## アーキテクチャ

### i18n（多言語）

- URLパターン: `/{locale}/...`（`ja`・`en`・`zh`）
- `src/proxy.ts` でロケール未指定時は常に `/ja` へリダイレクト（ブラウザ言語自動検出は無効化済み）
- 翻訳文字列: `src/messages/{ja,en,zh}.json`
- 辞書ヘルパー: `src/lib/dictionaries.ts`（`getDictionary(locale)`）
- レイアウト: `src/app/[locale]/layout.tsx` が各ページに辞書を渡す

### ニュース管理（Markdown CMS）

- `src/content/news/*.md`（frontmatter: title・date・category・slug）
- `src/lib/news.ts` の `getAllNews()` / `getNewsPost(slug)` で読み込み
- 新記事追加は Markdown ファイルを追加するだけ

### お問い合わせフォーム

- フォームUI: `src/components/sections/ContactForm.tsx`（Client Component）
- APIルート: `src/app/api/contact/route.ts`（POST）
- メール送信: `nodemailer` + SMTP。`.env.local.example` 参照
- メール未設定時はコンソールログのみ（開発時に便利）
- 社内通知メールに `replyTo: body.email` を設定済み（担当者が返信すると問い合わせユーザー宛に届く）

### Next.js 16 の注意点

- **`proxy.ts`**: `middleware.ts` は非推奨。`src/proxy.ts` に `proxy` 関数をエクスポート
- **async params**: `params` は `Promise<{ locale: string }>` 型。`const { locale } = await params` で取得
- **`PageProps<'/[locale]'>`**: グローバル型ヘルパーを使用可能

## ファイル構成（主要部分）

```
website/
├── src/
│   ├── app/
│   │   ├── [locale]/         # 全言語共通ページ（13ページ）
│   │   ├── api/contact/      # お問い合わせAPIルート
│   │   ├── sitemap.ts        # XMLサイトマップ自動生成
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/           # Header / Footer / PageHero
│   │   ├── sections/         # Hero（パーティクル） / ContactForm
│   │   └── ui/               # AnimatedSection / SectionHeader
│   ├── content/news/         # ニュース記事（Markdown）
│   ├── lib/
│   │   ├── dictionaries.ts   # i18n辞書ローダー
│   │   └── news.ts           # ニュース読み込みユーティリティ
│   ├── messages/             # 翻訳JSON（ja / en / zh）
│   └── proxy.ts              # 言語リダイレクト
├── next.config.ts             # 301リダイレクト設定
└── .env.local.example         # メール送信環境変数テンプレート
```

## コンテンツの参照先

既存サイトのすべてのコンテンツは `requirements.md` §12 にバックアップ済み。ページ実装時はそちらを正とし、ライブサイトを再取得しないこと。

主要な会社情報:
- 商号: 株式会社シャインソフト / SHINESOFT CORPORATION
- 代表者: 劉 健（代表取締役）
- 本社: 〒105-0003 東京都港区西新橋1-24-16 平和ビル8F　TEL: 03-6721-5778
- 設立: 2006年6月1日　資本金: 3,000万円　社員数: 103名（2024年）
- 認証: ISMS（MSA-IS-338）/ KCSP / KTP / 埼玉DXパートナー

## 旧URL → 新URL リダイレクト（next.config.ts に設定済み）

| 旧URL | 新URL |
|-------|-------|
| /feature | /about/feature |
| /company | /about/corporate |
| /software | /services/software |
| /infrastructure-services | /services/infrastructure |
| /cloudservice | /services/cloud |
| /ittraining | /services/training |
| /techstudy | /services/research |
| /recruitinfo | /recruit |
| /archives/news | /news |

## デプロイ

**Render** へデプロイ済み（GitHub リポジトリ: `alken-xu/shinesoft-website`）。

- ルートディレクトリ: `website/`
- ビルドコマンド: `npm install && npm run build`
- 環境変数: `.env.local.example` の値を Render の Environment Variables に設定する

**注意:** Render は `NODE_ENV=production` でビルドするため `devDependencies` がスキップされる。  
`@tailwindcss/postcss`・`tailwindcss`・`typescript`・`@types/*` 等のビルド必須パッケージは `dependencies` に配置すること。
