"use client";

import { useState } from "react";
import { ConsultationFormData } from "../types/contact.type";

export function ContactForm() {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: "",
    phone: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        projectType: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <article className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE2D5]/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-6">
      {/* Form Header */}
      <div className="flex items-center justify-between border-b border-[#EAE2D5]/60 pb-3">
        <h2 className="font-bold text-xs sm:text-sm tracking-wider uppercase text-[#9A1C1F]">
          KHỞI TẠO HỢP TÁC
        </h2>
        {/* Checklist icon with tick badge */}
        <span className="w-8 h-8 rounded-lg bg-[#FAF1EC] text-[#9A1C1F] flex items-center justify-center">
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </span>
      </div>

      {submitted ? (
        <div className="bg-[#FAF3E8] p-8 rounded-2xl border border-[#EFE2D0] text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#9A1C1F] text-white flex items-center justify-center mx-auto text-xl font-bold">
            ✓
          </div>
          <h3 className="font-bold text-lg text-[#1E1917]">
            Cảm ơn bạn đã gửi yêu cầu hợp tác!
          </h3>
          <p className="text-xs text-[#5C544E] max-w-md mx-auto leading-relaxed">
            Đội ngũ chuyên gia kỹ thuật và giám sát dự án của Là Việt sẽ liên hệ lại với bạn trong vòng 24 giờ làm việc.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-2 text-xs font-bold text-[#9A1C1F] hover:underline"
          >
            Gửi yêu cầu khác
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: FullName & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E1917] mb-1.5">
                Họ và tên <span className="text-[#9A1C1F]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EAE2D5] text-xs text-[#1E1917] placeholder-[#A89F95] focus:outline-none focus:border-[#9A1C1F] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E1917] mb-1.5">
                Số điện thoại <span className="text-[#9A1C1F]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="0903 000 000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EAE2D5] text-xs text-[#1E1917] placeholder-[#A89F95] focus:outline-none focus:border-[#9A1C1F] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Email & Project Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E1917] mb-1.5">
                Email liên hệ <span className="text-[#9A1C1F]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="kien-truc-su@domain.vn"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EAE2D5] text-xs text-[#1E1917] placeholder-[#A89F95] focus:outline-none focus:border-[#9A1C1F] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E1917] mb-1.5">
                Loại hình công trình <span className="text-[#9A1C1F]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Chọn quy mô / mô hình dự án"
                value={formData.projectType}
                onChange={(e) =>
                  setFormData({ ...formData, projectType: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EAE2D5] text-xs text-[#1E1917] placeholder-[#A89F95] focus:outline-none focus:border-[#9A1C1F] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Message Textarea */}
          <div>
            <label className="block text-xs font-semibold text-[#1E1917] mb-1.5">
              Lời nhắn / Yêu cầu khảo sát vật liệu thực tế
            </label>
            <textarea
              rows={3}
              placeholder="Mô tả sơ bộ về ý niệm thiết kế, diện tích bề mặt sơn mài, hoặc yêu cầu thẩm mỹ chi tiết..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EAE2D5] text-xs text-[#1E1917] placeholder-[#A89F95] focus:outline-none focus:border-[#9A1C1F] focus:bg-white transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Row 4: NDA Security note & Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[11px] text-[#695D56]">
              <svg className="w-3.5 h-3.5 fill-current text-[#96671E] shrink-0" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
              <span>Bảo mật thông tin dự án theo chuẩn NDA</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#9A1C1F] hover:bg-[#851619] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>{isSubmitting ? "Đang gửi..." : "KẾT NỐI"}</span>
              <span>→</span>
            </button>
          </div>
        </form>
      )}
    </article>
  );
}

