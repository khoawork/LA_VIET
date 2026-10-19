import Link from "next/link";
import Image from "next/image";
import type { HomeHeroSectionType } from "../types/pagehome.type";
import { DEFAULT_PAGE_HOME_PROPS } from "../types/pagehome.type";

interface HomeHeroProps {
  data?: HomeHeroSectionType;
}

export function HomeHero({ data = DEFAULT_PAGE_HOME_PROPS.hero }: HomeHeroProps) {
  const collections = data.collections && data.collections.length > 0
    ? data.collections
    : DEFAULT_PAGE_HOME_PROPS.hero.collections;

  return (
    <section className="relative  border-[#E8E2D5] bg-[#FAF7F2] overflow-hidden">
      {/* Hero Main Area */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 pt-4 pb-14 lg:pt-8 lg:pb-14">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-20 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#231F20] leading-[1.24]">
              {data.highlightWord && data.title.includes(data.highlightWord) ? (
                <>
                  {data.title.split(data.highlightWord)[0]}
                  <span className="text-[#9A221A] underline decoration-[#9A221A]/30 underline-offset-8">
                    {data.highlightWord}
                  </span>
                  {data.title.split(data.highlightWord)[1]}
                </>
              ) : (
                data.title
              )}
            </h1>

            <p className="text-[#68625B] text-base sm:text-lg leading-relaxed max-w-3xl">
              {data.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={data.primaryButton?.href || "/projects"}
                className="px-8 py-4 rounded-xs bg-[#9A221A] hover:bg-[#821B14] text-white text-xs font-bold uppercase tracking-[0.14em] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                {data.primaryButton?.text || "Khám phá bộ sưu tập"} <span>→</span>
              </Link>
              <Link
                href={data.secondaryButton?.href || "#tu-van"}
                className="px-8 py-4 rounded-xs bg-white hover:bg-[#F2ECE1] text-[#231F20] border border-[#DCD5C7] text-xs font-bold uppercase tracking-[0.14em] transition-colors"
              >
                {data.secondaryButton?.text || "Tư vấn dự án"}
              </Link>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E5DDD0] shadow-2xl bg-white aspect-[4/3] lg:aspect-[5/4] w-full">
              <Image
                src={data.image?.src || DEFAULT_PAGE_HOME_PROPS.hero.image.src}
                alt={data.image?.caption || "Không gian triển lãm sơn mài Là Việt"}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#E6C687] font-semibold">
                  {data.image?.tag || "Không gian trưng bày"}
                </span>
                <p className="text-sm sm:text-base font-bold mt-1">
                  {data.image?.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Collections Ribbon (Full-width 4 columns) */}
      <div className="mx-6 sm:mx-10 lg:mx-16 xl:mx-24 border border-[#E8E2D5] bg-white">
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E8E2D5]">
          {collections.map((col, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 hover:bg-[#FAF7F2] transition-colors group cursor-pointer"
            >
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#9A221A] block">
                {col.idx}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#231F20] mt-1 group-hover:text-[#9A221A] transition-colors">
                {col.title}
              </h3>
              <p className="text-xs text-[#78716C] mt-1">{col.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
