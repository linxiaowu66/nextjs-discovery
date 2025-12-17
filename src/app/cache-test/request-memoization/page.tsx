import Link from 'next/link';
import { cache } from 'react';

/**
 * Request Memoization 测试页面
 * 演示在同一渲染周期内，相同的 fetch 请求会被自动去重
 *
 * 重要：Request Memoization 需要使用 React 的 cache() API
 */

// 创建一个带日志的 fetch 函数
let fetchCount = 0;

// ✅ 使用 React 的 cache() API 包装函数
// 这样才能启用 Request Memoization
const fetchData = cache(async (id: string) => {
  fetchCount++;
  const requestId = Math.random().toString(36).substring(7);

  console.log(
    `[FETCH #${fetchCount}] 发起请求 - ID: ${id}, RequestID: ${requestId}`
  );

  // 模拟网络请求延迟
  await new Promise((resolve) => setTimeout(resolve, 100));

  const now = new Date();

  console.log(
    `[FETCH #${fetchCount}] 请求完成 - ID: ${id}, RequestID: ${requestId}`
  );

  return {
    id,
    requestId,
    fetchNumber: fetchCount,
    datetime: now.toISOString(),
    fetchedAt: new Date().toISOString(),
  };
});

// 使用相同的 ID 来测试缓存
const DATA_ID = 'test-data';

// 组件 A - 发起相同的请求
async function ComponentA() {
  console.log('[ComponentA] 开始渲染');
  const data = await fetchData(DATA_ID); // ✅ 使用相同的 ID
  console.log('[ComponentA] 渲染完成');

  return (
    <div className="bg-blue-50 rounded p-4">
      <h3 className="font-semibold mb-2">组件 A</h3>
      <div className="text-xs space-y-1">
        <p>
          <strong>Fetch #:</strong> {data.fetchNumber}
        </p>
        <p>
          <strong>Request ID:</strong> {data.requestId}
        </p>
        <p>
          <strong>Time:</strong> {data.datetime}
        </p>
      </div>
    </div>
  );
}

// 组件 B - 发起相同的请求
async function ComponentB() {
  console.log('[ComponentB] 开始渲染');
  const data = await fetchData(DATA_ID); // ✅ 使用相同的 ID
  console.log('[ComponentB] 渲染完成');

  return (
    <div className="bg-green-50 rounded p-4">
      <h3 className="font-semibold mb-2">组件 B</h3>
      <div className="text-xs space-y-1">
        <p>
          <strong>Fetch #:</strong> {data.fetchNumber}
        </p>
        <p>
          <strong>Request ID:</strong> {data.requestId}
        </p>
        <p>
          <strong>Time:</strong> {data.datetime}
        </p>
      </div>
    </div>
  );
}

