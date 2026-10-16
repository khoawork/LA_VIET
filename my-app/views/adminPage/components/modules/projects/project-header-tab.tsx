import { Plus } from "lucide-react";
import type { PageProjectHeader } from "../../../types/projects/page-project.type";
import { IconSelect } from "../icon-select";
import { RemoveItemButton } from "../remove-item-button";
import { ProjectQuantityColorPicker } from "./project-quantity-color-picker";
import { ProjectTextField } from "./project-text-field";

interface Props {
  data: PageProjectHeader;
  onChange: (data: PageProjectHeader) => void;
}

export function ProjectHeaderTab({ data, onChange }: Props) {
  const stats = data.stats ?? [];

  function setStatColor(
    index: number,
    key: "quantityColor" | "suffixColor",
    color?: string,
  ) {
    onChange({
      ...data,
      stats: stats.map((item, i) =>
        i === index ? { ...item, [key]: color } : item,
      ),
    });
  }

  return (
    <div className="space-y-6 rounded-2xl border border-[#EAE2D5] bg-white p-6 shadow-xs">
      <div className="border-b border-[#EAE2D5] pb-4">
        <h2 className="text-sm font-bold uppercase text-[#9A1C1F]">
          Section 1: Header &amp; Breadcrumb
        </h2>
        <p className="mt-1 text-xs text-[#695D56]">
          Tên đường dẫn và các chỉ số nổi bật ở đầu trang Dự án.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ProjectTextField
          label="Tên trang chủ"
          value={data.breadcrumb.homeLabel}
          onChange={(value) =>
            onChange({
              ...data,
              breadcrumb: { ...data.breadcrumb, homeLabel: value },
            })
          }
        />
        <ProjectTextField
          label="Tên trang hiện tại"
          value={data.breadcrumb.currentLabel}
          onChange={(value) =>
            onChange({
              ...data,
              breadcrumb: { ...data.breadcrumb, currentLabel: value },
            })
          }
        />
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase text-[#1E1917]">
          Thống kê ({stats.length})
        </h3>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...data,
              stats: [
                ...stats,
                { title: "", icon: "", quantity: "", suffix: "", description: "" },
              ],
            })
          }
          className="inline-flex items-center gap-1 text-xs font-bold text-[#9A1C1F]"
        >
          <Plus className="h-4 w-4" /> Thêm chỉ số
        </button>
      </div>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative rounded-xl border border-[#EAE2D5] bg-[#FAF8F5] p-4 pt-12"
        >
          <RemoveItemButton
            label={`Xóa chỉ số ${index + 1}`}
            onClick={() => onChange({ ...data, stats: stats.filter((_, i) => i !== index) })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <ProjectTextField
              label="Tiêu đề"
              value={stat.title}
              onChange={(value) =>
                onChange({
                  ...data,
                  stats: stats.map((item, i) =>
                    i === index ? { ...item, title: value } : item,
                  ),
                })
              }
            />
            <IconSelect
              label="Tên icon"
              value={stat.icon}
              onChange={(value) =>
                onChange({
                  ...data,
                  stats: stats.map((item, i) =>
                    i === index ? { ...item, icon: value } : item,
                  ),
                })
              }
            />
            <ProjectTextField
              label="Số lượng"
              value={stat.quantity}
              onChange={(value) =>
                onChange({
                  ...data,
                  stats: stats.map((item, i) =>
                    i === index ? { ...item, quantity: value } : item,
                  ),
                })
              }
            />
            <ProjectQuantityColorPicker
              value={stat.quantityColor}
              onChange={(color) => setStatColor(index, "quantityColor", color)}
              index={index}
            />
            <ProjectTextField
              label="Hậu tố"
              value={stat.suffix ?? ""}
              placeholder="Ví dụ: Hạng mục, + m²"
              onChange={(value) =>
                onChange({
                  ...data,
                  stats: stats.map((item, i) =>
                    i === index ? { ...item, suffix: value } : item,
                  ),
                })
              }
            />
            <ProjectQuantityColorPicker
              label="Màu hậu tố"
              value={stat.suffixColor}
              onChange={(color) => setStatColor(index, "suffixColor", color)}
              index={index}
            />
            <div className="sm:col-span-2">
              <ProjectTextField
                label="Mô tả"
                value={stat.description}
                onChange={(value) =>
                  onChange({
                    ...data,
                    stats: stats.map((item, i) =>
                      i === index ? { ...item, description: value } : item,
                    ),
                  })
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
