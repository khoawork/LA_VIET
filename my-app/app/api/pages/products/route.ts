import { NextRequest } from "next/server";
import { prisma } from "@/prisma/prisma.service";
import { HttpStatus, sendSuccess, validateBody, withErrorHandler } from "@/shared";
import {
  ProductsPageRequestSchema,
  ProductsPageResponseSchema,
  type ProductsPagePropsType,
} from "@/shared/schema/pages/page-product.schema";

// Dữ liệu cấu hình mặc định ban đầu cho Trang Sản Phẩm Là Việt
export const DEFAULT_PRODUCTS_PAGE_CONFIG: {
  name: string;
  slug: string;
  props: ProductsPagePropsType;
} = {
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

export const GET = withErrorHandler(async () => {
  // Lấy dữ liệu cấu hình trang từ DB
  let page = await prisma.page.findUnique({
    where: { slug: "products" },
  });

  if (!page) {
    page = {
      id: 0,
      name: DEFAULT_PRODUCTS_PAGE_CONFIG.name,
      slug: DEFAULT_PRODUCTS_PAGE_CONFIG.slug,
      props: DEFAULT_PRODUCTS_PAGE_CONFIG.props as any,
    };
  }

  // Lấy danh sách sản phẩm thực tế 100% từ Database
  const products = await prisma.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });

  return sendSuccess(
    {
      page,
      products,
    },
    "Lấy dữ liệu trang sản phẩm thành công",
    HttpStatus.OK,
  );
});

export const PUT = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(ProductsPageRequestSchema, request);

  const updatedPage = await prisma.page.upsert({
    where: { slug: "products" },
    update: {
      name: body.name,
      props: body.props as any,
    },
    create: {
      name: body.name,
      slug: "products",
      props: body.props as any,
    },
  });

  const parsed = ProductsPageResponseSchema.parse(updatedPage);

  return sendSuccess(
    parsed,
    "Lưu cấu hình trang sản phẩm thành công",
    HttpStatus.OK,
  );
});

