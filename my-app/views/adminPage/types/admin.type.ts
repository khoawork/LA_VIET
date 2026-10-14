export interface AdminNavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  active?: boolean;
}

export interface AdminNavSection {
  title: string;
  items: AdminNavItem[];
}

export interface AdminStatItem {
  id: string;
  title: string;
  value: string;
  statusText: string;
  icon: string;
  href?: string;
  accentColor?: string;
}

export interface AdminContentModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  itemCount?: number;
}

export interface AdminActivityLog {
  id: string;
  author: string;
  action: string;
  target?: string;
  time: string;
  type?: "create" | "update" | "delete" | "system";
}

export interface AdminUser {
  name: string;
  role: string;
  email: string;
  avatarText: string;
}

