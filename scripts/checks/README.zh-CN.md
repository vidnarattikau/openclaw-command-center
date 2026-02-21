# 预提交检查（Pre-commit）

自动执行并强制落实 `AGENTS.md` 与 `CONTRIBUTING.md` 中的规则。

## 检查项

| 检查脚本 | 规则来源 | 说明 |
| --- | --- | --- |
| `version-sync.sh` | CONTRIBUTING.md | 校验 `package.json` 与 `SKILL.md` 版本一致 |
| `no-user-data.sh` | public/data/AGENTS.md | 阻止提交用户私有数据文件 |
| `no-secrets.sh` | AGENTS.md | 扫描是否误提交密钥/凭据 |

## 新增检查脚本

1. 在 `scripts/checks/` 下创建 `<check-name>.sh`
2. 脚本要求：
   - 第一个参数为仓库根目录（`$1`）
   - 成功退出 `0`
   - 失败退出 `1`
   - 失败时输出清晰错误信息
3. 授权执行：

```bash
chmod +x scripts/checks/<check-name>.sh
```

## 手动运行

```bash
# 运行全部检查
./scripts/pre-commit

# 运行单项检查
./scripts/checks/version-sync.sh .
```

## 安装 Hook

```bash
make install-hooks
# 或手动：
cp scripts/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## 跳过检查（不推荐）

```bash
git commit --no-verify
```

仅在你明确知道风险且有正当理由时使用。
