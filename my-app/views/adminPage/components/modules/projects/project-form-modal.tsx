import { useState, type FormEvent } from "react";
import { Loader2, X } from "lucide-react";
import {
  createProject,
  updateProject,
} from "../../../services/projects/page-project.service";
import type {
  ProjectCategory,
  ProjectDetail,
  ProjectFormData,
} from "../../../types/projects/project-data.type";
import { CategoryFilterSelect } from "../category-filter-select";
import { ImageUploadField } from "../image-upload-field";
import { saveWithImage } from "../../../services/image-upload.service";

interface ProjectFormModalProps {
  categories: ProjectCategory[];
  project: ProjectDetail | null;
  onClose: () => void;
  onSaved: (updated: ProjectDetail | null, cleanupWarning?: string | null) => void;
}

const inputClass =
  "w-full rounded-xl border border-[#d9c7ae] px-3.5 py-2.5 text-xs font-normal text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none";

export function ProjectFormModal({
  categories,
  project,
  onClose,
  onSaved,
}: ProjectFormModalProps) {
  const [form, setForm] = useState<ProjectFormData>({
    name: project?.name ?? "",
    slug: project?.slug ?? "",
    image: project?.image ?? "",
    categoryId: project?.categoryId ?? categories[0]?.id ?? 0,
    location: project?.location ?? "",
    caption: project?.caption ?? "",
    description: project?.description ?? "",
    material: project?.material ?? "",
    scale: project?.scale ?? "",
    button: project?.button ?? "Xem chi tiết",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      let updatedProject: ProjectDetail | null = null;
      const { cleanupWarning } = await saveWithImage({
        file: imageFile,
        currentUrl: project?.image,
        imageUrl: form.image,
        save: async (image) => {
          const data = { ...form, image, name: form.name.trim(), slug: form.slug.trim() };
          if (project) updatedProject = await updateProject(project.id, data);
          else await createProject(data);
        },
      });
      onSaved(updatedProject, cleanupWarning);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể lưu dự án.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 lg:pl-[calc(var(--admin-sidebar-width)+1rem)] [&_label]:text-sm [&_input]:text-sm [&_input]:font-normal [&_textarea]:text-sm [&_textarea]:font-normal [&_button]:text-sm [&_p]:text-sm">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#d9c7ae] p-5">
          <h2 className="text-xl font-bold text-[#1E1917]">
            {project ? "Chỉnh sửa dự án" : "Tạo dự án mới"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="cursor-pointer rounded-lg p-1 text-stone-500 transition-colors hover:bg-[#FAF1EC] hover:text-[#9A1C1F]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-rose-50 p-3 text-xs text-rose-700"
            >
              {error}
            </p>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1.5 text-xs font-semibold">
              Tên dự án <span className="text-red-600">*</span>
              <input
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="space-y-1.5 text-xs font-semibold">
              Slug <span className="text-red-600">*</span>
              <input
                required
                maxLength={250}
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className={inputClass}
              />
            </label>
            <div className="space-y-1.5 text-sm font-semibold">
              <span>Danh mục <span className="text-red-600">*</span></span>
              <CategoryFilterSelect
                label="Chọn danh mục dự án"
                value={String(form.categoryId || "")}
                options={categories}
                onChange={(value) => setForm({ ...form, categoryId: Number(value) })}
                emptyLabel="Chọn danh mục"
                includeEmpty={false}
                fullWidth
                formField
              />
            </div>
            <label className="space-y-1.5 text-xs font-semibold">
              Địa điểm
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={inputClass}
              />
            </label>
            <div className="md:col-span-2">
              <ImageUploadField
                label="Hình ảnh dự án"
                value={form.image}
                file={imageFile}
                onUrlChange={(image) => setForm((current) => ({ ...current, image }))}
                onFileChange={setImageFile}
              />
            </div>
            <label className="space-y-1.5 text-xs font-semibold md:col-span-2">
              Caption
              <input
                maxLength={500}
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="space-y-1.5 text-xs font-semibold md:col-span-2">
              Mô tả
              <textarea
                rows={3}
                maxLength={1000}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className={inputClass}
              />
            </label>
            <label className="space-y-1.5 text-xs font-semibold">
              Chất liệu
              <input
                maxLength={500}
                value={form.material}
                onChange={(e) => setForm({ ...form, material: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="space-y-1.5 text-xs font-semibold">
              Quy mô
              <input
                maxLength={100}
                value={form.scale}
                onChange={(e) => setForm({ ...form, scale: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="space-y-1.5 text-xs font-semibold md:col-span-2">
              Chữ trên nút
              <input
                maxLength={100}
                value={form.button}
                onChange={(e) => setForm({ ...form, button: e.target.value })}
                className={inputClass}
              />
            </label>
          </div>
          <div className="flex justify-end gap-3 border-t border-[#d9c7ae] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-[#d9c7ae] px-5 py-2.5 text-xs font-semibold transition-colors hover:border-[#9A1C1F]/40 hover:bg-[#FAF8F5]"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving || categories.length === 0}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#9A1C1F] px-5 py-2.5 text-xs font-bold text-white transition-colors enabled:hover:bg-[#7D171A] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {project ? "Lưu thay đổi" : "Tạo dự án"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
