import {
  HomeHeader,
  HomeHero,
  HomeStatistics,
  HomeSpotlight,
  HomeNews,
  HomePartners,
  HomeCta,
  HomeFooter,
} from "@/modules/home";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] text-[#231F20] font-sans selection:bg-[#9A221A] selection:text-white flex flex-col">
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