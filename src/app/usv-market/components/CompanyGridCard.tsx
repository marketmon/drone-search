"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "../types";
import { categoryLabels, categoryColors } from "../utils";

interface CompanyGridCardProps {
  company: Company;
  vehicleCount: number;
  onClick: () => void;
}

export function CompanyGridCard({
  company,
  vehicleCount,
  onClick
}: CompanyGridCardProps) {
  const [logoError, setLogoError] = useState(false);

  const description = company.description || "";

  return (
    <Card
      className="border border-gray-300 rounded-none shadow-none hover:shadow-md hover:border-gray-400 transition-all flex flex-col bg-white cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-1 sm:p-2">
        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className={`text-[9px] sm:text-[10px] font-mono tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 border ${categoryColors[company.category]}`}>
              {categoryLabels[company.category]}
            </span>
            {vehicleCount > 0 && (
              <span className="text-[10px] sm:text-xs font-mono text-blue-700 bg-blue-50 px-1.5 sm:px-2 py-0.5 sm:py-1 border border-blue-300">
                {vehicleCount} {vehicleCount === 1 ? 'VEHICLE' : 'VEHICLES'}
              </span>
            )}
          </div>
        </div>
        <div className="w-full h-20 sm:h-24 bg-gray-100 border border-gray-200 flex items-center justify-center mb-2 sm:mb-3 overflow-hidden">
          {company.imageUrl && !logoError ? (
            <img
              src={company.imageUrl}
              alt={`${company.name} logo`}
              className="max-w-full max-h-full object-contain p-2"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-xs text-gray-500 font-mono">NO IMAGE</span>
          )}
        </div>
        <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-left text-black leading-tight mb-2">
          {company.name}
        </CardTitle>

        {/* Company Description - 2 lines max */}
        {description && (
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </CardHeader>
    </Card>
  );
}
