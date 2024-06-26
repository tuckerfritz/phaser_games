import { type ClassValue, clsx } from "clsx";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useResizeObserver = (
  callback: ResizeObserverCallback,
  queryString: string,
) => {
  const resizeObserverRef = useRef<ResizeObserver>();
  useEffect(() => {
    if (resizeObserverRef.current === undefined) {
      resizeObserverRef.current = new ResizeObserver(callback);
      resizeObserverRef.current.observe(document.querySelector(queryString));
    }
    () => {
      return resizeObserverRef.current.disconnect();
    };
  }, []);
  return resizeObserverRef;
};
