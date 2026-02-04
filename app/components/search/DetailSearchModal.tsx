"use client";

import Image from "next/image";
import { useRef } from "react";
import DetailSearchForm from "@/app/container/search/DetailSearchForm";

interface DetailSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailSearchModal({
  isOpen,
  onClose,
}: DetailSearchModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 z-50 mt-2 w-[400px]">
      <div ref={modalRef} className="rounded-lg bg-white px-6 py-9 shadow-lg">
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
        <DetailSearchForm isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
}
