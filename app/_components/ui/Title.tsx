import type { SearchDocument } from "@/app/_features/search/types/Search";

interface TitleProps {
  book: SearchDocument;
}

export default function Title({ book }: TitleProps) {
  const authors = book.authors.join(", ");

  return (
    <div className="flex w-[408px] min-w-0 items-center gap-4 overflow-hidden">
      <h3 className="truncate font-bold text-lg text-text-primary">
        {book.title}
      </h3>
      <p className="truncate font-medium text-sm text-text-subtitle">
        {authors}
      </p>
    </div>
  );
}
