'use client';

import { useState, useEffect } from 'react';

export function HybridClientComponent() {
  const [mountTime, setMountTime] = useState<string>('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    setMountTime(new Date().toISOString());
    console.log('[HYBRID] 客户端组件挂载');
  }, []);

  return (
    <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-3 text-blue-800">
        💻 客户端组件
      </h2>
      <p className="text-sm text-gray-700 mb-3">
        这部分在浏览器渲染，可以使用 React hooks 和交互功能。
      </p>
      <div className="bg-white rounded p-4 mb-4">
        <p className="text-sm mb-2">
          <strong>客户端挂载时间：</strong>
          <span className="ml-2 font-mono text-blue-700">{mountTime || '加载中...'}</span>
        </p>
        <p className="text-xs text-blue-600">
          ✅ 这个时间在每次页面加载时都会更新
        </p>
      </div>
      <div className="bg-white rounded p-4">
        <div className="flex items-center gap-4">
          <p className="text-2xl font-bold">{count}</p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
        <p className="text-xs text-gray-600 mt-2">
          ✅ 交互功能只在客户端组件中可用
        </p>
      </div>
    </div>
  );
}

