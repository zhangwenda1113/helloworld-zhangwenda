'use strict';

/**
 * 本地运行入口
 * 零依赖：只用 Node.js 自带的 node:http，不需要 npm install 就能跑。
 * 启动：node server.js  或  npm start
 * 访问：http://localhost:3000
 */

const http = require('node:http');
const { renderPage } = require('./lib/page');

const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  // 浏览器自动请求的 favicon 直接给个空响应，避免页面上出现 404 报错
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 任何路径都返回首页，保证访问根路径或随手敲的路径都能看到 Hello World
  const html = renderPage();
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store', // 不缓存，保证刷新就能看到最新服务器时间
  });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`HelloWorld 网站已启动：http://localhost:${PORT}`);
});
