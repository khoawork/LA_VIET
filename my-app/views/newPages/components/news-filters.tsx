import { NewsCategory } from "../types/news.type";
import { NEWS_CATEGORIES } from "../services/news.services";

interface NewsFiltersProps {
  selectedCategory: NewsCategory;
  onSelectCategory: (category: NewsCategory) => void;
}

export function NewsFilters({
  selectedCategory,
  onSelectCategory,
}: NewsFiltersProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
      {NEWS_CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              isActive
                ? "bg-[#a21f1f] text-white shadow-sm"
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

