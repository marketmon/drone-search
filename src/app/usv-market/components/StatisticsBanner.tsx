"use client";

import { formatFunding } from "../utils";

interface StatisticsBannerProps {
  statistics: {
    totalEntities: number;
    totalFunding: number;
    fundedCompaniesCount: number;
    entityTypeCounts: Record<string, number>;
    categoryCounts: Record<string, number>;
  };
}

export function StatisticsBanner({ statistics }: StatisticsBannerProps) {
  const formatLargeCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(0)}M`;
    }
    return formatFunding(amount);
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-black border-t-0 p-4 sm:p-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Entities */}
        <div className="bg-white border-2 border-black p-3 sm:p-4">
          <div className="text-xs font-mono text-gray-600 font-bold mb-1">TOTAL ENTITIES</div>
          <div className="text-2xl sm:text-3xl font-bold text-black">{statistics.totalEntities}</div>
        </div>

        {/* Total Funding */}
        <div className="bg-white border-2 border-black p-3 sm:p-4">
          <div className="text-xs font-mono text-gray-600 font-bold mb-1">TOTAL FUNDING</div>
          <div className="text-2xl sm:text-3xl font-bold text-green-600">
            {formatLargeCurrency(statistics.totalFunding)}
          </div>
        </div>

        {/* Funded Companies */}
        <div className="bg-white border-2 border-black p-3 sm:p-4">
          <div className="text-xs font-mono text-gray-600 font-bold mb-1">FUNDED</div>
          <div className="text-2xl sm:text-3xl font-bold text-blue-600">
            {statistics.fundedCompaniesCount}
          </div>
          <div className="text-xs text-gray-500 mt-1">companies</div>
        </div>

        {/* USV Platforms */}
        <div className="bg-white border-2 border-black p-3 sm:p-4">
          <div className="text-xs font-mono text-gray-600 font-bold mb-1">USV PLATFORMS</div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-600">
            {statistics.entityTypeCounts["usv platform"] || 0}
          </div>
        </div>
      </div>
    </div>
  );
}
