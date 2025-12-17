import Link from 'next/link';
import { revalidatePath } from 'next/cache';

/**
 * On-Demand Revalidation (按需重新验证)
 * 
 * 手动触发页面重新生成，无需等待 revalidate 时间
 */

export const revalidate = false; // 不自动重新验证，只通过 API 触发

async function handleRevalidate() {
  'use server';
  
  console.log('[ON-DEMAND] 触发重新验证');
  revalidatePath('/rendering-test/on-demand');
}

export default async function OnDemandPage() {
  const renderTime = new Date().toISOString();
  console.log('[ON-DEMAND] 页面渲染时间:', renderTime);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/rendering-test" className="text-blue-600 hover:underline">
          ← 返回渲染测试
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">按需重新验证 (On-Demand)</h1>

      <div className="bg-pink-50 border border-pink-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-pink-800">
          🎯 什么是按需重新验证？
        </h2>
        <p className="text-sm text-gray-700">
          使用 <code>revalidatePath()</code> 或 <code>revalidateTag()</code> 手动触发页面重新生成，
          适用于内容更新后需要立即刷新的场景（如 CMS 更新、表单提交）。
        </p>
      </div>

      <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">📊 当前数据</h2>
        <div className="bg-pink-50 rounded p-3">
          <p className="text-sm">
            <strong>渲染时间：</strong>
            <span className="ml-2 font-mono text-pink-700">{renderTime}</span>
          </p>
          <p className="text-xs text-pink-600 mt-2">
            点击下面的按钮触发重新验证，然后刷新页面查看新时间
          </p>
        </div>
      </div>

      <form action={handleRevalidate} className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">🔄 触发重新验证</h2>
        <button 
          type="submit"
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          重新验证此页面
        </button>
        <p className="text-xs text-gray-600 mt-3">
          点击后，下一次访问此页面时会看到新的渲染时间
        </p>
      </form>

      <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">💻 代码示例</h2>
        <div className="bg-gray-900 text-gray-100 rounded p-4 text-xs font-mono overflow-x-auto">
          <pre>{`// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  
  if (path) {
    revalidatePath(path); // 重新验证路径
    return Response.json({ revalidated: true });
  }
  
  return Response.json({ revalidated: false });
}

// 使用示例
await fetch('http://localhost:3000/api/revalidate?path=/blog/post-1', {
  method: 'POST',
});`}</pre>
        </div>
      </div>
    </div>
  );
}

