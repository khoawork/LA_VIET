"use client";

import { useState } from "react";
import {
  ProductsHero,
  ProductsGrid,
} from "./components";
import { ProductCategory } from "./types";

export * from "./types";
export * from "./data/products.data";
export * from "./components";

export function ProductsView() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("ALL");

  return (
    <div className="w-full min-h-screen bg-[#F7F5F0] text-[#2B1F1A] font-sans selection:bg-[#B71C1C] selection:text-white flex flex-col">
      <main className="w-full flex-1">
        <ProductsHero
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <ProductsGrid activeCategory={activeCategory} />
      </main>
    </div>
  );
}
