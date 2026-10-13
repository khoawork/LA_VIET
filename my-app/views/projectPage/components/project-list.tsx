"use client";

import { useState } from "react";
import { ProjectCategory } from "../types/project.type";
import { FEATURED_PROJECTS } from "../services/project.services";
import { ProjectFilters } from "./project-filters";
import { ProjectCard } from "./project-card";

export function ProjectList() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("all");

  const filteredProjects =
    selectedCategory === "all"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section className="mb-20 sm:mb-24">
      {/* Category Filter Tabs */}
      <ProjectFilters
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#EAE2D5] text-[#695D56]">
          <p className="text-sm">Hiện chưa có dự án nào trong danh mục này.</p>
        </div>
      )}
    </section>
  );
}

