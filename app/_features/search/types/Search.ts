// Kakao 검색 API 응답 타입 정의

// 검색 결과 문서 타입 (책 검색)
export interface SearchDocument {
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
    documents: SearchDocument[];
}
