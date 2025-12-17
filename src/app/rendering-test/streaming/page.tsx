import Link from 'next/link';
import { Suspense } from 'react';

/**
 * Streaming (流式渲染)
 * 
 * 使用 React Suspense 实现组件级别的流式渲染
 * 边渲染边发送，提升首字节时间（TTFB）
 */

// 慢数据组件 - 模拟慢速数据获取
async function SlowDataComponent({ delay, label }: { delay: number; label: string }) {
  // 模拟慢速 API
  await new Promise(resolve => setTimeout(resolve, delay));
  const renderTime = new Date().toISOString();
  
  console.log(`[STREAMING] ${label} 渲染完成:`, renderTime);
  
  return (
    <div className="bg-green-50 border border-green-300 rounded p-4">
      <h3 className="font-semibold text-green-800 mb-2">{label}</h3>
      <p className="text-xs text-gray-600">加载时间：{delay}ms</p>
      <p className="text-xs font-mono text-green-700">完成时间：{renderTime}</p>
    </div>
  );
}

// Loading 骨架屏
function LoadingSkeleton({ label }: { label: string }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded p-4 animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
}

export default function StreamingPage() {
  const pageStartTime = new Date().toISOString();
  console.log('[STREAMING] 页面开始渲染:', pageStartTime);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/rendering-test" className="text-blue-600 hover:underline">
          ← 返回渲染测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">流式渲染 (Streaming)</h1>

      {/* 说明 */}
      <div className="bg-purple-50 border border-purple-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-purple-800">
          ⚡ 什么是 Streaming？
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          Streaming（流式渲染）允许服务器<strong>逐步发送</strong>页面内容，
          而不是等待所有内容准备好再一次性发送。使用 React 的 <code>Suspense</code> 边界，
          可以让快速的部分先显示，慢速的部分稍后加载。
        </p>
        <div className="bg-white rounded p-4 text-xs">
          <p className="mb-2"><strong>核心特性：</strong></p>
          <ul className="space-y-1 text-gray-700 list-disc list-inside ml-4">
            <li>使用 React <code>Suspense</code> 实现</li>
            <li>逐步发送 HTML 片段</li>
            <li>改善首字节时间（TTFB）</li>
            <li>提升用户感知性能</li>
            <li>自动支持 loading UI</li>
          </ul>
        </div>
      </div>

      {/* 页面信息 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-6">
        <p className="text-sm">
          <strong>📅 页面开始渲染时间：</strong>
          <span className="ml-2 font-mono text-blue-700">{pageStartTime}</span>
        </p>
        <p className="text-xs text-gray-600 mt-2">
          这部分会<strong>立即</strong>发送给客户端（不等待下面的慢速组件）
        </p>
      </div>

      {/* Streaming 演示 */}
      <div className="space-y-4 mb-6">
        <h2 className="text-xl font-semibold">📊 Streaming 演示</h2>
        <p className="text-sm text-gray-600">
          下面的组件模拟了不同的加载时间。打开 Network 面板，查看 HTML 是如何逐步加载的。
        </p>

        {/* 立即显示的内容 */}
        <div className="bg-white border border-gray-300 rounded p-4">
          <h3 className="font-semibold mb-2">🚀 立即显示的内容</h3>
          <p className="text-sm text-gray-600">
            这部分内容会立即渲染并发送，无需等待下面的异步组件。
          </p>
        </div>

        {/* 使用 Suspense 包裹慢速组件 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Suspense fallback={<LoadingSkeleton label="组件 A" />}>
            <SlowDataComponent delay={1000} label="组件 A（1秒）" />
          </Suspense>

          <Suspense fallback={<LoadingSkeleton label="组件 B" />}>
            <SlowDataComponent delay={2000} label="组件 B（2秒）" />
          </Suspense>

          <Suspense fallback={<LoadingSkeleton label="组件 C" />}>
            <SlowDataComponent delay={3000} label="组件 C（3秒）" />
          </Suspense>
        </div>
      </div>

      {/* 验证方法 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 如何验证 Streaming？</h2>
        <ol className="space-y-3 text-sm list-decimal list-inside">
          <li>
            <strong>打开 Network 面板：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              过滤 "Doc" 类型，找到页面请求
            </p>
          </li>
          <li>
            <strong>查看响应：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              在 Preview 或 Response 标签中，可以看到 HTML 是分块发送的
              <br />
              - 首先发送页面头部和立即显示的内容
              <br />
              - 然后逐步发送 Suspense 组件的内容
            </p>
          </li>
          <li>
            <strong>观察加载顺序：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              刷新页面，会看到：
              <br />
              1️⃣ 页面头部立即显示
              <br />
              2️⃣ 显示 3 个 loading 骨架屏
              <br />
              3️⃣ 1 秒后，组件 A 完成（替换骨架屏）
              <br />
              4️⃣ 2 秒后，组件 B 完成
              <br />
              5️⃣ 3 秒后，组件 C 完成
            </p>
          </li>
          <li>
            <strong>查看终端日志：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              组件按顺序完成，每个组件完成时都会打印日志
            </p>
          </li>
        </ol>
      </div>

      {/* 使用场景 */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💡 适用场景</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-green-700 mb-2">✅ 适合</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>复杂仪表盘（多个数据源）</li>
              <li>电商产品页（评论、推荐分开加载）</li>
              <li>社交媒体（Feed 流）</li>
              <li>数据可视化页面</li>
              <li>包含慢速 API 的页面</li>
            </ul>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-orange-700 mb-2">⚠️ 注意</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>需要设计好 loading 状态</li>
              <li>SEO：爬虫可能不等待流式完成</li>
              <li>增加复杂度（Suspense 边界）</li>
              <li>可能影响布局稳定性（CLS）</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💻 代码示例</h2>
        <div className="bg-gray-900 text-gray-100 rounded p-4 text-xs font-mono overflow-x-auto">
          <pre>{`// app/dashboard/page.tsx
import { Suspense } from 'react';

async function SlowComponent() {
  const data = await fetchSlowData(); // 慢速 API
  return <div>{data}</div>;
}

function LoadingUI() {
  return <div className="animate-pulse">Loading...</div>;
}

export default function Dashboard() {
  return (
    <div>
      {/* 立即显示的内容 */}
      <h1>Dashboard</h1>
      
      {/* 使用 Suspense 包裹慢速组件 */}
      <Suspense fallback={<LoadingUI />}>
        <SlowComponent />
      </Suspense>
      
      {/* 多个 Suspense 边界，独立加载 */}
      <div className="grid">
        <Suspense fallback={<LoadingUI />}>
          <Stats />
        </Suspense>
        
        <Suspense fallback={<LoadingUI />}>
          <Chart />
        </Suspense>
      </div>
    </div>
  );
}`}</pre>
        </div>
      </div>

      {/* 优缺点 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">⚖️ 优缺点</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-green-700 mb-3">✅ 优点</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>TTFB 快：</strong>首字节时间大幅减少</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>用户体验好：</strong>快速看到部分内容</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>并行加载：</strong>多个组件可以并行获取数据</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>自动 loading：</strong>Suspense 自动处理加载状态</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-700 mb-3">❌ 缺点</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>复杂度高：</strong>需要设计 Suspense 边界</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>SEO 问题：</strong>爬虫可能不等待</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>布局偏移：</strong>内容逐步加载可能影响 CLS</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>调试困难：</strong>渲染顺序可能不确定</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

