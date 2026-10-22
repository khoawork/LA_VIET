import { z } from "zod";

/**
 * 1. Schema Section Hero (Biểu ngữ chính & dải thông tin)
 */
export const HomeHeroCollectionSchema = z.object({
  title: z.string().default("Sơn Ta Phú Thọ"),
  // Giữ tên trường cũ để các nhãn đã lưu trong JSON tiếp tục hiển thị đúng.
  desc: z.string().default("CHẤT LIỆU GỐC"),
});

export const HomeHeroSectionSchema = z.object({
  tagline: z.string().optional().default(""),
  title: z
    .string()
    .min(1, "Tiêu đề Hero không được để trống"),
  highlightWord: z.string().default("SƠN MÀI TRUYỀN THỐNG"),
  description: z
    .string()
    .min(1, "Mô tả Hero không được để trống"),
  primaryButton: z.object({
    text: z.string().default("Khám phá bộ sưu tập"),
    href: z.string().default("/projects"),
  }),
  secondaryButton: z.object({
    text: z.string().default("Tư vấn dự án"),
    href: z.string().default("#tu-van"),
  }),
  image: z.object({
    src: z
      .string()
      .default(
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
      ),
  }),
  collections: z.array(HomeHeroCollectionSchema).default([]),
});

/**
 * 2. Schema Section Thống kê thành tựu
 */
export const HomeStatItemSchema = z.object({
  num: z.string(),
  label: z.string(),
  desc: z.string(),
  tag: z.string(),
  icon: z.string().optional(),
});

export const HomeStatisticsSectionSchema = z.object({
  tagline: z.string().default("Năng lực thực chứng"),
  title: z.string().default("NHỮNG CON SỐ ẤN TƯỢNG"),
  description: z
    .string()
    .min(1, "Mô tả Thống kê không được để trống"),
  stats: z.array(HomeStatItemSchema).default([]),
});

/**
 * 3. Schema Section Tiêu điểm dự án (Spotlight)
 */
export const HomeSpotlightInfoBoxSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const HomeSpotlightSectionSchema = z.object({
  tagline: z.string().default("Tiêu điểm dự án"),
  title: z
    .string()
    .default("LIÊN NGÀNH NGHỆ THUẬT: TỪ SƠN HÒM ĐẾN KIẾN TRÚC KHÔNG GIAN"),
  description: z
    .string()
    .default(
      "Nghệ thuật sơn mài không còn giới hạn trong những bức tranh treo tường tĩnh tại mà mở rộng biên độ trở thành ngôn ngữ kiến trúc sống động. Bằng cách khai phá chiều sâu quang học của từng lớp sơn ta, dát vàng và then son, chúng tôi kiến tạo những bức đại bích họa hòa quyện hoàn mỹ vào không gian đương đại.",
    ),
  image: z
    .string()
    .default(
      "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1000&q=80",
    ),
  seal: z.object({
    logo: z.string().default(""),
    line1: z.string().default("Xưởng sơn mài"),
    line2: z.string().default("Là Việt"),
  }),
  infoBoxes: z.array(HomeSpotlightInfoBoxSchema).default([]),
  link: z.object({
    text: z.string().default("Xem chi tiết quy trình chế tác"),
    href: z.string().default("/projects"),
  }),
});

/**
 * 4. Schema Section Tin tức mới nhất trên Trang chủ
 */
export const HomeNewsSectionSchema = z.object({
  tagline: z.string().default("Góc nhìn di sản"),
  title: z.string().default("TIN TỨC MỚI NHẤT"),
  description: z.string().default(""),
  link: z.object({
    text: z.string().default("Xem tất cả tin tức"),
    href: z.string().default("/news"),
  }),
  articleIds: z.array(z.number().int().positive()).default([]).transform((ids) => [...new Set(ids)]),
});

/**
 * 5. Schema Section Đối tác chiến lược & Khách hàng
 */
export const HomePartnerItemSchema = z.union([
  z.string(),
  z.object({
    name: z.string(),
    subtitle: z.string().default(""),
  }),
]).transform((partner) =>
  typeof partner === "string" ? { name: partner, subtitle: "" } : partner,
);

export const HomePartnersSectionSchema = z.object({
  tagline: z.string().default("Mạng lưới đối tác"),
  title: z.string().default("ĐỐI TÁC CHIẾN LƯỢC & DOANH NGHIỆP ĐỒNG HÀNH"),
  description: z
    .string()
    .default(
      "Được tín nhiệm bởi các tổ chức nghệ thuật, tập đoàn bất động sản và khách sạn nghỉ dưỡng hàng đầu.",
    ),
  partners: z.array(HomePartnerItemSchema).default([]),
  testimonial: z.object({
    quote: z
      .string()
      .default(
        "Sơn mài Là Việt mang đến chiều sâu văn hóa và đẳng cấp vượt bậc cho không gian sảnh chính của chúng tôi. Kỹ thuật chế tác thủ công tinh xảo của các nghệ nhân thực sự chinh phục mọi ánh nhìn.",
      ),
    author: z
      .string()
      .default("— Giám đốc Sáng tạo, Tổ hợp Nghỉ dưỡng Quốc tế"),
  }),
});

