interface SearchResultsSummaryProps {
  totalCount: number;
}

export default function SearchResultsSummary({
  totalCount,
}: SearchResultsSummaryProps) {
  return (
    <div className="mt-6 flex items-center font-medium text-text-primary">
      <p className="mr-4">도서 검색 결과</p>
      <span>
        총 <span className="text-primary">{totalCount.toLocaleString()}</span>건
      </span>
    </div>
  );
}
