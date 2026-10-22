"use client";

import Image from "next/image";
import { Eye, ExternalLink, Globe } from "lucide-react";
import type { PageHomePropsType } from "@/views/homePage/types/pagehome.type";
import { StatIcon } from "@/views/homePage/components/home-statistics";
import { useSelectedNewsArticles } from "@/views/homePage/components/home-news";
import type { HomeSectionTab } from "./home-tab-nav";

interface HomeSectionPreviewProps {
  activeTab: HomeSectionTab;
  data: PageHomePropsType;
}

export function HomeSectionPreview({
  activeTab,
  data,
}: HomeSectionPreviewProps) {
  const newsArticles = useSelectedNewsArticles(
    activeTab === "news" ? data.newsSection.articleIds : [],
  );

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
          <div className="relative overflow-hidden border border-[#f3e9db] rounded-xl bg-[#FAF7F2]">
            <div className="absolute inset-0 pointer-events-none">
              <img
                src={data.hero?.image?.src}
                alt=""
                className="w-full h-full object-cover object-right opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/95 via-[#FAF7F2]/75 to-[#FAF7F2]/35" />
            </div>
            <div className="relative space-y-4 p-4">
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
                  className="px-3 py-1.5 rounded-full bg-[#a21f1f] hover:bg-[#851619] text-white text-[10px] font-bold transition-colors"
                >
                  {data.hero?.primaryButton?.text} →
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF1EC] border border-[#f3e9db] text-stone-700 text-[10px] font-bold transition-colors"
                >
                  {data.hero?.secondaryButton?.text}
                </button>
              </div>

              {data.hero?.collections?.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#f3e9db]">
                  {data.hero.collections.map((col, idx) => (
                    <div key={idx} className="p-2 bg-white rounded-lg border border-[#f3e9db]">
                      <span className="text-[9px] font-semibold uppercase text-stone-500 block truncate">
                        {col.desc}
                      </span>
                      <span className="text-[10px] font-bold text-stone-800 block truncate">
                        {col.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PREVIEW THỐNG KÊ */}
        {activeTab === "statistics" && (
          <div className="space-y-4 border border-[#f3e9db] p-4 rounded-xl bg-[#f3e9da]">
            <span className="text-[10px] font-bold text-[#a21f1f] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#a21f1f]" />
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
                  className="p-3 border border-[#e8e2d5] bg-white"
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[8px] uppercase tracking-wider text-[#a21f1f] font-bold">
                      {stat.tag}
                    </span>
                    <span className="w-7 h-7 shrink-0 flex items-center justify-center border border-[#EEDCA9] bg-[#FFF8E8] text-[#B91C1C]">
                      <StatIcon value={stat.icon} index={idx} className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <span className="text-lg font-black text-[#a21f1f] block">
                    {stat.num}
                  </span>
                  <span className="w-7 h-px bg-[#D8AA1B] block my-1.5" />
                  <span className="text-[10px] font-bold text-stone-800 block">
                    {stat.label}
                  </span>
                  <p className="text-[9px] text-stone-500 line-clamp-3 mt-0.5">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW TIÊU ĐIỂM DỰ ÁN */}
        {activeTab === "spotlight" && (
          <div className="space-y-3 border border-[#f3e9db] p-4 rounded-xl bg-white">
            <span className="text-[10px] font-bold text-[#a21f1f] uppercase tracking-wider block">
              {data.spotlight?.tagline}
            </span>
            <h3 className="text-xs font-black text-[#1E1917] leading-tight">
              {data.spotlight?.title}
            </h3>
            <p className="text-[11px] text-stone-700 leading-relaxed line-clamp-3">
              {data.spotlight?.description}
            </p>

            <div className="relative overflow-hidden aspect-[4/3] border border-[#f3e9db]">
              <img
                src={data.spotlight?.image}
                alt={data.spotlight?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-[#a21f1f] text-white p-1.5 text-[9px] flex items-center gap-1.5">
                {data.spotlight?.seal?.logo && (
                  <span className="w-6 h-6 flex items-center justify-center bg-white">
                    <Image
                      src={data.spotlight.seal.logo}
                      alt="Logo con dấu"
                      width={20}
                      height={20}
                      unoptimized
                      className="w-5 h-5 object-contain"
                    />
                  </span>
                )}
                <span className="leading-tight">
                  {data.spotlight?.seal?.line1} {data.spotlight?.seal?.line2}
                </span>
              </div>
            </div>

            {data.spotlight?.infoBoxes?.length > 0 && (
              <div className="grid grid-cols-2 gap-1.5">
                {data.spotlight.infoBoxes.map((box, idx) => (
                  <div key={idx} className="p-2 bg-[#f3e9da] border border-[#DCD3C0]">
                    <span className="text-[10px] font-bold text-[#a21f1f] uppercase block">
                      {box.label}
                    </span>
                    <span className="text-[11px] font-bold text-stone-800 block line-clamp-2">
                      {box.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {data.spotlight?.link?.text && (
              <span className="text-[10px] font-bold text-[#a21f1f] uppercase block">
                {data.spotlight.link.text} →
              </span>
            )}
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
                {data.newsSection.description && (
                  <p className="text-[10px] text-stone-600 leading-relaxed mt-1">
                    {data.newsSection.description}
                  </p>
                )}
              </div>
              <span className="text-[10px] font-bold text-[#a21f1f]">
                {data.newsSection?.link?.text} →
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              {newsArticles.map((art) => (
                <div
                  key={art.id}
                  className="flex gap-2.5 p-2 rounded-xl border border-[#f3e9db] bg-[#FAF8F5]/60"
                >
                  <Image
                    src={art.image}
                    alt={art.name}
                    width={64}
                    height={48}
                    unoptimized
                    className="w-16 h-12 rounded-lg object-cover border border-[#f3e9db] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-mono text-stone-400 block">
                      {new Date(art.date).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
                    </span>
                    <h4 className="text-[10px] font-bold text-stone-800 line-clamp-1">
                      {art.name}
                    </h4>
                    <p className="text-[9px] text-stone-500 line-clamp-1">
                      {art.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREVIEW ĐỐI TÁC */}
        {activeTab === "partners" && (
          <div className="space-y-3.5 border border-[#f3e9db] p-4 rounded-xl bg-[#f3e9da]">
            <span className="text-[10px] font-bold text-[#a21f1f] uppercase block text-center">
              {data.partners?.tagline}
            </span>
            <h3 className="text-xs font-black text-[#1E1917] text-center">
              {data.partners?.title}
            </h3>

            <div className="flex flex-wrap justify-center pt-1">
              {data.partners?.partners?.map((p, idx) => (
                <div key={idx} className="w-1/2 p-1">
                  <div className="h-full p-2 border border-[#f3e9db] text-center bg-white">
                    <span className="text-[10px] font-bold text-stone-800 uppercase block">
                      {p.name}
                    </span>
                    {p.subtitle && (
                      <span className="text-[8px] font-semibold text-stone-500 uppercase block mt-0.5">
                        {p.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-[95%] mx-auto p-3 bg-white border border-[#f3e9db] mt-2">
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
          <div className="space-y-3 border border-[#f3e9db] border-l-4 border-l-[#B91C1C] p-4 bg-white">
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
                className="flex-1 px-3.5 py-1.5 bg-[#a21f1f] hover:bg-[#851619] text-white text-[10px] font-bold transition-colors"
              >
                {data.cta?.primaryButton?.text}
              </button>
              <button
                type="button"
                className="flex-1 px-3.5 py-1.5 bg-[#f3e9da] hover:bg-[#EFE1CE] border border-[#f3e9db] text-stone-700 text-[10px] font-bold transition-colors"
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

