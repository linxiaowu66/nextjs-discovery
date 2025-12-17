'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * 客户端状态追踪器
 * 用于观察客户端组件的挂载和状态变化
 */
export function ClientStateTracker() {
  const router = useRouter();
  const [mountTime, setMountTime] = useState<string>('');
  const [visitCount, setVisitCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  // 组件挂载时执行
  useEffect(() => {
    const time = new Date().toISOString();
    setMountTime(time);
    setVisitCount((prev) => prev + 1);

    console.log('[CLIENT COMPONENT] 组件挂载，时间:', time);
    console.log('[CLIENT COMPONENT] 这是第', visitCount + 1, '次挂载');
  }, []); // 空依赖数组，只在挂载时执行

  const handleRefresh = () => {
    console.log('[CLIENT] 调用 router.refresh()');
    router.refresh();
  };

  const handleUpdate = () => {
    setUpdateCount((prev) => prev + 1);
    console.log('[CLIENT] 状态更新，计数:', updateCount + 1);
  };

  return (
    <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
      <h3 className="font-semibold text-blue-800 mb-3">
        💻 客户端组件状态追踪
      </h3>

      <div className="space-y-2 text-sm mb-4">
        <p>
          <strong>客户端挂载时间：</strong>
          <span className="ml-2 font-mono text-blue-700">
            {mountTime || '加载中...'}
          </span>
        </p>
        <p>
          <strong>挂载次数（此次会话）：</strong>
          <span className="ml-2 font-mono text-blue-700">{visitCount}</span>
        </p>
        <p>
          <strong>状态更新次数：</strong>
          <span className="ml-2 font-mono text-blue-700">{updateCount}</span>
        </p>
      </div>

      <div className="bg-white rounded p-3 mb-3">
        <p className="text-xs text-gray-600 mb-2">
          💡 <strong>观察重点：</strong>
        </p>
        <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside ml-2">
          <li>
            <strong>挂载时间：</strong>每次组件挂载都会更新
          </li>
          <li>
            <strong>挂载次数：</strong>每次组件重新挂载都会增加
          </li>
          <li>
            <strong>状态更新次数：</strong>
            只有点击下面的按钮才会增加（不会因为导航而重置）
          </li>
        </ul>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          更新状态（+1）
        </button>
        <button
          onClick={handleRefresh}
          className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600"
        >
          调用 router.refresh()
        </button>
      </div>

      <div className="mt-3 bg-yellow-50 border border-yellow-300 rounded p-2">
        <p className="text-xs text-gray-700">
          <strong>⚠️ 注意：</strong>即使浏览器后退，客户端组件也可能重新挂载。
          这是因为 Router Cache 的 staleTime = 0，组件不会自动保留状态。
        </p>
      </div>
    </div>
  );
}
