'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

/**
 * Client-Side Rendering (CSR - 客户端渲染)
 * 
 * 使用 'use client' 标记的组件在浏览器中渲染
 */

export default function ClientRenderingPage() {
  const [mountTime, setMountTime] = useState<string>('');
  const [count, setCount] = useState(0);
  const [data, setData] = useState<string>('');

  useEffect(() => {
    // 只在客户端执行
    setMountTime(new Date().toISOString());
    console.log('[CSR] 组件在客户端挂载');
    
    // 模拟客户端数据获取
    setTimeout(() => {
      setData('客户端获取的数据');
    }, 1000);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/rendering-test" className="text-blue-600 hover:underline">
          ← 返回渲染测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">客户端渲染 (CSR)</h1>

      <div className="bg-red-50 border border-red-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-red-800">
          💻 什么是客户端渲染？
        </h2>
        <p className="text-sm text-gray-700">
          使用 <code>&apos;use client&apos;</code> 标记的组件在<strong>浏览器</strong>中渲染，
          可以使用 React hooks、浏览器 API、事件处理等客户端特性。
        </p>
      </div>

      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">📊 客户端数据</h2>
        <div className="space-y-3 text-sm">
          <div className="bg-red-50 rounded p-3">
            <p className="text-gray-600 mb-1">组件挂载时间：</p>
            <p className="font-mono text-red-700">{mountTime || '加载中...'}</p>
          </div>
          <div className="bg-blue-50 rounded p-3">
            <p className="text-gray-600 mb-1">客户端数据：</p>
            <p className="font-mono text-blue-700">{data || '加载中...'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🎮 交互示例</h2>
        <div className="flex items-center gap-4">
          <p className="text-2xl font-bold">{count}</p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            增加
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            重置
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          ✅ 这种交互只能在客户端组件中实现
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">⚖️ 何时使用 CSR？</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-green-700 mb-2">✅ 适合</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>交互式组件（表单、按钮）</li>
              <li>使用 React hooks</li>
              <li>浏览器 API（localStorage、window）</li>
              <li>实时更新（WebSocket）</li>
            </ul>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-red-700 mb-2">❌ 不适合</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>SEO 关键内容</li>
              <li>初始数据获取</li>
              <li>静态内容</li>
              <li>需要快速 FCP 的页面</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

