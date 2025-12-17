import Link from 'next/link';
import { Suspense } from 'react';

/**
 * PPR (Partial Prerendering) - 部分预渲染
 * 🧪 实验性特性
 * 
 * 结合静态渲染和动态渲染的最佳之处：
 * - 静态部分在构建时生成（Shell）
 * - 动态部分在请求时渲染（Holes）
 * 
 * 注意：需要在 next.config.ts 中启用 experimental.ppr = true
 */

// 动态组件 - 每次请求都重新渲染
async function DynamicContent() {
  const renderTime = new Date().toISOString();
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('[PPR] 动态内容渲染时间:', renderTime);
  
  return (
    <div className="bg-blue-50 border border-blue-300 rounded p-4">
      <h3 className="font-semibold text-blue-800 mb-2">动态内容（Hole）</h3>
      <p className="text-xs text-gray-600 mb-2">
        这部分在<strong>请求时</strong>渲染，每次访问都会更新
      </p>
      <p className="text-xs font-mono text-blue-700">渲染时间：{renderTime}</p>
      <p className="text-xs text-blue-600 mt-2">
        ✅ 每次刷新都会变化
      </p>
    </div>
  );
}

// Loading 组件
function DynamicLoading() {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded p-4 animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
}

export default function PPRPage() {
  const staticBuildTime = new Date().toISOString();
  
  console.log('[PPR] 静态部分构建时间:', staticBuildTime);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/rendering-test" className="text-blue-600 hover:underline">
          ← 返回渲染测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        部分预渲染 (PPR){' '}
        <span className="text-sm bg-yellow-200 px-2 py-1 rounded">🧪 实验性</span>
      </h1>

      {/* 说明 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-yellow-800">
          🧪 什么是 PPR？
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          Partial Prerendering（PPR）是 Next.js 的一个<strong>实验性特性</strong>，
          它允许在同一个页面中混合<strong>静态渲染</strong>和<strong>动态渲染</strong>。
        </p>
        <div className="bg-white rounded p-4 text-xs">
          <p className="mb-2"><strong>核心概念：</strong></p>
          <ul className="space-y-1 text-gray-700 list-disc list-inside ml-4">
            <li><strong>Shell（壳）</strong>：静态部分，构建时生成</li>
            <li><strong>Holes（洞）</strong>：动态部分，请求时渲染</li>
            <li>使用 <code>Suspense</code> 边界定义 Holes</li>
            <li>结合了 SSG 的速度和 SSR 的灵活性</li>
            <li>目前处于实验阶段（Next.js 15+）</li>
          </ul>
        </div>
      </div>

      {/* 启用 PPR */}
      <div className="bg-red-50 border border-red-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-red-800">
          ⚙️ 如何启用 PPR？
        </h2>
        <div className="space-y-3 text-sm">
          <p className="text-gray-700">
            PPR 是实验性特性，需要在 <code>next.config.ts</code> 中启用：
          </p>
          <div className="bg-gray-900 text-gray-100 rounded p-3 font-mono text-xs">
            <pre>{`// next.config.ts
const nextConfig = {
  experimental: {
    ppr: true,
  },
};

export default nextConfig;`}</pre>
          </div>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3">
            <p className="text-xs text-yellow-800">
              <strong>⚠️ 警告：</strong>
              PPR 仍在实验阶段，API 可能会变化，不建议在生产环境使用。
            </p>
          </div>
        </div>
      </div>

      {/* 静态 Shell */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-green-800">
          📦 静态 Shell（构建时生成）
        </h2>
        <div className="space-y-3">
          <p className="text-sm text-gray-700">
            这部分内容在<strong>构建时</strong>生成，所有用户看到相同的内容。
          </p>
          <div className="bg-white rounded p-4">
            <p className="text-sm mb-2">
              <strong>构建时间：</strong>
              <span className="ml-2 font-mono text-green-700">{staticBuildTime}</span>
            </p>
            <p className="text-xs text-green-600">
              ✅ 多次刷新页面，这个时间保持不变
            </p>
          </div>
        </div>
      </div>

      {/* 动态 Holes */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">🕳️ 动态 Holes（请求时渲染）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Suspense fallback={<DynamicLoading />}>
            <DynamicContent />
          </Suspense>
          
          <Suspense fallback={<DynamicLoading />}>
            <DynamicContent />
          </Suspense>
        </div>
      </div>

      {/* 工作原理 */}
      <div className="bg-purple-50 border border-purple-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-purple-800">
          🔍 PPR 工作原理
        </h2>
        <div className="space-y-3 text-sm">
          <div className="bg-white rounded p-3">
            <p className="font-semibold mb-2">1️⃣ 构建时</p>
            <ul className="text-xs text-gray-700 list-disc list-inside ml-4">
              <li>Next.js 生成静态 Shell（页面的静态部分）</li>
              <li>标记 Suspense 边界作为 Holes（动态部分）</li>
              <li>Shell 被缓存，可以立即响应</li>
            </ul>
          </div>
          <div className="bg-white rounded p-3">
            <p className="font-semibold mb-2">2️⃣ 请求时</p>
            <ul className="text-xs text-gray-700 list-disc list-inside ml-4">
              <li>立即返回静态 Shell（TTFB 快）</li>
              <li>服务器渲染 Holes 中的动态内容</li>
              <li>动态内容通过 Streaming 发送</li>
            </ul>
          </div>
          <div className="bg-white rounded p-3">
            <p className="font-semibold mb-2">3️⃣ 用户体验</p>
            <ul className="text-xs text-gray-700 list-disc list-inside ml-4">
              <li>用户立即看到页面结构（Shell）</li>
              <li>动态部分显示 loading 状态</li>
              <li>动态内容加载完成后替换 loading</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 验证方法 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 如何验证 PPR？</h2>
        <ol className="space-y-3 text-sm list-decimal list-inside">
          <li>
            <strong>启用 PPR：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              在 <code>next.config.ts</code> 中添加{' '}
              <code>experimental.ppr: true</code>
            </p>
          </li>
          <li>
            <strong>构建项目：</strong>
            <div className="ml-6 mt-1 bg-white rounded p-2">
              <code className="text-xs">pnpm build</code>
            </div>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              构建日志中会显示使用 PPR 的页面
            </p>
          </li>
          <li>
            <strong>观察行为：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              - <strong>静态 Shell</strong> 的构建时间不变
              <br />
              - <strong>动态 Holes</strong> 的渲染时间每次都变化
            </p>
          </li>
          <li>
            <strong>查看 Network：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              页面首先返回 Shell HTML，然后通过 Streaming 更新 Holes
            </p>
          </li>
        </ol>
      </div>

      {/* 使用场景 */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💡 适用场景</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-green-700 mb-2">✅ 最适合</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>电商产品页（静态信息 + 动态库存）</li>
              <li>个人主页（静态布局 + 动态用户数据）</li>
              <li>博客文章（静态内容 + 动态评论）</li>
              <li>仪表盘（静态框架 + 动态图表）</li>
            </ul>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-red-700 mb-2">❌ 不适合</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>完全静态的页面（用 SSG）</li>
              <li>完全动态的页面（用 SSR）</li>
              <li>生产环境（仍在实验阶段）</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💻 代码示例</h2>
        <div className="bg-gray-900 text-gray-100 rounded p-4 text-xs font-mono overflow-x-auto">
          <pre>{`// app/product/[id]/page.tsx
import { Suspense } from 'react';

// 动态组件 - Hole
async function DynamicStock({ productId }) {
  const stock = await fetchStock(productId); // 实时库存
  return <div>库存：{stock}</div>;
}

export default async function ProductPage({ params }) {
  // 静态内容 - Shell
  const product = await fetchProduct(params.id);
  
  return (
    <div>
      {/* Shell：静态部分 */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <img src={product.image} alt={product.name} />
      
      {/* Hole：动态部分 */}
      <Suspense fallback={<div>Loading stock...</div>}>
        <DynamicStock productId={params.id} />
      </Suspense>
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
                <span><strong>性能最优：</strong>结合 SSG 和 SSR 的优点</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>TTFB 快：</strong>Shell 立即返回</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>灵活性高：</strong>页面不同部分可以用不同策略</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>SEO 友好：</strong>Shell 是完整的 HTML</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-700 mb-3">❌ 缺点</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>实验性：</strong>API 可能变化，不稳定</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>复杂度高：</strong>需要规划 Shell 和 Holes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>需要 Suspense：</strong>增加代码复杂度</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>浏览器支持：</strong>需要现代浏览器</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

