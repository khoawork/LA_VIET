import React, { Suspense } from "react";
import Header from "./header";
import Footer from "./footer";

export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * MainLayout cố định Header ở trên và Footer ở dưới cho toàn bộ các màn hình
 */
export default function MainLayout({
  children,
  className = "",
}: MainLayoutProps) {
  return (
    <div
      className={`w-full min-h-screen bg-[#FAF6F0] text-[#2A2421] font-sans selection:bg-[#9A1C1F] selection:text-white flex flex-col ${className}`}
    >
      <Header />
      <main className="w-full flex-1 flex flex-col">{children}</main>
      <Suspense fallback={<div className="min-h-72 bg-[#fcf2e3]" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export { MainLayout };

