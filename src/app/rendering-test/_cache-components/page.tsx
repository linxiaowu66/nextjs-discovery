import { Suspense } from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { cacheLife } from 'next/cache';

/**
 * Cache Components (Partial Prerendering) 测试
 * 
 * Next.js 16 的新特性，允许在同一路由中混合：
 * 1. 静态内容（自动预渲染）
 * 2. 缓存的动态内容（使用 'use cache' 指令）
 * 3. 运行时动态内容（使用 Suspense 延迟渲染）
 * 
 * 需要在 next.config.ts 中启用：cacheComponents: true
 */

// 静态内容 - 自动预渲染到静态 shell
function StaticHeader() {
  console.log('[STATIC] Header 组件渲染');
  return (
    <header className="bg-blue-50 border-b-2 border-blue-300 p-6 mb-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-2">📄 静态头部</h1>
      <p className="text-sm text-gray-600">
        这是静态内容，会自动预渲染到 HTML shell 中
      </p>
      <nav className="mt-4 space-x-4">
        <Link href="/rendering-test" className="text-blue-600 hover:underline">
          返回测试
        </Link>
        <Link href="/" className="text-blue-600 hover:underline">
          首页
        </Link>
      </nav>
    </header>
  );
}

// 缓存的动态内容 - 使用 'use cache' 指令
async function CachedBlogPosts() {
  'use cache';
  cacheLife('hours'); // 缓存 1 小时
  
  console.log('[CACHED] 获取博客文章（每小时更新）');
  
  // 模拟 API 请求
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const posts = [
    { id: 1, title: '理解 Cache Components', author: 'Next.js Team', date: '2024-11-05' },
    { id: 2, title: 'Partial Prerendering 深度解析', author: 'Vercel', date: '2024-11-04' },
    { id: 3, title: 'use cache 指令使用指南', author: 'React Team', date: '2024-11-03' },
  ];
  
  return (
    <section className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-green-800 mb-4">
        🗂️ 缓存的博客文章
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        使用 <code className="bg-gray-200 px-1 rounded">&apos;use cache&apos;</code> 指令，
        这些数据被缓存并包含在静态 shell 中（缓存 1 小时）
      </p>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="bg-white rounded p-4">
            <h3 className="font-semibold text-gray-800">{post.title}</h3>
            <p className="text-xs text-gray-600 mt-1">
              作者：{post.author} | 日期：{post.date}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-4 bg-green-100 border-l-4 border-green-500 p-3">
        <p className="text-xs text-green-800">
          <strong>✅ 特性：</strong>
          <br />• 包含在静态 shell 中（即时加载）
          <br />• 每小时自动重新验证
          <br />• 所有用户看到相同内容
        </p>
      </div>
    </section>
  );
}

// 运行时动态内容 - 使用 Suspense 延迟到请求时
async function UserPreferences() {
  console.log('[DYNAMIC] 获取用户偏好设置');
  
  // 访问运行时数据（cookies）
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';
  const language = cookieStore.get('language')?.value || 'zh-CN';
  
  // 模拟获取用户数据
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return (
    <aside className="bg-purple-50 border border-purple-300 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-purple-800 mb-4">
        👤 用户偏好设置
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        这是运行时动态内容，使用 <code className="bg-gray-200 px-1 rounded">Suspense</code> 延迟渲染
      </p>
      <div className="bg-white rounded p-4 space-y-2 text-sm">
        <p>
          <strong>主题：</strong> {theme}
        </p>
        <p>
          <strong>语言：</strong> {language}
        </p>
        <p>
          <strong>渲染时间：</strong> {new Date().toISOString()}
        </p>
      </div>
      <div className="mt-4 bg-purple-100 border-l-4 border-purple-500 p-3">
        <p className="text-xs text-purple-800">
          <strong>🔄 特性：</strong>
          <br />• 在请求时渲染（个性化）
          <br />• 访问用户 cookies
          <br />• 显示 fallback UI 直到准备就绪
        </p>
      </div>
    </aside>
  );
}

// Loading 组件
function UserPreferencesLoading() {
  return (
    <aside className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-6 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
    </aside>
  );
}

