<div align="center">
    <img src="./img/logo.png" alt="Claude Code Viewer Logo"/>
</div>


<p align="center">
    <p>Claude Code Viewer is a tool for viewing, analyzing, and managing Claude Code interaction logs locally. It provides a modern Web interface to help developers review conversation history with Claude, analyze Token usage, and categorize sessions.</p>
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


## ✨ Features

- **👀 Visual Log Viewing**: Reconstructs Claude Code interactions as a chat interface, supporting Markdown rendering, code highlighting, and tool call display.
- **📂 Multi-Project/Session Management**: Automatically scans log directories and organizes log files by project and session.
- **🔍 Full-Text Search**: Quickly search historical conversation content to locate key information.
- **📊 Data Dashboard**: Overview of project statistics, Token consumption trends, etc.
- **🏷️ Tag Management**: Supports adding custom tags to sessions for classification and filtering.
- **⚙️ Flexible Configuration**: Supports custom log scan paths.
- **📦 All-in-One Deployment**: Supports packaging frontend resources into the Python package, eliminating the need to run a separate frontend service.


<div align="center">
    <img src="./img/chat_message_p1.png" alt="Chat Message" width="70%"/>
</div>

## 🛠️ Tech Stack

- **Backend**: Python 3.8+, FastAPI, Uvicorn, Click
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Recharts

## 🚀 Installation & Running

### Method 1: All-in-One Installation (Recommended)

You can package the frontend build results into the Python package, so you only need to start one service.

1. **Build and Install**

   We provide a build script that automatically builds frontend resources and packages the Python package:

   ```bash
   # Run build script
   python build_package.py
   
   # Install the built package (in dist/ directory)
   pip install dist/claude_viewer-0.1.0-py3-none-any.whl
   # Or install directly from the current directory
   pip install .
   ```

2. **Start Service**

   ```bash
   claude-viewer serve
   ```

   Visit `http://127.0.0.1:8000` to use the full functionality directly (no need to start frontend separately).

### Method 2: Development Mode

If you need to modify the code, you can start the backend and frontend separately.

#### 1. Backend Service

The backend is responsible for parsing log files and providing API interfaces.

```bash
# 1. Install Python dependencies in the project root directory
pip install -e .

# 2. Start backend service
claude-viewer serve --host 127.0.0.1 --port 8000
```

After the service starts, the API will run at `http://127.0.0.1:8000`.

#### 2. Frontend Interface

The frontend provides the user interaction interface.

```bash
# 1. Enter frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

After starting, visit the address shown in the terminal (usually `http://localhost:5173`) to use it.

## 📁 Directory Structure

```
claude-code-viewer/
├── claude_viewer/      # Python backend source code
│   ├── main.py         # CLI entry point
│   ├── server.py       # FastAPI service
│   ├── parser.py       # Log parsing logic
│   ├── static/         # Frontend build artifacts (generated after build)
│   └── ...
├── frontend/           # React frontend source code
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── api.ts      # API client
│   │   └── ...
│   └── ...
├── pyproject.toml      # Python project configuration
├── build_package.py    # Build script
└── README.md           # Project documentation
```

## 📝 Configuration

By default, the tool attempts to automatically scan common Claude Code log paths. If you need to specify a specific path, you can configure it on the settings page or specify it via the environment variable `CLAUDE_LOG_PATH`.

## 🤝 Contribution

Issues and Pull Requests are welcome to improve this project!