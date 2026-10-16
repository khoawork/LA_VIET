import { Plus } from "lucide-react";
import type { PageProjectProcedure } from "../../../types/projects/page-project.type";
import { IconSelect } from "../icon-select";
import { RemoveItemButton } from "../remove-item-button";
import { ProjectTextField } from "./project-text-field";

interface Props {
  data: PageProjectProcedure;
  onChange: (data: PageProjectProcedure) => void;
}

export function ProjectProcedureTab({ data, onChange }: Props) {
  const steps = data.steps ?? [];

  return (
    <div className="space-y-6 rounded-2xl border border-[#EAE2D5] bg-white p-6 shadow-xs">
      <div className="border-b border-[#EAE2D5] pb-4">
        <h2 className="text-sm font-bold uppercase text-[#9A1C1F]">
          Section 3: Quy trình hợp tác
        </h2>
        <p className="mt-1 text-xs text-[#695D56]">
          Tiêu đề và các bước thực hiện dự án.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ProjectTextField
          label="Nhãn nhỏ"
          value={data.eyebrow}
          onChange={(value) => onChange({ ...data, eyebrow: value })}
        />
        <ProjectTextField
          label="Tiêu đề"
          value={data.title}
          onChange={(value) => onChange({ ...data, title: value })}
        />
      </div>
      {steps.map((step, index) => (
        <div
          key={index}
          className="relative rounded-xl border border-[#EAE2D5] bg-[#FAF8F5] p-4 pt-12"
        >
          <RemoveItemButton
            label={`Xóa bước ${index + 1}`}
            onClick={() => onChange({ ...data, steps: steps.filter((_, i) => i !== index) })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <ProjectTextField
              label="Thứ tự"
              value={step.order}
              onChange={(value) =>
                onChange({
                  ...data,
                  steps: steps.map((entry, i) =>
                    i === index ? { ...entry, order: value } : entry,
                  ),
                })
              }
            />
            <IconSelect
              label="Tên icon"
              value={step.icon}
              onChange={(value) =>
                onChange({
                  ...data,
                  steps: steps.map((entry, i) =>
                    i === index ? { ...entry, icon: value } : entry,
                  ),
                })
              }
            />
            <ProjectTextField
              label="Tiêu đề bước"
              value={step.title}
              onChange={(value) =>
                onChange({
                  ...data,
                  steps: steps.map((entry, i) =>
                    i === index ? { ...entry, title: value } : entry,
                  ),
                })
              }
            />
            <ProjectTextField
              label="Giá trị / thời gian"
              value={step.value}
              onChange={(value) =>
                onChange({
                  ...data,
                  steps: steps.map((entry, i) =>
                    i === index ? { ...entry, value } : entry,
                  ),
                })
              }
            />
          </div>
          <div className="mt-4">
            <ProjectTextField
              multiline
              label="Mô tả"
              value={step.description}
              onChange={(value) =>
                onChange({
                  ...data,
                  steps: steps.map((entry, i) =>
                    i === index ? { ...entry, description: value } : entry,
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
          onChange({
            ...data,
            steps: [
              ...steps,
              {
                order: String(steps.length + 1).padStart(2, "0"),
                icon: "",
                title: "",
                description: "",
                value: "",
              },
            ],
          })
        }
        className="inline-flex items-center gap-2 rounded-xl border border-[#EAE2D5] px-4 py-2.5 text-xs font-bold text-[#9A1C1F]"
      >
        <Plus className="h-4 w-4" /> Thêm bước
      </button>
    </div>
  );
}
