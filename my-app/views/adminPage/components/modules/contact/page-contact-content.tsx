"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, Save } from "lucide-react";
import {
  getPageContact,
  savePageContactSection,
} from "../../../services/contact/page-contact.service";
import type {
  PageContactData,
  PageContactProps,
  PageContactSection,
} from "../../../types/contact/page-contact.type";
import { ContactTabNav } from "./contact-tab-nav";
import { ContactHeaderTab } from "./contact-header-tab";
import { ContactInfoTab } from "./contact-info-tab";
import { ContactMapTab } from "./contact-map-tab";
import { ContactCtaTab } from "./contact-cta-tab";
import { ContactExperienceTab } from "./contact-experience-tab";
import { ContactSectionPreview } from "./contact-section-preview";

function oneContactPerChannel(props: PageContactProps): PageContactProps {
  return {
    ...props,
    contactInfo: {
      ...props.contactInfo,
      channels: props.contactInfo.channels.flatMap((channel) =>
        channel.contacts.length > 1
          ? channel.contacts.map((contact, index) => ({
              title: index === 0 ? channel.title : `${channel.title} ${index + 1}`,
              contacts: [contact],
            }))
          : [channel],
      ),
    },
  };
}

export function PageContactContent() {
  const [page, setPage] = useState<PageContactData | null>(null);
  const [draft, setDraft] = useState<PageContactProps | null>(null);
  const [activeTab, setActiveTab] = useState<PageContactSection>("header");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let mounted = true;
    getPageContact()
      .then((data) => {
        if (!mounted) return;
        setPage(data);
        setDraft(oneContactPerChannel(data.props));
      })
      .catch((err: Error) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
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
      await savePageContactSection(activeTab, draft[activeTab]);
      const updated = await getPageContact();
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

  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#EAE2D5] bg-white p-12 text-sm text-[#695D56]">
        <Loader2 className="h-5 w-5 animate-spin" /> Đang tải trang Liên hệ...
      </div>
    );
  if (!page || !draft)
    return (
      <p
        role="alert"
        className="rounded-2xl border border-rose-200 bg-white p-6 text-sm text-rose-700"
      >
        {error || "Chưa có dữ liệu trang Liên hệ. Hãy chạy seed."}
      </p>
    );

  return (
    <section className="space-y-6">
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
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#EAE2D5] bg-white p-6 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF1EC] text-[#5A0B0E]">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">
              Nội dung trang Liên hệ
            </h1>
            <p className="text-xs text-[#695D56]">
              SLUG: {page.slug} · Chỉnh từng section bằng biểu mẫu.
            </p>
          </div>
        </div>
        <button
          type="button"
          disabled={saving}
          onClick={saveSection}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#5A0B0E] px-5 py-2.5 text-xs font-bold text-white transition-colors enabled:hover:bg-[#7A1518] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}{" "}
          {saving ? "Đang lưu..." : "Lưu section đang chọn"}
        </button>
      </div>
      <ContactTabNav
        activeTab={activeTab}
        onSelect={(tab) => {
          setActiveTab(tab);
          setError("");
          setSuccess("");
        }}
      />
      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {activeTab === "header" && (
            <ContactHeaderTab
              data={draft.header}
              onChange={(header) =>
                setDraft((current) =>
                  current ? { ...current, header } : current,
                )
              }
            />
          )}
          {activeTab === "contactInfo" && (
            <ContactInfoTab
              data={draft.contactInfo}
              onChange={(contactInfo) =>
                setDraft((current) =>
                  current ? { ...current, contactInfo } : current,
                )
              }
            />
          )}
          {activeTab === "map" && (
            <ContactMapTab
              data={draft.map}
              onChange={(map) =>
                setDraft((current) => (current ? { ...current, map } : current))
              }
            />
          )}
          {activeTab === "cta" && (
            <ContactCtaTab
              data={draft.cta}
              onChange={(cta) =>
                setDraft((current) => (current ? { ...current, cta } : current))
              }
            />
          )}
          {activeTab === "experience" && (
            <ContactExperienceTab
              data={draft.experience}
              onChange={(experience) =>
                setDraft((current) =>
                  current ? { ...current, experience } : current,
                )
              }
            />
          )}
        </div>
        <div className="lg:col-span-5">
          <ContactSectionPreview activeTab={activeTab} data={draft} />
        </div>
      </div>
    </section>
  );
}
