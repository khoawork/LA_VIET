import {
  AboutHeader,
  AboutHero,
  AboutTechnology,
  AboutValues,
  AboutOrganization,
  AboutPartners,
  AboutCta,
  AboutFooter,
} from "./components";

export * from "./components";

export function AboutView() {
  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] text-[#231F20] font-sans selection:bg-[#9A221A] selection:text-white flex flex-col">
      <AboutHeader />
      <main className="w-full flex-1">
        <AboutHero />
        <AboutTechnology />
        <AboutValues />
        <AboutOrganization />
        <AboutPartners />
        <AboutCta />
      </main>
      <AboutFooter />
    </div>
  );
}

