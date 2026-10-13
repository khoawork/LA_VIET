import { PROJECT_STATS } from "../services/project.services";

export function ProjectStats() {
  const getIcon = (id: string) => {
    switch (id) {
      case "total":
        return (
          // Compa / Architect tool icon
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path d="M12 3v4M6 21l6-14 6 14M7.5 17.5h9" />
          </svg>
        );
      case "partners":
        return (
          // Book / Business partner icon
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        );
      case "fields":
        return (
          // Shapes / Module classification icon
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <circle cx="12" cy="6" r="3" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <polygon points="17 14 20 20 14 20" />
          </svg>
        );
      case "scale":
        return (
          // Layers stack icon
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
      {PROJECT_STATS.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-2xl p-6 border border-[#EAE2D5]/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow relative"
        >
          <div className="flex items-center justify-between gap-2 text-[#695D56] mb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase">
              {stat.label}
            </span>
            <span className="text-[#96671E]">{getIcon(stat.id)}</span>
          </div>

          <div className="my-1 flex items-baseline">
            <span className={`text-4xl sm:text-[42px] font-bold tracking-tight leading-none ${stat.accentColor || "text-[#1E1917]"}`}>
              {stat.value}
            </span>
            {stat.unit && (
              <span className={`font-bold ml-1.5 ${stat.id === "fields" ? "text-lg text-[#1E1917]" : "text-2xl text-[#9A1C1F]"}`}>
                {stat.unit}
              </span>
            )}
          </div>

          <p className="text-xs text-[#695D56] leading-relaxed mt-3">
            {stat.description}
          </p>
        </div>
      ))}
    </section>
  );
}

