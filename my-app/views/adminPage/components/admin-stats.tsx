"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  FolderKanban,
  Trophy,
  Award,
  GraduationCap,
  FileText,
  Mail,
  Newspaper,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { ADMIN_STATS } from "../services/admin.services";
import { AdminStatItem } from "../types/admin.type";

export function AdminStats() {
  const [stats, setStats] = useState<AdminStatItem[]>(ADMIN_STATS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (!res.ok) return;
        const json = await res.json();
        const data = json?.data;
        if (data && isMounted) {
          setStats((prev) =>
            prev.map((item) => {
              if (item.id === "products" && data.products !== undefined) {
                return {
                  ...item,
                  value: String(data.products).padStart(2, "0"),
                };
              }
              if (item.id === "project" && data.projects !== undefined) {
                return {
                  ...item,
                  value: String(data.projects).padStart(2, "0"),
                };
              }
              if (item.id === "news" && data.news !== undefined) {
                return {
                  ...item,
                  value: String(data.news).padStart(2, "0"),
                };
              }
              return item;
            }),
          );
        }
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-[#a21f1f]" };
    switch (iconName) {
      case "Package":
        return <Package {...props} />;
      case "FolderKanban":
        return <FolderKanban {...props} />;
      case "Trophy":
        return <Trophy {...props} />;
      case "Award":
        return <Award {...props} />;
      case "GraduationCap":
        return <GraduationCap {...props} />;
      case "FileText":
        return <FileText {...props} />;
      case "Mail":
        return <Mail {...props} />;
      case "Newspaper":
        return <Newspaper {...props} />;
      default:
        return <Package {...props} />;
    }
  };

  return (
    <div
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
    >
      {stats.map((stat) => {
        const CardWrapper = stat.href ? Link : "div";

        return (
          <CardWrapper
            key={stat.id}
            href={stat.href || "#"}
            className="group p-5 bg-white rounded-2xl border border-[#f3e9db] shadow-xs hover:shadow-md hover:border-[#a21f1f]/50 transition-all flex flex-col justify-between min-h-[140px]"
          >
            {/* Top row: Icon & Arrow */}
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#f7f5f1] border border-[#f3e9db] flex items-center justify-center group-hover:bg-[#f3e9db] transition-colors">
                {getIcon(stat.icon)}
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-[#a21f1f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            {/* Middle: Title & Number */}
            <div className="mt-4">
              <div className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                {stat.title}
              </div>
              <div className="flex items-baseline justify-between mt-1">
                {isLoading ? (
                  <span className="inline-block w-12 h-9 bg-stone-200 animate-pulse rounded-md mt-1" />
                ) : (
                  <span className="text-3xl sm:text-4xl font-black text-[#1E1917] tracking-tight">
                    {stat.value}
                  </span>
                )}
                <span className="text-xs text-[#a21f1f] font-semibold truncate ml-2">
                  {stat.statusText}
                </span>
              </div>
            </div>
          </CardWrapper>
        );
      })}
    </div>
  );
}
