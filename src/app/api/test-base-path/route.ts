import { NextResponse } from 'next/server';

/**
 * 测试 basePath 对 API 路由的影响
 */
export async function GET() {
  return NextResponse.json({
    message: 'API route works!',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || 'not configured',
    timestamp: new Date().toISOString(),
  });
}

