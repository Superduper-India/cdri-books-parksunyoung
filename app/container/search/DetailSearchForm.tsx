"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";
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
  buttonRef:
    | React.RefObject<HTMLButtonElement | null>
    | React.RefObject<HTMLButtonElement>;
}

export default function DetailSearchModal({
  isOpen,
  onClose,
  buttonRef,
}: DetailSearchModalProps) {
  const router = useRouter();
  const [selectedTarget, setSelectedTarget] = useState<SearchTarget>("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
        setIsDropdownOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  useEffect(() => {
    const handleDropdownClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleDropdownClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleDropdownClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const trimmedQuery = searchQuery.trim();
      router.push(
        `/?target=${selectedTarget}&q=${encodeURIComponent(trimmedQuery)}`,
      );
      setSearchQuery("");
      setIsDropdownOpen(false);
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
          onClose={onClose}
          buttonRef={buttonRef}
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
