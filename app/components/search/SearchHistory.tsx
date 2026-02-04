"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getSearchHistory, removeSearchFromHistory } from "@/lib/storage";

interface SearchHistoryProps {
  isOpen: boolean;
  onSelect: (query: string) => void;
  onClose: () => void;
}

export default function SearchHistory({
  isOpen,
  onSelect,
  onClose,
}: SearchHistoryProps) {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSearchHistory(getSearchHistory());
    }
  }, [isOpen]);

  const handleSearchClick = (query: string) => {
    onSelect(query);
  };

  const handleDelete = (e: React.MouseEvent, query: string) => {
    e.stopPropagation();
    removeSearchFromHistory(query);
    setSearchHistory(prev => {
      const newHistory = prev.filter(item => item !== query);
      if (newHistory.length === 0) onClose();
      return newHistory;
    });
  };

  if (searchHistory.length === 0 || !isOpen) {
    return null;
  }

  return (
    <div
      className={`absolute top-full right-0 left-0 z-20 max-h-96 overflow-y-auto bg-bg-gray py-4 ${
        isOpen ? "display-block rounded-b-4xl" : "display-none"
      }`}
    >
      <ul className="space-y-1 pr-4 pl-10">
        {searchHistory.map(query => (
          <li
            key={query}
            className="flex cursor-pointer items-center justify-between px-2 py-1.5"
            onClick={() => handleSearchClick(query)}
          >
            <span className="flex-1 font-medium text-sm text-text-subtitle">
              {query}
            </span>
            <button
              type="button"
              onClick={e => handleDelete(e, query)}
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
