'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

/**
 * 验证 React Hooks 在服务端渲染（SSR）和客户端渲染（CSR）中的执行时机
 */
export default function ClientComponentWithHooks() {
  const [hydrated, setHydrated] = useState(false);

  // 1. useState - 初始化函数在服务端执行
  const [count, setCount] = useState(() => {
    const env = typeof window === 'undefined' ? 'SERVER' : 'CLIENT';
    console.log(`[${env}] useState 初始化函数执行`);
    return 0;
  });

  // 2. useMemo - 计算函数在服务端执行
  const doubledCount = useMemo(() => {
    const env = typeof window === 'undefined' ? 'SERVER' : 'CLIENT';
    console.log(`[${env}] useMemo 计算函数执行`);
    return count * 2;
  }, [count]);

  // 3. useCallback - 函数在服务端创建，但调用时才执行
  const handleIncrement = useCallback(() => {
    const env = typeof window === 'undefined' ? 'SERVER' : 'CLIENT';
    console.log(`[${env}] useCallback 创建的函数被调用`);
    setCount((prev) => prev + 1);
  }, []);

  // 验证 useCallback 在服务端创建
  console.log(
    `[${
      typeof window === 'undefined' ? 'SERVER' : 'CLIENT'
    }] useCallback 创建了函数`
  );

  // 4. useEffect - 只在客户端执行
  useEffect(() => {
    console.log('[CLIENT ONLY] useEffect 执行 - 只在客户端出现');
    setHydrated(true);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">React Hooks 执行时机验证</h1>
        <p className="text-sm text-gray-700 mb-2">
          当前状态: {hydrated ? '✅ 已 Hydration' : '⏳ 渲染中...'}
        </p>
        <p className="text-sm text-gray-700">
          这是一个客户端组件（有 'use
          client'），会先在服务端渲染（SSR），然后在客户端 Hydration
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
        <h2 className="font-semibold mb-3">📝 查看验证日志</h2>
        <ol className="text-sm space-y-2 list-decimal list-inside">
          <li>
            <strong>终端</strong>（运行 pnpm dev 的窗口）查看服务端日志，会显示{' '}
            <code className="bg-yellow-200 px-1 rounded">[SERVER]</code>
          </li>
          <li>
            <strong>浏览器控制台</strong>（F12）查看客户端日志，会显示{' '}
            <code className="bg-yellow-200 px-1 rounded">[CLIENT]</code> 和{' '}
            <code className="bg-yellow-200 px-1 rounded">[CLIENT ONLY]</code>
          </li>
          <li>刷新页面，对比两个地方的日志输出</li>
        </ol>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-green-50 border border-green-300 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3 text-green-800">
            ✅ 服务端会执行
          </h2>
          <ul className="text-sm space-y-2">
            <li>• useState（初始化函数）</li>
            <li>• useReducer（初始化函数）</li>
            <li>• useMemo（计算函数）</li>
            <li>• useCallback（创建函数引用）</li>
            <li>• useContext</li>
            <li>• useRef</li>
          </ul>
          <p className="text-xs text-red-600 mt-3">
            ⚠️ 不能直接访问 window、document 等浏览器 API
          </p>
          <p className="text-xs text-gray-600 mt-2">
            💡 useCallback 创建的函数只有在调用时才会执行内部代码
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-300 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3 text-blue-800">
            🔵 只在客户端执行
          </h2>
          <ul className="text-sm space-y-2">
            <li>• useEffect（回调函数）</li>
            <li>• useLayoutEffect（回调函数）</li>
          </ul>
          <p className="text-xs text-green-600 mt-3">
            ✅ 可以安全访问浏览器 API
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h2 className="font-semibold mb-4">测试按钮</h2>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleIncrement}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            useCallback 增加 ({count})
          </button>
          <div className="px-6 py-3 bg-gray-100 rounded-lg flex items-center">
            useMemo 计算结果: {doubledCount}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          点击按钮，useCallback 创建的函数会在客户端执行，查看控制台日志
        </p>
      </div>
    </div>
  );
}
