"use client";

import { AdminPageLoading } from "../admin-page-loading";
import { useEffect, useState } from "react";
import {
  Info,
  Save,
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Layers,
  Building2,
  Handshake,
  Megaphone,
  Plus,
  Trash2,
  Crown,
  Quote,
  UploadCloud,
  Loader2,
} from "lucide-react";
import type { AboutPagePropsType } from "@/shared/schema/pages/about-product.schema";
import { ColorHighlightInput } from "./color-highlight-input";
import { AboutImageUploader } from "./about-image-uploader";
import { ImageUrlUploadField } from "./image-url-upload-field";

type ActiveTab = "hero" | "technology" | "values" | "organization" | "partners" | "cta";

export function AdminAboutView() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("hero");

  // Form State
  const [pageName, setPageName] = useState("");
  const [pageProps, setPageProps] = useState<AboutPagePropsType>({} as AboutPagePropsType);
  const [hasPageData, setHasPageData] = useState(false);

  // Toast / Alert Notification
  const [uploadingPartnerIdx, setUploadingPartnerIdx] = useState<number | null>(null);

  const handleUploadPartnerLogo = async (index: number, file: File) => {
    if (!file) return;
    try {
      setUploadingPartnerIdx(index);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "La_Viet_Partners");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json().catch(() => null);

      if (res.ok && json?.success && json?.data?.url) {
        const updated = [...pageProps.partnersSection.items];
        updated[index] = { ...updated[index], logo: json.data.url };
        setPageProps({
          ...pageProps,
          partnersSection: { ...pageProps.partnersSection, items: updated },
        });
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          if (base64) {
            const updated = [...pageProps.partnersSection.items];
            updated[index] = { ...updated[index], logo: base64 };
            setPageProps({
              ...pageProps,
              partnersSection: { ...pageProps.partnersSection, items: updated },
            });
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error("Failed to upload partner logo:", err);
    } finally {
      setUploadingPartnerIdx(null);
    }
  };

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch initial data from API
  const fetchPageData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pages/about");
      const json = await res.json();

      if (res.ok && json.success && json.data?.page?.props) {
        const { page } = json.data;
        const props = page.props as AboutPagePropsType;
        if (
          !props.herosection || !Array.isArray(props.herosection.metrics) ||
          !props.technologySection?.workshop || !Array.isArray(props.technologySection.stats) ||
          !props.valuesSection || !Array.isArray(props.valuesSection.items) ||
          !props.organizationSection || !Array.isArray(props.organizationSection.leaders) ||
          !Array.isArray(props.organizationSection.divisions) ||
          !props.partnersSection?.testimonial || !Array.isArray(props.partnersSection.items) ||
          !props.ctaSection?.primaryButton || !props.ctaSection.secondaryButton
        ) {
          throw new Error("Dữ liệu trang Về chúng tôi chưa đầy đủ.");
        }
        setPageName(page.name ?? "");
        setPageProps(props);
        setHasPageData(true);
      } else {
        setHasPageData(false);
        setAlert({ type: "error", message: "Chưa có dữ liệu trang Về chúng tôi." });
      }
    } catch (err) {
      console.error("Failed to load about page configuration:", err);
      setAlert({
        type: "error",
        message: "Không thể tải cấu hình trang từ máy chủ. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  // Save changes to API
  const handleSave = async () => {
    if (!hasPageData) return;
    setSaving(true);
    setAlert(null);
    try {
      const payload = {
        name: pageName,
        slug: "about",
        props: pageProps,
      };

      const res = await fetch("/api/pages/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setAlert({
          type: "success",
          message: "Đã lưu thành công toàn bộ nội dung trang Về Chúng Tôi vào cơ sở dữ liệu!",
        });
      } else {
        const errMsg = json.message || "Lỗi cập nhật cấu hình trang.";
        setAlert({
          type: "error",
          message: `Lưu thất bại: ${errMsg}`,
        });
      }
    } catch (err) {
      console.error("Failed to save about page configuration:", err);
      setAlert({
        type: "error",
        message: "Lỗi kết nối máy chủ khi lưu cấu hình.",
      });
    } finally {
      setSaving(false);
    }
  };


  // 2. Tech Stats: Add & Remove
  const handleAddTechStat = () => {
    setPageProps((prev) => ({
      ...prev,
      technologySection: {
        ...prev.technologySection,
        stats: [
          ...prev.technologySection.stats,
          {
            id: `stat-${Date.now()}`,
            label: "",
            value: "",
            unit: "",
            description: "",
            accentColor: "text-[#9A1C1F]",
          },
        ],
      },
    }));
  };

  const handleRemoveTechStat = (index: number) => {
    setPageProps((prev) => ({
      ...prev,
      technologySection: {
        ...prev.technologySection,
        stats: prev.technologySection.stats.filter((_, i) => i !== index),
      },
    }));
  };

  // 3. Value Items & Pillars: Add & Remove
  const handleAddValueItem = () => {
    setPageProps((prev) => ({
      ...prev,
      valuesSection: {
        ...prev.valuesSection,
        items: [
          ...prev.valuesSection.items,
          {
            id: `val-${Date.now()}`,
            category: "",
            title: "",
            description: "",
            tag: "",
            gradient: "from-[#9A1C1F] via-[#9A1C1F]/80 to-transparent",
            accentColor: "text-[#9A1C1F]",
            pillars: [],
          },
        ],
      },
    }));
  };

  const handleRemoveValueItem = (index: number) => {
    setPageProps((prev) => ({
      ...prev,
      valuesSection: {
        ...prev.valuesSection,
        items: prev.valuesSection.items.filter((_, i) => i !== index),
      },
    }));
  };

  const handleAddPillar = (valIndex: number) => {
    setPageProps((prev) => {
      const updated = [...prev.valuesSection.items];
      const pillars = [...(updated[valIndex].pillars || []), ""];
      updated[valIndex] = { ...updated[valIndex], pillars };
      return {
        ...prev,
        valuesSection: { ...prev.valuesSection, items: updated },
      };
    });
  };

  const handleRemovePillar = (valIndex: number, pillarIndex: number) => {
    setPageProps((prev) => {
      const updated = [...prev.valuesSection.items];
      const pillars = (updated[valIndex].pillars || []).filter((_, i) => i !== pillarIndex);
      updated[valIndex] = { ...updated[valIndex], pillars };
      return {
        ...prev,
        valuesSection: { ...prev.valuesSection, items: updated },
      };
    });
  };

  // 4. Leaders: Add & Remove
  const handleAddLeader = () => {
    setPageProps((prev) => ({
      ...prev,
      organizationSection: {
        ...prev.organizationSection,
        leaders: [
          ...prev.organizationSection.leaders,
          {
            id: `leader-${Date.now()}`,
            name: "",
            role: "",
            tag: "",
            bio: "",
            avatar: "",
            department: "",
            accentColor: "border-[#9A1C1F] text-[#9A1C1F]",
          },
        ],
      },
    }));
  };

  const handleRemoveLeader = (index: number) => {
    setPageProps((prev) => ({
      ...prev,
      organizationSection: {
        ...prev.organizationSection,
        leaders: prev.organizationSection.leaders.filter((_, i) => i !== index),
      },
    }));
  };

  // 4b. Divisions: Add & Remove
  const handleAddDivision = () => {
    setPageProps((prev) => {
      const count = prev.organizationSection.divisions.length + 1;
      const code = count < 10 ? `KHỐI 0${count}` : `KHỐI ${count}`;
      return {
        ...prev,
        organizationSection: {
          ...prev.organizationSection,
          divisions: [
            ...prev.organizationSection.divisions,
            {
              code,
              title: "",
              subtitle: "",
              description: "",
              focus: "",
              accentBorder: "border-t-[#9A1C1F]",
            },
          ],
        },
      };
    });
  };

  const handleRemoveDivision = (index: number) => {
    setPageProps((prev) => ({
      ...prev,
      organizationSection: {
        ...prev.organizationSection,
        divisions: prev.organizationSection.divisions.filter((_, i) => i !== index),
      },
    }));
  };

  // 5. Partners: Add & Remove
  const handleAddPartner = () => {
    setPageProps((prev) => ({
      ...prev,
      partnersSection: {
        ...prev.partnersSection,
        items: [
          ...prev.partnersSection.items,
          {
            name: "",
            role: "",
            category: "technology",
            logo: "",
          },
        ],
      },
    }));
  };

  const handleRemovePartner = (index: number) => {
    setPageProps((prev) => ({
      ...prev,
      partnersSection: {
        ...prev.partnersSection,
        items: prev.partnersSection.items.filter((_, i) => i !== index),
      },
    }));
  };

  if (loading) {
    return <AdminPageLoading label="Đang tải trang Về chúng tôi..." />;
  }

  if (!hasPageData) {
    return (
      <p role="alert" className="rounded-2xl border border-[#d9c7ae] bg-white p-12 text-center text-sm text-[#695D56]">
        Chưa có dữ liệu trang Về chúng tôi hoặc không thể tải dữ liệu.
      </p>
    );
  }

  return (
    <div className="admin-content-editor space-y-6">
      {/* Alert Banner */}
      {alert && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs font-medium transition-all ${
            alert.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {alert.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{alert.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setAlert(null)}
            className="text-stone-400 hover:text-stone-700 font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#e2d3bf] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#f7f5f1] text-[#a21f1f] border border-[#e2d3bf] flex items-center justify-center">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#1E1917]">Nội dung trang Về chúng tôi</h1>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Chỉnh sửa nội dung thông điệp, công nghệ vật liệu, 4 trụ cột triết lý, ban lãnh đạo và đối tác chiến lược
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] disabled:bg-stone-300 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Đang lưu..." : "Lưu thay đổi"}</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-[#e2d3bf] bg-white rounded-2xl px-4 pt-2 overflow-x-auto gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "hero"
              ? "border-[#a21f1f] text-[#a21f1f] bg-[#f7f5f1]/60"
              : "border-transparent text-stone-600 hover:text-stone-900"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Giới thiệu</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("technology")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "technology"
              ? "border-[#a21f1f] text-[#a21f1f] bg-[#f7f5f1]/60"
              : "border-transparent text-stone-600 hover:text-stone-900"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Khái Lược & Công Nghệ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("values")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "values"
              ? "border-[#a21f1f] text-[#a21f1f] bg-[#f7f5f1]/60"
              : "border-transparent text-stone-600 hover:text-stone-900"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Tầm Nhìn & Trụ Cột</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("organization")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "organization"
              ? "border-[#a21f1f] text-[#a21f1f] bg-[#f7f5f1]/60"
              : "border-transparent text-stone-600 hover:text-stone-900"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Sơ Đồ Tổ Chức</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("partners")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "partners"
              ? "border-[#a21f1f] text-[#a21f1f] bg-[#f7f5f1]/60"
              : "border-transparent text-stone-600 hover:text-stone-900"
          }`}
        >
          <Handshake className="w-4 h-4" />
          <span>Đối Tác & Đánh Giá</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cta")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "cta"
              ? "border-[#a21f1f] text-[#a21f1f] bg-[#f7f5f1]/60"
              : "border-transparent text-stone-600 hover:text-stone-900"
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>CTA</span>
        </button>
      </div>

      {/* Tab 1: Hero Section */}
      {activeTab === "hero" && (
        <div className="bg-white p-6 rounded-2xl border border-[#e2d3bf] shadow-xs space-y-6">
          <div className="pb-3 border-b border-[#e2d3bf]">
            <h2 className="text-base font-bold text-[#1E1917]">Khối Giới Thiệu Đầu Trang (Hero Banner)</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Chỉnh sửa thông điệp tôn vinh di sản, huy hiệu và ấn triện Là Việt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E1917] uppercase tracking-wider">
                Huy hiệu (Badge)
              </label>
              <input
                type="text"
                value={pageProps.herosection.badge}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    herosection: { ...pageProps.herosection, badge: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7f5f1]/40 border border-[#e2d3bf] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E1917] uppercase tracking-wider">
                Nhãn Ấn Triện (Seal Subtitle)
              </label>
              <input
                type="text"
                value={pageProps.herosection.imageSubtitle || ""}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    herosection: { ...pageProps.herosection, imageSubtitle: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7f5f1]/40 border border-[#e2d3bf] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              />
            </div>

            <div className="md:col-span-2">
              <ColorHighlightInput
                label="Tiêu đề chính lớn (Heading) *"
                placeholder="Nhập tiêu đề... (bôi đen đoạn chữ để chọn màu sắc)"
                value={pageProps.herosection.heading}
                onChange={(newHeading) =>
                  setPageProps({
                    ...pageProps,
                    herosection: { ...pageProps.herosection, heading: newHeading },
                  })
                }
                className="font-bold uppercase tracking-tight"
              />
            </div>

            <div className="md:col-span-2">
              <ColorHighlightInput
                label="Đoạn văn giới thiệu sứ mệnh *"
                placeholder="Nhập đoạn văn sứ mệnh... (bôi đen đoạn chữ để chọn màu sắc)"
                multiline
                rows={4}
                value={pageProps.herosection.description}
                onChange={(newDesc) =>
                  setPageProps({
                    ...pageProps,
                    herosection: { ...pageProps.herosection, description: newDesc },
                  })
                }
                className="font-medium"
              />
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Technology Section */}
      {activeTab === "technology" && (
        <div className="bg-white p-6 rounded-2xl border border-[#e2d3bf] shadow-xs space-y-6">
          <div className="pb-3 border-b border-[#e2d3bf]">
            <h2 className="text-base font-bold text-[#1E1917]">Khái Lược Hội Họa Liên Ngành & Công Nghệ</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Chất liệu nhựa mủ sơn ta Phú Thọ và liên minh kỹ thuật Sơn Hoa Việt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E1917] uppercase tracking-wider">
                Huy hiệu (Badge)
              </label>
              <input
                type="text"
                value={pageProps.technologySection.badge}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    technologySection: { ...pageProps.technologySection, badge: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7f5f1]/40 border border-[#e2d3bf] text-xs font-normal text-[#1E1917]"
              />
            </div>

            <div>
              <ColorHighlightInput
                label="Tiêu đề (Heading)"
                placeholder="Nhập tiêu đề... (bôi đen đoạn chữ để chọn màu sắc)"
                value={pageProps.technologySection.heading}
                onChange={(newHeading) =>
                  setPageProps({
                    ...pageProps,
                    technologySection: { ...pageProps.technologySection, heading: newHeading },
                  })
                }
                className="font-bold"
              />
            </div>

            <div className="md:col-span-2">
              <ColorHighlightInput
                label="Đoạn văn giới thiệu công nghệ & chất liệu *"
                placeholder="Nhập nội dung đoạn văn... (bôi đen đoạn chữ để chọn màu sắc)"
                multiline
                rows={5}
                value={
                  pageProps.technologySection.description ||
                  [
                    pageProps.technologySection.description1,
                    pageProps.technologySection.description2,
                  ]
                    .filter(Boolean)
                    .join("\n\n")
                }
                onChange={(newDesc) =>
                  setPageProps({
                    ...pageProps,
                    technologySection: {
                      ...pageProps.technologySection,
                      description: newDesc,
                      description1: newDesc,
                      description2: "",
                    },
                  })
                }
                className="font-medium"
              />
            </div>
          </div>

          {/* Stats with Add/Remove */}
          <div className="pt-4 border-t border-[#e2d3bf] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1E1917]">Danh sách Số liệu năng lực thực tế</h3>
                <p className="text-xs text-stone-500 mt-0.5">Cho phép thêm chỉ số mới hoặc xóa chỉ số</p>
              </div>

              <button
                type="button"
                onClick={handleAddTechStat}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f7f5f1] hover:bg-[#f3e9db] text-[#a21f1f] text-xs font-bold border border-[#e2d3bf] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm chỉ số năng lực</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pageProps.technologySection.stats.map((stat, idx) => (
                <div key={stat.id || idx} className="p-4 rounded-xl bg-[#f7f5f1]/50 border border-[#e2d3bf] space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">
                      Chỉ số #{idx + 1}
                    </span>
                    {pageProps.technologySection.stats.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTechStat(idx)}
                        className="text-stone-400 hover:text-red-700 p-1 cursor-pointer transition-colors"
                        title="Xóa chỉ số này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const updated = [...pageProps.technologySection.stats];
                        updated[idx].value = e.target.value;
                        setPageProps({
                          ...pageProps,
                          technologySection: { ...pageProps.technologySection, stats: updated },
                        });
                      }}
                      placeholder="Giá trị"
                      className="w-2/3 px-2.5 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs font-normal text-[#a21f1f]"
                    />
                    <input
                      type="text"
                      value={stat.unit || ""}
                      onChange={(e) => {
                        const updated = [...pageProps.technologySection.stats];
                        updated[idx].unit = e.target.value;
                        setPageProps({
                          ...pageProps,
                          technologySection: { ...pageProps.technologySection, stats: updated },
                        });
                      }}
                      placeholder="Đơn vị"
                      className="w-1/3 px-2.5 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs font-normal text-stone-600"
                    />
                  </div>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...pageProps.technologySection.stats];
                      updated[idx].label = e.target.value;
                      setPageProps({
                        ...pageProps,
                        technologySection: { ...pageProps.technologySection, stats: updated },
                      });
                    }}
                    placeholder="Tiêu đề chỉ số"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs font-normal text-stone-800"
                  />
                  <textarea
                    rows={2}
                    value={stat.description}
                    onChange={(e) => {
                      const updated = [...pageProps.technologySection.stats];
                      updated[idx].description = e.target.value;
                      setPageProps({
                        ...pageProps,
                        technologySection: { ...pageProps.technologySection, stats: updated },
                      });
                    }}
                    placeholder="Mô tả chi tiết"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-[11px] text-stone-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Workshop Block with Upload & Badge Input */}
          <div className="pt-4 border-t border-[#e2d3bf] space-y-4">
            <h3 className="text-sm font-bold text-[#1E1917]">Khối Hình ảnh Xưởng Chế Tác</h3>

            {/* Image Uploader */}
            <AboutImageUploader
              label="Hình ảnh xưởng chế tác"
              description="Tải ảnh từ máy tính (PNG, JPG, WEBP) hoặc dán link ảnh trực tiếp"
              value={pageProps.technologySection.workshop.image}
              onChange={(newUrl) =>
                setPageProps({
                  ...pageProps,
                  technologySection: {
                    ...pageProps.technologySection,
                    workshop: { ...pageProps.technologySection.workshop, image: newUrl },
                  },
                })
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1E1917] uppercase tracking-wider">
                  Xưởng chế tác hội họa (Huy hiệu / Badge) *
                </label>
                <input
                  type="text"
                  value={pageProps.technologySection.workshop.badge || "XƯỞNG CHẾ TÁC HỘI HỌA"}
                  onChange={(e) =>
                    setPageProps({
                      ...pageProps,
                      technologySection: {
                        ...pageProps.technologySection,
                        workshop: { ...pageProps.technologySection.workshop, badge: e.target.value },
                      },
                    })
                  }
                  placeholder="VD: XƯỞNG CHẾ TÁC HỘI HỌA"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e2d3bf] text-xs font-normal text-[#1E1917]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1E1917] uppercase tracking-wider">
                  Mô tả kỹ thuật ủ ẩm / mài nước (Caption)
                </label>
                <input
                  type="text"
                  value={pageProps.technologySection.workshop.caption}
                  onChange={(e) =>
                    setPageProps({
                      ...pageProps,
                      technologySection: {
                        ...pageProps.technologySection,
                        workshop: { ...pageProps.technologySection.workshop, caption: e.target.value },
                      },
                    })
                  }
                  placeholder="VD: Bảo tồn kỹ thuật ủ ẩm mùn cưa và mài nước truyền thống"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#e2d3bf] text-xs font-normal text-stone-800"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Values Section */}
      {activeTab === "values" && (
        <div className="bg-white p-6 rounded-2xl border border-[#e2d3bf] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#e2d3bf]">
            <div>
              <h2 className="text-base font-bold text-[#1E1917]">Tầm Nhìn & 4 Trụ Cột Giá Trị Cốt Lõi</h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Cho phép thêm mới khối giá trị, xóa khối, hoặc thêm/bớt trụ cột con
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddValueItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f7f5f1] hover:bg-[#f3e9db] text-[#a21f1f] text-xs font-bold border border-[#e2d3bf] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm khối giá trị</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pageProps.valuesSection.items.map((item, idx) => (
              <div key={item.id || idx} className="p-5 rounded-2xl bg-[#f7f5f1]/40 border border-[#e2d3bf] space-y-3 relative">
                <div className="flex items-center justify-between pb-2 border-b border-[#e2d3bf]">
                  <span className="text-xs font-bold uppercase text-[#a21f1f]">
                    Khối #{idx + 1}: {item.category}
                  </span>
                  {pageProps.valuesSection.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveValueItem(idx)}
                      className="text-stone-400 hover:text-red-700 p-1 cursor-pointer transition-colors"
                      title="Xóa thẻ giá trị này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 uppercase">Danh mục thẻ</label>
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => {
                      const updated = [...pageProps.valuesSection.items];
                      updated[idx].category = e.target.value;
                      setPageProps({
                        ...pageProps,
                        valuesSection: { ...pageProps.valuesSection, items: updated },
                      });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs font-normal text-[#a21f1f]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 uppercase">Tiêu đề thẻ</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...pageProps.valuesSection.items];
                      updated[idx].title = e.target.value;
                      setPageProps({
                        ...pageProps,
                        valuesSection: { ...pageProps.valuesSection, items: updated },
                      });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#e2d3bf] text-xs font-normal text-[#1E1917]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 uppercase">Nội dung diễn giải</label>
                  <textarea
                    rows={4}
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...pageProps.valuesSection.items];
                      updated[idx].description = e.target.value;
                      setPageProps({
                        ...pageProps,
                        valuesSection: { ...pageProps.valuesSection, items: updated },
                      });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#e2d3bf] text-xs text-stone-700 leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 uppercase">Thẻ tag định vị</label>
                  <input
                    type="text"
                    value={item.tag}
                    onChange={(e) => {
                      const updated = [...pageProps.valuesSection.items];
                      updated[idx].tag = e.target.value;
                      setPageProps({
                        ...pageProps,
                        valuesSection: { ...pageProps.valuesSection, items: updated },
                      });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs font-normal text-stone-700"
                  />
                </div>

                {/* Pillars with Add/Remove */}
                <div className="space-y-2 pt-2 border-t border-[#e2d3bf]">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-stone-700 uppercase">
                      Các trụ cột cam kết ({item.pillars?.length || 0})
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddPillar(idx)}
                      className="text-[11px] font-bold text-[#a21f1f] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Thêm trụ cột</span>
                    </button>
                  </div>

                  {item.pillars &&
                    item.pillars.map((pillar, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={pillar}
                          onChange={(e) => {
                            const updated = [...pageProps.valuesSection.items];
                            const newPillars = [...(updated[idx].pillars || [])];
                            newPillars[pIdx] = e.target.value;
                            updated[idx].pillars = newPillars;
                            setPageProps({
                              ...pageProps,
                              valuesSection: { ...pageProps.valuesSection, items: updated },
                            });
                          }}
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs text-stone-600"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePillar(idx, pIdx)}
                          className="p-1 text-stone-400 hover:text-red-700 cursor-pointer"
                          title="Xóa trụ cột này"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Organization Section */}
      {activeTab === "organization" && (
        <div className="bg-white p-6 rounded-2xl border border-[#e2d3bf] shadow-xs space-y-6">
          <div className="pb-3 border-b border-[#e2d3bf]">
            <h2 className="text-base font-bold text-[#1E1917]">Sơ Đồ Bộ Máy Quản Trị & Sáng Tác</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Cho phép thêm mới nhân sự lãnh đạo, thêm khối chức năng hoặc xóa bỏ
            </p>
          </div>

          {/* Leaders with Add/Remove */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1E1917] flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#a21f1f]" />
                Ban Lãnh Đạo Cấp Cao
              </h3>

              <button
                type="button"
                onClick={handleAddLeader}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f7f5f1] hover:bg-[#f3e9db] text-[#a21f1f] text-xs font-bold border border-[#e2d3bf] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm nhân sự lãnh đạo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pageProps.organizationSection.leaders.map((leader, idx) => (
                <div key={leader.id || idx} className="p-4 rounded-xl bg-[#f7f5f1]/40 border border-[#e2d3bf] space-y-3 relative">
                  {pageProps.organizationSection.leaders.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLeader(idx)}
                      className="absolute top-3 right-3 text-stone-400 hover:text-red-700 p-1 cursor-pointer transition-colors"
                      title="Xóa nhân sự này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="flex items-center gap-3 pr-6">
                    <div className="w-14 h-14 rounded-xl overflow-hidden relative border border-[#e2d3bf] shrink-0 bg-stone-100">
                      {leader.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={leader.avatar} alt={leader.name} className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={leader.name}
                        onChange={(e) => {
                          const updated = [...pageProps.organizationSection.leaders];
                          updated[idx].name = e.target.value;
                          setPageProps({
                            ...pageProps,
                            organizationSection: { ...pageProps.organizationSection, leaders: updated },
                          });
                        }}
                        placeholder="Họ và tên"
                        className="w-full px-2.5 py-1 rounded bg-white border border-[#e2d3bf] text-xs font-normal text-[#1E1917]"
                      />
                      <input
                        type="text"
                        value={leader.role}
                        onChange={(e) => {
                          const updated = [...pageProps.organizationSection.leaders];
                          updated[idx].role = e.target.value;
                          setPageProps({
                            ...pageProps,
                            organizationSection: { ...pageProps.organizationSection, leaders: updated },
                          });
                        }}
                        placeholder="Chức danh"
                        className="w-full px-2.5 py-1 rounded bg-white border border-[#e2d3bf] text-xs text-[#a21f1f] font-normal"
                      />
                    </div>
                  </div>

                  <ImageUrlUploadField
                    label="Ảnh đại diện"
                    value={leader.avatar}
                    fit="contain"
                    onChange={(avatar) => {
                        const updated = [...pageProps.organizationSection.leaders];
                        updated[idx].avatar = avatar;
                        setPageProps({
                          ...pageProps,
                          organizationSection: { ...pageProps.organizationSection, leaders: updated },
                        });
                      }}
                  />

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">Tiểu sử tóm tắt</label>
                    <textarea
                      rows={3}
                      value={leader.bio}
                      onChange={(e) => {
                        const updated = [...pageProps.organizationSection.leaders];
                        updated[idx].bio = e.target.value;
                        setPageProps({
                          ...pageProps,
                          organizationSection: { ...pageProps.organizationSection, leaders: updated },
                        });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs text-stone-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Divisions with Add/Remove */}
          <div className="pt-4 border-t border-[#e2d3bf] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1E1917]">Các Khối Chức Năng Sáng Tác & Thi Công</h3>

              <button
                type="button"
                onClick={handleAddDivision}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f7f5f1] hover:bg-[#f3e9db] text-[#a21f1f] text-xs font-bold border border-[#e2d3bf] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm khối phòng ban</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pageProps.organizationSection.divisions.map((div, idx) => (
                <div key={div.code || idx} className="p-4 rounded-xl bg-[#f7f5f1]/40 border border-[#e2d3bf] space-y-2 relative">
                  <div className="flex items-center justify-between pb-1">
                    <input
                      type="text"
                      value={div.code}
                      onChange={(e) => {
                        const updated = [...pageProps.organizationSection.divisions];
                        updated[idx].code = e.target.value;
                        setPageProps({
                          ...pageProps,
                          organizationSection: { ...pageProps.organizationSection, divisions: updated },
                        });
                      }}
                      className="px-2 py-0.5 rounded bg-white border border-[#e2d3bf] text-[10px] font-normal text-[#a21f1f] uppercase w-24"
                    />

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={div.subtitle}
                        onChange={(e) => {
                          const updated = [...pageProps.organizationSection.divisions];
                          updated[idx].subtitle = e.target.value;
                          setPageProps({
                            ...pageProps,
                            organizationSection: { ...pageProps.organizationSection, divisions: updated },
                          });
                        }}
                        placeholder="Tên tiếng Anh"
                        className="px-2 py-0.5 rounded bg-white border border-[#e2d3bf] text-[11px] text-stone-500"
                      />

                      {pageProps.organizationSection.divisions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDivision(idx)}
                          className="text-stone-400 hover:text-red-700 p-1 cursor-pointer transition-colors"
                          title="Xóa khối phòng ban này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={div.title}
                    onChange={(e) => {
                      const updated = [...pageProps.organizationSection.divisions];
                      updated[idx].title = e.target.value;
                      setPageProps({
                        ...pageProps,
                        organizationSection: { ...pageProps.organizationSection, divisions: updated },
                      });
                    }}
                    placeholder="Tên khối chức năng"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs font-normal text-[#1E1917]"
                  />

                  <textarea
                    rows={2}
                    value={div.description}
                    onChange={(e) => {
                      const updated = [...pageProps.organizationSection.divisions];
                      updated[idx].description = e.target.value;
                      setPageProps({
                        ...pageProps,
                        organizationSection: { ...pageProps.organizationSection, divisions: updated },
                      });
                    }}
                    placeholder="Mô tả chức năng nhiệm vụ"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs text-stone-700"
                  />

                  <input
                    type="text"
                    value={div.focus}
                    onChange={(e) => {
                      const updated = [...pageProps.organizationSection.divisions];
                      updated[idx].focus = e.target.value;
                      setPageProps({
                        ...pageProps,
                        organizationSection: { ...pageProps.organizationSection, divisions: updated },
                      });
                    }}
                    placeholder="Trọng tâm thực thi (Focus)"
                    className="w-full px-2.5 py-1 rounded bg-white border border-[#e2d3bf] text-[11px] text-stone-500 font-mono"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Partners & Testimonial */}
      {activeTab === "partners" && (
        <div className="bg-white p-6 rounded-2xl border border-[#e2d3bf] shadow-xs space-y-6">
          <div className="pb-3 border-b border-[#e2d3bf]">
            <h2 className="text-base font-bold text-[#1E1917]">Đối Tác Chiến Lược & Khách Hàng Doanh Nghiệp</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Cho phép thêm/xóa đối tác và chỉnh sửa đánh giá bảo chứng
            </p>
          </div>

          {/* Partners list with Add/Remove */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1E1917]">Danh sách Đối tác ({pageProps.partnersSection.items.length})</h3>

              <button
                type="button"
                onClick={handleAddPartner}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f7f5f1] hover:bg-[#f3e9db] text-[#a21f1f] text-xs font-bold border border-[#e2d3bf] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm đối tác</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pageProps.partnersSection.items.map((partner, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#f7f5f1]/50 border border-[#e2d3bf] space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-500 uppercase">Đối tác #{idx + 1}</span>
                    {pageProps.partnersSection.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePartner(idx)}
                        className="text-stone-400 hover:text-red-700 p-0.5 cursor-pointer transition-colors"
                        title="Xóa đối tác này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={partner.name}
                    onChange={(e) => {
                      const updated = [...pageProps.partnersSection.items];
                      updated[idx].name = e.target.value;
                      setPageProps({
                        ...pageProps,
                        partnersSection: { ...pageProps.partnersSection, items: updated },
                      });
                    }}
                    placeholder="Tên đối tác (VD: SƠN HOA VIỆT)"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs font-normal text-[#1E1917]"
                  />
                  <input
                    type="text"
                    value={partner.role}
                    onChange={(e) => {
                      const updated = [...pageProps.partnersSection.items];
                      updated[idx].role = e.target.value;
                      setPageProps({
                        ...pageProps,
                        partnersSection: { ...pageProps.partnersSection, items: updated },
                      });
                    }}
                    placeholder="Vai trò hợp tác (VD: ĐỐI TÁC R&D KỸ THUẬT)"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs text-stone-600"
                  />

                  {/* Logo Upload Box */}
                  <div className="pt-2 border-t border-[#e2d3bf] flex items-center gap-2.5">
                    <input
                      type="file"
                      id={`partner-logo-upload-${idx}`}
                      accept="image/png,image/jpeg,image/webp,image/svg+xml,image/jpg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUploadPartnerLogo(idx, file);
                        e.target.value = "";
                      }}
                    />

                    <label
                      htmlFor={`partner-logo-upload-${idx}`}
                      className="w-12 h-12 rounded-lg border border-[#e2d3bf] bg-white flex items-center justify-center shrink-0 cursor-pointer overflow-hidden group hover:border-[#9A1C1F] transition-colors relative shadow-2xs"
                      title="Bấm để tải ảnh logo đối tác từ máy"
                    >
                      {uploadingPartnerIdx === idx ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#9A1C1F]" />
                      ) : partner.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-stone-400 group-hover:text-[#9A1C1F]">
                          <UploadCloud className="w-4 h-4" />
                          <span className="text-[8px] font-medium mt-0.5">Logo</span>
                        </div>
                      )}
                    </label>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-semibold text-stone-600">Logo đối tác:</label>
                        {partner.logo && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...pageProps.partnersSection.items];
                              updated[idx].logo = "";
                              setPageProps({
                                ...pageProps,
                                partnersSection: { ...pageProps.partnersSection, items: updated },
                              });
                            }}
                            className="text-[10px] text-rose-600 hover:underline cursor-pointer"
                          >
                            Gỡ logo
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={partner.logo || ""}
                        onChange={(e) => {
                          const updated = [...pageProps.partnersSection.items];
                          updated[idx].logo = e.target.value;
                          setPageProps({
                            ...pageProps,
                            partnersSection: { ...pageProps.partnersSection, items: updated },
                          });
                        }}
                        placeholder="Dán URL hoặc bấm ô để tải ảnh"
                        className="w-full px-2 py-1 rounded-lg bg-white border border-[#e2d3bf] text-[11px] text-stone-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="pt-4 border-t border-[#e2d3bf] space-y-4">
            <h3 className="text-sm font-bold text-[#1E1917] flex items-center gap-2">
              <Quote className="w-4 h-4 text-[#a21f1f]" />
              Đánh Giá Bảo Chứng Chuyên Môn
            </h3>

            <div className="p-5 rounded-2xl bg-[#f7f5f1]/40 border border-[#e2d3bf] space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-700 uppercase">Lời trích dẫn (Quote)</label>
                <textarea
                  rows={3}
                  value={pageProps.partnersSection.testimonial.quote}
                  onChange={(e) =>
                    setPageProps({
                      ...pageProps,
                      partnersSection: {
                        ...pageProps.partnersSection,
                        testimonial: { ...pageProps.partnersSection.testimonial, quote: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e2d3bf] text-xs italic text-stone-800 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 uppercase">Tổ chức đánh giá</label>
                  <input
                    type="text"
                    value={pageProps.partnersSection.testimonial.organization}
                    onChange={(e) =>
                      setPageProps({
                        ...pageProps,
                        partnersSection: {
                          ...pageProps.partnersSection,
                          testimonial: { ...pageProps.partnersSection.testimonial, organization: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#e2d3bf] text-xs font-normal text-[#a21f1f]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700 uppercase">Ghi chú niên khoá</label>
                  <input
                    type="text"
                    value={pageProps.partnersSection.testimonial.note}
                    onChange={(e) =>
                      setPageProps({
                        ...pageProps,
                        partnersSection: {
                          ...pageProps.partnersSection,
                          testimonial: { ...pageProps.partnersSection.testimonial, note: e.target.value },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#e2d3bf] text-xs text-stone-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: CTA Section */}
      {activeTab === "cta" && (
        <div className="bg-white p-6 rounded-2xl border border-[#e2d3bf] shadow-xs space-y-6">
          <div className="pb-3 border-b border-[#e2d3bf]">
            <h2 className="text-base font-bold text-[#1E1917]">Khối Kêu Gọi Hành Động (CTA Cuối Trang)</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Nút liên hệ tư vấn chuyên gia và liên kết xem catalogue tác phẩm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E1917] uppercase tracking-wider">
                Huy hiệu (Badge)
              </label>
              <input
                type="text"
                value={pageProps.ctaSection.badge}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    ctaSection: { ...pageProps.ctaSection, badge: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7f5f1]/40 border border-[#e2d3bf] text-xs font-normal text-[#1E1917]"
              />
            </div>

            <div>
              <ColorHighlightInput
                label="Tiêu đề chính (Heading)"
                placeholder="Nhập tiêu đề... (bôi đen đoạn chữ để chọn màu sắc)"
                value={pageProps.ctaSection.heading}
                onChange={(newHeading) =>
                  setPageProps({
                    ...pageProps,
                    ctaSection: { ...pageProps.ctaSection, heading: newHeading },
                  })
                }
                className="font-bold"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-[#1E1917] uppercase tracking-wider">
                Nội dung kêu gọi
              </label>
              <textarea
                rows={3}
                value={pageProps.ctaSection.description}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    ctaSection: { ...pageProps.ctaSection, description: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7f5f1]/40 border border-[#e2d3bf] text-xs leading-relaxed font-normal text-[#1E1917]"
              />
            </div>

            {/* Primary Button */}
            <div className="p-4 rounded-xl bg-[#f7f5f1]/40 border border-[#e2d3bf] space-y-2">
              <span className="text-[10px] font-bold text-[#a21f1f] uppercase tracking-wider block">
                Nút chính (Primary CTA)
              </span>
              <input
                type="text"
                value={pageProps.ctaSection.primaryButton.label}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    ctaSection: {
                      ...pageProps.ctaSection,
                      primaryButton: { ...pageProps.ctaSection.primaryButton, label: e.target.value },
                    },
                  })
                }
                placeholder="Nhãn nút"
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs font-normal text-[#1E1917]"
              />
              <input
                type="text"
                value={pageProps.ctaSection.primaryButton.link}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    ctaSection: {
                      ...pageProps.ctaSection,
                      primaryButton: { ...pageProps.ctaSection.primaryButton, link: e.target.value },
                    },
                  })
                }
                placeholder="Đường dẫn link (/contact)"
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs font-mono text-stone-600"
              />
            </div>

            {/* Secondary Button */}
            <div className="p-4 rounded-xl bg-[#f7f5f1]/40 border border-[#e2d3bf] space-y-2">
              <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider block">
                Nút phụ (Secondary CTA)
              </span>
              <input
                type="text"
                value={pageProps.ctaSection.secondaryButton.label}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    ctaSection: {
                      ...pageProps.ctaSection,
                      secondaryButton: { ...pageProps.ctaSection.secondaryButton, label: e.target.value },
                    },
                  })
                }
                placeholder="Nhãn nút"
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs font-normal text-[#1E1917]"
              />
              <input
                type="text"
                value={pageProps.ctaSection.secondaryButton.link}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    ctaSection: {
                      ...pageProps.ctaSection,
                      secondaryButton: { ...pageProps.ctaSection.secondaryButton, link: e.target.value },
                    },
                  })
                }
                placeholder="Đường dẫn link (/products)"
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#e2d3bf] text-xs font-mono text-stone-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
