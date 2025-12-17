import Link from 'next/link';
import { ClientStateTracker } from './client-state-tracker';

/**
 * Router Cache 测试页面 - 完整重写版本
 *
 * 目标：清楚地演示 Router Cache 的行为
 *
 * 根据 Next.js 16 官方文档：
 * - Pages 默认不缓存（staleTime = 0）- 使用 Link 导航时会重新请求 RSC
 * - 但在浏览器前进/后退时会重用 RSC Payload - 不会重新请求
 * - 参考：https://nextjs.org/docs/app/guides/caching#client-side-router-cache
 */

// 服务端组件 - 每次渲染都会生成新的时间戳
async function ServerTimestamp() {
  // 模拟服务端数据获取
  const serverRenderTime = new Date().toISOString();

  console.log('[SERVER COMPONENT] 渲染时间:', serverRenderTime);

  return (
    <div className="bg-green-50 border border-green-300 rounded-lg p-4">
      <h3 className="font-semibold text-green-800 mb-2">
        🖥️ 服务端组件渲染信息
      </h3>
      <p className="text-sm">
        <strong>服务端渲染时间：</strong>
        <span className="ml-2 font-mono text-green-700">
          {serverRenderTime}
        </span>
      </p>
      <p className="text-xs text-gray-600 mt-2">
        💡 这个时间戳在服务端生成。如果 RSC Payload 被重用，这个时间不会变化。
      </p>
    </div>
  );
}

