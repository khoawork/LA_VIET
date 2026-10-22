"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    async function loadHomeContent() {
      try {
        const res = await fetch("/api/admin/home/page");
        const json = await res.json();
        if (json.success && json.data?.props) {
          setPageData(json.data.props);
        }
      } catch (err) {
        console.error("Lỗi khi tải nội dung Trang chủ:", err);
      }
    }

    loadHomeContent();
  }, []);

  if (!pageData) return null;

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
