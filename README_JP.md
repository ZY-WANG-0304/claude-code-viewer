<div align="center">
    <img src="./img/logo.png" alt="Claude Code Viewer Logo"/>
</div>


<p align="center">
    <p>Claude Code Viewerは、Claude Codeの対話ログをローカルで閲覧、分析、管理するためのツールです。Claudeとの会話履歴の振り返り、トークン使用量の分析、セッションの分類管理を支援するモダンなWebインターフェースを提供します。</p>
</p>

<p align="center">
    <a href="./README.md">简体中文</a> | <a href="./README_EN.md">English</a> | <a href="./README_JP.md">日本語</a>
</p>

<p align="center">
    <!-- <a href="https://github.com/CasterWx/claude-code-viewer/actions/workflows/release.yml"><img src="https://github.com/CasterWx/claude-code-viewer/actions/workflows/release.yml/badge.svg" alt="Release"/></a> -->
    <a href="https://github.com/CasterWx/claude-code-viewer/stargazers"><img src="https://img.shields.io/github/stars/CasterWx/claude-code-viewer?style=social" alt="GitHub stars"/></a>
    <a href="https://github.com/CasterWx/claude-code-viewer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/CasterWx/claude-code-viewer" alt="License"/></a>
    <a href="https://CasterWx.github.io/spec-kit/"><img src="https://img.shields.io/badge/docs-GitHub_Pages-blue" alt="Documentation"/></a>
</p>


## ✨ 機能と特徴

- **👀 ログの可視化**: Claude Codeの対話プロセスをチャットインターフェースとして再現し、Markdownレンダリング、コードハイライト、ツール呼び出しの表示をサポートします。
- **📂 マルチプロジェクト/セッション管理**: ログディレクトリを自動的にスキャンし、プロジェクトとセッションごとにログファイルを整理します。
- **🔍 全文検索**: 過去の会話内容を素早く検索し、重要な情報を特定できます。
- **📊 データダッシュボード**: プロジェクトの統計情報やトークン消費傾向などの概要を表示します。
- **🏷️ タグ管理**: セッションにカスタムタグを追加して、分類やフィルタリングが可能です。
- **⚙️ 柔軟な設定**: ログのスキャンパスをカスタマイズできます。
- **📦 一体型デプロイ**: フロントエンドリソースをPythonパッケージに同梱できるため、フロントエンドサービスを個別に実行する必要がありません。


<div align="center">
    <img src="./img/chat_message_p1.png" alt="Chat Message" width="70%"/>
</div>

## 🛠️ 技術スタック

- **バックエンド**: Python 3.8+, FastAPI, Uvicorn, Click
- **フロントエンド**: React 19, TypeScript, Vite, Tailwind CSS, Recharts

## 🚀 インストールと実行

### 方法1: 一体型インストール（推奨）

フロントエンドのビルド結果をPythonパッケージに同梱できるため、1つのサービスを起動するだけで済みます。

1. **ビルドとインストール**

   フロントエンドリソースを自動的にビルドし、Pythonパッケージを作成するビルドスクリプトを提供しています：

   ```bash
   # ビルドスクリプトを実行
   python build_package.py
   
   # ビルドされたパッケージをインストール (dist/ ディレクトリ内)
   pip install dist/claude_viewer-0.1.0-py3-none-any.whl
   # または現在のディレクトリから直接インストール
   pip install .
   ```

2. **サービスの起動**

   ```bash
   claude-viewer serve
   ```

   `http://127.0.0.1:8000` にアクセスすると、完全な機能を直接使用できます（フロントエンドを個別に起動する必要はありません）。

### 方法2: 開発モード

コードを変更する必要がある場合は、バックエンドとフロントエンドを個別に起動できます。

#### 1. バックエンドサービス

バックエンドはログファイルを解析し、APIインターフェースを提供します。

```bash
# 1. プロジェクトルートディレクトリでPython依存関係をインストール
pip install -e .

# 2. バックエンドサービスを起動
claude-viewer serve --host 127.0.0.1 --port 8000
```

サービス起動後、APIは `http://127.0.0.1:8000` で実行されます。

#### 2. フロントエンドインターフェース

フロントエンドはユーザー対話インターフェースを提供します。

```bash
# 1. フロントエンドディレクトリに移動
cd frontend

# 2. 依存関係をインストール
npm install

# 3. 開発サーバーを起動
npm run dev
```

起動後、ターミナルに表示されるアドレス（通常は `http://localhost:5173`）にアクセスして使用します。

## 📁 ディレクトリ構造

```
claude-code-viewer/
├── claude_viewer/      # Python バックエンドソースコード
│   ├── main.py         # CLI エントリーポイント
│   ├── server.py       # FastAPI サービス
│   ├── parser.py       # ログ解析ロジック
│   ├── static/         # フロントエンドビルド成果物 (ビルド後に生成)
│   └── ...
├── frontend/           # React フロントエンドソースコード
│   ├── src/
│   │   ├── components/ # UI コンポーネント
│   │   ├── api.ts      # API クライアント
│   │   └── ...
│   └── ...
├── pyproject.toml      # Python プロジェクト設定
├── build_package.py    # ビルドスクリプト
└── README.md           # プロジェクト説明ドキュメント
```

## 📝 設定

デフォルトでは、ツールは一般的なClaude Codeログパスを自動的にスキャンしようとします。特定のパスを指定する必要がある場合は、設定ページで構成するか、環境変数 `CLAUDE_LOG_PATH` で指定できます。

## 🤝 貢献

このプロジェクトを改善するためのIssueやPull Requestを歓迎します！