# React Hooks 执行时机测试

这个页面用于验证 React hooks 在 Next.js App Router 中的执行时机。

## 实际使用场景

在 Next.js App Router 中：

1. **`page.tsx`** 应该是服务端组件（没有 `'use client'` 指令）
   - 可以在服务端获取数据（async/await）
   - **不能使用任何 React hooks**

2. **客户端组件**（有 `'use client'` 指令）
   - 可以在 `page.tsx` 中引用
   - 会在服务端执行一次（SSR），生成完整的 HTML
   - 然后在客户端 hydration 时会再执行一次

3. **关键问题**：即使组件标记了 `'use client'`，它仍然会在服务端执行一次

## 测试目的

了解哪些 React hooks 会在服务端渲染时执行，哪些只在客户端执行，从而避免在服务端执行的 hooks 中使用 `window`、`document` 等浏览器 API。

## 测试结果总结

### ✅ 会在服务端执行的 Hooks（SSR）

这些 hooks 在服务端渲染时**会执行**，然后在客户端 hydration 时也会执行：

1. **useState** - 状态管理
2. **useReducer** - 复杂状态管理
3. **useRef** - 引用管理
4. **useMemo** - 值记忆化
5. **useCallback** - 函数记忆化
6. **useContext** - Context 消费
7. **useId** - 生成唯一 ID
8. **useSyncExternalStore** - 外部存储订阅

⚠️ **这些 hooks 在服务端执行，不能直接使用 window、document、localStorage 等浏览器 API**

### 🔵 只在客户端执行的 Hooks

这些 hooks **即使在服务端渲染时也不会执行**，只在客户端 hydration 后执行：

1. **useEffect** - 副作用处理
   - **即使空依赖 `[]` 也不会在服务端执行！**
2. **useLayoutEffect** - 同步副作用处理
   - **即使空依赖 `[]` 也不会在服务端执行！**

✅ **这些 hooks 只在客户端执行，可以安全使用 window、document 等浏览器 API**

## 关键发现

### useEffect 空依赖不会在服务端执行

**重要**：即使 `useEffect` 的依赖数组为空 `[]`，它也不会在服务端执行！

```tsx
'use client';

function Component() {
  // 这个会在服务端执行
  const [count, setCount] = useState(0);
  
  // 这个不会在服务端执行，即使依赖数组为空
  useEffect(() => {
    // 可以安全使用 window
    console.log(window.location.href);
  }, []); // 空依赖，但仍然不会在服务端执行
  
  return <div>{count}</div>;
}
```

## 如何验证

1. 启动开发服务器：`pnpm dev`
2. 访问 `/hooks-test` 页面
3. 打开浏览器控制台和终端，查看日志输出：
   - **终端**：会显示服务端执行的 hooks（SSR）
     - 会看到：`[SSR] useState executed on SERVER`
     - 会看到：`[SSR] useEffect (before) executed on SERVER`
     - **不会看到**：`[SSR] useEffect (inside) executed on SERVER`
   - **浏览器控制台**：会显示客户端执行的 hooks（CSR）
     - 会看到：`[CSR] useState executed on CLIENT`
     - 会看到：`[CLIENT ONLY] useEffect executed`

## 最佳实践

### ✅ 正确示例：page.tsx 作为服务端组件

```tsx
// page.tsx - 服务端组件（没有 'use client'）
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  // ✅ 可以在服务端获取数据
  const data = await getData();
  
  // ❌ 不能使用任何 hooks
  // const [state, setState] = useState(0); // 错误！
  
  return (
    <div>
      <h1>{data.title}</h1>
      {/* ✅ 可以引用客户端组件 */}
      <ClientComponent />
    </div>
  );
}
```

### ✅ 正确示例：客户端组件使用 hooks

```tsx
'use client';

function ClientComponent() {
  // ✅ useState 会在服务端执行，需要检查 window
  const [data, setData] = useState<string | null>(null);
  
  // ✅ useEffect 不会在服务端执行，可以安全使用 window
  useEffect(() => {
    // 可以安全使用 window
    setData(window.localStorage.getItem('key'));
  }, []); // 空依赖，但仍然不会在服务端执行
  
  // ❌ 错误：useMemo 会在服务端执行
  // const value = useMemo(() => {
  //   return window.innerWidth; // window 不存在
  // }, []);
  
  // ✅ 正确：在 useMemo 中检查 window
  const value = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    return window.innerWidth;
  }, []);
  
  return <div>{data}</div>;
}
```

### ❌ 错误示例

```tsx
'use client';

function Component() {
  // ❌ 错误：useState 会在服务端执行，window 不存在
  const [data, setData] = useState(window.localStorage.getItem('key'));
  
  // ❌ 错误：useMemo 会在服务端执行
  const value = useMemo(() => {
    return window.innerWidth; // window 不存在
  }, []);
  
  return <div>{data}</div>;
}
```

## 注意事项

1. **服务端组件**（没有 `'use client'` 指令）不能使用任何 React hooks
2. **客户端组件**（有 `'use client'` 指令）可以使用所有 hooks，但需要注意执行时机
3. **useEffect 和 useLayoutEffect** 即使在服务端渲染时也不会执行，即使依赖数组为空
4. 在服务端执行的 hooks 中使用浏览器 API 时，必须检查 `typeof window !== 'undefined'`
5. 优先使用 `useEffect` 来访问浏览器 API，因为它只在客户端执行

## 总结

| Hook | 服务端执行 | 客户端执行 | 可以使用浏览器 API |
|------|-----------|-----------|-------------------|
| useState | ✅ | ✅ | ❌（需检查 window） |
| useReducer | ✅ | ✅ | ❌（需检查 window） |
| useRef | ✅ | ✅ | ❌（需检查 window） |
| useMemo | ✅ | ✅ | ❌（需检查 window） |
| useCallback | ✅ | ✅ | ❌（需检查 window） |
| useContext | ✅ | ✅ | ❌（需检查 window） |
| useId | ✅ | ✅ | ❌（需检查 window） |
| useSyncExternalStore | ✅ | ✅ | ❌（需检查 window） |
| **useEffect** | ❌ | ✅ | ✅（安全） |
| **useLayoutEffect** | ❌ | ✅ | ✅（安全） |
