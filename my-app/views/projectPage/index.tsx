"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  ProjectBreadcrumb,
  ProjectStats,
  ProjectList,
  ProjectProcess,
  ProjectCta,
} from "./components";
import { getProjectPage, getProjectRecords } from "./services/project.service";
import type { ProjectPageData, ProjectRecord } from "./types/project.type";

export default function ProjectPage() {
  const [page, setPage] = useState<ProjectPageData | null>(null);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    Promise.all([getProjectPage(), getProjectRecords()])
      .then(([pageData, projectData]) => {
        if (!mounted) return;
        setPage(pageData);
        setProjects(projectData);
      })
      .catch((err: Error) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center gap-2 py-24 text-sm text-[#695D56]"><Loader2 className="h-5 w-5 animate-spin" /> Đang tải trang Dự án...</div>;
  }

  if (!page) {
    return <div role="alert" className="mx-auto max-w-[1400px] px-4 py-16 text-sm text-red-700">{error || "Chưa có nội dung trang Dự án."}</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2 px-4 py-2 sm:px-6 lg:px-8">
      <ProjectBreadcrumb breadcrumb={page.props.header.breadcrumb} />
      <ProjectStats stats={page.props.header.stats ?? []} />
      <ProjectList projects={projects} filter={page.props.filter} />
      <ProjectProcess procedure={page.props.procedure} />
      <ProjectCta cta={page.props.cta} />
    </div>
  );
}

export { ProjectPage };
export * from "./components";
export * from "./services/project.service";
export * from "./types/project.type";
