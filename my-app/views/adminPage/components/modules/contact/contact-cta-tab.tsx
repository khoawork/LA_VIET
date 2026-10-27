"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  FileSpreadsheet,
  ListPlus,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import type { PageContactProps } from "../../../types/contact/page-contact.type";
import { ContactField, ContactPanel } from "./contact-field";

type CTA = PageContactProps["cta"];
type Field = CTA["fields"][number];

// Các mẫu trường thông dụng để thêm nhanh với 1 cú click
const FIELD_PRESETS: Array<{
  title: string;
  field: Field;
}> = [
  {
    title: "Họ và tên",
    field: {
      name: "fullname",
      label: "Họ và tên",
      type: "text",
      placeholder: "Nguyễn Văn A",
      required: true,
      width: "half",
      options: [],
    },
  },
  {
    title: "Số điện thoại",
    field: {
      name: "phone",
      label: "Số điện thoại",
      type: "tel",
      placeholder: "0903 xxx xxx",
      required: true,
      width: "half",
      options: [],
    },
  },
  {
    title: "Email",
    field: {
      name: "email",
      label: "Địa chỉ Email",
      type: "email",
      placeholder: "name@example.com",
      required: true,
      width: "half",
      options: [],
    },
  },
  {
    title: "Dịch vụ quan tâm (Dropdown)",
    field: {
      name: "service_type",
      label: "Dịch vụ / Hạng mục quan tâm",
      type: "select",
      placeholder: "Chọn hạng mục bạn quan tâm",
      required: false,
      width: "half",
      options: [
        "Tranh sơn mài độc bản",
        "Đại bích họa kiến trúc",
        "Vách trang trí sảnh & resort",
        "Vật phẩm ứng dụng cao cấp",
        "Phục dựng & bảo tồn di sản",
      ],
    },
  },
  {
    title: "Ngân sách dự kiến (Dropdown)",
    field: {
      name: "budget",
      label: "Ngân sách dự kiến",
      type: "select",
      placeholder: "Chọn khoảng ngân sách",
      required: false,
      width: "half",
      options: [
        "Dưới 100 triệu",
        "100 - 300 triệu",
        "300 - 800 triệu",
        "Trên 800 triệu",
      ],
    },
  },
  {
    title: "Ngày hẹn tư vấn (Date)",
    field: {
      name: "meeting_date",
      label: "Ngày mong muốn gặp tư vấn",
      type: "date",
      placeholder: "",
      required: false,
      width: "half",
      options: [],
    },
  },
  {
    title: "Nội dung yêu cầu (Nhiều dòng)",
    field: {
      name: "message",
      label: "Nội dung chi tiết yêu cầu",
      type: "textarea",
      placeholder: "Chia sẻ thêm về không gian, kích thước hoặc yêu cầu cụ thể...",
      required: false,
      width: "full",
      options: [],
    },
  },
];

