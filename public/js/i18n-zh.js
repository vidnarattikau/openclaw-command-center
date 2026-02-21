(function () {
  "use strict";

  const TEXT_MAP = new Map([
    ["Command Center", "指挥中心"],
    ["Navigation", "导航"],
    ["System Vitals", "系统状态"],
    ["LLM Usage", "LLM 用量"],
    ["Sessions", "会话"],
    ["Cron Jobs", "定时任务"],
    ["AI Jobs", "AI 任务"],
    ["Memory", "记忆"],
    ["Cerebro", "话题中枢"],
    ["Operators", "操作者"],
    ["Settings", "设置"],
    ["Privacy", "隐私"],
    ["About", "关于"],
    ["Quick Stats", "快速统计"],
    ["Tokens", "Token"],
    ["Est. Daily", "预估日成本"],
    ["Est. Monthly", "预估月成本"],
    ["Avg Tok/Sess", "平均Token/会话"],
    ["Avg $/Sess", "平均$/会话"],
    ["OpenClaw Command Center", "OpenClaw 指挥中心"],
    ["A Starcraft-inspired dashboard for OpenClaw orchestration", "一个受星际争霸启发的 OpenClaw 编排面板"],
    ["Connecting...", "连接中..."],
    ["Live", "在线"],
    ["Recent", "最近"],
    ["Idle", "空闲"],
    ["Enabled", "启用"],
    ["Disabled", "停用"],
    ["Frequent (<1h)", "高频(<1小时)"],
    ["Daily", "每日"],
    ["Weekly", "每周"],
    ["Today", "今日"],
    ["This Week", "本周"],
    ["Older", "更早"],
    ["Daily Logs", "每日日志"],
    ["State Files", "状态文件"],
    ["Dashboard access", "面板访问"],
    ["No active sub-agents", "暂无活跃子代理"],
    ["Recent Memory Files", "最近记忆文件"],
    ["Memory editing UI coming soon (Inside Out style!)", "记忆编辑界面即将上线（Inside Out 风格）"],
    ["Cerebro Not Initialized", "Cerebro 未初始化"],
    ["Cerebro tracks conversation topics and threads across sessions.", "Cerebro 会追踪跨会话的话题与线程。"],
    ["Total Tokens", "总 Token"],
    ["Input", "输入"],
    ["Output", "输出"],
    ["Active (15m)", "活跃(15分钟)"],
    ["Est. Cost (24h) 📊", "预估成本(24小时) 📊"],
    ["Est. Monthly Savings", "预估月节省"],
    ["Main", "主会话"],
    ["Sub-agents", "子代理"],
    ["Uptime:", "运行时长："],
    ["CPU", "CPU"],
    ["Memory", "内存"],
    ["Disk", "磁盘"],
    ["Temperature", "温度"],
    ["Normal", "正常"],
    ["API Usage", "API 用量"],
    ["Session Usage", "会话用量"],
    ["Weekly Usage", "周用量"],
    ["5-Hour Usage", "5小时用量"],
    ["Daily Usage", "日用量"],
    ["Tasks Today", "今日任务"],
    ["Quick Actions", "快捷操作"],
    ["Health Check", "健康检查"],
    ["Gateway Status", "网关状态"],
    ["Clean Stale Sessions", "清理陈旧会话"],
    ["AI Jobs Dashboard", "AI 任务面板"],
    ["All", "全部"],
    ["Active", "启用"],
    ["Paused", "暂停"],
    ["Failed", "失败"],
    ["Loading jobs...", "正在加载任务..."],
    ["No jobs found", "未找到任务"],
    ["Run History", "运行记录"],
    ["Loading history...", "正在加载历史..."],
    ["No run history yet", "暂无运行记录"],
    ["Status", "状态"],
    ["Started", "开始时间"],
    ["Duration", "耗时"],
    ["Details", "详情"],
    ["Refresh", "刷新"],
    ["Total Jobs", "总任务"],
    ["Running", "运行中"],
    ["Success Rate", "成功率"],
    ["Recent Failures", "近期失败"],
  ]);

  const ATTR_MAP = new Map([
    ["Toggle sidebar", "折叠侧边栏"],
    ["System Vitals", "系统状态"],
    ["LLM Fuel Gauges", "LLM 油量"],
    ["Sessions", "会话"],
    ["Cron Jobs", "定时任务"],
    ["AI Jobs Dashboard", "AI 任务面板"],
    ["Memory", "记忆"],
    ["Cerebro", "话题中枢"],
    ["Operators", "操作者"],
    ["Privacy Settings", "隐私设置"],
    ["About", "关于"],
    ["Total tokens (24h)", "24小时总Token"],
    ["Click for breakdown", "点击查看明细"],
    ["Projected monthly cost", "预估月成本"],
    ["Average tokens per session", "平均Token/会话"],
    ["Average cost per session", "平均成本/会话"],
    ["SSE connection status", "SSE 连接状态"],
    ["Sessions active within last 15 minutes", "15 分钟内活跃会话"],
    ["Click for cost breakdown", "点击查看成本明细"],
    ["Main session capacity", "主会话容量"],
    ["Sub-agent capacity", "子代理容量"],
    ["Click for breakdown", "点击查看明细"],

  function translateString(text) {
    if (!text) return text;
    let t = text;
    if (TEXT_MAP.has(t.trim())) {
      const trimmed = t.trim();
      t = t.replace(trimmed, TEXT_MAP.get(trimmed));
    }

    t = t.replace(/Live:\s*/gi, "在线：");
    t = t.replace(/Updated:\s*/gi, "更新：");
    t = t.replace(/Next:\s*/gi, "下次：");
    t = t.replace(/^Run History:\s*/i, "运行记录：");

    t = t.replace(/^Last updated:\s*/i, "最后更新：");
    t = t.replace(/Real-time updates via SSE/g, "通过 SSE 实时更新");

    t = t.replace(/\bNormal\b/g, "正常");
    t = t.replace(/\bChecking\.\.\.\b/g, "检测中...");
    t = t.replace(/\bUnavailable\b/g, "不可用");
    t = t.replace(/\bused of total\b/g, "已用 / 总量");
    t = t.replace(/\bused\b/g, "已用");
    t = t.replace(/\bavailable\b/g, "可用");

    t = t.replace(/\buser\b/g, "用户");
    t = t.replace(/\bsys\b/g, "系统");
    t = t.replace(/\bidle\b/g, "空闲");
    t = t.replace(/\bcores\b/g, "核心数");
    t = t.replace(/\b1m avg\b/g, "1分钟均值");
    t = t.replace(/\b5m avg\b/g, "5分钟均值");
    t = t.replace(/\b15m avg\b/g, "15分钟均值");

    t = t.replace(/\bAll\b/g, "全部");
    t = t.replace(/\bLive\b/g, "在线");
    t = t.replace(/\bRecent\b/g, "最近");
    t = t.replace(/\bIdle\b/g, "空闲");
    t = t.replace(/\bChannel:\b/g, "渠道：");
    t = t.replace(/\bKind:\b/g, "类型：");
    t = t.replace(/\bMain Session\b/g, "主会话");
    t = t.replace(/\bSubagent\b/g, "子代理");
    t = t.replace(/\bStatus:\b/g, "状态：");
    t = t.replace(/\bSchedule:\b/g, "调度：");
    t = t.replace(/\bType:\b/g, "类型：");
    t = t.replace(/\bAge:\b/g, "时间：");
    t = t.replace(/\bfiles\b/g, "个文件");
    t = t.replace(/\bsize\b/g, "大小");
    t = t.replace(/\blines\b/g, "行");

    t = t.replace(/\bmain\b/g, "主会话");
    t = t.replace(/\bsubagents\b/gi, "子代理");

    t = t.replace(/^Job \"(.+)\" queued for execution$/i, '任务 "$1" 已加入执行队列');
    t = t.replace(/^Job \"(.+)\" paused$/i, '任务 "$1" 已暂停');
    t = t.replace(/^Job \"(.+)\" resumed$/i, '任务 "$1" 已恢复');

    if (t === "Failed to load jobs") t = "加载任务失败";
    if (t === "Failed to run job") t = "执行任务失败";
    if (t === "Failed to pause job") t = "暂停任务失败";
    if (t === "Failed to resume job") t = "恢复任务失败";

    return t;
  }

  function translateTextNodes(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    for (const node of nodes) {
      const parentTag = node.parentElement?.tagName;
      if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(parentTag)) continue;

      const original = node.nodeValue;
      if (!original || !original.trim()) continue;
      const translated = translateString(original);
      if (translated !== original) node.nodeValue = translated;
    }
  }

  function translateAttributes(root = document.body) {
    const attrs = ["title", "data-tooltip", "aria-label", "placeholder"];
    const all = root.querySelectorAll("*");
    for (const el of all) {
      for (const a of attrs) {
        const v = el.getAttribute(a);
        if (!v) continue;
        if (ATTR_MAP.has(v)) {
          el.setAttribute(a, ATTR_MAP.get(v));
        } else {
          const translated = translateString(v);
          if (translated !== v) el.setAttribute(a, translated);
        }
      }
    }
  }

  function runI18n() {
    try {
      document.documentElement.lang = "zh-CN";
      translateTextNodes();
      translateAttributes();
    } catch (e) {
      console.error("[i18n-zh] translate failed:", e);
    }
  }

  const observer = new MutationObserver(() => runI18n());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      runI18n();
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    });
  } else {
    runI18n();
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
})();
