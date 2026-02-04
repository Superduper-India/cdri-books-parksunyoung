"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import SearchOption from "@/app/components/search/SearchOption";
import {
  BUTTON_CLASSNAME,
  INPUT_CLASSNAME,
  SELECTED_CLASSNAME,
} from "@/lib/constant";

export type SearchTarget = "title" | "person" | "publisher";

interface DetailSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailSearchForm({
  isOpen,
  onClose,
}: DetailSearchModalProps) {
  const router = useRouter();
  const [selectedTarget, setSelectedTarget] = useState<SearchTarget>("title");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const trimmedQuery = searchQuery.trim();
      router.push(
        `/?target=${selectedTarget}&q=${encodeURIComponent(trimmedQuery)}`,
      );
      setSearchQuery("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex gap-2">
        {/* 검색 조건 드롭다운 */}
        <SearchOption
          isOpen={isOpen}
          selectedTarget={selectedTarget}
          setSelectedTarget={setSelectedTarget}
        />

        {/* 검색어 입력 필드 */}
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="검색어 입력"
            className={`h-10 px-2 ${SELECTED_CLASSNAME} ${INPUT_CLASSNAME}`}
          />
        </div>
      </div>

      {/* 검색하기 버튼 */}
      <button
        type="submit"
        className={`w-full bg-primary text-white ${BUTTON_CLASSNAME}`}
      >
        검색하기
      </button>
    </form>
  );
}
