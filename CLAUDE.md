# プロジェクト概要

このプロジェクトはReact製のタスクボードアプリです。
テキスト入力でタスクを追加し、チェックボックスで完了・未完了を切り替え、削除もできます。
完了済みのタスクはグレーで表示し、内容はブラウザのlocalStorageに保存されるため、リロードしても消えません。

## 技術スタック

- **言語**: JavaScript (JSX)
- **UIライブラリ**: React 18
- **ビルドツール / 開発サーバー**: Vite 5（`@vitejs/plugin-react`）
- **スタイル**: 素のCSS（`src/styles.css`）
- **データ保存**: ブラウザの localStorage（キー: `taskBoard.tasks`）

### ファイル構成

- `index.html` … 画面の土台（Reactのマウント先）
- `src/main.jsx` … エントリーポイント（Appをマウント）
- `src/App.jsx` … アプリ本体のロジック
- `src/styles.css` … デザイン
- `vite.config.js` … Vite設定
- `package.json` … 依存パッケージ・スクリプト定義

### 開発コマンド

- `npm install` … 依存パッケージのインストール
- `npm run dev` … 開発サーバー起動（http://localhost:5173/）
- `npm run build` … 本番ビルド
- `npm run preview` … ビルド結果のプレビュー

## コーディング規約

- コメントは日本語で書く
- 変数名・関数名は英語のキャメルケース（例：`userName`、`addTask`）を使う

## コンポーネント命名規約

- コンポーネント名は英語のパスカルケース（例：`TaskItem`、`App`）を使う
- 1ファイル1コンポーネントを基本とし、ファイル名はコンポーネント名と一致させる（例：`App.jsx`）
- ファイルの拡張子はJSXを含むものを `.jsx` とする
- propsの名前は英語のキャメルケースで書く。イベント系のpropsは `on` + 動詞（例：`onToggle`、`onDelete`）とする
- イベントハンドラ関数は `handle` + 対象（例：`handleKeyDown`）で命名する

## 返答ルール

- 返答は必ず日本語で行う

## GitHubリポジトリ

https://github.com/tk0540879-sketch/task-board.git
