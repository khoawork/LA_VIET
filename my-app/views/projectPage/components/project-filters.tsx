import { ProjectCategory } from "../types/project.type";
import { PROJECT_CATEGORIES } from "../services/project.services";

interface ProjectFiltersProps {
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
}

export function ProjectFilters({
  selectedCategory,
  onSelectCategory,
}: ProjectFiltersProps) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-3 sm:pb-4 mb-8 no-scrollbar scroll-smooth">
      {PROJECT_CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              isActive
                ? "bg-[#9A1C1F] text-white shadow-sm"
                : "bg-[#EFE8DC] text-[#423A35] hover:bg-[#E5DDCF] hover:text-[#1E1917]"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

