"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Newspaper, Search } from "lucide-react";
import type {
  HomeNewsArticleType,
  HomeNewsSectionType,
} from "@/views/homePage/types/pagehome.type";
import type { NewsCategoryData } from "@/views/adminPage/components/modules/news/news-categories-management";

interface HomeNewsTabProps {
  data: HomeNewsSectionType;
  onChange: (updated: HomeNewsSectionType) => void;
}

export function HomeNewsArticlesCard({ data, onChange }: HomeNewsTabProps) {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<NewsCategoryData[]>([]);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<{
    key: string;
    articles: HomeNewsArticleType[];
    totalPages: number;
    error: string;
  }>({ key: "", articles: [], totalPages: 1, error: "" });
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", "10");
  if (search.trim()) params.set("search", search.trim());
  if (categoryId) params.set("categoryId", categoryId);
  const query = params.toString();
  const queryKey = query;

  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        const response = await fetch("/api/news/cates", {
          signal: controller.signal,
          cache: "no-store",
        });
        const json = await response.json();
        if (response.ok && json.success && Array.isArray(json.data) && !controller.signal.aborted) {
          setCategories(json.data);
        }
      } catch {
        // Danh sách bài viết vẫn dùng được khi không tải được bộ lọc.
      }
    }
    loadCategories();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/news?${query}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const json = await response.json();
        if (!response.ok || !json.success || !Array.isArray(json.data)) {
          throw new Error(json.message || "Không tải được danh sách tin tức.");
        }
        if (!controller.signal.aborted) {
          setResult({
            key: queryKey,
            articles: json.data,
            totalPages: json.meta?.totalPages ?? 1,
            error: "",
          });
        }
      } catch (cause) {
        if (!controller.signal.aborted) {
          setResult({
            key: queryKey,
            articles: [],
            totalPages: 1,
            error: cause instanceof Error ? cause.message : "Không tải được tin tức.",
          });
        }
      }
    }, search ? 250 : 0);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, queryKey, search]);

  const toggleArticle = (id: number) => {
    const visible = data.articleIds.includes(id);
    onChange({
      ...data,
      articleIds: visible
        ? data.articleIds.filter((articleId) => articleId !== id)
        : [...data.articleIds, id],
    });
  };

  const shownLoading = result.key !== queryKey;
  const shownArticles = shownLoading ? [] : result.articles;
  const shownError = shownLoading ? "" : result.error;
  const totalPages = shownLoading ? 1 : result.totalPages;

  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#f3e9db] shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#f3e9db]">
        <div className="flex items-center gap-2.5">
          <Newspaper className="w-5 h-5 text-[#a21f1f]" />
          <div>
            <h2 className="text-base font-bold text-[#1E1917]">
              Bài viết hiển thị trên trang chủ ({data.articleIds.length})
            </h2>
            <p className="text-xs text-stone-500">
              Chọn bài viết từ dữ liệu tin tức bằng công tắc hiện/ẩn
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Tìm bài viết theo tiêu đề, mô tả hoặc tác giả..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#f3e9db] text-xs bg-white"
              />
            </div>
            <select
              value={categoryId}
              aria-label="Lọc theo danh mục tin tức"
              onChange={(e) => {
                setCategoryId(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 rounded-xl border border-[#f3e9db] text-xs font-semibold text-[#1E1917] bg-white"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {shownError && <p className="text-xs text-red-700">{shownError}</p>}
          <div className="overflow-x-auto rounded-2xl border border-[#f3e9db] bg-white shadow-xs">
            {shownLoading ? (
              <div className="flex items-center justify-center gap-2 py-12 text-xs text-stone-500">
                <Loader2 className="w-4 h-4 animate-spin" /> Đang tải bài viết...
              </div>
            ) : shownArticles.length === 0 ? (
              <p className="py-12 text-center text-xs text-stone-500">
                Không có bài viết phù hợp.
              </p>
            ) : (
              <table className="w-full min-w-[850px] table-fixed border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-[#f3e9db] bg-[#f7f5f1] font-bold text-stone-700">
                    <th className="w-64 px-4 py-3">Bài viết</th>
                    <th className="w-40 px-4 py-3">Danh mục</th>
                    <th className="px-4 py-3">Mô tả</th>
                    <th className="w-28 px-4 py-3">Ngày xuất bản</th>
                    <th className="w-24 px-4 py-3 text-center">Trang chủ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3e9db] font-medium text-[#1E1917]">
                  {shownArticles.map((article) => {
                    const visible = data.articleIds.includes(article.id);
                    return (
                      <tr key={article.id} className="hover:bg-[#f7f5f1]/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex min-w-0 items-center gap-3">
                            {article.image && (
                              <Image
                                src={article.image}
                                alt=""
                                width={48}
                                height={40}
                                unoptimized
                                className="h-10 w-12 shrink-0 rounded-lg border border-[#f3e9db] object-cover"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <span className="block truncate font-bold" title={article.name}>{article.name}</span>
                              <span className="block truncate font-mono text-[10px] text-stone-500">/{article.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="block truncate rounded-full border border-[#F0DCD6] bg-[#FAF1EC] px-2.5 py-0.5 font-bold text-[#9A1C1F]" title={article.category?.name}>
                            {article.category?.name || "Chưa phân loại"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-stone-600">
                          <span className="block truncate" title={article.description}>{article.description}</span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-stone-500">
                          {new Date(article.date).toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            type="button"
                            role="switch"
                            aria-checked={visible}
                            aria-label={`${visible ? "Ẩn" : "Hiện"} bài viết ${article.name} trên trang chủ`}
                            onClick={() => toggleArticle(article.id)}
                            className={`inline-block w-10 h-6 rounded-full p-1 align-middle transition-colors ${visible ? "bg-[#a21f1f] hover:bg-[#851619]" : "bg-stone-300 hover:bg-stone-400"}`}
                          >
                            <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${visible ? "translate-x-4" : ""}`} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-3 pt-2 text-xs">
              <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)} className="disabled:opacity-40 text-[#a21f1f] font-bold hover:underline disabled:no-underline">
                Trang trước
              </button>
              <span>{page}/{totalPages}</span>
              <button type="button" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="disabled:opacity-40 text-[#a21f1f] font-bold hover:underline disabled:no-underline">
                Trang sau
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

export function HomeNewsTab({ data, onChange }: HomeNewsTabProps) {
  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#f3e9db] shadow-xs space-y-6">
      <div className="flex items-center gap-2.5 pb-4 border-b border-[#f3e9db]">
        <Newspaper className="w-5 h-5 text-[#a21f1f]" />
        <div>
          <h2 className="text-base font-bold text-[#1E1917]">
            Khối Tin tức nổi bật trên Trang chủ
          </h2>
          <p className="text-xs text-stone-500">
            Chỉnh tiêu đề, mô tả và liên kết của khu vực tin tức
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E1917]">
              Dòng tiêu đề phụ (Tagline)
            </label>
            <input
              type="text"
              value={data.tagline}
              onChange={(e) => onChange({ ...data, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E1917]">
              Tiêu đề chính
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-bold text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#1E1917]">
            Dòng mô tả dưới tiêu đề
          </label>
          <textarea
            rows={2}
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs text-stone-600 leading-relaxed focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1E1917]">
              Chữ liên kết xem tất cả
            </label>
            <input
              type="text"
              value={data.link.text}
              onChange={(e) => onChange({
                ...data,
                link: { ...data.link, text: e.target.value },
              })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1E1917]">
              Đường dẫn liên kết (URL)
            </label>
            <input
              type="text"
              value={data.link.href}
              onChange={(e) => onChange({
                ...data,
                link: { ...data.link, href: e.target.value },
              })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#f3e9db] text-xs font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

