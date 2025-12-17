/**
 * Layout 并行渲染测试 - Layout 部分
 * 
 * 这个 layout 会模拟一个慢速数据获取（2秒）
 */

async function fetchLayoutData() {
  const startTime = Date.now();
  console.log('[LAYOUT] 开始获取数据:', new Date().toISOString());
  
  // 模拟慢速数据获取（2秒）
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  console.log('[LAYOUT] 数据获取完成:', new Date().toISOString(), `耗时: ${duration}ms`);
  
  return {
    title: 'Layout Data',
    fetchTime: new Date().toISOString(),
    duration: duration,
  };
}

export default async function ParallelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layoutStartTime = Date.now();
  console.log('[LAYOUT] 开始渲染:', new Date().toISOString());
  
  // Layout 获取数据
  const layoutData = await fetchLayoutData();
  
  const layoutEndTime = Date.now();
  const layoutTotalTime = layoutEndTime - layoutStartTime;
  
  console.log('[LAYOUT] 渲染完成:', new Date().toISOString(), `总耗时: ${layoutTotalTime}ms`);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Layout 数据展示 */}
      <div className="bg-blue-50 border-b-2 border-blue-300 p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">
            🔵 Layout 数据（慢速：2秒）
          </h2>
          <div className="bg-white rounded p-4 text-sm">
            <p className="mb-2">
              <strong>数据获取时间：</strong>
              <span className="ml-2 font-mono text-blue-700">{layoutData.fetchTime}</span>
            </p>
            <p className="mb-2">
              <strong>数据获取耗时：</strong>
              <span className="ml-2 font-mono text-blue-700">{layoutData.duration}ms</span>
            </p>
            <p>
              <strong>Layout 总耗时：</strong>
              <span className="ml-2 font-mono text-blue-700">{layoutTotalTime}ms</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Page 内容 */}
      <div className="max-w-6xl mx-auto p-6">
        {children}
      </div>
    </div>
  );
}

