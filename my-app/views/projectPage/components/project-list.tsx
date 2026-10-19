"use client";

import { useState } from "react";
import type { ProjectPageData, ProjectRecord } from "../types/project.type";
import { ProjectFilters } from "./project-filters";
import { ProjectCard } from "./project-card";

interface Props {
  projects: ProjectRecord[];
  filter?: ProjectPageData["props"]["filter"];
}

export function ProjectList({ projects, filter }: Props) {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const groups = filter?.key.length
    ? filter.key
    : [{ name: "Tất cả", categories: [] }];
  const selected = groups[selectedFilter] ?? groups[0];
  const visibleProjects = selected.categories.length
    ? projects.filter((project) =>
        selected.categories.includes(project.categoryId),
      )
    : projects;

  return (
    <section className="mb-20 sm:mb-24">
      <ProjectFilters
        groups={groups}
        selectedIndex={selectedFilter}
        onSelect={setSelectedFilter}
      />

      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {visibleProjects.length === 0 && (
        <div className="rounded-md border border-[#EAE2D5] bg-white py-16 text-center text-[#695D56]">
          <p className="text-sm">Hiện chưa có dự án nào trong danh mục này.</p>
        </div>
      )}
    </section>
  );
}
