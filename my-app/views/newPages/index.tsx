"use client";

import { useState, useEffect } from "react";
import {
  NewsBreadcrumb,
  NewsHeader,
  NewsFeatured,
  NewsGrid,
  NewsStats,
  NewsCta,
} from "./components";
import { DEFAULT_PAGE_NEW_PROPS, PageNewPropsType } from "./types/pagenew.type";

/**
 * Component nội dung trang Tin Tức & Nghiên Cứu Là Việt (Được đồng bộ động từ CSDL)
 */
export default function NewsPage() {
  const [props, setProps] = useState<PageNewPropsType>(DEFAULT_PAGE_NEW_PROPS);

  useEffect(() => {
    async function loadPage() {
      try {
        const res = await fetch("/api/admin/news/page");
        const json = await res.json();
        if (json.success && json.data?.props) {
          setProps(json.data.props);
        }
      } catch (err) {
        console.error("Lỗi khi tải cấu trúc trang tin tức:", err);
      }
    }

    loadPage();
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col gap-2">
      {/* Section 1: Breadcrumb Điều hướng */}
      <NewsBreadcrumb data={props.header.breadcrumb} />

      {/* Section 2: Tiêu đề & Giới thiệu Chuyên mục */}
      <NewsHeader data={props.header} />

      {/* Section 3: Bài viết Tiêu điểm Nghiên cứu (#42) */}
      <NewsFeatured data={props.featured as any} />

      {/* Section 4: Lưới Bài viết Mới nhất & Bộ lọc Danh mục */}
      <NewsGrid />

      {/* Section 5: Thống kê Khảo cứu & Kiểm nghiệm Vật liệu */}
      <NewsStats data={props.stats} />

      {/* Section 6: Kêu gọi Hợp tác Nghiên cứu & Đăng ký Bản tin */}
      <NewsCta data={props.cta} />
    </div>
  );
}

export { NewsPage };
export * from "./components";
export * from "./services/news.services";
export * from "./types/news.type";
export * from "./types/pagenew.type";
