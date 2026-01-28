import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="font-bold text-2xl text-text-primary">CERTICOS BOOKS</h1>
        <nav className="flex gap-6">
          <Link
            href="/"
            className="border-primary border-b pb-1 font-medium text-text-primary text-xl"
          >
            도서 검색
          </Link>
          <Link href="/liked" className="font-medium text-text-primary text-xl">
            내가 찜한 책
          </Link>
        </nav>
      </div>
    </header>
  );
}
