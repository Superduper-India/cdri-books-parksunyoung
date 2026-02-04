"use client";

import type React from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import type { BookDocument } from "@/app/types/book";
import { getFavoritesFromStorage, saveFavoritesToStorage } from "@/lib/storage";

// Context 타입 정의
export interface FavoriteContextType {
  favorites: BookDocument[];
  toggleFavorite: (book: BookDocument) => void;
  isFavorite: (isbn: string) => boolean;
}

export const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

// Provider 컴포넌트
export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<BookDocument[]>([]);

  // 클라이언트에서만 localStorage에서 초기값 로드
  useEffect(() => {
    const storedFavorites = getFavoritesFromStorage();
    setFavorites(storedFavorites);
  }, []);

  // 찜하기 토글
  const toggleFavorite = useCallback((book: BookDocument) => {
    const { isbn } = book;

    setFavorites(prev => {
      const existingIndex = prev.findIndex(fav => fav.isbn === isbn);
      let newFavorites: BookDocument[];

      if (existingIndex >= 0) {
        // 이미 있으면 제거
        newFavorites = prev.filter(fav => fav.isbn !== isbn);
      } else {
        // 없으면 추가
        newFavorites = [...prev, book];
      }
      saveFavoritesToStorage(newFavorites);
      return newFavorites;
    });
  }, []);

  // 찜하기 여부 확인
  const isFavorite = useCallback(
    (isbn: string) => favorites.some(fav => fav.isbn === isbn),
    [favorites],
  );

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}
