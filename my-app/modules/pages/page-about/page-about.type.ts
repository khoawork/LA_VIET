import {
  AboutPagePropsSchema,
  AboutPageRequestSchema,
  AboutPageResponseSchema,
  type AboutPagePropsType,
  type AboutPageRequestType,
  type AboutPageResponseType,
} from "@/shared/schema/pages/about-product.schema";
import z from "zod";

export type {
  AboutPagePropsType,
  AboutPageRequestType,
  AboutPageResponseType,
};

export type CreatePageAboutType = z.infer<typeof AboutPageRequestSchema>;
export type UpdatePageAboutType = z.infer<typeof AboutPageRequestSchema>;
export type PageAboutResponseType = z.infer<typeof AboutPageResponseSchema>;

// Dữ liệu cấu hình thực tế chuẩn Là Việt cho Trang Về Chúng Tôi (About)
export const DEFAULT_ABOUT_PAGE_CONFIG: CreatePageAboutType = {
  name: "Trang Về Chúng Tôi",
  slug: "about",
  props: {
    title: "Về chúng tôi | Là Việt - Sơn mài hội hoạ liên ngành",
    description:
      "Công ty TNHH Ứng dụng Liên ngành Sơn mài Hội hoạ Là Việt kết hợp nền tảng nhựa mủ sơn ta Phú Thọ cùng công nghệ bề mặt tiên tiến.",
    image: "",
    herosection: {
      badge: "SƠN MÀI HỘI HOẠ LIÊN NGÀNH",
      heading: "HÀNH TRÌNH TÔN VINH DI SẢN SƠN MÀI TRONG KHÔNG GIAN ĐƯƠNG ĐẠI",
      description:
        "Công ty TNHH Ứng dụng Liên ngành Sơn mài Hội hoạ Là Việt kết hợp nền tảng nhựa mủ sơn ta Phú Thọ nguyên bản cùng các thành tựu vật liệu mới, tạo lập cầu nối giữa di sản hội hoạ hàn lâm và thực tiễn kiến trúc quy mô lớn.",
      metrics: [
        { value: "100%", label: "SƠN TA TỰ NHIÊN" },
        { value: "06+", label: "THÁNG CHẾ TÁC" },
        { value: "ĐỘC BẢN", label: "KHÔNG BẢN SAO" },
      ],
      image: "",
      imageTitle: "LÀ VIỆT",
      imageSubtitle: "ẤN TRIỆN LÀ VIỆT",
    },
    technologySection: {
      badge: "KHÁI LƯỢC HỘI HOẠ LIÊN NGÀNH",
      heading: "TỪ NHỰA CÂY PHÚ THỌ ĐẾN CÔNG NGHỆ BỀ MẶT HIỆN ĐẠI",
      description:
        "Là Việt được hình thành từ trăn trở giải phóng sơn mài khỏi khuôn khổ tranh treo tường thuần tuý. Chúng tôi kế thừa tinh hoa nhựa mủ sơn tự nhiên thu hoạch từ vùng gò đồi Phú Thọ – chất liệu có độ sâu quang học và tính cảm xúc mà không hoá chất nào thay thế được.\n\nThông qua liên minh chiến lược công nghệ cùng Sơn Hoa Việt, Là Việt mở rộng giới hạn của sơn mài truyền thống lên các vật liệu kiến trúc hiện đại: nhôm tấm hàng không, sợi thuỷ tinh đúc khổ lớn, đá tự nhiên và thép chịu nhiệt, đáp ứng các tiêu chuẩn khắt khe về phòng chống trầy xước, chịu ẩm và kháng tia UV trong nội ngoại thất công trình hạng sang.",
      description1:
        "Là Việt được hình thành từ trăn trở giải phóng sơn mài khỏi khuôn khổ tranh treo tường thuần tuý. Chúng tôi kế thừa tinh hoa nhựa mủ sơn tự nhiên thu hoạch từ vùng gò đồi Phú Thọ – chất liệu có độ sâu quang học và tính cảm xúc mà không hoá chất nào thay thế được.",
      description2:
        "Thông qua liên minh chiến lược công nghệ cùng Sơn Hoa Việt, Là Việt mở rộng giới hạn của sơn mài truyền thống lên các vật liệu kiến trúc hiện đại: nhôm tấm hàng không, sợi thuỷ tinh đúc khổ lớn, đá tự nhiên và thép chịu nhiệt, đáp ứng các tiêu chuẩn khắt khe về phòng chống trầy xước, chịu ẩm và kháng tia UV trong nội ngoại thất công trình hạng sang.",
      stats: [
        {
          id: "years",
          label: "NĂM TÍCH LUỸ NGHỀ",
          value: "20",
          unit: "+",
          description: "Kế thừa và gìn giữ tinh hoa kỹ thuật sơn mài truyền thống.",
          accentColor: "text-[#9A1C1F]",
        },
        {
          id: "projects",
          label: "DỰ ÁN QUY MÔ LỚN",
          value: "120",
          unit: "+",
          description:
            "Ứng dụng đại sảnh ngoại giao, khách sạn 5 sao và dinh thự tư nhân.",
          accentColor: "text-[#96671E]",
        },
        {
          id: "artisans",
          label: "NGHỆ NHÂN CƠ HỮU",
          value: "40",
          unit: "+",
          description: "Đội ngũ thợ sơn then, thếp vàng và nghệ sĩ tạo hình bậc thầy.",
          accentColor: "text-[#1E1917]",
        },
        {
          id: "origin",
          label: "SƠN TA CHÍNH GỐC",
          value: "100",
          unit: "%",
          description: "Nhựa mủ tự nhiên khai thác tại vùng gò đồi đất tổ Phú Thọ.",
          accentColor: "text-[#9A1C1F]",
        },
      ],
      workshop: {
        image:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
        badge: "XƯỞNG CHẾ TÁC HỘI HỌA",
        caption: "Bảo tồn kỹ thuật ủ ẩm mùn cưa và mài nước truyền thống",
      },
    },
    valuesSection: {
      items: [
        {
          id: "vision",
          category: "TẦM NHÌN ĐƯƠNG ĐẠI",
          title: "TỔ HỢP SƠN MÀI HÀNG ĐẦU KHU VỰC",
          description:
            "Trở thành tổ hợp sáng tạo sơn mài hội họa liên ngành tiên phong tại Đông Nam Á, thiết lập tiêu chuẩn thẩm mỹ mới trong không gian kiến trúc toàn cầu thông qua sự kết hợp tinh tế giữa nghệ thuật thị giác và công nghệ công trình.",
          tag: "ĐỊNH VỊ KHU VỰC & TOÀN CẦU",
          gradient: "from-[#9A1C1F] via-[#9A1C1F]/80 to-transparent",
          accentColor: "text-[#9A1C1F]",
        },
        {
          id: "mission",
          category: "SỨ MỆNH KHỞI SINH",
          title: "BẢO CHỨNG DI SẢN TRONG ĐỜI SỐNG",
          description:
            "Tuyệt đối tôn trọng và gìn giữ quy trình thủ công 12–20 công đoạn nghiêm ngặt; đồng thời không ngừng khai mở các cấu trúc vật liệu lai ghép để chất liệu sơn mài hòa nhịp sinh động cùng phong cách sống đương đại.",
          tag: "BẢO TỒN & TIẾN HÓA VẬT LIỆU",
          gradient: "from-[#96671E] via-[#96671E]/80 to-transparent",
          accentColor: "text-[#96671E]",
        },
        {
          id: "core-values",
          category: "GIÁ TRỊ CỐT LÕI",
          title: "4 TRỤ CỘT BỀN VỮNG",
          description:
            "Định chuẩn chất lượng dựa trên sự nghiêm cẩn trong học thuật hội hoạ và độ chính xác kỹ thuật thi công xây dựng cao cấp.",
          tag: "TIÊU CHUẨN THẨM MỸ KHẮT KHE",
          gradient: "from-[#4A423D] via-[#4A423D]/80 to-transparent",
          accentColor: "text-[#4A423D]",
          pillars: [
            "Mastery Craft: Tinh hoa kỹ xảo thủ công sơn ta chuẩn mực.",
            "Interdisciplinary: Ứng dụng liên ngành vật liệu và kiến trúc.",
            "Bespoke Heritage: Độc bản hóa từng không gian danh giá.",
            "Timeless Quality: Độ bền truyền đời cùng năm tháng.",
          ],
        },
      ],
    },
    organizationSection: {
      badge: "CẤU TRÚC TỔ CHỨC",
      heading: "SƠ ĐỒ BỘ MÁY QUẢN TRỊ & SÁNG TÁC",
      description:
        "Mô hình kết hợp nhuần nhuyễn giữa Viện thẩm mỹ giám tuyển nghệ thuật, nhà xưởng nghệ nhân truyền thống và phòng thí nghiệm vật liệu ứng dụng.",
      leaders: [
        {
          id: "chairman",
          name: "ÔNG NGUYỄN VĂN PHAN",
          role: "CHỦ TỊCH HĐQT & SÁNG LẬP",
          tag: "HỘI ĐỒNG QUẢN TRỊ",
          bio: "Định hướng chiến lược tối cao, bảo tồn và phát huy giá trị di sản văn hóa sơn mài thuần Việt trong kỷ nguyên mới.",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
          department: "Hội Đồng Quản Trị",
          accentColor: "border-[#9A1C1F] text-[#9A1C1F]",
        },
        {
          id: "ceo",
          name: "KTS. PHAN VĂN THÌN THỌ",
          role: "TỔNG GIÁM ĐỐC ĐIỀU HÀNH",
          tag: "CEO & GIÁM ĐỐC NGHỆ THUẬT",
          bio: "Điều hành tổng thể, tiên phong phát triển các giải pháp kiến trúc, công nghệ bề mặt & hội họa liên ngành đỉnh cao.",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
          department: "Ban Điều Hành & Nghệ Thuật",
          accentColor: "border-[#96671E] text-[#96671E]",
        },
      ],
      divisions: [
        {
          code: "KHỐI 01",
          title: "GIÁM ĐỐC NGHỆ THUẬT & SÁNG TÁC",
          subtitle: "Artistic Director",
          description:
            "Chủ trì xưởng chế tác hội họa khổ lớn, nghệ nhân bậc thầy sơn thếp, đắp nổi mài phẳng và cẩn xà cừ cổ truyền.",
          focus: "Atelier & Master Artisans",
          accentBorder: "border-t-[#9A1C1F]",
        },
        {
          code: "KHỐI 02",
          title: "GIÁM ĐỐC R&D VẬT LIỆU MỚI",
          subtitle: "R&D Director",
          description:
            "Kỹ thuật sơn công nghệ liên ngành phối hợp chuyên sâu cùng Sơn Hoa Việt, thử nghiệm bám dính và kháng thời tiết.",
          focus: "High-tech Lab & Chemical Testing",
          accentBorder: "border-t-[#96671E]",
        },
        {
          code: "KHỐI 03",
          title: "GIÁM ĐỐC TƯ VẤN DỰ ÁN KIẾN TRÚC",
          subtitle: "Architectural Project Director",
          description:
            "Tư vấn giải pháp nội thất bespoke cho dinh thự, khách sạn resort 5 sao và các không gian ngoại giao cấp cao.",
          focus: "Bespoke Architectural Studio",
          accentBorder: "border-t-[#4A423D]",
        },
        {
          code: "KHỐI 04",
          title: "GIÁM ĐỐC THI CÔNG & BẢO TỒN DI SẢN",
          subtitle: "Execution & Heritage Director",
          description:
            "Quản trị thi công quy mô lớn, kiểm soát vi khí hậu và lập hồ sơ bảo dưỡng phục hồi định kỳ tác phẩm dài hạn.",
          focus: "Execution & Archival Maintenance",
          accentBorder: "border-t-[#9A1C1F]",
        },
      ],
    },
    partnersSection: {
      badge: "HỢP TÁC & BẢO CHỨNG",
      heading: "ĐỐI TÁC CHIẾN LƯỢC & KHÁCH HÀNG DOANH NGHIỆP",
      items: [
        {
          name: "SƠN HOA VIỆT",
          role: "ĐỐI TÁC R&D KỸ THUẬT",
          category: "technology",
          logo: "",
        },
        {
          name: "VINPEARL RESORTS",
          role: "KHÔNG GIAN VĂN HOÁ ĐẠI SẢNH",
          category: "hospitality",
          logo: "",
        },
        {
          name: "BẢO TÀNG MỸ THUẬT",
          role: "GIÁM ĐỊNH & PHỤC CHẾ",
          category: "heritage",
          logo: "",
        },
        {
          name: "PARK HYATT SAIGON",
          role: "BESPOKE SUITE ARTWORKS",
          category: "hospitality",
          logo: "",
        },
        {
          name: "MASTERISE HOMES",
          role: "VÁCH TRANG TRÍ SẢNH VIP",
          category: "real-estate",
          logo: "",
        },
        {
          name: "AA CORPORATION",
          role: "GIA CÔNG BỀ MẶT NỘI THẤT",
          category: "interior",
          logo: "",
        },
      ],
      testimonial: {
        quote:
          "“Sơn mài không thể chỉ dừng lại là món quà lưu niệm hay bức tranh đóng khung trên tường. Là Việt đang biến sơn mài thành ngôn ngữ của kiến trúc tầm vóc quốc gia.”",
        organization: "HỘI ĐỒNG CỐ VẤN THẨM MỸ SƠN MÀI VIỆT NAM",
        note: "Đánh giá chuyên môn niên khoá 2024",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      },
    },
    ctaSection: {
      badge: "KHỞI TẠO TÁC PHẨM ĐỘC BẢN",
      heading: "ĐỒNG HÀNH KIẾN TẠO DỰ ÁN CÙNG LÀ VIỆT",
      description:
        "Hãy liên hệ với đội ngũ giám tuyển và kỹ sư chuyên môn của chúng tôi để đưa tinh hoa sơn mài hội hoạ vào không gian kiến trúc của bạn.",
      primaryButton: {
        label: "ĐẶT LỊCH TƯ VẤN CHUYÊN GIA",
        link: "/contact",
      },
      secondaryButton: {
        label: "XEM CATALOGUE DỰ ÁN",
        link: "/products",
      },
    },
    enabledSections: {
      herosection: true,
      technologySection: true,
      valuesSection: true,
      organizationSection: true,
      partnersSection: true,
      ctaSection: true,
    },
  },
};

