import type { PageContactProps } from "../../../types/contact/page-contact.type";
import {
  ContactField,
  ContactListHeader,
  ContactListItem,
  ContactPanel,
} from "./contact-field";

type MapData = PageContactProps["map"];

export function ContactMapTab({
  data,
  onChange,
}: {
  data: MapData;
  onChange: (data: MapData) => void;
}) {
  function updateLocation(
    index: number,
    patch: Partial<MapData["locations"][number]>,
  ) {
    onChange({
      ...data,
      locations: data.locations.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      ),
    });
  }
  return (
    <ContactPanel title="Bản đồ">
      <div className="grid gap-4 sm:grid-cols-2">
        <ContactField
          label="Nút chỉ đường"
          value={data.directionsLabel}
          onChange={(directionsLabel) => onChange({ ...data, directionsLabel })}
        />
        <ContactField
          label="Icon ghi chú khoảng cách"
          icon
          value={data.distanceNoteIcon}
          onChange={(distanceNoteIcon) =>
            onChange({ ...data, distanceNoteIcon })
          }
        />
      </div>
      <ContactListHeader
        title={`Địa điểm (${data.locations.length})`}
        addLabel="Thêm địa điểm"
        onAdd={() =>
          onChange({
            ...data,
            locations: [
              ...data.locations,
              {
                name: "",
                tabLabel: "",
                title: "",
                distanceNote: "",
                embedUrl: "",
              },
            ],
          })
        }
      />
      {data.locations.map((item, index) => (
        <ContactListItem
          key={index}
          label={item.name || "địa điểm mới"}
          onRemove={() =>
            onChange({
              ...data,
              locations: data.locations.filter((_, i) => i !== index),
            })
          }
        >
          <ContactField
            label="Tên"
            value={item.name}
            onChange={(name) => updateLocation(index, { name })}
          />
          <ContactField
            label="Tên tab"
            value={item.tabLabel}
            onChange={(tabLabel) => updateLocation(index, { tabLabel })}
          />
          <ContactField
            label="Tiêu đề vị trí"
            value={item.title}
            onChange={(title) => updateLocation(index, { title })}
          />
          <ContactField
            label="Ghi chú khoảng cách"
            value={item.distanceNote}
            onChange={(distanceNote) => updateLocation(index, { distanceNote })}
          />
          <div className="sm:col-span-2">
            <ContactField
              label="Google Maps embed URL"
              value={item.embedUrl}
              onChange={(embedUrl) => updateLocation(index, { embedUrl })}
            />
          </div>
        </ContactListItem>
      ))}
    </ContactPanel>
  );
}
