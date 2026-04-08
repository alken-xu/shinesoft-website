# シャインソフト 公式サイト

株式会社シャインソフト（https://shinesoft.co.jp/）の公式ウェブサイトです。

## 開発サーバーの起動

```bash
npm run dev    # http://localhost:3000
npm run build  # プロダクションビルド
npm run lint   # ESLint
```

---

## コンテンツのメンテナンス方法

### ファイル構成

```
src/content/
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

## ニュース記事の更新

### 新しい記事を追加する

`src/content/news/` に Markdown ファイルを作成します。

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

### 記事を編集する

該当の `.md` ファイルを直接書き換えます。

### 記事を削除する

該当の `.md` ファイルを削除します。

---

## 会社紹介ページの更新

### 会社概要（/about/corporate）

`src/content/about/corporate/` の各言語ファイルを編集します。

- `ja.md` → 日本語ページ
- `en.md` → 英語ページ
- `zh.md` → 中国語ページ

**ファイル構成例（ja.md）：**

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
rows:
  - label: "商号"
    value: "株式会社シャインソフト（英称：SHINESOFT CORPORATION）"
  - label: "設立"
    value: "2006年6月1日"
  - label: "社員数"
    value: "110名（契約社員含む / 2026年現在）"  # ← ここを書き換える
certList:
  - name: "ISMS認証"
    detail: "ISO/IEC 27001:2013（認証番号：MSA-IS-338）"
officeList:
  - name: "本社"
    address: "〒105-0003 東京都港区西新橋1-24-16 平和ビル8F"
    tel: "03-6721-5778 / FAX：03-6721-5779"
businessList:
  - "ソフトウェア開発（要件定義〜保守まで一貫対応）"
---
```

**よくある更新例：**

| 更新内容 | 編集箇所 |
|----------|----------|
| 社員数の変更 | `rows` の `社員数` の `value` |
| 新しい認証取得 | `certList` に項目を追加 |
| 拠点の追加・変更 | `officeList` に項目を追加・編集 |
| 事業内容の変更 | `businessList` の項目を編集 |

### シャインソフトの強み（/about/feature）

`src/content/about/feature/` の各言語ファイルを編集します。

**ファイル構成例（ja.md）：**

```yaml
---
hero:
  label: "FEATURE"
  title: "シャインソフトの強み"
  desc: "説明文"
features:
  - icon: "cpu"           # cpu / zap / users の3種類
    title: "強みのタイトル"
    body: "強みの説明文"
    tags:                 # タグ（省略可）
      - "タグ1"
      - "タグ2"
  - icon: "users"
    title: "人材育成"
    body: "説明文"
    supports:             # 箇条書きリスト（省略可）
      - "資格取得支援"
      - "書籍購入補助"
---
```

**icon の種類：**

| 値 | アイコン |
|----|----------|
| `cpu` | テクノロジー系 |
| `zap` | 開発・スピード系 |
| `users` | 人材・チーム系 |

---

## 変更を本番環境へ反映する手順

```bash
# 1. ファイルを編集後、変更をステージング
git add src/content/

# 2. コミット
git commit -m "content: 社員数を更新"

# 3. プッシュ（Render が自動でビルド・デプロイ）
git push origin master
```

GitHub へプッシュ後、Render が自動的にビルドを開始します。数分でサイトに反映されます。
