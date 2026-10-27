"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { PageHomePropsType } from "@/views/homePage/types/pagehome.type";
import {
  HomeHeaderActions,
  HomeTabNav,
  HomeSectionTab,
  HomeHeroTab,
  HomeStatisticsTab,
  HomeSpotlightTab,
  HomeNewsTab,
  HomeNewsArticlesCard,
  HomePartnersTab,
  HomeCtaTab,
  HomeSeoTab,
} from "./home";

export function AdminHomeView() {
  const [activeTab, setActiveTab] = useState<HomeSectionTab>("hero");
  const [formData, setFormData] = useState<PageHomePropsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // 1. Tải cấu trúc trang chủ từ API
  useEffect(() => {
    async function fetchHomeContent() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/home/page");
        const json = await res.json();
        if (res.ok && json.success && json.data?.props) {
          setFormData(json.data.props);
        } else {
          setFormData(null);
        }
      } catch (err) {
        console.error("Lỗi khi tải cấu trúc Trang chủ:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeContent();
  }, []);

  // Tự ẩn thông báo sau 4 giây
  useEffect(() => {
    if (alertInfo) {
      const timer = setTimeout(() => setAlertInfo(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  // 2. Lưu thay đổi qua API PUT
  const handleSave = async () => {
    if (!formData) return;
    try {
      setSaving(true);
      const res = await fetch("/api/admin/home/page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ props: formData }),
      });
      const json = await res.json();

      if (json.success) {
        setAlertInfo({
          type: "success",
          message: "Đã lưu toàn bộ thay đổi cấu trúc Trang chủ thành công!",
        });
        if (json.data?.props) {
          setFormData(json.data.props);
        }
      } else {
        setAlertInfo({
          type: "error",
          message: json.message || "Không thể lưu thay đổi, vui lòng thử lại.",
        });
      }
    } catch {
      setAlertInfo({
        type: "error",
        message: "Lỗi kết nối máy chủ khi lưu cấu trúc Trang chủ.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#EAE2D5] bg-white p-12 text-sm text-[#695D56]">
        <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
        <span>Đang tải Trang chủ...</span>
      </div>
    );
  }

  if (!formData) {
    return (
      <p role="alert" className="rounded-2xl border border-[#EAE2D5] bg-white p-12 text-center text-sm text-[#695D56]">
        Chưa có dữ liệu Trang chủ hoặc không thể tải dữ liệu.
      </p>
    );
  }

  return (
    <div className="admin-content-editor space-y-6">
      {/* Alert Banner */}
      {alertInfo && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl text-xs font-semibold transition-all ${
            alertInfo.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {alertInfo.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          )}
          <span>{alertInfo.message}</span>
        </div>
      )}

      {/* Header & Top Bar Actions */}
      <HomeHeaderActions
        saving={saving}
        onSave={handleSave}
      />

      {/* Navigation Tabs giữa 7 Section Trang chủ */}
      <HomeTabNav activeTab={activeTab} onSelectTab={setActiveTab} />

      <div className="mx-auto w-full max-w-6xl space-y-6">
        {activeTab === "hero" && (
          <HomeHeroTab
            data={formData.hero}
            onChange={(hero) => setFormData({ ...formData, hero })}
          />
        )}

        {activeTab === "statistics" && (
          <HomeStatisticsTab
            data={formData.statistics}
            onChange={(statistics) =>
              setFormData({ ...formData, statistics })
            }
          />
        )}

        {activeTab === "spotlight" && (
          <HomeSpotlightTab
            data={formData.spotlight}
            onChange={(spotlight) =>
              setFormData({ ...formData, spotlight })
            }
          />
        )}

        {activeTab === "news" && (
          <HomeNewsTab
            data={formData.newsSection}
            onChange={(newsSection) =>
              setFormData((current) => current ? { ...current, newsSection } : current)
            }
          />
        )}

        {activeTab === "partners" && (
          <HomePartnersTab
            data={formData.partners}
            onChange={(partners) =>
              setFormData({ ...formData, partners })
            }
          />
        )}

        {activeTab === "cta" && (
          <HomeCtaTab
            data={formData.cta}
            onChange={(cta) => setFormData({ ...formData, cta })}
          />
        )}

        {activeTab === "seo" && (
          <HomeSeoTab
            data={formData.seo}
            onChange={(seo) => setFormData({ ...formData, seo })}
          />
        )}
      </div>

      {activeTab === "news" && (
        <div className="mx-auto w-full max-w-6xl">
          <HomeNewsArticlesCard
            data={formData.newsSection}
            onChange={(newsSection) =>
              setFormData((current) => current ? { ...current, newsSection } : current)
            }
          />
        </div>
      )}
    </div>
  );
}
