"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/app/_components/layout/PageLayout";
import Empty from "@/app/_components/ui/Empty";
import Summary from "@/app/_components/ui/Summary";
import type { BookDocument } from "@/app/_types/book";
import { getFavoritesFromStorage } from "@/lib/storage";

export default function FavoritePage() {
  const [favoriteBooks, setFavoriteBooks] = useState<BookDocument[]>([]);

  useEffect(() => {
    const favorites = getFavoritesFromStorage();

    const bookData: BookDocument[] = [];

    setFavoriteBooks(bookData);
  }, []);

  return (
    <PageLayout title="내가 찜한 책">
      {favoriteBooks.length > 0 ? (
        <>
          <Summary message="찜한 책" totalCount={favoriteBooks.length} />
          {/* TODO: 찜한 책 목록 렌더링 */}
        </>
      ) : (
        <Empty message="찜한 책이 없습니다." />
      )}
    </PageLayout>
  );
}
