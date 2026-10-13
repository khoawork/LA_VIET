export interface AboutStat {
  id: string;
  label: string;
  value: string;
  unit?: string;
  description: string;
  accentColor?: string;
}

export interface AboutValueItem {
  id: string;
  category: string;
  title: string;
  description: string;
  tag: string;
  gradient: string;
  accentColor: string;
  pillars?: string[];
}

export interface OrgLeader {
  id: string;
  name: string;
  role: string;
  tag: string;
  bio: string;
  avatar: string;
  department: string;
  accentColor: string;
}

export interface OrgDivision {
  code: string;
  title: string;
  subtitle: string;
  description: string;
  focus: string;
  accentBorder: string;
}

export interface AboutPartner {
  name: string;
  role: string;
  category: string;
}

export interface AboutTestimonial {
  quote: string;
  organization: string;
  note: string;
  avatar: string;
}

