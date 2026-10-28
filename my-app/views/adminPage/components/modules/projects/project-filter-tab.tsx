import { Plus } from "lucide-react";
import type { ProjectCategory } from "../../../types/projects/project-data.type";
import type { PageProjectFilter } from "../../../types/projects/page-project.type";
import { RemoveItemButton } from "../remove-item-button";
import { ProjectCategoryMultiselect } from "./project-category-multiselect";
import { ProjectTextField } from "./project-text-field";

interface Props {
  data: PageProjectFilter;
  categories: ProjectCategory[];
  onChange: (data: PageProjectFilter) => void;
}

export function ProjectFilterTab({ data, categories, onChange }: Props) {
  return (
    <div className="space-y-6 rounded-2xl border border-[#d9c7ae] bg-white p-6 shadow-xs">
      <div className="border-b border-[#d9c7ae] pb-4">
        <h2 className="text-sm font-bold uppercase text-[#9A1C1F]">
          Section 2: Bộ lọc dự án
        </h2>
        <p className="mt-1 text-xs text-[#695D56]">
          Đặt tên nhóm lọc và chọn danh mục dự án tương ứng.
        </p>
      </div>
      {data.key.map((item, index) => (
        <div
          key={index}
          className="relative rounded-xl border border-[#d9c7ae] bg-[#FAF8F5] p-4 pt-12"
        >
          <RemoveItemButton
            label={`Xóa nhóm lọc ${index + 1}`}
            onClick={() => onChange({ key: data.key.filter((_, i) => i !== index) })}
          />
          <div className="grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <ProjectTextField
              label="Tên hiển thị"
              value={item.name}
              onChange={(value) =>
                onChange({
                  key: data.key.map((entry, i) =>
                    i === index ? { ...entry, name: value } : entry,
                  ),
                })
              }
            />
            <ProjectCategoryMultiselect
              categories={categories}
              selectedIds={item.categories}
              index={index}
              onChange={(ids) =>
                onChange({
                  key: data.key.map((entry, i) =>
                    i === index ? { ...entry, categories: ids } : entry,
                  ),
                })
              }
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange({ key: [...data.key, { name: "", categories: [] }] })
        }
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#d9c7ae] px-4 py-2.5 text-xs font-bold text-[#9A1C1F] transition-colors hover:border-[#9A1C1F]/40 hover:bg-[#FAF1EC]"
      >
        <Plus className="h-4 w-4" /> Thêm nhóm lọc
      </button>
    </div>
  );
}
