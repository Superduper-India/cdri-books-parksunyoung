import Image from "next/image";
import type { BookDocument } from "@/app/_types/book";

interface ThumbnailProps {
  book: BookDocument;
  width?: number;
  height?: number;
}

// @toDo 좋아요 버튼 추가
export default function Thumbnail({
  book,
  width = 48,
  height = 68,
}: ThumbnailProps) {
  return (
    <Image
      src={book.thumbnail || "/placeholder-book.png"}
      alt={book.title}
      width={width}
      height={height}
      unoptimized={!!book.thumbnail}
      className="object-cover"
    />
  );
}
