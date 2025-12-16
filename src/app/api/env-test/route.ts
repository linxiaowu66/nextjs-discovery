import { NextResponse } from 'next/server';

/**
 * API 路由 - 测试环境变量
 * API 路由运行在服务端，可以访问所有环境变量
 */
export async function GET() {
  // 服务端可以访问所有环境变量
  const serverEnvs = {
    // 服务端专用环境变量
    DATABASE_URL: process.env.DATABASE_URL || 'not configured',
    API_SECRET_KEY: process.env.API_SECRET_KEY ? '***hidden***' : 'not configured',
    INTERNAL_API_URL: process.env.INTERNAL_API_URL || 'not configured',
    
    // 公共环境变量
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'not configured',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'not configured',
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'not configured',
    
    // Node.js 环境变量
    NODE_ENV: process.env.NODE_ENV,
  };

  console.log('[API Route] Accessed environment variables');
  console.log('[API Route] NODE_ENV:', process.env.NODE_ENV);

  return NextResponse.json({
    message: 'API Route can access all environment variables',
    timestamp: new Date().toISOString(),
    environment: serverEnvs,
    note: 'API_SECRET_KEY is hidden for security',
  });
}

