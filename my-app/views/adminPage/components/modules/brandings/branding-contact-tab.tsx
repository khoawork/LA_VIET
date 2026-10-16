import type { FooterDraft } from "../../../types/brandings/site-settings.type";
import { BrandingField } from "./branding-field";
import { BrandingPairList } from "./branding-pair-list";

interface Props {
  data: FooterDraft;
  onChange: (data: FooterDraft) => void;
}

export function BrandingContactTab({ data, onChange }: Props) {
  const contact = data.contact;
  return (
    <div className="space-y-4">
      <BrandingField
        label="Tiêu đề cột"
        value={contact.title}
        onChange={(title) => onChange({ ...data, contact: { ...contact, title } })}
      />
      <BrandingPairList
        itemLabel="Liên hệ"
        firstLabel="Tên icon"
        firstIsIcon
        secondLabel="Nội dung liên hệ"
        items={contact.methods.map((item) => ({ first: item.icon ?? "", second: item.value ?? "" }))}
        onChange={(items) => onChange({
          ...data,
          contact: {
            ...contact,
            methods: items.map((item) => ({ icon: item.first, value: item.second })),
          },
        })}
      />
    </div>
  );
}
