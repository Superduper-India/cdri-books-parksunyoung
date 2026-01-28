"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <div className="-translate-y-1/2 absolute top-1/2 left-4">
          <Image
            src="/search_Icon.svg"
            alt="검색 아이콘"
            width={30}
            height={30}
          />
        </div>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full rounded-full bg-bg-gray py-3 pr-4 pl-12 text-text-primary focus:border-transparent focus:outline-none"
        />
      </div>
      <button
        type="button"
        className="rounded-xl border border-text-subtitle px-4 font-medium text-text-subtitle"
      >
        상세검색
      </button>
    </form>
  );
}
