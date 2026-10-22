import {
  Award,
  BadgeCheck,
  Building2,
  CalendarDays,
  Handshake,
  Landmark,
  Palette,
  TrendingUp,
} from "lucide-react";
import type { HomeStatisticsSectionType } from "../types/pagehome.type";

export const STAT_ICON_OPTIONS = [
  { value: "calendar", label: "Thời gian", Icon: CalendarDays },
  { value: "landmark", label: "Công trình", Icon: Landmark },
  { value: "building", label: "Doanh nghiệp", Icon: Building2 },
  { value: "badge-check", label: "Chứng nhận", Icon: BadgeCheck },
  { value: "award", label: "Giải thưởng", Icon: Award },
  { value: "handshake", label: "Hợp tác", Icon: Handshake },
  { value: "palette", label: "Nghệ thuật", Icon: Palette },
  { value: "trending-up", label: "Phát triển", Icon: TrendingUp },
] as const;

export function StatIcon({
  value,
  index,
  className = "w-5 h-5",
}: {
  value?: string;
  index: number;
  className?: string;
}) {
  const Icon =
    STAT_ICON_OPTIONS.find((option) => option.value === value)?.Icon ??
    STAT_ICON_OPTIONS[index % 4].Icon;
  return <Icon className={className} aria-hidden="true" />;
}

interface HomeStatisticsProps {
  data: HomeStatisticsSectionType;
}

export function HomeStatistics({ data }: HomeStatisticsProps) {
  const statsList = data.stats;
  const cardColumns =
    statsList.length >= 4
      ? "lg:grid-cols-4"
      : statsList.length === 3
        ? "lg:grid-cols-3"
        : statsList.length === 2
          ? "lg:grid-cols-2"
          : "lg:grid-cols-1";

  return (
    <section className="w-full bg-[#f3e9da] py-10 lg:py-12 px-6 sm:px-10 lg:px-16 xl:px-24">
      <div className="w-full grid lg:grid-cols-12 gap-8 items-end mb-8">
        <div className="lg:col-span-6 space-y-2">
          <span className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#B91C1C] uppercase">
            <span className="w-2.5 h-2.5 bg-[#B91C1C] shrink-0" />
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

      <div
        className={`w-full grid ${statsList.length > 1 ? "sm:grid-cols-2" : ""} ${cardColumns} gap-5`}
      >
        {statsList.map((stat, i) => (
          <div
            key={i}
            className="p-7 min-h-[310px] bg-white border border-[#E8E2D5] shadow-sm hover:border-[#9A221A]/40 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between gap-3 mb-6">
              <span className="text-xs font-bold tracking-[0.12em] uppercase text-[#B91C1C]">
                {stat.tag}
              </span>
              <span className="w-10 h-10 shrink-0 flex items-center justify-center border border-[#EEDCA9] bg-[#FFF8E8] text-[#B91C1C]">
                <StatIcon value={stat.icon} index={i} />
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-[#B91C1C] tracking-tight">
              {stat.num}
            </div>
            <div className="w-14 h-0.5 bg-[#D8AA1B] mt-2 mb-6" />
            <h3 className="text-lg sm:text-xl font-bold text-[#231F20] mb-2 group-hover:text-[#9A221A] transition-colors">
              {stat.label}
            </h3>
            <p className="text-sm text-[#685B52] leading-relaxed">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
