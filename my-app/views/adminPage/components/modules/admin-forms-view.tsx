"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  FileText,
  Layers,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  getPageContact,
  savePageContactSection,
} from "../../services/contact/page-contact.service";
import type { PageContactProps } from "../../types/contact/page-contact.type";

type CTA = PageContactProps["cta"];
type Field = CTA["fields"][number];

// Các mẫu trường thông dụng để thêm nhanh
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
    title: "Nội dung yêu cầu (Textarea)",
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

export function AdminFormsView() {
  const [selectedFormId, setSelectedFormId] = useState<"contact" | "newsletter" | "profile">("contact");
  const [activeTab, setActiveTab] = useState<"sheet" | "builder" | "preview" | "settings">("sheet");

  const [cta, setCta] = useState<CTA | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");
  const [saveError, setSaveError] = useState("");

  // Google Sheets state
  const [botEmail, setBotEmail] = useState(
    "form-to-google-sheet@sharp-bulwark-510807-v0.iam.gserviceaccount.com"
  );
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [sheetActionLoading, setSheetActionLoading] = useState<"test" | "sync" | null>(null);
  const [sheetFeedback, setSheetFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [newOptionInputs, setNewOptionInputs] = useState<Record<number, string>>({});

  // 1. Tải cấu hình form Contact từ API
  useEffect(() => {
    let mounted = true;
    getPageContact()
      .then((data) => {
        if (!mounted) return;
        setCta(data.props.cta);
      })
      .catch((err: Error) => {
        if (mounted) setSaveError(err.message || "Không thể tải cấu hình biểu mẫu");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    // Lấy thông tin email bot
    fetch("/api/contacts/sheet")
      .then((res) => res.json())
      .then((res) => {
        if (res.data?.botEmail) {
          setBotEmail(res.data.botEmail);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  function handleCopyBotEmail() {
    navigator.clipboard.writeText(botEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  }

  // 2. Lưu cấu hình Form vào cơ sở dữ liệu
  async function handleSaveConfig() {
    if (!cta) return;
    setSaving(true);
    setSaveSuccess("");
    setSaveError("");
    try {
      await savePageContactSection("cta", cta);
      setSaveSuccess("Đã lưu thành công cấu hình biểu mẫu & liên kết Google Sheets!");
      setTimeout(() => setSaveSuccess(""), 4000);
    } catch (err: any) {
      setSaveError(err.message || "Không thể lưu cấu hình biểu mẫu.");
    } finally {
      setSaving(false);
    }
  }

  // 3. Kiểm tra kết nối Google Sheet
  async function handleTestConnection() {
    if (!cta?.googleSheetId) {
      setSheetFeedback({
        type: "error",
        message: "Vui lòng nhập Google Sheet ID hoặc đường dẫn URL trước.",
      });
      return;
    }
    setSheetActionLoading("test");
    setSheetFeedback(null);
    try {
      const res = await fetch("/api/contacts/sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheetId: cta.googleSheetId,
          action: "test",
        }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSheetFeedback({
          type: "success",
          message: result.message || "Kết nối Google Sheet thành công!",
        });
      } else {
        setSheetFeedback({
          type: "error",
          message:
            result.message ||
            "Không thể kết nối tới Google Sheet. Hãy kiểm tra xem bạn đã chia sẻ quyền Editor cho Bot Email chưa.",
        });
      }
    } catch (err: any) {
      setSheetFeedback({
        type: "error",
        message: err.message || "Lỗi mạng khi kiểm tra kết nối Google Sheet.",
      });
    } finally {
      setSheetActionLoading(null);
    }
  }

  // 4. Đồng bộ các Header cột lên Google Sheet
  async function handleSyncHeaders() {
    if (!cta?.googleSheetId) {
      setSheetFeedback({
        type: "error",
        message: "Vui lòng nhập Google Sheet ID hoặc đường dẫn URL trước.",
      });
      return;
    }
    setSheetActionLoading("sync");
    setSheetFeedback(null);
    try {
      const res = await fetch("/api/contacts/sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheetId: cta.googleSheetId,
          action: "sync",
          fields: cta.fields.map((f) => ({ name: f.name, label: f.label })),
        }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSheetFeedback({
          type: "success",
          message: result.message || "Đồng bộ Header cột thành công!",
        });
      } else {
        setSheetFeedback({
          type: "error",
          message: result.message || "Không thể đồng bộ cột lên Google Sheet.",
        });
      }
    } catch (err: any) {
      setSheetFeedback({
        type: "error",
        message: err.message || "Lỗi mạng khi đồng bộ Google Sheet.",
      });
    } finally {
      setSheetActionLoading(null);
    }
  }

  // Field helpers
  function updateField(index: number, patch: Partial<Field>) {
    if (!cta) return;
    setCta({
      ...cta,
      fields: cta.fields.map((item, i) =>
        i === index ? { ...item, ...patch } : item
      ),
    });
  }

  function moveField(fromIndex: number, toIndex: number) {
    if (!cta || toIndex < 0 || toIndex >= cta.fields.length) return;
    const newFields = [...cta.fields];
    const [moved] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, moved);
    setCta({ ...cta, fields: newFields });
  }

  function removeField(index: number) {
    if (!cta) return;
    const fieldName = cta.fields[index]?.label || `Trường #${index + 1}`;
    if (confirm(`Bạn có chắc chắn muốn xóa "${fieldName}" khỏi biểu mẫu?`)) {
      setCta({
        ...cta,
        fields: cta.fields.filter((_, i) => i !== index),
      });
    }
  }

  function addCustomField() {
    if (!cta) return;
    const nextIndex = cta.fields.length + 1;
    setCta({
      ...cta,
      fields: [
        ...cta.fields,
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

  function addPresetField(preset: typeof FIELD_PRESETS[number]) {
    if (!cta) return;
    let safeName = preset.field.name;
    const existingNames = new Set(cta.fields.map((f) => f.name));
    let counter = 1;
    while (existingNames.has(safeName)) {
      safeName = `${preset.field.name}_${counter++}`;
    }

    setCta({
      ...cta,
      fields: [
        ...cta.fields,
        {
          ...preset.field,
          name: safeName,
        },
      ],
    });
  }

  function addOption(fieldIndex: number) {
    if (!cta) return;
    const inputVal = (newOptionInputs[fieldIndex] || "").trim();
    if (!inputVal) return;
    const newOpts = inputVal
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const currentOptions = cta.fields[fieldIndex]?.options || [];
    const merged = Array.from(new Set([...currentOptions, ...newOpts]));
    updateField(fieldIndex, { options: merged });
    setNewOptionInputs((prev) => ({ ...prev, [fieldIndex]: "" }));
  }

  function removeOption(fieldIndex: number, optionIndex: number) {
    if (!cta) return;
    const currentOptions = cta.fields[fieldIndex]?.options || [];
    updateField(fieldIndex, {
      options: currentOptions.filter((_, i) => i !== optionIndex),
    });
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[360px] gap-3 bg-white p-12 rounded-2xl border border-[#f3e9db]">
        <Loader2 className="w-8 h-8 animate-spin text-[#9A1C1F]" />
        <p className="text-xs font-semibold text-stone-600">
          Đang tải cấu hình biểu mẫu hệ thống...
        </p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="space-y-6">
      {/* 1. Tiêu đề trang & Thanh tác vụ chính */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#FAF1EC] text-[#9A1C1F] flex items-center justify-center border border-[#F2C2BB]/40">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#1E1917]">
                Hệ thống: Quản lý Biểu mẫu (Forms)
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0F9D58]/10 text-[#0F9D58] uppercase tracking-wider">
                Google Sheets API
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Tùy biến các trường nhập liệu biểu mẫu và tích hợp đồng bộ tự động dữ liệu khách hàng vào Google Sheets
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/contact"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 transition-colors shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span>Xem trang Contact</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </Link>

          <button
            type="button"
            onClick={handleSaveConfig}
            disabled={saving || !cta}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9A1C1F] hover:bg-[#851619] text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{saving ? "Đang lưu..." : "Lưu thay đổi"}</span>
          </button>
        </div>
      </div>

      {/* Thông báo kết quả Lưu chung */}
      {saveSuccess && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}
      {saveError && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* 2. Thẻ chọn danh sách các biểu mẫu trong hệ thống */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Form 1: Contact Form (Active) */}
        <div
          onClick={() => setSelectedFormId("contact")}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            selectedFormId === "contact"
              ? "bg-[#FAF8F5] border-[#9A1C1F] ring-1 ring-[#9A1C1F] shadow-xs"
              : "bg-white border-[#f3e9db] hover:border-stone-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              Đang hoạt động
            </span>
            <span className="text-[11px] font-semibold text-stone-500">
              {cta?.fields.length || 0} trường
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#1E1917]">
            Biểu mẫu Yêu cầu tư vấn kiến trúc
          </h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2">
            Áp dụng trực tiếp trên trang Liên hệ (/contact), tiếp nhận nhu cầu và đồng bộ tức thời vào Google Sheet.
          </p>
          <div className="mt-3 pt-2.5 border-t border-[#EAE2D5] flex items-center justify-between text-[11px]">
            <span className="text-stone-500">Vị trí: <code>/contact</code></span>
            <span className="font-bold text-[#9A1C1F]">Đang chọn &rarr;</span>
          </div>
        </div>

        {/* Form 2: Profile Form (Coming Soon) */}
        <div
          onClick={() => setSelectedFormId("profile")}
          className={`p-4 rounded-xl border transition-all cursor-pointer opacity-75 hover:opacity-100 ${
            selectedFormId === "profile"
              ? "bg-[#FAF8F5] border-[#9A1C1F] ring-1 ring-[#9A1C1F] shadow-xs"
              : "bg-white border-[#f3e9db] hover:border-stone-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Sắp ra mắt
            </span>
            <span className="text-[11px] font-semibold text-stone-500">
              3 trường
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#1E1917]">
            Biểu mẫu Tải Hồ sơ năng lực (Profile PDF)
          </h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2">
            Yêu cầu cung cấp họ tên, email doanh nghiệp trước khi tải Catalogue / Profile kiến trúc.
          </p>
          <div className="mt-3 pt-2.5 border-t border-[#EAE2D5] flex items-center justify-between text-[11px]">
            <span className="text-stone-500">Vị trí: <code>Popup / Modal</code></span>
            <span className="text-stone-400">Xem trước</span>
          </div>
        </div>

        {/* Form 3: Newsletter Form (Coming Soon) */}
        <div
          onClick={() => setSelectedFormId("newsletter")}
          className={`p-4 rounded-xl border transition-all cursor-pointer opacity-75 hover:opacity-100 ${
            selectedFormId === "newsletter"
              ? "bg-[#FAF8F5] border-[#9A1C1F] ring-1 ring-[#9A1C1F] shadow-xs"
              : "bg-white border-[#f3e9db] hover:border-stone-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Sắp ra mắt
            </span>
            <span className="text-[11px] font-semibold text-stone-500">
              1 trường
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#1E1917]">
            Biểu mẫu Đăng ký nhận bản tin di sản
          </h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2">
            Thu thập email khách hàng quan tâm đến các sự kiện, triển lãm và ấn phẩm sơn mài định kỳ.
          </p>
          <div className="mt-3 pt-2.5 border-t border-[#EAE2D5] flex items-center justify-between text-[11px]">
            <span className="text-stone-500">Vị trí: <code>Chân trang (Footer)</code></span>
            <span className="text-stone-400">Xem trước</span>
          </div>
        </div>
      </div>

      {/* 3. Khu vực cấu hình chi tiết cho Form đang được chọn */}
      {selectedFormId !== "contact" ? (
        <div className="p-8 rounded-2xl bg-white border border-[#f3e9db] text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 mx-auto flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1E1917]">
            Biểu mẫu đang trong quá trình chuẩn bị triển khai
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Hệ thống hiện đang ưu tiên cấu hình chính cho <strong>Biểu mẫu Liên hệ kiến trúc (Contact)</strong>. Bấm bên dưới để quay lại cấu hình.
          </p>
          <button
            type="button"
            onClick={() => setSelectedFormId("contact")}
            className="px-4 py-2 rounded-xl bg-[#9A1C1F] text-white text-xs font-bold hover:bg-[#851619] transition-colors"
          >
            Quay lại Biểu mẫu Liên hệ
          </button>
        </div>
      ) : cta ? (
        <div className="space-y-5">
          {/* Tabs chuyển đổi các khía cạnh cấu hình của Form */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#f7f5f1] rounded-xl border border-[#f3e9db] max-w-fit">
            <button
              type="button"
              onClick={() => setActiveTab("sheet")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "sheet"
                  ? "bg-white text-[#0F9D58] shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>1. Tích hợp Google Sheets</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("builder")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "builder"
                  ? "bg-white text-[#9A1C1F] shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>2. Thiết kế Biểu mẫu ({cta.fields.length} trường)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "settings"
                  ? "bg-white text-[#9A1C1F] shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>3. Thông điệp & Nút bấm</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-white text-[#1E1917] shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>4. Xem trước trực tiếp (Preview)</span>
            </button>
          </div>

          {/* TAB 1: TÍCH HỢP GOOGLE SHEETS */}
          {activeTab === "sheet" && (
            <div className="p-6 rounded-2xl border border-[#D5C2AA]/60 bg-gradient-to-br from-[#FAF8F5] via-white to-[#FDF6F0] space-y-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE2D5] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/10 text-[#0F9D58] flex items-center justify-center font-bold">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1E1917] flex items-center gap-2">
                      Đồng bộ Google Sheets tự động
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0F9D58]/10 text-[#0F9D58]">
                        Google API
                      </span>
                    </h3>
                    <p className="text-xs text-stone-500">
                      Tự động ghi lại thông tin khách hàng gửi biểu mẫu vào bảng tính Google Sheets của bạn.
                    </p>
                  </div>
                </div>
              </div>

              {/* Hướng dẫn cấp quyền cho Email Bot */}
              <div className="p-4 rounded-xl bg-white border border-[#EAE2D5] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    1. EMAIL BOT GOOGLE SERVICE ACCOUNT:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyBotEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FAF1EC] hover:bg-[#F2C2BB]/40 text-[#9A1C1F] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Đã copy email!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy email bot</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF8F5] font-mono text-xs text-stone-800 break-all select-all border border-[#EAE2D5]/70">
                  {botEmail}
                </div>

                <div className="text-xs text-stone-600 leading-relaxed space-y-1">
                  <p>
                    👉 <strong>Cách cấp quyền:</strong> Mở bảng tính Google Sheet của bạn &rarr; Bấm <strong>Chia sẻ (Share)</strong> ở góc trên bên phải &rarr; Dán email bot ở trên vào &rarr; Chọn vai trò <strong>Người chỉnh sửa (Editor)</strong> &rarr; Nhấn <strong>Gửi/Chia sẻ</strong>.
                  </p>
                </div>
              </div>

              {/* Nhập URL hoặc Sheet ID */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1E1917] flex items-center justify-between">
                  <span>2. Google Sheet ID hoặc Đường dẫn (URL) bảng tính</span>
                  {cta.googleSheetId && (
                    <a
                      href={
                        cta.googleSheetId.startsWith("http")
                          ? cta.googleSheetId
                          : `https://docs.google.com/spreadsheets/d/${cta.googleSheetId}/edit`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                    >
                      <span>Mở sheet</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </label>
                <input
                  type="text"
                  value={cta.googleSheetId || ""}
                  onChange={(e) => setCta({ ...cta, googleSheetId: e.target.value })}
                  placeholder="Dán link hoặc ID Google Sheet (Ví dụ: https://docs.google.com/spreadsheets/d/1BxiMVs.../edit)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] bg-white text-xs font-mono text-[#1E1917] focus:border-[#0F9D58] focus:ring-1 focus:ring-[#0F9D58] focus:outline-none"
                />
                <p className="text-[11px] text-stone-500">
                  Hệ thống hỗ trợ cả định dạng đường link đầy đủ hoặc ID ngắn của Google Spreadsheet.
                </p>
              </div>

              {/* Nút hành động kiểm tra & đồng bộ header */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={sheetActionLoading !== null}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  {sheetActionLoading === "test" ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-stone-500" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-stone-600" />
                  )}
                  <span>Kiểm tra kết nối</span>
                </button>

                <button
                  type="button"
                  onClick={handleSyncHeaders}
                  disabled={sheetActionLoading !== null}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F9D58] hover:bg-[#0c7c45] text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {sheetActionLoading === "sync" ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <RefreshCw className="w-4 h-4 text-white" />
                  )}
                  <span>Đồng bộ Header cột lên Sheet</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveConfig}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#9A1C1F] hover:bg-[#851619] text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu ID Google Sheet</span>
                </button>
              </div>

              {/* Thông báo kết quả phản hồi */}
              {sheetFeedback && (
                <div
                  className={`flex items-start gap-2.5 p-3.5 rounded-xl text-xs font-medium ${
                    sheetFeedback.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {sheetFeedback.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 leading-relaxed">{sheetFeedback.message}</div>
                  <button
                    type="button"
                    onClick={() => setSheetFeedback(null)}
                    className="text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: THIẾT KẾ BIỂU MẪU (FORM BUILDER) */}
          {activeTab === "builder" && (
            <div className="space-y-5 bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f3e9db] pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#1E1917] flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#9A1C1F]" />
                    Trình dựng biểu mẫu (Form Builder)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Sắp xếp, thêm bớt và cấu hình các trường nhập liệu trên form
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addCustomField}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#9A1C1F] text-white hover:bg-[#851619] text-xs font-bold uppercase transition-all shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm trường tùy chỉnh</span>
                </button>
              </div>

              {/* Các mẫu trường nhanh */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1E1917] flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#9A1C1F]" />
                  Thêm nhanh trường mẫu phổ biến:
                </span>
                <div className="flex flex-wrap gap-2">
                  {FIELD_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => addPresetField(preset)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EAE2D5] bg-[#FAF8F5] hover:bg-[#FAF1EC] hover:border-[#F2C2BB] text-xs font-semibold text-[#1E1917] transition-all cursor-pointer"
                    >
                      <Plus className="w-3 h-3 text-[#9A1C1F]" />
                      <span>{preset.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Danh sách các trường đang có */}
              <div className="space-y-3 pt-2">
                {cta.fields.length === 0 ? (
                  <div className="p-8 text-center border-2 border-dashed border-[#EAE2D5] rounded-2xl bg-[#FAF8F5] text-stone-500 space-y-2">
                    <p className="text-xs font-semibold">Chưa có trường nào trên biểu mẫu.</p>
                    <p className="text-[11px] text-stone-400">
                      Hãy bấm vào một trong các mẫu phổ biến bên trên để bắt đầu thêm trường.
                    </p>
                  </div>
                ) : (
                  cta.fields.map((field, index) => {
                    const isSelectOrRadio =
                      field.type === "select" || field.type === "radio";

                    return (
                      <div
                        key={index}
                        className="p-4 rounded-2xl border border-[#EAE2D5] bg-[#FAF8F5] space-y-3 hover:border-[#D5C2AA] transition-colors"
                      >
                        {/* Hàng điều khiển trên cùng */}
                        <div className="flex items-center justify-between gap-2 border-b border-[#EAE2D5]/70 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#9A1C1F] text-white flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <span className="text-xs font-bold text-[#1E1917]">
                              {field.label || `Trường #${index + 1}`}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase bg-white border border-[#EAE2D5] text-stone-600">
                              {field.type}
                            </span>
                            {field.required && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-50 border border-red-200 text-red-700">
                                Bắt buộc
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => moveField(index, index - 1)}
                              disabled={index === 0}
                              title="Di chuyển lên"
                              className="p-1.5 rounded-lg border border-[#EAE2D5] bg-white hover:bg-stone-50 text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveField(index, index + 1)}
                              disabled={index === cta.fields.length - 1}
                              title="Di chuyển xuống"
                              className="p-1.5 rounded-lg border border-[#EAE2D5] bg-white hover:bg-stone-50 text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeField(index)}
                              title="Xóa trường này"
                              className="p-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Các ô nhập liệu thông số trường */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-stone-700">
                              Mã định danh (name)
                            </label>
                            <input
                              type="text"
                              value={field.name}
                              onChange={(e) =>
                                updateField(index, { name: e.target.value })
                              }
                              placeholder="fullname, phone..."
                              className="w-full px-3 py-2 rounded-xl border border-[#EAE2D5] bg-white text-xs font-mono text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-stone-700">
                              Tiêu đề hiển thị (label)
                            </label>
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) =>
                                updateField(index, { label: e.target.value })
                              }
                              placeholder="Họ và tên..."
                              className="w-full px-3 py-2 rounded-xl border border-[#EAE2D5] bg-white text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-stone-700">
                              Kiểu nhập liệu (type)
                            </label>
                            <select
                              value={field.type}
                              onChange={(e) =>
                                updateField(index, {
                                  type: e.target.value as Field["type"],
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-[#EAE2D5] bg-white text-xs font-semibold text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none cursor-pointer"
                            >
                              <option value="text">Văn bản ngắn (Text)</option>
                              <option value="tel">Số điện thoại (Tel)</option>
                              <option value="email">Hộp thư (Email)</option>
                              <option value="textarea">Văn bản dài (Textarea)</option>
                              <option value="select">Menu chọn (Select Dropdown)</option>
                              <option value="number">Số lượng (Number)</option>
                              <option value="date">Ngày tháng (Date)</option>
                              <option value="radio">Nút chọn một (Radio)</option>
                              <option value="checkbox">Hộp đánh dấu (Checkbox)</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-stone-700">
                              Độ rộng (Width)
                            </label>
                            <select
                              value={field.width || "half"}
                              onChange={(e) =>
                                updateField(index, {
                                  width: e.target.value as "half" | "full",
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl border border-[#EAE2D5] bg-white text-xs font-semibold text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none cursor-pointer"
                            >
                              <option value="half">50% — Nửa dòng (Half)</option>
                              <option value="full">100% — Toàn dòng (Full)</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={field.placeholder || ""}
                              onChange={(e) =>
                                updateField(index, { placeholder: e.target.value })
                              }
                              placeholder="Gợi ý người dùng nhập (placeholder)..."
                              className="w-full px-3 py-1.5 rounded-xl border border-[#EAE2D5] bg-white text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                            />
                          </div>

                          <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E1917] cursor-pointer shrink-0">
                            <input
                              type="checkbox"
                              checked={Boolean(field.required)}
                              onChange={(e) =>
                                updateField(index, { required: e.target.checked })
                              }
                              className="w-4 h-4 rounded text-[#9A1C1F] focus:ring-[#9A1C1F] border-[#EAE2D5] cursor-pointer"
                            />
                            <span>Bắt buộc điền</span>
                          </label>
                        </div>

                        {/* Options nếu là select hoặc radio */}
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
            </div>
          )}

          {/* TAB 3: THÔNG ĐIỆP & NÚT BẤM (SETTINGS) */}
          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-2xl border border-[#f3e9db] space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-[#1E1917] flex items-center gap-2 border-b border-[#f3e9db] pb-3">
                <Settings className="w-5 h-5 text-[#9A1C1F]" />
                Cấu hình Nhãn & Thông báo bảo mật
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1E1917]">
                    Dòng tiêu đề phụ (Eyebrow)
                  </label>
                  <input
                    type="text"
                    value={cta.eyebrow}
                    onChange={(e) => setCta({ ...cta, eyebrow: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1E1917]">
                    Nhãn nút gửi biểu mẫu (Submit Button)
                  </label>
                  <input
                    type="text"
                    value={cta.submitLabel}
                    onChange={(e) => setCta({ ...cta, submitLabel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1E1917]">
                    Icon nút gửi (IonIcon name)
                  </label>
                  <input
                    type="text"
                    value={cta.icon}
                    onChange={(e) => setCta({ ...cta, icon: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1E1917]">
                    Icon bảo mật (IonIcon name)
                  </label>
                  <input
                    type="text"
                    value={cta.iconPrivacy}
                    onChange={(e) => setCta({ ...cta, iconPrivacy: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-[#1E1917]">
                    Thông báo bảo mật thông tin
                  </label>
                  <input
                    type="text"
                    value={cta.privacyNote}
                    onChange={(e) => setCta({ ...cta, privacyNote: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: XEM TRƯỚC TRỰC TIẾP (LIVE PREVIEW) */}
          {activeTab === "preview" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                  Mô phỏng giao diện hiển thị thực tế trên website:
                </span>
                <span className="text-[11px] text-stone-500">
                  Tổng cộng: {cta.fields.length} trường
                </span>
              </div>

              <div className="p-6 md:p-8 rounded-3xl bg-[#FAF8F5] border border-[#EAE2D5] shadow-sm max-w-3xl mx-auto space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#9A1C1F] uppercase">
                    {cta.eyebrow}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1E1917] mt-1">
                    Gửi yêu cầu tư vấn nghệ thuật & dự án
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cta.fields.map((f, idx) => (
                    <div
                      key={idx}
                      className={f.width === "full" ? "md:col-span-2" : "md:col-span-1"}
                    >
                      <label className="block text-xs font-bold text-[#1E1917] mb-1">
                        {f.label} {f.required && <span className="text-red-600">*</span>}
                      </label>

                      {f.type === "textarea" ? (
                        <textarea
                          rows={3}
                          disabled
                          placeholder={f.placeholder || "Nội dung..."}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] bg-white text-xs text-stone-500"
                        />
                      ) : f.type === "select" ? (
                        <select
                          disabled
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] bg-white text-xs text-stone-500"
                        >
                          <option>{f.placeholder || "-- Lựa chọn --"}</option>
                          {f.options?.map((opt, oIdx) => (
                            <option key={oIdx}>{opt}</option>
                          ))}
                        </select>
                      ) : f.type === "radio" ? (
                        <div className="flex flex-wrap gap-3 py-1">
                          {f.options?.map((opt, oIdx) => (
                            <label key={oIdx} className="inline-flex items-center gap-1.5 text-xs text-stone-600">
                              <input type="radio" disabled name={f.name} />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : f.type === "checkbox" ? (
                        <label className="inline-flex items-center gap-2 text-xs text-stone-700 py-2">
                          <input type="checkbox" disabled />
                          <span>{f.placeholder || f.label}</span>
                        </label>
                      ) : (
                        <input
                          type={f.type}
                          disabled
                          placeholder={f.placeholder || ""}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] bg-white text-xs text-stone-500"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#EAE2D5]">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <ShieldCheck className="w-4 h-4 text-[#9A1C1F]" />
                    <span>{cta.privacyNote}</span>
                  </div>

                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#9A1C1F] text-white text-xs font-bold uppercase tracking-wider shadow-md opacity-90"
                  >
                    <span>{cta.submitLabel}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
