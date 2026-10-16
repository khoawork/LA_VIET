import type { FooterDraft } from "../../../types/brandings/site-settings.type";
import { BrandingPairList } from "./branding-pair-list";
import { BrandingSectionCard } from "./branding-section-card";

interface Props {
  data: FooterDraft;
  onChange: (data: FooterDraft) => void;
}

export function BrandingPoliciesTab({ data, onChange }: Props) {
  return (
    <BrandingSectionCard title="Chính sách" description="Các đường dẫn chính sách ở cuối trang.">
      <BrandingPairList
        itemLabel="Chính sách"
        firstLabel="Tên hiển thị"
        secondLabel="Đường dẫn"
        items={data.policies.map((item) => ({ first: item.label ?? "", second: item.href ?? "" }))}
        onChange={(items) => onChange({
          ...data,
          policies: items.map((item) => ({ label: item.first, href: item.second })),
        })}
      />
    </BrandingSectionCard>
  );
}
