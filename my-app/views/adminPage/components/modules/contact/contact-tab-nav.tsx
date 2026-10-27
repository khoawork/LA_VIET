import {
  Building2,
  MapPinned,
  Megaphone,
  Images,
  LayoutTemplate,
} from "lucide-react";
import type { PageContactSection } from "../../../types/contact/page-contact.type";

const tabs = [
  { key: "header", label: "Header", Icon: LayoutTemplate },
  { key: "contactInfo", label: "Liên hệ", Icon: Building2 },
  { key: "map", label: "Bản đồ", Icon: MapPinned },
  { key: "cta", label: "CTA", Icon: Megaphone },
  { key: "experience", label: "Trải nghiệm", Icon: Images },
] as const;

export function ContactTabNav({
  activeTab,
  onSelect,
}: {
  activeTab: PageContactSection;
  onSelect: (tab: PageContactSection) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-[#EAE2D5] pb-1">
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
