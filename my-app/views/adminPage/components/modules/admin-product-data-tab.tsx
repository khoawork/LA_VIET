"use client";

import { useEffect, useState, type SubmitEvent } from "react";
import { Edit, Loader2, Search, Trash2, X } from "lucide-react";

interface ProductCategory {
  id: number;
  name: string;
}

interface ProductItem {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  categoryId: number;
  category: { name: string };
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
  isTechnicalSpec: boolean;
}

function productProps(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function textProp(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function emptyForm(categoryId = 0): ProductForm {
  return {
    name: "", title: "", description: "", image: "", slug: "", categoryId,
    dimension: "", material: "", badge: "", badgeColor: "", yearOrSpec: "",
    isTechnicalSpec: false,
  };
}

function productForm(product: ProductItem | null, categories: ProductCategory[]): ProductForm {
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
    isTechnicalSpec: props.isTechnicalSpec === true,
  };
}

function makeSlug(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function responseError(response: Response): Promise<string> {
  const body = await response.json().catch(() => null);
  const issue = body?.errors?.[0];
  return issue ? `${issue.field}: ${issue.message}` : body?.message || "Không thể xử lý sản phẩm.";
}

const inputClass = "w-full rounded-xl border border-[#EAE2D5] px-3.5 py-2.5 text-xs text-[#1E1917] focus:border-[#9A1C1F] focus:outline-none";

function ProductFormModal({ product, categories, onClose, onSaved }: {
  product: ProductItem | null;
  categories: ProductCategory[];
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const [form, setForm] = useState<ProductForm>(() => productForm(product, categories));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch(product ? `/api/products/${product.id}` : "/api/products", {
        method: product ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          title: form.title.trim(),
          description: form.description.trim(),
          image: form.image.trim(),
          slug: form.slug.trim(),
          categoryId: form.categoryId,
          props: {
            ...productProps(product?.props),
            dimension: form.dimension.trim(),
            material: form.material.trim(),
            badge: form.badge.trim(),
            badgeColor: form.badgeColor.trim(),
            yearOrSpec: form.yearOrSpec.trim(),
            isTechnicalSpec: form.isTechnicalSpec,
          },
        }),
      });
      if (!response.ok) throw new Error(await responseError(response));
      onSaved(product ? "Đã cập nhật sản phẩm thành công." : "Đã tạo sản phẩm thành công.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Không thể lưu sản phẩm.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#EAE2D5] p-5">
          <h2 className="text-lg font-bold text-[#1E1917]">{product ? "Sửa sản phẩm" : "Tạo sản phẩm mới"}</h2>
          <button type="button" onClick={onClose} aria-label="Đóng" className="text-stone-500 hover:text-[#9A1C1F]"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto p-6">
          {error && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-xs text-rose-700">{error}</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-xs font-semibold">Tên sản phẩm *
              <input required maxLength={100} value={form.name} onChange={(event) => {
                const name = event.target.value;
                setForm((current) => ({
                  ...current,
                  name,
                  slug: !product && current.slug === makeSlug(current.name)
                    ? makeSlug(name)
                    : current.slug,
                }));
              }} className={inputClass} />
            </label>
            <label className="space-y-1.5 text-xs font-semibold">Đường dẫn (slug) *
              <input required maxLength={250} value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} className={inputClass} />
            </label>
            <label className="space-y-1.5 text-xs font-semibold">Danh mục *
              <select required value={form.categoryId || ""} onChange={(event) => setForm({ ...form, categoryId: Number(event.target.value) })} className={inputClass}>
                <option value="">Chọn danh mục</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
            </label>
            <label className="space-y-1.5 text-xs font-semibold">Tiêu đề phụ
              <input maxLength={100} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className={inputClass} />
            </label>
            <label className="space-y-1.5 text-xs font-semibold sm:col-span-2">URL ảnh *
              <input required type="url" value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} className={inputClass} />
            </label>
            <label className="space-y-1.5 text-xs font-semibold sm:col-span-2">Mô tả
              <textarea rows={3} maxLength={1000} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className={inputClass} />
            </label>
            {([
              ["dimension", "Kích thước"], ["material", "Chất liệu"], ["badge", "Nhãn hiển thị"],
              ["badgeColor", "Màu nhãn"], ["yearOrSpec", "Năm / thông số"],
            ] as const).map(([field, label]) => (
              <label key={field} className="space-y-1.5 text-xs font-semibold">{label}
                <input value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className={inputClass} />
              </label>
            ))}
            <label className="flex items-center gap-2 text-xs font-semibold">
              <input type="checkbox" checked={form.isTechnicalSpec} onChange={(event) => setForm({ ...form, isTechnicalSpec: event.target.checked })} />
              Hiển thị như thông số kỹ thuật
            </label>
          </div>
          <div className="flex justify-end gap-3 border-t border-[#EAE2D5] pt-4">
            <button type="button" onClick={onClose} className="rounded-xl border border-[#EAE2D5] px-4 py-2.5 text-xs font-semibold">Hủy</button>
            <button type="submit" disabled={saving || categories.length === 0} className="inline-flex items-center gap-2 rounded-xl bg-[#a21f1f] px-5 py-2.5 text-xs font-bold text-white disabled:opacity-50">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}{product ? "Lưu thay đổi" : "Tạo sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AdminProductDataTab({ categories, createOpen, onCloseCreate }: {
  categories: ProductCategory[];
  createOpen: boolean;
  onCloseCreate: () => void;
}) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    fetch("/api/products", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error(await responseError(response));
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Dữ liệu sản phẩm không hợp lệ.");
        if (mounted) { setProducts(data); setError(""); }
      })
      .catch((cause: unknown) => {
        if (mounted) setError(cause instanceof Error ? cause.message : "Không thể tải sản phẩm.");
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [refresh]);

  const filtered = products.filter((product) =>
    (!categoryId || product.categoryId === Number(categoryId)) &&
    `${product.name} ${product.title} ${product.description}`.toLowerCase().includes(search.toLowerCase().trim()),
  );
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleProducts = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  async function handleDelete(product: ProductItem) {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`)) return;
    setDeletingId(product.id);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(await responseError(response));
      setMessage(`Đã xóa sản phẩm "${product.name}" thành công.`);
      setLoading(true);
      if (visibleProducts.length === 1 && currentPage > 1) setPage(currentPage - 1);
      setRefresh((value) => value + 1);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Không thể xóa sản phẩm.");
    } finally {
      setDeletingId(null);
    }
  }

  function handleSaved(savedMessage: string) {
    setEditingProduct(null);
    onCloseCreate();
    setMessage(savedMessage);
    setLoading(true);
    setRefresh((value) => value + 1);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
      {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
      {message && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">{message}</p>}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Tìm sản phẩm theo tên, tiêu đề, mô tả..." className="w-full rounded-xl border border-[#f3e9db] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#a21f1f] focus:outline-none" />
        </div>
        <select value={categoryId} onChange={(event) => { setCategoryId(event.target.value); setPage(1); }} className="rounded-xl border border-[#f3e9db] bg-white px-4 py-2.5 text-sm font-semibold">
          <option value="">Tất cả danh mục sản phẩm</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </div>
      <div className="min-h-0 flex-1 overflow-auto rounded-2xl border border-[#f3e9db] bg-white shadow-xs">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-stone-500"><Loader2 className="h-5 w-5 animate-spin" /> Đang tải sản phẩm...</div>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-stone-500">Chưa có sản phẩm phù hợp. Bấm nút &quot;Tạo sản phẩm mới&quot; ở trên để thêm sản phẩm.</p>
        ) : (
          <table className="w-full min-w-[960px] table-fixed text-left text-sm">
            <thead className="border-b border-[#f3e9db] bg-[#f7f5f1] text-stone-700">
              <tr>
                <th className="w-80 whitespace-nowrap px-5 py-3">Sản phẩm</th>
                <th className="w-64 whitespace-nowrap px-4 py-3">Danh mục</th>
                <th className="whitespace-nowrap px-4 py-3">Mô tả</th>
                <th className="w-48 min-w-48 px-4 py-3">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-center">Thao tác</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3e9db]">
              {visibleProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-5 py-3"><div className="flex min-w-0 items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt="" className="h-12 w-14 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1"><span className="block truncate font-bold text-[#1E1917]" title={product.name}>{product.name}</span><span className="block truncate text-xs text-stone-500">#{product.id} · /{product.slug}</span></div>
                  </div></td>
                  <td className="px-4 py-3 text-stone-600"><span className="block truncate" title={product.category.name}>{product.category.name}</span></td>
                  <td className="px-4 py-3 text-stone-600"><span className="block truncate" title={product.description}>{product.description}</span></td>
                  <td className="w-48 min-w-48 whitespace-nowrap px-4 py-3">
                    <div className="grid grid-cols-2 gap-1">
                      <button type="button" disabled={deletingId === product.id} onClick={() => { setEditingProduct(product); setMessage(""); }} className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 font-semibold text-[#9A1C1F] hover:bg-[#FAF1EC] disabled:opacity-50" aria-label={`Sửa sản phẩm ${product.name}`}><Edit className="h-4 w-4" /> Sửa</button>
                      <button type="button" disabled={deletingId === product.id} onClick={() => handleDelete(product)} className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50" aria-label={`Xóa sản phẩm ${product.name}`}>
                        {deletingId === product.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex shrink-0 items-center justify-between text-sm text-stone-600">
        <span>Trang {currentPage}/{totalPages}</span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={loading || currentPage <= 1}
            onClick={() => setPage(currentPage - 1)}
            className="rounded-lg border border-[#f3e9db] bg-white px-3 py-2 disabled:opacity-50"
          >
            Trước
          </button>
          <button
            type="button"
            disabled={loading || currentPage >= totalPages}
            onClick={() => setPage(currentPage + 1)}
            className="rounded-lg border border-[#f3e9db] bg-white px-3 py-2 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>
      {(createOpen || editingProduct) && (
        <ProductFormModal
          key={createOpen ? "new" : editingProduct?.id}
          product={createOpen ? null : editingProduct}
          categories={categories}
          onClose={() => { setEditingProduct(null); onCloseCreate(); }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
