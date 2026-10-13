import { ProjectItem, ProjectStat, ProcessStep, ProjectCategory } from "../types/project.type";

export const PROJECT_STATS: ProjectStat[] = [
  {
    id: "total",
    label: "TỔNG DỰ ÁN HOÀN THÀNH",
    value: "120",
    unit: "+",
    description: "Khẳng định chất lượng từ công trình công cộng đến không gian tinh hoa.",
    accentColor: "text-[#9A1C1F]",
  },
  {
    id: "partners",
    label: "ĐỐI TÁC DOANH NGHIỆP",
    value: "45",
    unit: "+",
    description: "Tập đoàn bất động sản, chuỗi nghỉ dưỡng quốc tế & ngân hàng hạng A.",
    accentColor: "text-[#96671E]",
  },
  {
    id: "fields",
    label: "LĨNH VỰC ỨNG DỤNG",
    value: "08",
    unit: "Hạng mục",
    description: "Resort 5*, Dinh thự, Du thuyền, Đại sảnh ngoại giao, Bảo tàng tư nhân.",
    accentColor: "text-[#1E1917]",
  },
  {
    id: "scale",
    label: "QUY MÔ BỀ MẶT SƠN MÀI",
    value: "15K",
    unit: "+ m²",
    description: "Thi công chuẩn mực bảo tồn với giải pháp cốt nền kháng ẩm vượt trội.",
    accentColor: "text-[#1E1917]",
  },
];

export const PROJECT_CATEGORIES = [
  { id: "all" as ProjectCategory, label: "TẤT CẢ DỰ ÁN (24)" },
  { id: "hotel-resort" as ProjectCategory, label: "KHÁCH SẠN & RESORT 5*" },
  { id: "grand-hall" as ProjectCategory, label: "ĐẠI SẢNH & VĂN PHÒNG HẠNG A" },
  { id: "mansion-villa" as ProjectCategory, label: "DINH THỰ & BIỆT THỰ TƯ NHÂN" },
  { id: "heritage-culture" as ProjectCategory, label: "BẢO TỒN DI SẢN & VĂN HÓA" },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "cuu-long-khoi-sac",
    title: 'Đại vách "Cửu Long Khởi Sắc"',
    location: "Grand Heritage Luxury Resort",
    yearLocation: "Phú Quốc - 2024",
    category: "hotel-resort",
    categoryLabel: "KHÁCH SẠN & RESORT 5*",
    description:
      "Bộ đại tác phẩm vách trang trí sảnh thông tầng chiều dài 32m, chuyển tải hình tượng sông ngòi vươn mình ra biển lớn.",
    materials:
      "Sơn ta Phú Thọ, vàng quỳ 9999, cẩn ốc xà cừ đỏ, cốt nhôm tổ ong chống võng.",
    scale: "240 m²",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "trung-tam-hoi-nghi-quoc-te",
    title: "Đại Sảnh Trung Tâm Hội Nghị Quốc Tế",
    location: "Khu Ngoại Giao Đoàn Tây Hồ",
    yearLocation: "Hà Nội - 2024",
    category: "grand-hall",
    categoryLabel: "ĐẠI SẢNH HỘI NGHỊ QUỐC TẾ",
    description:
      "Bộ bình phong hoành tráng 16 tấm chủ đề Hòa Khí Non Sông, tạo điểm nhấn ngoại giao trang trọng và đậm bản sắc.",
    materials:
      "Vỏ trứng vịt cẩn viền, then đen tuyền, bạc lá thếp chìm, cốt composite tiêu âm.",
    scale: "180 m²",
    imageUrl:
      "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "dinh-thu-palm-hill",
    title: "Phòng Khánh Tiết Dinh Thự Palm Hill",
    location: "Khu Đô Thị Thảo Điền",
    yearLocation: "TP. Hồ Chí Minh - 2025",
    category: "mansion-villa",
    categoryLabel: "DINH THỰ & BIỆT THỰ TƯ NHÂN",
    description:
      "Tích hợp hệ vách ốp trần sơn mài dát vàng hoa sen cùng cửa lùa giấu khuôn, tạo nên không gian tiếp khách quý phái.",
    materials:
      "Vàng quỳ Kiêu Kỵ, sơn nhì cổ truyền, bột điệp biển, gỗ gõ đỏ tiêu chuẩn sấy ẩm 8%.",
    scale: "95 m²",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Khảo Sát & Giám Tuyển",
    description:
      "Phân tích tinh thần kiến trúc, điều kiện khí hậu vi mô, định hướng ngôn ngữ nghệ thuật và giải pháp cốt nền phù hợp cùng chủ đầu tư.",
    timeOrWarranty: "Thời gian: 10 - 15 ngày",
  },
  {
    step: "02",
    title: "Phác Thảo & Chế Tác Mẫu Thử",
    description:
      "Thực hiện bản vẽ tỷ lệ 1:1, kiểm nghiệm mẫu màu sơn mài thực tế (Mock-up 60×60cm) với nguồn ánh sáng của không gian thực tế.",
    timeOrWarranty: "Thời gian: 15 - 20 ngày",
  },
  {
    step: "03",
    title: "Chế Tác Thủ Công Xưởng",
    description:
      "Trải qua quy trình 12-18 lớp vóc sơn ta truyền thống, ủ ẩm, mài nước, thếp kim hoàn và đánh bóng quang dầu độc quyền của nghệ nhân Là Việt.",
    timeOrWarranty: "Thời gian: 45 - 90 ngày",
  },
  {
    step: "04",
    title: "Lắp Dựng & Bảo Tồn Định Kỳ",
    description:
      "Lắp dựng giấu móc cơ khí chính xác đến từng milimet tại hiện trường, phủ lớp bảo vệ vi khí hậu và thiết lập sổ bảo trì định kỳ 10 năm.",
    timeOrWarranty: "Bảo hành di sản: 10 Năm",
    isWarranty: true,
  },
];

