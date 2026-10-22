"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Building2, Calendar, ArrowRight, Clock, Maximize2 } from "lucide-react";
import { FEATURED_NEWS } from "../services/news.services";
import type { NewsFeaturedSectionType } from "../types/pagenew.type";
import { NewsFeaturedModal } from "./news-featured-modal";

interface NewsFeaturedProps {
  data?: NewsFeaturedSectionType;
}

export function NewsFeatured({ data }: NewsFeaturedProps) {
  const item = data || FEATURED_NEWS;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="mb-14 sm:mb-16">
      <article className="bg-white rounded-2xl overflow-hidden border border-[#EAE2D5]/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 transition-all hover:shadow-lg group">
        {/* Left Column: Image Area với tính năng Click xem Modal (Loading 3s + Jumpscare Jolt) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsModalOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setIsModalOpen(true)}
          className="lg:col-span-7 relative aspect-[16/11] lg:aspect-auto min-h-[300px] sm:min-h-[380px] overflow-hidden bg-[#EAE2D5] cursor-pointer group/img"
          title="Nhấp để xem ảnh toàn màn hình (Hiệu ứng giựt 3s)"
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
            loading="lazy"
          />

          {/* Lớp Overlay gợi ý mở ảnh khi hover */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 text-white text-xs font-bold backdrop-blur-md border border-white/20 shadow-xl transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
              <Maximize2 className="w-4 h-4 text-[#ff6b6e]" />
              <span>Xem ảnh toàn màn hình (Modal 3s)</span>
            </span>
          </div>

          {/* Top-Left Badges */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#9A1C1F] text-white shadow-sm">
              {item.specialBadge}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/70 text-white backdrop-blur-sm shadow-sm">
              {item.issueNumber}
            </span>
          </div>

          {/* Bottom-Right Verified Badge */}
          {item.verifiedBadge && (
            <div className="absolute bottom-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#9A1C1F] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-[#EAE2D5]/60">
                <ShieldCheck className="w-4 h-4 text-[#9A1C1F]" />
                <span>{item.verifiedBadge}</span>
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Article Details */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
          <div>
            {/* Author and Date Meta */}
            <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
              <span className="inline-flex items-center gap-1.5 font-bold text-[#9A1C1F]">
                <Building2 className="w-3.5 h-3.5" />
                <span>{item.author}</span>
              </span>
              <span className="text-[#A89F95]">•</span>
              <span className="inline-flex items-center gap-1 text-[#695D56] font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#695D56]" />
                <span>{item.publishedDate}</span>
              </span>
            </div>

            {/* Article Heading */}
            <h2 className="font-bold text-xl sm:text-2xl text-[#1E1917] leading-snug group-hover:text-[#9A1C1F] transition-colors">
              <Link href={`#${item.slug}`}>{item.title}</Link>
            </h2>

            {/* Summary */}
            <p className="text-xs sm:text-[13px] text-[#5C544E] leading-relaxed mt-3">
              {item.description}
            </p>

            {/* 2 Stat Boxes */}
            {item.highlightStats && item.highlightStats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {item.highlightStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAF3E8] p-3.5 rounded-xl border border-[#EFE2D0]/60"
                  >
                    <span className="text-[10px] font-bold text-[#695D56] uppercase tracking-wider block">
                      {stat.label}
                    </span>
                    <span
                      className={`text-sm sm:text-[15px] font-bold mt-1 block ${stat.accentColor || "text-[#9A1C1F]"}`}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-4 border-t border-[#EAE2D5]/70 flex items-center justify-between text-xs">
            <Link
              href={`#${item.slug}`}
              className="font-bold text-[#9A1C1F] hover:underline uppercase tracking-wider inline-flex items-center gap-1.5 transition-transform group/link"
            >
              <span>ĐỌC TOÀN VĂN NGHIÊN CỨU</span>
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>

            <span className="inline-flex items-center gap-1 text-xs text-[#695D56] font-medium">
              <Clock className="w-3.5 h-3.5 text-[#695D56]" />
              <span>{item.readTime}</span>
            </span>
          </div>
        </div>
      </article>

      {/* Modal Loading 3s + Giựt hù user toàn màn hình */}
      <NewsFeaturedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={item.imageUrl}
        title={item.title}
      />
    </section>
  );
}
