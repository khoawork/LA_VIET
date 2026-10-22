import type { FooterDraft } from "../../../types/brandings/site-settings.type";
import { BrandingField } from "./branding-field";
import { BrandingSectionCard } from "./branding-section-card";

interface Props {
  data: FooterDraft;
  onChange: (data: FooterDraft) => void;
}

export function BrandingFooterTab({ data, onChange }: Props) {
  return (
    <BrandingSectionCard title="Nội dung footer" description="Đoạn giới thiệu và dòng bản quyền ở chân trang.">
      <BrandingField
        label="Giới thiệu"
        multiline
        value={data.description}
        onChange={(description) => onChange({ ...data, description })}
      />
      <BrandingField
        label="Bản quyền"
        multiline
        value={data.copyright}
        onChange={(copyright) => onChange({ ...data, copyright })}
      />
    </BrandingSectionCard>
  );
}
