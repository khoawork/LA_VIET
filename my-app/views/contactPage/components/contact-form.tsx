"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { IonIcon } from "@/shared/icons/ion-icon";
import type { PageContactProps } from "../types/contact.type";

export function ContactForm({ data }: { data: PageContactProps["cta"] }) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    if (errorMessage) setErrorMessage(null);
  };

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    // 1. Kiểm tra các trường bắt buộc
    for (const field of data.fields) {
      if (field.required) {
        const val = formData[field.name];
        if (val === undefined || val === null || val === "" || val === false) {
          setErrorMessage(`Vui lòng điền thông tin vào trường "${field.label}"`);
          return;
        }
      }
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: formData,
          sheetId: (data as any)?.googleSheetId || "",
          fields: data.fields?.map((f) => ({ name: f.name, label: f.label })),
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setSubmitted(true);
        setFormData({});
      } else {
        setErrorMessage(
          result?.message || "Không thể gửi yêu cầu, vui lòng thử lại sau ít phút."
        );
      }
    } catch (err: any) {
      setErrorMessage(
        err.message || "Lỗi kết nối tới máy chủ. Vui lòng thử lại sau ít phút."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <article className="flex flex-col justify-between space-y-6 rounded-2xl border border-[#EAE2D5]/80 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:p-8">
      {/* Form Header */}
      <div className="flex items-center justify-between border-b border-[#EAE2D5]/60 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#9A1C1F] sm:text-sm">
          {data.eyebrow}
        </h2>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAF1EC] text-[#9A1C1F]">
          <IonIcon name={data.icon} />
        </span>
      </div>

      {submitted ? (
        <div className="space-y-4 rounded-2xl border border-[#EFE2D0] bg-[#FAF3E8] p-8 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#9A1C1F] text-white shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#1E1917]">
            Cảm ơn bạn đã gửi yêu cầu hợp tác!
          </h3>
          <p className="mx-auto max-w-md text-xs leading-relaxed text-[#5C544E]">
            Đội ngũ chuyên gia kỹ thuật và giám sát dự án của Là Việt đã nhận được thông tin và sẽ liên hệ lại với bạn trong vòng 24 giờ làm việc.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({});
              }}
              className="px-5 py-2 rounded-xl bg-white border border-[#EAE2D5] text-xs font-bold text-[#9A1C1F] hover:bg-[#FAF1EC] transition-colors cursor-pointer"
            >
              Gửi thêm yêu cầu khác
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMessage && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* DYNAMIC FORM ENGINE: Render từng field dựa trên cấu hình Type từ Form Builder */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.fields.map((field, index) => {
              const isFullWidth =
                field.width === "full" || field.type === "textarea";
              const colSpanClass = isFullWidth ? "sm:col-span-2" : "sm:col-span-1";

              return (
                <div key={field.name || index} className={`space-y-1.5 ${colSpanClass}`}>
                  {/* Label tiêu đề trường */}
                  {field.type !== "checkbox" && (
                    <label className="block text-xs font-semibold text-[#1E1917]">
                      <span>{field.label}</span>
                      {field.required && (
                        <span className="text-[#9A1C1F] font-bold"> *</span>
                      )}
                    </label>
                  )}

                  {/* 1. TEXTAREA (Nhiều dòng) */}
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      rows={3}
                      required={field.required}
                      placeholder={field.placeholder || `Nhập ${field.label.toLowerCase()}...`}
                      value={formData[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full resize-none rounded-xl border border-[#EAE2D5] bg-[#FAF6F0] px-4 py-3 text-xs font-normal text-[#1E1917] placeholder-[#A89F95] focus:border-[#9A1C1F] focus:bg-white focus:outline-none transition-all"
                    />
                  ) : /* 2. SELECT DROPDOWN (Menu thả xuống) */
                  field.type === "select" ? (
                    <div className="relative">
                      <select
                        name={field.name}
                        required={field.required}
                        value={formData[field.name] ?? ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="w-full appearance-none rounded-xl border border-[#EAE2D5] bg-[#FAF6F0] px-4 py-3 text-xs font-medium text-[#1E1917] focus:border-[#9A1C1F] focus:bg-white focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="">
                          {field.placeholder || `-- Chọn ${field.label.toLowerCase()} --`}
                        </option>
                        {(field.options || []).map((opt, optIdx) => (
                          <option key={optIdx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 text-xs">
                        ▼
                      </div>
                    </div>
                  ) : /* 3. RADIO BUTTONS GROUP */
                  field.type === "radio" ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(field.options || []).map((opt, optIdx) => {
                        const isChecked = formData[field.name] === opt;
                        return (
                          <label
                            key={optIdx}
                            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                              isChecked
                                ? "bg-[#FAF1EC] border-[#9A1C1F] text-[#9A1C1F] font-bold shadow-xs"
                                : "bg-[#FAF6F0] border-[#EAE2D5] text-[#1E1917] hover:bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              name={field.name}
                              value={opt}
                              checked={isChecked}
                              onChange={() => handleChange(field.name, opt)}
                              className="w-3.5 h-3.5 accent-[#9A1C1F]"
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : /* 4. CHECKBOX */
                  field.type === "checkbox" ? (
                    <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name={field.name}
                        checked={Boolean(formData[field.name])}
                        onChange={(e) =>
                          handleChange(field.name, e.target.checked)
                        }
                        className="w-4 h-4 mt-0.5 rounded accent-[#9A1C1F] cursor-pointer"
                      />
                      <span className="text-xs font-medium text-[#1E1917]">
                        {field.label}
                        {field.required && (
                          <span className="text-[#9A1C1F] font-bold"> *</span>
                        )}
                      </span>
                    </label>
                  ) : (
                    /* 5. CÁC INPUT CHUẨN: text, tel, email, number, date */
                    <input
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder || `Nhập ${field.label.toLowerCase()}...`}
                      value={formData[field.name] ?? ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full rounded-xl border border-[#EAE2D5] bg-[#FAF6F0] px-4 py-3 text-xs font-normal text-[#1E1917] placeholder-[#A89F95] focus:border-[#9A1C1F] focus:bg-white focus:outline-none transition-all"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Footer & Submit Button */}
          <div className="flex flex-col items-start justify-between gap-4 pt-3 border-t border-[#EAE2D5]/60 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-[11px] text-[#695D56]">
              <IonIcon
                name={data.iconPrivacy}
                className="h-3.5 w-3.5 text-[#96671E] shrink-0"
              />
              <span>{data.privacyNote}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#9A1C1F] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#851619] disabled:opacity-50 sm:w-auto"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              <span>{isSubmitting ? "Đang gửi..." : data.submitLabel}</span>
              {!isSubmitting && <span>→</span>}
            </button>
          </div>
        </form>
      )}
    </article>
  );
}
