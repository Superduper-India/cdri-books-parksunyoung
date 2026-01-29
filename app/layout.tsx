import type { PropsWithChildren } from "react";
import { FavoriteProvider } from "@/app/_contexts/FavoriteContext";
import { ReactQueryProvider } from "@/app/_providers/ReactQueryProvider";
import "./globals.css";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body className="font-['Pretendard',sans-serif] antialiased">
        <ReactQueryProvider>
          <FavoriteProvider>{children}</FavoriteProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
