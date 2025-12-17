import Link from 'next/link';

/**
 * Data Cache 测试页面
 * 测试 fetch 的缓存行为
 */

// 获取 API URL
// 在服务端组件中需要使用完整的 URL 来 fetch
function getApiUrl() {
  // 优先使用环境变量
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_SITE_URL}/api/time`;
  }

  // 开发环境：根据端口号判断
  // 运行在 3001 端口（因为 3000 被占用）
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/api/time';
  }

  // 生产环境默认
  return 'http://localhost:3000/api/time';
}

// 使用内部的时间 API 测试 Data Cache
async function fetchWithDefaultCache() {
  console.log('[fetchWithDefaultCache] 开始 - cache: force-cache (默认)');

  try {
    const url = getApiUrl();
    console.log('[fetchWithDefaultCache] API URL:', url);

    const res = await fetch(url, {
      cache: 'force-cache', // 显式指定缓存（在动态页面中必须显式指定）
    });

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    const data = await res.json();
    const fetchedAt = new Date().toISOString();

    console.log('[fetchWithDefaultCache] 完成 - API时间:', data.datetime);

    return {
      apiTime: data.datetime,
      fetchedAt: fetchedAt,
      timestamp: data.timestamp,
    };
  } catch (error) {
    console.error('[fetchWithDefaultCache] 错误:', error);
    // 降级方案：使用本地时间
    const now = new Date().toISOString();
    return {
      apiTime: now,
      fetchedAt: now,
      timestamp: Date.now(),
      error: '使用本地时间（API 不可用）',
    };
  }
}

async function fetchWithNoStore() {
  console.log('[fetchWithNoStore] 开始 - cache: no-store');

  try {
    const url = getApiUrl();
    console.log('[fetchWithNoStore] API URL:', url);

    const res = await fetch(url, {
      cache: 'no-store', // 禁用缓存，每次都重新请求
    });

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    const data = await res.json();
    const fetchedAt = new Date().toISOString();

    console.log('[fetchWithNoStore] 完成 - API时间:', data.datetime);

    return {
      apiTime: data.datetime,
      fetchedAt: fetchedAt,
      timestamp: data.timestamp,
    };
  } catch (error) {
    console.error('[fetchWithNoStore] 错误:', error);
    const now = new Date().toISOString();
    return {
      apiTime: now,
      fetchedAt: now,
      timestamp: Date.now(),
      error: '使用本地时间（API 不可用）',
    };
  }
}

async function fetchWithRevalidate() {
  console.log('[fetchWithRevalidate] 开始 - revalidate: 10');

  try {
    const url = getApiUrl();
    console.log('[fetchWithRevalidate] API URL:', url);

    const res = await fetch(url, {
      next: { revalidate: 10 }, // 10秒后重新验证
    });

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    const data = await res.json();
    const fetchedAt = new Date().toISOString();

    console.log('[fetchWithRevalidate] 完成 - API时间:', data.datetime);

    return {
      apiTime: data.datetime,
      fetchedAt: fetchedAt,
      timestamp: data.timestamp,
    };
  } catch (error) {
    console.error('[fetchWithRevalidate] 错误:', error);
    const now = new Date().toISOString();
    return {
      apiTime: now,
      fetchedAt: now,
      timestamp: Date.now(),
      error: '使用本地时间（API 不可用）',
    };
  }
}

// 配置路由段选项来演示不同的缓存行为
// export const dynamic = 'force-static'; // 强制静态（默认缓存）
export const dynamic = 'force-dynamic'; // 强制动态（禁用缓存）
// export const revalidate = 10; // 10秒后重新验证

export default async function DataCachePage() {
  console.log('[DATA CACHE PAGE] 页面渲染开始:', new Date().toISOString());

  // 测试不同缓存策略的 fetch
  const defaultCacheData = await fetchWithDefaultCache();
  const noStoreData = await fetchWithNoStore();
  const revalidateData = await fetchWithRevalidate();

  const pageRenderTime = new Date().toISOString();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/cache-test" className="text-blue-600 hover:underline">
          ← 返回缓存测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Data Cache（数据缓存）测试</h1>

      {/* 说明 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">📦 什么是 Data Cache？</h2>
        <p className="text-sm text-gray-700 mb-3">
          Data Cache 是 Next.js 对 fetch 请求结果的持久化缓存。 默认情况下，所有
          fetch 请求都会被缓存，除非明确指定不缓存。
        </p>
        <div className="bg-white rounded p-4 text-xs font-mono mb-3">
          <p className="mb-2">
            <strong>默认行为：</strong>
          </p>
          <code className="text-green-600">
            fetch(url, {`{ cache: 'force-cache' }`})
          </code>
        </div>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-3">
          <p className="text-sm font-semibold text-orange-800 mb-2">
            ⚠️ 关键概念：Dynamic APIs 与 fetch 缓存行为
          </p>
          <div className="text-xs text-gray-700 space-y-2">
            <p>
              <strong>
                本页面使用了 Dynamic API（`cache:
                'no-store'`），因此是动态页面。
              </strong>
            </p>
            <p>
              在动态页面中，fetch 的默认行为是{' '}
              <code className="bg-orange-100 px-1 rounded">auto no cache</code>
              ：
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>开发环境：每次都重新请求</li>
              <li>
                生产环境：构建时请求一次，但检测到 Dynamic APIs
                后会回退到每次请求
              </li>
            </ul>
            <p className="font-semibold text-orange-900 mt-2">
              💡 解决方案：必须显式指定{' '}
              <code className="bg-orange-100 px-1 rounded">
                cache: 'force-cache'
              </code>{' '}
              才能缓存！
            </p>
          </div>
        </div>
        <div className="bg-yellow-100 border border-yellow-300 rounded p-3 text-xs">
          <p className="mb-2">
            <strong>💡 本页面测试：</strong>
          </p>
          <p className="text-gray-700">
            使用内部的{' '}
            <code className="bg-yellow-200 px-1 rounded">/api/time</code> API
            来演示真实的 fetch 缓存行为。 通过对比 API
            返回的时间戳，可以直观地看到缓存是否生效。
            <br />
            <strong>关键：</strong>三个测试都调用同一个 API（{getApiUrl()}
            ），但使用不同的缓存策略。
          </p>
        </div>
      </div>

      {/* 页面渲染时间 */}
      <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 mb-6">
        <p className="text-sm">
          <strong>📅 页面渲染时间：</strong>
          <span className="ml-2 font-mono text-purple-700">
            {pageRenderTime}
          </span>
        </p>
        <p className="text-xs text-gray-600 mt-2">
          刷新页面观察此时间是否变化。在生产环境（pnpm build && pnpm start）中，
          如果使用了 Full Route Cache，这个时间不会变化。
        </p>
      </div>

      {/* 测试 1: 默认缓存 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-green-700">
          ✅ 测试 1：默认缓存（force-cache）
        </h2>
        <div className="bg-gray-50 rounded p-4 mb-4">
          <code className="text-sm">{`fetch(url) // 默认会缓存`}</code>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <strong>API 返回时间：</strong>
            <span className="ml-2 font-mono text-blue-600">
              {defaultCacheData.apiTime}
            </span>
          </p>
          <p>
            <strong>Fetch 执行时间：</strong>
            <span className="ml-2 font-mono text-blue-600">
              {defaultCacheData.fetchedAt}
            </span>
          </p>
          {'error' in defaultCacheData && (
            <p className="text-xs text-orange-600">
              ⚠️ {defaultCacheData.error}
            </p>
          )}
        </div>
        <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-3">
          <p className="text-xs text-green-800">
            <strong>✅ 预期行为：</strong>
            多次刷新页面，这两个时间应该<strong>保持不变</strong>
            （使用了缓存）。
            <br />
            在生产环境（pnpm build && pnpm
            start）中，即使重启服务器，缓存也会持久化。
          </p>
        </div>
      </div>

      {/* 测试 2: 禁用缓存 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-red-700">
          🔴 测试 2：禁用缓存（no-store）
        </h2>
        <div className="bg-gray-50 rounded p-4 mb-4">
          <code className="text-sm">
            {`fetch(url, { cache: 'no-store' }) // 每次都重新请求`}
          </code>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <strong>API 返回时间：</strong>
            <span className="ml-2 font-mono text-red-600">
              {noStoreData.apiTime}
            </span>
          </p>
          <p>
            <strong>Fetch 执行时间：</strong>
            <span className="ml-2 font-mono text-red-600">
              {noStoreData.fetchedAt}
            </span>
          </p>
          {'error' in noStoreData && (
            <p className="text-xs text-orange-600">⚠️ {noStoreData.error}</p>
          )}
        </div>
        <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-3">
          <p className="text-xs text-red-800">
            <strong>🔴 预期行为：</strong>
            每次刷新页面，这两个时间应该<strong>都会变化</strong>
            （没有使用缓存）。
            <br />
            适用场景：实时数据、用户相关数据、每次都需要最新数据的场景。
          </p>
        </div>
      </div>

      {/* 测试 3: 定时重新验证 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-orange-700">
          🔄 测试 3：定时重新验证（revalidate）
        </h2>
        <div className="bg-gray-50 rounded p-4 mb-4">
          <code className="text-sm">
            {`fetch(url, { next: { revalidate: 10 } }) // 10秒后重新验证`}
          </code>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <strong>API 返回时间：</strong>
            <span className="ml-2 font-mono text-orange-600">
              {revalidateData.apiTime}
            </span>
          </p>
          <p>
            <strong>Fetch 执行时间：</strong>
            <span className="ml-2 font-mono text-orange-600">
              {revalidateData.fetchedAt}
            </span>
          </p>
          {'error' in revalidateData && (
            <p className="text-xs text-orange-600">⚠️ {revalidateData.error}</p>
          )}
        </div>
        <div className="mt-4 bg-orange-50 border-l-4 border-orange-500 p-3">
          <p className="text-xs text-orange-800">
            <strong>🔄 预期行为：</strong>在 10 秒内刷新页面，Fetch 执行时间
            <strong>保持不变</strong>（使用 Data Cache）。
            <br />
            超过 10 秒后刷新，时间<strong>会更新</strong>（Data Cache
            重新验证）。
            <br />
            <br />
            <strong>⚠️ 注意：</strong>这是 <strong>Data Cache</strong> 的行为，
            不是页面级缓存。只有这个 fetch 请求被缓存，页面本身仍会重新渲染。
            <br />
            查看终端日志，你会看到每次刷新都有页面渲染日志，但 10 秒内不会重新
            fetch。
          </p>
        </div>
      </div>

      {/* 如何验证 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🧪 如何验证缓存？</h2>
        <ol className="space-y-3 text-sm">
          <li>
            <strong>1. 查看时间戳：</strong>
            <ul className="ml-4 mt-1 space-y-1 text-xs text-gray-600">
              <li>• 强制缓存（force-cache）：刷新页面，时间不变 ✅</li>
              <li>• 禁用缓存：刷新页面，时间变化 🔴</li>
              <li>
                • 定时重新验证（revalidate: 60）：60秒内不变，60秒后变化 🔄
              </li>
            </ul>
          </li>
          <li>
            <strong>2. 查看终端日志：</strong>
            <p className="text-xs text-gray-600 ml-4 mt-1">
              每次渲染页面时，终端会输出{' '}
              <code className="bg-gray-200 px-1 rounded">
                [DATA CACHE PAGE]
              </code>{' '}
              日志
            </p>
          </li>
          <li>
            <strong>3. 生产环境测试：</strong>
            <div className="ml-4 mt-1 bg-gray-100 rounded p-2">
              <code className="text-xs">pnpm build && pnpm start</code>
            </div>
            <p className="text-xs text-gray-600 ml-4 mt-1">
              在生产环境中，缓存行为更明显，且会持久化到文件系统
            </p>
          </li>
          <li>
            <strong>4. 查看网络请求：</strong>
            <p className="text-xs text-gray-600 ml-4 mt-1">
              打开浏览器开发者工具的 Network 标签，查看是否发起了新的网络请求
            </p>
          </li>
        </ol>
      </div>

      {/* 对比总结 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">📊 缓存策略对比</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">策略</th>
                <th className="px-4 py-2 text-left">代码</th>
                <th className="px-4 py-2 text-left">行为</th>
                <th className="px-4 py-2 text-left">使用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">默认缓存</td>
                <td className="px-4 py-2 font-mono text-xs">{`{ cache: 'force-cache' }`}</td>
                <td className="px-4 py-2">永久缓存</td>
                <td className="px-4 py-2">静态内容</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-2 font-semibold">禁用缓存</td>
                <td className="px-4 py-2 font-mono text-xs">{`{ cache: 'no-store' }`}</td>
                <td className="px-4 py-2">每次请求</td>
                <td className="px-4 py-2">实时数据</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">定时重新验证</td>
                <td className="px-4 py-2 font-mono text-xs">{`{ next: { revalidate: N } }`}</td>
                <td className="px-4 py-2">N秒后更新</td>
                <td className="px-4 py-2">定期更新内容</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
