import { IonIcon } from "@/shared/icons/ion-icon";
import type { ProjectHeaderData } from "../types/project.type";

export function ProjectStats({
  stats,
}: {
  stats: NonNullable<ProjectHeaderData["stats"]>;
}) {
  if (stats.length === 0) return null;

  return (
    <section className="mb-8 grid grid-cols-1 gap-4 sm:mb-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      {stats.map((stat, index) => {
        return (
          <div
            key={index}
            className="relative flex flex-col justify-between rounded-2xl border border-[#EAE2D5]/80 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between gap-2 text-[#695D56]">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                {stat.title}
              </span>
              <IonIcon name={stat.icon} fallback="ribbonOutline" className="h-4 w-4 text-[#96671E]" />
            </div>
            <div className="my-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
              <span
                className="text-4xl font-bold leading-none tracking-tight sm:text-[42px]"
                style={{ color: stat.quantityColor ?? "#000000" }}
              >
                {stat.quantity}
              </span>
              {stat.suffix && (
                <span
                  className="text-lg font-semibold leading-none sm:text-xl"
                  style={{ color: stat.suffixColor ?? "#000000" }}
                >
                  {stat.suffix}
                </span>
              )}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#695D56]">
              {stat.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
