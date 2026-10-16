import { Plus } from "lucide-react";
import type { PageProjectCTA } from "../../../types/projects/page-project.type";
import { IconSelect } from "../icon-select";
import { RemoveItemButton } from "../remove-item-button";
import { ProjectTextField } from "./project-text-field";

interface Props {
  data: PageProjectCTA;
  onChange: (data: PageProjectCTA) => void;
}

export function ProjectCtaTab({ data, onChange }: Props) {
  const contacts = data.contacts ?? [];
  const actions = data.actions ?? [];

  return (
    <div className="space-y-6 rounded-2xl border border-[#EAE2D5] bg-white p-6 shadow-xs">
      <div className="border-b border-[#EAE2D5] pb-4">
        <h2 className="text-sm font-bold uppercase text-[#9A1C1F]">
          Section 4: Kêu gọi liên hệ (CTA)
        </h2>
        <p className="mt-1 text-xs text-[#695D56]">
          Nội dung banner, liên hệ và nút hành động.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ProjectTextField
          label="Nhãn nhỏ"
          value={data.eyebrow}
          onChange={(value) => onChange({ ...data, eyebrow: value })}
        />
        <IconSelect
          label="Icon nhãn"
          value={data.eyebrow_icon}
          onChange={(value) => onChange({ ...data, eyebrow_icon: value })}
        />
        <div className="sm:col-span-2">
          <ProjectTextField
            label="Tiêu đề"
            value={data.title}
            onChange={(value) => onChange({ ...data, title: value })}
          />
        </div>
        <div className="sm:col-span-2">
          <ProjectTextField
            multiline
            label="Mô tả"
            value={data.description}
            onChange={(value) => onChange({ ...data, description: value })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase">
          Thông tin liên hệ ({contacts.length})
        </h3>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...data,
              contacts: [...contacts, { icon: "", label: "", value: "" }],
            })
          }
          className="inline-flex items-center gap-1 text-xs font-bold text-[#9A1C1F]"
        >
          <Plus className="h-4 w-4" /> Thêm liên hệ
        </button>
      </div>
      {contacts.map((contact, index) => (
        <div
          key={index}
          className="relative rounded-xl border border-[#EAE2D5] bg-[#FAF8F5] p-4 pt-12"
        >
          <RemoveItemButton
            label={`Xóa liên hệ ${index + 1}`}
            onClick={() => onChange({ ...data, contacts: contacts.filter((_, i) => i !== index) })}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <IconSelect
              label="Icon"
              value={contact.icon}
              onChange={(value) =>
                onChange({
                  ...data,
                  contacts: contacts.map((item, i) =>
                    i === index ? { ...item, icon: value } : item,
                  ),
                })
              }
            />
            <ProjectTextField
              label="Nhãn"
              value={contact.label}
              onChange={(value) =>
                onChange({
                  ...data,
                  contacts: contacts.map((item, i) =>
                    i === index ? { ...item, label: value } : item,
                  ),
                })
              }
            />
            <ProjectTextField
              label="Giá trị"
              value={contact.value}
              onChange={(value) =>
                onChange({
                  ...data,
                  contacts: contacts.map((item, i) =>
                    i === index ? { ...item, value } : item,
                  ),
                })
              }
            />
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase">
          Nút hành động ({actions.length})
        </h3>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...data,
              actions: [...actions, { label: "", link: undefined }],
            })
          }
          className="inline-flex items-center gap-1 text-xs font-bold text-[#9A1C1F]"
        >
          <Plus className="h-4 w-4" /> Thêm nút
        </button>
      </div>
      {actions.map((action, index) => (
        <div
          key={index}
          className="relative rounded-xl border border-[#EAE2D5] bg-[#FAF8F5] p-4 pt-12"
        >
          <RemoveItemButton
            label={`Xóa nút ${index + 1}`}
            onClick={() => onChange({ ...data, actions: actions.filter((_, i) => i !== index) })}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <ProjectTextField
              label="Tên nút"
              value={action.label}
              onChange={(value) =>
                onChange({
                  ...data,
                  actions: actions.map((item, i) =>
                    i === index ? { ...item, label: value } : item,
                  ),
                })
              }
            />
            <ProjectTextField
              label="URL (https:// hoặc mailto:)"
              value={action.link ?? ""}
              onChange={(value) =>
                onChange({
                  ...data,
                  actions: actions.map((item, i) =>
                    i === index ? { ...item, link: value || undefined } : item,
                  ),
                })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
