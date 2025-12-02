"use client";

import { Company, Vehicle } from "../types";
import { entityTypeLabels, entityTypeColors, entityCategoryLabels, entityCategoryColors, companyTypeLabels, companyTypeColors, formatFunding } from "../utils";

interface EntityTableProps {
  companies: Company[];
  vehiclesByCompany: Map<string, Vehicle[]>;
  onCompanyClick: (company: Company) => void;
}

export function EntityTable({ companies, vehiclesByCompany, onCompanyClick }: EntityTableProps) {
  return (
    <div className="border-2 border-black overflow-x-auto text-black">
      <table className="w-full font-mono text-sm">
        <thead className="bg-gray-100 border-b-2 border-black">
          <tr>
            <th className="text-left px-4 py-3 font-bold text-xs">ENTITY NAME</th>
            <th className="text-left px-4 py-3 font-bold text-xs">ENTITY TYPE</th>
            <th className="text-left px-4 py-3 font-bold text-xs">ENTITY CATEGORY</th>
            <th className="text-left px-4 py-3 font-bold text-xs">COMPANY TYPE</th>
            <th className="text-left px-4 py-3 font-bold text-xs">LOCATION</th>
            <th className="text-left px-4 py-3 font-bold text-xs">FUNDING</th>
            <th className="text-left px-4 py-3 font-bold text-xs">VEHICLES</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr
              key={company.name}
              onClick={() => onCompanyClick(company)}
              className={`border-b border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
            >
              <td className="px-4 py-3 font-semibold">{company.name}</td>
              <td className="px-4 py-3">
                <span className={`text-[10px] px-2 py-1 border ${entityTypeColors[company.entityType]}`}>
                  {entityTypeLabels[company.entityType]}
                </span>
              </td>
              <td className="px-4 py-3">
                {company.entityCategory ? (
                  <span className={`text-[10px] px-2 py-1 border ${entityCategoryColors[company.entityCategory]}`}>
                    {entityCategoryLabels[company.entityCategory]}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                {company.entityType === "company" && company.companyType ? (
                  <span className={`text-[10px] px-2 py-1 border ${companyTypeColors[company.companyType]}`}>
                    {companyTypeLabels[company.companyType]}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-gray-700">{company.location}</td>
              <td className="px-4 py-3">
                {company.funding ? (
                  <span className="font-bold text-green-600">{formatFunding(company.funding)}</span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                {vehiclesByCompany.get(company.name)?.length || <span className="text-gray-400">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
