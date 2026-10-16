import type { PageContactProps } from "../../../types/contact/page-contact.type";
import {
  ContactField,
  ContactListHeader,
  ContactListItem,
  ContactPanel,
} from "./contact-field";

type CTA = PageContactProps["cta"];
type Field = CTA["fields"][number];

export function ContactCtaTab({
  data,
  onChange,
}: {
  data: CTA;
  onChange: (data: CTA) => void;
}) {
  function updateField(index: number, patch: Partial<Field>) {
    onChange({
      ...data,
      fields: data.fields.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      ),
    });
  }
  return (
    <ContactPanel title="Khởi tạo hợp tác (CTA)">
      <div className="grid gap-4 sm:grid-cols-2">
        <ContactField
          label="Nhãn"
          value={data.eyebrow}
          onChange={(eyebrow) => onChange({ ...data, eyebrow })}
        />
        <ContactField
          label="Icon CTA"
          icon
          value={data.icon}
          onChange={(icon) => onChange({ ...data, icon })}
        />
        <ContactField
          label="Icon bảo mật"
          icon
          value={data.iconPrivacy}
          onChange={(iconPrivacy) => onChange({ ...data, iconPrivacy })}
        />
        <ContactField
          label="Thông báo bảo mật"
          value={data.privacyNote}
          onChange={(privacyNote) => onChange({ ...data, privacyNote })}
        />
        <ContactField
          label="Nhãn nút gửi"
          value={data.submitLabel}
          onChange={(submitLabel) => onChange({ ...data, submitLabel })}
        />
      </div>
      <ContactListHeader
        title={`Trường biểu mẫu (${data.fields.length})`}
        addLabel="Thêm trường"
        onAdd={() =>
          onChange({
            ...data,
            fields: [
              ...data.fields,
              {
                name: "",
                label: "",
                type: "text",
                placeholder: "",
                required: false,
              },
            ],
          })
        }
      />
      {data.fields.map((field, index) => (
        <ContactListItem
          key={index}
          label={field.label || field.name || "trường biểu mẫu mới"}
          onRemove={() =>
            onChange({
              ...data,
              fields: data.fields.filter((_, i) => i !== index),
            })
          }
        >
          <ContactField
            label="Tên dữ liệu"
            value={field.name}
            onChange={(name) => updateField(index, { name })}
          />
          <ContactField
            label="Nhãn"
            value={field.label}
            onChange={(label) => updateField(index, { label })}
          />
          <label className="text-xs font-semibold">
            Loại trường
            <select
              value={field.type}
              onChange={(event) =>
                updateField(index, {
                  type: event.target.value as Field["type"],
                })
              }
              className="mt-1.5 block w-full rounded-xl border border-[#EAE2D5] bg-white px-3 py-2.5"
            >
              <option value="text">Văn bản</option>
              <option value="tel">Số điện thoại</option>
              <option value="email">Email</option>
              <option value="textarea">Nhiều dòng</option>
            </select>
          </label>
          <ContactField
            label="Gợi ý"
            value={field.placeholder}
            onChange={(placeholder) => updateField(index, { placeholder })}
          />
          <label className="flex items-center gap-2 text-xs font-semibold">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(event) =>
                updateField(index, { required: event.target.checked })
              }
            />{" "}
            Bắt buộc
          </label>
        </ContactListItem>
      ))}
    </ContactPanel>
  );
}
