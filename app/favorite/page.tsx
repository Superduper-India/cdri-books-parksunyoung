"use client";

import { useEffect, useState } from "react";
import BookList from "@/app/_components/book/BookList";
import PageLayout from "@/app/_components/layout/PageLayout";
import Empty from "@/app/_components/ui/Empty";
import Summary from "@/app/_components/ui/Summary";
import type { BookDocument } from "@/app/_types/book";
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
