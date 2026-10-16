import type { FooterDraft } from "../../../types/brandings/site-settings.type";
import { BrandingContactTab } from "./branding-contact-tab";
import { BrandingOfficeTab } from "./branding-office-tab";
import { BrandingSectionCard } from "./branding-section-card";
import { BrandingSocialTab } from "./branding-social-tab";

interface Props {
  data: FooterDraft;
  onChange: (data: FooterDraft) => void;
}

export function BrandingDetailsTab({ data, onChange }: Props) {
  const props = { data, onChange };

  return (
    <div className="space-y-6">
      <BrandingSectionCard title="Văn phòng" description="Tên khu vực và địa chỉ hiển thị ở footer.">
        <BrandingOfficeTab {...props} />
      </BrandingSectionCard>
      <BrandingSectionCard title="Liên hệ" description="Hotline, email và các cách liên hệ khác.">
        <BrandingContactTab {...props} />
      </BrandingSectionCard>
      <BrandingSectionCard title="Mạng xã hội" description="Biểu tượng và đường dẫn của từng kênh.">
        <BrandingSocialTab {...props} />
      </BrandingSectionCard>
    </div>
  );
}
