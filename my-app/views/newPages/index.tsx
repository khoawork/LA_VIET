"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  NewsBreadcrumb,
  NewsHeader,
  NewsFeatured,
  NewsGrid,
  NewsStats,
  NewsCta,
} from "./components";
import type { PageNewPropsType } from "./types/pagenew.type";

/**
 * Component nội dung trang Tin Tức & Nghiên Cứu Là Việt (Được đồng bộ động từ CSDL)
 */
export default function NewsPage() {
  const [props, setProps] = useState<PageNewPropsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPage() {
      try {
        const res = await fetch("/api/admin/news/page");
        if (!res.ok) throw new Error("Không thể tải nội dung trang Tin tức.");
        const json = await res.json();
        if (!json.success || !json.data?.props) throw new Error("Chưa có nội dung trang Tin tức.");
        setProps(json.data.props);
      } catch (err) {
        console.error("Lỗi khi tải cấu trúc trang tin tức:", err);
        setError(err instanceof Error ? err.message : "Không thể tải trang Tin tức.");
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, []);

  if (loading) return <div className="flex items-center justify-center gap-2 py-24 text-sm text-[#695D56]"><Loader2 className="h-5 w-5 animate-spin" /> Đang tải trang Tin tức...</div>;
  if (!props) return <div role="alert" className="py-24 text-center text-sm text-red-700">{error}</div>;

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col gap-2">
      {/* Section 1: Breadcrumb Điều hướng */}
      <NewsBreadcrumb data={props.header.breadcrumb} />

      {/* Section 2: Tiêu đề & Giới thiệu Chuyên mục */}
      <NewsHeader data={props.header} />

      {/* Section 3: Bài viết Tiêu điểm Nghiên cứu (#42) */}
      <NewsFeatured data={props.featured} />

      {/* Section 4: Lưới Bài viết Mới nhất & Bộ lọc Danh mục */}
      <NewsGrid data={props.articlesSection} />

      {/* Section 5: Thống kê Khảo cứu & Kiểm nghiệm Vật liệu */}
      <NewsStats data={props.stats} />

      {/* Section 6: Kêu gọi Hợp tác Nghiên cứu & Đăng ký Bản tin */}
      <NewsCta data={props.cta} />
    </div>
  );
}

export { NewsPage };
export * from "./components";
export * from "./types/news.type";
export * from "./types/pagenew.type";
