export interface Company {
  name: string;
  website: string;
  description: string;
  category: "startup" | "legacy" | "mid-tier";
  location: string;
  lat: number;
  lng: number;
  imageUrl: string;
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
