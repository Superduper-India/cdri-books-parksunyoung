# CDRI FE 과제

## 프로젝트 개요
- 도서 검색 초기 화면, 검색 결과 없을 시 화면
- 도서 검색 결과 화면
- 전체 검색 UI
  - 검색창: 
    1. placeholder : ‘검색어 입력’
    2. 검색 기록 저장 기능 (최대 8개, 8개 이상 저장할 경우 오래된 순으로 지워지도록 구현)
    3. 브라우저 재시작 후에도 검색기록 목록 유지
  - 결과 리스트: 
    1. 검색어 입력 후 Enter키를 누르면 검색이 진행되고 10개의 결과가 화면에 노출 (페이지 당 10개  아이템)
    2. 구매하기 버튼 클릭시 새 탭이 추가되면서 해당 책의 상세페이지 (다음 책)으로 이동
- 상세 검색 UI
  - 상세 검색 팝업: 
    1. ‘상세 검색 버튼’ 클릭시 버튼 하단에 팝업 노출
    2. 검색 조건 클릭시 셀렉트 옵션 노출
    3. ‘검색하기 버튼’ 클릭시 팝업은 닫히며 입력한 조건으로 상세검색 진행
  - 상세 검색 결과: 
    1. 검색어가 입력 되어있을 경우 초기화 (전체 검색과 상세 검색은 동시에 진행 불가)
    2. 상세검색 도중 전체 검색을 진행 할 경우 상세검색 조건은 초기화 됨 (전체 검색과 상세 검색은 동시에 진행 불가)
- 내가 찜한 책 화면
  - 내가 찜한 책 초기 화면
  - 찜하기:
    1. 찜하기 버튼 눌렀을 때 시점의 데이터를 가지고 있기 때문에, API 결과와 데이터가 상이할 수 있음
    2. 브라우저 재시작 후에도 찜하기 목록 유지

## 시스템 요구사항  
- Node.js v24.12.0 (`.nvmrc`에 명시됨)
- pnpm 10.27.0 (패키지 매니저)

## 시작하기

1. **Node.js 버전 설정:**
```bash
nvm use
```
2. **의존성 설치:**
```bash
pnpm install
```
4. **개발 서버 실행:**
```bash
pnpm dev
```

## 사용 가능한 스크립트
- `pnpm dev` - 개발 서버 시작
- `pnpm build` - 프로덕션 빌드
- `pnpm start` - 프로덕션 서버 시작
- `pnpm lint` - Biome 린터 실행
- `pnpm lint:fix` - 린팅 이슈 자동 수정

## 프로젝트 구조
```bash
app/
├── api/search.ts           # API 레이어
├── components/             # 프레젠테이션 컴포넌트
│   ├── book/               # 도서 카드/아이템 조각
│   ├── layout/
│   ├── search/
│   └── ui/                 # 공통 UI (Empty, Header, Loader, Summary)
├── container/              # 데이터/로직 담당
│   ├── book/BookList.tsx
│   └── search/SearchForm.tsx, DetailSearchForm.tsx
├── contexts/FavoriteContext.tsx
├── hooks/
├── providers/
├── types/book.ts
├── page.tsx, favorite/page.tsx
lib/
├── constant.ts, formatter.ts
└── storage/                # favorites, search-history

```

## 주요 코드 설명

### API 레이어 (`app/api/search.ts`)
- Kakao 도서 검색 API를 `ky`로 호출하며, 쿼리·타겟(제목/저자/출판사)·정렬·페이지·사이즈를 파라미터로 받습니다.
- 환경 변수 `NEXT_PUBLIC_KAKAO_SEARCH_API_URL`, `NEXT_PUBLIC_KAKAO_REST_API_KEY`를 사용합니다.

### 검색 흐름
- **페이지(`app/page.tsx`)**: URL의 `q`, `target`을 읽어 서버에서 `searchBookApi.fetchSearchWeb`를 호출하고, 결과를 `BookList`·`Summary`·`Empty`에 넘깁니다.
- **SearchForm(`container/search/SearchForm.tsx`)**: 입력·제출 시 `router.push`로 `/?q=...` 또는 `/?target=...&q=...`로 이동해, URL이 단일 소스가 되도록 했습니다.
- **상세 검색**: `DetailSearchModal` 안의 `DetailSearchForm`에서 검색 조건(제목/저자/출판사) 선택 후 제출하면 동일한 URL 패턴으로 이동합니다.

### 저장소 (`lib/storage/`)
- **search-history**: 검색어를 최대 8개까지 `localStorage`에 저장하고, 오래된 순으로 제거합니다. `saveSearchHistory`, `getSearchHistory`, `removeSearchFromHistory`로 접근합니다.
- **favorites**: 찜한 도서 목록을 `localStorage`에 저장합니다. `FavoriteContext`가 토글 시 `saveFavoritesToStorage`를 호출해 동기화합니다.

