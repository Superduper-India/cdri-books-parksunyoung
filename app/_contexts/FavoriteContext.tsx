"use client";

import type React from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import { getFavoritesFromStorage, saveFavoritesToStorage } from "@/lib/storage";

// Context 타입 정의
export interface FavoriteContextType {
  favorites: Set<string>;
  toggleFavorite: (isbn: string) => void;
  isFavorite: (isbn: string) => boolean;
}

export const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

// Provider 컴포넌트
export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // 클라이언트에서만 localStorage에서 초기값 로드
  useEffect(() => {
    const storedFavorites = getFavoritesFromStorage();
    setFavorites(storedFavorites);
  }, []);

  // 찜하기 토글
  const toggleFavorite = useCallback((isbn: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);

      if (newFavorites.has(isbn)) {
        newFavorites.delete(isbn);
      } else {
        newFavorites.add(isbn);
      }
      saveFavoritesToStorage(newFavorites);
      return newFavorites;
    });
  }, []);

  // 찜하기 여부 확인
  const isFavorite = useCallback(
    (isbn: string) => favorites.has(isbn),
    [favorites],
  );

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}
