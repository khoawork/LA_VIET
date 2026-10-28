"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Users,
  Plus,
  ShieldCheck,
  ShieldAlert,
  Mail,
  Lock,
  Key,
  Trash2,
  Edit3,
  Search,
  RefreshCw,
  X,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  UserX,
  BadgeCheck,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";

interface UserItem {
  id: number;
  fullname: string;
  email: string;
  username: string | null;
  role: "ADMIN" | "MANAGER" | "USER";
  isActive: boolean;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CurrentUser {
  id: number;
  email: string;
  fullname: string;
  role: string;
}

export function AdminUsersView() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Bộ lọc & Tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Thông báo Toast
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<UserItem | null>(null);
  const [passwordTarget, setPasswordTarget] = useState<UserItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UserItem | null>(null);

  // Form states cho Tạo mới
  const [createForm, setCreateForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "MANAGER" as "ADMIN" | "MANAGER",
    isActive: true,
  });
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  // Form states cho Chỉnh sửa
  const [editForm, setEditForm] = useState({
    fullname: "",
    email: "",
    role: "MANAGER" as "ADMIN" | "MANAGER",
    isActive: true,
  });

  // Form states cho Đổi mật khẩu
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Tự ẩn toast sau 4 giây
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Tải danh sách user & user hiện tại
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Lấy thông tin user đăng nhập
      const meRes = await fetch("/api/auth/me");
      if (meRes.ok) {
        const meJson = await meRes.json();
        if (meJson.data?.user) {
          setCurrentUser(meJson.data.user);
        }
      }

      // 2. Lấy danh sách users
      const usersRes = await fetch("/api/users");
      const usersJson = await usersRes.json();
      if (usersRes.ok && usersJson.data) {
        setUsers(usersJson.data);
      } else {
        setToast({
          type: "error",
          message: usersJson.message || "Không thể tải danh sách tài khoản",
        });
      }
    } catch {
      setToast({
        type: "error",
        message: "Lỗi kết nối máy chủ khi tải danh sách tài khoản",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered users list
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        u.fullname.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.username && u.username.toLowerCase().includes(q));

      const matchRole =
        roleFilter === "ALL" || u.role === roleFilter;

      const matchStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && u.isActive) ||
        (statusFilter === "INACTIVE" && !u.isActive);

      return matchQuery && matchRole && matchStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Thống kê nhanh
  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) => u.role === "ADMIN").length;
    const managers = users.filter((u) => u.role === "MANAGER").length;
    const active = users.filter((u) => u.isActive).length;
    const inactive = total - active;
    return { total, admins, managers, active, inactive };
  }, [users]);

  // Xử lý tạo mới
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });

      const json = await res.json();
      if (!res.ok) {
        setToast({
          type: "error",
          message: json.message || "Tạo tài khoản thất bại",
        });
        return;
      }

      setToast({
        type: "success",
        message: `Đã tạo tài khoản "${json.data.email}" thành công`,
      });
      setIsCreateOpen(false);
      setCreateForm({
        fullname: "",
        email: "",
        password: "",
        role: "MANAGER",
        isActive: true,
      });
      fetchData();
    } catch {
      setToast({ type: "error", message: "Lỗi mạng khi tạo tài khoản" });
    } finally {
      setActionLoading(false);
    }
  };

  // Mở modal sửa
  const openEditModal = (user: UserItem) => {
    setEditTarget(user);
    setEditForm({
      fullname: user.fullname,
      email: user.email,
      role: (user.role === "ADMIN" ? "ADMIN" : "MANAGER") as "ADMIN" | "MANAGER",
      isActive: user.isActive,
    });
  };

  // Xử lý cập nhật thông tin
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/users/${editTarget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      const json = await res.json();
      if (!res.ok) {
        setToast({
          type: "error",
          message: json.message || "Cập nhật tài khoản thất bại",
        });
        return;
      }

      setToast({
        type: "success",
        message: "Cập nhật thông tin tài khoản thành công",
      });
      setEditTarget(null);
      fetchData();
    } catch {
      setToast({ type: "error", message: "Lỗi kết nối khi cập nhật tài khoản" });
    } finally {
      setActionLoading(false);
    }
  };

  // Xử lý đổi mật khẩu
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordTarget) return;

    if (passwordForm.newPassword.length < 6) {
      setToast({
        type: "error",
        message: "Mật khẩu mới phải có ít nhất 6 ký tự",
      });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setToast({
        type: "error",
        message: "Mật khẩu xác nhận không khớp",
      });
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch(`/api/users/${passwordTarget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordForm.newPassword }),
      });

      const json = await res.json();
      if (!res.ok) {
        setToast({
          type: "error",
          message: json.message || "Đổi mật khẩu thất bại",
        });
        return;
      }

      setToast({
        type: "success",
        message: `Đã đổi mật khẩu cho tài khoản ${passwordTarget.email}`,
      });
      setPasswordTarget(null);
      setPasswordForm({ newPassword: "", confirmPassword: "" });
    } catch {
      setToast({ type: "error", message: "Lỗi kết nối khi đổi mật khẩu" });
    } finally {
      setActionLoading(false);
    }
  };

  // Nhanh: Bật / Tắt trạng thái hoạt động
  const handleToggleActive = async (user: UserItem) => {
    if (currentUser?.id === user.id) {
      setToast({
        type: "error",
        message: "Bạn không thể tự vô hiệu hóa tài khoản của chính mình",
      });
      return;
    }

    try {
      const newStatus = !user.isActive;
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });

      const json = await res.json();
      if (!res.ok) {
        setToast({
          type: "error",
          message: json.message || "Thao tác thay đổi trạng thái thất bại",
        });
        return;
      }

      setToast({
        type: "success",
        message: newStatus
          ? `Đã kích hoạt tài khoản ${user.email}`
          : `Đã tạm khóa tài khoản ${user.email}`,
      });
      fetchData();
    } catch {
      setToast({ type: "error", message: "Lỗi kết nối khi cập nhật trạng thái" });
    }
  };

  // Xóa tài khoản
  const handleDeleteSubmit = async () => {
    if (!deleteTarget) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/users/${deleteTarget.id}`, {
        method: "DELETE",
      });

      const json = await res.json();
      if (!res.ok) {
        setToast({
          type: "error",
          message: json.message || "Xóa tài khoản thất bại",
        });
        return;
      }

      setToast({
        type: "success",
        message: `Đã xóa tài khoản ${deleteTarget.email} khỏi hệ thống`,
      });
      setDeleteTarget(null);
      fetchData();
    } catch {
      setToast({ type: "error", message: "Lỗi kết nối khi xóa tài khoản" });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="space-y-6">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-300 ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-300 text-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 hover:opacity-75 transition-opacity"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#e2d3bf] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#f7f5f1] text-[#a21f1f] flex items-center justify-center border border-[#e2d3bf]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#1E1917]">
                Hệ thống: Tài khoản &amp; Phân quyền
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#a21f1f]/10 text-[#a21f1f] border border-[#a21f1f]/20 uppercase">
                Hệ Thống
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-1">
              Quản trị nhân sự nội bộ, phân quyền (ADMIN / MANAGER) và bảo mật truy cập hệ thống
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={fetchData}
            title="Làm mới dữ liệu"
            className="p-2.5 rounded-xl border border-[#e2d3bf] bg-[#f7f5f1] hover:bg-[#eae4d6] text-stone-700 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#a21f1f]" : ""}`} />
          </button>
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm tài khoản</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#e2d3bf] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Tổng số tài khoản
            </p>
            <p className="text-2xl font-black text-[#1E1917] mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e2d3bf] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-[#a21f1f] uppercase tracking-wider">
              Quản trị viên (ADMIN)
            </p>
            <p className="text-2xl font-black text-[#a21f1f] mt-1">{stats.admins}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-red-50 text-[#a21f1f] flex items-center justify-center border border-red-200">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e2d3bf] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
              Quản lý (MANAGER)
            </p>
            <p className="text-2xl font-black text-amber-800 mt-1">{stats.managers}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#e2d3bf] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
              Đang hoạt động
            </p>
            <p className="text-2xl font-black text-emerald-800 mt-1">
              {stats.active}{" "}
              <span className="text-xs font-normal text-stone-500">
                ({stats.inactive} tạm khóa)
              </span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#e2d3bf] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo họ tên, email hoặc username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#f7f5f1] border border-[#e2d3bf] rounded-lg focus:outline-none focus:border-[#a21f1f] text-[#1E1917]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Lọc theo Vai trò */}
          <div className="flex items-center gap-1.5 bg-[#f7f5f1] px-2.5 py-1.5 rounded-lg border border-[#e2d3bf]">
            <span className="text-stone-500 font-semibold text-[11px]">Vai trò:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent font-normal text-[#1E1917] outline-none cursor-pointer text-xs"
            >
              <option value="ALL">Tất cả vai trò</option>
              <option value="ADMIN">ADMIN (Quản trị viên)</option>
              <option value="MANAGER">MANAGER (Quản lý)</option>
              <option value="USER">USER (Người dùng)</option>
            </select>
          </div>

          {/* Lọc theo Trạng thái */}
          <div className="flex items-center gap-1.5 bg-[#f7f5f1] px-2.5 py-1.5 rounded-lg border border-[#e2d3bf]">
            <span className="text-stone-500 font-semibold text-[11px]">Trạng thái:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent font-normal text-[#1E1917] outline-none cursor-pointer text-xs"
            >
              <option value="ALL">Tất cả</option>
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="INACTIVE">Đã tạm khóa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-[#e2d3bf] shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center text-stone-500 gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#a21f1f]" />
            <p className="text-xs font-semibold">Đang tải danh sách tài khoản...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-stone-500 gap-2">
            <Users className="w-8 h-8 text-stone-300" />
            <p className="text-sm font-bold text-stone-700">Không tìm thấy tài khoản nào</p>
            <p className="text-xs text-stone-500">
              Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc hiện tại
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f7f5f1] border-b border-[#e2d3bf] text-stone-700 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-5">Tài khoản &amp; Họ tên</th>
                  <th className="py-3.5 px-4">Email đăng nhập</th>
                  <th className="py-3.5 px-4">Vai trò phân quyền</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4">Ngày tạo</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3e9db] font-medium text-[#1E1917]">
                {filteredUsers.map((u) => {
                  const isCurrent = currentUser?.id === u.id;

                  return (
                    <tr
                      key={u.id}
                      className={`hover:bg-[#f7f5f1]/60 transition-colors ${
                        isCurrent ? "bg-[#fdfaf5]" : ""
                      }`}
                    >
                      {/* Name & Avatar */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#f3e9db] text-[#a21f1f] font-bold flex items-center justify-center border border-[#d8c5a9] shrink-0">
                            {u.fullname.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-[#1E1917] text-sm">
                                {u.fullname}
                              </span>
                              {isCurrent && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#a21f1f] text-white">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-stone-500">
                              @{u.username || `user_${u.id}`}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4 text-stone-700 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span>{u.email}</span>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-4">
                        {u.role === "ADMIN" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-[#a21f1f] border border-red-300 font-bold text-[11px]">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#a21f1f]" />
                            <span>Quản trị viên (ADMIN)</span>
                          </span>
                        ) : u.role === "MANAGER" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[11px]">
                            <Shield className="w-3.5 h-3.5 text-amber-600" />
                            <span>Quản lý (MANAGER)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 border border-stone-300 font-bold text-[11px]">
                            <Users className="w-3.5 h-3.5 text-stone-500" />
                            <span>Người dùng (USER)</span>
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        {u.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Đang hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Đã tạm khóa
                          </span>
                        )}
                      </td>

                      {/* Created At */}
                      <td className="py-4 px-4 text-stone-500 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* Toggle Active status */}
                          <button
                            type="button"
                            onClick={() => handleToggleActive(u)}
                            disabled={isCurrent}
                            title={
                              isCurrent
                                ? "Không thể khóa tài khoản của chính bạn"
                                : u.isActive
                                ? "Tạm khóa tài khoản"
                                : "Mở khóa tài khoản"
                            }
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isCurrent
                                ? "opacity-30 cursor-not-allowed bg-stone-100 border-stone-300 text-stone-400"
                                : u.isActive
                                ? "hover:bg-rose-50 border-stone-300 text-stone-600 hover:text-rose-600 hover:border-rose-200 cursor-pointer"
                                : "hover:bg-emerald-50 border-rose-200 text-rose-600 hover:text-emerald-600 hover:border-emerald-200 cursor-pointer"
                            }`}
                          >
                            {u.isActive ? (
                              <UserX className="w-3.5 h-3.5" />
                            ) : (
                              <UserCheck className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Reset Password */}
                          <button
                            type="button"
                            onClick={() => {
                              setPasswordTarget(u);
                              setPasswordForm({ newPassword: "", confirmPassword: "" });
                            }}
                            title="Đổi mật khẩu"
                            className="p-1.5 rounded-lg border border-stone-300 text-stone-600 hover:text-amber-700 hover:bg-amber-50 hover:border-amber-200 transition-colors cursor-pointer"
                          >
                            <Key className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit Details */}
                          <button
                            type="button"
                            onClick={() => openEditModal(u)}
                            title="Chỉnh sửa thông tin & phân quyền"
                            className="p-1.5 rounded-lg border border-stone-300 text-stone-600 hover:text-[#a21f1f] hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Account */}
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(u)}
                            disabled={isCurrent}
                            title={
                              isCurrent
                                ? "Không thể tự xóa tài khoản của chính bạn"
                                : "Xóa tài khoản"
                            }
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isCurrent
                                ? "opacity-30 cursor-not-allowed bg-stone-100 border-stone-300 text-stone-400"
                                : "border-stone-300 text-stone-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300 cursor-pointer"
                            }`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Role explanation table box */}
      <div className="bg-white p-6 rounded-2xl border border-[#e2d3bf] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#a21f1f]" />
          <h2 className="font-bold text-sm text-[#1E1917] uppercase tracking-wider">
            Bảng phân quyền &amp; Giới hạn trách nhiệm hệ thống
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Card Admin */}
          <div className="p-4 rounded-xl border border-red-300 bg-red-50/40 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a21f1f]" />
              <h3 className="font-bold text-[#a21f1f] text-sm">
                Quản trị viên tối cao (ADMIN)
              </h3>
            </div>
            <p className="text-stone-700 leading-relaxed text-[11px]">
              Tài khoản cấp cao nhất. Có toàn quyền quản trị trang admin:
            </p>
            <ul className="list-disc list-inside space-y-1 text-stone-600 text-[11px]">
              <li>Quản trị tài khoản &amp; phân quyền truy cập hệ thống (Thêm, Sửa, Đổi mật khẩu, Xóa).</li>
              <li>Quản lý cấu hình Google Sheets bot &amp; Form Builder liên hệ.</li>
              <li>Quản trị toàn bộ nội dung sản phẩm, danh mục, tin tức, dự án, thông tin công ty.</li>
              <li>Cài đặt hệ thống, chân trang, chính sách và thương hiệu.</li>
            </ul>
          </div>

          {/* Card Manager */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              <h3 className="font-bold text-amber-800 text-sm">
                Quản lý vận hành (MANAGER)
              </h3>
            </div>
            <p className="text-stone-700 leading-relaxed text-[11px]">
              Tài khoản nhân sự quản trị vận hành nội dung hàng ngày:
            </p>
            <ul className="list-disc list-inside space-y-1 text-stone-600 text-[11px]">
              <li>Quản lý danh sách sản phẩm, dự án, tin tức và bài viết.</li>
              <li>Xem và xử lý thông tin biểu mẫu liên hệ khách hàng gửi về.</li>
              <li>
                <span className="text-red-700 font-semibold">Giới hạn:</span> Không có quyền truy cập trang quản trị tài khoản này (<code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-200">/admin/system/users</code>).
              </li>
              <li>Không thể thay đổi phân quyền hay xóa tài khoản của người khác.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: TẠO TÀI KHOẢN MỚI */}
      {/* ========================================================= */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-[#e2d3bf] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2d3bf] bg-[#f7f5f1]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#a21f1f]/10 text-[#a21f1f] flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-[#1E1917] text-sm">
                  Thêm tài khoản nhân sự mới
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Họ và tên nhân sự <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn Phan"
                  value={createForm.fullname}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, fullname: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#f7f5f1] border border-[#e2d3bf] rounded-xl text-xs text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Email đăng nhập (Gmail hoặc Email công ty){" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@laviet.vn hoặc username@gmail.com"
                  value={createForm.email}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#f7f5f1] border border-[#e2d3bf] rounded-xl text-xs text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Mật khẩu khởi tạo <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCreatePassword ? "text" : "password"}
                    required
                    minLength={6}
                    placeholder="Tối thiểu 6 ký tự..."
                    value={createForm.password}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, password: e.target.value })
                    }
                    className="w-full pl-3.5 pr-10 py-2.5 bg-[#f7f5f1] border border-[#e2d3bf] rounded-xl text-xs text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCreatePassword(!showCreatePassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    {showCreatePassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Người dùng có thể đổi lại mật khẩu này sau khi nhận tài khoản.
                </p>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Vai trò &amp; Phân quyền truy cập{" "}
                  <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      createForm.role === "MANAGER"
                        ? "border-amber-400 bg-amber-50/50"
                        : "border-[#e2d3bf] bg-[#f7f5f1] hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="MANAGER"
                      checked={createForm.role === "MANAGER"}
                      onChange={() =>
                        setCreateForm({ ...createForm, role: "MANAGER" })
                      }
                      className="mt-0.5"
                    />
                    <div>
                      <p className="font-bold text-amber-900">MANAGER</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        Quản lý nội dung, sản phẩm, tin tức, dự án
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      createForm.role === "ADMIN"
                        ? "border-red-400 bg-red-50/50"
                        : "border-[#e2d3bf] bg-[#f7f5f1] hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="ADMIN"
                      checked={createForm.role === "ADMIN"}
                      onChange={() =>
                        setCreateForm({ ...createForm, role: "ADMIN" })
                      }
                      className="mt-0.5"
                    />
                    <div>
                      <p className="font-bold text-[#a21f1f]">ADMIN</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        Quản trị viên tối cao, toàn quyền hệ thống
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createForm.isActive}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, isActive: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#a21f1f] focus:ring-[#a21f1f] cursor-pointer"
                  />
                  <span className="font-semibold text-stone-700 text-xs">
                    Kích hoạt tài khoản ngay lập tức
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#e2d3bf]">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 font-semibold text-stone-700 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Tạo tài khoản</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: CHỈNH SỬA TÀI KHOẢN */}
      {/* ========================================================= */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-[#e2d3bf] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2d3bf] bg-[#f7f5f1]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#a21f1f]/10 text-[#a21f1f] flex items-center justify-center font-bold">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1E1917] text-sm">
                    Chỉnh sửa thông tin tài khoản
                  </h3>
                  <p className="text-[11px] text-stone-500 font-mono">
                    {editTarget.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Họ và tên nhân sự <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editForm.fullname}
                  onChange={(e) =>
                    setEditForm({ ...editForm, fullname: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#f7f5f1] border border-[#e2d3bf] rounded-xl text-xs text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Email đăng nhập <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#f7f5f1] border border-[#e2d3bf] rounded-xl text-xs text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Vai trò phân quyền <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      editForm.role === "MANAGER"
                        ? "border-amber-400 bg-amber-50/50"
                        : "border-[#e2d3bf] bg-[#f7f5f1] hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="edit-role"
                      value="MANAGER"
                      checked={editForm.role === "MANAGER"}
                      disabled={currentUser?.id === editTarget.id}
                      onChange={() =>
                        setEditForm({ ...editForm, role: "MANAGER" })
                      }
                      className="mt-0.5"
                    />
                    <div>
                      <p className="font-bold text-amber-900">MANAGER</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        Quản lý nội dung, sản phẩm, tin tức
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      editForm.role === "ADMIN"
                        ? "border-red-400 bg-red-50/50"
                        : "border-[#e2d3bf] bg-[#f7f5f1] hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="edit-role"
                      value="ADMIN"
                      checked={editForm.role === "ADMIN"}
                      onChange={() =>
                        setEditForm({ ...editForm, role: "ADMIN" })
                      }
                      className="mt-0.5"
                    />
                    <div>
                      <p className="font-bold text-[#a21f1f]">ADMIN</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        Quản trị viên tối cao, toàn quyền hệ thống
                      </p>
                    </div>
                  </label>
                </div>
                {currentUser?.id === editTarget.id && (
                  <p className="text-[11px] text-amber-700 mt-1">
                    * Bạn không thể tự hạ quyền ADMIN của chính mình.
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={editForm.isActive}
                    disabled={currentUser?.id === editTarget.id}
                    onChange={(e) =>
                      setEditForm({ ...editForm, isActive: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#a21f1f] focus:ring-[#a21f1f] cursor-pointer"
                  />
                  <span className="font-semibold text-stone-700 text-xs">
                    Tài khoản được phép đăng nhập và hoạt động
                  </span>
                </label>
                {currentUser?.id === editTarget.id && (
                  <p className="text-[11px] text-amber-700 mt-1">
                    * Bạn không thể tự vô hiệu hóa tài khoản của chính mình.
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#e2d3bf]">
                <button
                  type="button"
                  onClick={() => setEditTarget(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 font-semibold text-stone-700 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: ĐỔI MẬT KHẨU */}
      {/* ========================================================= */}
      {passwordTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl border border-[#e2d3bf] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2d3bf] bg-[#f7f5f1]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1E1917] text-sm">
                    Đặt lại mật khẩu mới
                  </h3>
                  <p className="text-[11px] text-stone-500 font-mono">
                    {passwordTarget.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPasswordTarget(null)}
                className="text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Mật khẩu mới <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    minLength={6}
                    placeholder="Tối thiểu 6 ký tự..."
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full pl-3.5 pr-10 py-2.5 bg-[#f7f5f1] border border-[#e2d3bf] rounded-xl text-xs text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Xác nhận lại mật khẩu mới <span className="text-red-600">*</span>
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  placeholder="Nhập lại chính xác mật khẩu trên..."
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#f7f5f1] border border-[#e2d3bf] rounded-xl text-xs text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                <p className="font-bold flex items-center gap-1.5 text-amber-800">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  Lưu ý bảo mật
                </p>
                Sau khi đổi mật khẩu, toàn bộ phiên đăng nhập hiện tại của tài khoản này sẽ tự động bị đăng xuất để đảm bảo an toàn.
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#e2d3bf]">
                <button
                  type="button"
                  onClick={() => setPasswordTarget(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 font-semibold text-stone-700 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Cập nhật mật khẩu</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: XÁC NHẬN XÓA TÀI KHOẢN */}
      {/* ========================================================= */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl border border-red-300 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-red-200 bg-red-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
                  <Trash2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-red-900 text-sm">
                  Xác nhận xóa tài khoản
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-xs">
              <p className="text-stone-700 leading-relaxed">
                Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản sau khỏi hệ thống quản trị LÀ VIỆT?
              </p>

              <div className="p-3.5 rounded-xl bg-[#f7f5f1] border border-[#e2d3bf] space-y-1">
                <p className="font-bold text-[#1E1917] text-sm">
                  {deleteTarget.fullname}
                </p>
                <p className="font-mono text-stone-600 text-[11px]">
                  {deleteTarget.email}
                </p>
                <div className="pt-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-[#e2d3bf] text-stone-700">
                    Vai trò: {deleteTarget.role}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-red-50 rounded-xl border border-red-300 text-red-800 text-[11px] leading-relaxed flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Cảnh báo:</strong>
                  Hành động này là vĩnh viễn và không thể hoàn tác. Nhân sự này sẽ ngay lập tức mất toàn bộ quyền truy cập vào hệ thống.
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#e2d3bf]">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 font-semibold text-stone-700 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={handleDeleteSubmit}
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  {actionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Xác nhận xóa vĩnh viễn</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
