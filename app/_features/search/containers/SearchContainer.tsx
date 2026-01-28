import { Suspense } from "react";
import Header from "@/app/_components/layout/Header";
import Empty from "@/app/_components/ui/Empty";
import Summary from "@/app/_components/ui/Summary";
import { searchBookApi } from "@/app/_features/search/api/kakaoSearch.api";
import BookList from "@/app/_features/search/components/BookList";
import SearchInput from "@/app/_features/search/components/SearchInput";

interface SearchContainerProps {
  searchQuery?: string;
}

export default async function SearchContainer({
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
      <main className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="mb-6 font-bold text-2xl text-text-title">도서 검색</h2>
        <Suspense fallback={<div className="h-12" />}>
          <SearchInput />
        </Suspense>
        {searchQuery && (
          <>
            <Summary totalCount={totalCount} />
            {totalCount > 0 && <BookList searchData={searchData} />}
            {totalCount === 0 && <Empty />}
          </>
        )}
        {!searchQuery && (
          <div className="mt-12">
            <Empty />
          </div>
        )}
      </main>
    </div>
  );
}
