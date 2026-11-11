# helloworld-zhangwenda

低代码开发技术（实践）· **练习一**：用 Node.js 做一个 HelloWorld 网站，显示当前服务器时间，推送到 GitHub，再部署到 Vercel 拿到公网网址。

**线上地址**：<https://helloworld-zhangwenda-ten.vercel.app>
**代码仓库**：<https://github.com/zhangwenda1113/helloworld-zhangwenda>

## 一、页面效果

浏览器访问后显示：

> Hello World！
> 我的第一个 AI 开发的网站
> 当前服务器时间：2026-11-11 21:31:52（星期三）

时间由服务器每次请求时重新生成，不是写死的字符串；按北京时间（Asia/Shanghai）显示，不受机房所在时区影响。

## 二、项目文件结构

```
helloworld-zhangwenda/
├── server.js          # 本地运行入口（Node.js 自带 http 模块，零依赖）
├── lib/
│   └── page.js        # 页面渲染：HTML、样式与服务器时间格式化
├── api/
│   └── index.js       # Vercel 云函数入口（线上由它响应请求）
├── vercel.json        # 把任意路径的访问都转发到云函数
├── package.json       # 项目信息与启动命令
├── .gitignore
└── README.md
```

**为什么多一个 `api/index.js`**：Vercel 是 Serverless 平台，不会执行 `server.js` 里的 `server.listen()`。线上请求由 `api/index.js` 处理，`vercel.json` 负责把 `https://xxx.vercel.app/` 的访问转发给它。两者调用同一个 `lib/page.js`，所以本地和线上显示一致。

## 三、本地运行（30 秒）

需要 Node.js 18 及以上。

```bash
cd helloworld-zhangwenda
node server.js
```

或 `npm start`。看到 `HelloWorld 网站已启动：http://localhost:3000` 后，浏览器打开 <http://localhost:3000> 即可。

本项目**没有任何第三方依赖**，不需要 `npm install`。

## 四、部署到 Vercel

1. 打开 <https://vercel.com>，用 GitHub 账号登录；
2. 点击 **Add New → Project**，选中仓库 `helloworld-zhangwenda`，点 **Import**；
3. Framework Preset 选 **Other**，Root Directory、Build Command、Output Directory 全部保持默认；
4. 点 **Deploy**，等待约 1 分钟；
5. 完成后获得 `helloworld-xxx.vercel.app` 形式的公网网址。

项目已接入 Git，之后每次向 `main` 分支推送提交，Vercel 会自动重新部署。

## 五、常见问题

| 现象 | 原因与处理 |
|---|---|
| 部署成功但打开是 404 或空白 | `vercel.json` 没提交，或 rewrite 目标写错。确认仓库根目录有 `vercel.json`，目标为 `/api/index` |
| 打开报 `FUNCTION_INVOCATION_FAILED` | `api/index.js` 里 `../lib/page` 的路径不对，检查目录结构 |
| 页面时间差 8 小时 | `lib/page.js` 里 `TIME_ZONE` 固定为 `Asia/Shanghai`，按北京时间显示 |
| 国内浏览器打不开、一直转圈或 `ERR_CONNECTION_TIMED_OUT` | `*.vercel.app` 域名在国内部分网络会被 DNS 污染，不是部署问题。换手机流量或代理网络即可打开；长期使用可在 Vercel 绑定自己的域名 |

## 六、验收记录（2026-11-11）

| 验收项 | 结果 | 证据 |
|---|---|---|
| 本地跑通 | 通过 | `node server.js` 后请求 `http://localhost:3000` 返回 200，页面含 “Hello World！” 与副标题，时间为 2026-11-11 21:26:06（星期三） |
| 代码上 GitHub | 通过 | 提交 `5899b2f`，仓库可见 `server.js`、`lib/page.js`、`api/index.js`、`vercel.json` |
| Vercel 部署 | 通过 | Production 部署状态 Ready，来源分支 `main`，错误率 0% |
| 公网可访问 | 通过 | 由外部网络抓取 `https://helloworld-zhangwenda-ten.vercel.app` 返回 200（`server: Vercel`，节点 `iad1`），页面标题 “Hello World \| 我的第一个 AI 开发的网站”；渲染截图显示服务器时间 2026-11-11 21:31:52（星期三） |

提交内容：**Vercel 网址 + GitHub 仓库地址**。
