import {
  NewsBreadcrumb,
  NewsHeader,
  NewsFeatured,
  NewsStats,
  NewsGrid,
} from "./components";

/**
 * Component nội dung trang Tin Tức & Nghiên Cứu Lã Việt
 */
export default function NewsPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col gap-2">
      {/* 1. Breadcrumb: Trang chủ > Tin tức & Nghiên cứu */}
      <NewsBreadcrumb />

      {/* 2. Tiêu đề trang & Mô tả */}
      <NewsHeader />

      {/* 3. Bài viết tiêu điểm nghiên cứu (#42) */}
      <NewsFeatured />

  

      {/* 5. Lưới bài viết mới nhất + Bộ lọc danh mục + Phân trang */}
      <NewsGrid />

          {/* 4. Khối 4 Thống kê khảo cứu & Kiểm nghiệm (140+, 48, 32, 100%) */}
      <NewsStats />
    </div>
  );
}

export { NewsPage };
export * from "./components";
export * from "./services/news.services";
export * from "./types/news.type";

