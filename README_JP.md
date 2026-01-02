<div align="center">
    <img src="./img/logo.png" alt="Claude Code Viewer Logo" />
</div>

<div align="center">
    <strong>ローカル Claude Code インタラクションログ可視化・分析ツール</strong>
</div>

<br/>

<p align="center">
    <a href="./README.md">简体中文</a> | <a href="./README_EN.md">English</a> | <a href="./README_JP.md">日本語</a>
</p>

<p align="center">
    <a href="LICENSE"><img src="https://img.shields.io/github/license/CasterWx/claude-code-viewer?style=flat-square" alt="License"></a>
    <a href="https://github.com/CasterWx/claude-code-viewer/stargazers"><img src="https://img.shields.io/github/stars/CasterWx/claude-code-viewer?style=flat-square" alt="Stars"></a>
    <a href="https://github.com/CasterWx/claude-code-viewer/issues"><img src="https://img.shields.io/github/issues/CasterWx/claude-code-viewer?style=flat-square" alt="Issues"></a>
    <img src="https://img.shields.io/badge/python-3.8+-blue?style=flat-square" alt="Python">
    <img src="https://img.shields.io/badge/react-19-blue?style=flat-square" alt="React">
</p>

<br/>

## 📖 はじめに

**Claude Code Viewer** は、開発者が Claude Code との対話履歴をより効率的に閲覧、分析、管理するために設計されたローカルツールです。最新のWebインターフェースを通じて、生のログファイルが見づらく検索しにくいという問題を解決し、AIペアプログラミングのプロセスを透明で追跡可能なものにします。

## ✨ 機能と特徴

| 機能 | 説明 | プレビュー |
| :--- | :--- | :--- |
| **📊 データダッシュボード** | トークン消費量、セッション頻度、使用頻度の高いモデル、活動リズムなどの主要指標をマクロな視点で確認できます。 | <img src="./img/feature_dashboard.png" width="400" alt="Dashboard"/> |
| **🚀 プロジェクト別セッション詳細** | トークン消費量、セッションごとのモデル、ターン数、AIコード生存率、変更ファイルなど、プロジェクトレベルでのセッション詳細を把握できます。 | <img src="./img/feature_project.png" width="400" alt="Chat UI"/> |
| **👀 セッションファイル変更詳細** | 各セッションでどのファイルが変更されたかを詳細に表示し、変更履歴の振り返りを支援します。 | <img src="./img/feature_file_change.png" width="400" alt="Chat UI"/> |
| **🧐 コード生存率分析** | AIが生成したコードがプロジェクト内で実際にどれだけ残存しているかを分析し、AIの貢献度を評価します。 | <img src="./img/feature_code_survival.png" width="400" alt="Chat UI"/> |
| **🔍 全文検索** | キーワードに基づいて過去のセッションを素早く特定し、あいまい検索もサポートしているため、インスピレーションを逃しません。 | <img src="./img/feature_search.png" width="400" alt="Search"/> |
| **📂 セッション履歴の解析と復元** | 他のツールの粗雑な表示とは異なり、各セッションの詳細を最大限にレンダリングして復元し、優れた体験を提供します。 | <img src="./img/feature_chat.png" width="400" alt="Chat"/> |
| **🌍 多言語サポート** | 中国語、英語、日本語のインターフェースを内蔵しており、ワンクリックで切り替え可能です。 | <img src="./img/feature_i18n.png" width="400" alt="Internationalization"/> |

## 🛠️ 技術スタック

*   **Backend**: Python 3.8+, FastAPI, Uvicorn
*   **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
*   **Visualization**: Recharts, Lucide React

## 🚀 インストールと実行

複数のインストール方法を提供していますが、All-in-Oneパッケージ（推奨）が最も簡単です。

### 方法1: ソースコードからのインストール (推奨)

```bash
# 1. リポジトリをクローン
git clone https://github.com/CasterWx/claude-code-viewer.git
cd claude-code-viewer

# 2. ビルドとインストール (フロントエンドのビルドとPythonパッケージのインストールを自動処理)
python install_package.py

# 3. サービスの起動
claude-viewer serve
```

起動後、 `http://127.0.0.1:8000` にアクセスすると、完全な機能を使用できます。

### 方法2: Wheelパッケージからのインストール

```bash
# 1. Wheelパッケージをダウンロード
https://github.com/CasterWx/claude-code-viewer/releases/tag/v0.1.0

# 2. パッケージをインストール
pip install claude_viewer-0.1.0-py3-none-any.whl

# 3. サービスの起動
claude-viewer serve
```

起動後、 `http://127.0.0.1:8000` にアクセスすると、完全な機能を使用できます。

## 🤝 貢献

IssueやPull Requestを歓迎します！新しいアイデアやバグを見つけた場合は、お気軽にお知らせください。

1.  このリポジトリをフォークする
2.  機能ブランチを作成する (`git checkout -b feature/AmazingFeature`)
3.  変更をコミットする (`git commit -m 'Add some AmazingFeature'`)
4.  ブランチにプッシュする (`git push origin feature/AmazingFeature`)
5.  Pull Requestを作成する

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/CasterWx">CasterWx</a>
</p>