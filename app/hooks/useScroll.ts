"use client";

import { useCallback, useEffect, useState } from "react";
import { searchBookApi } from "@/app/api/search";
import type { BookDocument } from "@/app/types/book";

interface UseScrollProps {
  initialData: BookDocument[];
  searchQuery: string;
  isEnd: boolean;
}

export function useScroll({ initialData, searchQuery, isEnd }: UseScrollProps) {
  const [documents, setDocuments] = useState<BookDocument[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setDocuments(initialData);
      setHasMore(!isEnd);
      setCurrentPage(1);
    }
  }, [initialData, isEnd]);

  const loadMoreDocuments = useCallback(async () => {
    if (isLoading || !hasMore || !searchQuery) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await searchBookApi.fetchSearchWeb(
        searchQuery,
        "title",
        "accuracy",
        nextPage,
        10,
      );

      setDocuments(prev => [...prev, ...response.documents]);
      setHasMore(!response.meta.is_end);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Failed to load more documents:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, isLoading, hasMore, searchQuery]);

  return { documents, hasMore, loadMoreDocuments };
}
