"use client";

import Image from "next/image";
import { useFavorite } from "@/app/_hooks/useFavorite";
import type { BookDocument } from "@/app/_types/book";

interface FavoriteButtonProps {
  book: BookDocument;
  width?: number;
  height?: number;
  className?: string;
}

export default function FavoriteButton({
  book,
  width = 16,
  height = 16,
  className = "top-0 right-0",
}: FavoriteButtonProps) {
  const { isbn } = book;
  const { isFavorite, toggleFavorite } = useFavorite();

  // hydration이 완료되기 전까지는 기본 상태(false)를 보여줌
  const favorite = isFavorite(isbn);
  return (
    <button
      type="button"
      className={`absolute z-10 cursor-pointer transition-opacity hover:opacity-80 ${className}`}
      onClick={e => {
        e.stopPropagation();
        toggleFavorite(isbn);
      }}
      aria-label={favorite ? "찜하기 해제" : "찜하기"}
    >
      <Image
        key={favorite ? "favorite-on" : "favorite-off"}
        src={favorite ? "/favorite-on.svg" : "/favorite-off.svg"}
        alt={favorite ? "찜하기 해제" : "찜하기"}
        width={width}
        height={height}
      />
    </button>
  );
}
