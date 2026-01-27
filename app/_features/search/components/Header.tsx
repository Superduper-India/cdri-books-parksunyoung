import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-text-primary">
                    CERTICOS BOOKS
                </h1>
                <nav className="flex gap-6">
                    <Link
                        href="/"
                        className="text-text-primary font-medium border-b-1 border-primary pb-1 text-xl"
                    >
                        도서 검색
                    </Link>
                    <Link
                        href="/liked"
                        className="text-text-primary font-medium text-xl"
                    >
                        내가 찜한 책
                    </Link>
                </nav>
            </div>
        </header>
    );
}
