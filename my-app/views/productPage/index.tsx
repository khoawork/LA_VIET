"use client";

import { useEffect, useState } from "react";
import {
  ProductsHero,
  ProductsGrid,
} from "./components";
import { ProductCategory, ProductItem } from "./types";
import type { ProductsPagePropsType } from "@/shared/schema/pages/page-product.schema";

export * from "./types";
export * from "./components";

export function ProductsView() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("ALL");
  const [pageProps, setPageProps] = useState<ProductsPagePropsType | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; label: string }>>([]);
  const [catalogReady, setCatalogReady] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allCount, setAllCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/pages/products?summary=true")
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tải cấu hình trang sản phẩm.");
        return res.json();
      })
      .then((json) => {
        if (!json.success || !json.data?.page?.props || !Array.isArray(json.data.categories)) {
          throw new Error("Dữ liệu trang sản phẩm không hợp lệ.");
        }
        setPageProps(json.data.page.props);
        const categoryNames = json.data.categories as string[];
        setCategories([
          { id: "ALL", label: "TẤT CẢ TÁC PHẨM" },
          ...categoryNames.map((name) => ({
            id: name,
            label: name.toUpperCase(),
          })),
        ]);
        setCatalogReady(true);
      })
      .catch((err) => {
        console.error("Failed to load dynamic product page configuration:", err);
        setError(err instanceof Error ? err.message : "Không thể tải trang sản phẩm.");
        setLoading(false);
      });
  }, []);

  const displayedIds = pageProps?.displayedProductIds?.join(",") ?? "";

  useEffect(() => {
    if (!catalogReady) return;
    const controller = new AbortController();
    async function loadProducts() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ page: String(currentPage) });
        if (activeCategory !== "ALL") params.set("categoryName", activeCategory);
        if (displayedIds) params.set("ids", displayedIds);
        const response = await fetch(`/api/products?${params}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Không thể tải danh sách sản phẩm.");
        const json = await response.json();
        if (!json.success || !Array.isArray(json.data)) {
          throw new Error("Dữ liệu sản phẩm không hợp lệ.");
        }
        if (controller.signal.aborted) return;
        setProducts(json.data);
        setTotalPages(json.meta.totalPages);
        if (activeCategory === "ALL") setAllCount(json.meta.totalItems);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Không thể tải danh sách sản phẩm.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProducts();
    return () => controller.abort();
  }, [catalogReady, currentPage, activeCategory, displayedIds]);

  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] text-[#2B1F1A] font-sans selection:bg-[#B71C1C] selection:text-white flex flex-col">
      <main className="w-full flex-1">
        {pageProps?.herosection && <ProductsHero
          activeCategory={activeCategory}
          onSelectCategory={(category) => {
            setActiveCategory(category);
            setCurrentPage(1);
          }}
          heroData={pageProps?.herosection}
          categories={categories.map((category) =>
            category.id === "ALL"
              ? { ...category, label: `TẤT CẢ TÁC PHẨM (${allCount})` }
              : category,
          )}
        />}
        <ProductsGrid
          products={products}
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}
