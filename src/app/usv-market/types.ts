// Level 1: High-level entity classification
export type EntityType = "company" | "partner" | "government" | "investor";

// Level 2: More specific categorization
export type EntityCategory =
  | "usv platform"
  | "usv integrator"
  | "incubator"
  | "non-profit/association"
  | "research institute"
  | "civil"
  | "military"
  | "university"
  | "autonomy provider"
  | "component manufacturer"
  | "framework";

// Level 3: Company maturity stage (only applies to companies)
export type CompanyType = "startup" | "legacy" | "mid-tier" | "new prime" | "";

export interface Company {
  name: string;
  website: string;
  description: string;
  companyType: CompanyType; // Renamed from category for clarity
  location: string;
  lat: number;
  lng: number;
  imageUrl: string;
  funding?: number;
  entityType: EntityType; // Level 1: company/partner/government/investor
  entityCategory: EntityCategory | ""; // Level 2: More specific classification
  country: string;
  portfolioCompanies?: string; // Comma-separated list for investors
  dateAdded?: string; // Date entity was added to the hub
}

export interface ContractData {
  lat: number;
  lng: number;
  company_name: string;
  product: string;
  contract_amount: number;
  start_date: string;
  city: string;
  state: string;
  contract_id: string;
  source: string;
  company_url: string;
}

export interface Vehicle {
  name: string;
  length: string;
  range: string;
  endurance: string;
  seastate: string;
  topSpeed: string;
  payload: string;
  propulsion: string;
  auxPropulsion: string;
  company: string;
  source: string;
  googleLink: string;
}
