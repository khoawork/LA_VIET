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
            <ContactField
              label="URL ảnh"
              value={space.imageUrl}
              onChange={(imageUrl) => updateSpace(index, { imageUrl })}
            />
          </div>
        </ContactListItem>
      ))}
    </ContactPanel>
  );
}
