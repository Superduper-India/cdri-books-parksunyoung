import { Suspense } from "react";
import { searchBookApi } from "@/app/_api/search";
import BookList from "@/app/_components/book/BookList";
import PageLayout from "@/app/_components/layout/PageLayout";
import SearchInput from "@/app/_components/search/SearchInput";
import Empty from "@/app/_components/ui/Empty";
import Summary from "@/app/_components/ui/Summary";

interface BooksPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams;
  const searchQuery = params.q;

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
    <PageLayout title="도서 검색">
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
    </PageLayout>
  );
}