export function ContactCtaTab({
  data,
  onChange,
}: {
  data: CTA;
  onChange: (data: CTA) => void;
}) {
  const [newOptionInputs, setNewOptionInputs] = useState<Record<number, string>>({});

  // Cập nhật trường theo vị trí
  function updateField(index: number, patch: Partial<Field>) {
    onChange({
      ...data,
      fields: data.fields.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      ),
    });
  }

  // Di chuyển thứ tự trường (Lên / Xuống)
  function moveField(fromIndex: number, toIndex: number) {
    if (toIndex < 0 || toIndex >= data.fields.length) return;
    const newFields = [...data.fields];
    const [moved] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, moved);
    onChange({ ...data, fields: newFields });
  }

  // Xóa trường
  function removeField(index: number) {
    const fieldName = data.fields[index]?.label || `Trường #${index + 1}`;
    if (confirm(`Bạn có chắc chắn muốn xóa "${fieldName}" khỏi biểu mẫu?`)) {
      onChange({
        ...data,
        fields: data.fields.filter((_, i) => i !== index),
      });
    }
  }

  // Thêm một trường tùy chỉnh mới
  function addCustomField() {
    const nextIndex = data.fields.length + 1;
    onChange({
      ...data,
      fields: [
        ...data.fields,
        {
          name: `field_${Date.now()}`,
          label: `Trường mới ${nextIndex}`,
          type: "text",
          placeholder: "",
          required: false,
          width: "half",
          options: [],
        },
      ],
    });
  }

  // Thêm nhanh từ mẫu có sẵn (Preset)
  function addPresetField(preset: typeof FIELD_PRESETS[number]) {
    // Đảm bảo name không bị trùng
    let safeName = preset.field.name;
    const existingNames = new Set(data.fields.map((f) => f.name));
    let counter = 1;
    while (existingNames.has(safeName)) {
      safeName = `${preset.field.name}_${counter++}`;
    }

    onChange({
      ...data,
      fields: [
        ...data.fields,
        {
          ...preset.field,
          name: safeName,
        },
      ],
    });
  }

  // Thêm option vào trường select/radio
  function addOption(fieldIndex: number) {
    const inputVal = (newOptionInputs[fieldIndex] || "").trim();
    if (!inputVal) return;

    // Cho phép nhập phân tách bằng dấu phẩy
    const newOpts = inputVal
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const currentOptions = data.fields[fieldIndex]?.options || [];
    const merged = Array.from(new Set([...currentOptions, ...newOpts]));

    updateField(fieldIndex, { options: merged });
    setNewOptionInputs((prev) => ({ ...prev, [fieldIndex]: "" }));
  }

  // Xóa một option
  function removeOption(fieldIndex: number, optionIndex: number) {
    const currentOptions = data.fields[fieldIndex]?.options || [];
    updateField(fieldIndex, {
      options: currentOptions.filter((_, i) => i !== optionIndex),
    });
  }

  return (
    <ContactPanel title="Thiết kế Biểu mẫu Liên hệ (Form Builder)">
      {/* 1. Cấu hình tiêu đề & nhãn chung của CTA Form */}
      <div className="grid gap-4 sm:grid-cols-2 bg-[#FAF8F5] p-4 rounded-xl border border-[#EAE2D5]">
        <ContactField
          label="Dòng tiêu đề phụ (Eyebrow)"
          value={data.eyebrow}
          onChange={(eyebrow) => onChange({ ...data, eyebrow })}
        />
        <ContactField
          label="Icon CTA (IonIcon name)"
          icon
          value={data.icon}
          onChange={(icon) => onChange({ ...data, icon })}
        />
        <ContactField
          label="Nhãn nút gửi biểu mẫu (Submit Button)"
          value={data.submitLabel}
          onChange={(submitLabel) => onChange({ ...data, submitLabel })}
        />
        <ContactField
          label="Icon bảo mật (Privacy Icon)"
          icon
          value={data.iconPrivacy}
          onChange={(iconPrivacy) => onChange({ ...data, iconPrivacy })}
        />
        <div className="sm:col-span-2">
          <ContactField
            label="Thông báo bảo mật thông tin"
            value={data.privacyNote}
            onChange={(privacyNote) => onChange({ ...data, privacyNote })}
          />
        </div>
      </div>

      {/* 2. Điều hướng cấu hình Google Sheets & Biểu mẫu tập trung */}
      <div className="p-4 rounded-xl border border-[#D5C2AA]/80 bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center font-bold">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1E1917] flex items-center gap-1.5">
              Tích hợp Google Sheets & Cấu hình Biểu mẫu tập trung
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#0F9D58]/10 text-[#0F9D58] uppercase">
                Hệ thống
              </span>
            </h4>
            <p className="text-[11px] text-stone-500">
              Cấu hình liên kết Google Sheets API, phân quyền email bot và đồng bộ tiêu đề cột đã được tách sang trang Quản lý Biểu mẫu.
            </p>
          </div>
        </div>
        <Link
          href="/admin/system/forms"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F9D58] hover:bg-[#0c7c45] text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
        >
          <span>Mở Quản lý Biểu mẫu</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3. Thanh thêm nhanh các mẫu trường (Preset Templates) */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#1E1917] flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#9A1C1F]" />
            Thêm nhanh trường mẫu phổ biến
          </span>
          <button
            type="button"
            onClick={addCustomField}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#9A1C1F] text-white hover:bg-[#851619] text-xs font-bold uppercase transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm trường tùy chỉnh</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {FIELD_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => addPresetField(preset)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#EAE2D5] bg-white hover:border-[#9A1C1F] hover:bg-[#FAF1EC] text-xs font-medium text-[#1E1917] transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3 text-[#9A1C1F]" />
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Danh sách các trường dữ liệu động của Form */}
      <div className="space-y-4 pt-3">
        <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-2">
          <h3 className="text-xs font-bold uppercase text-[#1E1917] flex items-center gap-2">
            <ListPlus className="w-4 h-4 text-[#9A1C1F]" />
            Danh sách các trường biểu mẫu ({data.fields.length})
          </h3>
          <span className="text-[11px] text-stone-500 italic">
            Dùng nút ▲ / ▼ để sắp xếp thứ tự hiển thị
          </span>
        </div>

        {data.fields.length === 0 ? (
          <div className="text-center py-12 bg-[#FAF8F5] rounded-xl border border-dashed border-[#EAE2D5] text-xs text-stone-500 space-y-2">
            <p>Biểu mẫu chưa có trường nào.</p>
            <p className="text-[11px] text-[#9A1C1F] font-semibold">
              Nhấp vào các nút mẫu phía trên hoặc bấm &quot;Thêm trường tùy chỉnh&quot; để tạo.
            </p>
          </div>
        ) : (
          data.fields.map((field, index) => {
            const isSelectOrRadio =
              field.type === "select" || field.type === "radio";

            return (
              <div
                key={index}
                className="rounded-2xl border border-[#EAE2D5] bg-[#FAF8F5] p-5 space-y-4 shadow-2xs hover:border-[#9A1C1F]/40 transition-colors"
              >
                {/* Header thanh điều khiển trường */}
                <div className="flex items-center justify-between border-b border-[#EAE2D5]/70 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#1E1917] text-white flex items-center justify-center text-[10px] font-bold font-mono">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-[#1E1917]">
                      {field.label || field.name || "Trường chưa đặt tên"}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                      {field.type}
                    </span>
                    {field.required && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        Bắt buộc
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Di chuyển lên */}
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveField(index, index - 1)}
                      className="p-1.5 rounded-lg border border-[#EAE2D5] bg-white text-stone-600 hover:text-[#9A1C1F] disabled:opacity-30 cursor-pointer"
                      title="Di chuyển lên"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    {/* Di chuyển xuống */}
                    <button
                      type="button"
                      disabled={index === data.fields.length - 1}
                      onClick={() => moveField(index, index + 1)}
                      className="p-1.5 rounded-lg border border-[#EAE2D5] bg-white text-stone-600 hover:text-[#9A1C1F] disabled:opacity-30 cursor-pointer"
                      title="Di chuyển xuống"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Xóa trường */}
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className="p-1.5 rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                      title="Xóa trường này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Các ô cấu hình trường */}
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700">
                      Nhãn hiển thị (Label) <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => {
                        const newLabel = e.target.value;
                        updateField(index, { label: newLabel });
                      }}
                      placeholder="Ví dụ: Họ và tên..."
                      className="w-full px-3 py-2 rounded-xl border border-[#EAE2D5] bg-white text-xs font-normal text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700">
                      Tên định danh (Field Key) <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) =>
                        updateField(index, {
                          name: e.target.value.toLowerCase().replace(/\s+/g, "_"),
                        })
                      }
                      placeholder="fullname, phone, message..."
                      className="w-full px-3 py-2 rounded-xl border border-[#EAE2D5] bg-white text-xs font-mono text-[#9A1C1F] focus:border-[#9A1C1F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700">
                      Loại trường (Input Type)
                    </label>
                    <select
                      value={field.type}
                      onChange={(e) =>
                        updateField(index, {
                          type: e.target.value as Field["type"],
                          // Tự động set full width nếu là textarea
                          width:
                            e.target.value === "textarea" ? "full" : field.width || "half",
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#EAE2D5] bg-white text-xs font-normal text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none cursor-pointer"
                    >
                      <option value="text">Văn bản ngắn (Text)</option>
                      <option value="tel">Số điện thoại (Tel)</option>
                      <option value="email">Hộp thư (Email)</option>
                      <option value="textarea">Văn bản nhiều dòng (Textarea)</option>
                      <option value="select">Menu chọn (Dropdown Select)</option>
                      <option value="number">Số lượng / Giá trị (Number)</option>
                      <option value="date">Chọn ngày (Date Picker)</option>
                      <option value="radio">Chọn một (Radio Group)</option>
                      <option value="checkbox">Hộp kiểm đồng ý (Checkbox)</option>
                    </select>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-bold text-stone-700">
                      Gợi ý mờ (Placeholder)
                    </label>
                    <input
                      type="text"
                      value={field.placeholder || ""}
                      onChange={(e) =>
                        updateField(index, { placeholder: e.target.value })
                      }
                      placeholder="Gợi ý người dùng nhập..."
                      className="w-full px-3 py-2 rounded-xl border border-[#EAE2D5] bg-white text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-stone-700">
                      Độ rộng hiển thị (Width)
                    </label>
                    <select
                      value={field.width || "half"}
                      onChange={(e) =>
                        updateField(index, {
                          width: e.target.value as "half" | "full",
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#EAE2D5] bg-white text-xs font-normal text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none cursor-pointer"
                    >
                      <option value="half">50% — Nửa dòng (Half)</option>
                      <option value="full">100% — Toàn dòng (Full)</option>
                    </select>
                  </div>
                </div>

                {/* Bắt buộc điền toggle */}
                <div className="flex items-center gap-3 pt-1">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E1917] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(field.required)}
                      onChange={(e) =>
                        updateField(index, { required: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#9A1C1F] focus:ring-[#9A1C1F] border-[#EAE2D5] cursor-pointer"
                    />
                    <span>Bắt buộc người dùng phải điền trường này</span>
                  </label>
                </div>

                {/* Khối quản lý Options (nếu type là select hoặc radio) */}
                {isSelectOrRadio && (
                  <div className="p-3.5 rounded-xl border border-[#EAE2D5] bg-white space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#9A1C1F] uppercase tracking-wider">
                        Các tùy chọn cho menu ({field.options?.length || 0})
                      </span>
                      <span className="text-[10px] text-stone-500">
                        Nhập các mục cách nhau bằng dấu phẩy
                      </span>
                    </div>

                    {/* Chips hiển thị các option hiện có */}
                    <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                      {(field.options || []).map((opt, optIdx) => (
                        <span
                          key={optIdx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF1EC] border border-[#F2C2BB]/50 text-xs font-semibold text-[#9A1C1F]"
                        >
                          <span>{opt}</span>
                          <button
                            type="button"
                            onClick={() => removeOption(index, optIdx)}
                            className="hover:text-red-700 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      {(field.options || []).length === 0 && (
                        <span className="text-xs text-stone-400 italic">
                          Chưa có tùy chọn nào. Hãy nhập bên dưới để thêm.
                        </span>
                      )}
                    </div>

                    {/* Input thêm option */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newOptionInputs[index] || ""}
                        onChange={(e) =>
                          setNewOptionInputs({
                            ...newOptionInputs,
                            [index]: e.target.value,
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addOption(index);
                          }
                        }}
                        placeholder="Nhập tùy chọn mới (ví dụ: Tranh treo tường, Vách sảnh...)"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-[#EAE2D5] text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => addOption(index)}
                        className="px-4 py-1.5 rounded-lg bg-[#9A1C1F] text-white hover:bg-[#851619] text-xs font-bold transition-colors cursor-pointer"
                      >
                        Thêm
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </ContactPanel>
  );
}