/**
 * 6. Schema Section Kêu gọi hành động (CTA)
 */
export const HomeCtaSectionSchema = z.object({
  tagline: z.string().default("Giải pháp độc bản"),
  title: z.string().default("KHỞI TẠO DỰ ÁN SƠN MÀI CHO KHÔNG GIAN CỦA BẠN"),
  description: z
    .string()
    .default(
      "Liên hệ với đội ngũ chuyên gia của chúng tôi để được tư vấn các giải pháp thiết kế nghệ thuật độc bản, từ tranh treo phòng khánh tiết đến các bức đại bích họa kiến trúc.",
    ),
  primaryButton: z.object({
    text: z.string().default("Gửi yêu cầu tư vấn"),
    href: z.string().default("/contact"),
  }),
  secondaryButton: z.object({
    text: z.string().default("Tải Profile Năng Lực"),
    href: z.string().default("/projects"),
  }),
});

/**
 * 7. Schema Section Cấu hình SEO Trang chủ
 */
export const HomeSeoSectionSchema = z.object({
  title: z.string().default("LÀ VIỆT | Sơn Mài Hội Họa Liên Ngành"),
  description: z
    .string()
    .default(
      "Nâng tầm nghệ thuật sơn mài truyền thống trong không gian đương đại. Bích họa sơn mài khổ lớn, vách trang trí kiến trúc và nội thất cao cấp.",
    ),
  keywords: z
    .string()
    .default(
      "sơn mài, bích họa sơn mài, nghệ thuật sơn mài, Là Việt, tranh sơn mài",
    ),
  ogImage: z
    .string()
    .default(
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    ),
});

/**
 * Schema tổng hợp toàn bộ các Section của Trang chủ
 */
export const PageHomePropsSchema = z.object({
  hero: HomeHeroSectionSchema,
  statistics: HomeStatisticsSectionSchema,
  spotlight: HomeSpotlightSectionSchema,
  newsSection: HomeNewsSectionSchema,
  partners: HomePartnersSectionSchema,
  cta: HomeCtaSectionSchema,
  seo: HomeSeoSectionSchema,
});

export type PageHomePropsType = z.infer<typeof PageHomePropsSchema>;

/**
 * Schema DTO API Request
 */
export const CreatePageHomeRequestSchema = z.object({
  name: z.string().default("Trang Chủ"),
  slug: z.string().default("home"),
  props: PageHomePropsSchema,
});

export const UpdatePageHomeRequestSchema = z.object({
  name: z.string().optional(),
  props: PageHomePropsSchema,
});

export const PageHomeResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  props: PageHomePropsSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

/**
 * Dữ liệu mặc định chuẩn của toàn bộ nội dung Trang chủ
 */
