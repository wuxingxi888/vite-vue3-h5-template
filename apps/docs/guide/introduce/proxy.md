# Proxy 跨域代理

在现代前端开发中，由于浏览器的同源策略限制，前端应用在访问不同域的后端接口时会遇到跨域问题。为了解决这个问题，本项目配置了开发环境下的代理服务器，使得前端请求可以顺利到达后端服务器。

## 什么是跨域

跨域是指浏览器出于安全考虑，限制从一个源（协议、域名、端口）向另一个源发起请求的行为。同源策略是浏览器最基本的安全功能，它防止恶意网站读取其他网站的数据。

当协议、域名或端口有任何一个不同时，就构成了跨域请求。例如：

- 前端地址：`http://localhost:3000`
- 后端接口：`http://localhost:8080/api/users`

虽然都在本地，但端口不同（3000 vs 8080），就构成了跨域。

## 为什么使用代理

在开发环境中，我们通常会遇到以下跨域场景：

1. **本地开发服务器**：前端运行在 Vite 的开发服务器上（如 `http://localhost:3000`）
2. **后端API服务器**：后端服务运行在不同的端口或服务器上（如 `http://localhost:8080` 或
   `https://api.example.com`）

直接从前端访问后端接口会触发浏览器的跨域限制，为了解决这个问题，我们可以使用代理。

## 代理配置原理

Vite 内置了代理功能，基于 [node-http-proxy](https://github.com/http-party/node-http-proxy)
实现。代理的工作原理是：

1. 前端向本地开发服务器发起请求（如 `/api/users`）
2. 开发服务器接收到请求后，根据代理配置将请求转发给目标服务器
3. 目标服务器处理请求并返回响应
4. 开发服务器将响应返回给前端

这样就避免了浏览器的跨域限制，因为对于浏览器来说，请求是发送给同源的开发服务器的。

## 配置方式

项目在 [build/vite/proxy.ts] 中实现了代理配置的生成函数：

```ts
/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite';

type ProxyItem = [string, string];
type ProxyList = ProxyItem[];
type ProxyTargetList = Record<string, ProxyOptions & { rewrite: (path: string) => string }>;

const httpsRE = /^https:\/\//;

/**
 * Generate proxy
 * @param list
 */
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      // 如果您secure="true"只允许来自 HTTPS 的请求，则secure="false"意味着允许来自 HTTP 和 HTTPS 的请求。
      ...(isHttps ? { secure: false } : {}),
    };
  }

  return ret;
}
```

在 [vite.config.ts] 中使用该函数：

```ts
import { createProxy } from './build/vite/proxy';

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const viteEnv = wrapperEnv(env);
  const { VITE_PROXY } = viteEnv;

  return {
    server: {
      proxy: createProxy(VITE_PROXY),
      // ...
    },
    // ...
  };
});
```

## 环境变量配置

代理配置通过环境变量进行管理，在 [.env.development] 文件中配置：

```env
# proxy
VITE_PROXY=[["/api","http://localhost:8080"],["/upload","http://localhost:8001/upload"]]
```

这是一个二维数组的 JSON 字符串，每一项包含两个元素：

1. **前缀路径**：匹配需要代理的请求路径
2. **目标地址**：实际要转发到的服务器地址

## 使用示例

### 基础代理配置

假设我们的后端服务运行在 `http://localhost:8080`，我们需要将所有以 `/api` 开头的请求代理到该服务器：

```env
VITE_PROXY=[["/api","http://localhost:8080"]]
```

前端代码中的请求：

```ts
// 原本的请求地址: http://localhost:8080/api/users
// 实际请求地址: http://localhost:3000/api/users (开发服务器)
// 代理转发到: http://localhost:8080/api/users (后端服务器)
const response = await fetch('/api/users');
```

### 多路径代理配置

如果有多个不同的后端服务，可以配置多个代理：

```env
VITE_PROXY=[["/api","http://localhost:8080"],["/upload","http://localhost:8001/upload"]]
```

这样：

- `/api/users` 会被代理到 `http://localhost:8080/api/users`
- `/upload/image` 会被代理到 `http://localhost:8001/upload/image`

### 路径重写

代理还支持路径重写，例如将 `/api/v1/users` 转发到 `http://localhost:8080/users`：

```ts
ret[prefix] = {
  target,
  changeOrigin: true,
  rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
  // ...
};
```

## HTTPS 代理

对于 HTTPS 目标服务器，代理会自动设置 `secure: false` 以允许 HTTP 和 HTTPS 请求：

```ts
const isHttps = httpsRE.test(target)
// ...
...(isHttps ? { secure: false } : {})
```

## WebSocket 支持

代理配置中默认启用了 WebSocket 支持：

```ts
ws: true;
```

这使得 WebSocket 连接也能通过代理正常工作。

## 生产环境处理

需要注意的是，代理只在开发环境中有效。在生产环境中，需要通过以下方式解决跨域问题：

1. **后端配置 CORS**：在后端服务器设置适当的 CORS 头
2. **Nginx 反向代理**：在生产环境的 Nginx 配置中设置反向代理
3. **统一域名**：将前端和后端部署在同一个域名下

## 最佳实践

1. **合理配置代理路径**：只为需要的接口路径配置代理，避免代理所有请求
2. **环境区分**：不同环境使用不同的代理配置
3. **HTTPS 处理**：正确处理 HTTPS 目标服务器的代理配置
4. **路径重写**：根据实际需求配置路径重写规则
5. **WebSocket 支持**：确保需要 WebSocket 的场景启用了相应配置

通过合理的代理配置，我们可以在开发环境中轻松解决跨域问题，提高开发效率。
