import Link from 'next/link';

/**
 * Next.js 渲染模式测试主页
 * 
 * 探索 Next.js 的各种渲染模式和策略
 */

export default function RenderingTestPage() {
  const pageRenderTime = new Date().toISOString();
  console.log('[RENDERING TEST PAGE] 页面渲染时间:', pageRenderTime);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← 返回首页
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-6">Next.js 渲染模式测试</h1>

      {/* 说明 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">📚 什么是渲染模式？</h2>
        <p className="text-sm text-gray-700 mb-3">
          Next.js 提供了多种渲染策略，每种都有不同的性能特征和使用场景。
          选择合适的渲染模式可以显著提升应用性能和用户体验。
        </p>
        <div className="bg-white rounded p-4 text-xs">
          <p className="mb-2"><strong>核心概念：</strong></p>
          <ul className="space-y-1 text-gray-700 list-disc list-inside ml-4">
            <li><strong>何时渲染</strong>：构建时 vs 请求时</li>
            <li><strong>在哪渲染</strong>：服务器 vs 客户端</li>
            <li><strong>多久更新</strong>：静态 vs 动态 vs 增量</li>
          </ul>
        </div>
      </div>

      {/* 页面渲染时间 */}
      <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 mb-8">
        <p className="text-sm">
          <strong>📅 当前页面渲染时间：</strong>
          <span className="ml-2 font-mono text-purple-700">{pageRenderTime}</span>
        </p>
        <p className="text-xs text-gray-600 mt-2">
          这个页面使用<strong>静态渲染（SSG）</strong>，在构建时预渲染，所以每次访问看到的时间都是构建时的时间。
        </p>
      </div>

      {/* 测试页面列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* 1. 静态渲染 (SSG) */}
        <Link
          href="/rendering-test/static"
          className="block bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-green-600">
            📄 静态渲染 (SSG)
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            在构建时预渲染，生成静态 HTML
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 构建时生成 HTML</li>
            <li>• 所有请求共享同一份 HTML</li>
            <li>• 最快的渲染模式</li>
            <li>• 适用于内容不常变化的页面</li>
          </ul>
        </Link>

        {/* 2. 动态渲染 (SSR) */}
        <Link
          href="/rendering-test/dynamic"
          className="block bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            🔄 动态渲染 (SSR)
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            每次请求都在服务器渲染
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 每次请求都渲染</li>
            <li>• 内容始终是最新的</li>
            <li>• 可以使用请求特定数据</li>
            <li>• 适用于实时数据、用户相关内容</li>
          </ul>
        </Link>

        {/* 3. ISR */}
        <Link
          href="/rendering-test/isr"
          className="block bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-orange-600">
            🔁 增量静态再生成 (ISR)
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            静态生成 + 定时更新
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 构建时生成静态页面</li>
            <li>• 定时重新验证和更新</li>
            <li>• 兼顾性能和数据新鲜度</li>
            <li>• 适用于定期更新的内容</li>
          </ul>
        </Link>

        {/* 4. Streaming */}
        <Link
          href="/rendering-test/streaming"
          className="block bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-purple-600">
            ⚡ 流式渲染 (Streaming)
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            逐步发送渲染结果，提升 TTFB
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 边渲染边发送</li>
            <li>• 使用 Suspense 分块加载</li>
            <li>• 改善首字节时间 (TTFB)</li>
            <li>• 适用于复杂页面、慢数据源</li>
          </ul>
        </Link>

        {/* 5. 按需重新验证 */}
        <Link
          href="/rendering-test/on-demand"
          className="block bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-pink-600">
            🎯 按需重新验证 (On-Demand)
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            手动触发页面重新生成
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 通过 API 手动触发</li>
            <li>• 使用 revalidatePath/revalidateTag</li>
            <li>• 内容更新时立即生效</li>
            <li>• 适用于 CMS、表单提交后</li>
          </ul>
        </Link>

        {/* 6. PPR (实验性) */}
        <Link
          href="/rendering-test/ppr"
          className="block bg-white border border-yellow-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-yellow-700">
            🧪 部分预渲染 (PPR)
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            静态 + 动态混合渲染 <span className="text-xs bg-yellow-200 px-2 py-0.5 rounded">实验性</span>
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 静态部分在构建时生成</li>
            <li>• 动态部分运行时渲染</li>
            <li>• 最佳性能和数据新鲜度平衡</li>
            <li>• Next.js 15+ 实验性特性</li>
          </ul>
        </Link>

        {/* 7. 客户端渲染 */}
        <Link
          href="/rendering-test/client"
          className="block bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-red-600">
            💻 客户端渲染 (CSR)
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            在浏览器中渲染
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 使用 &apos;use client&apos; 标记</li>
            <li>• 在浏览器执行</li>
            <li>• 可以使用浏览器 API</li>
            <li>• 适用于交互式组件</li>
          </ul>
        </Link>

        {/* 8. 混合渲染 */}
        <Link
          href="/rendering-test/hybrid"
          className="block bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-indigo-600">
            🔀 混合渲染
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            组合多种渲染策略
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 服务端组件 + 客户端组件</li>
            <li>• 静态部分 + 动态部分</li>
            <li>• 灵活组合，最优性能</li>
            <li>• Next.js App Router 的强大之处</li>
          </ul>
        </Link>

        {/* 9. Layout 和 Page 并行渲染 */}
        <Link
          href="/rendering-test/parallel"
          className="block bg-white border border-purple-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-purple-600">
            ⚡ Layout/Page 并行渲染
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            验证并行数据获取
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• Layout 和 Page 同时获取数据</li>
            <li>• 不会相互阻塞</li>
            <li>• 总时间 = max(layout, page)</li>
            <li>• React 18 并发特性</li>
          </ul>
        </Link>

        {/* 10. Cache Components (PPR) */}
        <Link
          href="/rendering-test/cache-components"
          className="block bg-white border border-cyan-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-cyan-600">
            🎯 Cache Components (PPR)
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Partial Prerendering
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 静态 + 缓存 + 动态混合</li>
            <li>• 使用 &apos;use cache&apos; 指令</li>
            <li>• 需要启用 cacheComponents</li>
            <li>• Next.js 16 新特性</li>
          </ul>
        </Link>
      </div>

      {/* 渲染模式对比 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">📊 渲染模式对比</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">模式</th>
                <th className="px-4 py-2 text-left">渲染时机</th>
                <th className="px-4 py-2 text-left">更新频率</th>
                <th className="px-4 py-2 text-left">性能</th>
                <th className="px-4 py-2 text-left">使用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">SSG</td>
                <td className="px-4 py-2">构建时</td>
                <td className="px-4 py-2">不更新</td>
                <td className="px-4 py-2">⭐⭐⭐⭐⭐</td>
                <td className="px-4 py-2">营销页、文档</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-2 font-semibold">SSR</td>
                <td className="px-4 py-2">请求时</td>
                <td className="px-4 py-2">每次请求</td>
                <td className="px-4 py-2">⭐⭐⭐</td>
                <td className="px-4 py-2">用户数据、实时内容</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">ISR</td>
                <td className="px-4 py-2">构建时 + 定时</td>
                <td className="px-4 py-2">N 秒后</td>
                <td className="px-4 py-2">⭐⭐⭐⭐</td>
                <td className="px-4 py-2">博客、电商产品</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-2 font-semibold">Streaming</td>
                <td className="px-4 py-2">请求时（流式）</td>
                <td className="px-4 py-2">每次请求</td>
                <td className="px-4 py-2">⭐⭐⭐⭐</td>
                <td className="px-4 py-2">复杂页面、仪表盘</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">PPR</td>
                <td className="px-4 py-2">构建 + 请求时</td>
                <td className="px-4 py-2">混合</td>
                <td className="px-4 py-2">⭐⭐⭐⭐⭐</td>
                <td className="px-4 py-2">混合内容页面</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-2 font-semibold">CSR</td>
                <td className="px-4 py-2">客户端</td>
                <td className="px-4 py-2">实时</td>
                <td className="px-4 py-2">⭐⭐</td>
                <td className="px-4 py-2">交互组件、客户端状态</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 重要提示 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">💡 重要提示</h2>
        <ul className="space-y-3 text-sm">
          <li>
            <strong>1. 查看构建输出：</strong>
            <div className="ml-4 mt-1 bg-gray-100 rounded p-2">
              <code className="text-xs">pnpm build</code>
            </div>
            <p className="text-xs text-gray-600 ml-4 mt-1">
              构建输出会显示每个页面的渲染类型：
              <br />• ○ (Static) - 静态生成
              <br />• ƒ (Dynamic) - 动态渲染
              <br />• ℇ (Streaming) - 流式渲染
            </p>
          </li>
          <li>
            <strong>2. 生产环境测试：</strong>
            <div className="ml-4 mt-1 bg-gray-100 rounded p-2">
              <code className="text-xs">pnpm build && pnpm start</code>
            </div>
            <p className="text-xs text-gray-600 ml-4 mt-1">
              某些渲染行为只在生产环境中生效，开发环境可能有差异
            </p>
          </li>
          <li>
            <strong>3. 查看页面源代码：</strong>
            <p className="text-xs text-gray-600 ml-4 mt-1">
              右键 → 查看页面源代码，可以看到服务端渲染的 HTML
            </p>
          </li>
          <li>
            <strong>4. 观察终端日志：</strong>
            <p className="text-xs text-gray-600 ml-4 mt-1">
              每个页面都会输出渲染日志，帮助理解渲染时机
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

