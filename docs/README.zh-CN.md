# 🦞 OpenClaw 指挥中心

<div align="center">

**你的 AI 代理任务中枢**

[![CI](https://github.com/jontsai/openclaw-command-center/actions/workflows/ci.yml/badge.svg)](https://github.com/jontsai/openclaw-command-center/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)
[![ClawHub](https://img.shields.io/badge/ClawHub-command--center-blue)](https://www.clawhub.ai/jontsai/command-center)

[功能特性](#功能特性) • [快速开始](#快速开始) • [安全](#-安全) • [配置](#配置)

</div>

---

## 为什么要用 Command Center？

你的 AI 代理 24/7 在跑，你需要随时知道它们在干什么。

Command Center 提供对 OpenClaw 的**实时可视化总览**：会话、成本、系统健康、定时任务，全都集中在一个安全面板里。

### ⚡ 快

- **单一 API 调用**：统一状态端点，不用 16+ 次请求
- **2 秒更新**：SSE 实时推送，而不是轮询
- **5 秒缓存**：负载高时也稳
- **即开即用**：无构建步骤、无编译

### 🪶 轻

- **用户零依赖**：只需 Node.js
- **体积小**：整体约 200KB（前端 + 服务端）
- **无 webpack/vite/bundler**
- **无 React/Vue/Angular**：纯原生 JS

### 📱 自适应

- **桌面/手机都可用**
- **深色主题**（Starcraft 风格）
- **实时更新，无需手动刷新**
- **离线友好，优雅降级**

### 🔒 安全优先

| 特性 | 说明 |
| ---- | ---- |
| **认证模式** | Token / Tailscale / Cloudflare Access / IP 白名单 |
| **无外部遥测** | 100% 本地运行，无第三方 CDN 调用 |
| **默认 localhost** | 默认绑定 `127.0.0.1` |
| **默认只读** | 默认可视化，不暴露控制能力 |
| **UI 不显示密钥** | API key / token 不出现在前端 |

---

## 功能特性

| 功能 | 说明 |
| ---- | ---- |
| 📊 **会话监控** | 实时查看活跃 AI 会话 |
| ⛽ **LLM 油量面板** | Token / 成本 / 剩余额度 |
| 💻 **系统状态** | CPU / 内存 / 磁盘 / 温度 |
| ⏰ **Cron 任务** | 查看并管理定时任务 |
| 🧠 **Cerebro 话题** | 自动话题归类与追踪 |
| 👥 **操作者视图** | 谁在和代理对话 |
| 📝 **记忆浏览器** | 查看记忆文件与日志 |
| 🔒 **隐私控制** | 隐藏敏感会话/话题用于演示 |
| 💰 **成本拆解** | 按模型细分成本 |

---

## 快速开始

```bash
npx clawhub@latest install command-center
cd skills/command-center
node lib/server.js
```

默认地址：**http://localhost:3333**

### Git 克隆方式

```bash
git clone https://github.com/jontsai/openclaw-command-center
cd openclaw-command-center
node lib/server.js
```

---

## 零配置体验

Command Center 会自动探测你的 OpenClaw 工作目录：

1. `$OPENCLAW_WORKSPACE`
2. `~/.openclaw-workspace` 或 `~/openclaw-workspace`
3. 常见目录名：`~/molty`、`~/clawd`、`~/moltbot`

只要有 `memory/` 或 `state/` 目录，基本就能跑。

---

## 配置

### 环境变量

| 变量 | 说明 | 默认 |
| ---- | ---- | ---- |
| `PORT` | 服务端口 | `3333` |
| `OPENCLAW_WORKSPACE` | 工作目录 | 自动探测 |
| `OPENCLAW_PROFILE` | 配置 profile | (none) |

### 认证模式

| 模式 | 场景 | 示例 |
| ---- | ---- | ---- |
| `none` | 本地开发 | `DASHBOARD_AUTH_MODE=none` |
| `token` | API 访问 | `DASHBOARD_AUTH_MODE=token DASHBOARD_TOKEN=secret` |
| `tailscale` | 团队内网 | `DASHBOARD_AUTH_MODE=tailscale` |
| `cloudflare` | 公网部署 | `DASHBOARD_AUTH_MODE=cloudflare` |
| `allowlist` | IP 白名单 | `DASHBOARD_AUTH_MODE=allowlist DASHBOARD_ALLOWED_IPS=...` |

---

## API

| 接口 | 说明 |
| ---- | ---- |
| `GET /api/state` | 统一状态（核心） |
| `GET /api/health` | 健康检查 |
| `GET /api/vitals` | 系统指标 |
| `GET /api/sessions` | 会话列表 |
| `GET /api/events` | SSE 实时流 |

---

## 架构

```text
command-center/
├── lib/
│   ├── server.js
│   ├── config.js
│   └── jobs.js
├── public/
│   ├── index.html
│   └── js/
└── scripts/
    ├── setup.sh
    └── verify.sh
```

---

## 截图

详见：[README.md](../README.md) 中的 screenshots 区块（后续会补中文说明版）。

---

## 贡献

欢迎贡献！请先阅读 [CONTRIBUTING.md](../CONTRIBUTING.md)。

---

## 许可证

MIT © [Jonathan Tsai](https://github.com/jontsai)

---

<div align="center">

**[ClawHub 安装](https://www.clawhub.ai/jontsai/command-center)** · **[OpenClaw](https://github.com/openclaw/openclaw)** · **[Discord](https://discord.gg/clawd)**

</div>
