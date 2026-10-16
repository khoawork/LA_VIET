import type { SiteSettingsDraft } from "../../../types/brandings/site-settings.type";
import { BrandingField } from "./branding-field";
import { BrandingSectionCard } from "./branding-section-card";

interface Props {
  data: SiteSettingsDraft;
  onChange: (data: SiteSettingsDraft) => void;
}

export function BrandingIdentityTab({ data, onChange }: Props) {
  return (
    <BrandingSectionCard title="Thương hiệu" description="Logo, tên tổ chức và thông điệp nhận diện.">
      <BrandingField
        label="URL logo"
        type="url"
        value={data.logo}
        placeholder="https://example.com/logo.png"
        onChange={(logo) => onChange({ ...data, logo })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <BrandingField
          label="Tên tổ chức / thương hiệu"
          value={data.company}
          onChange={(company) => onChange({ ...data, company })}
        />
        <BrandingField
          label="Thông điệp ngắn"
          value={data.tagline}
          onChange={(tagline) => onChange({ ...data, tagline })}
        />
      </div>
    </BrandingSectionCard>
  );
}
