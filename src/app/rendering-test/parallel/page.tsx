import Link from 'next/link';

/**
 * Layout 和 Page 并行渲染测试
 * 
 * 目标：验证 Next.js 会并行获取 layout 和 page 的数据，而不是串行等待
 */

async function fetchPageData() {
  const startTime = Date.now();
  console.log('[PAGE] 开始获取数据:', new Date().toISOString());
  
  // 模拟慢速数据获取（3秒）
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  console.log('[PAGE] 数据获取完成:', new Date().toISOString(), `耗时: ${duration}ms`);
  
  return {
    title: 'Page Data',
    fetchTime: new Date().toISOString(),
    duration: duration,
  };
}

export default async function ParallelRenderingPage() {
  const pageStartTime = Date.now();
  console.log('[PAGE] 开始渲染:', new Date().toISOString());
  
  // Page 获取数据
  const pageData = await fetchPageData();
  
  const pageEndTime = Date.now();
  const pageTotalTime = pageEndTime - pageStartTime;
  
  console.log('[PAGE] 渲染完成:', new Date().toISOString(), `总耗时: ${pageTotalTime}ms`);

  return (
    <div>
      <div className="mb-6">
        <Link href="/rendering-test" className="text-blue-600 hover:underline">
          ← 返回渲染测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Layout 和 Page 并行渲染测试</h1>

      {/* 说明 */}
      <div className="bg-purple-50 border border-purple-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-purple-800">
          🔀 并行渲染是什么？
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          在 Next.js App Router 中，<strong>layout 和 page 的数据获取是并行的</strong>，
          而不是串行等待。这意味着如果 layout 需要 2 秒，page 需要 3 秒，
          总渲染时间接近 <strong>3 秒</strong>（取最长的），而不是 5 秒（2 + 3）。
        </p>
        <div className="bg-white rounded p-4 text-xs">
          <p className="mb-2"><strong>本次测试配置：</strong></p>
          <ul className="space-y-1 text-gray-700 list-disc list-inside ml-4">
            <li>Layout 数据获取：<strong>2 秒</strong></li>
            <li>Page 数据获取：<strong>3 秒</strong></li>
            <li>如果是串行：总时间 = <strong>5 秒</strong> ❌</li>
            <li>如果是并行：总时间 ≈ <strong>3 秒</strong> ✅</li>
          </ul>
        </div>
      </div>

      {/* Page 数据展示 */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-3">
          🟢 Page 数据（慢速：3秒）
        </h2>
        <div className="bg-white rounded p-4 text-sm">
          <p className="mb-2">
            <strong>数据获取时间：</strong>
            <span className="ml-2 font-mono text-green-700">{pageData.fetchTime}</span>
          </p>
          <p className="mb-2">
            <strong>数据获取耗时：</strong>
            <span className="ml-2 font-mono text-green-700">{pageData.duration}ms</span>
          </p>
          <p>
            <strong>Page 总耗时：</strong>
            <span className="ml-2 font-mono text-green-700">{pageTotalTime}ms</span>
          </p>
        </div>
      </div>

      {/* 时间轴 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">
          ⏱️ 渲染时间轴
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm mb-2">串行渲染（传统方式）❌</h3>
            <div className="bg-white rounded p-3 font-mono text-xs">
              <div className="mb-2">0ms ─────────────────────────────────────────────── 开始</div>
              <div className="mb-2 text-blue-600">
                0ms → 2000ms ████████████ Layout 获取数据（2秒）
              </div>
              <div className="mb-2 text-green-600">
                2000ms → 5000ms ██████████████████ Page 获取数据（3秒）
              </div>
              <div>5000ms ───────────────────────────────────────────── ✅ 完成（总耗时 5秒）</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm mb-2">并行渲染（Next.js App Router）✅</h3>
            <div className="bg-white rounded p-3 font-mono text-xs">
              <div className="mb-2">0ms ─────────────────────────────────────────────── 开始</div>
              <div className="mb-2">
                <span className="text-blue-600">
                  0ms → 2000ms ████████████ Layout 获取数据（2秒）
                </span>
                <br />
                <span className="text-green-600">
                  0ms → 3000ms ██████████████████ Page 获取数据（3秒）
                </span>
              </div>
              <div>3000ms ───────────────────────────────────────────── ✅ 完成（总耗时 3秒）</div>
            </div>
            <p className="text-xs text-yellow-700 mt-2">
              ⚡ 节省时间：5秒 - 3秒 = <strong>2秒</strong>（40% 性能提升）
            </p>
          </div>
        </div>
      </div>

      {/* 验证方法 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 如何验证并行渲染？</h2>
        <ol className="space-y-3 text-sm list-decimal list-inside">
          <li>
            <strong>查看终端日志：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              刷新页面后，观察终端输出：
              <br />• <code className="bg-gray-200 px-1 rounded">[LAYOUT] 开始获取数据</code>
              <br />• <code className="bg-gray-200 px-1 rounded">[PAGE] 开始获取数据</code>
              <br />这两个日志的时间戳几乎相同 → 证明是<strong>并行启动</strong>
            </p>
          </li>
          <li>
            <strong>对比完成时间：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              - Layout 完成：约 2000ms
              <br />- Page 完成：约 3000ms
              <br />- 总渲染时间：约 3000ms（而不是 5000ms）
            </p>
          </li>
          <li>
            <strong>观察页面加载：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              打开 Network 面板，刷新页面：
              <br />• 等待约 3 秒后，页面一次性显示（包括 Layout 和 Page）
              <br />• 如果是串行，需要等待 5 秒
            </p>
          </li>
          <li>
            <strong>查看日志时间差：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              计算 <code className="bg-gray-200 px-1 rounded">[LAYOUT] 开始</code> 和{' '}
              <code className="bg-gray-200 px-1 rounded">[PAGE] 开始</code> 的时间差
              <br />→ 时间差接近 0ms = 并行 ✅
              <br />→ 时间差接近 2000ms = 串行 ❌
            </p>
          </li>
        </ol>
      </div>

      {/* 技术原理 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🔍 技术原理</h2>
        <div className="space-y-4 text-sm">
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">1️⃣ React 18 的并发特性</h3>
            <p className="text-xs text-gray-700">
              Next.js App Router 基于 React 18 的并发渲染能力，
              可以同时启动多个异步操作，而不需要等待前一个完成。
            </p>
          </div>
          
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">2️⃣ 数据获取的并行化</h3>
            <p className="text-xs text-gray-700 mb-2">
              当 Next.js 开始渲染一个路由时，会：
            </p>
            <ul className="text-xs text-gray-600 list-disc list-inside ml-4 space-y-1">
              <li>同时启动 layout 的数据获取</li>
              <li>同时启动 page 的数据获取</li>
              <li>等待所有数据获取完成</li>
              <li>一次性渲染完整页面</li>
            </ul>
          </div>
          
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">3️⃣ 嵌套 Layout 也支持并行</h3>
            <p className="text-xs text-gray-700">
              如果有多层嵌套的 layout，它们的数据获取也会并行进行：
            </p>
            <div className="bg-gray-100 rounded p-2 mt-2 font-mono text-xs">
              <pre>{`app/layout.tsx          (1秒) ┐
app/dashboard/layout.tsx (2秒) ├─ 并行
app/dashboard/page.tsx   (3秒) ┘
总耗时 ≈ 3秒（而不是 6秒）`}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* 实际应用 */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💡 实际应用场景</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-green-700 mb-2">✅ 并行获取的好处</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>用户导航栏数据（Layout）</li>
              <li>页面主要内容（Page）</li>
              <li>→ 同时获取，节省时间</li>
            </ul>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-blue-700 mb-2">📊 典型场景</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>Layout：用户信息、通知数量</li>
              <li>Page：文章内容、评论列表</li>
              <li>→ 并行加载，提升性能</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💻 代码示例</h2>
        <div className="bg-gray-900 text-gray-100 rounded p-4 text-xs font-mono overflow-x-auto">
          <pre>{`// app/dashboard/layout.tsx
export default async function DashboardLayout({ children }) {
  // Layout 数据获取（例如：用户信息）
  const user = await fetchUser(); // 1秒
  
  return (
    <div>
      <nav>Welcome, {user.name}</nav>
      {children}
    </div>
  );
}

// app/dashboard/page.tsx
export default async function DashboardPage() {
  // Page 数据获取（例如：仪表盘数据）
  const stats = await fetchStats(); // 2秒
  
  return <div>Stats: {stats.total}</div>;
}

// 渲染流程：
// 0ms:  同时启动 fetchUser() 和 fetchStats()
// 1000ms: fetchUser() 完成
// 2000ms: fetchStats() 完成 → 页面渲染完成
// 总耗时：2秒（而不是 3秒）✅`}</pre>
        </div>
      </div>

      {/* 注意事项 */}
      <div className="bg-red-50 border border-red-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-red-800">⚠️ 注意事项</h2>
        <ul className="space-y-2 text-sm list-disc list-inside">
          <li>
            <strong>总渲染时间 = max(layout 时间, page 时间)</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              页面会等待最慢的那个完成
            </p>
          </li>
          <li>
            <strong>子 layout 会等待父 layout</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              但同级的 layout 和 page 是并行的
            </p>
          </li>
          <li>
            <strong>开发环境可能有差异</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              建议在生产环境（<code className="bg-gray-200 px-1 rounded">pnpm build && pnpm start</code>）测试
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

