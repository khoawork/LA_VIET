import type {
  PageContactProps,
  PageContactSection,
} from "../../../types/contact/page-contact.type";

export function ContactSectionPreview({
  activeTab,
  data,
}: {
  activeTab: PageContactSection;
  data: PageContactProps;
}) {
  const rows =
    activeTab === "header"
      ? [
          data.header.title,
          data.header.description,
          data.header.brandBadge.title,
        ]
      : activeTab === "contactInfo"
        ? [
            data.contactInfo.companyName,
            ...data.contactInfo.offices.map((item) => item.name),
            ...data.contactInfo.channels.map((item) => item.title),
          ]
        : activeTab === "map"
          ? data.map.locations.map((item) => `${item.tabLabel} — ${item.title}`)
          : activeTab === "cta"
            ? [
                data.cta.eyebrow,
                ...data.cta.fields.map((item) => item.label),
                data.cta.submitLabel,
              ]
            : [
                data.experience.eyebrow,
                data.experience.title,
                data.experience.suffix,
                ...data.experience.spaces.map((item) => item.title),
              ];
  return (
    <aside className="sticky top-4 rounded-2xl border border-[#EAE2D5] bg-[#FAF8F5] p-5 shadow-xs">
      <h3 className="mb-4 border-b border-[#EAE2D5] pb-3 text-sm font-bold text-[#1E1917]">
        Xem trước nội dung
      </h3>
      <div className="space-y-2">
        {rows.map((row, index) => (
          <p
            key={index}
            className="rounded-lg bg-white p-3 text-xs text-[#1E1917]"
          >
            {row}
          </p>
        ))}
      </div>
    </aside>
  );
}
