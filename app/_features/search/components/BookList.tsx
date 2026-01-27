"use client";

import { useState } from "react";
import BookItem from '@/app/_features/search/components/BookItem';
import type { SearchDocument } from "@/app/_features/search/types/Search";

interface SearchResultsContainerProps {
    searchData: {
        documents: SearchDocument[];
    } | null;
}

export default function BookList({
    searchData,
}: SearchResultsContainerProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    if (!searchData || searchData.documents.length === 0) {
        return null;
    }

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="mt-6 space-y-4">
            {searchData.documents.map((book, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <BookItem 
                    key={book.isbn} 
                    book={book} 
                    isExpanded={isExpanded}
                    onToggle={() => toggleExpand(index)}
                  />
                );
            })}
        </div>
    );
}
