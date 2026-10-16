import type { ProjectFilterItem } from "../types/project.type";

interface Props {
  groups: ProjectFilterItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function ProjectFilters({ groups, selectedIndex, onSelect }: Props) {
  return (
    <div className="mb-8 flex items-center gap-2.5 overflow-x-auto pb-3 sm:mb-10 sm:gap-3 sm:pb-4">
      {groups.map((group, index) => (
        <button
          key={index}
          type="button"
          aria-pressed={selectedIndex === index}
          onClick={() => onSelect(index)}
          className={`cursor-pointer whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all sm:px-5 ${
            selectedIndex === index
              ? "bg-[#9A1C1F] text-white shadow-sm"
              : "bg-[#EFE8DC] text-[#423A35] hover:bg-[#E5DDCF]"
          }`}
        >
          {group.name}
        </button>
      ))}
    </div>
  );
}
