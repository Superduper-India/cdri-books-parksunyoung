"use client";

import Image from "next/image";
import type { SearchDocument } from "@/app/_features/search/types/Search";

interface BookItemProps {
  isExpanded: boolean;
  book: SearchDocument;
  onToggle: () => void;
}

export default function BookItem({
  isExpanded,
  book,
  onToggle,
}: BookItemProps) {
  const authors = book.authors.join(", ");
  const hasDiscount = book.price > book.sale_price;

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };
                
  return (
    <div className="bg-white border border-border-gray rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header Section */}
      <div className="flex gap-4">
          {/* Book Cover */}
          <div className="shrink-0">
              <Image
                  src={
                      book.thumbnail ||
                      "/placeholder-book.png"
                  }
                  alt={book.title}
                  width={80}
                  height={112}
                  className="w-20 h-28 object-cover rounded border border-border-gray"
                  unoptimized={!!book.thumbnail}
              />
          </div>

          {/* Book Info */}
          <div className="flex-1 flex flex-col justify-between">
              <div>
                  <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-text-title">
                          {book.title}
                      </h3>
                      {isExpanded && (
                        /* @toDo 좋아요 버튼 */
                        null
                      )}
                  </div>
                  <p className="text-sm text-text-secondary">
                      {authors}
                  </p>
              </div>

              {/* Price and Buttons */}
              <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-text-title">
                          {formatPrice(book.sale_price)}원
                      </span>
                  </div>
                  <div className="flex gap-2">
                      <a
                          href={book.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-primary text-white rounded font-medium hover:opacity-90 transition-opacity"
                      >
                          구매하기
                      </a>
                      <button
                          onClick={onToggle}
                          className="px-4 py-2 bg-bg-gray text-text-primary rounded font-medium hover:bg-hover-gray transition-colors flex items-center gap-1"
                      >
                          상세보기
                          <Image
                              src={
                                  isExpanded
                                      ? "/arrow-up.svg"
                                      : "/arrow-down.svg"
                              }
                              alt={
                                  isExpanded
                                      ? "접기"
                                      : "펼치기"
                              }
                              width={16}
                              height={16}
                              className="w-4 h-4"
                          />
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
          <div className="mt-6 pt-6 border-t border-border-gray">
              <h4 className="text-lg font-bold text-text-title mb-4">
                  책 소개
              </h4>

              {/* Prominent Quote */}
              {book.contents && (
                  <div className="mb-6 p-4 bg-bg-gray rounded-lg border-l-4 border-primary">
                      <p className="text-text-primary italic text-lg leading-relaxed">
                          "{book.contents.split(".")[0]}"
                      </p>
                  </div>
              )}

              {/* Full Description */}
              {book.contents && (
                  <div className="mb-6">
                      <p className="text-text-primary leading-relaxed whitespace-pre-line">
                          {book.contents}
                      </p>
                  </div>
              )}

              {/* Price Information */}
              <div className="mb-6">
                  {hasDiscount ? (
                      <div className="flex items-center gap-4">
                          <span className="text-text-secondary line-through">
                              원가 {formatPrice(book.price)}원
                          </span>
                          <span className="text-2xl font-bold text-text-title">
                              할인가 {formatPrice(
                                  book.sale_price
                              )}원
                          </span>
                      </div>
                  ) : (
                      <span className="text-2xl font-bold text-text-title">
                          {formatPrice(book.sale_price)}원
                      </span>
                  )}
              </div>

              {/* Large Purchase Button */}
              <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-primary text-white rounded font-medium text-center hover:opacity-90 transition-opacity"
              >
                  구매하기
              </a>
          </div>
      )}
  </div>
    );
}
