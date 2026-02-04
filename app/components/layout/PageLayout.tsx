import type { ReactNode } from "react";
import Header from "@/app/components/ui/Header";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="mb-6 font-bold text-2xl text-text-title">{title}</h2>
        {children}
      </main>
    </div>
  );
}
