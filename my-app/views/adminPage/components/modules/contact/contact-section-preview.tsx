"use client";

import { Eye, ExternalLink } from "lucide-react";
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
  return (
    <aside className="sticky top-6 rounded-2xl border border-[#EAE2D5] bg-[#FAF8F5] p-5 shadow-xs overflow-hidden">
      {/* Top Preview Bar */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#EAE2D5]">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#9A1C1F]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E1917]">
            Live Preview: Section {activeTab.toUpperCase()}
          </h3>
        </div>
        <a
          href="/contact"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9A1C1F] hover:underline"
        >
          <span>Xem trang thực tế</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* PREVIEW BIỂU MẪU ĐỘNG (FORM BUILDER PREVIEW) */}
      {activeTab === "cta" ? (
        <div className="rounded-xl border border-[#EAE2D5] bg-white p-4 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-2">
            <span className="text-[11px] font-bold uppercase text-[#9A1C1F] tracking-wider">
              {data.cta?.eyebrow || "BẮT ĐẦU MỘT CUỘC TRÒ CHUYỆN"}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {data.cta?.fields?.map((field, idx) => {
              const isFull =
                field.width === "full" || field.type === "textarea";
              const colSpan = isFull ? "sm:col-span-2" : "sm:col-span-1";

              return (
                <div key={idx} className={`space-y-1 ${colSpan}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-700">
                      {field.label}
                      {field.required && (
                        <span className="text-rose-600 font-bold"> *</span>
                      )}
                    </span>
                    <span className="text-[9px] text-stone-400 font-mono">
                      {field.type}
                    </span>
                  </div>

                  {field.type === "textarea" ? (
                    <div className="w-full h-14 rounded-lg border border-[#EAE2D5] bg-[#FAF8F5] p-2 text-[10px] text-stone-400">
                      {field.placeholder || "Nội dung nhiều dòng..."}
                    </div>
                  ) : field.type === "select" ? (
                    <div className="w-full py-1.5 px-2.5 rounded-lg border border-[#EAE2D5] bg-[#FAF8F5] text-[10px] text-stone-600 flex items-center justify-between">
                      <span className="truncate">
                        {field.placeholder || `-- Chọn ${field.label} --`}
                      </span>
                      <span className="text-[9px]">▼</span>
                    </div>
                  ) : field.type === "radio" ? (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {(field.options || ["Lựa chọn 1", "Lựa chọn 2"]).map(
                        (opt, oIdx) => (
                          <span
                            key={oIdx}
                            className="px-2 py-0.5 rounded border border-[#EAE2D5] bg-[#FAF8F5] text-[9px] text-stone-700 font-medium"
                          >
                            ○ {opt}
                          </span>
                        )
                      )}
                    </div>
                  ) : field.type === "checkbox" ? (
                    <div className="flex items-center gap-1.5 pt-1 text-[10px] text-stone-700">
                      <span className="w-3 h-3 rounded border border-[#EAE2D5] bg-white inline-block" />
                      <span>{field.label}</span>
                    </div>
                  ) : (
                    <div className="w-full py-1.5 px-2.5 rounded-lg border border-[#EAE2D5] bg-[#FAF8F5] text-[10px] text-stone-400 truncate">
                      {field.placeholder || `Nhập ${field.label.toLowerCase()}...`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#EAE2D5] flex items-center justify-between gap-2">
            <span className="text-[9px] text-stone-500 truncate max-w-[150px]">
              {data.cta?.privacyNote}
            </span>
            <button
              type="button"
              className="px-4 py-1.5 rounded-lg bg-[#9A1C1F] text-white text-[10px] font-bold uppercase tracking-wider"
            >
              {data.cta?.submitLabel || "Gửi yêu cầu"} →
            </button>
          </div>
        </div>
      ) : (
        /* PREVIEW CHO CÁC SECTION KHÁC */
        <div className="space-y-2">
          {activeTab === "header" && (
            <div className="p-3.5 rounded-xl bg-white border border-[#EAE2D5] space-y-2">
              <span className="text-[10px] font-bold text-[#9A1C1F] uppercase block">
                {data.header?.title}
              </span>
              <p className="text-[11px] text-stone-600">
                {data.header?.description}
              </p>
              <span className="text-[10px] font-semibold text-stone-500 block">
                Badge: {data.header?.brandBadge?.title}
              </span>
            </div>
          )}

          {activeTab === "contactInfo" && (
            <div className="p-3.5 rounded-xl bg-white border border-[#EAE2D5] space-y-2">
              <span className="text-xs font-bold text-[#1E1917] block">
                {data.contactInfo?.companyName}
              </span>
              <div className="space-y-1 pt-1">
                {data.contactInfo?.offices?.map((office, idx) => (
                  <div key={idx} className="text-[11px] text-stone-600">
                    • <strong>{office.name}:</strong> {office.address}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-3">
                {data.contactInfo?.channels?.map((channel, index) => (
                  <div key={index} className="min-w-0 rounded-lg bg-[#F7EDDD] p-2.5">
                    <strong className="block text-[10px] uppercase text-[#695D56]">{channel.title || `Card ${index + 1}`}</strong>
                    {channel.contacts.map((contact, contactIndex) => (
                      <div key={contactIndex} className="mt-1 break-all text-[10px]">
                        <span className={`block font-bold ${index === 0 || index === 2 ? "text-[#9A1C1F]" : "text-[#1E1917]"}`}>{contact.value}</span>
                        {contact.description && <span className="block text-[#695D56]">{contact.description}</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "map" && (
            <div className="p-3.5 rounded-xl bg-white border border-[#EAE2D5] space-y-1.5">
              <span className="text-xs font-bold text-[#1E1917] block">
                Địa điểm bản đồ ({data.map?.locations?.length || 0})
              </span>
              {data.map?.locations?.map((loc, idx) => (
                <div key={idx} className="text-[11px] text-stone-600">
                  📍 {loc.tabLabel}: {loc.title}
                </div>
              ))}
            </div>
          )}

          {activeTab === "experience" && (
            <div className="p-3.5 rounded-xl bg-white border border-[#EAE2D5] space-y-1.5">
              <span className="text-xs font-bold text-[#1E1917] block">
                {data.experience?.title} {data.experience?.suffix}
              </span>
              <span className="text-[10px] text-stone-500 block">
                {data.experience?.spaces?.length || 0} không gian sáng tạo
              </span>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
