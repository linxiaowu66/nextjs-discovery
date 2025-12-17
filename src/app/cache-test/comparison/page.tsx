import Link from 'next/link';

/**
 * 缓存机制对比页面
 * 展示所有缓存类型的对比和总结
 */

export default function CacheComparisonPage() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/cache-test" className="text-blue-600 hover:underline">
          ← 返回缓存测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Next.js 缓存机制完整对比</h1>

      {/* 概览 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-300 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">📊 四种缓存机制概览</h2>
        <p className="text-sm text-gray-700 mb-4">
          Next.js 使用四种不同的缓存机制来优化性能，每种缓存都有不同的作用范围和生命周期。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { name: 'Request Memoization', icon: '🔄', scope: '单次渲染', color: 'green' },
            { name: 'Data Cache', icon: '📦', scope: '跨请求持久化', color: 'blue' },
            { name: 'Full Route Cache', icon: '🗺️', scope: '构建时+运行时', color: 'purple' },
            { name: 'Router Cache', icon: '🧭', scope: '客户端会话', color: 'orange' },
          ].map((cache) => (
            <div key={cache.name} className={`bg-${cache.color}-50 rounded-lg p-4 text-center`}>
              <div className="text-3xl mb-2">{cache.icon}</div>
              <h3 className="font-semibold text-sm mb-1">{cache.name}</h3>
              <p className="text-xs text-gray-600">{cache.scope}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 详细对比表 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">📋 详细对比表</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">特性</th>
              <th className="px-4 py-3 text-left font-semibold">Request Memoization</th>
              <th className="px-4 py-3 text-left font-semibold">Data Cache</th>
              <th className="px-4 py-3 text-left font-semibold">Full Route Cache</th>
              <th className="px-4 py-3 text-left font-semibold">Router Cache</th>
            </tr>
          </thead>
          <tbody>
            {/* 存储位置 */}
            <tr className="border-t">
              <td className="px-4 py-3 font-semibold bg-gray-50">存储位置</td>
              <td className="px-4 py-3">服务端内存</td>
              <td className="px-4 py-3">服务端文件系统</td>
              <td className="px-4 py-3">服务端文件系统</td>
              <td className="px-4 py-3">客户端内存</td>
            </tr>

            {/* 生命周期 */}
            <tr className="border-t bg-gray-50">
              <td className="px-4 py-3 font-semibold">生命周期</td>
              <td className="px-4 py-3">单次渲染周期</td>
              <td className="px-4 py-3">持久化（直到重新验证）</td>
              <td className="px-4 py-3">持久化（直到重新构建）</td>
              <td className="px-4 py-3">30秒或用户会话</td>
            </tr>

            {/* 作用范围 */}
            <tr className="border-t">
              <td className="px-4 py-3 font-semibold bg-gray-50">作用范围</td>
              <td className="px-4 py-3">同一渲染中的重复请求</td>
              <td className="px-4 py-3">所有 fetch 请求</td>
              <td className="px-4 py-3">整个路由/页面</td>
              <td className="px-4 py-3">客户端导航的路由</td>
            </tr>

            {/* 何时生效 */}
            <tr className="border-t bg-gray-50">
              <td className="px-4 py-3 font-semibold">何时生效</td>
              <td className="px-4 py-3">自动（React 内置）</td>
              <td className="px-4 py-3">默认所有 fetch</td>
              <td className="px-4 py-3">静态路由（自动）</td>
              <td className="px-4 py-3">客户端导航（自动）</td>
            </tr>

            {/* 如何禁用 */}
            <tr className="border-t">
              <td className="px-4 py-3 font-semibold bg-gray-50">如何禁用</td>
              <td className="px-4 py-3">❌ 无法禁用</td>
              <td className="px-4 py-3">{`cache: 'no-store'`}</td>
              <td className="px-4 py-3">{`dynamic = 'force-dynamic'`}</td>
              <td className="px-4 py-3">router.refresh()</td>
            </tr>

            {/* 刷新页面 */}
            <tr className="border-t bg-gray-50">
              <td className="px-4 py-3 font-semibold">刷新页面</td>
              <td className="px-4 py-3">重置（新渲染周期）</td>
              <td className="px-4 py-3">保持（使用缓存）</td>
              <td className="px-4 py-3">保持（使用缓存）</td>
              <td className="px-4 py-3">清空</td>
            </tr>

            {/* 重启服务器 */}
            <tr className="border-t">
              <td className="px-4 py-3 font-semibold bg-gray-50">重启服务器</td>
              <td className="px-4 py-3">N/A</td>
              <td className="px-4 py-3">保持（持久化）</td>
              <td className="px-4 py-3">保持（持久化）</td>
              <td className="px-4 py-3">N/A（客户端）</td>
            </tr>

            {/* 性能优势 */}
            <tr className="border-t bg-gray-50">
              <td className="px-4 py-3 font-semibold">性能优势</td>
              <td className="px-4 py-3">减少重复请求</td>
              <td className="px-4 py-3">减少 API 调用</td>
              <td className="px-4 py-3">减少服务端渲染</td>
              <td className="px-4 py-3">加快客户端导航</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 缓存层级图 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🏗️ 缓存层级结构</h2>
        <div className="bg-white rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
              <div className="flex-1">
                <h3 className="font-semibold">Router Cache（客户端）</h3>
                <p className="text-xs text-gray-600">客户端导航时首先检查</p>
              </div>
            </div>
            
            <div className="ml-12 border-l-2 border-gray-300 pl-4 space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
                <div className="flex-1">
                  <h3 className="font-semibold">Full Route Cache（服务端）</h3>
                  <p className="text-xs text-gray-600">如果未命中客户端缓存，检查服务端预渲染的路由</p>
                </div>
              </div>
              
              <div className="ml-12 border-l-2 border-gray-300 pl-4 space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Data Cache（服务端）</h3>
                    <p className="text-xs text-gray-600">如果需要渲染，检查 fetch 请求的缓存</p>
                  </div>
                </div>
                
                <div className="ml-12 border-l-2 border-gray-300 pl-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">4</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Request Memoization（服务端）</h3>
                      <p className="text-xs text-gray-600">同一渲染周期内去重重复请求</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 使用场景 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">💡 使用场景和最佳实践</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Request Memoization */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-green-700">🔄 Request Memoization</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold mb-1">✅ 适用场景：</p>
                <ul className="text-xs text-gray-700 list-disc list-inside ml-2">
                  <li>多个组件需要同一份数据</li>
                  <li>父子组件共享数据</li>
                  <li>并行渲染的组件</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-1">💡 最佳实践：</p>
                <ul className="text-xs text-gray-700 list-disc list-inside ml-2">
                  <li>不需要手动传递数据</li>
                  <li>每个组件独立请求</li>
                  <li>自动去重，无需担心</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Cache */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-blue-700">📦 Data Cache</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold mb-1">✅ 适用场景：</p>
                <ul className="text-xs text-gray-700 list-disc list-inside ml-2">
                  <li>静态内容（博客、文档）</li>
                  <li>定期更新的内容</li>
                  <li>第三方 API 数据</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-1">💡 最佳实践：</p>
                <ul className="text-xs text-gray-700 list-disc list-inside ml-2">
                  <li>使用 revalidate 定期更新</li>
                  <li>实时数据用 no-store</li>
                  <li>用户相关数据禁用缓存</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Full Route Cache */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-purple-700">🗺️ Full Route Cache</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold mb-1">✅ 适用场景：</p>
                <ul className="text-xs text-gray-700 list-disc list-inside ml-2">
                  <li>静态页面（营销页面）</li>
                  <li>博客文章、文档</li>
                  <li>产品列表页</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-1">💡 最佳实践：</p>
                <ul className="text-xs text-gray-700 list-disc list-inside ml-2">
                  <li>尽量让页面变成静态的</li>
                  <li>避免不必要的 dynamic functions</li>
                  <li>使用 ISR 定期更新</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Router Cache */}
          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-orange-700">🧭 Router Cache</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold mb-1">✅ 适用场景：</p>
                <ul className="text-xs text-gray-700 list-disc list-inside ml-2">
                  <li>频繁前后导航的页面</li>
                  <li>多页面应用</li>
                  <li>需要快速返回的场景</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-1">💡 最佳实践：</p>
                <ul className="text-xs text-gray-700 list-disc list-inside ml-2">
                  <li>使用 Link 组件自动预取</li>
                  <li>需要时用 router.refresh()</li>
                  <li>理解 30 秒缓存时长</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 常见问题 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">❓ 常见问题</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Q1: 为什么我的页面没有被缓存？</h3>
            <p className="text-sm text-gray-700">
              检查是否使用了 dynamic functions（cookies(), headers(), searchParams）或 
              {` cache: 'no-store'`}。这些会让页面变成动态渲染。
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Q2: 如何查看哪些路由是静态的？</h3>
            <p className="text-sm text-gray-700 mb-2">
              运行 <code className="bg-gray-200 px-1 rounded">pnpm build</code> 查看输出：
            </p>
            <div className="bg-white rounded p-2 text-xs font-mono">
              <p className="text-green-600">○ /static-page   ← 静态</p>
              <p className="text-orange-600">λ /dynamic-page  ← 动态</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Q3: 如何清除所有缓存？</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>• <strong>开发环境：</strong>删除 .next 目录并重启</p>
              <p>• <strong>生产环境：</strong>重新构建和部署</p>
              <p>• <strong>客户端：</strong>刷新浏览器或 router.refresh()</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Q4: 开发环境和生产环境的缓存行为一样吗？</h3>
            <p className="text-sm text-gray-700">
              不完全一样。Full Route Cache 只在生产环境完全生效。
              开发环境为了更好的开发体验，某些缓存行为会被修改。
            </p>
          </div>
        </div>
      </div>

      {/* 调试技巧 */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-green-300 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">🔧 调试技巧</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">1. 查看构建输出</h3>
            <div className="bg-gray-100 rounded p-2 text-xs font-mono mb-2">
              pnpm build
            </div>
            <p className="text-xs text-gray-600">
              查看哪些路由是静态的（○）、哪些是动态的（λ）
            </p>
          </div>

          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">2. 查看 .next 目录</h3>
            <div className="bg-gray-100 rounded p-2 text-xs font-mono mb-2">
              ls -la .next/server/app/
            </div>
            <p className="text-xs text-gray-600">
              静态页面会有 .html 文件，动态页面只有 .js
            </p>
          </div>

          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">3. 使用时间戳</h3>
            <p className="text-xs text-gray-600">
              在页面上显示渲染时间，刷新页面观察时间是否变化
            </p>
          </div>

          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">4. 查看日志</h3>
            <p className="text-xs text-gray-600">
              在服务端代码中添加 console.log，查看执行次数
            </p>
          </div>

          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">5. 网络面板</h3>
            <p className="text-xs text-gray-600">
              打开浏览器开发者工具，查看网络请求的数量和时间
            </p>
          </div>

          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">6. React DevTools</h3>
            <p className="text-xs text-gray-600">
              查看组件的重新渲染情况
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

