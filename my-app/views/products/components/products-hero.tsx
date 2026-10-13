import Link from "next/link";
import { Home, ChevronRight, ShieldCheck } from "lucide-react";
import { ProductCategory } from "../types";
import { PRODUCT_CATEGORIES } from "../data/products.data";

interface ProductsHeroProps {
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

export function ProductsHero({
  activeCategory,
  onSelectCategory,
}: ProductsHeroProps) {
  return (
    <section className="w-full bg-[#F3E9DA] border-b border-[#E5DCD0] py-10">
      <div className="w-full max-w-[1280px] mx-auto px-6 space-y-8">
        {/* Breadcrumb & Curator Badge */}
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[1.2px]">
            <Link
              href="/home"
              className="flex items-center gap-1.5 text-[#78665E] hover:text-[#B71C1C] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>TRANG CHỦ</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#B71C1C]/40" />
            <span className="text-[#B71C1C]">TUYỂN TẬP TÁC PHẨM</span>
          </div>

          {/* Curator Tag */}
          <div className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.6px] text-[#B71C1C]">
            <ShieldCheck className="w-4 h-4 text-[#B71C1C]" />
            <span>GIÁM TUYỂN ĐỘC QUYỀN</span>
          </div>
        </div>

        {/* Title, Description & 3 Metrics */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-[36px] font-extrabold uppercase text-[#2B1F1A] leading-tight sm:leading-10 tracking-tight">
            DANH MỤC TÁC PHẨM &amp;<br />
            ỨNG DỤNG SƠN MÀI
          </h1>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-1">
            <p className="text-[#61524D] text-[15px] sm:text-[16px] leading-6 max-w-2xl font-normal">
              Tại xưởng hội hoạ Là Việt, chất liệu sơn ta nguyên bản từ cây sơn Phú Thọ giao thoa cùng tư duy không gian đương đại. Từng nét dát vàng quỳ, cẩn ốc xà cừ hay mài quang kỳ công được chuyển hoá thành các đại hoạ phẩm vách ốp, bàn trà điêu khắc và tác phẩm độc bản – bảo lưu trọn vẹn khí chất phương Đông.
            </p>

            {/* 3 Metrics */}
            <div className="flex items-center gap-6 shrink-0 pt-2 lg:pt-0">
              <div className="flex items-center gap-2">
                <span className="text-[#B71C1C] text-[14px] font-bold uppercase tracking-[0.6px]">
                  100%
                </span>
                <span className="text-[#61524D] text-[11px] font-semibold uppercase tracking-[0.6px] leading-4">
                  SƠN TA TỰ<br />NHIÊN
                </span>
              </div>

              <div className="w-[1px] h-4 bg-[#D9CEBE]" />

              <div className="flex items-center gap-2">
                <span className="text-[#B71C1C] text-[14px] font-bold uppercase tracking-[0.6px]">
                  06+
                </span>
                <span className="text-[#61524D] text-[11px] font-semibold uppercase tracking-[0.6px] leading-4">
                  THÁNG CHẾ<br />TÁC
                </span>
              </div>

              <div className="w-[1px] h-4 bg-[#D9CEBE]" />

              <div className="flex items-center gap-2">
                <span className="text-[#B71C1C] text-[14px] font-bold uppercase tracking-[0.6px]">
                  ĐỘC<br />BẢN
                </span>
                <span className="text-[#61524D] text-[11px] font-semibold uppercase tracking-[0.6px] leading-4">
                  KHÔNG BẢN<br />SAO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Categories Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.6px] transition-all cursor-pointer ${
                  isActive
                    ? "bg-[linear-gradient(90deg,#B71C1C_0%,#93000B_100%)] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] outline outline-1 outline-[#B71C1C] -outline-offset-1"
                    : "bg-white text-[#2B1F1A] outline outline-1 outline-[#E5DCD0] -outline-offset-1 hover:bg-[#FAF4EB]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
