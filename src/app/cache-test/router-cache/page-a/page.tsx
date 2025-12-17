import Link from 'next/link';

/**
 * Router Cache 测试 - Page A
 * 用于测试导航和 Router Cache 行为
 */

// 服务端组件 - 显示服务端渲染时间
async function ServerTimestamp() {
  const serverRenderTime = new Date().toISOString();
  console.log('[SERVER] Page A 渲染时间:', serverRenderTime);
  
  return (
    <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-green-800 mb-2">🖥️ Page A - 服务端渲染信息</h3>
      <p className="text-sm">
        <strong>服务端渲染时间：</strong>
        <span className="ml-2 font-mono text-green-700">{serverRenderTime}</span>
      </p>
    </div>
  );
}

export default async function PageA() {
  const pageRenderTime = new Date().toISOString();
  console.log('[SERVER] ========== Page A 页面渲染 ==========');
  console.log('[SERVER] 页面渲染时间:', pageRenderTime);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link
          href="/cache-test/router-cache"
          className="text-blue-600 hover:underline"
        >
          ← 使用 Link 返回 Router Cache 测试页面
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Page A - Router Cache 测试页面</h1>

      {/* 服务端时间戳 */}
      <ServerTimestamp />

      {/* 说明 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">📄 这是 Page A</h2>
        <p className="text-sm text-gray-700 mb-3">
          这是一个简单的测试页面，用于演示 Router Cache 的行为。
        </p>
      </div>

      {/* 导航测试 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 测试导航方式</h2>
        <div className="space-y-4">
          <div>
            <Link
              href="/cache-test/router-cache"
              className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              使用 Link 返回
            </Link>
            <p className="text-xs text-gray-600 mt-2">
              ⚠️ 预期：会发起新的 _rsc 请求，Router Cache 页面的服务端时间会变化
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 rounded p-3">
            <p className="text-sm font-semibold mb-2">🔙 或者使用浏览器后退按钮：</p>
            <p className="text-xs text-gray-600">
              点击浏览器的后退按钮 ← 返回上一页
            </p>
            <p className="text-xs text-gray-600 mt-1">
              ✅ 预期：<strong>不会</strong>发起新的 _rsc 请求，Router Cache 页面会重用之前的 RSC Payload
            </p>
          </div>
        </div>
      </div>

      {/* 观察指南 */}
      <div className="bg-orange-50 border border-orange-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">👀 观察指南</h2>
        <div className="space-y-3 text-sm">
          <div className="bg-white rounded p-3">
            <p className="font-semibold mb-2">📊 使用 Link 返回时：</p>
            <ul className="space-y-1 text-xs text-gray-700 list-disc list-inside ml-4">
              <li>Network 面板会出现新的 <code className="bg-gray-200 px-1 rounded">router-cache?_rsc=xxx</code> 请求</li>
              <li>Router Cache 页面的服务端渲染时间会更新</li>
              <li>终端会打印新的 [SERVER] 日志</li>
            </ul>
          </div>

          <div className="bg-white rounded p-3">
            <p className="font-semibold mb-2">🔙 使用浏览器后退时：</p>
            <ul className="space-y-1 text-xs text-gray-700 list-disc list-inside ml-4">
              <li>Network 面板<strong>不会</strong>出现新的 _rsc 请求</li>
              <li>Router Cache 页面的服务端渲染时间<strong>保持不变</strong></li>
              <li>终端<strong>不会</strong>打印新的 [SERVER] 日志</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-300 rounded p-3">
            <p className="text-xs text-blue-800">
              <strong>💡 核心区别：</strong>Link 导航会重新请求 RSC（因为 staleTime = 0），
              而浏览器后退/前进会重用已有的 RSC Payload（这就是 "reused" 的含义）。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
