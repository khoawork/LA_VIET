"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { BrandingTab, FooterDraft } from "../../../types/brandings/site-settings.type";
import { BrandingDetailsTab } from "./branding-details-tab";
import { BrandingFooterTab } from "./branding-footer-tab";
import { BrandingHeader } from "./branding-header";
import { BrandingIdentityTab } from "./branding-identity-tab";
import { BrandingPoliciesTab } from "./branding-policies-tab";
import { BrandingTabNav } from "./branding-tab-nav";
import { useBrandingEditor } from "./use-branding-editor";

export function BrandingContent() {
  const [activeTab, setActiveTab] = useState<BrandingTab>("brand");
  const editor = useBrandingEditor();

  if (editor.loading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#EAE2D5] bg-white p-12 text-sm text-[#695D56]">
        <Loader2 className="h-5 w-5 animate-spin" /> Đang tải cấu hình thương hiệu...
      </div>
    );
  }

  if (editor.loadFailed) {
    return <p role="alert" className="rounded-2xl border border-rose-200 bg-white p-6 text-sm text-rose-700">{editor.error}</p>;
  }

  function updateFooter(footer: FooterDraft) {
    editor.setDraft((current) => ({ ...current, footer }));
  }

  const footerProps = {
    data: editor.draft.footer,
    onChange: updateFooter,
  };

  return (
    <section className="admin-content-editor space-y-6">
      {editor.error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700">{editor.error}</p>}
      {editor.success && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-700">{editor.success}</p>}
      <BrandingHeader
        saving={editor.saving}
        onSave={() => editor.save(activeTab)}
      />
      <BrandingTabNav activeTab={activeTab} onSelect={setActiveTab} />
      <div className="mx-auto w-full max-w-6xl space-y-6">
        {activeTab === "brand" && <BrandingIdentityTab data={editor.draft} onChange={editor.setDraft} />}
        {activeTab === "footer" && <BrandingFooterTab {...footerProps} />}
        {activeTab === "details" && <BrandingDetailsTab {...footerProps} />}
        {activeTab === "policies" && <BrandingPoliciesTab {...footerProps} />}
      </div>
    </section>
  );
}
