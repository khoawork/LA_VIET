import { Metadata } from "next";
import { AdminContactView } from "@/views/adminPage";

export const metadata: Metadata = {
  title: "Nội Dung Trang Liên Hệ | Quản Trị LÀ VIỆT",
  description: "Chỉnh sửa nội dung trang Liên hệ",
};

export default function AdminContactPage() {
  return <AdminContactView />;
}

