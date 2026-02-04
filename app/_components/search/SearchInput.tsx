"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { saveSearchHistory } from "@/lib/storage";
import DetailSearchModal from "./DetailSearchModal";
import SearchHistory from "./SearchHistory";

export default function SearchInput() {
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
    setShowHistory(true);
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
        className={`relative flex-1 rounded-t-2xl bg-bg-gray ${
          showHistory ? "rounded-t-2xl" : "rounded-2xl"
        }`}
      >
        <div className="relative">
          <div className="-translate-y-1/2 absolute top-1/2 left-4">
            <Image
              src="/search_Icon.svg"
              alt="검색 아이콘"
              width={30}
              height={30}
            />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="검색어를 입력하세요"
            className="w-full rounded-lg bg-gray py-3 pr-4 pl-12 text-sm text-text-primary placeholder:text-text-subtitle focus:border-transparent focus:outline-none"
          />
        </div>
        <SearchHistory isOpen={showHistory} onSelect={handleHistorySelect} />
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
