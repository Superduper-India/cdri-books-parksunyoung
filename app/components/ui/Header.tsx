"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SELECTED_CLASSNAME } from "@/lib/constant";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="font-bold text-2xl text-text-primary">CERTICOS BOOKS</h1>
        <nav className="flex gap-6">
          <Link
            href="/"
            className={`font-medium text-text-primary text-xl ${
              pathname === "/" ? SELECTED_CLASSNAME : ""
            }`}
          >
            도서 검색
          </Link>
          <Link
            href="/favorite"
            className={`font-medium text-text-primary text-xl ${
              pathname === "/favorite" ? SELECTED_CLASSNAME : ""
            }`}
          >
            내가 찜한 책
          </Link>
        </nav>
      </div>
    </header>
  );
}
