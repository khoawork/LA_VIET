import {
  HomeHero,
  HomeStatistics,
  HomeSpotlight,
  HomeNews,
  HomePartners,
  HomeCta,
} from "./components";


export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <HomeHero />
      <HomeStatistics />
      <HomeSpotlight />
      <HomeNews />
      <HomePartners />
      <HomeCta />
    </div>
  );
}

export { HomePage };
export * from "./components";

