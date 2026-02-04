"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useClickOutside } from "@/app/hooks/useClickOutside";

export type SearchTarget = "title" | "person" | "publisher";

interface DetailSearchModalProps {
  isOpen: boolean;
  buttonRef:
    | React.RefObject<HTMLButtonElement | null>
    | React.RefObject<HTMLButtonElement>;
  selectedTarget: SearchTarget;
  setSelectedTarget: (target: SearchTarget) => void;
}

const searchOptions: { value: SearchTarget; label: string }[] = [
  { value: "title", label: "제목" },
  { value: "person", label: "저자명" },
  { value: "publisher", label: "출판사" },
];

export default function SearchOption({
  isOpen,
  buttonRef,
  selectedTarget,
  setSelectedTarget,
}: DetailSearchModalProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false), isDropdownOpen);

  const handleOptionSelect = (target: SearchTarget) => {
    setSelectedTarget(target);
    setIsDropdownOpen(false);
  };

  const selectedOption = searchOptions.find(
    option => option.value === selectedTarget,
  );

  if (!isOpen) return null;

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex h-10 min-w-[100px] items-center justify-between border-border-gray border-b bg-white px-2 font-bold text-sm text-text-primary"
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
        <div className="absolute top-full left-0 z-10 mt-1 w-full bg-white shadow-md">
          {searchOptions.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionSelect(option.value)}
              className="w-full cursor-pointer px-2 py-1 text-left font-medium text-sm text-text-subtitle"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
