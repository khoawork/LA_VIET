import { BarChart3, Filter, ListOrdered, Megaphone } from "lucide-react";
import type { PageProjectSection } from "../../../types/projects/page-project.type";

const tabs = [
  { key: "header", label: "Header", Icon: BarChart3 },
  { key: "filter", label: "Bộ lọc", Icon: Filter },
  { key: "procedure", label: "Quy trình", Icon: ListOrdered },
  { key: "cta", label: "CTA", Icon: Megaphone },
] as const;

interface Props {
  activeTab: PageProjectSection;
  onSelect: (tab: PageProjectSection) => void;
}

export function ProjectTabNav({ activeTab, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-[#d9c7ae] pb-1">
      {tabs.map(({ key, label, Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-t-xl border-b-2 px-4 py-3 text-sm font-bold transition-colors ${activeTab === key ? "border-[#9A1C1F] bg-white text-[#9A1C1F] hover:bg-[#FAF1EC]" : "border-transparent text-[#695D56] hover:bg-white hover:text-[#9A1C1F]"}`}
        >
          <Icon className="h-4 w-4" /> {label}
        </button>
      ))}
    </div>
  );
}
