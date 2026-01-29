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
      className={`overflow-hidden pr-6 pb-7 transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <ul className="space-y-1">
        {searchHistory.map((query, index) => (
          <li
            key={`${query}-${index}`}
            className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 pl-12 transition-colors"
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
