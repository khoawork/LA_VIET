import { ImagePlus } from "lucide-react";
import type { PageContactProps } from "../../../types/contact/page-contact.type";
import {
  ContactField,
  ContactListHeader,
  ContactListItem,
  ContactPanel,
} from "./contact-field";

type Experience = PageContactProps["experience"];

export function ContactExperienceTab({
  data,
  onChange,
}: {
  data: Experience;
  onChange: (data: Experience) => void;
}) {
  function updateSpace(
    index: number,
    patch: Partial<Experience["spaces"][number]>,
  ) {
    onChange({
      ...data,
      spaces: data.spaces.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      ),
    });
  }
  return (
    <ContactPanel title="Không gian trải nghiệm">
      <div className="grid gap-4 sm:grid-cols-2">
        <ContactField
          label="Nhãn nhỏ"
          value={data.eyebrow}
          onChange={(eyebrow) => onChange({ ...data, eyebrow })}
        />
        <ContactField
          label="Tiêu đề"
          value={data.title}
          onChange={(title) => onChange({ ...data, title })}
        />
        <ContactField
          label="Dòng số lượng"
          value={data.suffix}
          onChange={(suffix) => onChange({ ...data, suffix })}
        />
      </div>
      <ContactListHeader
        title={`Không gian (${data.spaces.length})`}
        addLabel="Thêm không gian"
        onAdd={() =>
          onChange({
            ...data,
            spaces: [
              ...data.spaces,
              { tag: "", title: "", description: "", imageUrl: "" },
            ],
          })
        }
      />
      {data.spaces.map((space, index) => (
        <ContactListItem
          key={index}
          label={space.title || "không gian mới"}
          onRemove={() =>
            onChange({
              ...data,
              spaces: data.spaces.filter((_, i) => i !== index),
            })
          }
        >
          <ContactField
            label="Nhãn"
            value={space.tag}
            onChange={(tag) => updateSpace(index, { tag })}
          />
          <ContactField
            label="Tiêu đề"
            value={space.title}
            onChange={(title) => updateSpace(index, { title })}
          />
          <div className="sm:col-span-2">
            <ContactField
              label="Mô tả"
              value={space.description}
              multiline
              onChange={(description) => updateSpace(index, { description })}
            />
          </div>
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#1E1917]">Ảnh không gian</span>
              <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#FAF1EC] px-3 py-2 text-xs font-bold text-[#9A1C1F] transition-colors hover:bg-[#F0DCD6]">
                <ImagePlus className="h-4 w-4" /> Chọn ảnh từ máy
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result === "string") {
                        updateSpace(index, { imageUrl: reader.result });
                      }
                    };
                    reader.readAsDataURL(file);
                    event.target.value = "";
                  }}
                />
              </label>
            </div>
            <ContactField
              label="URL ảnh"
              value={space.imageUrl}
              onChange={(imageUrl) => updateSpace(index, { imageUrl })}
            />
            {space.imageUrl.trim() && (
              // Ảnh tạm từ máy và URL đang chỉnh sửa không cần bộ tối ưu Next.js.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={space.imageUrl.trim()}
                alt={`Xem trước ${space.title || `không gian ${index + 1}`}`}
                className="mt-3 aspect-video w-full max-w-xs rounded-lg border border-[#d9c7ae] object-cover"
              />
            )}
          </div>
        </ContactListItem>
      ))}
      <div className="grid gap-4 border-t border-[#d9c7ae] pt-5 sm:grid-cols-2">
        <ContactField
          label="Ghi chú tham quan"
          value={data.visitNote}
          onChange={(visitNote) => onChange({ ...data, visitNote })}
        />
        <ContactField
          label="Lưu ý đặt hẹn"
          value={data.bookingNote}
          onChange={(bookingNote) => onChange({ ...data, bookingNote })}
        />
      </div>
    </ContactPanel>
  );
}
