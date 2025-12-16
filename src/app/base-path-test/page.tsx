import Image from 'next/image';
import Link from 'next/link';

/**
 * 测试 basePath 和 assetPrefix 的影响
 */
export default function BasePathTestPage() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">basePath & assetPrefix 测试</h1>

      {/* 基本信息 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">配置信息</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>basePath:</strong>{' '}
            {process.env.NEXT_PUBLIC_BASE_PATH || '未配置'}
          </p>
          <p>
            <strong>assetPrefix:</strong>{' '}
            {process.env.NEXT_PUBLIC_ASSET_PREFIX || '未配置'}
          </p>
          <p className="text-gray-600 mt-2">
            当前页面路径:{' '}
            <code className="bg-gray-200 px-2 py-1 rounded">
              /base-path-test
            </code>
          </p>
        </div>
      </div>

      {/* 路由测试 */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">📍 路由测试</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold mb-2">
                Link 组件（自动处理 basePath）
              </p>
              <Link href="/" className="text-blue-600 hover:underline text-sm">
                → 回到首页 (/)
              </Link>
              <br />
              <Link
                href="/hooks-test"
                className="text-blue-600 hover:underline text-sm"
              >
                → Hooks 测试 (/hooks-test)
              </Link>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">
                普通 a 标签（需手动添加 basePath）
              </p>
              <a href="/" className="text-red-600 hover:underline text-sm">
                → 回到首页 (/) - ⚠️ 不会自动添加 basePath
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">🖼️ 图片测试</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold mb-2">Next.js Image 组件</p>
              <div className="bg-gray-100 p-4 rounded">
                <p className="text-xs text-gray-600 mb-2">
                  使用 public 目录下的图片
                </p>
                {/* 这个会自动处理 basePath，但 assetPrefix 不影响 */}
                <Image
                  src="/next.svg"
                  alt="Next.js Logo"
                  width={180}
                  height={37}
                  priority
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">普通 img 标签</p>
              <div className="bg-gray-100 p-4 rounded">
                <p className="text-xs text-red-600 mb-2">
                  ⚠️ 不会自动处理 basePath
                </p>
                <img
                  src="/next.svg"
                  alt="Next.js Logo"
                  style={{ width: 180, height: 37 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS 背景图测试 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">🎨 CSS 背景图测试</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold mb-2">
              内联样式 background-image
            </p>
            <div
              className="h-32 bg-gray-100 rounded"
              style={{
                backgroundImage: "url('/vercel.svg')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <p className="text-xs text-red-600 p-2">
                ⚠️ 不会自动处理 basePath 和 assetPrefix
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">Tailwind CSS 背景图</p>
            <div className="h-32 bg-[url('/vercel.svg')] bg-no-repeat bg-center bg-gray-100 rounded">
              <p className="text-xs text-red-600 p-2">
                ⚠️ 不会自动处理 basePath 和 assetPrefix
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 静态资源测试 */}
      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">📦 静态资源加载测试</h2>
        <div className="space-y-3 text-sm">
          <div className="bg-green-50 border border-green-300 rounded p-3">
            <p className="font-semibold text-green-800 mb-1">
              ✅ assetPrefix 会影响：
            </p>
            <ul className="list-disc list-inside space-y-1 text-green-700">
              <li>JS 文件（_next/static/chunks/*.js）</li>
              <li>CSS 文件（_next/static/css/*.css）</li>
              <li>其他构建产物（_next/ 目录下的文件）</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-300 rounded p-3">
            <p className="font-semibold text-red-800 mb-1">
              ❌ assetPrefix 不会影响：
            </p>
            <ul className="list-disc list-inside space-y-1 text-red-700">
              <li>Next.js Image 组件的 src（需要配置 loader）</li>
              <li>CSS 中的 url() 引用</li>
              <li>public 目录下的静态文件直接访问</li>
              <li>普通 img、video 等标签的 src</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 总结 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">⚠️ 重要提示</h2>
        <div className="space-y-2 text-sm">
          <div>
            <strong>basePath 影响范围：</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>所有页面路由（需使用 Link 组件或 useRouter）</li>
              <li>API 路由（需使用 fetch 时注意路径）</li>
              <li>Next.js Image 组件（自动处理）</li>
              <li>Rewrite 的 source 也会被影响</li>
            </ul>
          </div>
          <div className="mt-3">
            <strong>assetPrefix 影响范围：</strong>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
              <li>只影响 _next/ 目录下的构建产物（JS/CSS）</li>
              <li>不影响 public 目录下的静态资源</li>
              <li>不影响 Image 组件（除非配置 loader）</li>
              <li>不影响 CSS 中的 url() 引用</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
