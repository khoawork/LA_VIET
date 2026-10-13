import {
  ProjectBreadcrumb,
  ProjectStats,
  ProjectList,
  ProjectProcess,
  ProjectCta,
} from "./components";


export default function ProjectPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
      <ProjectBreadcrumb />

      <ProjectStats />

      <ProjectList />

      <ProjectProcess />

      <ProjectCta />
    </div>
  );
}

export { ProjectPage };
export * from "./components";
export * from "./services/project.services";
export * from "./types/project.type";
