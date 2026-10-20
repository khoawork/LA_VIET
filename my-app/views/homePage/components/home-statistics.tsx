import type { HomeStatisticsSectionType } from "../types/pagehome.type";
import { DEFAULT_PAGE_HOME_PROPS } from "../types/pagehome.type";

interface HomeStatisticsProps {
  data?: HomeStatisticsSectionType;
}

export function HomeStatistics({ data = DEFAULT_PAGE_HOME_PROPS.statistics }: HomeStatisticsProps) {
  const statsList = data.stats && data.stats.length > 0
    ? data.stats
    : DEFAULT_PAGE_HOME_PROPS.statistics.stats;

  return (
    <section className="w-full py-14 lg:py-14 px-6 pt-20 sm:px-10 lg:px-16 xl:px-24">
      <div className="w-full grid lg:grid-cols-12 gap-8 items-end mb-14">
        <div className="lg:col-span-6 space-y-2">
          <span className="text-xs font-bold tracking-[0.22em] text-[#9A221A] uppercase">
            {data.tagline}
          </span>
          <h2 className="text-3xl py-2 sm:text-4xl lg:text-5xl font-bold text-[#231F20] tracking-tight">
            {data.title}
          </h2>
        </div>
        <div className="lg:col-span-6">
          <p className="text-sm sm:text-base text-[#68625B] leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      {/* 4 Stat Cards Grid */}
      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsList.map((stat, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-white border border-[#E8E2D5] shadow-sm hover:border-[#9A221A]/40 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl sm:text-5xl font-bold text-[#9A221A] tracking-tight">
                {stat.num}
              </span>
              <span className="text-[10px] font-semibold text-[#9A221A] bg-[#9A221A]/10 px-2 py-0.5 rounded-full">
                {stat.tag}
              </span>
            </div>
            <h3 className="text-base font-bold text-[#231F20] mb-2 group-hover:text-[#9A221A] transition-colors">
              {stat.label}
            </h3>
            <p className="text-xs text-[#78716C] leading-relaxed">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
