import {
  AboutBreadcrumb,
  AboutHero,
  AboutTechnology,
  AboutValues,
  AboutOrganization,
  AboutPartners,
  AboutCta,
} from "./components";

export default function AboutPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col gap-2">
      <AboutBreadcrumb />

      <AboutHero />

      <AboutTechnology />

      <AboutValues />

      <AboutOrganization />

      <AboutPartners />

      <AboutCta />
    </div>
  );
}

export { AboutPage, AboutPage as AboutView };
export * from "./components";
export * from "./services/about.services";
export * from "./types/about.type";
