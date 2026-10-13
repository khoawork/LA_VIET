import {
  HomeHeader,
  HomeHero,
  HomeStatistics,
  HomeSpotlight,
  HomeNews,
  HomePartners,
  HomeCta,
  HomeFooter,
} from "./components";

export * from "./components";

export function HomeView() {
  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] text-[#2B1F1A] font-sans selection:bg-[#B71C1C] selection:text-white flex flex-col">
      <HomeHeader />
      <main className="w-full flex-1">
        <HomeHero />
        <HomeStatistics />
        <HomeSpotlight />
        <HomeNews />
        <HomePartners />
        <HomeCta />
      </main>
      <HomeFooter />
    </div>
  );
}
