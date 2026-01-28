const FAVORITE_STORAGE_KEY = "books_favorites";

export function saveFavoritesToStorage(favorites: Set<string>): void {
  const favoritesArray = Array.from(favorites);
  localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(favoritesArray));
}

export function getFavoritesFromStorage(): Set<string> {
  const stored = localStorage.getItem(FAVORITE_STORAGE_KEY);
  if (stored) {
    const favorites = JSON.parse(stored) as string[];
    return new Set(favorites);
  }
  return new Set();
}
