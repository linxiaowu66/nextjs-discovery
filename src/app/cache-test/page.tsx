import Link from 'next/link';

/**
 * 缓存测试主页
 * Next.js 的四种缓存机制
 */
export default function CacheTestPage() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Next.js 缓存机制测试</h1>

      {/* 介绍 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">
          🔍 Next.js 的四种缓存机制
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">1️⃣ Request Memoization</h3>
            <p className="text-gray-600 mb-2">
              请求记忆化 - 在一次渲染过程中自动去重相同的请求
            </p>
            <p className="text-xs text-gray-500">
              生命周期：单次请求的渲染周期
            </p>
          </div>

          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">2️⃣ Data Cache</h3>
            <p className="text-gray-600 mb-2">
              数据缓存 - 持久化存储 fetch 请求的结果
            </p>
            <p className="text-xs text-gray-500">
              生命周期：跨请求和部署持久化
            </p>
          </div>

          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">3️⃣ Full Route Cache</h3>
            <p className="text-gray-600 mb-2">
              全路由缓存 - 在构建时渲染并缓存整个路由
            </p>
            <p className="text-xs text-gray-500">
              生命周期：持久化，直到重新构建或重新验证
            </p>
          </div>

          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">4️⃣ Router Cache</h3>
            <p className="text-gray-600 mb-2">
              客户端路由缓存 - 在客户端缓存访问过的路由
            </p>
            <p className="text-xs text-gray-500">
              生命周期：用户会话期间或特定时间
            </p>
          </div>
        </div>
      </div>

      {/* 测试页面列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Data Cache */}
        <Link
          href="/cache-test/data-cache"
          className="block bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            📦 Data Cache（数据缓存）
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            测试 fetch 请求的缓存行为
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 默认缓存行为</li>
            <li>• no-store（禁用缓存）</li>
            <li>• revalidate（定时重新验证）</li>
            <li>• 通过时间戳证明缓存</li>
          </ul>
        </Link>

        {/* Full Route Cache */}
        <Link
          href="/cache-test/full-route-cache"
          className="block bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-purple-600">
            🗺️ Full Route Cache（全路由缓存）
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            测试整个路由的缓存和静态生成
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 静态路由（构建时缓存）</li>
            <li>• 动态路由（运行时渲染）</li>
            <li>• 对比渲染时间戳</li>
            <li>• 查看 .next 目录的缓存文件</li>
          </ul>
        </Link>

        {/* Request Memoization */}
        <Link
          href="/cache-test/request-memoization"
          className="block bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-green-600">
            🔄 Request Memoization（请求记忆化）
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            测试同一渲染周期内的请求去重
          </p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 同一组件多次相同请求</li>
            <li>• 不同组件相同请求</li>
            <li>• 验证只发起一次网络请求</li>
            <li>• 查看日志证明去重</li>
          </ul>
        </Link>

        {/* Router Cache */}
        <Link
          href="/cache-test/router-cache"
          className="block bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-orange-600">
            🧭 Router Cache（客户端缓存）
          </h2>
          <p className="text-sm text-gray-600 mb-3">测试客户端路由的缓存行为</p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 客户端导航的缓存</li>
            <li>• 静态路由 vs 动态路由缓存时长</li>
            <li>• router.refresh() 刷新</li>
            <li>• Prefetch 预取行为</li>
          </ul>
        </Link>

        {/* Image Cache */}
        <Link
          href="/cache-test/image-cache"
          className="block bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-3 text-purple-600">
            🖼️ Image Cache（图片缓存）
          </h2>
          <p className="text-sm text-gray-600 mb-3">测试 Next.js Image 组件的缓存和优化</p>
          <ul className="text-xs space-y-1 text-gray-500">
            <li>• 自动格式转换（WebP）</li>
            <li>• 响应式图片加载</li>
            <li>• 懒加载 vs Priority</li>
            <li>• 服务端图片缓存</li>
          </ul>
        </Link>
      </div>

      {/* 缓存对比 */}
      <Link
        href="/cache-test/comparison"
        className="block bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow"
      >
        <h2 className="text-xl font-semibold mb-3">📊 缓存机制对比和总结</h2>
        <p className="text-sm opacity-90">
          查看所有缓存机制的对比表格、使用场景和最佳实践
        </p>
      </Link>

      {/* 重要提示 */}
      <div className="mt-8 bg-yellow-50 border border-yellow-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">
          ⚠️ 测试注意事项
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>开发环境 vs 生产环境：</strong>
            <br />
            <span className="text-xs text-gray-600">
              某些缓存行为在开发环境（
              <code className="bg-gray-200 px-1 rounded">pnpm dev</code>）
              和生产环境（
              <code className="bg-gray-200 px-1 rounded">
                pnpm build && pnpm start
              </code>
              ） 中不同。Full Route Cache 只在生产环境生效。
            </span>
          </li>
          <li>
            <strong>查看时间戳：</strong>
            <br />
            <span className="text-xs text-gray-600">
              每个测试页面都会显示时间戳，通过刷新页面观察时间戳是否变化来判断是否使用了缓存。
            </span>
          </li>
          <li>
            <strong>查看控制台：</strong>
            <br />
            <span className="text-xs text-gray-600">
              打开终端（服务端日志）和浏览器控制台（客户端日志）查看详细的缓存行为。
            </span>
          </li>
          <li>
            <strong>构建测试：</strong>
            <br />
            <span className="text-xs text-gray-600">
              运行 <code className="bg-gray-200 px-1 rounded">pnpm build</code>{' '}
              后，
              查看输出信息，会显示哪些路由是静态的（○）、哪些是动态的（λ）。
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
