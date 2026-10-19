"use client";

import { useEffect, useState } from "react";
import {
  ProductsHero,
  ProductsGrid,
} from "./components";
import { ProductCategory, ProductItem } from "./types";
import type { ProductsPagePropsType } from "@/shared/schema/pages/page-product.schema";

export * from "./types";
export * from "./data/products.data";
export * from "./components";

export function ProductsView() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("ALL");
  const [pageProps, setPageProps] = useState<ProductsPagePropsType | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; label: string }>>([]);

  useEffect(() => {
    fetch("/api/pages/products")
      .then((res) => res.json())
      .then((json) => {
        if (json?.data?.page?.props) {
          setPageProps(json.data.page.props);
        }
        if (Array.isArray(json?.data?.products)) {
          setProducts(json.data.products);

          // Trích xuất danh mục động từ các sản phẩm thực tế trong DB
          const uniqueCats = Array.from(
            new Set(
              json.data.products
                .map((p: any) => p.category?.name)
                .filter(Boolean),
            ),
          ) as string[];

          if (uniqueCats.length > 0) {
            setCategories([
              { id: "ALL", label: `TẤT CẢ TÁC PHẨM (${json.data.products.length})` },
              ...uniqueCats.map((name) => ({
                id: name,
                label: name.toUpperCase(),
              })),
            ]);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load dynamic product page configuration:", err);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] text-[#2B1F1A] font-sans selection:bg-[#B71C1C] selection:text-white flex flex-col">
      <main className="w-full flex-1">
        <ProductsHero
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          heroData={pageProps?.herosection}
          categories={categories}
        />
        <ProductsGrid
          products={products}
          activeCategory={activeCategory}
          displayedProductIds={pageProps?.displayedProductIds}
        />
      </main>
    </div>
  );
}
