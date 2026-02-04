"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getSearchHistory, removeSearchFromHistory } from "@/lib/storage";

interface SearchHistoryProps {
  isOpen: boolean;
  onSelect: (query: string) => void;
}

export default function SearchHistory({
  isOpen,
  onSelect,
}: SearchHistoryProps) {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const history = getSearchHistory();
    setSearchHistory(history);
  }, []);

  const handleSearchClick = (query: string) => {
    onSelect(query);
  };

  const handleDelete = (e: React.MouseEvent, query: string) => {
    e.stopPropagation();
    removeSearchFromHistory(query);
    setSearchHistory(prev => prev.filter(item => item !== query));
  };

  if (searchHistory.length === 0 || !isOpen) {
    return null;
  }

  return (
    <div
      className={`absolute top-full right-0 left-0 z-20 max-h-96 overflow-y-auto rounded-b-2xl bg-bg-gray py-2 transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ul className="space-y-1 pr-4 pl-10">
        {searchHistory.map(query => (
          <li
            key={query}
            className="flex items-center justify-between rounded-md px-2 py-1.5 transition-colors"
            onClick={() => handleSearchClick(query)}
          >
            <span className="flex-1 text-sm text-text-primary">{query}</span>
            <button
              type="button"
              onClick={e => handleDelete(e, query)}
              className="ml-2 flex h-5 w-5 items-center justify-center transition-opacity hover:opacity-70"
              aria-label={`${query} 검색 기록 삭제`}
            >
              <Image
                src="/delete.svg"
                alt="삭제"
                width={16}
                height={16}
                className="h-4 w-4"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
