"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { PagePagination } from "@/shared/components/page-pagination";
import { getProjectRecords } from "../services/project.service";
import type { ProjectPageData, ProjectRecord } from "../types/project.type";
import { ProjectFilters } from "./project-filters";
import { ProjectCard } from "./project-card";

interface Props {
  filter?: ProjectPageData["props"]["filter"];
}

export function ProjectList({ filter }: Props) {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const groups = filter?.key.length
    ? filter.key
    : [{ name: "Tất cả", categories: [] }];
  const selected = groups[selectedFilter] ?? groups[0];
  const categoryIds = selected.categories.join(",");

  useEffect(() => {
    const controller = new AbortController();
    async function loadProjects() {
      setLoading(true);
      setError("");
      try {
        const result = await getProjectRecords(currentPage, categoryIds, controller.signal);
        if (controller.signal.aborted) return;
        setProjects(result.projects);
        setTotalPages(result.totalPages);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Không thể tải danh sách dự án.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProjects();
    return () => controller.abort();
  }, [currentPage, categoryIds]);

  return (
    <section className="mb-20 sm:mb-24">
      <ProjectFilters
        groups={groups}
        selectedIndex={selectedFilter}
        onSelect={(index) => {
          setSelectedFilter(index);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-[#695D56]">
          <Loader2 className="h-5 w-5 animate-spin" /> Đang tải dự án...
        </div>
      ) : error ? (
        <div role="alert" className="py-16 text-center text-sm text-red-700">{error}</div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-[#EAE2D5] bg-white py-16 text-center text-[#695D56]">
          <p className="text-sm">Hiện chưa có dự án nào trong danh mục này.</p>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <PagePagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-12"
        />
      )}
    </section>
  );
}
