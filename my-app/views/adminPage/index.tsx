import { AdminDashboard, AdminLogin } from "./components";

export default function AdminPage() {
  return <AdminDashboard />;
}

export {
  AdminPage,
  AdminDashboard,
  AdminDashboard as AdminDashboardView,
  AdminLogin,
  AdminLogin as AdminLoginView,
};

export * from "./components";
export * from "./services/admin.services";
export * from "./types/admin.type";

