"use client";

import PurchaseButton from "@/app/_components/book/buttons/PurchaseButton";
import ToggleButton from "@/app/_components/book/buttons/ToggleButton";
import Description from "@/app/_components/book/Description";
import Price from "@/app/_components/book/Price";
import Thumbnail from "@/app/_components/book/Thumbnail";
import Title from "@/app/_components/book/Title";
import type { BookDocument } from "@/app/_types/book";
import { BUTTON_CLASSNAME } from "@/lib/constant";

interface BookItemProps {
  isExpanded: boolean;
  book: BookDocument;
  onToggle: () => void;
}

export default function BookItem({
  isExpanded,
  book,
  onToggle,
}: BookItemProps) {
  // 책 상세 정보 (토글 펼쳐짐) — 좌: 썸네일, 우: 제목·저자·책 소개·가격·구매 버튼
  if (isExpanded) {
    return (
      <div className="flex justify-between">
        <div className="flex gap-8">
          <Thumbnail book={book} width={210} height={280} />

          <div className="flex w-90 flex-auto flex-col">
            <Title book={book} />
            {book.contents && (
              <>
                <h4 className="mt-4 mb-3 font-bold text-sm text-text-primary">
                  책 소개
                </h4>
                <Description bookContents={book.contents} />
              </>
            )}
          </div>
        </div>

        <div className="flex w-60 flex-col justify-between">
          <div className="w-1/2 self-end">
            <ToggleButton isExpanded={isExpanded} onToggle={onToggle} />
          </div>
          <div>
            <Price book={book} isDescription />
            <PurchaseButton bookUrl={book.url} className={BUTTON_CLASSNAME} />
          </div>
        </div>
      </div>
    );
  }

  // 책 리스트 아이템 (토글 접힘)
  return (
    <div className="flex flex-1 justify-between">
      <div className="mx-12">
        <Thumbnail book={book} />
      </div>
      <Title book={book} />

      <div className="flex items-center justify-between gap-14">
        <Price book={book} />
        <div className="flex h-12 w-60 gap-2">
          <PurchaseButton bookUrl={book.url} className={BUTTON_CLASSNAME} />
          <ToggleButton isExpanded={isExpanded} onToggle={onToggle} />
        </div>
      </div>
    </div>
  );
}
