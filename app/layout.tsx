import { PropsWithChildren } from "react";
import { ReactQueryProvider } from "@/app/_providers/ReactQueryProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="ko">
      <body className="font-['Pretendard',sans-serif] antialiased">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
