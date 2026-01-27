"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";

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
            <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
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
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="검색어를 입력하세요"
                    className="w-full pl-12 pr-4 py-3 bg-bg-gray rounded-full text-text-primary text-text-placeholder focus:outline-none focus:border-transparent"
                />
            </div>
            <button
                type="button"
                className="px-4 border border-text-subtitle rounded-xl text-text-subtitle font-medium"
            >
                상세검색
            </button>
        </form>
    );
}
