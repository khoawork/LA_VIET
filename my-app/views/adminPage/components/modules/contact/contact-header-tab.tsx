import type { PageContactProps } from "../../../types/contact/page-contact.type";
import { ContactField, ContactPanel } from "./contact-field";

type Header = PageContactProps["header"];

export function ContactHeaderTab({
  data,
  onChange,
}: {
  data: Header;
  onChange: (data: Header) => void;
}) {
  return (
    <ContactPanel title="Header & Breadcrumb">
      <div className="grid gap-4 sm:grid-cols-2">
        <ContactField
          label="Tên trang chủ"
          value={data.breadcrumb.homeLabel}
          onChange={(homeLabel) =>
            onChange({ ...data, breadcrumb: { ...data.breadcrumb, homeLabel } })
          }
        />
        <ContactField
          label="Tên trang hiện tại"
          value={data.breadcrumb.currentLabel}
          onChange={(currentLabel) =>
            onChange({
              ...data,
              breadcrumb: { ...data.breadcrumb, currentLabel },
            })
          }
        />
        <ContactField
          label="Tiêu đề"
          value={data.title}
          onChange={(title) => onChange({ ...data, title })}
        />
        <ContactField
          label="Mô tả"
          value={data.description}
          multiline
          onChange={(description) => onChange({ ...data, description })}
        />
      </div>
      <h3 className="text-xs font-bold uppercase">Huy hiệu thương hiệu</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <ContactField
          label="Icon"
          icon
          value={data.brandBadge.icon}
          onChange={(icon) =>
            onChange({ ...data, brandBadge: { ...data.brandBadge, icon } })
          }
        />
        <ContactField
          label="Tiêu đề"
          value={data.brandBadge.title}
          onChange={(title) =>
            onChange({ ...data, brandBadge: { ...data.brandBadge, title } })
          }
        />
        <ContactField
          label="Mô tả"
          value={data.brandBadge.description}
          onChange={(description) =>
            onChange({
              ...data,
              brandBadge: { ...data.brandBadge, description },
            })
          }
        />
      </div>
    </ContactPanel>
  );
}
