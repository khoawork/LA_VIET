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
    { id: "cta" as HomeSectionTab, label: "Kêu gọi (CTA)", icon: Megaphone },
    { id: "seo" as HomeSectionTab, label: "Cấu hình SEO", icon: Globe },
  ];

  return (
    <div className="bg-white rounded-2xl p-2 border border-[#f3e9db] shadow-xs overflow-x-auto">
      <div className="flex items-center gap-1.5 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#a21f1f] hover:bg-[#851619] text-white shadow-xs"
                  : "text-stone-700 hover:bg-[#FAF8F5] hover:text-[#a21f1f]"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

