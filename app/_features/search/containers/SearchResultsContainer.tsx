import { Suspense } from "react";
import { searchBookApi } from "@/app/_features/search/api/kakaoSearch.api";
import Header from "@/app/_features/search/components/Header";
import SearchInput from "@/app/_features/search/components/SearchInput";
import SearchResultsSummary from "@/app/_features/search/components/SearchResultsSummary";
import NoResult from "@/app/_features/search/components/NoResult";

interface SearchContainerProps {
    searchQuery?: string;
}

export default async function SearchResultsContainer({
    searchQuery,
}: SearchContainerProps) {
    let searchData = null;
    let totalCount = 0;

    if (searchQuery) {
        try {
            const response = await searchBookApi.fetchSearchWeb(searchQuery, "title");
            searchData = response;
            totalCount = response.meta?.total_count || 0;
        } catch (error) {
            console.error("Search error:", error);
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <h2 className="text-2xl font-bold text-text-title mb-6">
                    도서 검색
                </h2>
                <Suspense fallback={<div className="h-12" />}>
                    <SearchInput />
                </Suspense>
                {searchQuery && (
                    <>
                        <SearchResultsSummary totalCount={totalCount} />
                        {totalCount === 0 && <NoResult />}
                    </>
                )}
                {!searchQuery && (
                    <div className="mt-12">
                        <NoResult />
                    </div>
                )}
            </main>
        </div>
    );
}
