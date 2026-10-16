import Link from "next/link";
import type { HomeCtaSectionType } from "../types/pagehome.type";
import { DEFAULT_PAGE_HOME_PROPS } from "../types/pagehome.type";

interface HomeCtaProps {
  data?: HomeCtaSectionType;
}

export function HomeCta({ data = DEFAULT_PAGE_HOME_PROPS.cta }: HomeCtaProps) {
  return (
    <section id="tu-van" className="w-full pb-24 px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="w-full rounded-3xl bg-white border-2 border-[#9A221A]/20 p-8 sm:p-12 lg:p-16 shadow-lg">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase">
              {data.tagline}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#231F20] tracking-tight">
              {data.title}
            </h2>
            <p className="text-sm sm:text-base text-[#68625B] leading-relaxed max-w-3xl">
              {data.description}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end">
            <Link
              href={data.primaryButton?.href || "/contact"}
              className="px-8 py-4 rounded-xl bg-[#9A221A] hover:bg-[#821B14] text-white text-xs font-bold uppercase tracking-[0.14em] text-center transition-all shadow-md hover:shadow-lg"
            >
              {data.primaryButton?.text || "Gửi yêu cầu tư vấn"}
            </Link>
            <Link
              href={data.secondaryButton?.href || "/projects"}
              className="px-8 py-4 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE8DC] text-[#231F20] border border-[#DCD5C7] text-xs font-bold uppercase tracking-[0.14em] text-center transition-colors"
            >
              {data.secondaryButton?.text || "Tải Profile Năng Lực"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
