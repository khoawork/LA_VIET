"use client";

import {
  Sparkles,
  BarChart3,
  Award,
  Newspaper,
  Handshake,
  Megaphone,
  Globe,
} from "lucide-react";

export type HomeSectionTab =
  | "hero"
  | "statistics"
  | "spotlight"
  | "news"
  | "partners"
  | "cta"
  | "seo";

interface HomeTabNavProps {
  activeTab: HomeSectionTab;
  onSelectTab: (tab: HomeSectionTab) => void;
}

export function HomeTabNav({ activeTab, onSelectTab }: HomeTabNavProps) {
  const tabs = [
    { id: "hero" as HomeSectionTab, label: "Hero Banner", icon: Sparkles },
    { id: "statistics" as HomeSectionTab, label: "Thống kê", icon: BarChart3 },
    { id: "spotlight" as HomeSectionTab, label: "Tiêu điểm dự án", icon: Award },
    { id: "news" as HomeSectionTab, label: "Tin tức nổi bật", icon: Newspaper },
    { id: "partners" as HomeSectionTab, label: "Đối tác & Đánh giá", icon: Handshake },
    { id: "cta" as HomeSectionTab, label: "CTA", icon: Megaphone },
    { id: "seo" as HomeSectionTab, label: "Cấu hình SEO", icon: Globe },
  ];

  return (
    <nav aria-label="Các phần nội dung Trang chủ" className="flex gap-2 overflow-x-auto border-b border-[#EAE2D5] pb-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-t-xl border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              isActive
                ? "border-[#9A1C1F] bg-white text-[#9A1C1F] hover:bg-[#FAF1EC]"
                : "border-transparent text-[#695D56] hover:bg-white hover:text-[#9A1C1F]"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

