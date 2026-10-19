import type {
  BrandingTab,
  SiteSettingsDraft,
} from "../../../types/brandings/site-settings.type";
import { BrandingDetailsPreview } from "./branding-details-preview";

interface Props {
  activeTab: BrandingTab;
  data: SiteSettingsDraft;
}

export function BrandingPreview({ activeTab, data }: Props) {
  const { footer } = data;
  let content;

  if (activeTab === "brand") {
    content = (
      <div className="space-y-3">
        {Boolean(data.logo) && (
          // eslint-disable-next-line @next/next/no-img-element
          <div className="p-2 bg-white rounded-lg border border-[#EAE2D5] inline-block shadow-2xs">
            <img src={data.logo} alt="Logo thương hiệu" className="max-h-24 max-w-full object-contain" />
          </div>
        )}
        <h4 className="font-bold text-[#1E1917]">{data.company || "Tên thương hiệu"}</h4>
        <p className="text-xs text-[#695D56]">{data.tagline || "Thông điệp ngắn"}</p>
      </div>
    );
  } else if (activeTab === "footer") {
    content = (
      <div className="space-y-4 text-xs text-[#695D56]">
        {Boolean(data.logo) && (
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#EAE2D5]">
            <img src={data.logo} alt="Logo footer" className="h-9 w-9 object-contain" />
            <span className="font-bold text-[#1E1917] text-sm uppercase tracking-wide">
              {data.company || "LÀ VIỆT"}
            </span>
          </div>
        )}
        <p>{footer.description || "Nội dung giới thiệu footer"}</p>
        <p className="border-t border-[#EAE2D5] pt-3">{footer.copyright || "Dòng bản quyền"}</p>
      </div>
    );
  } else if (activeTab === "details") {
    content = <BrandingDetailsPreview footer={footer} />;
  } else {
    content = (
      <div className="space-y-3 text-xs">
        {footer.policies.map((item, index) => (
          <p key={index}>{item.label || "Chính sách"} — {item.href}</p>
        ))}
      </div>
    );
  }

  return (
    <aside className="sticky top-4 rounded-2xl border border-[#EAE2D5] bg-[#FAF8F5] p-5 shadow-xs">
      <h3 className="mb-4 border-b border-[#EAE2D5] pb-3 text-sm font-bold text-[#1E1917]">
        Xem trước nội dung
      </h3>
      {content}
    </aside>
  );
}