export default function CacheComponentsPage() {
  console.log('\n========== Cache Components 页面渲染 ==========');
  
  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* 1. 静态内容 - 自动预渲染 */}
      <StaticHeader />
      
      {/* 说明 */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-yellow-800">
          ⚡ 什么是 Cache Components？
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          Cache Components（也叫 Partial Prerendering）是 Next.js 16 的新特性，
          允许在<strong>同一个路由</strong>中混合三种内容：
        </p>
        <div className="bg-white rounded p-4 text-xs space-y-3">
          <div>
            <p className="font-semibold mb-1">1️⃣ 静态内容</p>
            <p className="text-gray-700">
              不访问网络、不使用运行时数据 → <strong>自动预渲染</strong>到静态 HTML shell
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">2️⃣ 缓存的动态内容</p>
            <p className="text-gray-700">
              使用 <code className="bg-gray-200 px-1 rounded">&apos;use cache&apos;</code> 指令 +{' '}
              <code className="bg-gray-200 px-1 rounded">cacheLife()</code> → 包含在静态 shell 中
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">3️⃣ 运行时动态内容</p>
            <p className="text-gray-700">
              使用 <code className="bg-gray-200 px-1 rounded">&lt;Suspense&gt;</code> +{' '}
              fallback UI → 在请求时流式渲染
            </p>
          </div>
        </div>
      </div>
      
      {/* 2. 缓存的动态内容 - 使用 'use cache' */}
      <CachedBlogPosts />
      
      {/* 3. 运行时动态内容 - 使用 Suspense */}
      <Suspense fallback={<UserPreferencesLoading />}>
        <UserPreferences />
      </Suspense>
      
      {/* 工作原理 */}
      <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          🔍 Cache Components 工作原理
        </h2>
        <div className="space-y-4 text-sm">
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">构建时（Build Time）</h3>
            <div className="bg-gray-100 rounded p-3 font-mono text-xs">
              <pre>{`Next.js 渲染组件树
  ↓
识别可预渲染的内容
  ├─ 静态内容 → 加入 HTML shell
  ├─ 'use cache' 内容 → 执行并缓存到 shell
  └─ Suspense 内容 → 添加 fallback 到 shell
  ↓
生成静态 HTML shell + RSC Payload`}</pre>
            </div>
          </div>
          
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">请求时（Request Time）</h3>
            <div className="bg-gray-100 rounded p-3 font-mono text-xs">
              <pre>{`用户访问页面
  ↓
立即返回静态 HTML shell
  ├─ 静态头部 ✅（已在 HTML 中）
  ├─ 缓存的博客 ✅（已在 HTML 中）
  └─ 用户偏好 ⏳（显示 fallback）
  ↓
并行渲染 Suspense 内容
  ↓
流式更新 UI（Streaming）`}</pre>
            </div>
          </div>
        </div>
      </div>
      
      {/* 对比传统方式 */}
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">⚖️ Cache Components vs 传统方式</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">方式</th>
                <th className="px-4 py-2 text-left">TTFB</th>
                <th className="px-4 py-2 text-left">内容新鲜度</th>
                <th className="px-4 py-2 text-left">个性化</th>
                <th className="px-4 py-2 text-left">权衡</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">纯静态 (SSG)</td>
                <td className="px-4 py-2">⭐⭐⭐⭐⭐</td>
                <td className="px-4 py-2">❌ 陈旧</td>
                <td className="px-4 py-2">❌ 无</td>
                <td className="px-4 py-2">快但旧</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-4 py-2 font-semibold">纯动态 (SSR)</td>
                <td className="px-4 py-2">⭐⭐</td>
                <td className="px-4 py-2">✅ 最新</td>
                <td className="px-4 py-2">✅ 完全</td>
                <td className="px-4 py-2">慢但新</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">客户端渲染 (CSR)</td>
                <td className="px-4 py-2">⭐⭐⭐</td>
                <td className="px-4 py-2">✅ 实时</td>
                <td className="px-4 py-2">✅ 完全</td>
                <td className="px-4 py-2">Bundle 大</td>
              </tr>
              <tr className="border-t bg-green-50">
                <td className="px-4 py-2 font-semibold">Cache Components ⚡</td>
                <td className="px-4 py-2">⭐⭐⭐⭐⭐</td>
                <td className="px-4 py-2">✅ 可控</td>
                <td className="px-4 py-2">✅ 完全</td>
                <td className="px-4 py-2">🎯 最优</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 启用方法 */}
      <div className="bg-red-50 border border-red-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-red-800">
          ⚙️ 如何启用 Cache Components？
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          在 <code className="bg-gray-200 px-1 rounded">next.config.ts</code> 中启用：
        </p>
        <div className="bg-gray-900 text-gray-100 rounded p-4 text-xs font-mono overflow-x-auto">
          <pre>{`// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true, // ⚠️ 启用 Cache Components
}

export default nextConfig`}</pre>
        </div>
        <div className="mt-4 bg-red-100 border-l-4 border-red-500 p-3">
          <p className="text-xs text-red-800">
            <strong>⚠️ 注意：</strong>
            <br />• Cache Components 是一个 opt-in 特性
            <br />• 需要手动在配置中启用
            <br />• 启用后，默认使用 Partial Prerendering 模式
          </p>
        </div>
      </div>
      
      {/* 代码示例 */}
      <div className="bg-purple-50 border border-purple-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-purple-800">
          💻 完整代码示例
        </h2>
        <div className="bg-gray-900 text-gray-100 rounded p-4 text-xs font-mono overflow-x-auto">
          <pre>{`import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { cacheLife } from 'next/cache'

export default function Page() {
  return (
    <>
      {/* 1. 静态内容 - 自动预渲染 */}
      <header>
        <h1>My Blog</h1>
        <nav>
          <a href="/">Home</a> | <a href="/about">About</a>
        </nav>
      </header>

      {/* 2. 缓存的动态内容 - 使用 'use cache' */}
      <BlogPosts />

      {/* 3. 运行时动态内容 - 使用 Suspense */}
      <Suspense fallback={<p>Loading preferences...</p>}>
        <UserPreferences />
      </Suspense>
    </>
  )
}

// 缓存的博客文章（所有用户看到相同内容，每小时更新）
async function BlogPosts() {
  'use cache'           // ⚠️ 关键：使用 'use cache' 指令
  cacheLife('hours')    // 缓存 1 小时
  
  const res = await fetch('https://api.vercel.app/blog')
  const posts = await res.json()
  
  return (
    <section>
      <h2>Latest Posts</h2>
      {posts.map(post => (
        <article key={post.id}>
          <h3>{post.title}</h3>
        </article>
      ))}
    </section>
  )
}

// 个性化用户偏好（基于 cookies）
async function UserPreferences() {
  const theme = (await cookies()).get('theme')?.value
  const category = (await cookies()).get('category')?.value
  
  return (
    <aside>
      <p>Theme: {theme}</p>
      <p>Favorite: {category}</p>
    </aside>
  )
}`}</pre>
        </div>
      </div>
      
      {/* 关键 API */}
      <div className="bg-green-50 border border-green-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-800">
          📚 关键 API 和指令
        </h2>
        <div className="space-y-4 text-sm">
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">
              <code className="bg-gray-200 px-2 py-1 rounded">&apos;use cache&apos;</code>
            </h3>
            <p className="text-xs text-gray-700 mb-2">
              在函数或组件顶部使用，标记该作用域的内容应该被缓存
            </p>
            <div className="bg-gray-100 rounded p-2 font-mono text-xs">
              async function MyComponent() {'{'}
              <br />
              &nbsp;&nbsp;&apos;use cache&apos;
              <br />
              &nbsp;&nbsp;// ... 这里的数据获取会被缓存
              <br />
              {'}'}
            </div>
          </div>
          
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">
              <code className="bg-gray-200 px-2 py-1 rounded">cacheLife()</code>
            </h3>
            <p className="text-xs text-gray-700 mb-2">
              定义缓存时长，可选值：&apos;seconds&apos;, &apos;minutes&apos;, &apos;hours&apos;, &apos;days&apos;, &apos;weeks&apos;, &apos;max&apos;
            </p>
            <div className="bg-gray-100 rounded p-2 font-mono text-xs">
              cacheLife(&apos;hours&apos;)&nbsp;&nbsp;// 缓存 1 小时
              <br />
              cacheLife(&apos;days&apos;)&nbsp;&nbsp;&nbsp;// 缓存 1 天
              <br />
              cacheLife(&apos;max&apos;)&nbsp;&nbsp;&nbsp;&nbsp;// 最长缓存
            </div>
          </div>
          
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">
              <code className="bg-gray-200 px-2 py-1 rounded">cacheTag()</code>
            </h3>
            <p className="text-xs text-gray-700 mb-2">
              为缓存添加标签，用于按需重新验证
            </p>
            <div className="bg-gray-100 rounded p-2 font-mono text-xs">
              import {'{'}cacheTag{'}'} from &apos;next/cache&apos;
              <br />
              cacheTag(&apos;blog-posts&apos;)
            </div>
          </div>
          
          <div className="bg-white rounded p-4">
            <h3 className="font-semibold mb-2">
              <code className="bg-gray-200 px-2 py-1 rounded">revalidateTag()</code>
            </h3>
            <p className="text-xs text-gray-700 mb-2">
              按需重新验证带有特定标签的缓存
            </p>
            <div className="bg-gray-100 rounded p-2 font-mono text-xs">
              import {'{'}revalidateTag{'}'} from &apos;next/cache&apos;
              <br />
              revalidateTag(&apos;blog-posts&apos;)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