export const DEFAULT_PAGE_HOME_PROPS: PageHomePropsType = {
  hero: {
    tagline: "",
    title: "NÂNG TẦM NGHỆ THUẬT SƠN MÀI TRUYỀN THỐNG TRONG KHÔNG GIAN ĐƯƠNG ĐẠI",
    highlightWord: "SƠN MÀI TRUYỀN THỐNG",
    description:
      "Là Việt định vị sứ mệnh bảo tồn và phát triển tinh hoa nghệ thuật sơn mài truyền thống Việt Nam; kết hợp nhuần nhuyễn chiều sâu văn hóa bản địa cùng ngôn ngữ kiến trúc và thiết kế đương đại.",
    primaryButton: {
      text: "Khám phá bộ sưu tập",
      href: "/projects",
    },
    secondaryButton: {
      text: "Tư vấn dự án",
      href: "#tu-van",
    },
    image: {
      src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    },
    collections: [
      {
        title: "Sơn Ta Phú Thọ",
        desc: "CHẤT LIỆU GỐC",
      },
      {
        title: "Mài đa tầng & Dát quỳ",
        desc: "KỸ THUẬT TẠO TÁC",
      },
      {
        title: "Đại sảnh & Resort 5*",
        desc: "ỨNG DỤNG TIÊU BIỂU",
      },
      {
        title: "Di sản Độc bản",
        desc: "CHỨNG NHẬN KIỂM ĐỊNH",
      },
    ],
  },
  statistics: {
    tagline: "NĂNG LỰC THỰC CHỨNG",
    title: "NHỮNG CON SỐ ẤN TƯỢNG",
    description:
      "Mỗi tác phẩm là sự kết tinh của hàng chục công đoạn tỉ mỉ kéo dài nhiều tháng, hội tụ tinh hoa bàn tay nghệ nhân và niềm tự hào di sản văn hóa Việt Nam.",
    stats: [
      {
        num: "15+",
        label: "Năm kiến tạo & gìn giữ",
        desc: "Hành trình phục dựng và ứng dụng sơn mài vào đời sống kiến trúc đương đại.",
        tag: "Kinh nghiệm",
        icon: "calendar",
      },
      {
        num: "120+",
        label: "Tác phẩm & Công trình",
        desc: "Hiện diện tại các khách sạn 5 sao, trung tâm văn hóa và tư dinh thượng lưu.",
        tag: "Dự án lớn",
        icon: "landmark",
      },
      {
        num: "45+",
        label: "Đối tác chiến lược",
        desc: "Các tập đoàn bất động sản, viện kiến trúc và bảo tàng nghệ thuật uy tín.",
        tag: "Hợp tác",
        icon: "building",
      },
      {
        num: "98%",
        label: "Đánh giá xuất sắc",
        desc: "Mức độ hài lòng tuyệt đối từ các chuyên gia phê bình nghệ thuật và chủ đầu tư.",
        tag: "Chất lượng",
        icon: "badge-check",
      },
    ],
  },
  spotlight: {
    tagline: "Tiêu điểm dự án",
    title: "LIÊN NGÀNH NGHỆ THUẬT: TỪ SƠN HÒM ĐẾN KIẾN TRÚC KHÔNG GIAN",
    description:
      "Nghệ thuật sơn mài không còn giới hạn trong những bức tranh treo tường tĩnh tại mà mở rộng biên độ trở thành ngôn ngữ kiến trúc sống động. Bằng cách khai phá chiều sâu quang học của từng lớp sơn ta, dát vàng và then son, chúng tôi kiến tạo những bức đại bích họa hòa quyện hoàn mỹ vào không gian đương đại.",
    image:
      "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1000&q=80",
    seal: {
      logo: "",
      line1: "Xưởng sơn mài",
      line2: "Là Việt",
    },
    infoBoxes: [
      { label: "Nghệ nhân chính", value: "NSƯT - Họa sĩ Đỗ Quyên" },
      { label: "Chất liệu chính", value: "Sơn Ta Phú Thọ, Vàng Quỳ" },
      { label: "Không gian áp dụng", value: "Nhà Hát Ca Tầng Đương Đại" },
      { label: "Quy mô công trình", value: "Quảng Đại & Bích Họa 180m²" },
    ],
    link: {
      text: "Xem chi tiết quy trình chế tác",
      href: "/projects",
    },
  },
  newsSection: {
    tagline: "Góc nhìn di sản",
    title: "TIN TỨC MỚI NHẤT",
    description: "",
    link: {
      text: "Xem tất cả tin tức",
      href: "/news",
    },
    articleIds: [],
  },
  partners: {
    tagline: "Mạng lưới đối tác",
    title: "ĐỐI TÁC CHIẾN LƯỢC & DOANH NGHIỆP ĐỒNG HÀNH",
    description:
      "Được tín nhiệm bởi các tổ chức nghệ thuật, tập đoàn bất động sản và khách sạn nghỉ dưỡng hàng đầu.",
    partners: [
      { name: "DOANH NGHIỆP A", subtitle: "TẬP ĐOÀN BẤT ĐỘNG SẢN" },
      { name: "TẬP ĐOÀN B", subtitle: "KHÁCH SẠN NGHỈ DƯỠNG" },
      { name: "BẢO TÀNG C", subtitle: "DI SẢN MỸ THUẬT" },
      { name: "KHÁCH SẠN 5 SAO D", subtitle: "CHUỖI BOUTIQUE QUỐC TẾ" },
      { name: "VIỆN THIẾT KẾ E", subtitle: "KIẾN TRÚC & NỘI THẤT" },
    ],
    testimonial: {
      quote:
        "Sơn mài Là Việt mang đến chiều sâu văn hóa và đẳng cấp vượt bậc cho không gian sảnh chính của chúng tôi. Kỹ thuật chế tác thủ công tinh xảo của các nghệ nhân thực sự chinh phục mọi ánh nhìn.",
      author: "— Giám đốc Sáng tạo, Tổ hợp Nghỉ dưỡng Quốc tế",
    },
  },
  cta: {
    tagline: "Giải pháp độc bản",
    title: "KHỞI TẠO DỰ ÁN SƠN MÀI CHO KHÔNG GIAN CỦA BẠN",
    description:
      "Liên hệ với đội ngũ chuyên gia của chúng tôi để được tư vấn các giải pháp thiết kế nghệ thuật độc bản, từ tranh treo phòng khánh tiết đến các bức đại bích họa kiến trúc.",
    primaryButton: {
      text: "Gửi yêu cầu tư vấn",
      href: "/contact",
    },
    secondaryButton: {
      text: "Tải Profile Năng Lực",
      href: "/projects",
    },
  },
  seo: {
    title: "LÀ VIỆT | Sơn Mài Hội Họa Liên Ngành",
    description:
      "Nâng tầm nghệ thuật sơn mài truyền thống trong không gian đương đại. Bích họa sơn mài khổ lớn, vách trang trí kiến trúc và nội thất cao cấp.",
    keywords:
      "sơn mài, bích họa sơn mài, nghệ thuật sơn mài, Là Việt, tranh sơn mài",
    ogImage:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
  },
};

