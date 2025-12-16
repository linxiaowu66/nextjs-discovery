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

## 技术栈

- **Next.js 16** - React 框架（最新版本）
- **React 19** - React 最新版本
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **App Router** - Next.js 最新的路由系统
- **pnpm** - 包管理器

