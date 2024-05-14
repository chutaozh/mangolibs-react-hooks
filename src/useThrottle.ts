import { useEffect, useCallback, useRef } from "react";

// 节流 Hook 的输出值类型
type UseThrottleType<T extends (...args: any[]) => any> = {
  run: T; // 节流后的函数
  cancel: () => void; // 取消节流并立即执行
};

// 节流 Hook
function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 500 // 默认延迟时间为 500 毫秒
): UseThrottleType<T> {
  if (typeof func !== "function") {
    throw new Error(
      'useThrottle: The first argument "func" must be a function.'
    );
  }

  if (typeof delay !== "number" || delay < 0) {
    throw new Error(
      'useThrottle: The second argument "delay" must be a non-negative number.'
    );
  }

  const timerRef = useRef<NodeJS.Timeout | null>(null); // 使用 useRef 存储计时器引用
  const lastExecTimeRef = useRef<number>(0); // 使用 useRef 存储上次执行的时间戳

  // 封装回调函数使用 useCallback
  const throttleFunction = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastExecTimeRef.current > delay) {
        // 距离上次执行时间超过延迟时间，则执行函数
        func(...args);
        lastExecTimeRef.current = now; // 更新上次执行时间
      } else {
        // 距离上次执行时间未超过延迟时间，则取消上一次计时器
        if (timerRef.current !== null) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        // 创建新的计时器，在延迟时间后执行函数
        timerRef.current = setTimeout(() => {
          func(...args);
          lastExecTimeRef.current = Date.now(); // 更新上次执行时间
        }, delay);
      }
    },
    [delay, func]
  );

  // 取消节流并立即执行
  const cancel = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null; // 清除计时器并重置为 null
      lastExecTimeRef.current = 0; // 重置上次执行时间
    }
  }, []);

  // 在组件卸载时调用清理函数，确保清理计时器
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return {
    run: throttleFunction as T,
    cancel,
  };
}

export default useThrottle;
