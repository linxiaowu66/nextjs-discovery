export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Next.js Discovery
        </h1>
        <p className="text-center mb-8">
          验证 Next.js 的缓存、服务端渲染、局部渲染等特性
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <a
            href="/hooks-test"
            className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">React Hooks 执行时机</h2>
            <p className="text-sm text-gray-600">
              验证哪些 hooks 在服务端执行，哪些只在客户端执行
            </p>
          </a>
          <a
            href="/base-path-test"
            className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">basePath & assetPrefix</h2>
            <p className="text-sm text-gray-600">探索 basePath 和 assetPrefix 的影响和坑</p>
          </a>
          <a
            href="/env-test"
            className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">环境变量</h2>
            <p className="text-sm text-gray-600">探索环境变量的加载和使用</p>
          </a>
        </div>
      </div>
    </main>
  );
}
