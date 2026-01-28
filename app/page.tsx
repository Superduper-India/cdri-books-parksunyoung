import SearchContainer from "@/app/_features/search/containers/SearchContainer";

interface BooksPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const params = await searchParams;
  return <SearchContainer searchQuery={params.q} />;
}
