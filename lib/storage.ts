import type { BookDocument, SearchHistoryItem } from "@/app/_types/book";

const FAVORITE_STORAGE_KEY = "books_favorites";
const SEARCH_HISTORY_STORAGE_KEY = "books_search_history";
const MAX_SEARCH_HISTORY = 8;

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

export function saveSearchHistory(query: string): void {
  if (!query.trim()) {
    return;
  }

  const trimmedQuery = query.trim();
  const history = getSearchHistoryItems();

  // 중복된 검색어가 있으면 제거 (최신 검색으로 업데이트하기 위해)
  const filteredHistory = history.filter(item => item.query !== trimmedQuery);

  // 새로운 검색어를 맨 앞에 추가
  const newHistory: SearchHistoryItem[] = [
    { query: trimmedQuery, timestamp: Date.now() },
    ...filteredHistory,
  ];

  // 최대 개수 제한 (오래된 것부터 삭제)
  const limitedHistory = newHistory.slice(0, MAX_SEARCH_HISTORY);

  localStorage.setItem(
    SEARCH_HISTORY_STORAGE_KEY,
    JSON.stringify(limitedHistory)
  );
}

export function getSearchHistory(): string[] {
  const history = getSearchHistoryItems();
  return history.map(item => item.query);
}

function getSearchHistoryItems(): SearchHistoryItem[] {
  const stored = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
  if (stored) {
    try {
      const history = JSON.parse(stored) as SearchHistoryItem[];
      return history;
    } catch {
      return [];
    }
  }
  return [];
}
