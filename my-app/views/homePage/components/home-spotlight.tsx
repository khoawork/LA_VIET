import Link from "next/link";
import Image from "next/image";
import type { HomeSpotlightSectionType } from "../types/pagehome.type";
import { DEFAULT_PAGE_HOME_PROPS } from "../types/pagehome.type";

interface HomeSpotlightProps {
  data?: HomeSpotlightSectionType;
}

export function HomeSpotlight({ data = DEFAULT_PAGE_HOME_PROPS.spotlight }: HomeSpotlightProps) {
  const infoBoxes = data.infoBoxes && data.infoBoxes.length > 0
    ? data.infoBoxes
    : DEFAULT_PAGE_HOME_PROPS.spotlight.infoBoxes;

  return (
    <section className="w-full pb-24 px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="w-full rounded-3xl bg-[#EFE8DC] border border-[#DDD3C2] p-8 sm:p-12 lg:p-16 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 items-center">
          {/* Left: Artisan Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-square border border-[#D5C9B5] shadow-lg w-full">
              <Image
                src={data.image || DEFAULT_PAGE_HOME_PROPS.spotlight.image}
                alt={data.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Red Brand Seal Stamp */}
              <div className="absolute bottom-5 left-5 bg-[#9A221A] text-white p-3.5 rounded-xl shadow-md flex items-center gap-3">
                <div className="w-7 h-7 border border-white/60 flex items-center justify-center text-xs font-bold">
                  {data.seal?.initials || "LV"}
                </div>
                <div className="text-[10px] leading-tight font-medium uppercase tracking-wider">
                  {data.seal?.line1 || "Xưởng sơn mài"}
                  <br />
                  {data.seal?.line2 || "Lã Việt"}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Project Information */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase block">
              {data.tagline}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#231F20] leading-tight">
              {data.title}
            </h2>

            <p className="text-sm sm:text-base text-[#68625B] leading-relaxed">
              {data.description}
            </p>

            {/* 4 Info Boxes in 2x2 Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {infoBoxes.map((box, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/80 border border-[#DCD3C0]">
                  <span className="text-[10px] font-bold text-[#9A221A] uppercase tracking-wider block">
                    {box.label}
                  </span>
                  <p className="text-sm font-bold text-[#231F20] mt-1">
                    {box.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href={data.link?.href || "/projects"}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#9A221A] uppercase tracking-wider hover:underline"
              >
                {data.link?.text || "Xem chi tiết quy trình chế tác"} <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
