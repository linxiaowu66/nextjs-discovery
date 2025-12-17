import Link from 'next/link';
import { headers } from 'next/headers';

/**
 * 动态渲染 (SSR - Server-Side Rendering)
 * 
 * 每次请求都在服务器渲染，内容始终是最新的
 * 使用 Dynamic APIs (headers, cookies, searchParams) 会自动变成动态渲染
 */

// 强制动态渲染（也可以通过使用 Dynamic APIs 自动触发）
export const dynamic = 'force-dynamic';

export default async function DynamicRenderingPage() {
  const renderTime = new Date().toISOString();
  
  // 使用 Dynamic API（会自动触发动态渲染）
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || 'Unknown';
  
  console.log('[DYNAMIC RENDERING] 页面渲染时间:', renderTime);
  console.log('[DYNAMIC RENDERING] 这个日志每次请求都会打印');

  // 模拟数据获取（每次请求都执行）
  const dynamicData = {
    title: '动态渲染页面',
    description: '这个页面每次请求都会重新渲染',
    renderTime: renderTime,
    requestCount: Math.floor(Math.random() * 1000), // 每次请求都是新的随机数
    userAgent: userAgent.substring(0, 100), // 截取前100个字符
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/rendering-test" className="text-blue-600 hover:underline">
          ← 返回渲染测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">动态渲染 (SSR)</h1>

      {/* 说明 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-blue-800">
          🔄 什么是动态渲染？
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          动态渲染（Server-Side Rendering，SSR）是在<strong>每次请求时</strong>在服务器渲染页面。
          每个用户/每次请求都会获得最新的内容，适合需要实时数据或个性化内容的场景。
        </p>
        <div className="bg-white rounded p-4 text-xs">
          <p className="mb-2"><strong>核心特性：</strong></p>
          <ul className="space-y-1 text-gray-700 list-disc list-inside ml-4">
            <li>每次请求都在服务器渲染</li>
            <li>可以访问请求特定数据（headers、cookies、searchParams）</li>
            <li>内容始终是最新的</li>
            <li>需要 Node.js 服务器</li>
            <li>可以展示用户个性化内容</li>
          </ul>
        </div>
      </div>

      {/* 动态渲染触发条件 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-yellow-800">
          ⚡ 什么会触发动态渲染？
        </h2>
        <div className="space-y-3 text-sm">
          <div className="bg-white rounded p-3">
            <h3 className="font-semibold mb-2">1️⃣ 使用 Dynamic APIs</h3>
            <div className="bg-gray-100 rounded p-2 font-mono text-xs">
              <code className="text-blue-600">headers()</code>,{' '}
              <code className="text-blue-600">cookies()</code>,{' '}
              <code className="text-blue-600">searchParams</code>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              使用任何一个 Dynamic API 都会自动触发动态渲染
            </p>
          </div>
          <div className="bg-white rounded p-3">
            <h3 className="font-semibold mb-2">2️⃣ 明确配置</h3>
            <div className="bg-gray-100 rounded p-2 font-mono text-xs">
              export const <code className="text-purple-600">dynamic</code> = &apos;force-dynamic&apos;;
            </div>
            <p className="text-xs text-gray-600 mt-2">
              在页面或布局中导出 dynamic 配置
            </p>
          </div>
          <div className="bg-white rounded p-3">
            <h3 className="font-semibold mb-2">3️⃣ 使用 cache: &apos;no-store&apos;</h3>
            <div className="bg-gray-100 rounded p-2 font-mono text-xs">
              fetch(url, {`{ cache: 'no-store' }`})
            </div>
            <p className="text-xs text-gray-600 mt-2">
              fetch 使用 no-store 选项会触发动态渲染
            </p>
          </div>
        </div>
      </div>

      {/* 数据展示 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">📊 动态数据</h2>
        <div className="space-y-3 text-sm">
          <div className="bg-gray-50 rounded p-3">
            <p className="text-gray-600 mb-1">标题：</p>
            <p className="font-semibold">{dynamicData.title}</p>
          </div>
          <div className="bg-gray-50 rounded p-3">
            <p className="text-gray-600 mb-1">描述：</p>
            <p className="font-semibold">{dynamicData.description}</p>
          </div>
          <div className="bg-blue-50 rounded p-3">
            <p className="text-gray-600 mb-1">渲染时间：</p>
            <p className="font-mono text-blue-700">{dynamicData.renderTime}</p>
            <p className="text-xs text-blue-600 mt-1">
              ✅ 每次刷新都会变化（证明每次都重新渲染）
            </p>
          </div>
          <div className="bg-purple-50 rounded p-3">
            <p className="text-gray-600 mb-1">请求计数：</p>
            <p className="font-mono text-purple-700">{dynamicData.requestCount}</p>
            <p className="text-xs text-purple-600 mt-1">
              ✅ 每次刷新都是新的随机数
            </p>
          </div>
          <div className="bg-green-50 rounded p-3">
            <p className="text-gray-600 mb-1">User-Agent：</p>
            <p className="font-mono text-xs text-green-700 break-all">
              {dynamicData.userAgent}
            </p>
            <p className="text-xs text-green-600 mt-1">
              ✅ 从 headers() 获取（触发动态渲染）
            </p>
          </div>
        </div>
      </div>

      {/* 验证方法 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 如何验证动态渲染？</h2>
        <ol className="space-y-3 text-sm list-decimal list-inside">
          <li>
            <strong>查看构建输出：</strong>
            <div className="ml-6 mt-1 bg-white rounded p-2">
              <code className="text-xs">pnpm build</code>
            </div>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              在构建日志中，这个页面会显示为：
              <br />
              <code className="bg-gray-200 px-1 rounded">ƒ /rendering-test/dynamic</code>
              <br />ƒ 表示动态渲染（Dynamic/SSR）
            </p>
          </li>
          <li>
            <strong>多次刷新页面：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              <strong>渲染时间</strong>和<strong>请求计数</strong>每次都会变化（每次都重新渲染）
            </p>
          </li>
          <li>
            <strong>查看终端日志：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              每次访问页面，都会打印新的{' '}
              <code className="bg-gray-200 px-1 rounded">[DYNAMIC RENDERING]</code> 日志
            </p>
          </li>
          <li>
            <strong>查看页面源代码：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              右键 → 查看页面源代码，可以看到服务端渲染的完整 HTML（包括当前的时间戳）
            </p>
          </li>
          <li>
            <strong>对比 Network 面板：</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              Document 类型的请求大小通常比静态页面大（因为包含了动态数据）
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
              <li>用户个性化内容（用户名、购物车）</li>
              <li>实时数据（股票、新闻、天气）</li>
              <li>需要认证的页面（仪表盘）</li>
              <li>基于请求的内容（IP、语言）</li>
              <li>搜索结果页面</li>
            </ul>
          </div>
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold text-red-700 mb-2">❌ 不适合</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>内容不变的页面</li>
              <li>流量大且内容相同的页面</li>
              <li>营销页面、落地页</li>
              <li>博客文章、文档</li>
              <li>对性能要求极高的页面</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💻 代码示例</h2>
        <div className="bg-gray-900 text-gray-100 rounded p-4 text-xs font-mono overflow-x-auto">
          <pre>{`// app/dashboard/page.tsx
import { cookies, headers } from 'next/headers';

// 方法 1：明确指定动态渲染
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  // 方法 2：使用 Dynamic API（自动触发动态渲染）
  const cookieStore = await cookies();
  const headersList = await headers();
  const userId = cookieStore.get('userId');
  
  // 每次请求都执行
  const userData = await fetchUserData(userId);
  
  return (
    <div>
      <h1>Welcome, {userData.name}!</h1>
      <UserStats data={userData} />
    </div>
  );
}

// 方法 3：fetch 使用 no-store
async function fetchUserData(userId) {
  const res = await fetch(\`https://api.example.com/users/\${userId}\`, {
    cache: 'no-store', // 触发动态渲染
  });
  return res.json();
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
                <span><strong>内容最新：</strong>每次请求都渲染，内容始终最新</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>可个性化：</strong>可以根据用户定制内容</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>SEO 友好：</strong>服务端渲染，搜索引擎可索引</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>访问请求数据：</strong>可以使用 headers、cookies 等</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>实时数据：</strong>适合展示实时更新的数据</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-700 mb-3">❌ 缺点</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>性能较差：</strong>每次请求都渲染，TTFB 较慢</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>服务器负载：</strong>需要服务器资源处理每个请求</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>成本高：</strong>需要持续运行的服务器</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>不可缓存：</strong>无法通过 CDN 缓存（每次都不同）</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>扩展性差：</strong>流量大时需要更多服务器</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

