"use client";

import { Eye, ExternalLink, Globe } from "lucide-react";
import type { PageHomePropsType } from "@/views/homePage/types/pagehome.type";
import type { HomeSectionTab } from "./home-tab-nav";

interface HomeSectionPreviewProps {
  activeTab: HomeSectionTab;
  data: PageHomePropsType;
}

export function HomeSectionPreview({
  activeTab,
  data,
}: HomeSectionPreviewProps) {
  return (
    <div className="sticky top-6 bg-white rounded-2xl border border-[#f3e9db] shadow-xs overflow-hidden">
      {/* Top Preview Bar */}
      <div className="px-5 py-3.5 bg-[#FAF8F5] border-b border-[#f3e9db] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#a21f1f]" />
          <span className="text-xs font-bold text-[#1E1917] uppercase tracking-wider">
            Live Preview: Section {activeTab.toUpperCase()}
          </span>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#a21f1f] hover:underline"
        >
          <span>Xem trang chủ thực tế</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Preview Content Area */}
      <div className="p-5 max-h-[calc(100vh-140px)] overflow-y-auto space-y-4 bg-[#FBF9F5]/40 text-xs">
        {/* PREVIEW HERO */}
        {activeTab === "hero" && (
          <div className="space-y-4 border border-[#f3e9db] p-4 rounded-xl bg-[#FAF7F2]">
            <h2 className="text-sm font-bold text-[#1E1917] leading-tight">
              {data.hero?.highlightWord &&
              data.hero?.title.includes(data.hero?.highlightWord) ? (
                <>
                  {data.hero.title.split(data.hero.highlightWord)[0]}
                  <span className="text-[#a21f1f] underline decoration-[#a21f1f]/30">
                    {data.hero.highlightWord}
                  </span>
                  {data.hero.title.split(data.hero.highlightWord)[1]}
                </>
              ) : (
                data.hero?.title
              )}
            </h2>

            <p className="text-[11px] text-stone-600 leading-relaxed line-clamp-3">
              {data.hero?.description}
            </p>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                className="px-3 py-1.5 rounded-full bg-[#a21f1f] text-white text-[10px] font-bold"
              >
                {data.hero?.primaryButton?.text} →
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-full bg-white border border-[#f3e9db] text-stone-700 text-[10px] font-bold"
              >
                {data.hero?.secondaryButton?.text}
              </button>
            </div>

            {/* Thumbnail Image */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-[#f3e9db] mt-2">
              <img
                src={data.hero?.image?.src}
                alt={data.hero?.image?.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 text-white bg-black/60 p-2 rounded-lg text-[10px]">
                <span className="text-[#d1a25b] font-bold block">
                  {data.hero?.image?.tag}
                </span>
                <span className="truncate block">
                  {data.hero?.image?.caption}
                </span>
              </div>
            </div>

            {/* 4 Collections Ribbon */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#f3e9db]">
              {data.hero?.collections?.map((col, idx) => (
                <div key={idx} className="p-2 bg-white rounded-lg border border-[#f3e9db]">
                  <span className="text-[8px] font-mono font-bold text-[#a21f1f] block">
                    {col.idx}
                  </span>
                  <span className="text-[10px] font-bold text-stone-800 block truncate">
                    {col.title}
                  </span>
                  <span className="text-[9px] text-stone-500 block truncate">
                    {col.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW THỐNG KÊ */}
        {activeTab === "statistics" && (
          <div className="space-y-4 border border-[#f3e9db] p-4 rounded-xl bg-white">
            <span className="text-[10px] font-bold text-[#a21f1f] uppercase tracking-wider block">
              {data.statistics?.tagline}
            </span>
            <h3 className="text-xs font-black text-[#1E1917]">
              {data.statistics?.title}
            </h3>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              {data.statistics?.description}
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {data.statistics?.stats?.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-[#f3e9db] bg-[#FAF8F5]/60"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-black text-[#a21f1f]">
                      {stat.num}
                    </span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#a21f1f]/10 text-[#a21f1f] font-bold">
                      {stat.tag}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-stone-800 block">
                    {stat.label}
                  </span>
                  <p className="text-[9px] text-stone-500 line-clamp-2 mt-0.5">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW TIÊU ĐIỂM DỰ ÁN */}
        {activeTab === "spotlight" && (
          <div className="space-y-3.5 border border-[#f3e9db] p-4 rounded-xl bg-[#EFE8DC]">
            <span className="text-[10px] font-bold text-[#a21f1f] uppercase tracking-wider block">
              {data.spotlight?.tagline}
            </span>
            <h3 className="text-xs font-black text-[#1E1917] leading-tight">
              {data.spotlight?.title}
            </h3>
            <p className="text-[11px] text-stone-700 leading-relaxed line-clamp-3">
              {data.spotlight?.description}
            </p>

            <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-[#f3e9db]">
              <img
                src={data.spotlight?.image}
                alt={data.spotlight?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-[#a21f1f] text-white p-1.5 rounded-lg text-[9px] flex items-center gap-1.5">
                <span className="w-5 h-5 flex items-center justify-center border border-white/60 font-bold">
                  {data.spotlight?.seal?.initials}
                </span>
                <span className="leading-tight">
                  {data.spotlight?.seal?.line1} {data.spotlight?.seal?.line2}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {data.spotlight?.infoBoxes?.map((box, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-white/80 border border-[#DCD3C0]">
                  <span className="text-[9px] font-bold text-[#a21f1f] uppercase block">
                    {box.label}
                  </span>
                  <span className="text-[10px] font-bold text-stone-800 block truncate">
                    {box.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW TIN TỨC TRANG CHỦ */}
        {activeTab === "news" && (
          <div className="space-y-3.5 border border-[#f3e9db] p-4 rounded-xl bg-white">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#a21f1f] uppercase block">
                  {data.newsSection?.tagline}
                </span>
                <h3 className="text-xs font-black text-[#1E1917]">
                  {data.newsSection?.title}
                </h3>
              </div>
              <span className="text-[10px] font-bold text-[#a21f1f]">
                {data.newsSection?.link?.text} →
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              {data.newsSection?.articles?.map((art, idx) => (
                <div
                  key={idx}
                  className="flex gap-2.5 p-2 rounded-xl border border-[#f3e9db] bg-[#FAF8F5]/60"
                >
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-16 h-12 rounded-lg object-cover border border-[#f3e9db] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-mono text-stone-400 block">
                      {art.date}
                    </span>
                    <h4 className="text-[10px] font-bold text-stone-800 line-clamp-1">
                      {art.title}
                    </h4>
                    <p className="text-[9px] text-stone-500 line-clamp-1">
                      {art.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW ĐỐI TÁC */}
        {activeTab === "partners" && (
          <div className="space-y-3.5 border border-[#f3e9db] p-4 rounded-xl bg-white">
            <span className="text-[10px] font-bold text-[#a21f1f] uppercase block text-center">
              {data.partners?.tagline}
            </span>
            <h3 className="text-xs font-black text-[#1E1917] text-center">
              {data.partners?.title}
            </h3>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {data.partners?.partners?.map((p, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg border border-[#f3e9db] text-center text-[10px] font-bold text-stone-600 bg-[#FAF8F5]"
                >
                  {p}
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#f3e9db] mt-2">
              <p className="text-[10px] italic text-stone-700 leading-relaxed">
                &quot;{data.partners?.testimonial?.quote}&quot;
              </p>
              <span className="text-[9px] font-bold text-[#a21f1f] block mt-1 uppercase">
                {data.partners?.testimonial?.author}
              </span>
            </div>
          </div>
        )}

        {/* PREVIEW CTA */}
        {activeTab === "cta" && (
          <div className="space-y-3 border-2 border-[#a21f1f]/20 p-4 rounded-xl bg-white">
            <span className="text-[10px] font-bold text-[#a21f1f] uppercase block">
              {data.cta?.tagline}
            </span>
            <h3 className="text-xs font-black text-[#1E1917] leading-tight">
              {data.cta?.title}
            </h3>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              {data.cta?.description}
            </p>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg bg-[#a21f1f] text-white text-[10px] font-bold"
              >
                {data.cta?.primaryButton?.text}
              </button>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#f3e9db] text-stone-700 text-[10px] font-bold"
              >
                {data.cta?.secondaryButton?.text}
              </button>
            </div>
          </div>
        )}

        {/* PREVIEW SEO */}
        {activeTab === "seo" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-[#f3e9db] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#202124] text-[11px] mb-1">
                <Globe className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-700">laviet.vn</span>
              </div>
              <h4 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-tight">
                {data.seo?.title}
              </h4>
              <p className="text-[11px] text-[#4d5156] leading-relaxed line-clamp-2">
                {data.seo?.description}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#f3e9db] space-y-2">
              <span className="text-[10px] font-bold text-stone-500 uppercase">
                Từ khóa được chỉ định:
              </span>
              <p className="text-xs font-mono text-[#a21f1f]">
                {data.seo?.keywords}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

