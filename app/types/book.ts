// 공통 책 관련 타입 정의

// 책 문서 타입 (검색 결과 및 찜한 책에서 공통 사용)
export interface BookDocument {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
}

// 검색 결과 메타데이터 타입
export interface SearchMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

// Kakao 검색 API 응답 타입
export interface KakaoSearchResponse {
  meta: SearchMeta;
  documents: BookDocument[];
}

// 검색 기록 타입
export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

export type SearchTarget = "title" | "person" | "publisher";
