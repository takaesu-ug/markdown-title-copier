# Markdown Title Copier

Chrome拡張機能で、現在表示しているページのタイトルをマークダウン形式でコピーするツールです。

## 機能

- カスタマイズ可能なショートカットキーで、ページタイトルをマークダウン形式でコピー
- コピー時に画面上部に通知を表示
- コピーされる形式: `[ページタイトル](URL)`

## 技術スタック

- TypeScript
- Bun (ビルドツール)
- Chrome Extension Manifest V3

## 開発環境のセットアップ

1. リポジトリのクローン
```bash
git clone [repository-url]
cd markdown-title-copier
```

2. 依存関係のインストール
```bash
bun install
```

3. 開発モードでビルド
```bash
bun run dev
```

4. Chrome拡張機能の読み込み
- Chromeブラウザで `chrome://extensions/` を開く
- 右上の「デベロッパーモード」をオンにする
- 「パッケージ化されていない拡張機能を読み込む」をクリック
- プロジェクトのディレクトリを選択

## 使用方法

1. ショートカットキーの設定
- 拡張機能のアイコンを右クリック
- 「オプション」を選択
- ショートカットキーの入力フィールドをクリック
- 希望のショートカットキーを入力（例: `Command+Shift+Y`）
- 「Save Settings」ボタンをクリック

2. タイトルのコピー
- 設定したショートカットキーを押す
- ページのタイトルがマークダウン形式でコピーされる
- 画面上部に成功通知が表示される

## プロジェクト構造

```
markdown-title-copier/
├── src/
│   ├── background.ts    # バックグラウンドスクリプト
│   ├── content.ts       # コンテンツスクリプト
│   └── options.ts       # オプションページのスクリプト
├── dist/                # ビルド出力ディレクトリ
├── manifest.json        # 拡張機能の設定
├── options.html         # オプションページ
├── package.json         # プロジェクト設定
└── tsconfig.json        # TypeScript設定
```

## ビルドコマンド

- `bun run build`: プロジェクトのビルド
- `bun run dev`: 開発モードでビルド（変更を監視）
- `bun run type-check`: TypeScriptの型チェック

## ライセンス

MIT License

## 作者

Yuji Takaesu
