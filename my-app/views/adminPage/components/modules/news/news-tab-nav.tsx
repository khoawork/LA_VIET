import {
  LayoutTemplate,
  Award,
  Grid,
  BarChart3,
  Megaphone,
  Globe,
  LucideIcon,
} from "lucide-react";

export type SectionTab =
  | "header"
  | "featured"
  | "articles"
  | "stats"
  | "cta"
  | "seo";

interface TabItem {
  id: SectionTab;
  label: string;
  icon: LucideIcon;
}

export const NEWS_SECTION_TABS: TabItem[] = [
  { id: "header", label: "Header & Tiêu đề", icon: LayoutTemplate },
  { id: "featured", label: "Bài viết Tiêu điểm", icon: Award },
  { id: "articles", label: "Lưới bài viết & Lọc", icon: Grid },
  { id: "stats", label: "Thống kê Khảo cứu", icon: BarChart3 },
  { id: "cta", label: "Khối Kêu gọi (CTA)", icon: Megaphone },
  { id: "seo", label: "Cấu hình SEO", icon: Globe },
];

interface NewsTabNavProps {
  activeTab: SectionTab;
  onSelectTab: (tab: SectionTab) => void;
}

export function NewsTabNav({ activeTab, onSelectTab }: NewsTabNavProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-[#EAE2D5]">
      {NEWS_SECTION_TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
              isActive
                ? "border-[#9A1C1F] text-[#9A1C1F] bg-white rounded-t-xl"
                : "border-transparent text-[#695D56] hover:text-[#1E1917] hover:bg-[#FAF8F5] rounded-t-xl"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

