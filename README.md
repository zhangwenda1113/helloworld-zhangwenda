# helloworld-zhangwenda

低代码开发技术（实践）· **练习一**：用 Node.js 做一个 HelloWorld 网站，显示姓名和当前服务器时间，推送到 GitHub，再部署到 Vercel 拿到公网网址。

**线上地址**：<https://helloworld-zhangwenda-ten.vercel.app>

## 一、页面效果

浏览器访问后显示：

> Hello World！
> 我是 **张文达**，我的第一个 AI 开发的网站
> 当前服务器时间：2026-11-10 17:10:18（星期二）

每次刷新都会重新读取一次服务器时间，不是写死的字符串。

## 二、项目文件结构

```
helloworld-zhangwenda/
├── server.js          # 本地运行入口（Node.js 自带 http 模块，零依赖）
├── lib/
│   └── page.js        # 页面渲染：姓名、服务器时间、HTML 与样式
├── api/
│   └── index.js       # Vercel 云函数入口（线上由它响应请求）
├── vercel.json        # 把任意路径的访问都转发到云函数
├── package.json       # 项目信息与启动命令
├── .gitignore
└── README.md
```

**为什么多了一个 `api/index.js`**：Vercel 是 Serverless 平台，不会去执行 `server.js` 里的 `server.listen()`。线上请求由 `api/index.js` 处理，`vercel.json` 负责把 `https://xxx.vercel.app/` 的访问转发给它。两者调用同一个 `lib/page.js`，所以本地和线上长得一模一样。

## 三、本地运行（30 秒）

需要 Node.js 18 及以上。

```bash
cd helloworld-zhangwenda
node server.js
```

或：

```bash
npm start
```

看到 `HelloWorld 网站已启动：http://localhost:3000` 后，浏览器打开 <http://localhost:3000> 即可。

本项目**没有任何第三方依赖**，不需要 `npm install`。

## 四、改名字

打开 `lib/page.js`，第一处常量：

```js
const PROFILE_NAME = '张文达';   // 改成你自己的名字
```

保存后重新访问页面（本地需要重启一次 `node server.js`，线上重新部署即可）。

## 五、推送到 GitHub

仓库地址：<https://github.com/zhangwenda1113/helloworld-zhangwenda>

如果本机已装 Git，推送到已有仓库的标准命令：

```bash
git init
git add .
git commit -m "feat: Node.js HelloWorld 网站（姓名 + 服务器时间）"
git branch -M main
git remote add origin https://github.com/zhangwenda1113/helloworld-zhangwenda.git
git push -u origin main
```

> 首次 push 会弹窗要求登录 GitHub 授权，浏览器登录即可；如果提示认证失败，把报错原文贴给 AI，让它给解决办法。

## 六、部署到 Vercel

1. 打开 <https://vercel.com>，用 GitHub 账号登录；
2. 点击 **Add New → Project**；
3. 在仓库列表里找到 `helloworld-zhangwenda`，点 **Import**；
4. Framework Preset 选 **Other**，Root Directory、Build Command、Output Directory 全部保持默认；
5. 点 **Deploy**，等待约 1 分钟；
6. 出现恭喜页面后，拿到 `helloworld-xxx.vercel.app` 形式的网址。

拿到网址后用浏览器打开，页面应显示姓名和服务器时间；再用手机打开一次，确认公网可访问。

### 常见问题

| 现象 | 原因与处理 |
|---|---|
| 部署成功但打开是 404 或空白 | `vercel.json` 没提交上去，或 rewrite 目标写错。确认仓库根目录有 `vercel.json`，且目标为 `/api/index` |
| 打开报 `FUNCTION_INVOCATION_FAILED` | `api/index.js` 引用的 `../lib/page` 路径不对，检查目录结构是否与上面一致 |
| 页面时间是错的时区 | `lib/page.js` 里 `TIME_ZONE` 固定为 `Asia/Shanghai`，按北京时间显示，不受机房位置影响 |
| 国内浏览器打不开、一直转圈 / `ERR_CONNECTION_TIMED_OUT` | `*.vercel.app` 域名在国内部分网络会被 DNS 污染（本地解析到 108.160.161.83）。这不是部署问题，换个网络（如手机流量）或开启代理即可；也可以在 Vercel 里绑定自己的域名改善访问 |

## 七、验收清单

- [x] `server.js` 已在本地跑通，页面显示姓名与实时服务器时间（HTTP 200，时间 2026-11-10 16:39:28）
- [x] 代码已推送到 GitHub 公开仓库，仓库里能看到 `server.js`
- [x] Vercel 部署完成（状态 Ready，0% 错误率），公网地址 <https://helloworld-zhangwenda-ten.vercel.app> 页面内容正确

提交内容：**Vercel 网址 + GitHub 仓库地址**。
