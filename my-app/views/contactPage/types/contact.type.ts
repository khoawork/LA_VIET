export interface OfficeLocation {
  id: string;
  name: string;
  tabLabel: string;
  address: string;
  hours?: string;
  tag?: string;
  note?: string;
  mapEmbedUrl?: string;
  mapDistanceNote?: string;
}

export interface ContactChannel {
  title: string;
  primaryText: string;
  secondaryText: string;
  isRed?: boolean;
}

export interface ExperienceSpace {
  id: string;
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ConsultationFormData {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
}

