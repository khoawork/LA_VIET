import Link from "next/link";
import Image from "next/image";
import type { HomeHeroSectionType } from "../types/pagehome.type";

interface HomeHeroProps {
  data: HomeHeroSectionType;
}

export function HomeHero({ data }: HomeHeroProps) {
  const collections = data.collections;
  const ribbonColumns =
    collections.length >= 4
      ? "lg:grid-cols-4"
      : collections.length === 3
        ? "lg:grid-cols-3"
        : collections.length === 2
          ? "lg:grid-cols-2"
          : "lg:grid-cols-1";

  return (
    <section className="relative border-[#E8E2D5] bg-[#FAF7F2] overflow-hidden pb-16">
      {data.image.src && (
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={data.image.src}
            alt=""
            fill
            priority
            className="object-cover object-right opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/95 via-[#FAF7F2]/75 to-[#FAF7F2]/35" />
        </div>
      )}

      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-20 pt-8 pb-10 lg:pt-10 lg:pb-12">
        <div className="max-w-4xl lg:max-w-[62%] space-y-7">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#231F20] leading-[1.24]">
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
          </h2>

          <p className="text-[#68625B] text-base sm:text-lg leading-relaxed max-w-3xl">
            {data.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            {data.primaryButton.text && data.primaryButton.href && (
              <Link
                href={data.primaryButton.href}
                className="px-8 py-4 rounded-xs bg-[#9A221A] hover:bg-[#821B14] text-white text-xs font-bold uppercase tracking-[0.14em] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                {data.primaryButton.text} <span>→</span>
              </Link>
            )}
            {data.secondaryButton.text && data.secondaryButton.href && (
              <Link
                href={data.secondaryButton.href}
                className="px-8 py-4 rounded-xs bg-white hover:bg-[#F2ECE1] text-[#231F20] border border-[#DCD5C7] text-xs font-bold uppercase tracking-[0.14em] transition-colors"
              >
                {data.secondaryButton.text}
              </Link>
            )}
          </div>
        </div>
      </div>

      {collections.length > 0 && (
        <div className="relative z-10 mx-6 sm:mx-10 lg:mx-14 xl:mx-20 border border-[#E8E2D5] bg-[#E8E2D5]">
          <div
            className={`w-full grid grid-cols-1 ${collections.length > 1 ? "sm:grid-cols-2" : ""} ${ribbonColumns} gap-px`}
          >
            {collections.map((col, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 bg-white hover:bg-[#FAF7F2] transition-colors group"
              >
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#685B52] block">
                  {col.desc}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#231F20] mt-1 group-hover:text-[#9A221A] transition-colors">
                  {col.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
