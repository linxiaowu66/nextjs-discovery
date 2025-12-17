import Link from 'next/link';

/**
 * 静态渲染 (SSG - Static Site Generation)
 * 
 * 在构建时预渲染，生成静态 HTML
 * 所有用户共享同一份 HTML，性能最优
 */

export default async function StaticRenderingPage() {
  const buildTime = new Date().toISOString();
  
  console.log('[STATIC RENDERING] 页面构建时间:', buildTime);
  console.log('[STATIC RENDERING] 这个日志只在构建时打印一次');

  // 模拟数据获取（构建时执行）
  const staticData = {
    title: '静态渲染页面',
    description: '这个页面在构建时生成，内容不会改变',
    buildTime: buildTime,
    visits: Math.floor(Math.random() * 1000), // 构建时的随机数
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/rendering-test" className="text-blue-600 hover:underline">
          ← 返回渲染测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">静态渲染 (SSG)</h1>

      {/* 说明 */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-green-800">
          📄 什么是静态渲染？
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          静态渲染（Static Site Generation，SSG）是在<strong>构建时</strong>预先渲染页面，生成静态 HTML 文件。
          所有用户访问时都会获得相同的 HTML，提供最快的加载速度。
        </p>
        <div className="bg-white rounded p-4 text-xs">
          <p className="mb-2"><strong>核心特性：</strong></p>
          <ul className="space-y-1 text-gray-700 list-disc list-inside ml-4">
            <li>在 <code className="bg-gray-200 px-1 rounded">next build</code> 时渲染</li>
            <li>生成静态 HTML，存储在 <code className="bg-gray-200 px-1 rounded">.next/server/app/</code></li>
            <li>所有用户共享同一份 HTML</li>
            <li>可以部署到任何静态托管服务（Vercel、Netlify、GitHub Pages）</li>
            <li>性能最优，TTFB 最快</li>
          </ul>
        </div>
      </div>

      {/* 数据展示 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">📊 静态数据</h2>
        <div className="space-y-3 text-sm">
          <div className="bg-gray-50 rounded p-3">
            <p className="text-gray-600 mb-1">标题：</p>
            <p className="font-semibold">{staticData.title}</p>
          </div>
          <div className="bg-gray-50 rounded p-3">
            <p className="text-gray-600 mb-1">描述：</p>
            <p className="font-semibold">{staticData.description}</p>
          </div>
          <div className="bg-blue-50 rounded p-3">
            <p className="text-gray-600 mb-1">构建时间：</p>
            <p className="font-mono text-blue-700">{staticData.buildTime}</p>
          </div>
          <div className="bg-purple-50 rounded p-3">
            <p className="text-gray-600 mb-1">访问次数（构建时生成）：</p>
            <p className="font-mono text-purple-700">{staticData.visits}</p>
          </div>
        </div>
      </div>

      {/* 验证方法 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 如何验证静态渲染？</h2>
        <ol className="space-y-3 text-sm list-decimal list-inside">
          <li>
            <strong>查看构建输出：</strong>
            <div className="ml-6 mt-1 bg-white rounded p-2">
              <code className="text-xs">pnpm build</code>
            </div>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              在构建日志中，这个页面会显示为：
              <br />
              <code className="bg-gray-200 px-1 rounded">○ /rendering-test/static</code>
              <br />○ 表示静态生成
            </p>
          </li>
          <li>
            <strong>多次刷新页面：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              <strong>构建时间</strong>和<strong>访问次数</strong>始终保持不变（构建时确定）
            </p>
          </li>
          <li>
            <strong>查看页面源代码：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              右键 → 查看页面源代码，可以看到完整的 HTML（包括数据）
            </p>
          </li>
          <li>
            <strong>查看终端日志：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              <code className="bg-gray-200 px-1 rounded">[STATIC RENDERING]</code> 日志只在构建时打印，
              访问页面时不会打印新的日志
            </p>
          </li>
          <li>
            <strong>检查 .next 目录：</strong>
            <div className="ml-6 mt-1 bg-white rounded p-2">
              <code className="text-xs">cat .next/server/app/rendering-test/static/page.js</code>
            </div>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              可以看到预渲染的内容
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
              <li>营销页面、落地页</li>
              <li>博客文章、文档</li>
              <li>关于我们、帮助中心</li>
              <li>产品展示页面</li>
              <li>内容不常变化的页面</li>
            </ul>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-red-700 mb-2">❌ 不适合</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>用户个性化内容</li>
              <li>实时数据（股票、新闻）</li>
              <li>需要认证的页面</li>
              <li>频繁更新的内容</li>
              <li>依赖请求数据的页面</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💻 代码示例</h2>
        <div className="bg-gray-900 text-gray-100 rounded p-4 text-xs font-mono overflow-x-auto">
          <pre>{`// app/blog/[slug]/page.tsx

// 默认就是静态渲染（无需额外配置）
export default async function BlogPost({ params }) {
  // 这个数据获取在构建时执行
  const post = await fetchPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// 如果有动态路由，需要提供所有可能的路径
export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 明确指定为静态渲染（可选）
export const dynamic = 'force-static';`}</pre>
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
                <span><strong>性能最优：</strong>预渲染的 HTML，TTFB 最快</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>SEO 友好：</strong>完整的 HTML，搜索引擎可直接索引</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>成本低：</strong>可部署到静态托管，无需服务器</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>可缓存：</strong>可以通过 CDN 缓存，全球加速</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>可靠性高：</strong>无服务器依赖，不会宕机</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-700 mb-3">❌ 缺点</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>内容不变：</strong>构建后内容不会自动更新</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>构建时间长：</strong>页面多时，构建可能很慢</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>无法个性化：</strong>所有用户看到相同内容</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>更新麻烦：</strong>需要重新构建和部署</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>不适合实时：</strong>无法展示实时数据</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

