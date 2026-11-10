'use strict';

/**
 * 页面渲染模块
 * 本地（server.js）和 Vercel 云函数（api/index.js）共用同一个渲染函数，
 * 保证“本地看到的”和“公网上看到的”完全一致。
 */

// ===== 只要改名字，改这一行即可 =====
const PROFILE_NAME = '张文达';

// 时间统一按北京时间显示，避免服务器所在机房时区不同导致时间对不上
const TIME_ZONE = 'Asia/Shanghai';

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** 把当前时间格式化为 “2026-11-10 16:38:05（星期二）” */
function formatServerTime(date = new Date(), timeZone = TIME_ZONE) {
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
    hour12: false,
  }).formatToParts(date);

  const pick = (type) => (parts.find((p) => p.type === type) || {}).value || '';
  const datePart = `${pick('year')}-${pick('month')}-${pick('day')}`;
  const timePart = `${pick('hour')}:${pick('minute')}:${pick('second')}`;
  return `${datePart} ${timePart}（${pick('weekday')}）`;
}

/** 生成整页 HTML；每次请求都会重新取服务器时间 */
function renderPage(name = PROFILE_NAME, now = new Date()) {
  const safeName = escapeHtml(name);
  const serverTime = formatServerTime(now);
  const isoTime = now.toISOString();

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Hello World | ${safeName} 的第一个 AI 开发网站</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
    background: radial-gradient(circle at 20% 20%, #eef4ff 0%, #f7f9fc 45%, #eaf7f1 100%);
    color: #1f2937;
  }
  .card {
    width: 100%;
    max-width: 640px;
    padding: 48px 40px;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 0 18px 48px rgba(31, 41, 55, 0.10);
    border: 1px solid #e8edf5;
    text-align: center;
  }
  .badge {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    background: #eef4ff;
    color: #3563e9;
    font-size: 13px;
    letter-spacing: 1px;
    margin-bottom: 22px;
  }
  h1 {
    font-size: 44px;
    line-height: 1.2;
    letter-spacing: 1px;
    color: #111827;
    margin-bottom: 18px;
  }
  .subtitle {
    font-size: 18px;
    line-height: 1.9;
    color: #374151;
  }
  .name { color: #3563e9; font-weight: 600; }
  .divider {
    height: 1px;
    background: #eef1f6;
    margin: 30px 0 24px;
  }
  .time-box {
    display: inline-block;
    padding: 16px 26px;
    border-radius: 12px;
    background: #f8fafc;
    border: 1px dashed #d7dee9;
  }
  .time-label { font-size: 13px; color: #6b7280; margin-bottom: 6px; }
  .time-value {
    font-size: 22px;
    font-weight: 600;
    color: #111827;
    font-variant-numeric: tabular-nums;
  }
  footer {
    margin-top: 28px;
    font-size: 13px;
    color: #9ca3af;
    line-height: 1.8;
  }
  @media (max-width: 480px) {
    .card { padding: 34px 22px; }
    h1 { font-size: 32px; }
    .subtitle { font-size: 16px; }
    .time-value { font-size: 18px; }
  }
</style>
</head>
<body>
  <main class="card">
    <span class="badge">NODE.JS · LOW-CODE PRACTICE</span>
    <h1>Hello World！</h1>
    <p class="subtitle">
      我是 <span class="name">${safeName}</span>，<br />
      我的第一个 AI 开发的网站
    </p>
    <div class="divider"></div>
    <div class="time-box">
      <div class="time-label">当前服务器时间</div>
      <div class="time-value">${serverTime}</div>
    </div>
    <footer>
      服务器时间（ISO）：<span id="iso">${isoTime}</span><br />
      每次刷新页面都会重新取一次服务器时间
    </footer>
  </main>
</body>
</html>`;
}

module.exports = { renderPage, formatServerTime, escapeHtml, PROFILE_NAME };
