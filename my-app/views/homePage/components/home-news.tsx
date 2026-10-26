"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Share2 } from "lucide-react";
import type { HomeNewsArticleType, HomeNewsSectionType } from "../types/pagehome.type";

export function useSelectedNewsArticles(ids: number[]) {
  const [result, setResult] = useState<{
    key: string;
    articles: HomeNewsArticleType[];
  }>({ key: "", articles: [] });
  const selectedIds = ids.join(",");

  useEffect(() => {
    if (!selectedIds) return;

    const controller = new AbortController();
    async function loadArticles() {
      try {
        const found = await Promise.all(
          selectedIds.split(",").map(async (id) => {
            try {
              const response = await fetch(`/api/news/${id}`, {
                signal: controller.signal,
                cache: "no-store",
              });
              if (!response.ok) return null;
              const json = await response.json();
              return json.success && json.data?.id
                ? (json.data as HomeNewsArticleType)
                : null;
            } catch {
              return null;
            }
          }),
        );
        if (!controller.signal.aborted) {
          setResult({
            key: selectedIds,
            articles: found.filter((article): article is HomeNewsArticleType => article !== null),
          });
        }
      } catch {
        if (!controller.signal.aborted) {
          setResult({ key: selectedIds, articles: [] });
        }
      }
    }
    loadArticles();

    return () => controller.abort();
  }, [selectedIds]);

  return result.key === selectedIds ? result.articles : [];
}

interface HomeNewsProps {
  data: HomeNewsSectionType;
}

export function HomeNews({ data }: HomeNewsProps) {
  const articlesList = useSelectedNewsArticles(data.articleIds);
  const [copiedArticleId, setCopiedArticleId] = useState<number | null>(null);

  useEffect(() => {
    if (copiedArticleId === null) return;
    const timer = setTimeout(() => setCopiedArticleId(null), 2000);
    return () => clearTimeout(timer);
  }, [copiedArticleId]);

  const shareArticle = async (article: HomeNewsArticleType) => {
    const url = new URL(`/news#${article.slug}`, window.location.origin).href;
    try {
      if (navigator.share) {
        await navigator.share({ title: article.name, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopiedArticleId(article.id);
      }
    } catch {
      // Người dùng có thể đóng hộp thoại chia sẻ.
    }
  };

  return (
    <section id="tin-tuc" className="w-full pt-8 pb-8 lg:pt-10 lg:pb-10 bg-white border-y border-[#E8E2D5] px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase">
            {data.tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#231F20] tracking-tight">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-sm sm:text-base text-[#68625B] leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
        {data.link.text && data.link.href && (
          <Link
            href={data.link.href}
            className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A221A] hover:underline flex items-center gap-1.5"
          >
            {data.link.text} <span>→</span>
          </Link>
        )}
      </div>

      <div className="w-full grid md:grid-cols-3 gap-8">
        {articlesList.map((art) => (
          <article
            key={art.id}
            className="group flex flex-col bg-[#FAF7F2] rounded-md overflow-hidden border border-[#E8E2D5] hover:border-[#9A221A]/40 transition-all shadow-sm hover:shadow-md"
          >
            <div className="relative aspect-[16/10] overflow-hidden w-full">
              {art.image && (
                <Image
                  src={art.image}
                  alt={art.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              {art.category?.name && (
                <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#9A221A] text-white">
                  {art.category.name}
                </span>
              )}
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#78716C]">
                  {new Date(art.date).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
                  {art.preside && <> · {art.preside}</>}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#231F20] group-hover:text-[#9A221A] transition-colors leading-snug">
                  {art.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#68625B] leading-relaxed line-clamp-3">
                  {art.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E2D5]/70 flex items-center justify-between text-xs font-bold text-[#9A221A]">
                <Link href="/news" className="hover:underline">Đọc tiếp →</Link>
                <button
                  type="button"
                  onClick={() => void shareArticle(art)}
                  title={copiedArticleId === art.id ? "Đã sao chép liên kết" : "Chia sẻ bài viết"}
                  aria-label={`Chia sẻ bài viết ${art.name}`}
                  className="p-1.5 rounded text-[#A8A29E] hover:text-[#9A221A] hover:bg-[#F0E8DB] transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
