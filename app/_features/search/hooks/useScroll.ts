"use client";

import { useCallback, useEffect, useState } from "react";
import { searchBookApi } from "@/app/_features/search/api/kakaoSearch.api";
import type {
  KakaoSearchResponse,
  SearchDocument,
} from "@/app/_features/search/types/Search";

interface UseScrollProps {
  initialData: KakaoSearchResponse | null;
  searchQuery: string;
}

export function useScroll({ initialData, searchQuery }: UseScrollProps) {
  const [documents, setDocuments] = useState<SearchDocument[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setDocuments(initialData.documents);
      setHasMore(!initialData.meta.is_end);
      setCurrentPage(1);
    }
  }, [initialData]);

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
