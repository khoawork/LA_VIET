export type ProjectCategory =
  | "all"
  | "hotel-resort"
  | "grand-hall"
  | "mansion-villa"
  | "heritage-culture";

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  yearLocation: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  materials: string;
  scale: string;
  imageUrl: string;
}

export interface ProjectStat {
  id: string;
  label: string;
  value: string;
  unit?: string;
  description: string;
  accentColor?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  timeOrWarranty: string;
  isWarranty?: boolean;
}