export default async function RouterCachePage() {
  // 在服务端记录每次渲染
  const pageRenderTime = new Date().toISOString();
  console.log('[SERVER PAGE] ========== Router Cache 页面渲染 ==========');
  console.log('[SERVER PAGE] 渲染时间:', pageRenderTime);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/cache-test" className="text-blue-600 hover:underline">
          ← 返回缓存测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        Router Cache（客户端路由缓存）- 可观测测试
      </h1>

      {/* 核心说明 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          📚 Router Cache 核心行为（Next.js 15+）
        </h2>
        <div className="space-y-3 text-sm">
          <div className="bg-white rounded p-4">
            <p className="font-semibold text-blue-800 mb-2">✅ 三个关键点：</p>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              <li>
                <strong>Pages 默认不缓存</strong>（staleTime = 0）
                <p className="text-xs ml-6 mt-1">
                  使用 Link 或 router.push() 导航时，会重新请求 RSC
                  Payload（新的 _rsc 请求）
                </p>
              </li>
              <li>
                <strong>浏览器前进/后退时会重用 RSC</strong>
                <p className="text-xs ml-6 mt-1">
                  使用浏览器后退/前进按钮时，不会重新请求 RSC，使用已有的 RSC
                  Payload
                </p>
              </li>
              <li>
                <strong>Prefetch 缓存时间：5 分钟</strong>
                <p className="text-xs ml-6 mt-1">
                  Link 组件的 prefetch 会缓存 5 分钟（如果在 5 分钟内导航，使用
                  prefetch 的结果）
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 rounded p-3">
            <p className="text-xs font-semibold text-yellow-800 mb-1">
              💡 理解 "not cached but reused"：
            </p>
            <p className="text-xs text-gray-700">
              这个看似矛盾的说法指的是：Link
              导航时不缓存（每次重新请求），但浏览器前进/后退时会重用（不重新请求）。
              这样既保证了数据新鲜度，又优化了浏览器导航体验。
            </p>
          </div>
        </div>
      </div>

      {/* 服务端时间戳 */}
      <div className="mb-6">
        <ServerTimestamp />
      </div>

      {/* 客户端状态追踪器 */}
      <div className="mb-6">
        <ClientStateTracker />
      </div>

      {/* 测试操作 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 测试导航</h2>
        <div className="space-y-4">
          <div>
            <Link
              href="/cache-test/router-cache/page-a"
              className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              使用 Link 导航到 Page A
            </Link>
            <p className="text-xs text-gray-600 mt-2">
              ⚠️ 预期：会发起新的 _rsc 请求，服务端时间会变化
            </p>
          </div>
        </div>
      </div>

      {/* 测试步骤 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          📋 测试步骤（请严格按照步骤操作）
        </h2>
        <div className="space-y-4 text-sm">
          {/* 测试 1 */}
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-lg mb-3">
              🔬 测试 1：验证 Link 导航会重新请求 RSC
            </h3>
            <ol className="space-y-2 list-decimal list-inside">
              <li>
                <strong>打开浏览器开发者工具的 Network 面板</strong>
                <p className="text-xs text-gray-600 ml-6">
                  过滤：输入 "_rsc" 来只看 RSC 请求
                </p>
              </li>
              <li>
                <strong>记录当前的服务端渲染时间</strong>
                <p className="text-xs text-gray-600 ml-6">
                  记录上面绿色框中的时间
                </p>
              </li>
              <li>
                <strong>点击 "使用 Link 导航到 Page A" 按钮</strong>
                <p className="text-xs text-gray-600 ml-6">观察 Network 面板</p>
              </li>
              <li>
                <strong>在 Page A 中，点击 "使用 Link 返回" 按钮</strong>
                <p className="text-xs text-gray-600 ml-6">观察 Network 面板</p>
              </li>
              <li className="bg-green-50 p-2 rounded">
                <strong className="text-green-800">✅ 预期结果：</strong>
                <ul className="text-xs text-gray-700 mt-1 ml-6 space-y-1">
                  <li>
                    • Network 面板中出现新的{' '}
                    <code className="bg-gray-200 px-1 rounded">
                      router-cache?_rsc=xxx
                    </code>{' '}
                    请求
                  </li>
                  <li>• 服务端渲染时间会变化（因为重新渲染了 RSC）</li>
                  <li>• 客户端组件会重新挂载（访问次数增加）</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* 测试 2 */}
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-lg mb-3">
              🔬 测试 2：验证浏览器后退会重用 RSC
            </h3>
            <ol className="space-y-2 list-decimal list-inside">
              <li>
                <strong>清空 Network 面板</strong>
                <p className="text-xs text-gray-600 ml-6">
                  点击 🚫 图标清空请求列表
                </p>
              </li>
              <li>
                <strong>记录当前的服务端渲染时间</strong>
              </li>
              <li>
                <strong>点击 "使用 Link 导航到 Page A" 按钮</strong>
              </li>
              <li>
                <strong>使用浏览器后退按钮返回</strong>
                <p className="text-xs text-gray-600 ml-6">
                  ⚠️ 重要：不要点击 Page A 中的 Link，而是点击浏览器的后退按钮 ←
                </p>
              </li>
              <li className="bg-blue-50 p-2 rounded">
                <strong className="text-blue-800">✅ 预期结果：</strong>
                <ul className="text-xs text-gray-700 mt-1 ml-6 space-y-1">
                  <li>
                    • Network 面板中<strong>没有</strong>新的{' '}
                    <code className="bg-gray-200 px-1 rounded">_rsc</code> 请求
                  </li>
                  <li>
                    • 服务端渲染时间<strong>保持不变</strong>（重用了 RSC
                    Payload）
                  </li>
                  <li>• 客户端组件可能会重新挂载（这是 React 的行为）</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* 测试 3 */}
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-lg mb-3">
              🔬 测试 3：验证 Prefetch 缓存（5 分钟）
            </h3>
            <ol className="space-y-2 list-decimal list-inside">
              <li>
                <strong>清空 Network 面板并刷新此页面</strong>
              </li>
              <li>
                <strong>观察 Network 面板</strong>
                <p className="text-xs text-gray-600 ml-6">
                  Link 组件会自动 prefetch，你会看到{' '}
                  <code className="bg-gray-200 px-1 rounded">
                    page-a?_rsc=xxx
                  </code>{' '}
                  请求
                </p>
              </li>
              <li>
                <strong>在 5 分钟内点击 "导航到 Page A"</strong>
              </li>
              <li className="bg-purple-50 p-2 rounded">
                <strong className="text-purple-800">✅ 预期结果：</strong>
                <ul className="text-xs text-gray-700 mt-1 ml-6 space-y-1">
                  <li>
                    • 导航时不会发起新的 _rsc 请求（使用 prefetch 的结果）
                  </li>
                  <li>• 导航非常快速（instant navigation）</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Network 面板观察指南 */}
      <div className="bg-orange-50 border border-orange-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">👀 Network 面板观察指南</h2>
        <div className="space-y-3 text-sm">
          <div className="bg-white rounded p-3">
            <p className="font-semibold mb-2">🔍 如何观察 RSC 请求：</p>
            <ol className="space-y-1 text-xs text-gray-700 list-decimal list-inside ml-4">
              <li>打开开发者工具（F12 或 Cmd+Option+I）</li>
              <li>切换到 Network 标签</li>
              <li>在过滤框中输入 "_rsc"</li>
              <li>观察请求的 URL、时间戳参数</li>
            </ol>
          </div>

          <div className="bg-white rounded p-3">
            <p className="font-semibold mb-2">📊 请求格式：</p>
            <div className="font-mono text-xs bg-gray-100 p-2 rounded">
              /cache-test/router-cache?_rsc=
              <span className="text-blue-600">随机字符串</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              每次新请求都会有不同的 _rsc 参数值
            </p>
          </div>

          <div className="bg-white rounded p-3">
            <p className="font-semibold mb-2">⚡ 关键观察点：</p>
            <ul className="space-y-1 text-xs text-gray-700 list-disc list-inside ml-4">
              <li>
                <strong>Link 导航返回</strong>：会看到新的 _rsc 请求
              </li>
              <li>
                <strong>浏览器后退</strong>：不会看到 _rsc 请求（重用）
              </li>
              <li>
                <strong>5 分钟内导航</strong>：不会看到 _rsc 请求（prefetch
                缓存）
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 终端日志观察 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🖥️ 终端日志观察</h2>
        <p className="text-sm text-gray-700 mb-3">
          查看运行 Next.js 的终端，观察服务端渲染日志：
        </p>
        <div className="bg-gray-900 text-green-400 rounded p-4 font-mono text-xs">
          <div>[SERVER PAGE] ========== Router Cache 页面渲染 ==========</div>
          <div>[SERVER PAGE] 渲染时间: 2025-12-17T10:30:45.123Z</div>
          <div>[SERVER COMPONENT] 渲染时间: 2025-12-17T10:30:45.125Z</div>
        </div>
        <div className="mt-3 space-y-2 text-xs text-gray-600">
          <p>
            <strong>Link 导航返回：</strong>会看到新的日志（重新渲染）
          </p>
          <p>
            <strong>浏览器后退：</strong>不会看到新的日志（重用 RSC）
          </p>
        </div>
      </div>
    </div>
  );
}
