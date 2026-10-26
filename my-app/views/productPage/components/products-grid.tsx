import Image from "next/image";
import { ArrowUpRight, PackageOpen, Loader2 } from "lucide-react";
import { PagePagination } from "@/shared/components/page-pagination";
import { ProductItem } from "../types";

interface ProductsGridProps {
  products: ProductItem[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading: boolean;
  error: string;
}

function hasLightBackground(hex: string): boolean {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);
  return (red * 299 + green * 587 + blue * 114) / 1000 >= 160;
}

export function ProductsGrid({
  products,
  page,
  totalPages,
  onPageChange,
  loading,
  error,
}: ProductsGridProps) {
  return (
    <section className="w-full bg-[#F7F5F0] py-10">
      <div className="w-full max-w-[1280px] mx-auto px-6 space-y-8">
        {/* 3-Column Responsive Grid */}
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-[#78665E]">
            <Loader2 className="h-5 w-5 animate-spin" /> Đang tải sản phẩm...
          </div>
        ) : error ? (
          <div role="alert" className="py-16 text-center text-sm text-red-700">{error}</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => {
              const badge = item.props?.badge;
              const badgeColor = item.props?.badgeColor || "red";
              const customBadgeColor = /^#[0-9a-fA-F]{6}$/.test(badgeColor)
                ? badgeColor
                : null;
              const dimension = item.props?.dimension;
              const material = item.props?.material;
              const yearOrSpec = item.props?.yearOrSpec;
              const categoryName = item.category?.name || item.title;
              const buttonLabel = item.props?.buttonLabel?.trim();

              return (
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
                    {badge && <div
                      style={customBadgeColor ? { backgroundColor: customBadgeColor } : undefined}
                      className={`absolute top-2 left-2 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[1px] shadow-sm ${
                        customBadgeColor
                          ? "outline outline-1 outline-black/10 -outline-offset-1"
                          : badgeColor === "red"
                          ? "bg-[linear-gradient(90deg,#B71C1C_0%,#8E1414_100%)] outline outline-1 outline-white/20 -outline-offset-1"
                          : "bg-[linear-gradient(90deg,#2B1F1A_0%,#453229_100%)] outline outline-1 outline-white/10 -outline-offset-1"
                      } ${customBadgeColor && hasLightBackground(customBadgeColor) ? "text-[#1E1917]" : "text-white"}`}
                    >
                      {badge}
                    </div>}

                    {/* Bottom-Right Dimension Badge */}
                    {dimension && (
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-white/95 backdrop-blur-[2px] outline outline-1 outline-[#E5DCD0] -outline-offset-1 text-[#2B1F1A] text-[11px] font-semibold uppercase tracking-[0.55px]">
                        {dimension}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      {categoryName && <span className="text-[#B71C1C] text-[11px] font-bold uppercase tracking-[1.1px] block">
                        {categoryName}
                      </span>}
                      <h3 className="text-[#2B1F1A] text-[20px] font-bold leading-7 group-hover:text-[#B71C1C] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-[#61524D] text-[12px] leading-[19.5px] font-normal line-clamp-3 pt-1">
                        {item.description}
                      </p>
                    </div>

                    {/* Specs & Action Buttons */}
                    {(material || yearOrSpec || buttonLabel) && <div className="pt-3 border-t border-[#E5DCD0]/60 space-y-3">
                      {/* Specs Row */}
                      {(material || yearOrSpec) && <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-wider">
                        {material && <span className="text-[#78665E] font-medium truncate max-w-[65%]">
                          {material}
                        </span>}
                        {yearOrSpec && <span className="text-[#947816] font-semibold shrink-0">
                          {yearOrSpec}
                        </span>}
                      </div>}

                      {/* Actions Row */}
                      {buttonLabel && <div className="flex items-stretch gap-1 pt-1">
                        <button
                          type="button"
                          className="flex-1 py-2.5 px-4 bg-[linear-gradient(180deg,#FAF6EE_0%,#F1E5D5_100%)] outline outline-1 outline-[#D9CEBE] -outline-offset-1 text-[#2B1F1A] text-[12px] font-semibold tracking-[0.6px] hover:bg-[#FAF6EE] transition-colors cursor-pointer text-center"
                        >
                          {buttonLabel}
                        </button>
                        <button
                          type="button"
                          aria-label="Xem chi tiết"
                          className="px-3 bg-[linear-gradient(90deg,#B71C1C_0%,#93000B_100%)] text-white flex items-center justify-center hover:opacity-95 transition-opacity cursor-pointer shrink-0 group/btn"
                        >
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>}
                    </div>}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#E5DCD0] space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF4EB] text-[#B71C1C] flex items-center justify-center">
              <PackageOpen className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#2B1F1A]">
              Chưa có tác phẩm nào để hiển thị
            </h4>
            <p className="text-xs text-[#78665E] max-w-md mx-auto">
              Không có tác phẩm nào thuộc danh mục này hoặc toàn bộ tác phẩm đang được cài đặt ẩn từ trang quản trị.
            </p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <PagePagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            className="pt-4"
          />
        )}
      </div>
    </section>
  );
}
