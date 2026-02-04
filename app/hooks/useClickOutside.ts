"use client";

import { useEffect } from "react";

// Blur이벤트 핸들러 대신 이 훅을 사용
export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  callback: () => void,
  isActive: boolean,
) {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback, isActive]);
}
