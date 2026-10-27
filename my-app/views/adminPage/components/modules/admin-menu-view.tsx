"use client";

import { useEffect, useState, useRef } from "react";
import {
  Menu,
  Save,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Edit2,
  Check,
  X,
  Loader2,
} from "lucide-react";
import type { MenuItemType } from "@/shared/schema/menu.schema";

export function AdminMenuView() {
  const [items, setItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Drag and Drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Editing state for item
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editPath, setEditPath] = useState("");

  // New item modal/inline state
  const [isAdding, setIsAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newPath, setNewPath] = useState("");

  // Fetch initial menu items from API
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/menu");
      const json = await res.json();
      if (res.ok && json?.success && Array.isArray(json?.data)) {
        setItems(json.data);
      } else {
        setItems([]);
        setAlert({ type: "error", message: "Không thể tải danh sách menu." });
      }
    } catch {
      setItems([]);
      setAlert({ type: "error", message: "Không thể tải danh sách menu." });
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  // Reorder: Move Up
  const moveUp = (index: number) => {
    if (index <= 0) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    setItems(newItems.map((item, idx) => ({ ...item, order: idx + 1 })));
  };

  // Reorder: Move Down
  const moveDown = (index: number) => {
    if (index >= items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    setItems(newItems.map((item, idx) => ({ ...item, order: idx + 1 })));
  };

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    setItems(newItems.map((item, idx) => ({ ...item, order: idx + 1 })));
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Toggle Visibility Status
  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Hiển thị" ? "Ẩn" : "Hiển thị",
            }
          : item
      )
    );
  };

  // Start editing item
  const startEdit = (item: MenuItemType) => {
    setEditingId(item.id);
    setEditLabel(item.label);
    setEditPath(item.path);
  };

  // Save edit item
  const saveEdit = (id: string) => {
    if (!editLabel.trim() || !editPath.trim()) {
      showAlert("error", "Tên và đường dẫn không được để trống!");
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, label: editLabel.trim().toUpperCase(), path: editPath.trim() }
          : item
      )
    );
    setEditingId(null);
  };

  // Delete item
  const deleteItem = (id: string) => {
    if (items.length <= 1) {
      showAlert("error", "Menu phải có ít nhất 1 mục điều hướng!");
      return;
    }
    setItems((prev) =>
      prev
        .filter((item) => item.id !== id)
        .map((item, idx) => ({ ...item, order: idx + 1 }))
    );
  };

  // Add new item
  const handleAddNewItem = () => {
    if (!newLabel.trim() || !newPath.trim()) {
      showAlert("error", "Vui lòng nhập tên và đường dẫn cho mục mới!");
      return;
    }

    const newItem: MenuItemType = {
      id: `nav-${Date.now()}`,
      label: newLabel.trim().toUpperCase(),
      path: newPath.trim().startsWith("/") ? newPath.trim() : `/${newPath.trim()}`,
      status: "Hiển thị",
      order: items.length + 1,
    };

    setItems([...items, newItem]);
    setNewLabel("");
    setNewPath("");
    setIsAdding(false);
    showAlert("success", `Đã thêm mục điều hướng "${newItem.label}"`);
  };

  // Save Menu Order to Server
  const handleSaveMenu = async () => {
    try {
      setSaving(true);
      const res = await fetch("/api/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const json = await res.json().catch(() => null);

      if (res.ok && json?.success) {
        showAlert("success", "Đã lưu thành công thứ tự menu điều hướng!");
      } else {
        showAlert("error", json?.message || "Lỗi khi lưu thứ tự menu");
      }
    } catch (err: any) {
      showAlert("error", err?.message || "Không thể kết nối đến máy chủ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="space-y-6">
      {/* Alert Banner */}
      {alert && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl border text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200 ${
            alert.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {alert.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          )}
          <span className="flex-1">{alert.message}</span>
          <button
            type="button"
            onClick={() => setAlert(null)}
            className="text-stone-400 hover:text-stone-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#f7f5f1] text-[#a21f1f] flex items-center justify-center border border-[#f3e9db]">
            <Menu className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Hệ thống: Menu &amp; Điều hướng</h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Tùy ý kéo thả hoặc dùng nút mũi tên để sắp xếp thứ tự hiển thị các liên kết trên Header website
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#a21f1f]/30 bg-[#a21f1f]/5 hover:bg-[#a21f1f]/10 text-[#a21f1f] text-xs font-bold transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm mục</span>
          </button>

          <button
            type="button"
            disabled={saving || loading}
            onClick={handleSaveMenu}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] active:scale-95 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang lưu...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Lưu thay đổi</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Form thêm mới mục điều hướng (nếu mở) */}
      {isAdding && (
        <div className="bg-[#FAF8F5] rounded-2xl border border-[#a21f1f]/20 p-5 shadow-xs space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#a21f1f] uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              Thêm liên kết điều hướng mới
            </span>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                Tên hiển thị trên menu (Label):
              </label>
              <input
                type="text"
                placeholder="VD: KHUYẾN MÃI, BÁO GIÁ..."
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#f3e9db] bg-white text-xs font-normal uppercase focus:border-[#a21f1f] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                Đường dẫn liên kết (Path / URL):
              </label>
              <input
                type="text"
                placeholder="VD: /khuyen-mai hoặc https://..."
                value={newPath}
                onChange={(e) => setNewPath(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#f3e9db] bg-white text-xs font-mono focus:border-[#a21f1f] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3.5 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-100"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleAddNewItem}
              className="px-4 py-1.5 rounded-lg bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold"
            >
              Thêm vào danh sách
            </button>
          </div>
        </div>
      )}

      {/* Reorderable Menu List */}
      <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs p-6 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#f3e9db] text-xs font-bold text-stone-500 uppercase tracking-wider">
          <span>Thứ tự &amp; Tên điều hướng</span>
          <span>Thao tác sắp xếp &amp; Trạng thái</span>
        </div>

        {loading ? (
          <div className="py-12 flex items-center justify-center gap-2 text-stone-500 text-xs font-medium">
            <Loader2 className="w-5 h-5 animate-spin text-[#a21f1f]" />
            <span>Đang tải danh sách menu...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-stone-400 text-xs">
            Chưa có mục điều hướng nào. Nhấn &quot;Thêm mục&quot; để tạo.
          </div>
        ) : (
          items.map((item, index) => {
            const isEditing = editingId === item.id;
            const isDragging = draggedIndex === index;
            const isDragOver = dragOverIndex === index;

            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all select-none ${
                  isDragging
                    ? "opacity-40 border-dashed border-[#a21f1f] bg-stone-50 scale-[0.99]"
                    : isDragOver
                    ? "border-2 border-[#a21f1f] bg-[#FAF8F5] shadow-md"
                    : "bg-[#f7f5f1] border-[#f3e9db] hover:border-[#a21f1f]/40 hover:bg-white"
                }`}
              >
                {/* Left: Drag Handle, Number Badge, Title, Path */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="cursor-grab active:cursor-grabbing p-1 rounded-md text-stone-400 hover:text-[#a21f1f] hover:bg-stone-100 transition-colors"
                    title="Kéo thả để đổi vị trí"
                  >
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {/* Position Badge */}
                  <span className="w-7 h-7 shrink-0 rounded-full bg-white border border-[#f3e9db] flex items-center justify-center text-xs font-extrabold text-[#a21f1f] shadow-2xs">
                    {index + 1}
                  </span>

                  {isEditing ? (
                    <div className="flex items-center gap-2 flex-1 flex-wrap">
                      <input
                        type="text"
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        placeholder="Tên điều hướng..."
                        className="px-2.5 py-1 text-xs font-normal uppercase rounded border border-[#a21f1f] bg-white w-36"
                      />
                      <input
                        type="text"
                        value={editPath}
                        onChange={(e) => setEditPath(e.target.value)}
                        placeholder="Đường dẫn..."
                        className="px-2.5 py-1 text-xs font-mono rounded border border-[#a21f1f] bg-white flex-1 min-w-[140px]"
                      />
                      <button
                        type="button"
                        onClick={() => saveEdit(item.id)}
                        className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                        title="Lưu sửa đổi"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="p-1 rounded bg-stone-300 text-stone-700 hover:bg-stone-400"
                        title="Hủy"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-2 truncate">
                      <span className="text-xs font-bold text-[#1E1917] tracking-wider truncate">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-stone-500 font-mono truncate">
                        ({item.path})
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: Order Action Buttons (Up/Down), Status Toggle, Edit, Delete */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {/* Status Toggle Badge */}
                  <button
                    type="button"
                    onClick={() => toggleStatus(item.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                      item.status === "Hiển thị"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : "bg-stone-100 text-stone-500 border-stone-200 hover:bg-stone-200"
                    }`}
                    title="Nhấp để chuyển trạng thái Ẩn / Hiển thị"
                  >
                    {item.status === "Hiển thị" ? (
                      <>
                        <Eye className="w-3 h-3 text-emerald-600" />
                        <span>Hiển thị</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 text-stone-400" />
                        <span>Ẩn</span>
                      </>
                    )}
                  </button>

                  {/* Reorder Buttons (Up & Down) */}
                  <div className="flex items-center rounded-lg border border-[#f3e9db] bg-white overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveUp(index)}
                      className="p-1.5 hover:bg-[#f7f5f1] active:bg-[#a21f1f]/10 text-stone-600 hover:text-[#a21f1f] disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-stone-400 cursor-pointer transition-colors border-r border-[#f3e9db]"
                      title="Chuyển lên vị trí trước"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === items.length - 1}
                      onClick={() => moveDown(index)}
                      className="p-1.5 hover:bg-[#f7f5f1] active:bg-[#a21f1f]/10 text-stone-600 hover:text-[#a21f1f] disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-stone-400 cursor-pointer transition-colors"
                      title="Chuyển xuống vị trí sau"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Edit Item Info Button */}
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="p-1.5 rounded-lg border border-[#f3e9db] bg-white hover:bg-stone-50 text-stone-600 hover:text-[#a21f1f] transition-colors cursor-pointer"
                      title="Chỉnh sửa tên và đường dẫn"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Delete Item Button */}
                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    className="p-1.5 rounded-lg border border-[#f3e9db] bg-white hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Xóa mục này khỏi menu"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}

        {/* Tip / Guide Footer */}
        <div className="pt-3 border-t border-[#f3e9db] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-stone-500 gap-2">
          <span>
            💡 <strong>Mẹo:</strong> Bạn có thể nhấn trực tiếp vào nút mũi tên Lên/Xuống hoặc giữ biểu tượng 6 chấm (Grip) để kéo thả đến vị trí mong muốn.
          </span>
          <span className="font-semibold text-stone-600">
            Tổng cộng: {items.length} mục điều hướng
          </span>
        </div>
      </div>
    </div>
  );
}
