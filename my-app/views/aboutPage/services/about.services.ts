import {
  AboutStat,
  AboutValueItem,
  OrgLeader,
  OrgDivision,
  AboutPartner,
  AboutTestimonial,
} from "../types/about.type";

export const ABOUT_STATS: AboutStat[] = [
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
    description: "Ứng dụng đại sảnh ngoại giao, khách sạn 5 sao và dinh thự tư nhân.",
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
];

export const ABOUT_VALUES: AboutValueItem[] = [
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
];

export const ORG_LEADERS: OrgLeader[] = [
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
];

export const ORG_DIVISIONS: OrgDivision[] = [
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
];

export const ABOUT_PARTNERS: AboutPartner[] = [
  {
    name: "SƠN HOA VIỆT",
    role: "ĐỐI TÁC R&D KỸ THUẬT",
    category: "technology",
  },
  {
    name: "VINPEARL RESORTS",
    role: "KHÔNG GIAN VĂN HOÁ ĐẠI SẢNH",
    category: "hospitality",
  },
  {
    name: "BẢO TÀNG MỸ THUẬT",
    role: "GIÁM ĐỊNH & PHỤC CHẾ",
    category: "heritage",
  },
  {
    name: "PARK HYATT SAIGON",
    role: "BESPOKE SUITE ARTWORKS",
    category: "hospitality",
  },
  {
    name: "MASTERISE HOMES",
    role: "VÁCH TRANG TRÍ SẢNH VIP",
    category: "real-estate",
  },
  {
    name: "AA CORPORATION",
    role: "GIA CÔNG BỀ MẶT NỘI THẤT",
    category: "interior",
  },
];

export const ABOUT_TESTIMONIAL: AboutTestimonial = {
  quote:
    "“Sơn mài không thể chỉ dừng lại là món quà lưu niệm hay bức tranh đóng khung trên tường. Là Việt đang biến sơn mài thành ngôn ngữ của kiến trúc tầm vóc quốc gia.”",
  organization: "HỘI ĐỒNG CỐ VẤN THẨM MỸ SƠN MÀI VIỆT NAM",
  note: "Đánh giá chuyên môn niên khoá 2024",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
};

