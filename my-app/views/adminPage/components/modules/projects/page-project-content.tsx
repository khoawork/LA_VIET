"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  getProjectCategories,
  getPageProject,
  savePageProjectSection,
} from "../../../services/projects/page-project.service";
import type { ProjectCategory } from "../../../types/projects/project-data.type";
import type {
  PageProjectData,
  PageProjectProps,
  PageProjectSection,
} from "../../../types/projects/page-project.type";
import { ProjectHeaderActions } from "./project-header-actions";
import { ProjectTabNav } from "./project-tab-nav";
import { ProjectHeaderTab } from "./project-header-tab";
import { ProjectFilterTab } from "./project-filter-tab";
import { ProjectProcedureTab } from "./project-procedure-tab";
import { ProjectCtaTab } from "./project-cta-tab";

export function PageProjectContent() {
  const [page, setPage] = useState<PageProjectData | null>(null);
  const [draft, setDraft] = useState<PageProjectProps | null>(null);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [activeTab, setActiveTab] = useState<PageProjectSection>("header");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let mounted = true;
    getPageProject()
      .then((data) => {
        if (!mounted) return;
        setPage(data);
        setDraft({
          header: data.props.header,
          filter: data.props.filter ?? { key: [] },
          procedure: data.props.procedure ?? {
            eyebrow: "",
            title: "",
            description: "",
            steps: [],
          },
          cta: data.props.cta ?? {
            eyebrow: "",
            eyebrow_icon: "",
            title: "",
            description: "",
            contacts: [],
            actions: [],
          },
        });
      })
      .catch((err: Error) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    getProjectCategories()
      .then((items) => {
        if (mounted) setCategories(items);
      })
      .catch((err: Error) => {
        if (mounted) setError(err.message);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function saveSection() {
    if (!draft) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await savePageProjectSection(activeTab, draft[activeTab]);
      const updated = await getPageProject();
      if (activeTab === "header") {
        const savedStats = updated.props.header.stats ?? [];
        const statsMatch = (draft.header.stats ?? []).every(
          (stat, index) =>
            stat.quantityColor === savedStats[index]?.quantityColor &&
            stat.suffix === savedStats[index]?.suffix &&
            stat.suffixColor === savedStats[index]?.suffixColor,
        );
        if (!statsMatch) {
          throw new Error("Thông tin chỉ số chưa được lưu vào dữ liệu trang Dự án.");
        }
      }
      setPage(updated);
      setDraft((current) =>
        current
          ? { ...current, [activeTab]: updated.props[activeTab] }
          : updated.props,
      );
      setSuccess("Đã lưu section thành công.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể lưu section.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#d9c7ae] bg-white p-12 text-sm text-[#695D56]">
        <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
        <span>Đang tải trang Dự án...</span>
      </div>
    );
  }

  if (!page || !draft) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-rose-200 bg-white p-6 text-sm text-rose-700"
      >
        {error || "Chưa có dữ liệu trang Dự án."}
      </div>
    );
  }

  return (
    <section className="admin-content-editor space-y-6">
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700"
        >
          {error}
        </p>
      )}
      {success && (
        <p
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-700"
        >
          {success}
        </p>
      )}

      <ProjectHeaderActions
        saving={saving}
        onSave={saveSection}
      />
      <ProjectTabNav
        activeTab={activeTab}
        onSelect={(tab) => {
          setActiveTab(tab);
          setSuccess("");
          setError("");
        }}
      />

      <div className="mx-auto w-full max-w-6xl space-y-6">
        {activeTab === "header" && (
          <ProjectHeaderTab
            data={draft.header}
            onChange={(header) =>
              setDraft((current) =>
                current ? { ...current, header } : current,
              )
            }
          />
        )}
        {activeTab === "filter" && (
          <ProjectFilterTab
            data={draft.filter ?? { key: [] }}
            categories={categories}
            onChange={(filter) =>
              setDraft((current) =>
                current ? { ...current, filter } : current,
              )
            }
          />
        )}
        {activeTab === "procedure" && (
          <ProjectProcedureTab
            data={draft.procedure ?? { eyebrow: "", title: "", description: "", steps: [] }}
            onChange={(procedure) =>
              setDraft((current) =>
                current ? { ...current, procedure } : current,
              )
            }
          />
        )}
        {activeTab === "cta" && (
          <ProjectCtaTab
            data={
              draft.cta ?? {
                eyebrow: "",
                eyebrow_icon: "",
                title: "",
                description: "",
                contacts: [],
                actions: [],
              }
            }
            onChange={(cta) =>
              setDraft((current) => (current ? { ...current, cta } : current))
            }
          />
        )}
      </div>
    </section>
  );
}
