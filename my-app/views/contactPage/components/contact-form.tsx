"use client";

import { useState } from "react";
import { IonIcon } from "@/shared/icons/ion-icon";
import type { PageContactProps, ConsultationFormData } from "../types/contact.type";

export function ContactForm({ data }: { data: PageContactProps["cta"] }) {
  const [formData, setFormData] = useState<ConsultationFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    // Form delivery is handled separately from the page-content CMS.
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({});
    }, 1000);
  }

  return (
    <article className="flex flex-col justify-between space-y-6 rounded-2xl border border-[#EAE2D5]/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-8">
      <div className="flex items-center justify-between border-b border-[#EAE2D5]/60 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#9A1C1F] sm:text-sm">{data.eyebrow}</h2>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAF1EC] text-[#9A1C1F]"><IonIcon name={data.icon} /></span>
      </div>
      {submitted ? (
        <div className="space-y-3 rounded-2xl border border-[#EFE2D0] bg-[#FAF3E8] p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#9A1C1F] text-xl font-bold text-white">✓</div>
          <h3 className="text-lg font-bold text-[#1E1917]">Cảm ơn bạn đã gửi yêu cầu hợp tác!</h3>
          <p className="mx-auto max-w-md text-xs leading-relaxed text-[#5C544E]">Đội ngũ chuyên gia kỹ thuật và giám sát dự án của Là Việt sẽ liên hệ lại với bạn trong vòng 24 giờ làm việc.</p>
          <button type="button" onClick={() => setSubmitted(false)} className="mt-2 text-xs font-bold text-[#9A1C1F] hover:underline">Gửi yêu cầu khác</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.fields.map((field, index) => (
              <label key={index} className={`block text-xs font-semibold text-[#1E1917] ${field.type === "textarea" ? "sm:col-span-2" : ""}`}>
                <span className="mb-1.5 block">{field.label}{field.required && <span className="text-[#9A1C1F]"> *</span>}</span>
                {field.type === "textarea"
                  ? <textarea name={field.name} rows={3} required={field.required} placeholder={field.placeholder} value={formData[field.name] ?? ""} onChange={(event) => setFormData({ ...formData, [field.name]: event.target.value })} className="w-full resize-none rounded-xl border border-[#EAE2D5] bg-[#FAF6F0] px-4 py-3 text-xs font-normal text-[#1E1917] placeholder-[#A89F95] focus:border-[#9A1C1F] focus:bg-white focus:outline-none" />
                  : <input name={field.name} type={field.type} required={field.required} placeholder={field.placeholder} value={formData[field.name] ?? ""} onChange={(event) => setFormData({ ...formData, [field.name]: event.target.value })} className="w-full rounded-xl border border-[#EAE2D5] bg-[#FAF6F0] px-4 py-3 text-xs font-normal text-[#1E1917] placeholder-[#A89F95] focus:border-[#9A1C1F] focus:bg-white focus:outline-none" />}
              </label>
            ))}
          </div>
          <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-[11px] text-[#695D56]"><IonIcon name={data.iconPrivacy} className="h-3.5 w-3.5 text-[#96671E]" /><span>{data.privacyNote}</span></div>
            <button type="submit" disabled={isSubmitting} className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#9A1C1F] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#851619] disabled:opacity-50 sm:w-auto">
              <span>{isSubmitting ? "Đang gửi..." : data.submitLabel}</span><span>→</span>
            </button>
          </div>
        </form>
      )}
    </article>
  );
}