### 찜하기 (Favorite)
- **FavoriteContext(`app/contexts/FavoriteContext.tsx`)**: 앱 전역에서 `favorites` 배열과 `toggleFavorite`, `isFavorite(isbn)`을 제공합니다. 마운트 시 `getFavoritesFromStorage`로 초기화하고, 토글 시 storage에 즉시 반영합니다.
- **useFavorite(`app/hooks/useFavorite.tsx`)**: Context를 감싼 훅으로, 컴포넌트에서는 `useFavorite()`만 사용합니다.

### 컴포넌트 역할 분리
- **components/**: UI만 담당. 예: `BookItem`, `Thumbnail`, `Title`, `Price`, `SearchInputField`, `SearchHistory`, `Empty`, `Header`.
- **container/**: 라우팅·폼 상태·API 호출 등 로직 담당. `SearchForm`, `DetailSearchForm`은 `useRouter`/`useSearchParams`와 storage를 사용하고, `BookList`는 무한 스크롤 훅과 결과 목록을 묶습니다.

### 무한 스크롤 (`app/hooks/useScroll.ts`)
- 첫 페이지는 서버에서 받은 `initialData`를 쓰고, 다음 페이지부터 `searchBookApi.fetchSearchWeb(..., page, 10)`로 추가 요청합니다. `hasMore`/`loadMoreDocuments`를 `react-infinite-scroll-component`에 연결해 스크롤 시 자동 로드합니다.

### 기타 훅
- **useClickOutside**: 검색창 포커스 시 검색 기록 패널을 띄우고, 패널 밖 클릭 시 닫는 등 “바깥 클릭” 처리에 사용합니다.
- **useFavorite**: 위 참고.

---

## 라이브러리 선택 이유

| 라이브러리 | 용도 | 선택 이유 |
|-----------|------|-----------|
| **Next.js 16** | 프레임워크 | App Router·RSC로 검색 초기 결과를 서버에서 렌더링해 SEO·체감 속도 확보. `searchParams`로 URL 기반 검색 상태 유지. |
| **React 19** | UI | 최신 React 기능 사용. |
| **ky** | HTTP 클라이언트 | 가벼운 fetch 래퍼. `searchParams`·헤더 설정이 간단하고, 타입과 조합하기 좋음. |
| **react-infinite-scroll-component** | 무한 스크롤 | 스크롤 감지·로딩 UI·끝 메시지를 컴포넌트로 제공해, `useScroll`과 결합해 빠르게 구현. |
| **@tanstack/react-query** | 서버 상태(캐시) | 클라이언트에서 추가 검색/캐시가 필요할 때 확장 가능하도록 프로바이더로 준비. (현재 검색은 RSC·URL 기반) |
| **Tailwind CSS 4** | 스타일링 | 유틸 클래스로 레이아웃·타이포·색상 일관성 유지, 설정 파일 최소화. |
| **Biome** | 린트·포맷 | ESLint·Prettier 대비 빠른 실행, 설정이 단순해 포맷/룰 통일용으로 사용. |
| **TypeScript** | 타입 | `app/types/book.ts` 등으로 API·도메인 타입을 정의해 안정성과 자동완성 확보. |

---

## 강조 하고 싶은 기능

1. **URL 기반 검색 상태**  
   검색어·상세 검색 조건이 모두 `?q=`, `?target=`에 담겨 있어, 새로고침·공유·뒤로가기 시에도 동일한 결과가 유지됩니다.

2. **검색 기록 (최대 8개, 유지)**  
   검색창 포커스 시 `lib/storage/search-history`에 저장된 기록을 노출하고, 선택 시 해당 검색으로 이동. 8개 초과 시 오래된 항목부터 제거하며, `localStorage`로 재시작 후에도 유지됩니다.

3. **상세 검색과 일반 검색 분리**  
   상세검색 버튼으로 팝업을 띄우고, 제목/저자/출판사 중 조건 선택 후 검색. 일반 검색과 상세 검색은 URL로 구분되어 동시에 쓰이지 않으며, 서로 전환 시 입력·조건이 초기화됩니다.

4. **찜하기 + 브라우저 재시작 후 유지**  
   `FavoriteContext`와 `lib/storage/favorites`로 전역 상태와 `localStorage`를 동기화해, 찜한 책은 재시작 후에도 “내가 찜한 책” 화면에 그대로 반영됩니다.

5. **컴포넌트/컨테이너 분리**  
   `components/`는 비즈니스 로직 없이 UI만, `container/`는 라우팅·폼·API·스크롤 로직만 담당해 역할이 나뉘어 있어 테스트와 수정이 쉽습니다.

6. **무한 스크롤 (페이지당 10권)**  
   첫 10권은 서버 렌더링으로 내려주고, 이후 스크롤 시 `useScroll`이 같은 검색 조건으로 다음 페이지를 요청해 리스트 끝까지 자연스럽게 로딩됩니다.
