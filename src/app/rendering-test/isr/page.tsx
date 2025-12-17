import Link from 'next/link';

/**
 * ISR (Incremental Static Regeneration)
 * 增量静态再生成
 * 
 * 结合了静态渲染和动态渲染的优点：
 * - 构建时生成静态页面（快）
 * - 定时重新验证和更新（新）
 */

// 配置 ISR：每 30 秒重新验证一次
export const revalidate = 30;

export default async function ISRPage() {
  const renderTime = new Date().toISOString();
  
  console.log('[ISR] 页面渲染时间:', renderTime);
  console.log('[ISR] 这个日志在构建时和重新验证时打印');

  // 模拟数据获取
  const isrData = {
    title: 'ISR 测试页面',
    description: '这个页面每 30 秒会重新生成一次',
    renderTime: renderTime,
    randomValue: Math.floor(Math.random() * 1000),
    revalidateInterval: 30, // 秒
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/rendering-test" className="text-blue-600 hover:underline">
          ← 返回渲染测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">增量静态再生成 (ISR)</h1>

      {/* 说明 */}
      <div className="bg-orange-50 border border-orange-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-orange-800">
          🔁 什么是 ISR？
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          ISR（Incremental Static Regeneration）是 Next.js 的一个强大特性，
          它结合了<strong>静态生成的性能</strong>和<strong>动态渲染的新鲜度</strong>。
        </p>
        <div className="bg-white rounded p-4 text-xs">
          <p className="mb-2"><strong>工作原理：</strong></p>
          <ol className="space-y-2 text-gray-700 list-decimal list-inside ml-4">
            <li><strong>构建时</strong>：生成静态页面（和 SSG 一样）</li>
            <li><strong>首次访问</strong>：返回缓存的静态页面（快速）</li>
            <li><strong>revalidate 时间后</strong>：下一个请求触发后台重新生成</li>
            <li><strong>生成期间</strong>：继续返回旧页面（不会阻塞用户）</li>
            <li><strong>生成完成后</strong>：新页面替换旧页面</li>
          </ol>
        </div>
      </div>

      {/* 重要概念 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-yellow-800">
          💡 关键概念：stale-while-revalidate
        </h2>
        <div className="space-y-3 text-sm">
          <p className="text-gray-700">
            ISR 使用了 <strong>stale-while-revalidate</strong> 策略：
          </p>
          <div className="bg-white rounded p-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-2xl mr-3">1️⃣</span>
                <div>
                  <p className="font-semibold">Stale（陈旧）</p>
                  <p className="text-xs text-gray-600">
                    返回缓存的页面（即使可能过期）→ 用户看到页面很快
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">2️⃣</span>
                <div>
                  <p className="font-semibold">While（同时）</p>
                  <p className="text-xs text-gray-600">
                    在后台重新生成页面 → 不阻塞用户请求
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">3️⃣</span>
                <div>
                  <p className="font-semibold">Revalidate（重新验证）</p>
                  <p className="text-xs text-gray-600">
                    生成完成后更新缓存 → 下一个用户看到新内容
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 数据展示 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">📊 ISR 数据</h2>
        <div className="space-y-3 text-sm">
          <div className="bg-gray-50 rounded p-3">
            <p className="text-gray-600 mb-1">标题：</p>
            <p className="font-semibold">{isrData.title}</p>
          </div>
          <div className="bg-gray-50 rounded p-3">
            <p className="text-gray-600 mb-1">描述：</p>
            <p className="font-semibold">{isrData.description}</p>
          </div>
          <div className="bg-orange-50 rounded p-3">
            <p className="text-gray-600 mb-1">渲染时间：</p>
            <p className="font-mono text-orange-700">{isrData.renderTime}</p>
            <p className="text-xs text-orange-600 mt-1">
              ✅ 在 {isrData.revalidateInterval} 秒内保持不变，之后会更新
            </p>
          </div>
          <div className="bg-purple-50 rounded p-3">
            <p className="text-gray-600 mb-1">随机值：</p>
            <p className="font-mono text-purple-700">{isrData.randomValue}</p>
            <p className="text-xs text-purple-600 mt-1">
              ✅ 每次重新验证时都会变化
            </p>
          </div>
          <div className="bg-blue-50 rounded p-3">
            <p className="text-gray-600 mb-1">重新验证间隔：</p>
            <p className="font-mono text-blue-700">{isrData.revalidateInterval} 秒</p>
            <p className="text-xs text-blue-600 mt-1">
              ✅ export const revalidate = {isrData.revalidateInterval};
            </p>
          </div>
        </div>
      </div>

      {/* 验证方法 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 如何验证 ISR？</h2>
        <ol className="space-y-3 text-sm list-decimal list-inside">
          <li>
            <strong>查看构建输出：</strong>
            <div className="ml-6 mt-1 bg-white rounded p-2">
              <code className="text-xs">pnpm build</code>
            </div>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              在构建日志中，这个页面会显示为：
              <br />
              <code className="bg-gray-200 px-1 rounded">
                ○ /rendering-test/isr (30 seconds)
              </code>
              <br />
              ○ 表示静态生成，括号中是 revalidate 时间
            </p>
          </li>
          <li>
            <strong>测试重新验证：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              1. 记录当前<strong>渲染时间</strong>
              <br />
              2. 在 30 秒内刷新多次 → 时间<strong>不变</strong>（使用缓存）
              <br />
              3. 等待 30 秒后刷新 → 仍返回<strong>旧页面</strong>（stale）
              <br />
              4. 再次刷新 → 看到<strong>新时间</strong>（revalidate 完成）
            </p>
          </li>
          <li>
            <strong>查看终端日志：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              在构建时和重新验证时，会打印{' '}
              <code className="bg-gray-200 px-1 rounded">[ISR]</code> 日志
              <br />
              注意：不是每次访问都打印，只在重新生成时打印
            </p>
          </li>
          <li>
            <strong>检查 Response Headers：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              打开 Network 面板，查看响应头：
              <br />
              <code className="bg-gray-200 px-1 rounded">
                Cache-Control: s-maxage=30, stale-while-revalidate
              </code>
            </p>
          </li>
        </ol>
      </div>

      {/* 时间轴示例 */}
      <div className="bg-purple-50 border border-purple-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">⏱️ ISR 时间轴示例</h2>
        <div className="space-y-2 text-xs font-mono">
          <div className="bg-white rounded p-2">
            <span className="text-gray-500">00:00</span> - 构建完成，生成静态页面（时间戳：A）
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-gray-500">00:05</span> - 用户 1 访问 → 返回页面 A（快速）
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-gray-500">00:15</span> - 用户 2 访问 → 返回页面 A（仍在 30 秒内）
          </div>
          <div className="bg-yellow-100 rounded p-2">
            <span className="text-gray-500">00:35</span> - 用户 3 访问 → 返回页面 A + 触发后台重新生成
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-gray-500">00:36</span> - 后台生成完成（时间戳：B）
          </div>
          <div className="bg-green-100 rounded p-2">
            <span className="text-gray-500">00:40</span> - 用户 4 访问 → 返回页面 B（新内容）✅
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          ⚠️ 注意：用户 3 看到的是旧页面（A），因为新页面（B）还在生成中。
          这确保了用户始终能快速获得响应。
        </p>
      </div>

      {/* 使用场景 */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💡 适用场景</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-green-700 mb-2">✅ 最适合</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>博客文章（定期发布）</li>
              <li>电商产品页（价格、库存更新）</li>
              <li>新闻网站（定时更新）</li>
              <li>文档站点（内容更新）</li>
              <li>API 数据展示（定期同步）</li>
            </ul>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-red-700 mb-2">❌ 不适合</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>用户个性化内容（每人不同）</li>
              <li>秒级实时数据（股票 tick）</li>
              <li>用户输入后的即时反馈</li>
              <li>需要认证的页面</li>
              <li>完全静态的内容（用 SSG 更好）</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💻 代码示例</h2>
        <div className="bg-gray-900 text-gray-100 rounded p-4 text-xs font-mono overflow-x-auto">
          <pre>{`// app/blog/[slug]/page.tsx

// 配置 ISR：每 60 秒重新验证
export const revalidate = 60;

export default async function BlogPost({ params }) {
  // 这个数据获取在构建时和重新验证时执行
  const post = await fetchPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <time>{post.updatedAt}</time>
    </article>
  );
}

// 动态路由需要 generateStaticParams
export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// 或者使用 fetch 的 revalidate 选项
async function fetchPost(slug) {
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`, {
    next: { revalidate: 60 }, // 60 秒后重新验证
  });
  return res.json();
}`}</pre>
        </div>
      </div>

      {/* 配置选项 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">⚙️ ISR 配置选项</h2>
        <div className="space-y-3 text-sm">
          <div className="bg-white rounded p-3">
            <h3 className="font-semibold mb-2">1️⃣ 页面级 revalidate</h3>
            <div className="bg-gray-100 rounded p-2 font-mono text-xs">
              export const revalidate = 60; // 秒
            </div>
            <p className="text-xs text-gray-600 mt-1">
              页面中的所有 fetch 都使用这个 revalidate 时间
            </p>
          </div>
          <div className="bg-white rounded p-3">
            <h3 className="font-semibold mb-2">2️⃣ fetch 级 revalidate</h3>
            <div className="bg-gray-100 rounded p-2 font-mono text-xs">
              {`fetch(url, { next: { revalidate: 30 } })`}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              单个 fetch 请求的 revalidate 时间
            </p>
          </div>
          <div className="bg-white rounded p-3">
            <h3 className="font-semibold mb-2">3️⃣ 路由段配置</h3>
            <div className="bg-gray-100 rounded p-2 font-mono text-xs space-y-1">
              <div>export const revalidate = 60;</div>
              <div>export const dynamic = &apos;force-static&apos;;</div>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              组合配置，确保静态生成 + ISR
            </p>
          </div>
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
                <span><strong>性能好：</strong>接近静态页面的速度</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>内容新：</strong>定期自动更新内容</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>无需重新构建：</strong>内容更新无需重新部署</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>不阻塞用户：</strong>后台更新，用户无感知</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>可缓存：</strong>可以通过 CDN 缓存</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>SEO 友好：</strong>静态 HTML，搜索引擎可索引</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-700 mb-3">❌ 缺点</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>延迟更新：</strong>内容更新有延迟（revalidate 时间）</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>可能看到旧内容：</strong>重新验证期间返回旧页面</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>服务器负载：</strong>定期重新生成需要服务器资源</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>不适合实时：</strong>无法做到秒级更新</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>不可个性化：</strong>所有用户看到相同内容</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

