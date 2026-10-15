import {
  ProductsPagePropsSchema,
  ProductsPageRequestSchema,
  ProductsPageResponseSchema,
} from "@/shared/schema/pages/page-product.schema";
import z from "zod";

export type ProductsPagePropsType = z.infer<typeof ProductsPagePropsSchema>;
export type CreatePageProductType = z.infer<typeof ProductsPageRequestSchema>;
export type UpdatePageProductType = z.infer<typeof ProductsPageRequestSchema>;
export type PageProductResponseType = z.infer<typeof ProductsPageResponseSchema>;

// Cấu hình mặc định cho Trang Sản Phẩm khi chưa có dữ liệu trong DB
export const DEFAULT_PRODUCTS_PAGE_CONFIG: CreatePageProductType = {
  name: "Trang Sản Phẩm",
  slug: "products",
  props: {
    title: "Bộ Sưu Tập Tác Phẩm Sơn Mài | Là Việt",
    description:
      "Tuyển tập những kiệt tác sơn mài hàn lâm, bình phong và vách nghệ thuật độc bản chế tác thủ công từ cây sơn Phú Thọ.",
    herosection: {
      badge: "GIÁM TUYỂN ĐỘC QUYỀN",
      heading: "DANH MỤC TÁC PHẨM & ỨNG DỤNG SƠN MÀI",
      subHeading: "BẢO TỒN VÀ KHAI MỞ DI SẢN HỘI HOẠ PHƯƠNG ĐÔNG",
      description:
        "Tại xưởng hội hoạ Là Việt, chất liệu sơn ta nguyên bản từ cây sơn Phú Thọ giao thoa cùng tư duy không gian đương đại. Từng nét dát vàng quỳ, cẩn ốc xà cừ hay mài quang kỳ công được chuyển hoá thành các đại hoạ phẩm vách ốp, bàn trà điêu khắc và tác phẩm độc bản – bảo lưu trọn vẹn khí chất phương Đông.",
      metrics: [
        { value: "100%", label: "SƠN TA TỰ NHIÊN" },
        { value: "06+", label: "THÁNG CHẾ TÁC" },
        { value: "ĐỘC BẢN", label: "KHÔNG BẢN SAO" },
      ],
      image: "",
    },
    displayedProductIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
};

