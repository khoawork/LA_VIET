import { ProductsView } from "@/views/productPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuyển Tập Tác Phẩm & Ứng Dụng Sơn Mài | LÀ VIỆT",
  description:
    "Danh mục các tác phẩm bích họa sơn mài khổ lớn, vách trang trí kiến trúc, nội thất sơn mài cao cấp và vật phẩm độc bản Là Việt.",
};

export default function ProductsPage() {
  return <ProductsView />;
}
