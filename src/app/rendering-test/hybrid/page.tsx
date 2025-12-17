import Link from 'next/link';
import { HybridClientComponent } from './hybrid-client-component';

/**
 * Hybrid Rendering (混合渲染)
 * 
 * 在同一个页面中组合服务端组件和客户端组件
 * 这是 Next.js App Router 的强大之处
 */

export default async function HybridPage() {
  const serverRenderTime = new Date().toISOString();
  
  // 服务端数据获取
  console.log('[HYBRID] 服务端渲染时间:', serverRenderTime);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/rendering-test" className="text-blue-600 hover:underline">
          ← 返回渲染测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">混合渲染 (Hybrid)</h1>

      <div className="bg-indigo-50 border border-indigo-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-indigo-800">
          🔀 什么是混合渲染？
        </h2>
        <p className="text-sm text-gray-700">
          在同一个页面中<strong>组合使用</strong>服务端组件和客户端组件，
          充分利用两者的优势：服务端组件处理数据获取和 SEO，
          客户端组件处理交互和动态更新。
        </p>
      </div>

      {/* 服务端组件 */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-green-800">
          🖥️ 服务端组件
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          这部分在服务器渲染，可以直接访问数据库、API 等后端资源。
        </p>
        <div className="bg-white rounded p-4">
          <p className="text-sm">
            <strong>服务端渲染时间：</strong>
            <span className="ml-2 font-mono text-green-700">{serverRenderTime}</span>
          </p>
          <p className="text-xs text-green-600 mt-2">
            ✅ 这个时间在构建时确定（如果是静态渲染）
          </p>
        </div>
      </div>

      {/* 客户端组件 */}
      <HybridClientComponent />

      {/* 架构图 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">📐 混合渲染架构</h2>
        <div className="bg-white rounded p-4 font-mono text-xs">
          <pre>{`页面 (Server Component)
├── 头部 (Server Component)
├── 数据展示 (Server Component)
│   └── 数据来自后端 API/数据库
├── 交互按钮 (Client Component) ← 'use client'
│   └── useState, onClick, etc.
└── 表单 (Client Component) ← 'use client'
    └── 表单验证、提交逻辑`}</pre>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">💡 最佳实践</h2>
        <ul className="space-y-2 text-sm list-disc list-inside">
          <li>
            <strong>默认使用服务端组件：</strong>
            只在需要交互或浏览器 API 时使用 &apos;use client&apos;
          </li>
          <li>
            <strong>叶子节点客户端化：</strong>
            尽可能在组件树的叶子节点使用 &apos;use client&apos;
          </li>
          <li>
            <strong>数据在服务端获取：</strong>
            在服务端组件中获取数据，然后通过 props 传递给客户端组件
          </li>
          <li>
            <strong>避免prop drilling：</strong>
            使用 Context 或状态管理库（在客户端组件中）
          </li>
        </ul>
      </div>
    </div>
  );
}

