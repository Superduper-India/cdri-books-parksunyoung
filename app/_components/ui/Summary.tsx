interface SummaryProps {
  message?: string;
  totalCount: number;
}

export default function Summary({
  message = "도서 검색 결과",
  totalCount,
}: SummaryProps) {
  return (
    <div className="mt-6 flex items-center font-medium text-text-primary">
      <p className="mr-4">{message}</p>
      <span>
        총 <span className="text-primary">{totalCount.toLocaleString()}</span>건
      </span>
    </div>
  );
}
