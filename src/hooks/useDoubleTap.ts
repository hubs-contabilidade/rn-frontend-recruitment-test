import { useRef, useCallback } from "react";

export function useDoubleTap(onSingleTap: () => void, onDoubleTap: () => void, delay = 300) {
  const lastTap = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  return useCallback(() => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < delay) {
      clearTimeout(timer.current);
      lastTap.current = 0;
      onDoubleTap();
    } else {
      lastTap.current = now;
      timer.current = setTimeout(() => {
        onSingleTap();
        lastTap.current = 0;
      }, delay);
    }
  }, [onSingleTap, onDoubleTap, delay]);
}
