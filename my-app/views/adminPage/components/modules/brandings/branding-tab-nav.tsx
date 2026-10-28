import { Copyright, Image, Link2, PanelTop } from "lucide-react";
import type { BrandingTab } from "../../../types/brandings/site-settings.type";

const tabs = [
  { key: "brand", label: "Thương hiệu", Icon: Image },
  { key: "footer", label: "Footer", Icon: Copyright },
  { key: "details", label: "Thông tin & kết nối", Icon: PanelTop },
  { key: "policies", label: "Chính sách", Icon: Link2 },
] as const;

interface Props {
  activeTab: BrandingTab;
  onSelect: (tab: BrandingTab) => void;
}

export function BrandingTabNav({ activeTab, onSelect }: Props) {
  return (
    <nav aria-label="Các phần cấu hình" className="flex gap-2 overflow-x-auto border-b border-[#d9c7ae] pb-1">
      {tabs.map(({ key, label, Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          aria-current={activeTab === key ? "page" : undefined}
          className={`inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-t-xl border-b-2 px-4 py-3 text-sm font-bold transition-colors ${activeTab === key ? "border-[#9A1C1F] bg-white text-[#9A1C1F] hover:bg-[#FAF1EC]" : "border-transparent text-[#695D56] hover:bg-white hover:text-[#9A1C1F]"}`}
        >
          <Icon className="h-4 w-4" /> {label}
        </button>
      ))}
    </nav>
  );
}
