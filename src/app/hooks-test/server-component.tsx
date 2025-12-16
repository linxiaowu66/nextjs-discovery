// 这是一个服务端组件（没有 'use client' 指令）
// 用于对比服务端和客户端组件的差异

export default function ServerComponent() {
  // 在服务端组件中，这些代码会在服务端执行
  // 注意：服务端组件在服务端渲染时执行，在客户端 hydration 时也可能执行
  console.log('[SERVER COMPONENT] This component is rendered');
  
  // 服务端组件不能使用任何 React hooks
  // 下面的代码会导致错误：
  // const [state, setState] = useState(0); // ❌ 错误！
  
  return (
    <div className="bg-purple-50 border border-purple-300 rounded-lg p-4 mt-4">
      <h3 className="font-semibold text-purple-800 mb-2">服务端组件示例</h3>
      <p className="text-sm text-gray-700">
        这是一个服务端组件（没有 'use client' 指令）
      </p>
      <p className="text-sm text-gray-700 mt-2">
        服务端组件在服务端渲染，不能使用任何 React hooks
      </p>
      <p className="text-xs text-gray-500 mt-2">
        ⚠️ 如果需要在服务端组件中使用浏览器 API，应该将其移到客户端组件中
      </p>
    </div>
  );
}

