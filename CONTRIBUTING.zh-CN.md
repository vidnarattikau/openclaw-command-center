# 参与贡献 OpenClaw Command Center

> _“加入虫群，一起进化。”_

感谢你愿意为 OpenClaw Command Center 贡献代码与想法。这个项目靠社区一起推动。

## 📋 目录

- [行为准则](#行为准则)
- [快速开始](#快速开始)
- [开发环境](#开发环境)
- [如何贡献](#如何贡献)
- [PR 提交流程](#pr-提交流程)
- [风格规范](#风格规范)
- [发布到 ClawHub](#发布到-clawhub)
- [给 AI 贡献者](#给-ai-贡献者)

## 📜 行为准则

本项目遵循 [Code of Conduct](./CODE_OF_CONDUCT.md)。参与贡献即表示你同意遵守相关规范。

## 🚀 快速开始

### 前置要求

- Node.js v20+
- npm v10+
- Git

### 开发环境

1. **Fork 仓库**
2. **克隆你的 fork**

```bash
git clone https://github.com/YOUR_USERNAME/openclaw-command-center.git
cd openclaw-command-center
```

3. **添加上游仓库**

```bash
git remote add upstream https://github.com/jontsai/openclaw-command-center.git
```

4. **安装依赖**

```bash
npm install
```

5. **创建配置文件**

```bash
cp config/dashboard.example.json config/dashboard.json
```

6. **安装 pre-commit hooks**

```bash
make install-hooks
```

7. **启动开发模式**

```bash
npm run dev
```

## 🛠️ 如何贡献

欢迎以下类型贡献：

- 🐛 Bug 修复
- ✨ 新功能
- 📚 文档改进
- 🧪 测试覆盖
- 🎨 UI/UX 优化
- 🔧 性能优化

### 开始前建议

1. 先看已有 issue，避免重复劳动
2. 大改动先开 issue 讨论
3. 一次 PR 尽量只做一件事

### 分支命名建议

```text
feat/add-session-filtering
fix/connection-timeout
docs/update-api-reference
refactor/simplify-cache
```

## 📤 PR 提交流程

### 1) 新建分支

```bash
git checkout main
git pull upstream main
git checkout -b feat/your-feature-name
```

### 2) 完成改动

- 代码清晰可维护
- 新功能补测试
- 必要时同步更新文档
- 遵循下方风格规范

### 3) 本地验证

```bash
npm test
npm run lint
```

### 4) 规范提交信息

采用 [Conventional Commits](https://www.conventionalcommits.org/)：

```bash
git commit -m "feat: add heartbeat indicator"
git commit -m "fix: resolve session timeout on reconnect"
git commit -m "docs: clarify API authentication flow"
```

### 5) 推送并发起 PR

```bash
git push origin feat/your-feature-name
```

然后到 GitHub 发起 Pull Request。

### 6) 代码评审

- 维护者会 review
- 按反馈调整
- 通过后合并

### PR 自检清单

- [ ] 代码符合风格规范
- [ ] `npm test` 通过
- [ ] `npm run lint` 通过
- [ ] 文档已同步（如需要）
- [ ] commit message 规范
- [ ] PR 描述清楚改动目的

## 🎨 风格规范

### 代码风格

- 遵循项目 ESLint 配置
- 使用 Prettier 格式化
- 优先 `const`，少用 `let`，禁用 `var`
- 变量命名清晰可读
- 公共函数尽量加 JSDoc

### 命名风格

项目有 Starcraft 主题命名文化，可适度沿用。

### 文档风格

- 语言清晰、少废话
- 复杂功能给示例
- README / docs 与代码保持一致
- 复杂逻辑补充必要注释

## 📦 发布到 ClawHub

项目通过 [ClawHub](https://clawhub.ai) 分发。主分支合并后由维护者发布。

### 前置

```bash
# 登录
clawhub login
clawhub whoami
```

### 发布流程

1. 更新 `package.json` 版本号
2. 打 release tag（见下方）
3. 发布：

```bash
clawhub publish . --registry https://www.clawhub.ai \
  --slug command-center --version <new-version> \
  --changelog "变更说明"
```

> 注：在上游 `.well-known` 重定向修复前，`--registry` 建议显式传入。也可设置：
> `export CLAWHUB_REGISTRY=https://www.clawhub.ai`

### 发布 Tag

```bash
git tag -a v<version> -m "v<version> — short description"
git push origin --tags
```

### 版本号规范（semver）

| 变更类型 | 版本 | 示例 |
| --- | --- | --- |
| 修复/小改 | patch | `0.1.0 → 0.1.1` |
| 新功能（兼容） | minor | `0.1.0 → 0.2.0` |
| 破坏性改动 | major | `0.1.0 → 1.0.0` |

⚠️ 升版本时请同时修改：

- `package.json`：`"version": "X.Y.Z"`
- `SKILL.md`：frontmatter 里的 `version: X.Y.Z`

两者不一致会被 pre-commit 拦截。

### 发布后验证

```bash
clawhub inspect command-center
clawhub install command-center
```

## 🤖 给 AI 贡献者

AI 贡献者也欢迎：

1. 先读上下文文件
   - [AGENTS.md](./AGENTS.md)
   - [SKILL.md](./SKILL.md)
2. 按同样 PR 流程走
3. 改动说明写清楚，方便后续人类/AI接手
4. 大改动先开 issue 讨论

## 💬 获取帮助

- 问题讨论：GitHub Discussions
- Bug：GitHub Issues
- 安全问题：请私下联系维护者（不要公开 issue）

## 🙏 致谢

贡献者会在以下位置被感谢：

- GitHub Contributors
- Release notes（重要贡献）
- 以及来自虫群的长期感谢 🐛

---

_“虫群欢迎一切为共同目标服务的贡献者。”_
