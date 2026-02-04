"use client";

import { useSearchParams } from "next/navigation";
import type React from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BookItem from "@/app/components/book/BookItem";
import Loader from "@/app/components/ui/Loader";
import { useScroll } from "@/app/hooks/useScroll";
import type { BookDocument } from "@/app/types/book";

// React 19 호환성을 위한 타입 단언
const InfiniteScrollComponent =
  InfiniteScroll as unknown as React.ComponentType<{
    dataLength: number;
    next: () => void;
    hasMore: boolean;
    loader: React.ReactNode;
    endMessage?: React.ReactNode;
    children: React.ReactNode;
  }>;

interface BookListProps {
  books: BookDocument[];
  isEnd?: boolean;
}

export default function BookList({ books, isEnd = false }: BookListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const { documents, hasMore, loadMoreDocuments } = useScroll({
    initialData: books,
    searchQuery,
    isEnd: isEnd,
  });

  if (!books || books.length === 0) {
    return null;
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mt-6">
      <InfiniteScrollComponent
        dataLength={documents.length}
        next={loadMoreDocuments}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <div className="space-y-4">
          {documents.map((book, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={`${book.isbn}-${index}`}
                className="border-border-gray border-b bg-white p-4"
              >
                <BookItem
                  book={book}
                  isExpanded={isExpanded}
                  onToggle={() => toggleExpand(index)}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScrollComponent>
    </div>
  );
}
