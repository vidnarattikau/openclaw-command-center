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
    ["AI Jobs Dashboard", "AI 任务面板"],
    ["Memory", "记忆"],
    ["Cerebro", "话题中枢"],
    ["Operators", "操作者"],
    ["Settings", "设置"],
    ["Privacy", "隐私"],
    ["About", "关于"],
    ["Quick Stats", "快速统计"],
    ["Tokens", "Token"],
    ["OpenClaw Command Center", "OpenClaw 指挥中心"],
    ["Connecting...", "连接中..."],
    ["Total Tokens", "总 Token"],
    ["Input", "输入"],
    ["Output", "输出"],
    ["Active (15m)", "活跃(15分钟)"],
    ["Est. Cost (24h) 📊", "预估成本(24小时) 📊"],
    ["Est. Monthly Savings", "预估月节省"],
    ["Main", "主会话"],
    ["Sub-agents", "子代理"],
    ["Uptime:", "运行时长："],
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
    ["Active Sub-agents", "活跃子代理"],
    ["LLM Fuel Gauges", "LLM 油量"],
    ["Routing:", "路由："],
    ["Session Limit", "会话限制"],
    ["Weekly (All Models)", "周限制（全模型）"],
    ["Sonnet Weekly", "Sonnet 周限制"],
    ["Task Routing", "任务路由"],
    ["Avg latency:", "平均延迟："],
    ["remaining", "剩余"],
    ["resets in", "重置于"],
    ["resets", "重置"],
    ["used", "已用"],
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
    ["No active sub-agents", "暂无活跃子代理"],
    ["Recent Memory Files", "最近记忆文件"],
    ["Memory editing UI coming soon (Inside Out style!)", "记忆编辑界面即将上线（Inside Out 风格）"],
    ["Cerebro Not Initialized", "Cerebro 未初始化"],
    ["Cerebro tracks conversation topics and threads across sessions.", "Cerebro 会追踪跨会话的话题与线程。"],
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
  ]);

  function translateString(text) {
    if (!text) return text;

    let out = text;
    const trimmed = out.trim();
    if (TEXT_MAP.has(trimmed)) {
      out = out.replace(trimmed, TEXT_MAP.get(trimmed));
    }

    out = out.replace(/^Live:\s*/i, "在线：");
    out = out.replace(/^Updated:\s*/i, "更新：");
    out = out.replace(/^Next:\s*/i, "下次：");
    out = out.replace(/^Run History:\s*/i, "运行记录：");
    out = out.replace(/^Last updated:\s*/i, "最后更新：");

    out = out.replace(/^Job \"(.+)\" queued for execution$/i, '任务 "$1" 已加入执行队列');
    out = out.replace(/^Job \"(.+)\" paused$/i, '任务 "$1" 已暂停');
    out = out.replace(/^Job \"(.+)\" resumed$/i, '任务 "$1" 已恢复');

    out = out.replace(/\bFailed to fetch sessions\b/g, "拉取会话失败");
    out = out.replace(/\bFailed to fetch state\b/g, "拉取状态失败");
    out = out.replace(/\bFailed to fetch operators\b/g, "拉取操作者失败");
    out = out.replace(/\bFailed to fetch routing stats\b/g, "拉取路由统计失败");
    out = out.replace(/\bFailed to fetch LLM usage\b/g, "拉取 LLM 用量失败");
    out = out.replace(/\bFailed to load operator\b/g, "加载操作者失败");
    out = out.replace(/\bFailed to load user data\b/g, "加载用户数据失败");
    out = out.replace(/\bFailed to fetch detail\b/g, "拉取详情失败");
    out = out.replace(/\bRequest timed out\b/g, "请求超时");
    out = out.replace(/\bFailed to load session\b/g, "加载会话失败");
    out = out.replace(/\bFailed to load cost data\b/g, "加载成本数据失败");

    if (out === "Failed to load jobs") out = "加载任务失败";
    if (out === "Failed to run job") out = "执行任务失败";
    if (out === "Failed to pause job") out = "暂停任务失败";
    if (out === "Failed to resume job") out = "恢复任务失败";

    return out;
  }

  function translateTextNodes(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);

    for (const n of nodes) {
      const parentTag = n.parentElement?.tagName;
      if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(parentTag)) continue;

      const original = n.nodeValue;
      if (!original || !original.trim()) continue;

      const translated = translateString(original);
      if (translated !== original) n.nodeValue = translated;
    }
  }

  function translateAttributes(root = document.body) {
    const attrs = ["title", "data-tooltip", "aria-label", "placeholder"];
    const all = root.querySelectorAll("*");

    for (const el of all) {
      for (const attr of attrs) {
        const v = el.getAttribute(attr);
        if (!v) continue;

        if (ATTR_MAP.has(v)) {
          el.setAttribute(attr, ATTR_MAP.get(v));
        } else {
          const translated = translateString(v);
          if (translated !== v) el.setAttribute(attr, translated);
        }
      }
    }
  }

  function runI18n() {
    try {
      document.documentElement.lang = "zh-CN";
      translateTextNodes();
      translateAttributes();
    } catch (err) {
      console.error("[i18n-zh] translate failed:", err);
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
