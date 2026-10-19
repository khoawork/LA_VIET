export type ProductCategory = string;

export interface ProductItem {
  id: number | string;
  name: string;
  title?: string;
  description: string;
  image: string;
  slug: string;
  categoryId?: number;
  category?: {
    name: string;
  };
  props?: {
    dimension?: string;
    material?: string;
    badge?: string;
    badgeColor?: "red" | "dark" | `#${string}`;
    yearOrSpec?: string;
    buttonLabel?: string;
    isTechnicalSpec?: boolean;
    [key: string]: unknown;
  };
}
