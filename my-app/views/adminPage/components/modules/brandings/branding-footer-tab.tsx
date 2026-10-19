import type { FooterDraft } from "../../../types/brandings/site-settings.type";
import { BrandingField } from "./branding-field";
import { BrandingSectionCard } from "./branding-section-card";
import { BrandingLogoUploader } from "./branding-logo-uploader";

interface Props {
  data: FooterDraft;
  onChange: (data: FooterDraft) => void;
  logo?: string;
  onLogoChange?: (logo: string) => void;
}

export function BrandingFooterTab({ data, onChange, logo, onLogoChange }: Props) {
  return (
    <BrandingSectionCard title="Nội dung footer" description="Logo, đoạn giới thiệu và dòng bản quyền ở chân trang.">
      {onLogoChange && (
        <BrandingLogoUploader
          label="Logo hiển thị ở Footer"
          description="Tải ảnh logo từ máy tính (PNG, SVG, JPG, WEBP) hoặc nhập URL"
          value={logo || ""}
          onChange={onLogoChange}
        />
      )}
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