// 组件 C - 在同一个组件中多次调用
async function ComponentC() {
  console.log('[ComponentC] 开始渲染');

  // 在同一个组件中调用两次相同的请求
  const data1 = await fetchData(DATA_ID); // ✅ 使用相同的 ID
  const data2 = await fetchData(DATA_ID); // ✅ 使用相同的 ID

  console.log('[ComponentC] 渲染完成');

  return (
    <div className="bg-yellow-50 rounded p-4">
      <h3 className="font-semibold mb-2">组件 C（同一组件多次请求）</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-xs space-y-1">
          <p className="font-semibold">第 1 次调用：</p>
          <p>
            <strong>Fetch #:</strong> {data1.fetchNumber}
          </p>
          <p>
            <strong>Request ID:</strong> {data1.requestId}
          </p>
        </div>
        <div className="text-xs space-y-1">
          <p className="font-semibold">第 2 次调用：</p>
          <p>
            <strong>Fetch #:</strong> {data2.fetchNumber}
          </p>
          <p>
            <strong>Request ID:</strong> {data2.requestId}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function RequestMemoizationPage() {
  console.log('='.repeat(80));
  console.log('[REQUEST MEMOIZATION PAGE] 页面渲染开始');
  fetchCount = 0; // 重置计数器

  const pageRenderTime = new Date().toISOString();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/cache-test" className="text-blue-600 hover:underline">
          ← 返回缓存测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        Request Memoization（请求记忆化）测试
      </h1>

      {/* 说明 */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          🔄 什么是 Request Memoization？
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          Request Memoization 是 React 的一个功能，在
          <strong>单次渲染过程中</strong>自动去重相同的请求。
          即使多个组件请求相同的数据，实际上只会发起一次网络请求。
        </p>
        <div className="bg-white rounded p-4 text-xs mb-3">
          <p className="mb-2">
            <strong>关键特性：</strong>
          </p>
          <ul className="space-y-1 text-gray-700 list-disc list-inside">
            <li>自动去重：相同的请求在一次渲染中只执行一次</li>
            <li>生命周期：只在单次请求的渲染周期内有效</li>
            <li>跨组件：不同组件的相同请求会共享结果</li>
            <li>与 Data Cache 独立：即使禁用 Data Cache 也会生效</li>
          </ul>
        </div>
        <div className="bg-orange-100 border border-orange-300 rounded p-3 text-xs">
          <p className="mb-2">
            <strong>⚠️ 重要：需要使用 React 的 cache() API</strong>
          </p>
          <div className="bg-white rounded p-2 font-mono text-xs">
            <p className="text-blue-600">import {'{ cache }'} from 'react';</p>
            <p className="text-gray-600 mt-1">
              const getData = cache(async (url) ={'>'} {'{'}
            </p>
            <p className="text-gray-600 ml-4">return await fetch(url);</p>
            <p className="text-gray-600">{'}'});</p>
          </div>
          <p className="mt-2 text-gray-700">
            只有用 cache() 包装的函数才会启用 Request Memoization！
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
      </div>

      {/* 测试说明 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">🧪 测试场景</h2>
        <p className="text-sm text-gray-700 mb-3">
          下面有 3 个组件，它们都调用了{' '}
          <code className="bg-gray-200 px-1 rounded">fetchData(DATA_ID)</code>。
          因为使用了 <code className="bg-gray-200 px-1 rounded">cache()</code>{' '}
          API 包装， 所以虽然有 4 次调用（ComponentA、ComponentB、ComponentC
          两次）， 但实际只会执行<strong>一次</strong>函数逻辑。
        </p>
        <div className="bg-white rounded p-4 text-xs">
          <p className="mb-2">
            <strong>📋 查看验证方法：</strong>
          </p>
          <ol className="space-y-1 text-gray-700 list-decimal list-inside">
            <li>打开终端，查看服务端日志</li>
            <li>
              刷新页面，观察{' '}
              <code className="bg-gray-200 px-1 rounded">[FETCH #N]</code> 日志
            </li>
            <li>
              如果 Request Memoization 生效，你应该只看到<strong>一次</strong>{' '}
              FETCH 日志（[FETCH #1]）
            </li>
            <li>所有组件会共享同一个 Request ID 和 Fetch Number</li>
          </ol>
        </div>
      </div>

      {/* 组件展示 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">📦 组件渲染结果</h2>
        <p className="text-sm text-gray-600 mb-4">
          下面 3 个组件都请求了相同的 API，但实际只发起了一次网络请求：
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <ComponentA />
          <ComponentB />
        </div>

        <ComponentC />

        <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-3">
          <p className="text-xs text-green-800">
            <strong>✅ 预期结果：</strong>
            <br />
            所有组件的 <strong>Fetch #</strong> 和 <strong>Request ID</strong>{' '}
            应该相同， 证明它们共享了同一次请求的结果。
            <br />
            查看终端日志，应该只看到一次{' '}
            <code className="bg-gray-200 px-1 rounded">[FETCH]</code> 日志。
          </p>
        </div>
      </div>

      {/* 与 Data Cache 的区别 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          🔍 Request Memoization vs Data Cache
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">特性</th>
                <th className="px-4 py-2 text-left">Request Memoization</th>
                <th className="px-4 py-2 text-left">Data Cache</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">作用范围</td>
                <td className="px-4 py-2">单次渲染周期</td>
                <td className="px-4 py-2">跨请求持久化</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-2 font-semibold">生命周期</td>
                <td className="px-4 py-2">渲染完成后失效</td>
                <td className="px-4 py-2">持久化到文件系统</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">去重机制</td>
                <td className="px-4 py-2">同一渲染中的重复请求</td>
                <td className="px-4 py-2">不同请求之间的缓存</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-2 font-semibold">是否可禁用</td>
                <td className="px-4 py-2">❌ 无法禁用（React 内置）</td>
                <td className="px-4 py-2">✅ 可以禁用（cache: 'no-store'）</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">刷新页面</td>
                <td className="px-4 py-2">新的渲染周期，重新请求</td>
                <td className="px-4 py-2">使用缓存，不重新请求</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 实际应用 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💡 实际应用场景</h2>
        <div className="space-y-3 text-sm">
          <div className="bg-blue-50 rounded p-3">
            <h3 className="font-semibold mb-2">
              场景 1：多个组件需要同一份数据
            </h3>
            <p className="text-xs text-gray-600">
              例如：Header、Sidebar、Main 都需要显示用户信息。
              不需要担心重复请求，React 会自动去重。
            </p>
          </div>

          <div className="bg-green-50 rounded p-3">
            <h3 className="font-semibold mb-2">
              场景 2：父子组件都需要同一份数据
            </h3>
            <p className="text-xs text-gray-600">
              不需要通过 props 传递数据，每个组件都可以独立请求， React
              会确保只发起一次网络请求。
            </p>
          </div>

          <div className="bg-yellow-50 rounded p-3">
            <h3 className="font-semibold mb-2">场景 3：并行渲染的多个组件</h3>
            <p className="text-xs text-gray-600">
              使用 Suspense 并行渲染多个组件时，相同的请求会被自动去重，
              提高性能和减少网络请求。
            </p>
          </div>
        </div>
      </div>

      {/* 如何验证 */}
      <div className="bg-orange-50 border border-orange-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          🧪 如何验证 Request Memoization？
        </h2>
        <ol className="space-y-3 text-sm">
          <li>
            <strong>1. 查看终端日志：</strong>
            <p className="text-xs text-gray-600 ml-4 mt-1">
              刷新页面，查看有多少次{' '}
              <code className="bg-gray-200 px-1 rounded">[FETCH]</code> 日志。
              如果 Request Memoization 生效，应该只有一次。
            </p>
          </li>
          <li>
            <strong>2. 对比 Request ID：</strong>
            <p className="text-xs text-gray-600 ml-4 mt-1">
              页面上显示的所有 Request ID 应该相同，证明它们共享了同一次请求。
            </p>
          </li>
          <li>
            <strong>3. 查看网络面板：</strong>
            <p className="text-xs text-gray-600 ml-4 mt-1">
              打开浏览器开发者工具的 Network
              标签（注意：这里看不到服务端的网络请求）。
              在服务端，相同的请求只会发起一次。
            </p>
          </li>
          <li>
            <strong>4. 刷新页面：</strong>
            <p className="text-xs text-gray-600 ml-4 mt-1">
              每次刷新都是新的渲染周期，Request Memoization 会重置，
              所以每次刷新都会看到一次新的 FETCH 日志。
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
}
