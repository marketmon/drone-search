import { useMemo } from "react";
import { Company } from "../types";

export function useStatistics(marketCompanies: Company[]) {
  return useMemo(() => {
    const totalEntities = marketCompanies.length;
    const totalFunding = marketCompanies.reduce((sum, company) => sum + (company.funding || 0), 0);
    const fundedCompaniesCount = marketCompanies.filter(company => company.funding && company.funding > 0).length;

    const entityTypeCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};

    marketCompanies.forEach(company => {
      // Count by entity type
      entityTypeCounts[company.entityType] = (entityTypeCounts[company.entityType] || 0) + 1;

      // Count by category (only for USV platforms)
      if (company.entityCategory === "usv platform" && company.companyType) {
        categoryCounts[company.companyType] = (categoryCounts[company.companyType] || 0) + 1;
      }
    });

    return {
      totalEntities,
      totalFunding,
      fundedCompaniesCount,
      entityTypeCounts,
      categoryCounts,
    };
  }, [marketCompanies]);
}
