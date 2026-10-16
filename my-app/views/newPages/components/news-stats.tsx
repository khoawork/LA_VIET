import type { NewsStatsSectionType } from "../types/pagenew.type";
import { DEFAULT_PAGE_NEW_PROPS } from "../types/pagenew.type";

interface NewsStatsProps {
  data?: NewsStatsSectionType;
}

export function NewsStats({ data }: NewsStatsProps = {}) {
  const stats = data?.items || DEFAULT_PAGE_NEW_PROPS.stats.items;

  return (
    <section className="mb-14 sm:mb-16">
      <div className="bg-[#FAF4EB] rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-[#EAE0D0] shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center divide-y sm:divide-y-0 lg:divide-x divide-[#EAE0D0]/80">
          {stats.map((stat, idx) => (
            <div
              key={stat.id || idx}
              className={`flex flex-col items-center justify-center ${
                idx > 0 ? "pt-6 sm:pt-0 lg:pl-6" : ""
              }`}
            >
              {/* Big Number */}
              <span
                className={`font-black text-4xl sm:text-5xl ${
                  stat.color || "text-[#9A1C1F]"
                } leading-none tracking-tight`}
              >
                {stat.value}
              </span>

              {/* Label */}
              <h4 className="text-xs font-bold text-[#1E1917] tracking-wider uppercase mt-3 mb-1">
                {stat.label}
              </h4>

              {/* Description */}
              <p className="text-xs text-[#695D56] leading-snug">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

