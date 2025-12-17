import { useState, useMemo, useEffect } from "react";
import { Company, EntityType, EntityCategory } from "../types";
import { locationMatchesSearch } from "../utils";
import { getRegionFromCountry, getUniqueCountries, getUniqueRegions, getCountriesForRegion } from "../regions";

// Define entity category relationships
const entityCategoryMap: Record<EntityType, EntityCategory[]> = {
  company: ["usv platform", "usv integrator", "autonomy provider", "usv operator", "component manufacturer"],
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
      "usv platform", "usv integrator", "autonomy provider", "usv operator", "component manufacturer",
      "university", "research institute", "incubator", "non-profit/association", "framework",
      "civil", "military"
    ])
  );

  // Level 3: Company Type (startup/legacy/mid-tier/new prime) - only for companies
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState<Set<string>>(
    new Set(["startup", "legacy", "mid-tier", "new prime"])
  );

  // Get all regions and countries that exist in the data
  const availableRegions = useMemo(() => getUniqueRegions(marketCompanies), [marketCompanies]);
  const allCountries = useMemo(() => getUniqueCountries(marketCompanies), [marketCompanies]);

  // Geographic filters
  const [selectedRegions, setSelectedRegions] = useState<Set<string>>(new Set());
  const [selectedCountries, setSelectedCountries] = useState<Set<string>>(new Set());

  // Initialize regions and countries when data loads
  useEffect(() => {
    if (marketCompanies.length > 0 && selectedRegions.size === 0) {
      setSelectedRegions(new Set(availableRegions));
      setSelectedCountries(new Set(allCountries));
    }
  }, [marketCompanies.length]);

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
        "usv platform", "usv integrator", "autonomy provider", "usv operator", "component manufacturer",
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

  // Geography toggle functions
  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(region)) {
        newSet.delete(region);
      } else {
        newSet.add(region);
      }
      return newSet;
    });
  };

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(country)) {
        newSet.delete(country);
      } else {
        newSet.add(country);
      }
      return newSet;
    });
  };

  const selectAllRegions = () => setSelectedRegions(new Set(availableRegions));
  const deselectAllRegions = () => setSelectedRegions(new Set());
  const selectAllCountries = () => setSelectedCountries(new Set(allCountries));
  const deselectAllCountries = () => setSelectedCountries(new Set());

  // Get available entity categories based on selected entity types
  const availableEntityCategories = useMemo(() => {
    const categories = new Set<string>();
    selectedEntityTypes.forEach(entityType => {
      const categoriesForType = entityCategoryMap[entityType as EntityType] || [];
      categoriesForType.forEach(cat => categories.add(cat));
    });
    return Array.from(categories);
  }, [selectedEntityTypes]);

  // Get available countries based on selected regions
  const availableCountries = useMemo(() => {
    if (selectedRegions.size === 0) return [];
    const countries = new Set<string>();
    selectedRegions.forEach(region => {
      const regionCountries = getCountriesForRegion(marketCompanies, region);
      regionCountries.forEach(country => countries.add(country));
    });
    return Array.from(countries).sort();
  }, [selectedRegions, marketCompanies]);

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

      // Geography: Region filter
      const companyRegion = getRegionFromCountry(company.country);
      const matchesRegion = companyRegion ? selectedRegions.has(companyRegion) : true;

      // Geography: Country filter
      const matchesCountry = selectedCountries.size === 0 || selectedCountries.has(company.country);

      return matchesSearch && matchesEntityType && matchesEntityCategory && matchesCompanyType && matchesRegion && matchesCountry;
    });

    // Shuffle the filtered results
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, [searchTerm, selectedEntityTypes, selectedEntityCategories, selectedCompanyTypes, selectedRegions, selectedCountries, marketCompanies]);

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

    // Region counts (filter by search and entity filters only - NOT by country)
    // We want to show all regions that have data, regardless of country selection
    const regionCounts: Record<string, number> = {};

    marketCompanies.forEach((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company.description && company.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        locationMatchesSearch(company.location, searchTerm);

      const matchesEntityType = selectedEntityTypes.has(company.entityType);

      const matchesEntityCategory = company.entityCategory
        ? selectedEntityCategories.has(company.entityCategory)
        : true;

      const matchesCompanyType =
        company.entityType === "company" && company.companyType
          ? selectedCompanyTypes.has(company.companyType)
          : true;

      // Don't filter by country when calculating region counts!
      if (matchesSearch && matchesEntityType && matchesEntityCategory && matchesCompanyType) {
        const region = getRegionFromCountry(company.country);
        if (region) {
          regionCounts[region] = (regionCounts[region] || 0) + 1;
        }
      }
    });

    // Country counts (filter by search, entity filters, and region filter)
    const countryCounts: Record<string, number> = {};

    marketCompanies.forEach((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company.description && company.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        locationMatchesSearch(company.location, searchTerm);

      const matchesEntityType = selectedEntityTypes.has(company.entityType);

      const matchesEntityCategory = company.entityCategory
        ? selectedEntityCategories.has(company.entityCategory)
        : true;

      const matchesCompanyType =
        company.entityType === "company" && company.companyType
          ? selectedCompanyTypes.has(company.companyType)
          : true;

      const companyRegion = getRegionFromCountry(company.country);
      const matchesRegion = companyRegion ? selectedRegions.has(companyRegion) : true;

      if (matchesSearch && matchesEntityType && matchesEntityCategory && matchesCompanyType && matchesRegion && company.country) {
        countryCounts[company.country] = (countryCounts[company.country] || 0) + 1;
      }
    });

    return { entityTypeCounts, entityCategoryCounts, companyTypeCounts, regionCounts, countryCounts };
  }, [searchTerm, selectedEntityTypes, selectedEntityCategories, selectedCompanyTypes, selectedRegions, selectedCountries, marketCompanies]);

  return {
    searchTerm,
    setSearchTerm,
    selectedEntityTypes,
    selectedEntityCategories,
    selectedCompanyTypes,
    selectedRegions,
    selectedCountries,
    toggleEntityType,
    toggleEntityCategory,
    toggleCompanyType,
    toggleRegion,
    toggleCountry,
    selectAllEntityTypes,
    deselectAllEntityTypes,
    selectAllEntityCategories,
    deselectAllEntityCategories,
    selectAllCompanyTypes,
    deselectAllCompanyTypes,
    selectAllRegions,
    deselectAllRegions,
    selectAllCountries,
    deselectAllCountries,
    availableEntityCategories,
    availableCountries,
    availableRegions,
    filteredCompanies,
    dynamicFilterCounts,
  };
}
