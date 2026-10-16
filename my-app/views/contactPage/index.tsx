"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { ContactBreadcrumb, ContactHeader, ContactInfoCard, ContactMapCard, ContactForm, ContactExperience } from "./components";
import { getContactPage } from "./services/contact.service";
import type { PageContactData } from "./types/contact.type";

export default function ContactPage() {
  const [page, setPage] = useState<PageContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    getContactPage().then((data) => { if (mounted) setPage(data); })
      .catch((err: Error) => { if (mounted) setError(err.message); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="flex items-center justify-center gap-2 py-24 text-sm text-[#695D56]"><Loader2 className="h-5 w-5 animate-spin" /> Đang tải trang Liên hệ...</div>;
  if (!page) return <div role="alert" className="mx-auto max-w-[1400px] px-4 py-16 text-sm text-red-700">{error || "Chưa có nội dung trang Liên hệ."}</div>;

  const { header, contactInfo, map, cta, experience } = page.props;
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2 px-4 py-2 sm:px-6 lg:px-8">
      <ContactBreadcrumb data={header.breadcrumb} />
      <ContactHeader data={header} />
      <section className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-7"><ContactInfoCard data={contactInfo} /></div>
        <div className="flex flex-col lg:col-span-5"><ContactMapCard data={map} /></div>
      </section>
      <section className="mb-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-7"><ContactForm data={cta} /></div>
        <div className="flex flex-col lg:col-span-5"><ContactExperience data={experience} /></div>
      </section>
    </div>
  );
}

export { ContactPage };
export * from "./components";
export * from "./services/contact.service";
export * from "./types/contact.type";
