import Link from "next/link";
import {
  LayoutGrid,
  Home,
  Info,
  Package,
  FolderKanban,
  Newspaper,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { ADMIN_CONTENT_MODULES } from "../services/admin.services";

export function AdminContentGrid() {
  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-[#a21f1f]" };
    switch (iconName) {
      case "Home":
        return <Home {...props} />;
      case "Info":
        return <Info {...props} />;
      case "Package":
        return <Package {...props} />;
      case "FolderKanban":
        return <FolderKanban {...props} />;
      case "Newspaper":
        return <Newspaper {...props} />;
      case "GraduationCap":
        return <GraduationCap {...props} />;
      default:
        return <LayoutGrid {...props} />;
    }
  };

  return (
    <div
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      className="bg-white rounded-2xl border border-[#e2d3bf] p-6 shadow-xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#e2d3bf]">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-[#a21f1f]" />
          <h2 className="text-base sm:text-lg font-bold text-[#1E1917]">
            Quản lý nội dung
          </h2>
        </div>
        <span className="text-xs font-semibold text-stone-700 bg-[#f7f5f1] px-3 py-1 rounded-full border border-[#e2d3bf]">
          6 chuyên mục chính
        </span>
      </div>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ADMIN_CONTENT_MODULES.map((mod) => (
          <Link
            key={mod.id}
            href={mod.href}
            className="group p-4 rounded-xl border border-[#e2d3bf] bg-[#f7f5f1]/60 hover:bg-white hover:border-[#a21f1f]/50 hover:shadow-md transition-all flex items-start justify-between gap-3"
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e2d3bf] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#f3e9db]/50 transition-colors">
                {getIcon(mod.icon)}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#1E1917] group-hover:text-[#a21f1f] transition-colors truncate">
                  {mod.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-1 line-clamp-2">
                  {mod.description}
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#a21f1f] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
