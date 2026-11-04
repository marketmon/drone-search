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

const ALL_COMPANY_TYPES = ["startup", "legacy", "mid-tier", "new prime", "prime"];

const KNOWN_ENTITY_CATEGORIES = new Set<string>(Object.values(entityCategoryMap).flat());

type Dimension = "entityType" | "entityCategory" | "companyType" | "region" | "country";

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
    new Set(ALL_COMPANY_TYPES)
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
    setSelectedCompanyTypes(new Set(ALL_COMPANY_TYPES));
  };

  const deselectAllCompanyTypes = () => {
    setSelectedCompanyTypes(new Set());
  };

  // Geography toggle functions
  // Regions and countries move together: checking a region selects its countries,
  // unchecking it removes them, so a checked region can never show zero results.
  const toggleRegion = (region: string) => {
    const regionCountries = getCountriesForRegion(marketCompanies, region);
    const adding = !selectedRegions.has(region);
    setSelectedRegions((prev) => {
      const newSet = new Set(prev);
      if (adding) newSet.add(region);
      else newSet.delete(region);
      return newSet;
    });
    setSelectedCountries((prev) => {
      const newSet = new Set(prev);
      regionCountries.forEach((country) => (adding ? newSet.add(country) : newSet.delete(country)));
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

  const selectAllRegions = () => {
    setSelectedRegions(new Set(availableRegions));
    setSelectedCountries(new Set(allCountries));
  };
  const deselectAllRegions = () => {
    setSelectedRegions(new Set());
    setSelectedCountries(new Set());
  };
  // Country buttons act within the currently selected regions
  const selectAllCountries = () => setSelectedCountries(new Set(availableCountries));
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

  // Single source of truth for whether a company passes the filters.
  // `skip` omits one dimension so facet counts reflect "what would I get if I toggled this one".
  const matchesFilters = (company: Company, skip?: Dimension): boolean => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      company.name.toLowerCase().includes(term) ||
      (!!company.description && company.description.toLowerCase().includes(term)) ||
      locationMatchesSearch(company.location, searchTerm);
    if (!matchesSearch) return false;

    if (skip !== "entityType" && !selectedEntityTypes.has(company.entityType)) return false;

    // Category / company type only apply while their parent entity type is relevant
    // Unrecognized values (typos in the sheet) can't be toggled, so they're treated like blank ones
    if (
      skip !== "entityCategory" &&
      company.entityCategory &&
      KNOWN_ENTITY_CATEGORIES.has(company.entityCategory) &&
      !selectedEntityCategories.has(company.entityCategory)
    ) {
      return false;
    }

    if (
      skip !== "companyType" &&
      company.entityType === "company" &&
      company.companyType &&
      ALL_COMPANY_TYPES.includes(company.companyType) &&
      !selectedCompanyTypes.has(company.companyType)
    ) {
      return false;
    }

    // Entities with no known region can't be toggled off individually, so they only show
    // while every region is selected (otherwise they'd stay visible no matter the filter)
    const region = getRegionFromCountry(company.country);
    const allRegionsSelected = availableRegions.every((r) => selectedRegions.has(r));
    const regionOk = region ? selectedRegions.has(region) : allRegionsSelected;
    if (skip !== "region" && !regionOk) return false;

    const country = company.country?.trim();
    if (skip !== "country" && skip !== "region" && country && !selectedCountries.has(country)) return false;
    if (skip === "region" && country && !selectedCountries.has(country)) return false;

    return true;
  };

  const filteredCompanies = useMemo(() => {
    const filtered = marketCompanies.filter((company) => matchesFilters(company));

    // Shuffle the filtered results
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedEntityTypes, selectedEntityCategories, selectedCompanyTypes, selectedRegions, selectedCountries, marketCompanies]);

  // Each count = entities that pass every OTHER filter, so counts always agree with the results list
  const dynamicFilterCounts = useMemo(() => {
    const entityTypeCounts: Record<string, number> = {};
    const entityCategoryCounts: Record<string, number> = {};
    const companyTypeCounts: Record<string, number> = {};
    const regionCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};

    marketCompanies.forEach((company) => {
      if (matchesFilters(company, "entityType")) {
        entityTypeCounts[company.entityType] = (entityTypeCounts[company.entityType] || 0) + 1;
      }
      if (company.entityCategory && matchesFilters(company, "entityCategory")) {
        entityCategoryCounts[company.entityCategory] = (entityCategoryCounts[company.entityCategory] || 0) + 1;
      }
      if (company.entityType === "company" && company.companyType && matchesFilters(company, "companyType")) {
        companyTypeCounts[company.companyType] = (companyTypeCounts[company.companyType] || 0) + 1;
      }
      const region = getRegionFromCountry(company.country);
      if (region && matchesFilters(company, "region")) {
        regionCounts[region] = (regionCounts[region] || 0) + 1;
      }
      const country = company.country?.trim();
      if (country && matchesFilters(company, "country")) {
        countryCounts[country] = (countryCounts[country] || 0) + 1;
      }
    });

    return { entityTypeCounts, entityCategoryCounts, companyTypeCounts, regionCounts, countryCounts };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
