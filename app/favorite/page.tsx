"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/app/components/layout/PageLayout";
import Empty from "@/app/components/ui/Empty";
import Summary from "@/app/components/ui/Summary";
import BookList from "@/app/container/book/BookList";
import type { BookDocument } from "@/app/types/book";
import { getFavoritesFromStorage } from "@/lib/storage";

export default function FavoritePage() {
  const [favoriteBooks, setFavoriteBooks] = useState<BookDocument[]>([]);

  useEffect(() => {
    const favorites = getFavoritesFromStorage();
    setFavoriteBooks(favorites);
  }, []);

  return (
    <PageLayout title="내가 찜한 책">
      {favoriteBooks.length > 0 ? (
        <>
          <Summary message="찜한 책" totalCount={favoriteBooks.length} />
          <BookList books={favoriteBooks} isEnd={true} />
        </>
      ) : (
        <Empty message="찜한 책이 없습니다." />
      )}
    </PageLayout>
  );
}
