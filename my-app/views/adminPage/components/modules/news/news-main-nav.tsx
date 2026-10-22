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
      icon: LayoutTemplate,
      badge: null,
    },
    {
      id: "articles" as NewsMainTab,
      label: "Bài viết Tin tức (News)",
      icon: Newspaper,
      badge: articlesCount !== undefined ? `${articlesCount}` : undefined,
    },
    {
      id: "categories" as NewsMainTab,
      label: "Chuyên mục (Category-News)",
      icon: Database,
      badge: categoriesCount !== undefined ? `${categoriesCount}` : undefined,
    },
  ];

  return (
    <nav aria-label="Điều hướng quản lý tin tức" className="flex items-center gap-2 overflow-x-auto border-b border-[#EAE2D5]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-t-xl border-b-2 px-4 py-3 text-xs font-bold transition-colors cursor-pointer ${
                isActive
                  ? "border-[#9A1C1F] bg-white text-[#9A1C1F]"
                  : "border-transparent text-[#695D56] hover:bg-[#FAF8F5] hover:text-[#1E1917]"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="rounded-full bg-[#FAF1EC] px-2 py-0.5 text-[10px] text-[#9A1C1F]">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
    </nav>
  );
}

