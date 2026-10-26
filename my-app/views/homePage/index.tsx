"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  HomeHero,
  HomeStatistics,
  HomeSpotlight,
  HomeNews,
  HomePartners,
  HomeCta,
} from "./components";
import type { PageHomePropsType } from "./types/pagehome.type";

interface HomePageProps {
  initialData?: PageHomePropsType;
}

export default function HomePage({ initialData }: HomePageProps) {
  const [pageData, setPageData] = useState<PageHomePropsType | null>(initialData ?? null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHomeContent() {
      try {
        const res = await fetch("/api/admin/home/page");
        if (!res.ok) throw new Error("Không thể tải nội dung Trang chủ.");
        const json = await res.json();
        if (!json.success || !json.data?.props) throw new Error("Chưa có nội dung Trang chủ.");
        setPageData(json.data.props);
      } catch (err) {
        console.error("Lỗi khi tải nội dung Trang chủ:", err);
        setError(err instanceof Error ? err.message : "Không thể tải nội dung Trang chủ.");
      } finally {
        setLoading(false);
      }
    }

    loadHomeContent();
  }, []);

  if (loading && !pageData) return <div className="flex items-center justify-center gap-2 py-24 text-sm text-[#695D56]"><Loader2 className="h-5 w-5 animate-spin" /> Đang tải Trang chủ...</div>;
  if (!pageData) return <div role="alert" className="py-24 text-center text-sm text-red-700">{error}</div>;

  return (
    <div className="w-full flex flex-col">
      <HomeHero data={pageData?.hero} />
      <HomeStatistics data={pageData?.statistics} />
      <HomeSpotlight data={pageData?.spotlight} />
      <HomeNews data={pageData?.newsSection} />
      <HomePartners data={pageData?.partners} />
      <HomeCta data={pageData?.cta} />
    </div>
  );
}

export { HomePage, HomePage as HomeView };
export * from "./components";
export * from "./types/pagehome.type";
