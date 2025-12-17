import { headers } from 'next/headers';
import Link from 'next/link';

/**
 * 动态路由示例
 * 使用了 headers() 这个 dynamic function，所以不会使用 Full Route Cache
 */

export default async function DynamicRoutePage() {
  // 使用 dynamic function - 会让整个路由变成动态的
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || 'Unknown';
  
  // 每次请求的渲染时间
  const renderTime = new Date().toISOString();
  
  console.log('[FULL ROUTE CACHE - DYNAMIC] 页面渲染时间:', renderTime);
  console.log('[FULL ROUTE CACHE - DYNAMIC] User-Agent:', userAgent);
  console.log('[FULL ROUTE CACHE - DYNAMIC] 这个页面是动态渲染的，每次请求都会重新渲染');

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/cache-test/full-route-cache" className="text-blue-600 hover:underline">
          ← 返回静态路由示例
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">动态路由示例（不使用 Full Route Cache）</h1>

      {/* 说明 */}
      <div className="bg-orange-50 border border-orange-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-orange-700">
          🔄 这是一个动态路由
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          因为使用了 <code className="bg-orange-200 px-1 rounded">headers()</code> 这个 dynamic function，
          Next.js 无法在构建时预渲染这个页面，每次请求都会在服务器上重新渲染。
        </p>
        <div className="bg-white rounded p-4 text-xs font-mono">
          <p className="text-gray-600 mb-2">// 使用了 dynamic function</p>
          <p className="text-blue-600">const headersList = await headers();</p>
          <p className="text-blue-600">const userAgent = headersList.get('user-agent');</p>
        </div>
      </div>

      {/* 渲染时间 */}
      <div className="bg-orange-50 border border-orange-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-orange-700">
          📅 页面渲染时间
        </h2>
        <p className="text-2xl font-mono text-orange-700 mb-4">
          {renderTime}
        </p>
        <div className="bg-white rounded p-4 text-sm">
          <p className="mb-3"><strong>🧪 测试方法：</strong></p>
          <ol className="space-y-2 text-xs text-gray-700 list-decimal list-inside">
            <li>
              <strong>开发环境（pnpm dev）：</strong>
              <br />
              每次刷新页面，这个时间都会变化
            </li>
            <li>
              <strong>生产环境（pnpm build && pnpm start）：</strong>
              <br />
              刷新页面，这个时间<strong>也会变化</strong>（因为是动态路由，每次都重新渲染）
            </li>
          </ol>
        </div>
      </div>

      {/* 请求头信息 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">📋 请求头信息</h2>
        <div className="bg-gray-50 rounded p-4">
          <p className="text-sm mb-2"><strong>User-Agent:</strong></p>
          <p className="text-xs font-mono text-gray-700 break-all">
            {userAgent}
          </p>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          这个信息来自请求头，每次请求可能不同。静态路由无法获取这种动态信息。
        </p>
      </div>

      {/* 对比 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">📊 静态 vs 动态对比</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">特性</th>
                <th className="px-4 py-2 text-left">静态路由 (Static)</th>
                <th className="px-4 py-2 text-left">动态路由 (Dynamic)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">渲染时机</td>
                <td className="px-4 py-2 text-green-600">构建时（pnpm build）</td>
                <td className="px-4 py-2 text-orange-600">运行时（每次请求）</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-2 font-semibold">Full Route Cache</td>
                <td className="px-4 py-2 text-green-600">✅ 使用</td>
                <td className="px-4 py-2 text-orange-600">❌ 不使用</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">刷新页面</td>
                <td className="px-4 py-2 text-green-600">时间戳不变</td>
                <td className="px-4 py-2 text-orange-600">时间戳变化</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-2 font-semibold">构建输出</td>
                <td className="px-4 py-2 text-green-600">○ (Static)</td>
                <td className="px-4 py-2 text-orange-600">λ (Dynamic)</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">生成文件</td>
                <td className="px-4 py-2 text-green-600">.html 文件</td>
                <td className="px-4 py-2 text-orange-600">只有 .js 文件</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-2 font-semibold">性能</td>
                <td className="px-4 py-2 text-green-600">⚡ 最快</td>
                <td className="px-4 py-2 text-orange-600">🔄 较慢</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">使用场景</td>
                <td className="px-4 py-2">博客、文档、产品页</td>
                <td className="px-4 py-2">用户仪表盘、个性化内容</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 何时使用动态路由 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">💡 何时使用动态路由？</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <div>
              <strong>个性化内容：</strong>
              <p className="text-xs text-gray-600">基于用户 cookies 或 headers 的内容</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <div>
              <strong>实时数据：</strong>
              <p className="text-xs text-gray-600">需要每次请求都获取最新数据</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <div>
              <strong>URL 查询参数：</strong>
              <p className="text-xs text-gray-600">基于 searchParams 的内容</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <div>
              <strong>用户特定数据：</strong>
              <p className="text-xs text-gray-600">用户仪表盘、购物车、订单等</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

