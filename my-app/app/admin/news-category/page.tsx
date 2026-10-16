import { Metadata } from "next";
import { AdminNewsCategoryView } from "@/views/adminPage/components/modules/admin-news-category-view";

export const metadata: Metadata = {
  title: "Quản Lý Bài Viết & Chuyên Mục | Quản Trị LÀ VIỆT",
  description: "Quản lý bài viết tin tức và chuyên mục phân loại Là Việt",
};

export default function AdminNewsCategoryPage() {
  return <AdminNewsCategoryView />;
}
