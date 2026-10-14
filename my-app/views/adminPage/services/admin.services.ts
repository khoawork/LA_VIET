import {
  AdminNavSection,
  AdminStatItem,
  AdminContentModule,
  AdminActivityLog,
  AdminUser,
} from "../types/admin.type";

export const ADMIN_USER: AdminUser = {
  name: "Quản Trị Viên (Admin)",
  role: "ADMINISTRATOR",
  email: "admin@laviet.vn",
  avatarText: "Q",
};

export const ADMIN_NAV_SECTIONS: AdminNavSection[] = [
  {
    title: "TỔNG QUAN",
    items: [
      {
        id: "dashboard",
        label: "Bảng điều khiển",
        href: "/admin/dashboard",
        icon: "LayoutGrid",
      },
    ],
  },
  {
    title: "NỘI DUNG WEBSITE",
    items: [
      {
        id: "home",
        label: "Trang chủ",
        href: "/admin/home",
        icon: "Home",
      },
      {
        id: "about",
        label: "Về chúng tôi",
        href: "/admin/about",
        icon: "Info",
      },
      {
        id: "products",
        label: "Sản phẩm",
        href: "/admin/products",
        icon: "Package",
        badge: "32",
      },
      {
        id: "project",
        label: "Dự án",
        href: "/admin/project",
        icon: "FolderKanban",
        badge: "24",
      },
      {
        id: "news",
        label: "Tin tức",
        href: "/admin/news",
        icon: "Newspaper",
        badge: "15",
      },
      {
        id: "contact",
        label: "Liên hệ",
        href: "/admin/contact",
        icon: "Mail",
        badge: "4",
      },
    ],
  },
  {
    title: "HỆ THỐNG",
    items: [
      {
        id: "categories",
        label: "Danh mục dữ liệu",
        href: "/admin/system/categories",
        icon: "Database",
      },
      {
        id: "users",
        label: "Tài khoản & Phân quyền",
        href: "/admin/system/users",
        icon: "Users",
      },
      {
        id: "logs",
        label: "Nhật ký hoạt động",
        href: "/admin/system/logs",
        icon: "History",
      },
      {
        id: "menu",
        label: "Menu & Điều hướng",
        href: "/admin/system/menu",
        icon: "Menu",
      },
      {
        id: "forms",
        label: "Quản lý Biểu mẫu (Forms)",
        href: "/admin/system/forms",
        icon: "FileText",
      },
      {
        id: "branding",
        label: "Logo & Footer",
        href: "/admin/system/branding",
        icon: "LayoutTemplate",
      },
    ],
  },
];

export const ADMIN_STATS: AdminStatItem[] = [
  {
    id: "products",
    title: "Sản phẩm",
    value: "32",
    statusText: "đang quản lý",
    icon: "Package",
    href: "/admin/products",
  },
  {
    id: "project",
    title: "Dự án",
    value: "24",
    statusText: "đang triển khai",
    icon: "FolderKanban",
    href: "/admin/project",
  },
  {
    id: "news",
    title: "Tin tức",
    value: "15",
    statusText: "bài đã xuất bản",
    icon: "Newspaper",
    href: "/admin/news",
  },
  {
    id: "contact",
    title: "Hộp thư liên hệ",
    value: "08",
    statusText: "4 thư chưa đọc",
    icon: "Mail",
    href: "/admin/contact",
  },
];

export const ADMIN_CONTENT_MODULES: AdminContentModule[] = [
  {
    id: "home",
    title: "Trang chủ",
    description: "Ảnh bìa hero, giới thiệu tiêu điểm và các khối trưng bày trang chủ.",
    icon: "Home",
    href: "/admin/home",
  },
  {
    id: "about",
    title: "Về chúng tôi",
    description: "Câu chuyện di sản, công nghệ bề mặt, 4 trụ cột và cơ cấu tổ chức Là Việt.",
    icon: "Info",
    href: "/admin/about",
  },
  {
    id: "products",
    title: "Sản phẩm",
    description: "Quản lý 32 tác phẩm sơn mài, bình phong, đại vách, phù điêu nghệ thuật.",
    icon: "Package",
    href: "/admin/products",
  },
  {
    id: "project",
    title: "Dự án",
    description: "Danh sách 24 công trình resort 5 sao, đại sảnh ngoại giao, dinh thự tư nhân.",
    icon: "FolderKanban",
    href: "/admin/project",
  },
  {
    id: "news",
    title: "Tin tức",
    description: "Bài viết nghiên cứu văn hoá, bảo tồn sơn mài và hoạt động triển lãm.",
    icon: "Newspaper",
    href: "/admin/news",
  },
  {
    id: "contact",
    title: "Liên hệ",
    description: "Quản lý 8 thư liên hệ, đặt lịch tư vấn và biểu mẫu yêu cầu báo giá.",
    icon: "Mail",
    href: "/admin/contact",
  },
];

export const ADMIN_RECENT_LOGS: AdminActivityLog[] = [
  {
    id: "log-1",
    author: "Quản trị viên",
    action: "Đã sắp xếp lại thứ tự 10 mục trên Menu điều hướng",
    target: "Menu & Điều hướng",
    time: "12:02",
    type: "update",
  },
  {
    id: "log-2",
    author: "Quản trị viên",
    action: "Cập nhật tác phẩm 'Đại vách Cửu Long Khởi Sắc'",
    target: "Sản phẩm",
    time: "11:45",
    type: "update",
  },
  {
    id: "log-3",
    author: "Biên tập viên",
    action: "Đã xuất bản bài viết 'Khai mở sơn mài liên ngành'",
    target: "Tin tức",
    time: "09:30",
    type: "create",
  },
  {
    id: "log-4",
    author: "Hệ thống",
    action: "Tiếp nhận 01 yêu cầu tư vấn mới từ Resort Heritage Phú Quốc",
    target: "Liên hệ",
    time: "08:15",
    type: "system",
  },
];
