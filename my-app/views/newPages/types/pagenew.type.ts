import { z } from "zod";
import {
  NewsHeaderSectionSchema,
  NewsHighlightStatSchema,
  NewsFeaturedSectionSchema,
  NewsArticlesSectionSchema,
  NewsStatItemSchema,
  NewsStatsSectionSchema,
  NewsCtaSectionSchema,
  NewsSeoSectionSchema,
  PageNewPropsSchema,
  CreatePageNewRequestSchema,
  UpdatePageNewRequestSchema,
  PageNewResponseSchema,
} from "@/shared/schema/pages/pagenew.schema";

// Types cho từng Section của trang Tin tức
export type NewsHeaderSectionType = z.infer<typeof NewsHeaderSectionSchema>;
export type NewsHighlightStatType = z.infer<typeof NewsHighlightStatSchema>;
export type NewsFeaturedSectionType = z.infer<typeof NewsFeaturedSectionSchema>;
export type NewsArticlesSectionType = z.infer<typeof NewsArticlesSectionSchema>;
export type NewsStatItemType = z.infer<typeof NewsStatItemSchema>;
export type NewsStatsSectionType = z.infer<typeof NewsStatsSectionSchema>;
export type NewsCtaSectionType = z.infer<typeof NewsCtaSectionSchema>;
export type NewsSeoSectionType = z.infer<typeof NewsSeoSectionSchema>;

// Type tổng hợp toàn bộ props JSON của trang News
export type PageNewPropsType = z.infer<typeof PageNewPropsSchema>;

// Types cho CRUD bản ghi trang trong bảng `pages`
export type CreatePageNewType = z.infer<typeof CreatePageNewRequestSchema>;
export type UpdatePageNewType = z.infer<typeof UpdatePageNewRequestSchema>;
export type PageNewResponseType = z.infer<typeof PageNewResponseSchema>;

/**
 * Giá trị mặc định chuẩn của toàn bộ nội dung trang Tin tức (khớp với FE hiện tại)
 * Dùng làm khởi tạo ban đầu cho Admin CMS hoặc khi seed database
 */
export const DEFAULT_PAGE_NEW_PROPS: PageNewPropsType = {
  header: {
    breadcrumb: {
      homeText: "Trang chủ",
      homeLink: "/",
      currentPageText: "Tin tức & Nghiên cứu",
    },
    accentColor: "#9A1C1F",
    title: "TIN TỨC, NGHIÊN CỨU & HOẠT ĐỘNG LIÊN NGÀNH",
    description:
      "Không gian tổng hợp các công trình khảo cứu kỹ nghệ chất liệu, chuyên luận bảo tồn di sản hội họa và nhật ký thực thi kiến trúc sơn mài quy mô lớn từ Là Việt cùng các đối tác chuyên môn.",
  },
  featured: {
    specialBadge: "TIÊU ĐIỂM NGHIÊN CỨU",
    issueNumber: "CHUYÊN KHẢO #42",
    verifiedBadge: "Đã qua kiểm định viện vật liệu",
    title:
      "Bứt phá giới hạn: Ứng dụng hệ sơn men gốm và sơn 2K bảo vệ tranh sơn mài ngoài trời và không gian lớn",
    slug: "ung-dung-he-son-men-gom-va-son-2k-bao-ve-tranh-son-mai",
    author: "Ban Nghiên cứu Vật liệu Là Việt",
    publishedDate: "15/10/2025",
    readTime: "8 phút đọc",
    description:
      "Giải pháp kết hợp đột phá giữa sơn ta hữu cơ truyền thống và hợp chất bảo vệ polymer phủ ngoài, cho phép các tấm hoành phi, bức bích họa sơn mài chịu đựng tia cực tím và độ ẩm khắc nghiệt mà vẫn bảo toàn độ sâu thẳm của mài then, vàng quỳ.",
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    buttonText: "ĐỌC TOÀN VĂN NGHIÊN CỨU",
    highlightStats: [
      {
        label: "KHẢ NĂNG CHỐNG TIA UV",
        value: "+350% Bền quang hóa",
        accentColor: "text-[#9A1C1F]",
      },
      {
        label: "KHỔ PANEL TỐI ĐA",
        value: "Đến 24m không mối ghép",
        accentColor: "text-[#96671E]",
      },
    ],
  },
  articlesSection: {
    eyebrow: "DÒNG SỰ KIỆN & HỒ SƠ KỸ THUẬT",
    title: "CÁC BÀI VIẾT VÀ BÁO CÁO MỚI NHẤT",
    sortLabel: "Sắp xếp theo:",
    defaultSort: "Mới nhất",
    emptyText: "Hiện chưa có bài viết nào trong chuyên mục này.",
    itemsPerPage: 6,
  },
  stats: {
    items: [
      {
        id: "docs",
        value: "140+",
        label: "TÀI LIỆU KHẢO CỨU KỸ THUẬT",
        description: "Lưu trữ từ 1998 tới nay",
        color: "text-[#9A1C1F]",
      },
      {
        id: "reports",
        value: "48",
        label: "BÁO CÁO KIỂM NGHIỆM MÀNG SƠN",
        description: "Thực hiện cùng Viện KHCN",
        color: "text-[#786B1E]",
      },
      {
        id: "seminars",
        value: "32",
        label: "HỘI THẢO & TỌA ĐÀM NGHỆ THUẬT",
        description: "Kết nối liên ngành kiến trúc",
        color: "text-[#9A1C1F]",
      },
      {
        id: "digitized",
        value: "100%",
        label: "TÁC PHẨM LƯU TRỮ SỐ HOÁ",
        description: "Dữ liệu quang phổ & cốt vóc",
        color: "text-[#435850]",
      },
    ],
  },
  cta: {
    badge: "CHUYÊN KHẢO KỸ THUẬT & DI SẢN",
    title: "KẾT NỐI HỢP TÁC NGHIÊN CỨU CÙNG LÀ VIỆT",
    description:
      "Đăng ký nhận định kỳ các báo cáo kiểm nghiệm vật liệu sơn ta hữu cơ, chuyên luận bảo tồn nghệ thuật và thông tin hội thảo liên ngành kiến trúc đương đại.",
    primaryButton: {
      text: "LIÊN HỆ BAN NGHIÊN CỨU",
      link: "/contact",
    },
    secondaryButton: {
      text: "ĐĂNG KÝ BẢN TIN CHUYÊN KHẢO",
      link: "#newsletter",
    },
  },
  seo: {
    metaTitle: "Tin tức, Nghiên cứu & Hoạt động Liên ngành | Là Việt",
    metaDescription:
      "Không gian tổng hợp các công trình khảo cứu kỹ nghệ chất liệu và bảo tồn di sản hội họa sơn mài Là Việt.",
    keywords: "sơn mài, là việt, nghiên cứu sơn mài, nghệ thuật đương đại, kỹ nghệ sơn mài",
  },
};

