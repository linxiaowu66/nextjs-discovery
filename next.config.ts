import type { NextConfig } from 'next';

// 测试配置 - 可以通过环境变量控制
const basePath = process.env.BASE_PATH || ''; // 例如: '/my-app'
const assetPrefix = process.env.ASSET_PREFIX || ''; // 例如: 'https://cdn.example.com'

const nextConfig: NextConfig = {
  // 配置 basePath - 当应用部署到子路径时使用
  // 示例: basePath: '/my-app' 会让应用运行在 /my-app 路径下
  basePath: basePath || undefined,

  // 配置 assetPrefix - 当静态资源需要从 CDN 加载时使用
  // 示例: assetPrefix: 'https://cdn.example.com' 会让所有 _next/ 资源从 CDN 加载
  assetPrefix: assetPrefix || undefined,

  // 将配置暴露给客户端（可选，用于在客户端代码中访问）
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_ASSET_PREFIX: assetPrefix,
  },
};

export default nextConfig;
