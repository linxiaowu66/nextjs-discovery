import { NextResponse } from 'next/server';

/**
 * 模拟时间 API
 * 用于测试缓存行为
 */
export async function GET() {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 100));

  const now = new Date();

  return NextResponse.json({
    datetime: now.toISOString(),
    timestamp: now.getTime(),
    timezone: 'Asia/Shanghai',
    unixtime: Math.floor(now.getTime() / 1000),
  });
}

// 禁用缓存，确保每次返回新的时间
// export const dynamic = 'force-dynamic';
