import type { FooterDraft } from "../../../types/brandings/site-settings.type";
import { BrandingField } from "./branding-field";
import { BrandingPairList } from "./branding-pair-list";

interface Props {
  data: FooterDraft;
  onChange: (data: FooterDraft) => void;
}

export function BrandingOfficeTab({ data, onChange }: Props) {
  const office = data.office;
  return (
    <div className="space-y-4">
      <BrandingField
        label="Tiêu đề cột"
        value={office.title}
        onChange={(title) => onChange({ ...data, office: { ...office, title } })}
      />
      <BrandingPairList
        itemLabel="Địa điểm"
        firstLabel="Tên địa điểm"
        secondLabel="Địa chỉ"
        items={office.locations.map((item) => ({ first: item.name ?? "", second: item.address ?? "" }))}
        onChange={(items) => onChange({
          ...data,
          office: {
            ...office,
            locations: items.map((item) => ({ name: item.first, address: item.second })),
          },
        })}
      />
    </div>
  );
}
