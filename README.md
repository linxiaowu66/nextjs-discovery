# Next.js Discovery

这是一个用于验证 Next.js 各种特性的项目，包括：

- **缓存**：探索 Next.js 的各种缓存策略（Request Memoization、Data Cache、Full Route Cache、Router Cache）
- **服务端渲染**：验证 SSR、SSG 和 ISR 特性
- **局部渲染**：测试 Streaming 和 Suspense 功能

## 开始使用

首先，安装依赖：

```bash
pnpm install
```

然后，运行开发服务器：

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 项目结构

```
nextjs-discovery/
├── src/
│   └── app/          # App Router 目录
│       ├── layout.tsx
│       ├── page.tsx
│       ├── globals.css
│       └── hooks-test/  # React Hooks 执行时机测试
│           ├── page.tsx
│           ├── layout.tsx
│           ├── server-component.tsx
│           ├── safe-browser-api.tsx
│           └── README.md
├── public/           # 静态资源
├── next.config.ts    # Next.js 配置
├── tailwind.config.ts # Tailwind CSS 配置
└── package.json
```

## 测试页面

### 1. React Hooks 执行时机测试 (`/hooks-test`)

验证哪些 React hooks 会在服务端渲染时执行，哪些只在客户端执行。

**测试内容：**
- ✅ 服务端执行的 hooks：useState, useReducer, useRef, useMemo, useCallback, useContext, useId, useSyncExternalStore
- 🔵 客户端执行的 hooks：useEffect, useLayoutEffect
- 📝 安全使用浏览器 API 的最佳实践示例

访问 `/hooks-test` 查看详细测试和说明。

### 2. basePath 和 assetPrefix 配置测试 (`/base-path-test`)

测试 Next.js 配置中的 basePath 和 assetPrefix 参数。

**测试内容：**
- basePath 对路由、API、链接的影响
- assetPrefix 对静态资源的影响
- 常见陷阱和解决方案

详见：`BASE-PATH-ASSET-PREFIX-GUIDE.md`

### 3. 环境变量测试 (`/env-test`)

测试 Next.js 中环境变量的使用和限制。

**测试页面：**
- `/env-test` - 服务端环境变量测试
- `/env-test/client` - 客户端环境变量测试
- `/api/env-test` - API 路由测试

**测试内容：**
- 服务端专用环境变量（无 `NEXT_PUBLIC_` 前缀）
- 客户端环境变量（有 `NEXT_PUBLIC_` 前缀）
- 环境变量的加载顺序
- 构建时内联行为

**快速开始：**
```bash
# 1. 复制示例文件（注意：.env 文件被 gitignore，这里提供了 .txt 版本）
cp .env.example.txt .env.local
# 或手动创建 .env.local 并参考 .env.example.txt 的内容

# 2. 编辑配置
vi .env.local

# 3. 启动开发服务器
pnpm dev
```

详见：
- `ENV-VARIABLES-GUIDE.md` - 完整技术文档
- `ENV-SETUP-GUIDE.md` - 快速配置指南

### 4. 缓存机制测试 (`/cache-test`)

测试 Next.js 的四种缓存机制。

**测试页面：**
- `/cache-test` - 缓存机制主页
- `/cache-test/data-cache` - Data Cache（fetch 缓存）
- `/cache-test/full-route-cache` - Full Route Cache（全路由缓存）
- `/cache-test/request-memoization` - Request Memoization（请求记忆化）
- `/cache-test/router-cache` - Router Cache（客户端缓存）
- `/cache-test/image-cache` - Image Cache（图片缓存）
- `/cache-test/comparison` - 缓存对比和总结

**测试内容：**
- 🔄 Request Memoization - 单次渲染周期内的请求去重
- 📦 Data Cache - fetch 请求的持久化缓存
- 🗺️ Full Route Cache - 构建时预渲染整个路由
- 🧭 Router Cache - 客户端路由缓存
- 🖼️ Image Cache - Next.js Image 组件的优化和缓存

**验证方法：**
1. **开发环境：**`pnpm dev`（某些缓存行为会有差异）
2. **生产环境：**`pnpm build && pnpm start`（完整缓存行为）
3. 通过时间戳观察缓存是否生效
4. 查看终端日志和浏览器控制台

详见：
- `CACHE-GUIDE.md` - 完整缓存技术文档
- `IMAGE-CACHE-GUIDE.md` - 图片缓存和优化指南

### 5. 渲染模式测试 (`/rendering-test`)

测试 Next.js 的各种渲染策略和模式。

**测试页面：**
- `/rendering-test` - 渲染模式主页
- `/rendering-test/static` - 静态渲染 (SSG)
- `/rendering-test/dynamic` - 动态渲染 (SSR)
- `/rendering-test/isr` - 增量静态再生成 (ISR)
- `/rendering-test/streaming` - 流式渲染 (Streaming)
- `/rendering-test/ppr` - 部分预渲染 (PPR, 实验性)
- `/rendering-test/on-demand` - 按需重新验证
- `/rendering-test/client` - 客户端渲染 (CSR)
- `/rendering-test/hybrid` - 混合渲染

**测试内容：**
- 📄 Static Site Generation (SSG) - 构建时生成静态页面
- 🔄 Server-Side Rendering (SSR) - 每次请求都渲染
- 🔁 Incremental Static Regeneration (ISR) - 定时重新生成
- ⚡ Streaming - 使用 Suspense 流式渲染
- 🧪 Partial Prerendering (PPR) - 静态 + 动态混合（实验性）
- 🎯 On-Demand Revalidation - 手动触发重新验证
- 💻 Client-Side Rendering (CSR) - 浏览器渲染
- 🔀 Hybrid Rendering - 组合多种渲染策略

**验证方法：**
1. **查看构建输出：**`pnpm build`（显示每个页面的渲染类型）
2. **生产环境测试：**`pnpm build && pnpm start`
3. **观察时间戳变化：**判断是否重新渲染
4. **查看终端日志：**了解渲染时机
5. **查看页面源代码：**验证服务端渲染的 HTML

详见：`RENDERING-GUIDE.md` - 完整渲染模式技术文档

## 技术栈

- **Next.js 16** - React 框架（最新版本）
- **React 19** - React 最新版本
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **App Router** - Next.js 最新的路由系统
- **pnpm** - 包管理器

