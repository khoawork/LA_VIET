export interface FilterCategoryItem {
  id: string | number;
  label: string;
}

interface NewsFiltersProps {
  categories?: FilterCategoryItem[];
  selectedCategory: string | number;
  onSelectCategory: (category: string | number) => void;
}

export function NewsFilters({
  categories,
  selectedCategory,
  onSelectCategory,
}: NewsFiltersProps) {
  const items =
    categories && categories.length > 0
      ? categories
      : [{ id: "all", label: "TẤT CẢ BẢN TIN" }];

  return (
    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
      {items.map((cat) => {
        const isActive = String(selectedCategory) === String(cat.id);
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

