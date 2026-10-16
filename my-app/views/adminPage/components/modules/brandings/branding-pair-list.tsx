import { Plus } from "lucide-react";
import { RemoveItemButton } from "../remove-item-button";
import { IconSelect } from "../icon-select";
import { BrandingField } from "./branding-field";

export interface BrandingPair {
  first: string;
  second: string;
}

interface Props {
  items: BrandingPair[];
  itemLabel: string;
  firstLabel: string;
  secondLabel: string;
  firstIsIcon?: boolean;
  onChange: (items: BrandingPair[]) => void;
}

export function BrandingPairList({
  items,
  itemLabel,
  firstLabel,
  secondLabel,
  firstIsIcon = false,
  onChange,
}: Props) {
  function update(index: number, field: keyof BrandingPair, value: string) {
    onChange(items.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="relative rounded-xl border border-[#EAE2D5] bg-[#FAF8F5] p-4 pt-12">
          <RemoveItemButton
            label={`Xóa ${itemLabel.toLowerCase()} ${index + 1}`}
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {firstIsIcon ? (
              <IconSelect label={firstLabel} value={item.first} onChange={(value) => update(index, "first", value)} />
            ) : (
              <BrandingField label={firstLabel} value={item.first} onChange={(value) => update(index, "first", value)} />
            )}
            <BrandingField label={secondLabel} value={item.second} onChange={(value) => update(index, "second", value)} />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { first: "", second: "" }])}
        className="inline-flex items-center gap-2 rounded-xl border border-[#EAE2D5] px-4 py-2.5 text-xs font-bold text-[#9A1C1F]"
      >
        <Plus className="h-4 w-4" /> Thêm {itemLabel.toLowerCase()}
      </button>
    </div>
  );
}
