"use client";

import { Company, Vehicle } from "../types";
import { CompanyGridCard } from "./CompanyGridCard";

interface EntityGridProps {
  companies: Company[];
  vehiclesByCompany: Map<string, Vehicle[]>;
  onCompanyClick: (company: Company) => void;
}

export function EntityGrid({ companies, vehiclesByCompany, onCompanyClick }: EntityGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
      {companies.map((company) => (
        <CompanyGridCard
          key={company.name}
          company={company}
          vehicleCount={vehiclesByCompany.get(company.name)?.length || 0}
          onClick={() => onCompanyClick(company)}
        />
      ))}
    </div>
  );
}
