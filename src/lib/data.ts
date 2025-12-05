export interface TeamMember {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  experience: string;
  credentials: string[];
  photo?: string;
  bio: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  ndaaCompliant: boolean;
  certifications: string[];
  location: string;
  website?: string;
  squareFootage?: string;
  email?: string;
  phone?: string;
  capabilities?: string[];
  teamMembers?: TeamMember[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  companyId: string;
  systemId: string;
  subsystemId?: string;
  specifications: Record<string, string>;
  images: string[];
  availability: 'In Stock' | 'Pre-Order' | 'Out of Stock';
  leadTime: string;
  ndaaCompliant: boolean;
  applications?: string[];
  dimensions?: string;
  datasheetUrl?: string;
  cadModelUrl?: string;
  optionSheetUrl?: string;
  userManualUrl?: string;
}

export interface Subsystem {
  id: string;
  name: string;
  description: string;
  systemId: string;
}

export interface UnmannedSystem {
  id: string;
  name: string;
  description: string;
  icon: string;
  domain: 'aerial' | 'marine';
  vehicleType?: string;
}

export interface DroneSystem extends UnmannedSystem {
  domain: 'aerial';
}

export interface MarineSystem extends UnmannedSystem {
  domain: 'marine';
  vehicleCategory: 'surface' | 'undersea';
  hullLengthRange?: {
    min: number;
    max: number;
    unit: 'meters' | 'feet';
  };
}
