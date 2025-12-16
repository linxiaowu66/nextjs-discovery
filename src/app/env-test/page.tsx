import Link from 'next/link';

/**
 * 服务端组件 - 测试环境变量
 * 可以访问所有环境变量（包括服务端专用的）
 */
export default function EnvTestPage() {
  // 服务端可以访问所有环境变量
  const serverEnvs = {
    // 服务端专用环境变量（不会暴露给浏览器）
    DATABASE_URL: process.env.DATABASE_URL,
    API_SECRET_KEY: process.env.API_SECRET_KEY,
    INTERNAL_API_URL: process.env.INTERNAL_API_URL,
    
    // 公共环境变量（会暴露给浏览器）
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    
    // Node.js 环境变量
    NODE_ENV: process.env.NODE_ENV,
  };

  // 服务端渲染时输出日志
  console.log('[SERVER] Environment variables:', serverEnvs);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">环境变量测试</h1>

      {/* 说明 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">🔍 测试说明</h2>
        <ul className="space-y-2 text-sm">
          <li>• 服务端组件可以访问所有环境变量</li>
          <li>• 客户端组件只能访问 NEXT_PUBLIC_ 开头的环境变量</li>
          <li>• 查看终端查看服务端日志</li>
          <li>• 查看浏览器控制台查看客户端日志</li>
        </ul>
      </div>

      {/* 服务端环境变量 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">📦 服务端环境变量（仅服务端可见）</h2>
        <div className="space-y-2 text-sm font-mono">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>DATABASE_URL:</strong>
              <p className="text-gray-600 break-all">
                {serverEnvs.DATABASE_URL || '未配置'}
              </p>
            </div>
            <div>
              <strong>API_SECRET_KEY:</strong>
              <p className="text-gray-600 break-all">
                {serverEnvs.API_SECRET_KEY || '未配置'}
              </p>
            </div>
            <div>
              <strong>INTERNAL_API_URL:</strong>
              <p className="text-gray-600 break-all">
                {serverEnvs.INTERNAL_API_URL || '未配置'}
              </p>
            </div>
            <div>
              <strong>NODE_ENV:</strong>
              <p className="text-gray-600">
                {serverEnvs.NODE_ENV}
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-red-600 mt-4">
          ⚠️ 这些环境变量不会暴露给浏览器，适合存储敏感信息
        </p>
      </div>

      {/* 公共环境变量 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🌐 公共环境变量（客户端可见）</h2>
        <div className="space-y-2 text-sm font-mono">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>NEXT_PUBLIC_API_URL:</strong>
              <p className="text-gray-600 break-all">
                {serverEnvs.NEXT_PUBLIC_API_URL || '未配置'}
              </p>
            </div>
            <div>
              <strong>NEXT_PUBLIC_APP_NAME:</strong>
              <p className="text-gray-600">
                {serverEnvs.NEXT_PUBLIC_APP_NAME || '未配置'}
              </p>
            </div>
            <div>
              <strong>NEXT_PUBLIC_ENVIRONMENT:</strong>
              <p className="text-gray-600">
                {serverEnvs.NEXT_PUBLIC_ENVIRONMENT || '未配置'}
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-green-600 mt-4">
          ✅ 这些环境变量会在构建时内联到 JavaScript bundle 中
        </p>
      </div>

      {/* 客户端组件测试 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">💻 客户端组件测试</h2>
        <p className="text-sm mb-4">
          点击下方链接查看客户端组件如何访问环境变量：
        </p>
        <Link
          href="/env-test/client"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          查看客户端组件测试
        </Link>
      </div>

      {/* API 测试 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🔌 API 路由测试</h2>
        <p className="text-sm mb-4">
          API 路由运行在服务端，可以访问所有环境变量
        </p>
        <a
          href="/api/env-test"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          测试 API 路由（新标签页打开）
        </a>
      </div>

      {/* 重要提示 */}
      <div className="bg-orange-50 border border-orange-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">⚠️ 重要注意事项</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>1. 构建时内联：</strong>
            NEXT_PUBLIC_ 开头的变量会在 next build 时内联到 JavaScript 中
          </li>
          <li>
            <strong>2. 敏感信息：</strong>
            永远不要使用 NEXT_PUBLIC_ 前缀存储敏感信息（API密钥、密码等）
          </li>
          <li>
            <strong>3. 修改后重启：</strong>
            修改 .env 文件后需要重启开发服务器
          </li>
          <li>
            <strong>4. 不要提交到 Git：</strong>
            .env.local 文件不应该提交到版本控制
          </li>
          <li>
            <strong>5. 加载顺序：</strong>
            .env.local → .env.[mode].local → .env.[mode] → .env
          </li>
        </ul>
      </div>
    </div>
  );
}

