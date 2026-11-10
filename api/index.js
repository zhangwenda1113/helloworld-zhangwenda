'use strict';

/**
 * Vercel 云函数入口
 * Vercel 不会执行 server.js 里的 server.listen，
 * 而是把这个文件当成一个请求处理函数来调用，所以单独放在 api/ 目录下。
 */

const { renderPage } = require('../lib/page');

module.exports = (req, res) => {
  // 直接用 Node.js 原生的 writeHead / end，不依赖任何框架封装，
  // 在 Vercel 的 Node.js Runtime 里同样可用
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(renderPage());
};
