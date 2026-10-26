"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AboutBreadcrumb,
  AboutHero,
  AboutTechnology,
  AboutValues,
  AboutOrganization,
  AboutPartners,
  AboutCta,
} from "./components";
import type { AboutPagePropsType } from "@/shared/schema/pages/about-product.schema";

export default function AboutPage() {
  const [pageProps, setPageProps] = useState<AboutPagePropsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/pages/about")
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tải nội dung trang Giới thiệu.");
        return res.json();
      })
      .then((json) => {
        if (!json.success || !json.data?.page?.props) {
          throw new Error("Chưa có nội dung trang Giới thiệu.");
        }
        setPageProps(json.data.page.props);
      })
      .catch((err) => {
        console.error("Failed to load dynamic about page configuration:", err);
        setError(err instanceof Error ? err.message : "Không thể tải trang Giới thiệu.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center gap-2 py-24 text-sm text-[#695D56]"><Loader2 className="h-5 w-5 animate-spin" /> Đang tải trang Giới thiệu...</div>;
  if (!pageProps) return <div role="alert" className="py-24 text-center text-sm text-red-700">{error}</div>;

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col gap-2">
      <AboutBreadcrumb />
      {pageProps.herosection && <AboutHero data={pageProps.herosection} />}
      {pageProps.technologySection && <AboutTechnology data={pageProps.technologySection} />}
      {pageProps.valuesSection && <AboutValues data={pageProps.valuesSection} />}
      {pageProps.organizationSection && <AboutOrganization data={pageProps.organizationSection} />}
      {pageProps.partnersSection && <AboutPartners data={pageProps.partnersSection} />}
      {pageProps.ctaSection && <AboutCta data={pageProps.ctaSection} />}
    </div>
  );
}

export { AboutPage, AboutPage as AboutView };
export * from "./components";
export * from "./types/about.type";
