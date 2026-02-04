import { Suspense } from "react";
import { searchBookApi } from "@/app/api/search";
import PageLayout from "@/app/components/layout/PageLayout";
import Empty from "@/app/components/ui/Empty";
import Summary from "@/app/components/ui/Summary";
import BookList from "@/app/container/book/BookList";
import SearchForm from "@/app/container/search/SearchForm";

interface BooksPageProps {
  searchParams: Promise<{ q?: string; target?: string }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams;
  const searchQuery = params.q;
  const searchTarget = params.target as
    | "title"
    | "person"
    | "publisher"
    | undefined;

  let searchData = null;
  let totalCount = 0;

  if (searchQuery) {
    try {
      // 상세 검색인 경우 target 파라미터 사용, 아니면 기본값 "title"
      const target = searchTarget || "title";
      const response = await searchBookApi.fetchSearchWeb(searchQuery, target);
      searchData = response;
      totalCount = response.meta?.total_count || 0;
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  return (
    <PageLayout title="도서 검색">
      <Suspense fallback={<div className="h-12" />}>
        <SearchForm />
      </Suspense>
      {searchQuery && (
        <>
          <Summary totalCount={totalCount} />
          {totalCount > 0 && (
            <BookList
              books={searchData?.documents || []}
              isEnd={searchData?.meta?.is_end}
            />
          )}
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
