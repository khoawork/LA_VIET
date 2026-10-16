"use client";

import { LayoutTemplate, Newspaper, Database } from "lucide-react";

export type NewsMainTab = "content" | "articles" | "categories";

interface NewsMainNavProps {
  activeTab: NewsMainTab;
  onSelectTab: (tab: NewsMainTab) => void;
  articlesCount?: number;
  categoriesCount?: number;
}

export function NewsMainNav({
  activeTab,
  onSelectTab,
  articlesCount,
  categoriesCount,
}: NewsMainNavProps) {
  const tabs = [
    {
      id: "content" as NewsMainTab,
      label: "Nội dung Website (CMS)",
      desc: "Quản lý 6 sections & Live Preview",
      icon: LayoutTemplate,
      badge: null,
    },
    {
      id: "articles" as NewsMainTab,
      label: "Bài viết Tin tức (News)",
      desc: "Danh sách bài viết & Soạn thảo bài mới",
      icon: Newspaper,
      badge: articlesCount !== undefined ? `${articlesCount}` : undefined,
    },
    {
      id: "categories" as NewsMainTab,
      label: "Chuyên mục (Category-News)",
      desc: "Phân loại chuyên đề & Đếm bài viết",
      icon: Database,
      badge: categoriesCount !== undefined ? `${categoriesCount}` : undefined,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-2 border border-[#f3e9db] shadow-xs">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-3.5 p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                isActive
                  ? "bg-[#a21f1f] text-white shadow-md font-bold"
                  : "bg-[#fbf9f5] hover:bg-[#f3e9db]/70 text-[#1E1917]"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-white text-[#a21f1f] border border-[#f3e9db] shadow-xs"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-bold truncate ${
                      isActive ? "text-white" : "text-[#1E1917]"
                    }`}
                  >
                    {tab.label}
                  </span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                        isActive
                          ? "bg-[#d1a25b] text-[#5A0B0E]"
                          : "bg-stone-200/80 text-stone-700"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </div>
                <p
                  className={`text-[11px] truncate mt-0.5 ${
                    isActive ? "text-white/80" : "text-stone-500 font-medium"
                  }`}
                >
                  {tab.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

