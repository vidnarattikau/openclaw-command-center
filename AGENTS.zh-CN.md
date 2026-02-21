# AI 工作区指南（AGENTS）

> _“主宰通过多重声音发言，但目标唯一。”_

欢迎，AI 代理。本文定义你在本仓库内的协作方式。

## ⚠️ 关键：PR 工作流

**本仓库所有改动必须走 Pull Request。**

这是公开开源项目。包括维护者（以及代表维护者工作的 AI）也必须：

1. 新建功能分支（`git checkout -b type/description`）
2. 提交改动
3. 推分支并发 PR
4. 经审核后再合并

**禁止直接 push 到 `main`。**

## 🎯 使命

OpenClaw Command Center 是 AI 助手编排的中控面板。你的任务是在保持 Starcraft/Zerg 主题风格的前提下，持续改进这个系统。

## 🏛️ 架构（先读）

请先阅读：[`docs/architecture/OVERVIEW.md`](docs/architecture/OVERVIEW.md)

核心原则：

1. **DRY**：不重复，抽公共组件
2. **零构建步骤**：纯 HTML/CSS/JS，可直接运行
3. **实时优先**：SSE 实时更新，轮询仅作后备
4. **渐进增强**：无 JS 也可基础可用

## 📁 目录结构（摘要）

```text
openclaw-command-center/
├── lib/                    # 服务端逻辑
├── public/                 # 前端静态资源
│   ├── partials/           # 共享 HTML 片段
│   └── js/                 # 前端脚本
├── scripts/                # 运维脚本
├── config/                 # 配置
├── docs/                   # 文档
├── tests/                  # 测试
├── SKILL.md                # ClawHub 元数据
└── package.json
```

## ✅ 可直接执行

- 阅读代码与文档
- 修改 `lib/`、`public/`、`docs/`、`tests/`
- 增加测试
- 更新文档
- 创建功能分支

## ⚠️ 先确认再做

以下改动建议先与人类确认：

- 修改 `config/` 配置
- 变更 CI/CD 流程
- 新增 `package.json` 依赖
- 破坏性 API 变更
- 涉及认证/密钥的改动

## 🚫 严禁

- 直接 push `main`
- 提交任何密钥/凭据
- 提交用户数据文件（见 `public/data/AGENTS.md`）
- 未确认直接删除关键文件
- 将内部接口暴露公网

## 🛠️ 开发流程

### 0）首次准备

```bash
make install-hooks
# 或手动：
cp scripts/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### 1）功能开发

```bash
git checkout -b feat/your-feature-name
npm test
npm run lint
make check
git commit -m "feat: ..."
git push -u origin feat/your-feature-name
```

### 2）提交规范（Conventional Commits）

- `feat:` 新功能
- `fix:` 修复
- `docs:` 文档
- `style:` 格式
- `refactor:` 重构
- `test:` 测试
- `chore:` 维护

## 📦 ClawHub 发布工作流

本项目以 ClawHub 技能分发。合并到 `main` 后再由维护者发布。

### 元数据文件

- `SKILL.md`：技能 name/version/description
- `package.json`：版本号

⚠️ 两者版本必须一致：

```bash
# package.json: "version": "X.Y.Z"
# SKILL.md:    version: X.Y.Z
```

pre-commit 会强制校验版本一致性。

### 发布步骤

```bash
clawhub login
clawhub whoami

# bump 版本 -> 打 tag -> 发布
git tag -a v<version> -m "v<version>"
git push origin --tags

clawhub publish . --registry https://www.clawhub.ai \
  --slug command-center --version <new-version> \
  --changelog "变更说明"
```

### 版本号规范

- patch：修复
- minor：兼容新功能
- major：破坏性变更

## 🎨 主题命名建议

项目有 Starcraft/Zerg 主题，命名可适度保持一致（如 Overmind / Overlord / Creep 等）。

## 🧪 测试与调试

```bash
npm test
npm run test:coverage

DEBUG=openclaw:* npm run dev
DEBUG=openclaw:api npm run dev
```

## 🔄 交接协议

会话结束或交接时请确保：

1. 已提交当前进度
2. 清晰记录当前状态
3. 列出未完成事项
4. 标注需要人类决策的点

## 📖 经验总结（精简）

- **DRY 是底线**：重复代码必须抽离
- **术语统一很重要**：避免同物多名
- **零构建架构要权衡**：简洁但模式受限
- **SSE 连接要集中管理**：避免多组件重复建立连接
- **每次大改后立即测试**：缩短反馈回路
- **记录“为什么”**：为未来维护者留决策上下文

## 📚 参考

- [SKILL.md](./SKILL.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [docs/](./docs/)

---

_“觉醒吧，孩子，拥抱你与生俱来的荣耀。”_
