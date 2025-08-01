# SVG Avatar Generator

## プロジェクト概要

このプロジェクトは、複数のSVGパーツ（髪、顔、服など）を組み合わせてオリジナルのアバターを作成できるWebアプリケーションです。作成したアバターは、単一のSVGファイルとしてダウンロードできます。

- **目的:** ユーザーに直感的で楽しいアバター作成体験を提供します。
- **主要機能:** パーツ選択、リアルタイムプレビュー、SVGファイルのエクスポート。

## 技術スタック

- **フレームワーク:** React
- **言語:** TypeScript
- **ビルドツール:** Vite
- **パッケージマネージャー:** pnpm
- **UIライブラリ:** Material-UI (MUI Core)

## 利用方法

### 1. プロジェクトのセットアップ

まず、必要な依存関係をインストールします。

```bash
pnpm install
```

### 2. 開発サーバーの起動

開発サーバーを起動し、アプリケーションをブラウザで確認します。

```bash
pnpm dev
```

通常、`http://localhost:5173`でアクセスできます。

### 3. SVGパーツの追加

アバターのパーツとなるSVGファイルは、`src/assets/svg/`以下のカテゴリ別フォルダに配置します。

例:
- `src/assets/svg/body/body1.svg`
- `src/assets/svg/hair/hair1.svg`
- `src/assets/svg/face/face1.svg`
- `src/assets/svg/clothes/clothes1.svg`

### 4. アバターの作成とエクスポート

- アプリケーションのUIから、各カテゴリのパーツを選択してアバターをカスタマイズします。
- リアルタイムでプレビューが更新されます。
- 「Export as SVG」ボタンをクリックすると、現在プレビューされているアバターが単一のSVGファイルとしてダウンロードされます。