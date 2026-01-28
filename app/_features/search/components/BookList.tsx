"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import BookItem from '@/app/_features/search/components/BookItem';
import { useScroll } from "@/app/_features/search/hooks/useScroll";
import type { KakaoSearchResponse } from "@/app/_features/search/types/Search";

// React 19 호환성을 위한 타입 단언
const InfiniteScrollComponent = InfiniteScroll as unknown as React.ComponentType<{
    dataLength: number;
    next: () => void;
    hasMore: boolean;
    loader: React.ReactNode;
    endMessage?: React.ReactNode;
    children: React.ReactNode;
}>;

interface SearchResultsContainerProps {
    searchData: KakaoSearchResponse | null;
}

export default function BookList({
    searchData,
}: SearchResultsContainerProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    if (!searchData || searchData.documents.length === 0) {
        return null;
    }

    const { documents, hasMore, loadMoreDocuments } = useScroll({
        initialData: searchData,
        searchQuery,
    });

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="mt-6">
            <InfiniteScrollComponent
                dataLength={documents.length}
                next={loadMoreDocuments}
                hasMore={hasMore}
                loader={
                    <div className="flex justify-center py-8">
                        <div className="text-text-secondary">로딩 중...</div>
                    </div>
                }
                endMessage={
                    <div className="flex justify-center py-8">
                        <div className="text-text-secondary">모든 결과를 불러왔습니다.</div>
                    </div>
                }
            >
                <div className="space-y-4">
                    {documents.map((book, index) => {
                        const isExpanded = expandedIndex === index;
                        return (
                            <BookItem 
                                key={`${book.isbn}-${index}`} 
                                book={book} 
                                isExpanded={isExpanded}
                                onToggle={() => toggleExpand(index)}
                            />
                        );
                    })}
                </div>
            </InfiniteScrollComponent>
        </div>
    );
}
