import Link from 'next/link';

/**
 * Full Route Cache 测试页面
 * 
 * 这是一个静态页面（没有使用 dynamic functions）
 * 在 pnpm build 时会被预渲染并缓存
 */

export default async function FullRouteCachePage() {
  // 服务端渲染时间
  const buildTime = new Date().toISOString();
  
  console.log('[FULL ROUTE CACHE - STATIC] 页面渲染时间:', buildTime);
  console.log('[FULL ROUTE CACHE - STATIC] 这个页面在构建时被预渲染');

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/cache-test" className="text-blue-600 hover:underline">
          ← 返回缓存测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Full Route Cache（全路由缓存）测试</h1>

      {/* 说明 */}
      <div className="bg-purple-50 border border-purple-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">🗺️ 什么是 Full Route Cache？</h2>
        <p className="text-sm text-gray-700 mb-3">
          Full Route Cache 是 Next.js 在<strong>构建时</strong>自动渲染并缓存整个路由的机制。
          这是一种优化，允许服务器为每个请求提供缓存的路由，而不是在服务器上重新渲染。
        </p>
        <div className="bg-white rounded p-4 text-xs">
          <p className="mb-2"><strong>官方说明：</strong></p>
          <p className="text-gray-700 italic">
            "Next.js automatically renders and caches routes at build time. 
            This is an optimization that allows you to serve the cached route 
            instead of rendering on the server for every request, resulting in faster page loads."
          </p>
        </div>
      </div>

      {/* 当前页面渲染时间 */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-green-700">
          📅 当前页面渲染时间
        </h2>
        <p className="text-2xl font-mono text-green-700 mb-4">
          {buildTime}
        </p>
        <div className="bg-white rounded p-4 text-sm">
          <p className="mb-3"><strong>🧪 测试方法：</strong></p>
          <ol className="space-y-2 text-xs text-gray-700 list-decimal list-inside">
            <li>
              <strong>开发环境（pnpm dev）：</strong>
              <br />
              每次刷新页面，这个时间都会变化（因为开发环境每次都重新渲染）
            </li>
            <li>
              <strong>生产环境（pnpm build && pnpm start）：</strong>
              <br />
              刷新页面，这个时间<strong>保持不变</strong>（使用了 Full Route Cache）
              <br />
              这个时间就是构建时的时间（运行 pnpm build 的时间）
            </li>
            <li>
              <strong>重启服务器：</strong>
              <br />
              即使停止并重新运行 pnpm start，这个时间仍然不变（缓存持久化）
            </li>
          </ol>
        </div>
      </div>

      {/* 静态 vs 动态路由 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🔍 静态路由 vs 动态路由</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* 静态路由 */}
          <div className="bg-green-50 rounded p-4">
            <h3 className="font-semibold mb-2 text-green-700">✅ 静态路由（当前页面）</h3>
            <p className="text-xs text-gray-700 mb-3">
              在构建时预渲染并缓存，运行时直接返回缓存的 HTML
            </p>
            <div className="bg-white rounded p-2 text-xs font-mono mb-2">
              <p>export default function Page() {`{`}</p>
              <p className="ml-2">// 没有 dynamic functions</p>
              <p className="ml-2">return &lt;div&gt;Static&lt;/div&gt;</p>
              <p>{`}`}</p>
            </div>
            <p className="text-xs text-green-600">
              <strong>构建输出：</strong> ○ (Static)
            </p>
          </div>

          {/* 动态路由 */}
          <div className="bg-orange-50 rounded p-4">
            <h3 className="font-semibold mb-2 text-orange-700">🔄 动态路由</h3>
            <p className="text-xs text-gray-700 mb-3">
              每次请求时在服务器上渲染，不使用 Full Route Cache
            </p>
            <div className="bg-white rounded p-2 text-xs font-mono mb-2">
              <p>export default function Page() {`{`}</p>
              <p className="ml-2">// 使用了 dynamic functions</p>
              <p className="ml-2">const headers = headers();</p>
              <p className="ml-2">return &lt;div&gt;Dynamic&lt;/div&gt;</p>
              <p>{`}`}</p>
            </div>
            <p className="text-xs text-orange-600">
              <strong>构建输出：</strong> λ (Dynamic)
            </p>
          </div>
        </div>

        <Link
          href="/cache-test/full-route-cache/dynamic"
          className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          查看动态路由示例 →
        </Link>
      </div>

      {/* Dynamic Functions */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">⚠️ 什么会让路由变成动态的？</h2>
        <p className="text-sm text-gray-700 mb-3">
          使用以下任何一个功能会让路由变成动态渲染（不使用 Full Route Cache）：
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-white rounded p-3">
            <code className="text-blue-600">cookies()</code>
            <p className="text-gray-600 mt-1">读取 cookies</p>
          </div>
          <div className="bg-white rounded p-3">
            <code className="text-blue-600">headers()</code>
            <p className="text-gray-600 mt-1">读取请求头</p>
          </div>
          <div className="bg-white rounded p-3">
            <code className="text-blue-600">searchParams</code>
            <p className="text-gray-600 mt-1">使用 URL 查询参数</p>
          </div>
          <div className="bg-white rounded p-3">
            <code className="text-blue-600">{`fetch(..., { cache: 'no-store' })`}</code>
            <p className="text-gray-600 mt-1">禁用数据缓存</p>
          </div>
          <div className="bg-white rounded p-3">
            <code className="text-blue-600">{`export const dynamic = 'force-dynamic'`}</code>
            <p className="text-gray-600 mt-1">强制动态渲染</p>
          </div>
          <div className="bg-white rounded p-3">
            <code className="text-blue-600">{`export const revalidate = 0`}</code>
            <p className="text-gray-600 mt-1">禁用缓存</p>
          </div>
        </div>
      </div>

      {/* 如何验证 Full Route Cache */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 如何验证 Full Route Cache？</h2>
        
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">方法 1：查看构建输出</h3>
            <div className="bg-white rounded p-3 font-mono text-xs mb-2">
              <p className="mb-1">$ pnpm build</p>
              <p className="text-gray-600">Route (app) Size First Load JS</p>
              <p className="text-green-600">○ /cache-test/full-route-cache   ← 静态</p>
              <p className="text-orange-600">λ /cache-test/full-route-cache/dynamic   ← 动态</p>
            </div>
            <p className="text-xs text-gray-600">
              ○ = Static（静态，使用 Full Route Cache）
              <br />
              λ = Dynamic（动态，不使用 Full Route Cache）
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">方法 2：查看 .next 目录</h3>
            <div className="bg-white rounded p-3 font-mono text-xs mb-2">
              <p>.next/server/app/cache-test/full-route-cache/</p>
              <p className="ml-4 text-green-600">page.html  ← 预渲染的 HTML 文件</p>
              <p className="ml-4 text-green-600">page_client-reference-manifest.js</p>
            </div>
            <p className="text-xs text-gray-600">
              静态页面会生成 .html 文件，动态页面只有 .js 文件
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">方法 3：对比时间戳</h3>
            <div className="bg-white rounded p-3 text-xs">
              <p className="mb-2"><strong>开发环境：</strong></p>
              <p className="text-gray-600 ml-4 mb-3">pnpm dev → 刷新页面 → 时间变化 ❌</p>
              
              <p className="mb-2"><strong>生产环境：</strong></p>
              <p className="text-gray-600 ml-4">pnpm build && pnpm start → 刷新页面 → 时间不变 ✅</p>
            </div>
          </div>
        </div>
      </div>

      {/* 性能优势 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🚀 Full Route Cache 的性能优势</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✅</span>
            <div>
              <strong>更快的页面加载：</strong>
              <p className="text-xs text-gray-600">直接返回预渲染的 HTML，无需在服务器上重新渲染</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✅</span>
            <div>
              <strong>减少服务器负载：</strong>
              <p className="text-xs text-gray-600">不需要为每个请求执行 React 渲染</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✅</span>
            <div>
              <strong>更好的缓存策略：</strong>
              <p className="text-xs text-gray-600">可以配合 CDN 进一步加速</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✅</span>
            <div>
              <strong>降低成本：</strong>
              <p className="text-xs text-gray-600">减少服务器计算资源消耗</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

