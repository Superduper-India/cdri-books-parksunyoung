"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";
import DetailSearchModal from "@/app/components/search/DetailSearchModal";
import SearchHistory from "@/app/components/search/SearchHistory";
import SearchInputField from "@/app/components/search/SearchInputField";
import { getSearchHistory, saveSearchHistory } from "@/lib/storage";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasTarget = searchParams.get("target") !== null;
  const searchQuery = searchParams.get("q") || "";

  // 상세 검색이면 query 초기화, 일반 검색이면 query 설정
  const [query, setQuery] = useState(hasTarget ? "" : searchQuery);
  const [showHistory, setShowHistory] = useState(false);
  const [showDetailSearch, setShowDetailSearch] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const detailSearchButtonRef = useRef<HTMLButtonElement>(null);

  // URL 파라미터 변경 시 query 업데이트
  useEffect(() => {
    if (hasTarget) {
      setQuery("");
    } else {
      setQuery(searchQuery);
    }
  }, [hasTarget, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node) &&
        showHistory
      ) {
        setShowHistory(false);
      }
    };

    if (showHistory) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHistory]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      const trimmedQuery = query.trim();
      saveSearchHistory(trimmedQuery);
      // 일반 검색 시 target 파라미터 제거
      router.push(`/?q=${encodeURIComponent(trimmedQuery)}`);
      setShowHistory(false);
    }
  };

  const handleInputFocus = () => {
    const history = getSearchHistory();

    if (history.length > 0) setShowHistory(true);
  };

  const handleHistorySelect = (selectedQuery: string) => {
    setQuery(selectedQuery);
    setShowHistory(false);
    saveSearchHistory(selectedQuery);
    router.push(`/?q=${encodeURIComponent(selectedQuery)}`);
  };

  return (
    <div className="flex items-center gap-2">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`relative flex-1 bg-bg-gray ${showHistory ? "rounded-t-4xl" : "rounded-4xl"}`}
      >
        <SearchInputField
          value={query}
          onChange={setQuery}
          onFocus={handleInputFocus}
        />
        <SearchHistory
          isOpen={showHistory}
          onSelect={handleHistorySelect}
          onClose={() => setShowHistory(false)}
        />
      </form>
      <div className="relative">
        <button
          ref={detailSearchButtonRef}
          type="button"
          onClick={() => setShowDetailSearch(!showDetailSearch)}
          className="h-[36px] cursor-pointer rounded-lg border border-border-gray bg-white px-4 font-medium text-sm text-text-subtitle transition-colors"
        >
          상세검색
        </button>
        <DetailSearchModal
          isOpen={showDetailSearch}
          onClose={() => setShowDetailSearch(false)}
          buttonRef={detailSearchButtonRef}
        />
      </div>
    </div>
  );
}
