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

## 技术栈

- **Next.js 16** - React 框架（最新版本）
- **React 19** - React 最新版本
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **App Router** - Next.js 最新的路由系统
- **pnpm** - 包管理器

