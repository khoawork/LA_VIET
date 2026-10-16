import type { FooterDraft } from "../../../types/brandings/site-settings.type";
import { BrandingField } from "./branding-field";
import { BrandingPairList } from "./branding-pair-list";

interface Props {
  data: FooterDraft;
  onChange: (data: FooterDraft) => void;
}

export function BrandingSocialTab({ data, onChange }: Props) {
  const social = data.social;
  return (
    <div className="space-y-4">
      <BrandingField
        label="Tiêu đề cột"
        value={social.title}
        onChange={(title) => onChange({ ...data, social: { ...social, title } })}
      />
      <BrandingPairList
        itemLabel="Liên kết"
        firstLabel="Tên icon"
        firstIsIcon
        secondLabel="Đường dẫn"
        items={social.links.map((item) => ({ first: item.icon ?? "", second: item.href ?? "" }))}
        onChange={(items) => onChange({
          ...data,
          social: {
            ...social,
            links: items.map((item) => ({ icon: item.first, href: item.second })),
          },
        })}
      />
    </div>
  );
}
