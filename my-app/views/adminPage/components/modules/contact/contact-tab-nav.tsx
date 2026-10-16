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
          className={`inline-flex shrink-0 items-center gap-2 rounded-t-xl border-b-2 px-4 py-3 text-xs font-bold ${activeTab === key ? "border-[#9A1C1F] bg-white text-[#9A1C1F]" : "border-transparent text-[#695D56] hover:bg-white"}`}
        >
          <Icon className="h-4 w-4" /> {label}
        </button>
      ))}
    </div>
  );
}
