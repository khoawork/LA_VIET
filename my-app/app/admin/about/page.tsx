import { Metadata } from "next";
import { AdminAboutView } from "@/views/adminPage";

export const metadata: Metadata = {
  title: "Quản Lý Về Chúng Tôi | Quản Trị LÀ VIỆT",
  description: "Chỉnh sửa nội dung câu chuyện, sứ mệnh và giá trị cốt lõi Là Việt",
};

export default function AdminAboutPage() {
  return <AdminAboutView />;
}

