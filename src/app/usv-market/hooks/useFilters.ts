import { useState, useMemo } from "react";
import { Company } from "../types";
import { locationMatchesSearch } from "../utils";

export function useFilters(marketCompanies: Company[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(["startup", "legacy", "mid-tier", "new prime"])
  );
  const [selectedEntityTypes, setSelectedEntityTypes] = useState<Set<string>>(
    new Set(["usv platform", "boatbuilder", "incubator", "research institute", "gov. agency", "university", "association", "investor"])
  );

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

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

  const selectAllCategories = () => {
    setSelectedCategories(new Set(["startup", "legacy", "mid-tier", "new prime"]));
  };

  const deselectAllCategories = () => {
    setSelectedCategories(new Set());
  };

  const selectAllEntityTypes = () => {
    setSelectedEntityTypes(
      new Set(["usv platform", "boatbuilder", "incubator", "research institute", "gov. agency", "university", "association", "investor"])
    );
  };

  const deselectAllEntityTypes = () => {
    setSelectedEntityTypes(new Set());
  };

  const filteredCompanies = useMemo(() => {
    const filtered = marketCompanies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        locationMatchesSearch(company.location, searchTerm);

      const matchesEntityType = selectedEntityTypes.has(company.entityType);

      const matchesCategory =
        company.entityType === "usv platform" || company.entityType === "boatbuilder"
          ? selectedCategories.has(company.category)
          : true;

      return matchesSearch && matchesEntityType && matchesCategory;
    });

    // Shuffle the filtered results
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, [searchTerm, selectedCategories, selectedEntityTypes, marketCompanies]);

  // Dynamic filter counts based on current selections
  const dynamicFilterCounts = useMemo(() => {
    // For entity type counts: filter by search and selected categories only
    const entityTypeCounts: Record<string, number> = {};

    marketCompanies.forEach((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        locationMatchesSearch(company.location, searchTerm);

      const matchesCategory =
        company.entityType === "usv platform" || company.entityType === "boatbuilder"
          ? selectedCategories.has(company.category)
          : true;

      if (matchesSearch && matchesCategory) {
        entityTypeCounts[company.entityType] = (entityTypeCounts[company.entityType] || 0) + 1;
      }
    });

    // For category counts: filter by search and selected entity types only
    const categoryCounts: Record<string, number> = {};

    marketCompanies.forEach((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        locationMatchesSearch(company.location, searchTerm);

      const matchesEntityType = selectedEntityTypes.has(company.entityType);

      if (matchesSearch && matchesEntityType && (company.entityType === "usv platform" || company.entityType === "boatbuilder") && company.category) {
        categoryCounts[company.category] = (categoryCounts[company.category] || 0) + 1;
      }
    });

    return { entityTypeCounts, categoryCounts };
  }, [searchTerm, selectedCategories, selectedEntityTypes, marketCompanies]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategories,
    selectedEntityTypes,
    toggleCategory,
    toggleEntityType,
    selectAllCategories,
    deselectAllCategories,
    selectAllEntityTypes,
    deselectAllEntityTypes,
    filteredCompanies,
    dynamicFilterCounts,
  };
}
