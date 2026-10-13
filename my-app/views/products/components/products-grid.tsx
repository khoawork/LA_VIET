import Image from "next/image";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { ProductCategory } from "../types";
import { PRODUCTS_SAMPLE_DATA } from "../data/products.data";

interface ProductsGridProps {
  activeCategory: ProductCategory;
}

export function ProductsGrid({ activeCategory }: ProductsGridProps) {
  const filteredProducts =
    activeCategory === "ALL"
      ? PRODUCTS_SAMPLE_DATA
      : PRODUCTS_SAMPLE_DATA.filter((item) => item.category === activeCategory);

  return (
    <section className="w-full bg-[#F7F5F0] py-10">
      <div className="w-full max-w-[1280px] mx-auto px-6 space-y-8">
        {/* Sub-header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5DCD0]/50">
          <span className="text-[#78665E] text-[12px] font-medium uppercase tracking-[1.2px]">
            HIỂN THỊ {filteredProducts.length} TÁC PHẨM &amp; DÒNG SƠN TIÊU BIỂU GIÁM TUYỂN ĐỢT 1 / 2025
          </span>
          <div className="flex items-center gap-2 text-[#B71C1C] text-[12px] font-semibold uppercase tracking-[1.2px]">
            <Sparkles className="w-3.5 h-3.5 text-[#B71C1C] shrink-0" />
            <span>PHÂN LOẠI THEO VẬT LIỆU &amp; CÔNG NGHỆ LIÊN NGÀNH</span>
          </div>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <article
              key={item.id}
              className="bg-[linear-gradient(180deg,white_0%,#FAF4EB_100%)] outline outline-1 outline-[#E5DCD0] -outline-offset-1 flex flex-col justify-between overflow-hidden shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow group"
            >
              {/* Product Image Header */}
              <div className="relative aspect-[4/3] bg-[#FAF6EE] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top-Left Badge */}
                <div
                  className={`absolute top-2 left-2 px-2.5 py-0.5 text-white text-[10px] font-bold uppercase tracking-[1px] shadow-sm ${
                    item.badgeColor === "red"
                      ? "bg-[linear-gradient(90deg,#B71C1C_0%,#8E1414_100%)] outline outline-1 outline-white/20 -outline-offset-1"
                      : "bg-[linear-gradient(90deg,#2B1F1A_0%,#453229_100%)] outline outline-1 outline-white/10 -outline-offset-1"
                  }`}
                >
                  {item.badge}
                </div>

                {/* Bottom-Right Dimension Badge */}
                {item.dimension && (
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-white/95 backdrop-blur-[2px] outline outline-1 outline-[#E5DCD0] -outline-offset-1 text-[#2B1F1A] text-[11px] font-semibold uppercase tracking-[0.55px]">
                    {item.dimension}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[#B71C1C] text-[11px] font-bold uppercase tracking-[1.1px] block">
                    {item.categoryName}
                  </span>
                  <h3 className="text-[#2B1F1A] text-[20px] font-bold leading-7 group-hover:text-[#B71C1C] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[#61524D] text-[12px] leading-[19.5px] font-normal line-clamp-3 pt-1">
                    {item.description}
                  </p>
                </div>

                {/* Specs & Action Buttons */}
                <div className="pt-3 border-t border-[#E5DCD0]/60 space-y-3">
                  {/* Specs Row */}
                  <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-wider">
                    <span className="text-[#78665E] font-medium truncate max-w-[65%]">
                      {item.material}
                    </span>
                    <span className="text-[#947816] font-semibold shrink-0">
                      {item.yearOrSpec}
                    </span>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-stretch gap-1 pt-1">
                    <button
                      type="button"
                      className="flex-1 py-2.5 px-4 bg-[linear-gradient(180deg,#FAF6EE_0%,#F1E5D5_100%)] outline outline-1 outline-[#D9CEBE] -outline-offset-1 text-[#2B1F1A] text-[12px] font-semibold uppercase tracking-[0.6px] hover:bg-[#FAF6EE] transition-colors cursor-pointer text-center"
                    >
                      {item.isTechnicalSpec
                        ? "XEM THÔNG SỐ KỸ THUẬT"
                        : "CHI TIẾT TÁC PHẨM"}
                    </button>
                    <button
                      type="button"
                      aria-label="Xem chi tiết"
                      className="px-3 bg-[linear-gradient(90deg,#B71C1C_0%,#93000B_100%)] text-white flex items-center justify-center hover:opacity-95 transition-opacity cursor-pointer shrink-0 group/btn"
                    >
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
