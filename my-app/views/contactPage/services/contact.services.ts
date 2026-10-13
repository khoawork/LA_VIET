import {
  OfficeLocation,
  ContactChannel,
  ExperienceSpace,
} from "../types/contact.type";

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: "govap",
    name: "VPGD 1 - TP. HỒ CHÍ MINH",
    tabLabel: "VPGD GÒ VẤP, TP.HCM",
    address: "229 Phạm Văn Đồng, Phường 1, Quận Gò Vấp, TP. Hồ Chí Minh",
    hours: "Thứ 2 - Thứ 7 (08:00 - 18:00)",
    mapDistanceNote: "Cách Sân bay Tân Sơn Nhất 7 phút di chuyển",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=229%20Ph%E1%BA%A1m%20V%C4%83n%20%C4%90%E1%BB%93ng%2C%20Ph%C6%B0%E1%BB%9Dng%201%2C%20G%C3%B2%20V%E1%BA%A5p%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "binhduong",
    name: "VPGD 2 - BÌNH DƯƠNG",
    tabLabel: "ATELIER THUẬN AN, BD",
    address:
      "184/29 Đường An Phú 18, KP. Bình Phước B, P. An Phú, TP. Thuận An, Bình Dương",
    tag: "Atelier chế tác nghệ thuật",
    note: "Khu xưởng thực nghiệm & Atelier",
    mapDistanceNote: "Cách trung tâm TP. Thủ Dầu Một 15 phút di chuyển",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=184%2F29%20%C4%90%C6%B0%E1%BB%9Dng%20An%20Ph%C3%BA%2018%2C%20An%20Ph%C3%BA%2C%20Thu%E1%BA%ADn%20An%2C%20B%C3%ACnh%20D%C6%B0%C6%A1ng&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
];

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    title: "TƯ VẤN GIÁM TUYỂN",
    primaryText: "+84 903 123 456",
    secondaryText: "Hotline dự án lớn",
    isRed: true,
  },
  {
    title: "SƠN HOA VIỆT",
    primaryText: "+84 903 654 321",
    secondaryText: "Kỹ thuật liên ngành",
    isRed: false,
  },
  {
    title: "HỒ SƠ THIẾT KẾ",
    primaryText: "contact@sonmailaviet.vn",
    secondaryText: "duan@sonmailaviet.vn",
    isRed: true,
  },
];

export const EXPERIENCE_SPACES: ExperienceSpace[] = [
  {
    id: "showroom-govap",
    tag: "Showroom Gò Vấp",
    title: "Sảnh đón & Thư viện ánh sáng",
    description: "Hơn 120 mẫu hiệu ứng thếp vàng, cẩn trứng & xà cừ.",
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "atelier-binhduong",
    tag: "Atelier Bình Dương",
    title: "Xưởng thực nghiệm & Buồng ủ",
    description: "Quy trình mài nước liên tục 9 lớp mộc truyền thống.",
    imageUrl:
      "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=80",
  },
];
