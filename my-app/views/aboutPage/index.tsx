"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetch("/api/pages/about")
      .then((res) => res.json())
      .then((json) => {
        if (json?.data?.page?.props) {
          setPageProps(json.data.page.props);
        }
      })
      .catch((err) => {
        console.error("Failed to load dynamic about page configuration:", err);
      });
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col gap-2">
      <AboutBreadcrumb />
      <AboutHero data={pageProps?.herosection} />
      <AboutTechnology data={pageProps?.technologySection} />
      <AboutValues data={pageProps?.valuesSection} />
      <AboutOrganization data={pageProps?.organizationSection} />
      <AboutPartners data={pageProps?.partnersSection} />
      <AboutCta data={pageProps?.ctaSection} />
    </div>
  );
}

export { AboutPage, AboutPage as AboutView };
export * from "./components";
export * from "./services/about.services";
export * from "./types/about.type";
