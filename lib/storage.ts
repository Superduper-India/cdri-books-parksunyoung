import type { BookDocument } from "@/app/_types/book";

const FAVORITE_STORAGE_KEY = "books_favorites";

export function saveFavoritesToStorage(favorites: BookDocument[]): void {
  localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(favorites));
}

export function getFavoritesFromStorage(): BookDocument[] {
  const stored = localStorage.getItem(FAVORITE_STORAGE_KEY);
  if (stored) {
    const favorites = JSON.parse(stored) as BookDocument[];
    return favorites;
  }
  return [];
}
