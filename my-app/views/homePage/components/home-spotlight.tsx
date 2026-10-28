import Link from "next/link";
import Image from "next/image";
import type { HomeSpotlightSectionType } from "../types/pagehome.type";

interface HomeSpotlightProps {
  data: HomeSpotlightSectionType;
}

export function HomeSpotlight({ data }: HomeSpotlightProps) {
  const infoBoxes = data.infoBoxes;

  return (
    <section className="w-full bg-white pt-6 pb-4 lg:pt-8 lg:pb-6 px-4 sm:px-10 lg:px-12 xl:px-24">
      <div className="w-full bg-white border border-[#E8E2D5] shadow-sm p-6 sm:p-8 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Artisan Image */}
          <div className="relative">
            <div className="relative overflow-hidden aspect-[4/3] border border-[#D5C9B5] shadow-sm w-full">
              {data.image && (
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>
            {(data.seal.logo || data.seal.line1 || data.seal.line2) && (
              <div className="absolute -bottom-3 -right-3 z-10 bg-[#9A221A] text-white p-3 shadow-md flex items-center gap-3">
                {data.seal.logo && (
                  <span className="w-9 h-9 bg-white border border-white/60 flex items-center justify-center">
                    <Image
                      src={data.seal.logo}
                      alt="Logo con dấu"
                      width={32}
                      height={32}
                      unoptimized
                      className="w-8 h-8 object-contain"
                    />
                  </span>
                )}
                {(data.seal.line1 || data.seal.line2) && (
                  <div className="text-[10px] leading-tight font-medium uppercase tracking-wider">
                    {data.seal.line1}
                    {data.seal.line1 && data.seal.line2 && <br />}
                    {data.seal.line2}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Project Information */}
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase block">
              {data.tagline}
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#231F20] leading-tight">
              {data.title}
            </h2>

            <p className="text-sm sm:text-base text-[#68625B] leading-relaxed">
              {data.description}
            </p>

            {infoBoxes.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-3">
                {infoBoxes.map((box, i) => (
                  <div key={i} className="px-3 py-2 bg-[#f3e9da] border border-[#E8E2D5]">
                    <span className="text-[11px] font-bold text-[#9A221A] uppercase tracking-wider block">
                      {box.label}
                    </span>
                    <p className="text-base font-bold text-[#231F20] mt-0.5 leading-snug">
                      {box.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {data.link.text && data.link.href && (
              <div>
                <Link
                  href={data.link.href}
                  className="inline-flex items-center gap-2 text-[13px] font-bold text-[#9A221A] uppercase tracking-wider hover:underline"
                >
                  {data.link.text} <span>→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
