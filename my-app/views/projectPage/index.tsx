import {
  ProjectBreadcrumb,
  ProjectStats,
  ProjectList,
  ProjectProcess,
  ProjectCta,
} from "./components";


export default function ProjectPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col gap-2">
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
