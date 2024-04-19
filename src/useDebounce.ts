import { useEffect, useCallback, useRef } from "react";

// 防抖 Hook 的输出值类型
type DebounceReturn<T extends (...args: any[]) => any> = {
  run: T; // 防抖后的函数
  cancel: () => void; // 取消防抖并立即执行
};

// 防抖 Hook
function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 500 // 默认延迟时间为 500 毫秒
): DebounceReturn<T> {
  if (typeof func !== "function") {
    throw new Error(
      'useDebounce: The first argument "func" must be a function.'
    );
  }

  if (typeof delay !== "number" || delay < 0) {
    throw new Error(
      'useDebounce: The second argument "delay" must be a non-negative number.'
    );
  }

  const timerRef = useRef<NodeJS.Timeout | null>(null); // 使用 useRef 存储计时器

  // 封装回调函数使用 useCallback
  const debounceFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [delay, func]
  );

  // 取消防抖并立即执行
  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null; // 清除计时器并重置为 null
    }
  }, []);

  // 在组件卸载时调用清理函数，确保清理计时器
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return {
    run: debounceFunction as T,
    cancel,
  };
}

export default useDebounce;
