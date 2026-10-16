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
    <div className="flex gap-2 overflow-x-auto border-b border-[#EAE2D5] pb-1">
      {tabs.map(({ key, label, Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          className={`inline-flex shrink-0 items-center gap-2 rounded-t-xl border-b-2 px-4 py-3 text-xs font-bold ${activeTab === key ? "border-[#9A1C1F] bg-white text-[#9A1C1F]" : "border-transparent text-[#695D56] hover:bg-white"}`}
        >
          <Icon className="h-4 w-4" /> {label}
        </button>
      ))}
    </div>
  );
}
