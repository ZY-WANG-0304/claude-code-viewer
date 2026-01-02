<div align="center">
    <img src="./img/logo.png" alt="Claude Code Viewer Logo" />
</div>

<div align="center">
    <strong>本地 Claude Code 交互日志可视化查看与分析工具</strong>
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

## 📖 简介

**Claude Code Viewer** 是一款专为开发者设计的本地工具，旨在帮助用户更好地查看、分析和管理与 Claude Code 的交互历史。通过现代化的 Web 界面，它解决了单纯查看原始 Log 文件不直观、难以检索的问题，让你的 AI 结对编程过程更加透明、可追溯。

## ✨ 核心特性

| 功能 | 描述 | 预览 |
| :--- | :--- | :--- |
| **📊 数据仪表盘** | 宏观视角查看 Token 消耗、会话频次、常用模型、活动频率等关键指标。 | <img src="./img/feature_dashboard.png" width="400" alt="Dashboard"/> |
| **👀 项目级会话明细** | 从项目维度洞察会话明细，包括 Token 消耗，每次会话的模型、轮次、Token 消耗、AI 代码留存率、变更文件等。 | <img src="./img/feature_project.png" width="400" alt="Chat UI"/> |
| **👀 会话变更文件明细** | 每次会话修改变更了哪些文件，辅助回顾变更历史。 | <img src="./img/feature_file_change.png" width="400" alt="Chat UI"/> |
| **👀 代码留存率分析** | 分析 AI 生成代码在项目中的实际留存情况，评估 AI 贡献度。 | <img src="./img/feature_code_survival.png" width="400" alt="Chat UI"/> |
| **🔍 全文检索** | 基于关键词快速定位历史会话，支持模糊搜索，不再丢失任何灵感。 | <img src="./img/feature_search.png" width="400" alt="Search"/> |
| **📂 会话历史解析还原** | 对每次会话明细做了最大程度上的渲染还原，不同于其他工具的粗暴展示。 | <img src="./img/feature_chat.png" width="400" alt="Chat"/> |
| **🌍 多语言支持** | 内置中、英、日三种语言界面，一键切换。 | <img src="./img/feature_i18n.png" width="400" alt="Internationalization"/> |

## 🛠️ 技术栈

*   **Backend**: Python 3.8+, FastAPI, Uvicorn
*   **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
*   **Visualization**: Recharts, Lucide React

## 🚀 快速开始

我们提供了多种安装方式，推荐使用一体化安装包。

### 方式一：源码安装

```bash
# 1. 克隆仓库
git clone https://github.com/CasterWx/claude-code-viewer.git
cd claude-code-viewer

# 2. 构建并安装 (自动处理前端构建与 Python 包安装)
python install_package.py

# 3. 启动服务
claude-viewer serve
```

### 方式二：资源包安装

```bash
# 1. 下载资源包

# 2. 安装资源包
pip install claude_viewer-0.1.0-py3-none-any.whl

# 3. 启动服务
claude-viewer serve
```

服务启动后，访问 `http://127.0.0.1:8000` 即可使用完整功能。


## 🤝 贡献

欢迎提交 Issue 或 Pull Request！如果你有新的想法或发现了 Bug，请随时告诉我们。

1.  Fork 本仓库
2.  创建特性分支 (`git checkout -b feature/AmazingFeature`)
3.  提交改动 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  提交 Pull Request

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/CasterWx">CasterWx</a>
</p>