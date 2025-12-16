'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * 客户端组件 - 测试环境变量
 * 只能访问 NEXT_PUBLIC_ 开头的环境变量
 */
export default function ClientEnvTestPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 客户端尝试访问环境变量
    const clientEnvs = {
      // ❌ 客户端无法访问服务端专用环境变量（会是 undefined）
      DATABASE_URL: process.env.DATABASE_URL,
      API_SECRET_KEY: process.env.API_SECRET_KEY,
      
      // ✅ 客户端可以访问公共环境变量
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
      NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
      
      // Node.js 环境变量（客户端无法访问）
      NODE_ENV: process.env.NODE_ENV,
    };

    console.log('[CLIENT] Environment variables:', clientEnvs);
    console.log('[CLIENT] typeof window:', typeof window);
  }, []);

  // 客户端可以访问的环境变量
  const publicEnvs = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  };

  // 客户端无法访问的环境变量（会是 undefined）
  const privateEnvs = {
    DATABASE_URL: process.env.DATABASE_URL,
    API_SECRET_KEY: process.env.API_SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV,
  };

  if (!mounted) {
    return <div className="max-w-6xl mx-auto p-8">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link
          href="/env-test"
          className="text-blue-600 hover:underline"
        >
          ← 返回服务端测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">客户端环境变量测试</h1>

      {/* 说明 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">💻 客户端组件说明</h2>
        <ul className="space-y-2 text-sm">
          <li>• 这是一个客户端组件（有 'use client' 指令）</li>
          <li>• 只能访问 NEXT_PUBLIC_ 开头的环境变量</li>
          <li>• 服务端环境变量在客户端会是 undefined</li>
          <li>• 打开浏览器控制台（F12）查看日志</li>
        </ul>
      </div>

      {/* 可以访问的环境变量 */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-green-800">
          ✅ 客户端可以访问的环境变量
        </h2>
        <div className="space-y-3 text-sm font-mono">
          {Object.entries(publicEnvs).map(([key, value]) => (
            <div key={key} className="bg-white rounded p-3">
              <strong className="text-green-700">{key}:</strong>
              <p className="text-gray-600 break-all mt-1">
                {value || '未配置'}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-green-700 mt-4">
          ✅ 这些变量在构建时被内联到 JavaScript bundle 中
        </p>
      </div>

      {/* 无法访问的环境变量 */}
      <div className="bg-red-50 border border-red-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-red-800">
          ❌ 客户端无法访问的环境变量
        </h2>
        <div className="space-y-3 text-sm font-mono">
          {Object.entries(privateEnvs).map(([key, value]) => (
            <div key={key} className="bg-white rounded p-3">
              <strong className="text-red-700">{key}:</strong>
              <p className="text-gray-400 break-all mt-1">
                {value === undefined ? 'undefined（无法访问）' : value}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-red-700 mt-4">
          ❌ 这些变量只在服务端可用，客户端访问会返回 undefined
        </p>
      </div>

      {/* 实际测试 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 实际测试</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">测试 1：检查环境变量类型</h3>
            <div className="bg-gray-100 p-3 rounded text-sm font-mono">
              <p>typeof process.env.NEXT_PUBLIC_API_URL: {typeof process.env.NEXT_PUBLIC_API_URL}</p>
              <p>typeof process.env.DATABASE_URL: {typeof process.env.DATABASE_URL}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">测试 2：查看构建时内联的值</h3>
            <div className="bg-gray-100 p-3 rounded text-sm">
              <p>打开浏览器控制台，查看 Sources 标签，搜索 NEXT_PUBLIC_API_URL</p>
              <p className="text-xs text-gray-600 mt-2">
                你会看到这个值被直接写入了 JavaScript 文件中
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">测试 3：使用环境变量</h3>
            <button
              onClick={() => {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
                alert(`API URL: ${apiUrl}`);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              显示 API URL
            </button>
          </div>
        </div>
      </div>

      {/* 安全警告 */}
      <div className="bg-orange-50 border border-orange-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-orange-800">
          🔒 安全警告
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>永远不要在 NEXT_PUBLIC_ 变量中存储敏感信息！</strong>
            <br />
            <span className="text-xs text-gray-600">
              这些值会被内联到客户端 JavaScript 中，任何人都可以查看
            </span>
          </li>
          <li>
            <strong>敏感信息应该：</strong>
            <br />
            <span className="text-xs text-gray-600">
              • 只在服务端使用（API 路由、Server Components）<br />
              • 不使用 NEXT_PUBLIC_ 前缀<br />
              • 存储在 .env.local 中且不提交到 Git
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

