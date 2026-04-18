import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASPIRE 2026 Beijing",
  description: "ASPIRE 2026 北京行程指南 - 5月6-10日",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={`${inter.className} min-h-full`}>{children}</body>
    </html>
  );
}
