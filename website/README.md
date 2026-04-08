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

各ページは言語ごとに Markdown ファイルで管理します。**3言語すべてを同時に更新**してください。

| ページ | URL | 編集フォルダ |
|--------|-----|-------------|
| 会社概要 | `/about/corporate` | `src/content/about/corporate/` |
| シャインソフトの強み | `/about/feature` | `src/content/about/feature/` |

---

### 会社概要（/about/corporate）を更新する

#### ステップ 1 — 編集するファイルを開く

```
src/content/about/corporate/
├── ja.md   ← 日本語
├── en.md   ← 英語
└── zh.md   ← 中国語
```

#### ステップ 2 — 該当箇所を書き換える

**ファイルの構成（ja.md を例に）：**

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
  - label: "資本金"
    value: "3,000万円"
  - label: "代表者"
    value: "劉 健（代表取締役）"
  - label: "社員数"
    value: "103名（契約社員含む / 2024年現在）"  # ← 例：社員数が変わったらここを変更
  - label: "取引銀行"
    value: "三井住友銀行 新宿支店 / みずほ銀行 新橋中央支店"
  - label: "労働者派遣"
    value: "派13-312580"

# 認証・資格（追加する場合は - name/detail の行をコピーして追記）
certList:
  - name: "ISMS認証"
    detail: "ISO/IEC 27001:2013（認証番号：MSA-IS-338）"
  - name: "KCSP"
    detail: "Kubernetes認定サービスプロバイダー"
  - name: "KTP"
    detail: "Kubernetesトレーニングパートナー"
  - name: "埼玉DXパートナー"
    detail: "2023年11月登録"

# 拠点（追加・変更する場合は - name/address/tel の行を編集）
officeList:
  - name: "本社"
    address: "〒105-0003 東京都港区西新橋1-24-16 平和ビル8F"
    tel: "03-6721-5778 / FAX：03-6721-5779"
  - name: "R&Dセンター"
    address: "〒105-0003 東京都港区西新橋1-12-10 一景ビル4F"
    tel: ""   # 電話番号なしの場合は空文字のままにする
  - name: "大阪営業所"
    address: "〒555-0034 大阪府大阪市西淀川区福町2-20-11"
    tel: ""

# 事業内容（追加・変更する場合は - の行を編集）
businessList:
  - "ソフトウェア開発（要件定義〜保守まで一貫対応）"
  - "基盤サービス（サーバ・ネットワーク設計構築運用）"
  - "クラウドサービス（クラウド構築・サーバ仮想化）"
  - "ITトレーニング（Kubernetes・Linux・Web開発研修）"
  - "技術研究（OSS研究・CNCF活動）"
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

#### ステップ 3 — 3言語ぶん同じ変更を en.md・zh.md にも適用する

#### ステップ 4 — コミット・プッシュ

```bash
git add src/content/about/corporate/
git commit -m "content: 社員数を110名に更新"
git push origin master
```

---

### シャインソフトの強み（/about/feature）を更新する

#### ステップ 1 — 編集するファイルを開く

```
src/content/about/feature/
├── ja.md   ← 日本語
├── en.md   ← 英語
└── zh.md   ← 中国語
```

#### ステップ 2 — 該当箇所を書き換える

**ファイルの構成（ja.md を例に）：**

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
      - "スクラム開発"

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

#### ステップ 3 — 3言語ぶん同じ変更を en.md・zh.md にも適用する

#### ステップ 4 — コミット・プッシュ

```bash
git add src/content/about/feature/
git commit -m "content: シャインソフトの強みを更新"
git push origin master
```

---

## 変更を本番環境へ反映する手順（共通）

```bash
# ニュース記事の変更
git add src/content/news/
git commit -m "news: 記事タイトル"
git push origin master

# 会社紹介ページの変更
git add src/content/about/
git commit -m "content: 更新内容の説明"
git push origin master
```

GitHub へプッシュ後、Render が自動的にビルドを開始します。数分でサイトに反映されます。
