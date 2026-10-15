import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "./layout/main-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LÀ VIỆT - Sơn Mài Hội Hoạ Liên Ngành",
  description:
    "Kế thừa tinh hoa thủ công truyền thống Việt Nam kết hợp tư duy thiết kế đương đại",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* MainLayout bọc cố định Header và Footer chung cho mọi màn hình */}
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
