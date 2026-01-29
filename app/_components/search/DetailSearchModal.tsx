"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { BUTTON_CLASSNAME } from "@/lib/constant";

export type SearchTarget = "title" | "person" | "publisher";

interface DetailSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef:
    | React.RefObject<HTMLButtonElement | null>
    | React.RefObject<HTMLButtonElement>;
}

const searchOptions: { value: SearchTarget; label: string }[] = [
  { value: "title", label: "제목" },
  { value: "person", label: "저자명" },
  { value: "publisher", label: "출판사" },
];

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

  const handleOptionSelect = (target: SearchTarget) => {
    setSelectedTarget(target);
    setIsDropdownOpen(false);
  };

  const selectedOption = searchOptions.find(
    option => option.value === selectedTarget,
  );

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 z-50 mt-2 w-[400px]">
      <div
        ref={modalRef}
        className="rounded-lg bg-white px-6 py-9 shadow-lg"
        style={{
          boxShadow: "0px 4px 14px 6px #97979726",
        }}
      >
        {/* 헤더 - 닫기 버튼 */}
        <div className="absolute top-4 right-4">
          <button type="button" onClick={onClose}>
            <Image
              src="/delete.svg"
              alt="삭제"
              width={20}
              height={20}
              className="h-4 w-4"
            />
          </button>
        </div>

        {/* 검색 조건 및 입력 필드 */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-2">
            {/* 검색 조건 드롭다운 */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex h-10 min-w-[100px] items-center justify-between border-border-gray border-b-1 bg-white px-3 font-bold text-sm text-text-primary focus:outline-none"
              >
                <span>{selectedOption?.label}</span>
                <Image
                  src="/arrow-down.svg"
                  alt="펼침"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </button>

              {/* 드롭다운 메뉴 */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-b-lg border border-border-gray border-t-0 bg-white shadow-md">
                  {searchOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleOptionSelect(option.value)}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        selectedTarget === option.value
                          ? "bg-hover-gray text-text-primary"
                          : "text-text-primary hover:bg-hover-gray"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 검색어 입력 필드 */}
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="검색어 입력"
                className="h-10 w-full border-primary border-b-1 bg-transparent px-2 text-sm text-text-primary placeholder:text-text-subtitle focus:outline-none"
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
      </div>
    </div>
  );
}
