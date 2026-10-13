import {
  NewsCategory,
  NewsItem,
  FeaturedNewsItem,
  NewsStat,
} from "../types/news.type";

export const NEWS_CATEGORIES = [
  { id: "all" as NewsCategory, label: "TẤT CẢ BẢN TIN" },
  {
    id: "research-material" as NewsCategory,
    label: "NGHIÊN CỨU KỸ NGHỆ & VẬT LIỆU",
  },
  {
    id: "events-exhibition" as NewsCategory,
    label: "SỰ KIỆN & TRIỂN LÃM NGHỆ THUẬT",
  },
  { id: "project-diary" as NewsCategory, label: "NHẬT KÝ CÔNG TRÌNH" },
  {
    id: "interdisciplinary-cooperation" as NewsCategory,
    label: "HỢP TÁC LIÊN NGÀNH SƠN MÀI",
  },
];

export const FEATURED_NEWS: FeaturedNewsItem = {
  id: "featured-1",
  title:
    "Bứt phá giới hạn: Ứng dụng hệ sơn men gốm và sơn 2K bảo vệ tranh sơn mài ngoài trời và không gian lớn",
  slug: "ung-dung-he-son-men-gom-va-son-2k-bao-ve-tranh-son-mai",
  category: "research-material",
  categoryLabel: "NGHIÊN CỨU KỸ NGHỆ & VẬT LIỆU",
  specialBadge: "TIÊU ĐIỂM NGHIÊN CỨU",
  issueNumber: "CHUYÊN KHẢO #42",
  author: "Ban Nghiên cứu Vật liệu Là Việt",
  publishedDate: "15/10/2025",
  readTime: "8 phút",
  verifiedBadge: "Đã qua kiểm định viện vật liệu",
  description:
    "Giải pháp kết hợp đột phá giữa sơn ta hữu cơ truyền thống và hợp chất bảo vệ polymer phủ ngoài, cho phép các tấm hoành phi, bức bích họa sơn mài chịu đựng tia cực tím và độ ẩm khắc nghiệt mà vẫn bảo toàn độ sâu thẳm của mài then, vàng quỳ.",
  imageUrl:
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
  tagBadge: "TIÊU ĐIỂM",
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
};

export const NEWS_STATS: NewsStat[] = [
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
];

export const NEWS_ARTICLES: NewsItem[] = [
  {
    id: "news-1",
    title:
      "Không gian triển lãm ứng dụng sơn mài trong kiến trúc đương đại tại...",
    slug: "khong-gian-trien-lam-ung-dung-son-mai-kien-truc",
    category: "events-exhibition",
    categoryLabel: "SỰ KIỆN & TRIỂN LÃM",
    tagBadge: "TRIỂN LÃM",
    author: "Ban Truyền thông Là Việt",
    publishedDate: "12/10/2025",
    readTime: "5 phút đọc",
    description:
      "Chuỗi đối thoại nghệ thuật mở ra cách tiếp cận mới cho các vách ngăn kiến trúc, cửa trượt hội họa và cột tròn công trình biểu tượng qua ngôn ngữ hội họa sơn mài.",
    imageUrl:
      "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "news-2",
    title:
      "Kỹ nghệ dát vàng quỳ và mài đa tầng trên cốt liệu composite thế hệ",
    slug: "ky-nghe-dat-vang-quy-va-mai-da-tang-composite",
    category: "research-material",
    categoryLabel: "NGHIÊN CỨU KỸ NGHỆ",
    tagBadge: "KỸ NGHỆ CHUYÊN SÂU",
    author: "Nghệ nhân Nguyễn Văn Hiếu",
    publishedDate: "08/10/2025",
    readTime: "7 phút đọc",
    description:
      "Nghiên cứu khả năng tương thích của vàng lá tự nhiên khi tương tác với lõi nền composite chống cong vênh, tạo độ rực rỡ và chiều sâu khúc xạ ánh sáng đa chiều.",
    imageUrl:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "news-3",
    title:
      "Bàn giao đại tác phẩm phù điêu sơn mài 15m cho sảnh trụ sở tập đoàn tài",
    slug: "ban-giao-dai-tac-pham-phu-dieu-son-mai-15m",
    category: "project-diary",
    categoryLabel: "NHẬT KÝ CÔNG TRÌNH",
    tagBadge: "NHẬT KÝ CÔNG TRÌNH",
    author: "Ban Quản lý Dự án",
    publishedDate: "28/09/2025",
    readTime: "6 phút đọc",
    description:
      "Hành trình 180 ngày chế tác và lắp ráp module cơ khí âm tường tinh vi cho kiệt tác phù điêu mô phỏng linh khí sông Lam, khẳng định năng lực thi công công trình lớn.",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "news-4",
    title:
      "Hội thảo chuyên đề: Giải pháp bảo vệ bề mặt sơn ta chống ẩm nhiệt đới",
    slug: "hoi-thao-chuyen-de-giai-phap-bao-ve-be-mat-son-ta",
    category: "interdisciplinary-cooperation",
    categoryLabel: "HỢP TÁC LIÊN NGÀNH",
    tagBadge: "HỢP TÁC SƠN HOA VIỆT",
    author: "Chuyên viên Kỹ thuật Sơn",
    publishedDate: "20/09/2025",
    readTime: "9 phút đọc",
    description:
      "Phân tích dữ liệu thực nghiệm về phản ứng thủy hóa của nhựa cây sơn Phú Thọ kết hợp các lớp màng mỏng kỵ nước gốc dung môi sinh thái, đảm bảo độ bền vĩnh cửu.",
    imageUrl:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "news-5",
    title:
      "Nghệ thuật khảm trứng và ốc xà cừ: Tinh hoa truyền cảm hứng cho kiến",
    slug: "nghe-thuat-kham-trung-va-oc-xa-cu",
    category: "research-material",
    categoryLabel: "KỸ THUẬT TRUYỀN THỐNG",
    tagBadge: "KỸ THUẬT TRUYỀN THỐNG",
    author: "Giám tuyển Nghệ thuật",
    publishedDate: "15/09/2025",
    readTime: "4 phút đọc",
    description:
      "Giải mã câu chuyện chất liệu từ vỏ trứng vịt rạn tự nhiên và xà cừ đại dương, biến hóa thành những mảng hoa văn đương đại ấn tượng trên nền sơn then đen sâu thẳm.",
    imageUrl:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "news-6",
    title:
      "Xu hướng nội thất sơn mài Bespoke trong các không gian Penthouse &...",
    slug: "xu-huong-noi-that-son-mai-bespoke-penthouse",
    category: "events-exhibition",
    categoryLabel: "KIẾN TRÚC & KHÔNG GIAN",
    tagBadge: "KIẾN TRÚC & KHÔNG GIAN",
    author: "KTS. Trần Hoàng Nam",
    publishedDate: "05/09/2025",
    readTime: "6 phút đọc",
    description:
      "Tầm nhìn độc bản khi đưa tranh sơn mài khổ đại và hệ tủ trang trí vào không gian sống thượng lưu, kết hợp hoàn hảo giữa ánh sáng kiến trúc và màu sắc trầm ấm truyền thống.",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
];

