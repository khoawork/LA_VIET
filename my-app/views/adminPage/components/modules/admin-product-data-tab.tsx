"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import { createPortal } from "react-dom";
import { Edit, Loader2, Search, Trash2, X } from "lucide-react";
import { CategoryFilterSelect } from "./category-filter-select";
import { PagePagination } from "@/shared/components/page-pagination";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";
import { ProjectQuantityColorPicker } from "./projects/project-quantity-color-picker";
import { ImageUploadField } from "./image-upload-field";
import {
  deleteManagedImageByUrl,
  saveWithImage,
} from "../../services/image-upload.service";

interface ProductCategory {
  id: number;
  name: string;
}

interface ProductListItem {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
  category: { name: string };
}

interface ProductItem extends ProductListItem {
  title: string;
  categoryId: number;
  props: unknown;
}

interface ProductForm {
  name: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  categoryId: number;
  dimension: string;
  material: string;
  badge: string;
  badgeColor: string;
  yearOrSpec: string;
  buttonLabel: string;
}

function productProps(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function textProp(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function badgeColorValue(value: string): string {
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value;
  return value === "dark" ? "#2B1F1A" : "#B71C1C";
}

function emptyForm(categoryId = 0): ProductForm {
  return {
    name: "",
    title: "",
    description: "",
    image: "",
    slug: "",
    categoryId,
    dimension: "",
    material: "",
    badge: "",
    badgeColor: "",
    yearOrSpec: "",
    buttonLabel: "CHI TIẾT TÁC PHẨM",
  };
}

function productForm(
  product: ProductItem | null,
  categories: ProductCategory[],
): ProductForm {
  if (!product) return emptyForm(categories[0]?.id ?? 0);
  const props = productProps(product.props);
  return {
    name: product.name,
    title: product.title,
    description: product.description,
    image: product.image,
    slug: product.slug,
    categoryId: product.categoryId,
    dimension: textProp(props.dimension),
    material: textProp(props.material),
    badge: textProp(props.badge),
    badgeColor: textProp(props.badgeColor),
    yearOrSpec: textProp(props.yearOrSpec),
    buttonLabel:
      textProp(props.buttonLabel).trim() ||
      (props.isTechnicalSpec === true
        ? "XEM THÔNG SỐ KỸ THUẬT"
        : "CHI TIẾT TÁC PHẨM"),
  };
}

function makeSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function responseError(response: Response): Promise<string> {
  const body = await response.json().catch(() => null);
  const issue = Array.isArray(body?.errors) ? body.errors[0] : null;
  if (issue && typeof issue.message === "string") {
    return issue.field ? `${issue.field}: ${issue.message}` : issue.message;
  }
  return body?.message || "Không thể xử lý sản phẩm.";
}

const inputClass =
  "w-full rounded-xl border border-[#d9c7ae] px-3.5 py-2.5 text-xs font-normal text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none";

function ProductFormModal({
  product,
  categories,
  onClose,
  onSaved,
}: {
  product: ProductItem | null;
  categories: ProductCategory[];
  onClose: () => void;
  onSaved: (message: string, cleanupWarning?: string | null, updated?: ProductItem | null) => void;
}) {
  const [form, setForm] = useState<ProductForm>(() =>
    productForm(product, categories),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      let updatedProduct: ProductItem | null = null;
      const { cleanupWarning } = await saveWithImage({
        file: imageFile,
        currentUrl: product?.image,
        imageUrl: form.image,
        save: async (image) => {
          const existingProps = { ...productProps(product?.props) };
          delete existingProps.isTechnicalSpec;
          const response = await fetch(
            product ? `/api/products/${product.id}` : "/api/products",
            {
              method: product ? "PUT" : "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: form.name.trim(),
                title: form.title.trim(),
                description: form.description.trim(),
                image,
                slug: form.slug.trim(),
                categoryId: form.categoryId,
                props: {
                  ...existingProps,
                  dimension: form.dimension.trim(),
                  material: form.material.trim(),
                  badge: form.badge.trim(),
                  badgeColor: form.badgeColor.trim(),
                  yearOrSpec: form.yearOrSpec.trim(),
                  buttonLabel: form.buttonLabel.trim(),
                },
              }),
            },
          );
          if (!response.ok) throw new Error(await responseError(response));
          if (product) {
            const result = await response.json().catch(() => null);
            if (result?.id === product.id) updatedProduct = result as ProductItem;
          }
        },
      });
      onSaved(
        product
          ? "Đã cập nhật sản phẩm thành công."
          : "Đã tạo sản phẩm thành công.",
        cleanupWarning,
        updatedProduct,
      );
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Không thể lưu sản phẩm.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 lg:pl-[calc(var(--admin-sidebar-width)+1rem)] [&_label]:text-sm [&_input]:text-sm [&_input]:font-normal [&_textarea]:text-sm [&_textarea]:font-normal [&_button]:text-sm [&_p]:text-sm">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#d9c7ae] p-5">
          <h2 className="text-xl font-bold text-[#1E1917]">
            {product ? "Sửa sản phẩm" : "Tạo sản phẩm mới"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="text-stone-500 hover:text-[#9A1C1F]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto p-6">
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-rose-50 p-3 text-xs text-rose-700"
            >
              {error}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-xs font-semibold">
              Tên sản phẩm <span className="text-red-600">*</span>
              <input
                required
                maxLength={100}
                value={form.name}
                onChange={(event) => {
                  const name = event.target.value;
                  setForm((current) => ({
                    ...current,
                    name,
                    slug:
                      !product && current.slug === makeSlug(current.name)
                        ? makeSlug(name)
                        : current.slug,
                  }));
                }}
                className={inputClass}
              />
            </label>
            <label className="space-y-1.5 text-xs font-semibold">
              Đường dẫn (slug) <span className="text-red-600">*</span>
              <input
                required
                maxLength={250}
                value={form.slug}
                onChange={(event) =>
                  setForm({ ...form, slug: event.target.value })
                }
                className={inputClass}
              />
            </label>
            <div className="space-y-1.5 text-sm font-semibold">
              <span>
                Danh mục <span className="text-red-600">*</span>
              </span>
              <CategoryFilterSelect
                label="Chọn danh mục sản phẩm"
                value={String(form.categoryId || "")}
                options={categories}
                onChange={(value) =>
                  setForm({ ...form, categoryId: Number(value) })
                }
                emptyLabel="Chọn danh mục"
                includeEmpty={false}
                fullWidth
                formField
              />
            </div>
            <label className="space-y-1.5 text-xs font-semibold">
              Tiêu đề phụ
              <input
                maxLength={100}
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                className={inputClass}
              />
            </label>
            <div className="sm:col-span-2">
              <ImageUploadField
                label="Hình ảnh sản phẩm"
                value={form.image}
                file={imageFile}
                onUrlChange={(image) =>
                  setForm((current) => ({ ...current, image }))
                }
                onFileChange={setImageFile}
              />
            </div>
            <label className="space-y-1.5 text-xs font-semibold sm:col-span-2">
              Mô tả
              <textarea
                rows={3}
                maxLength={1000}
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                className={inputClass}
              />
            </label>
            {(
              [
                ["dimension", "Kích thước"],
                ["material", "Chất liệu"],
                ["badge", "Nhãn hiển thị"],
              ] as const
            ).map(([field, label]) => (
              <label key={field} className="space-y-1.5 text-xs font-semibold">
                {label}
                <input
                  value={form[field]}
                  onChange={(event) =>
                    setForm({ ...form, [field]: event.target.value })
                  }
                  className={inputClass}
                />
              </label>
            ))}
            <ProjectQuantityColorPicker
              label="Màu nhãn"
              value={badgeColorValue(form.badgeColor)}
              onChange={(value) =>
                setForm((current) => ({ ...current, badgeColor: value ?? "" }))
              }
              inline
              clearable={false}
            />
            <label className="space-y-1.5 text-xs font-semibold">
              Năm / thông số
              <input
                value={form.yearOrSpec}
                onChange={(event) =>
                  setForm({ ...form, yearOrSpec: event.target.value })
                }
                className={inputClass}
              />
            </label>
            <label className="space-y-1.5 text-xs font-semibold">
              Chữ trên nút <span className="text-red-600">*</span>
              <input
                required
                maxLength={80}
                value={form.buttonLabel}
                onChange={(event) =>
                  setForm({ ...form, buttonLabel: event.target.value })
                }
                placeholder="Ví dụ: XEM THÔNG SỐ KỸ THUẬT"
                className={inputClass}
              />
            </label>
          </div>
          <div className="flex justify-end gap-3 border-t border-[#d9c7ae] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#d9c7ae] px-4 py-2.5 text-xs font-semibold"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving || categories.length === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-[#a21f1f] px-5 py-2.5 text-xs font-bold text-white disabled:opacity-50"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {product ? "Lưu thay đổi" : "Tạo sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AdminProductDataTab({
  active,
  categories,
  filterHost,
  createOpen,
  onCloseCreate,
}: {
  active: boolean;
  categories: ProductCategory[];
  filterHost: HTMLDivElement | null;
  createOpen: boolean;
  onCloseCreate: () => void;
}) {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search.trim().toLowerCase(), 500);
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchPending = search.trim().toLowerCase() !== debouncedSearch;
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(
    null,
  );
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [cleanupWarning, setCleanupWarning] = useState("");

  useEffect(() => {
    if (searchPending) return;
    const controller = new AbortController();
    const params = new URLSearchParams({ page: String(page), limit: "10" });
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (categoryId) params.set("categoryId", categoryId);

    fetch(`/api/products?${params}`, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(await responseError(response));
        const result = await response.json();
        if (!result.success || !Array.isArray(result.data) || !result.meta)
          throw new Error("Dữ liệu sản phẩm không hợp lệ.");
        if (!controller.signal.aborted) {
          if (page > result.meta.totalPages) {
            setPage(result.meta.totalPages);
            return;
          }
          setProducts(result.data);
          setTotalPages(result.meta.totalPages);
          setError("");
        }
      })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted)
          setError(
            cause instanceof Error ? cause.message : "Không thể tải sản phẩm.",
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [page, debouncedSearch, searchPending, categoryId, refresh]);

  const visibleProducts = products;

  async function openEdit(id: number) {
    setLoadingProductId(id);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`/api/products/${id}`, { cache: "no-store" });
      if (!response.ok) throw new Error(await responseError(response));
      const product = await response.json() as ProductItem;
      if (product?.id !== id) throw new Error("Dữ liệu sản phẩm không hợp lệ.");
      setEditingProduct(product);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Không thể tải sản phẩm.");
    } finally {
      setLoadingProductId(null);
    }
  }

  async function handleDelete(product: ProductListItem) {
    if (
      !window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`)
    )
      return;
    setDeletingId(product.id);
    setError("");
    setMessage("");
    setCleanupWarning("");
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(await responseError(response));
      try {
        await deleteManagedImageByUrl(product.image);
      } catch (cleanupError) {
        setCleanupWarning(
          `Đã xóa sản phẩm nhưng chưa xóa được ảnh: ${cleanupError instanceof Error ? cleanupError.message : "Lỗi không xác định"}`,
        );
      }
      setMessage(`Đã xóa sản phẩm "${product.name}" thành công.`);
      setLoading(true);
      if (visibleProducts.length === 1 && page > 1)
        setPage(page - 1);
      else setRefresh((value) => value + 1);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Không thể xóa sản phẩm.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  function handleSaved(savedMessage: string, warning?: string | null, updated?: ProductItem | null) {
    const original = editingProduct;
    setEditingProduct(null);
    onCloseCreate();
    setMessage(savedMessage);
    setCleanupWarning(
      warning ? `Đã lưu sản phẩm nhưng chưa xóa được ảnh cũ: ${warning}` : "",
    );
    if (!original) {
      setLoading(true);
      setRefresh((value) => value + 1);
      return;
    }

    if (!updated) {
      setRefresh((value) => value + 1);
      return;
    }

    setProducts((items) => {
      let changed = false;
      const next = items.map((item) => {
        if (item.id !== updated.id) return item;
        if (
          item.name === updated.name &&
          item.description === updated.description &&
          item.image === updated.image &&
          item.slug === updated.slug &&
          item.category.name === updated.category.name
        ) return item;
        changed = true;
        return {
          ...item,
          name: updated.name,
          description: updated.description,
          image: updated.image,
          slug: updated.slug,
          category: updated.category,
        };
      });
      return changed ? next : items;
    });

    if (
      (categoryId && updated.categoryId !== Number(categoryId)) ||
      (debouncedSearch && (
        original.name !== updated.name ||
        original.title !== updated.title ||
        original.description !== updated.description
      ))
    ) {
      setRefresh((value) => value + 1);
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
        >
          {error}
        </p>
      )}
      {message && (
        <p
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
        >
          {message}
        </p>
      )}
      {cleanupWarning && (
        <p
          role="alert"
          className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
        >
          {cleanupWarning}
        </p>
      )}
      {active && filterHost &&
        createPortal(
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] sm:gap-3">
            <div className="relative min-w-0">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                  if (event.target.value.trim().toLowerCase() !== debouncedSearch) setLoading(true);
                }}
                placeholder="Tìm sản phẩm theo tên, tiêu đề, mô tả..."
                className="w-full rounded-xl border border-[#e2d3bf] bg-white py-2 pl-10 pr-4 text-sm focus:border-[#a21f1f] focus:outline-none sm:py-2.5"
              />
            </div>
            <CategoryFilterSelect
              label="Lọc danh mục sản phẩm"
              value={categoryId}
              options={categories}
              fullWidth
              onChange={(value) => {
                setCategoryId(value);
                setPage(1);
                setLoading(true);
              }}
            />
          </div>,
          filterHost,
        )}
      <div className="min-h-0 flex-1 overflow-auto rounded-2xl border border-[#e2d3bf] bg-white shadow-xs">
        {loading || searchPending ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-stone-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Đang tải sản phẩm...
          </div>
        ) : visibleProducts.length === 0 ? (
          <p className="py-16 text-center text-sm text-stone-500">
            Chưa có sản phẩm phù hợp.
          </p>
        ) : (
          <table className="w-full min-w-[960px] table-fixed text-left text-sm">
            <thead className="border-b border-[#e2d3bf] bg-[#f7f5f1] text-stone-700">
              <tr>
                <th className="w-80 whitespace-nowrap px-5 py-2.5 sm:py-3">
                  Sản phẩm
                </th>
                <th className="w-64 whitespace-nowrap px-4 py-2.5 sm:py-3">
                  Danh mục
                </th>
                <th className="whitespace-nowrap px-4 py-2.5 sm:py-3">Mô tả</th>
                <th className="w-48 min-w-48 px-4 py-2.5 sm:py-3">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-center">Thao tác</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3e9db]">
              {visibleProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-5 py-2 sm:py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt=""
                        className="h-9 w-11 shrink-0 rounded-lg object-cover sm:h-12 sm:w-14"
                      />
                      <div className="min-w-0 flex-1">
                        <span
                          className="block truncate font-bold text-[#1E1917]"
                          title={product.name}
                        >
                          {product.name}
                        </span>
                        <span className="block truncate text-xs text-stone-500">
                          #{product.id} · /{product.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-stone-600 sm:py-3">
                    <span
                      className="block truncate"
                      title={product.category.name}
                    >
                      {product.category.name}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-stone-600 sm:py-3">
                    <span
                      className="block truncate"
                      title={product.description}
                    >
                      {product.description}
                    </span>
                  </td>
                  <td className="w-48 min-w-48 whitespace-nowrap px-4 py-2 sm:py-3">
                    <div className="grid grid-cols-2 gap-1">
                      <button
                        type="button"
                        disabled={deletingId === product.id || loadingProductId === product.id}
                        onClick={() => void openEdit(product.id)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 font-semibold text-[#9A1C1F] hover:bg-[#FAF1EC] disabled:opacity-50"
                        aria-label={`Sửa sản phẩm ${product.name}`}
                      >
                        {loadingProductId === product.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Edit className="h-4 w-4" />
                        )} Sửa
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === product.id || loadingProductId === product.id}
                        onClick={() => handleDelete(product)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                        aria-label={`Xóa sản phẩm ${product.name}`}
                      >
                        {deletingId === product.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}{" "}
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <PagePagination
        page={page}
        totalPages={totalPages}
        disabled={loading || searchPending}
        onPageChange={(nextPage) => {
          if (nextPage === page) return;
          setPage(nextPage);
          setLoading(true);
        }}
      />
      {(createOpen || editingProduct) && (
        <ProductFormModal
          key={createOpen ? "new" : editingProduct?.id}
          product={createOpen ? null : editingProduct}
          categories={categories}
          onClose={() => {
            setEditingProduct(null);
            onCloseCreate();
          }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
