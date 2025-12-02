import { useState, useMemo } from "react";
import { Company, EntityType, EntityCategory } from "../types";
import { locationMatchesSearch } from "../utils";

// Define entity category relationships
const entityCategoryMap: Record<EntityType, EntityCategory[]> = {
  company: ["usv platform", "usv integrator", "autonomy provider", "payload"],
  partner: ["university", "research institute", "incubator", "non-profit/association", "framework"],
  government: ["civil", "military"],
  investor: [], // No entity categories for investors
};

export function useFilters(marketCompanies: Company[]) {
  const [searchTerm, setSearchTerm] = useState("");

  // Level 1: Entity Type (company/partner/government/investor)
  const [selectedEntityTypes, setSelectedEntityTypes] = useState<Set<string>>(
    new Set(["company", "partner", "government", "investor"])
  );

  // Level 2: Entity Category (usv platform, usv integrator, etc.)
  const [selectedEntityCategories, setSelectedEntityCategories] = useState<Set<string>>(
    new Set([
      "usv platform", "usv integrator", "autonomy provider", "payload",
      "university", "research institute", "incubator", "non-profit/association", "framework",
      "civil", "military"
    ])
  );

  // Level 3: Company Type (startup/legacy/mid-tier/new prime) - only for companies
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState<Set<string>>(
    new Set(["startup", "legacy", "mid-tier", "new prime"])
  );

  // Toggle functions for each level
  const toggleEntityType = (entityType: string) => {
    setSelectedEntityTypes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(entityType)) {
        newSet.delete(entityType);
      } else {
        newSet.add(entityType);
      }
      return newSet;
    });
  };

  const toggleEntityCategory = (category: string) => {
    setSelectedEntityCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const toggleCompanyType = (companyType: string) => {
    setSelectedCompanyTypes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(companyType)) {
        newSet.delete(companyType);
      } else {
        newSet.add(companyType);
      }
      return newSet;
    });
  };

  // Select/Deselect all functions
  const selectAllEntityTypes = () => {
    setSelectedEntityTypes(new Set(["company", "partner", "government", "investor"]));
  };

  const deselectAllEntityTypes = () => {
    setSelectedEntityTypes(new Set());
  };

  const selectAllEntityCategories = () => {
    setSelectedEntityCategories(
      new Set([
        "usv platform", "usv integrator", "autonomy provider", "payload",
        "university", "research institute", "incubator", "non-profit/association", "framework",
        "civil", "military"
      ])
    );
  };

  const deselectAllEntityCategories = () => {
    setSelectedEntityCategories(new Set());
  };

  const selectAllCompanyTypes = () => {
    setSelectedCompanyTypes(new Set(["startup", "legacy", "mid-tier", "new prime"]));
  };

  const deselectAllCompanyTypes = () => {
    setSelectedCompanyTypes(new Set());
  };

  // Get available entity categories based on selected entity types
  const availableEntityCategories = useMemo(() => {
    const categories = new Set<string>();
    selectedEntityTypes.forEach(entityType => {
      const categoriesForType = entityCategoryMap[entityType as EntityType] || [];
      categoriesForType.forEach(cat => categories.add(cat));
    });
    return Array.from(categories);
  }, [selectedEntityTypes]);

  // Main filtering logic
  const filteredCompanies = useMemo(() => {
    const filtered = marketCompanies.filter((company) => {
      // Level 0: Search term
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company.description && company.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        locationMatchesSearch(company.location, searchTerm);

      // Level 1: Entity Type
      const matchesEntityType = selectedEntityTypes.has(company.entityType);

      // Level 2: Entity Category (if applicable)
      const matchesEntityCategory = company.entityCategory
        ? selectedEntityCategories.has(company.entityCategory)
        : true; // If no category, pass this filter

      // Level 3: Company Type (only for companies)
      const matchesCompanyType =
        company.entityType === "company" && company.companyType
          ? selectedCompanyTypes.has(company.companyType)
          : true; // Non-companies or companies without type pass this filter

      return matchesSearch && matchesEntityType && matchesEntityCategory && matchesCompanyType;
    });

    // Shuffle the filtered results
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, [searchTerm, selectedEntityTypes, selectedEntityCategories, selectedCompanyTypes, marketCompanies]);

  // Dynamic filter counts based on current selections
  const dynamicFilterCounts = useMemo(() => {
    // Entity Type counts (filter by search, entity categories, and company types)
    const entityTypeCounts: Record<string, number> = {};

    marketCompanies.forEach((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company.description && company.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        locationMatchesSearch(company.location, searchTerm);

      const matchesEntityCategory = company.entityCategory
        ? selectedEntityCategories.has(company.entityCategory)
        : true;

      const matchesCompanyType =
        company.entityType === "company" && company.companyType
          ? selectedCompanyTypes.has(company.companyType)
          : true;

      if (matchesSearch && matchesEntityCategory && matchesCompanyType) {
        entityTypeCounts[company.entityType] = (entityTypeCounts[company.entityType] || 0) + 1;
      }
    });

    // Entity Category counts (filter by search, entity types, and company types)
    const entityCategoryCounts: Record<string, number> = {};

    marketCompanies.forEach((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company.description && company.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        locationMatchesSearch(company.location, searchTerm);

      const matchesEntityType = selectedEntityTypes.has(company.entityType);

      const matchesCompanyType =
        company.entityType === "company" && company.companyType
          ? selectedCompanyTypes.has(company.companyType)
          : true;

      if (matchesSearch && matchesEntityType && matchesCompanyType && company.entityCategory) {
        entityCategoryCounts[company.entityCategory] = (entityCategoryCounts[company.entityCategory] || 0) + 1;
      }
    });

    // Company Type counts (filter by search, entity types, and entity categories - only for companies)
    const companyTypeCounts: Record<string, number> = {};

    marketCompanies.forEach((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company.description && company.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        locationMatchesSearch(company.location, searchTerm);

      const matchesEntityType = selectedEntityTypes.has(company.entityType);

      const matchesEntityCategory = company.entityCategory
        ? selectedEntityCategories.has(company.entityCategory)
        : true;

      if (matchesSearch && matchesEntityType && matchesEntityCategory && company.entityType === "company" && company.companyType) {
        companyTypeCounts[company.companyType] = (companyTypeCounts[company.companyType] || 0) + 1;
      }
    });

    return { entityTypeCounts, entityCategoryCounts, companyTypeCounts };
  }, [searchTerm, selectedEntityTypes, selectedEntityCategories, selectedCompanyTypes, marketCompanies]);

  return {
    searchTerm,
    setSearchTerm,
    selectedEntityTypes,
    selectedEntityCategories,
    selectedCompanyTypes,
    toggleEntityType,
    toggleEntityCategory,
    toggleCompanyType,
    selectAllEntityTypes,
    deselectAllEntityTypes,
    selectAllEntityCategories,
    deselectAllEntityCategories,
    selectAllCompanyTypes,
    deselectAllCompanyTypes,
    availableEntityCategories,
    filteredCompanies,
    dynamicFilterCounts,
  };
}
