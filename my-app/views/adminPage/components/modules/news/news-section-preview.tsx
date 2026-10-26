"use client";

import {
  Eye,
  Sparkles,
  ShieldCheck,
  Building2,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Globe,
  BookOpenCheck,
  Mail,
  User,
} from "lucide-react";
import type { PageNewPropsType } from "@/views/newPages/types/pagenew.type";
import type { SectionTab } from "./news-tab-nav";

interface NewsSectionPreviewProps {
  activeTab: SectionTab;
  data: PageNewPropsType;
}

export function NewsSectionPreview({ activeTab, data }: NewsSectionPreviewProps) {

  return (
    <div className="bg-white rounded-2xl border border-[#EAE2D5] shadow-xs overflow-hidden flex flex-col sticky top-6">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#FAF8F5] border-b border-[#EAE2D5]">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#9A1C1F]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E1917]">
            Xem trước thực tế (Live Preview)
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Thời gian thực</span>
        </div>
      </div>

      {/* Preview Content Area */}
      <div className="p-5 overflow-y-auto max-h-[calc(100vh-220px)] bg-[#FCFBF9]">
        {/* PREVIEW: HEADER & BREADCRUMB */}
        {activeTab === "header" && (
          <div className="space-y-4 bg-white p-5 rounded-xl border border-[#EAE2D5] shadow-xs">
            {/* Breadcrumb Preview */}
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#695D56]">
                <li>{data.header.breadcrumb.homeText}</li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-[#A89F95]" />
                </li>
                <li className="text-[#a21f1f] font-semibold">
                  {data.header.breadcrumb.currentPageText}
                </li>
              </ol>
            </nav>

            {/* Accent Line */}
            <div
              className="w-10 h-0.5"
              style={{ backgroundColor: data.header.accentColor || "#9A1C1F" }}
            />

            {/* Title */}
            <h1 className="font-black text-2xl sm:text-3xl text-[#1E1917] tracking-tight uppercase leading-[1.2]">
              {data.header.title || "Tiêu đề trang tin tức"}
            </h1>

            {/* Description */}
            <p className="text-xs text-[#5C544E] leading-relaxed">
              {data.header.description || "Mô tả chuyên mục tin tức"}
            </p>
          </div>
        )}

        {/* PREVIEW: FEATURED ARTICLE */}
        {activeTab === "featured" && (
          <div className="bg-white rounded-xl overflow-hidden border border-[#EAE2D5] shadow-xs">
            {/* Top Image Box */}
            <div
              className="relative aspect-[16/9] w-full overflow-hidden bg-[#EAE2D5]"
            >
              <img
                src={
                  data.featured.imageUrl ||
                  "https://placehold.co/800x450?text=Preview+Image"
                }
                alt={data.featured.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#9A1C1F] text-white">
                  {data.featured.specialBadge}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-xs">
                  {data.featured.issueNumber}
                </span>
              </div>
              {data.featured.verifiedBadge && (
                <div className="absolute bottom-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#9A1C1F] bg-white/95 px-2.5 py-1 rounded-md shadow-xs border border-[#EAE2D5]">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{data.featured.verifiedBadge}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 font-bold text-[#9A1C1F]">
                  <Building2 className="w-3 h-3" />
                  <span>{data.featured.author}</span>
                </span>
                <span className="text-[#A89F95]">•</span>
                <span className="inline-flex items-center gap-1 text-[#695D56]">
                  <Calendar className="w-3 h-3" />
                  <span>{data.featured.publishedDate}</span>
                </span>
              </div>

              <h2 className="font-bold text-base text-[#1E1917] leading-snug">
                {data.featured.title}
              </h2>

              <p className="text-xs text-[#5C544E] leading-relaxed line-clamp-3">
                {data.featured.description}
              </p>

              {/* 2 Highlight Stat Boxes */}
              {data.featured.highlightStats &&
                data.featured.highlightStats.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {data.featured.highlightStats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FAF3E8] p-2.5 rounded-lg border border-[#EFE2D0]"
                      >
                        <span className="text-[9px] font-bold text-[#695D56] uppercase tracking-wider block">
                          {stat.label}
                        </span>
                        <span
                          className={`text-xs font-bold mt-0.5 block ${stat.accentColor || "text-[#9A1C1F]"}`}
                        >
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              {/* Footer */}
              <div className="pt-3 border-t border-[#EAE2D5] flex items-center justify-between text-xs">
                <span className="font-bold text-[#9A1C1F] uppercase text-[11px] inline-flex items-center gap-1">
                  <span>{data.featured.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#695D56]">
                  <Clock className="w-3 h-3" />
                  <span>{data.featured.readTime}</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* PREVIEW: ARTICLES & GRID CONFIG */}
        {activeTab === "articles" && (
          <div className="space-y-4">
            <div className="border-b border-[#EAE2D5] pb-3">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#9A1C1F] uppercase block">
                  {data.articlesSection.eyebrow}
                </span>
                <h3 className="font-bold text-base text-[#1E1917] uppercase mt-0.5">
                  {data.articlesSection.title}
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(data.articlesSection.filterGroups.length > 0
                ? data.articlesSection.filterGroups
                : [{ name: "TẤT CẢ BẢN TIN", categories: [] }]
              ).map((group, index) => (
                <span key={index} className={`rounded px-2 py-1 text-[10px] font-bold ${index === 0 ? "bg-[#9A1C1F] text-white" : "bg-[#EFE8DC] text-[#423A35]"}`}>
                  {group.name || "Nhóm chưa đặt tên"}
                </span>
              ))}
            </div>

            {/* Sample Grid Preview */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-[#EAE2D5] overflow-hidden p-3 space-y-2 shadow-2xs"
                >
                  <div className="aspect-[16/10] bg-[#FAF3E8] rounded flex items-center justify-center text-[10px] text-stone-400 font-bold">
                    Ảnh mẫu bài viết #{idx}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#9A1C1F] font-bold">
                    <User className="w-2.5 h-2.5" />
                    <span>Ban Nghiên cứu Là Việt</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#1E1917] line-clamp-2">
                    {idx === 1
                      ? "Kỹ nghệ dát vàng quỳ trên nền composite"
                      : "Không gian triển lãm ứng dụng sơn mài trong kiến trúc"}
                  </h4>
                  <span className="text-[10px] text-[#9A1C1F] font-bold inline-flex items-center gap-0.5">
                    Chi tiết <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* PREVIEW: STATS SECTION */}
        {activeTab === "stats" && (
          <div className="bg-[#FAF4EB] rounded-xl p-5 border border-[#EAE0D0] shadow-xs">
            <div className="grid grid-cols-2 gap-4 text-center">
              {data.stats.items.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/70 border border-[#EAE0D0]/50"
                >
                  <span
                    className={`font-black text-2xl ${stat.color || "text-[#9A1C1F]"} leading-none`}
                  >
                    {stat.value}
                  </span>
                  <h4 className="text-[10px] font-bold text-[#1E1917] tracking-wider uppercase mt-2 mb-0.5">
                    {stat.label}
                  </h4>
                  <p className="text-[10px] text-[#695D56] leading-snug line-clamp-2">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW: CTA BANNER */}
        {activeTab === "cta" && (
          <div className="rounded-xl bg-gradient-to-r from-[#690E12] via-[#851619] to-[#600C10] text-white p-5 shadow-lg space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-rose-200">
              <BookOpenCheck className="w-3.5 h-3.5 text-rose-300" />
              <span>{data.cta.badge}</span>
            </div>

            <h3 className="font-bold text-lg text-white tracking-tight uppercase leading-snug">
              {data.cta.title}
            </h3>

            <p className="text-xs text-rose-100/80 leading-relaxed">
              {data.cta.description}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <span className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-[#851619] font-bold text-[11px] uppercase tracking-wider">
                <span>{data.cta.primaryButton.text}</span>
                <ArrowRight className="w-3 h-3 text-[#851619]" />
              </span>

              <span className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-semibold text-[11px] uppercase tracking-wider">
                <Mail className="w-3 h-3 text-white" />
                <span>{data.cta.secondaryButton.text}</span>
              </span>
            </div>
          </div>
        )}

        {/* PREVIEW: GOOGLE SEO SNIPPET */}
        {activeTab === "seo" && (
          <div className="bg-white p-4 rounded-xl border border-[#EAE2D5] shadow-xs space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#695D56] mb-2 pb-2 border-b border-[#EAE2D5]">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Mô phỏng kết quả tìm kiếm Google (SERP Preview)</span>
            </div>

            {/* URL */}
            <div className="text-[11px] text-[#202124] flex items-center gap-1 font-sans">
              <span className="text-[#5f6368]">https://laviet.vn</span>
              <span className="text-[#5f6368]">&gt; news</span>
            </div>

            {/* Google Title */}
            <h4 className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer font-sans leading-snug">
              {data.seo?.metaTitle || "Tin tức & Nghiên cứu Sơn mài Là Việt"}
            </h4>

            {/* Google Description */}
            <p className="text-xs text-[#4d5156] font-sans leading-relaxed line-clamp-2">
              {data.seo?.metaDescription ||
                "Không gian tổng hợp các công trình khảo cứu kỹ nghệ chất liệu và bảo tồn di sản hội họa sơn mài Là Việt."}
            </p>

            {data.seo?.keywords && (
              <div className="pt-2 text-[10px] text-stone-500">
                <span className="font-bold">Từ khóa:</span> {data.seo.keywords}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#EAE2D5] text-[11px] text-[#695D56] flex items-center justify-between">
        <span>Bản xem trước cập nhật ngay khi gõ</span>
        <span className="font-semibold text-[#9A1C1F]">Là Việt CMS</span>
      </div>

    </div>
  );
}

