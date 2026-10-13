export type ProductCategory =
  | "ALL"
  | "TRANH_KHO_LON"
  | "NOI_THAT_CAO_CAP"
  | "VACH_KIEN_TRUC"
  | "VAT_PHAM_DOC_BAN"
  | "SON_HOA_VIET";

export interface ProductItem {
  id: string;
  badge: string;
  badgeColor?: "red" | "dark";
  dimension?: string;
  brandTag?: string;
  category: ProductCategory;
  categoryName: string;
  name: string;
  description: string;
  material: string;
  yearOrSpec: string;
  image: string;
  isTechnicalSpec?: boolean;
}

