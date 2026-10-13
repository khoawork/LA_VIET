import { ProductCategory, ProductItem } from "../types";

export interface CategoryFilterItem {
  id: ProductCategory;
  label: string;
}

export const PRODUCT_CATEGORIES: CategoryFilterItem[] = [
  { id: "ALL", label: "TẤT CẢ TÁC PHẨM (24)" },
  { id: "TRANH_KHO_LON", label: "TRANH SƠN MÀI KHỔ LỚN" },
  { id: "VACH_KIEN_TRUC", label: "VÁCH TRANG TRÍ KIẾN TRÚC" },
  { id: "NOI_THAT_CAO_CAP", label: "NỘI THẤT SƠN MÀI CAO CẤP" },
  { id: "VAT_PHAM_DOC_BAN", label: "VẬT PHẨM ỨNG DỤNG ĐỘC BẢN" },
  { id: "SON_HOA_VIET", label: "HỆ SƠN HOA VIỆT (ỨNG DỤNG LIÊN NGÀNH)" },
];

export const PRODUCTS_SAMPLE_DATA: ProductItem[] = [
  {
    id: "1",
    badge: "ĐỘC BẢN SỐ 01/01",
    badgeColor: "red",
    dimension: "240 X 120 CM",
    category: "TRANH_KHO_LON",
    categoryName: "BÍCH HOẠ SƠN MÀI KHỔ LỚN",
    name: "Vũ Điệu Phù Sa",
    description:
      "Tác phẩm trừu tượng biểu đạt trầm tích châu thổ sông Hồng. Sử dụng 12 lớp sơn hom truyền thống, dát vàng quỳ Kiêu Kỵ 9999, cẩn vỏ trứng vịt vôi và kỹ thuật mài lộ cơ hữu tạo lớp…",
    material: "VẬT LIỆU: VÀNG QUỲ, SƠN TA, VỎ TRỨNG",
    yearOrSpec: "NĂM: 2024",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    isTechnicalSpec: false,
  },
  {
    id: "2",
    badge: "ỨNG DỤNG NỘI THẤT",
    badgeColor: "dark",
    dimension: "180 X 90 X 42 CM",
    category: "NOI_THAT_CAO_CAP",
    categoryName: "NỘI THẤT SƠN MÀI CAO CẤP",
    name: "Bàn Trà Hoàng Triều",
    description:
      "Cốt gỗ gõ đỏ tự nhiên nguyên khối được xử lý chống co ngót trước khi bao phủ bởi 18 lượt sơn then và sơn cánh gián. Bề mặt phối trộn bột bạc tán mịn tạo hiệu ứng thị giác tầng sâu",
    material: "CỐT GỖ: GÕ ĐỎ & SƠN THEN ĐEN",
    yearOrSpec: "NĂM: 2025",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    isTechnicalSpec: false,
  },
  {
    id: "3",
    badge: "BỘ BA TẤM (TRIPTYCH)",
    badgeColor: "red",
    dimension: "360 X 180 CM",
    category: "VACH_KIEN_TRUC",
    categoryName: "VÁCH TRANG TRÍ KIẾN TRÚC",
    name: "Cửu Long Ẩn Vân",
    description:
      "Bộ tam bình sơn mài khổ đại tái hiện điển tích rồng thiêng ẩn mây. Hơn 300 vỏ trai ngọc và xà cừ biển sâu được nghệ nhân gọt tỉa thủ công từng mảnh milimet, cẩn chìm sâu dưới",
    material: "CHẤT LIỆU: CẨN XÀ CỪ, BẠC CỰU",
    yearOrSpec: "NĂM: 2024",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80",
    isTechnicalSpec: false,
  },
  {
    id: "4",
    badge: "BỘ 3 VẬT PHẨM",
    badgeColor: "dark",
    dimension: "H 65 - 85 CM",
    category: "VAT_PHAM_DOC_BAN",
    categoryName: "VẬT PHẨM ỨNG DỤNG ĐỘC BẢN",
    name: "Họa Sắc Đông Dương",
    description:
      "Cốt gốm sành mộc nung lò củi nhiệt độ 1250°C kết hợp cùng nghệ thuật sơn phủ đa lớp. Sắc đỏ chu sa và vàng lá rực rỡ gợi nhớ vẻ đẹp kiêu sa của mỹ thuật Đông Dương thế kỷ XX.",
    material: "CỐT GỐM SÀNH & CHU SA TỰ NHIÊN",
    yearOrSpec: "NĂM: 2025",
    image:
      "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=800&q=80",
    isTechnicalSpec: false,
  },
  {
    id: "5",
    badge: "ỨNG DỤNG KIẾN TRÚC",
    badgeColor: "dark",
    dimension: "MODULE 120 X 240 CM",
    category: "VACH_KIEN_TRUC",
    categoryName: "VÁCH TRANG TRÍ KIẾN TRÚC",
    name: "Âm Vang Sóng Biển",
    description:
      "Hệ vách ốp ghép nối module liền mạch mô phỏng nhịp điệu của biển khơi trong đêm trăng. Hiệu ứng tán xạ ánh sáng tự nhiên thông qua kỹ nghệ rây bột bạc và mài xước vi mô có…",
    material: "CHẤT LIỆU: BỘT BẠC, KHOÁNG THẠCH",
    yearOrSpec: "NĂM: 2024",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    isTechnicalSpec: false,
  },
  {
    id: "6",
    badge: "ĐỘC BẢN SỐ 01/03",
    badgeColor: "red",
    dimension: "200 X 50 X 85 CM",
    category: "NOI_THAT_CAO_CAP",
    categoryName: "NỘI THẤT SƠN MÀI CAO CẤP",
    name: "Tủ Console Tinh Hoa",
    description:
      "Sự kết hợp tinh tế giữa phụ kiện đồng thau đúc thủ công và 20 chu kỳ mài nước bề mặt. Cánh tủ thể hiện đồ án trừu tượng lấy cảm hứng từ cấu trúc triện son cổ truyền Việt…",
    material: "CỐT GỖ WALNUT, ĐỒNG THAU XƯỚC",
    yearOrSpec: "NĂM: 2025",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    isTechnicalSpec: false,
  },
  {
    id: "7",
    badge: "HỆ SƠN CÔNG NGHỆ CAO",
    badgeColor: "red",
    dimension: "SƠN HOA VIỆT",
    category: "SON_HOA_VIET",
    categoryName: "VẬT LIỆU SƠN PHỦ CHUYÊN DỤNG",
    name: "Hệ Sơn Men Sứ & Men Gốm Hoa Việt",
    description:
      "Dòng sơn men sứ công nghệ cao bám dính siêu việt trên cốt gốm sứ, kính, kim loại và composite. Chịu nhiệt, kháng hóa chất, tạo độ bóng sâu và bề mặt nhẵn mịn như men gốm…",
    material: "ỨNG DỤNG: GỐM, KÍNH, KIM LOẠI, COMPOSITE",
    yearOrSpec: "QUY CÁCH: 1L - 5L - 20L",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    isTechnicalSpec: true,
  },
  {
    id: "8",
    badge: "SƠN HIỆU ỨNG MỸ THUẬT",
    badgeColor: "dark",
    dimension: "SƠN HOA VIỆT",
    category: "SON_HOA_VIET",
    categoryName: "BẢO VỆ & HIỆU ỨNG SƠN MÀI",
    name: "Hệ Sơn Đa Năng 2K & Sơn Nhũ Kim Hoa Việt",
    description:
      "Sơn 2K bóng trong suốt bảo vệ bề mặt sơn mài, sơn nhũ vàng kim/bạc lấp lánh phối hợp cùng sơn ta truyền thống trên mọi bề mặt gỗ, MDF, sắt mạ kẽm và nhựa cao cấp.",
    material: "CHẤT LIỆU: POLYURETHANE 2K, NHŨ VÀNG/BẠC",
    yearOrSpec: "TIÊU CHUẨN: CHỐNG Ố VÀNG & UV",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    isTechnicalSpec: true,
  },
];

