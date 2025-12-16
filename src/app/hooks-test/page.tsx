// 这是一个服务端组件（没有 'use client' 指令）
// 可以在服务端获取数据，不能使用任何 React hooks

import ClientComponentWithHooks from './components/client-component-with-hooks';
import ServerComponent from './server-component';

// 模拟从后端获取数据
async function getServerData() {
  // 模拟异步数据获取
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    title: 'React Hooks 执行时机测试',
    description: '验证哪些 hooks 会在服务端执行，哪些只在客户端执行',
    timestamp: new Date().toISOString(),
  };
}

export default async function HooksTestPage() {
  // 服务端组件可以在服务端获取数据
  const serverData = await getServerData();

  console.log('[SERVER COMPONENT] page.tsx executed on SERVER');
  console.log('[SERVER COMPONENT] Server data:', serverData);

  // 服务端组件不能使用任何 React hooks
  // 下面的代码会导致错误：
  // const [state, setState] = useState(0); // ❌ 错误！
  // useEffect(() => {}, []); // ❌ 错误！

  return (
    <div>
      <div className="bg-purple-50 border border-purple-300 rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">{serverData.title}</h1>
        <p className="text-gray-700 mb-2">{serverData.description}</p>
        <p className="text-sm text-gray-500">
          服务端数据获取时间: {serverData.timestamp}
        </p>
        <p className="text-sm text-purple-700 mt-4 font-semibold">
          ✅ 这是一个服务端组件（page.tsx），可以在服务端获取数据，不能使用任何
          React hooks
        </p>
      </div>

      {/* 引用客户端组件进行测试 */}
      <ClientComponentWithHooks />

      <ServerComponent />
    </div>
  );
}
