import Image from 'next/image';
import Link from 'next/link';

/**
 * Image Cache 测试页面
 * 测试 Next.js Image 组件的缓存和优化行为
 */

export default function ImageCachePage() {
  const pageRenderTime = new Date().toISOString();
  
  console.log('[IMAGE CACHE PAGE] 页面渲染时间:', pageRenderTime);

  // 使用 Unsplash API 作为远程图片源（添加时间戳参数模拟动态图片）
  const timestamp = Date.now();
  const randomImageUrl = `https://picsum.photos/seed/${timestamp}/800/600`;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/cache-test" className="text-blue-600 hover:underline">
          ← 返回缓存测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Image Cache（图片缓存）测试</h1>

      {/* 说明 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">🖼️ Next.js 图片缓存机制</h2>
        <div className="space-y-3 text-sm">
          <p className="text-gray-700">
            Next.js 的 Image 组件提供了强大的图片优化和缓存功能：
          </p>
          <ul className="space-y-2 text-gray-700 list-disc list-inside ml-4">
            <li>
              <strong>自动优化：</strong>自动转换为 WebP 等现代格式，压缩图片大小
            </li>
            <li>
              <strong>响应式加载：</strong>根据设备大小加载合适尺寸的图片
            </li>
            <li>
              <strong>懒加载：</strong>默认启用懒加载，只在需要时加载图片
            </li>
            <li>
              <strong>缓存优化：</strong>优化后的图片会被缓存在服务器端（生产环境）
            </li>
          </ul>
        </div>
      </div>

      {/* 页面渲染时间 */}
      <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 mb-6">
        <p className="text-sm">
          <strong>📅 页面渲染时间：</strong>
          <span className="ml-2 font-mono text-purple-700">{pageRenderTime}</span>
        </p>
      </div>

      <div className="space-y-6">
        {/* 测试 1: 本地静态图片 */}
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            📦 测试 1：本地静态图片（构建时优化）
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            本地图片在构建时会被自动优化和缓存，生成多个不同尺寸的版本。
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-2">
                <strong>原始图片：</strong>next.svg（使用 img 标签）
              </p>
              <div className="bg-gray-100 p-4 rounded flex items-center justify-center h-40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/next.svg"
                  alt="Next.js Logo (原始)"
                  className="h-20"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ❌ 无优化、无缓存、无响应式
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-2">
                <strong>优化图片：</strong>next.svg（使用 Image 组件）
              </p>
              <div className="bg-gray-100 p-4 rounded flex items-center justify-center h-40">
                <Image
                  src="/next.svg"
                  alt="Next.js Logo (优化)"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ✅ 自动优化、缓存、响应式
              </p>
            </div>
          </div>
        </div>

        {/* 测试 2: 远程图片 - priority */}
        <div className="bg-green-50 border border-green-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            🌐 测试 2：远程图片 - Priority（立即加载）
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            使用 <code className="bg-gray-200 px-1 rounded">priority</code>{' '}
            属性的图片会立即加载，不使用懒加载。适用于 LCP 图片。
          </p>
          <div className="bg-white p-4 rounded">
            <Image
              src="https://picsum.photos/seed/priority/800/400"
              alt="Priority Image"
              width={800}
              height={400}
              priority
              className="w-full h-auto rounded"
            />
          </div>
          <div className="mt-4 bg-green-100 rounded p-3">
            <p className="text-xs text-green-800">
              <strong>✅ 预期行为：</strong>
            </p>
            <ul className="text-xs text-gray-700 mt-2 space-y-1 ml-4 list-disc">
              <li>图片立即加载，不等待滚动到视口</li>
              <li>第一次访问：从远程服务器下载并优化</li>
              <li>
                再次访问：从 Next.js 缓存中加载（检查 Network 面板的
                304 状态码或 disk cache）
              </li>
              <li>自动转换为 WebP 格式（如果浏览器支持）</li>
            </ul>
          </div>
        </div>

        {/* 测试 3: 远程图片 - lazy loading */}
        <div className="bg-orange-50 border border-orange-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-orange-700">
            🔄 测试 3：远程图片 - Lazy Loading（懒加载）
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            默认情况下，Image 组件使用懒加载，只在图片进入视口时才加载。
          </p>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-4 rounded">
                <p className="text-xs text-gray-600 mb-2">
                  懒加载图片 #{i}（滚动到这里才会加载）
                </p>
                <Image
                  src={`https://picsum.photos/seed/lazy${i}/800/300`}
                  alt={`Lazy Loaded Image ${i}`}
                  width={800}
                  height={300}
                  className="w-full h-auto rounded"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 bg-orange-100 rounded p-3">
            <p className="text-xs text-orange-800">
              <strong>🔄 预期行为：</strong>
            </p>
            <ul className="text-xs text-gray-700 mt-2 space-y-1 ml-4 list-disc">
              <li>图片只在滚动到视口时才加载（打开 Network 面板观察）</li>
              <li>减少初始页面加载时间</li>
              <li>节省带宽（未滚动到的图片不会加载）</li>
            </ul>
          </div>
        </div>

        {/* 测试 4: 动态图片（带时间戳） */}
        <div className="bg-red-50 border border-red-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-800">
            🔴 测试 4：动态图片（每次不同）
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            使用时间戳作为 seed，每次刷新页面都会显示不同的图片。
          </p>
          <div className="bg-white p-4 rounded">
            <p className="text-xs text-gray-600 mb-2">
              当前时间戳：{timestamp}
            </p>
            <Image
              src={randomImageUrl}
              alt="Random Image"
              width={800}
              height={400}
              className="w-full h-auto rounded"
            />
          </div>
          <div className="mt-4 bg-red-100 rounded p-3">
            <p className="text-xs text-red-800">
              <strong>🔴 预期行为：</strong>
            </p>
            <ul className="text-xs text-gray-700 mt-2 space-y-1 ml-4 list-disc">
              <li>每次刷新页面都会显示不同的图片</li>
              <li>即使使用 Image 组件，也会重新下载（URL 不同）</li>
              <li>适用于需要动态更新的图片场景</li>
            </ul>
          </div>
        </div>

        {/* 测试 5: 不同尺寸的响应式图片 */}
        <div className="bg-purple-50 border border-purple-300 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-800">
            📱 测试 5：响应式图片（不同设备尺寸）
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Next.js 自动生成多个尺寸的图片，根据设备大小加载合适的版本。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded">
              <p className="text-xs text-gray-600 mb-2">小尺寸 (300x200)</p>
              <Image
                src="https://picsum.photos/seed/small/300/200"
                alt="Small Image"
                width={300}
                height={200}
                className="w-full h-auto rounded"
              />
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-xs text-gray-600 mb-2">中尺寸 (600x400)</p>
              <Image
                src="https://picsum.photos/seed/medium/600/400"
                alt="Medium Image"
                width={600}
                height={400}
                className="w-full h-auto rounded"
              />
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-xs text-gray-600 mb-2">大尺寸 (1200x800)</p>
              <Image
                src="https://picsum.photos/seed/large/1200/800"
                alt="Large Image"
                width={1200}
                height={800}
                className="w-full h-auto rounded"
              />
            </div>
          </div>
          <div className="mt-4 bg-purple-100 rounded p-3">
            <p className="text-xs text-purple-800">
              <strong>📱 预期行为：</strong>
            </p>
            <ul className="text-xs text-gray-700 mt-2 space-y-1 ml-4 list-disc">
              <li>
                Next.js 生成多个尺寸：640w, 750w, 828w, 1080w, 1200w, 1920w,
                2048w, 3840w
              </li>
              <li>浏览器根据设备宽度和像素密度选择合适的尺寸</li>
              <li>
                移动设备加载小图，桌面设备加载大图（节省带宽和提升性能）
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 测试指南 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">🧪 如何验证图片缓存？</h2>
        <ol className="space-y-3 text-sm list-decimal list-inside">
          <li>
            <strong>打开浏览器开发者工具</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              打开 Network 面板，过滤 "Img" 类型
            </p>
          </li>
          <li>
            <strong>首次加载</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              观察图片请求，应该看到状态码 200（从服务器下载）
            </p>
          </li>
          <li>
            <strong>刷新页面</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              再次观察图片请求，应该看到：
              <br />• 状态码 304（Not Modified，使用浏览器缓存）
              <br />• 或显示 "disk cache"（从磁盘缓存加载）
              <br />• Size 显示 "from disk cache" 或很小的字节数
            </p>
          </li>
          <li>
            <strong>查看图片优化</strong>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              点击 Network 中的图片请求，查看 Response Headers：
              <br />• Content-Type: image/webp（自动转换为 WebP）
              <br />• Cache-Control: public, max-age=60, must-revalidate（缓存
              60 秒）
            </p>
          </li>
          <li>
            <strong>生产环境测试</strong>
            <div className="ml-6 mt-1 bg-gray-100 rounded p-2">
              <code className="text-xs">pnpm build && pnpm start</code>
            </div>
            <p className="text-xs text-gray-600 ml-6 mt-1">
              在生产环境中，图片优化会缓存到{' '}
              <code className="bg-gray-200 px-1 rounded">.next/cache/images</code>{' '}
              目录
            </p>
          </li>
        </ol>
      </div>

      {/* 技术细节 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">⚙️ 技术细节</h2>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">📊 图片缓存位置</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside ml-4">
              <li>
                <strong>开发环境：</strong>不缓存优化后的图片（每次都重新优化）
              </li>
              <li>
                <strong>生产环境：</strong>
                <code className="bg-gray-200 px-1 rounded">
                  .next/cache/images
                </code>{' '}
                目录
              </li>
              <li>
                <strong>浏览器缓存：</strong>根据 Cache-Control 响应头
                （默认 60 秒）
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🔧 自定义缓存配置</h3>
            <div className="bg-gray-100 rounded p-3 font-mono text-xs">
              <pre>{`// next.config.js
module.exports = {
  images: {
    minimumCacheTTL: 60,        // 缓存时间（秒）
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],    // 优化格式
    remotePatterns: [           // 允许的远程图片域名
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">💡 最佳实践</h3>
            <ul className="space-y-1 text-gray-700 list-disc list-inside ml-4">
              <li>
                LCP 图片使用{' '}
                <code className="bg-gray-200 px-1 rounded">priority</code>{' '}
                属性
              </li>
              <li>首屏以下的图片使用懒加载（默认）</li>
              <li>
                始终指定{' '}
                <code className="bg-gray-200 px-1 rounded">width</code> 和{' '}
                <code className="bg-gray-200 px-1 rounded">height</code>{' '}
                防止布局偏移
              </li>
              <li>本地图片优先（构建时优化，更快）</li>
              <li>
                远程图片在{' '}
                <code className="bg-gray-200 px-1 rounded">next.config.js</code>{' '}
                中配置域名
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

