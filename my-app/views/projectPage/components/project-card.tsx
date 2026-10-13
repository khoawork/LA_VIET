import Link from "next/link";
import { ProjectItem } from "../types/project.type";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isRedBadge =
    project.category === "hotel-resort" ||
    project.category === "mansion-villa";

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-[#EAE2D5]/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Thumbnail Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAE2D5]">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top-Left Category Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm ${
              isRedBadge
                ? "bg-[#9A1C1F] text-white"
                : "bg-black/75 text-white backdrop-blur-sm"
            }`}
          >
            {project.categoryLabel}
          </span>
        </div>

        {/* Bottom-Right Year / Location Tag */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="text-[11px] font-medium text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded shadow-sm">
            {project.yearLocation}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-[#96671E] font-medium mb-1">
            <svg
              className="w-3.5 h-3.5 fill-current shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="truncate">{project.location}</span>
          </div>

          {/* Project Title */}
          <h3 className="text-base sm:text-lg font-bold text-[#1E1917] leading-snug group-hover:text-[#9A1C1F] transition-colors">
            {project.title}
          </h3>

          {/* Project Description */}
          <p className="text-xs text-[#5C544E] leading-relaxed line-clamp-2 mt-2">
            {project.description}
          </p>

          {/* Materials Section */}
          <div className="mt-4 pt-3 border-t border-[#EAE2D5]/60 text-xs">
            <span className="text-[10px] font-bold text-[#695D56] tracking-wider uppercase block mb-1">
              CHẤT LIỆU & CỐT NỀN:
            </span>
            <p className="text-[11px] text-[#5C544E] leading-snug line-clamp-2">
              {project.materials}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-5 pt-3.5 border-t border-[#EAE2D5]/60 flex items-center justify-between text-xs">
          <span className="font-semibold text-[#1E1917]">
            Quy mô: <strong className="text-[#9A1C1F] font-bold">{project.scale}</strong>
          </span>

          <Link
            href={`#du-an-${project.id}`}
            className="font-bold text-[#9A1C1F] hover:underline inline-flex items-center gap-1 transition-all group/link"
          >
            <span>Xem hồ sơ</span>
            <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

