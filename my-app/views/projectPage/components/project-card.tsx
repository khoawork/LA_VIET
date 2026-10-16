import Link from "next/link";
import type { ProjectRecord } from "../types/project.type";

export function ProjectCard({ project }: { project: ProjectRecord }) {
  return (
    <article
      id={`du-an-${project.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#EAE2D5]/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAE2D5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded bg-[#9A1C1F] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            {project.category.name}
          </span>
        </div>
        {project.caption && (
          <div className="absolute bottom-3 right-3 z-10">
            <span className="rounded bg-[#F5EFE6] px-2.5 py-0.5 text-[11px] font-medium text-[#2A2421] shadow-sm">
              {project.caption}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <p className="mb-1 text-xs font-medium text-[#96671E]">
            {project.location}
          </p>
          <h3 className="text-base font-bold leading-snug text-[#1E1917] transition-colors group-hover:text-[#9A1C1F] sm:text-lg">
            {project.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#5C544E]">
            {project.description}
          </p>
          {project.material && (
            <div className="mt-4 border-t border-[#EAE2D5]/60 pt-3 text-xs">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[#695D56]">
                Chất liệu &amp; cốt nền:
              </span>
              <p className="line-clamp-2 text-[11px] leading-snug text-[#5C544E]">
                {project.material}
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#EAE2D5]/60 pt-3.5 text-xs">
          <span className="font-semibold text-[#1E1917]">
            Quy mô:{" "}
            <strong className="font-bold text-[#9A1C1F]">
              {project.scale}
            </strong>
          </span>
          <Link
            href={`#du-an-${project.id}`}
            className="font-bold text-[#9A1C1F] hover:underline"
          >
            {project.button || "Xem hồ sơ"} →
          </Link>
        </div>
      </div>
    </article>
  );
}
