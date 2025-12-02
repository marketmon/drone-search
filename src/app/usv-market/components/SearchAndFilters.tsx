"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp, Check, Info, SlidersHorizontal } from "lucide-react";
import { FilterInfoDialog } from "./FilterInfoDialog";
import { NewEntitiesDrawer } from "./NewEntitiesDrawer";
import { isRecentlyAdded } from "../utils";
import { Company } from "../types";

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedEntityTypes: Set<string>;
  selectedEntityCategories: Set<string>;
  selectedCompanyTypes: Set<string>;
  onToggleEntityType: (type: string) => void;
  onToggleEntityCategory: (category: string) => void;
  onToggleCompanyType: (type: string) => void;
  onSelectAllEntityTypes: () => void;
  onDeselectAllEntityTypes: () => void;
  onSelectAllEntityCategories: () => void;
  onDeselectAllEntityCategories: () => void;
  onSelectAllCompanyTypes: () => void;
  onDeselectAllCompanyTypes: () => void;
  availableEntityCategories: string[];
  statistics: {
    entityTypeCounts: Record<string, number>;
    entityCategoryCounts: Record<string, number>;
    companyTypeCounts: Record<string, number>;
  };
  showFilters?: boolean;
  showMapFilter?: boolean;
  onToggleMapFilter?: () => void;
  mapFilterActive?: boolean;
  allEntities?: Company[];
}

export function SearchAndFilters({
  searchTerm,
  onSearchChange,
  selectedEntityTypes,
  selectedEntityCategories,
  selectedCompanyTypes,
  onToggleEntityType,
  onToggleEntityCategory,
  onToggleCompanyType,
  onSelectAllEntityTypes,
  onDeselectAllEntityTypes,
  onSelectAllEntityCategories,
  onDeselectAllEntityCategories,
  onSelectAllCompanyTypes,
  onDeselectAllCompanyTypes,
  availableEntityCategories,
  statistics,
  showFilters = true,
  showMapFilter = false,
  onToggleMapFilter,
  mapFilterActive = false,
  allEntities = [],
}: SearchAndFiltersProps) {
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["entity-type"]));
  const [filtersCollapsed, setFiltersCollapsed] = useState(true); // Start collapsed by default

  // Filter entities added within the last 7 days
  const newEntities = useMemo(() => {
    return allEntities.filter((entity) => isRecentlyAdded(entity.dateAdded, 7));
  }, [allEntities]);

  // Count only the entity categories that are relevant to selected entity types
  const relevantEntityCategoryCount = useMemo(() => {
    const allRelevantCategories = availableEntityCategories;
    return Array.from(selectedEntityCategories).filter(cat =>
      allRelevantCategories.includes(cat)
    ).length;
  }, [selectedEntityCategories, availableEntityCategories]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  // Level 1: Entity Types with icons/colors
  const entityTypes = [
    { value: "company", label: "Company", color: "bg-blue-100 text-blue-700 border-blue-500 hover:bg-blue-200" },
    { value: "partner", label: "Partner", color: "bg-green-100 text-green-700 border-green-500 hover:bg-green-200" },
    { value: "government", label: "Government", color: "bg-slate-100 text-slate-700 border-slate-500 hover:bg-slate-200" },
    { value: "investor", label: "Investor", color: "bg-amber-100 text-amber-700 border-amber-500 hover:bg-amber-200" },
  ];

  // Level 2: Entity Categories grouped by parent
  const entityCategoryGroups = {
    company: [
      { value: "usv platform", label: "USV Platform" },
      { value: "usv integrator", label: "USV Integrator" },
      { value: "autonomy provider", label: "Autonomy Provider" },
      { value: "payload", label: "Payload" },
    ],
    partner: [
      { value: "university", label: "University" },
      { value: "research institute", label: "Research Institute" },
      { value: "incubator", label: "Incubator" },
      { value: "non-profit/association", label: "Non-Profit/Association" },
      { value: "framework", label: "Framework" },
    ],
    government: [
      { value: "civil", label: "Civil" },
      { value: "military", label: "Military" },
    ],
    investor: [],
  };

  // Level 3: Company Types
  const companyTypes = [
    { value: "startup", label: "Startup" },
    { value: "mid-tier", label: "Mid-Tier" },
    { value: "new prime", label: "New Prime" },
    { value: "legacy", label: "Legacy" },
  ];

  // Show Entity Category section if any Entity Type is selected
  const showEntityCategoryFilter = availableEntityCategories.length > 0;

  // Show Company Type section only when "company" is selected
  const showCompanyTypeFilter = selectedEntityTypes.has("company");

  return (
    <div className="bg-white border-2 border-black border-t-0 p-6 text-black">
      <div className="flex flex-col gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search companies, locations, or descriptions..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-2 border-gray-300 focus:border-blue-600 rounded-none font-mono text-sm h-12"
          />
        </div>

        {/* Map Filter Toggle */}
        {showMapFilter && onToggleMapFilter && (
          <div className="flex gap-3 items-center flex-wrap">
            <span className="text-xs font-mono text-gray-600 font-bold">FILTER:</span>
            <Button
              onClick={onToggleMapFilter}
              className={`font-mono text-xs tracking-wider px-4 py-2 rounded-none transition-all ${mapFilterActive
                ? "bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700"
                : "bg-white text-black border-2 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {mapFilterActive ? "SHOW CONTRACTS & KEY PLAYERS" : "SHOW ONLY KEY PLAYERS"}
            </Button>
          </div>
        )}

        {/* Hierarchical Filters Toggle Button and New Entities Button */}
        {showFilters && (
          <div className="flex gap-3 items-center flex-wrap justify-between">
            <Button
              onClick={() => setFiltersCollapsed(!filtersCollapsed)}
              className="font-mono cursor-pointer text-xs tracking-wider px-4 py-2 rounded-none transition-all bg-white text-black border-2 border-black hover:bg-black hover:text-white flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {filtersCollapsed ? "SHOW FILTERS" : "HIDE FILTERS"}
              <span className="text-xs bg-black text-white px-2 py-0.5 ml-1">
                {selectedEntityTypes.size + selectedEntityCategories.size + selectedCompanyTypes.size} ACTIVE
              </span>
            </Button>
            <NewEntitiesDrawer newEntities={newEntities} />
          </div>
        )}

        {/* Hierarchical Filters */}
        {showFilters && !filtersCollapsed && (
          <div className="border-2 border-black">
            {/* Header */}
            <div className="bg-gray-100 border-b-2 border-black px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-600 font-bold">HIERARCHICAL FILTERS</span>
              <button
                onClick={() => setInfoDialogOpen(true)}
                className="w-7 h-7 border-2 border-black bg-white cursor-pointer flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-colors group"
                title="Learn about filter hierarchy"
              >
                <Info className="w-4 h-4 text-black group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Level 1: Entity Type */}
            <div className="border-b-2 border-gray-300">
              <button
                onClick={() => toggleSection("entity-type")}
                className="w-full px-4 py-3 flex items-center justify-between bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-blue-600 text-white px-2 py-0.5">LEVEL 1</span>
                  <span className="font-mono text-sm font-bold text-black">Entity Type</span>
                  <span className="text-xs text-gray-500 font-mono">({selectedEntityTypes.size} selected)</span>
                </div>
                {expandedSections.has("entity-type") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expandedSections.has("entity-type") && (
                <div className="p-4 bg-white">
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={onSelectAllEntityTypes}
                      className="text-xs font-mono px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300"
                    >
                      SELECT ALL
                    </button>
                    <button
                      onClick={onDeselectAllEntityTypes}
                      className="text-xs font-mono px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300"
                    >
                      CLEAR
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {entityTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => onToggleEntityType(type.value)}
                        className={`px-3 py-2 border-2 font-mono text-xs transition-all flex items-center justify-between ${selectedEntityTypes.has(type.value)
                          ? type.color + " border-current"
                          : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                          }`}
                      >
                        <span className="font-bold">{type.label}</span>
                        <span className="text-xs bg-white/50 px-1.5 py-0.5 rounded">
                          {statistics.entityTypeCounts[type.value] || 0}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Level 2: Entity Category (dynamic based on Level 1) */}
            {showEntityCategoryFilter && (
              <div className="border-b-2 border-gray-300">
                <button
                  onClick={() => toggleSection("entity-category")}
                  className="w-full px-4 py-3 flex items-center justify-between bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-green-600 text-white px-2 py-0.5">LEVEL 2</span>
                    <span className="font-mono text-sm font-bold text-black">Entity Category</span>
                    <span className="text-xs text-gray-500 font-mono">({relevantEntityCategoryCount} selected)</span>
                  </div>
                  {expandedSections.has("entity-category") ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.has("entity-category") && (
                  <div className="p-4 bg-white">
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={onSelectAllEntityCategories}
                        className="text-xs font-mono px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300"
                      >
                        SELECT ALL
                      </button>
                      <button
                        onClick={onDeselectAllEntityCategories}
                        className="text-xs font-mono px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300"
                      >
                        CLEAR
                      </button>
                    </div>
                    <div className="space-y-3">
                      {/* Group by parent entity type */}
                      {selectedEntityTypes.has("company") && entityCategoryGroups.company.length > 0 && (
                        <div>
                          <div className="text-xs font-mono font-bold text-blue-700 mb-2 pb-1 border-b border-blue-200">
                            COMPANY CATEGORIES
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {entityCategoryGroups.company.map((cat) => (
                              <label
                                key={cat.value}
                                className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 cursor-pointer font-mono text-xs border border-gray-200"
                              >
                                <div className="w-4 h-4 border-2 border-black flex items-center justify-center flex-shrink-0">
                                  {selectedEntityCategories.has(cat.value) && <Check className="w-3 h-3" />}
                                </div>
                                <input
                                  type="checkbox"
                                  checked={selectedEntityCategories.has(cat.value)}
                                  onChange={() => onToggleEntityCategory(cat.value)}
                                  className="sr-only"
                                />
                                <span className="flex-1">{cat.label}</span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5">
                                  {statistics.entityCategoryCounts[cat.value] || 0}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedEntityTypes.has("partner") && entityCategoryGroups.partner.length > 0 && (
                        <div>
                          <div className="text-xs font-mono font-bold text-green-700 mb-2 pb-1 border-b border-green-200">
                            PARTNER CATEGORIES
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {entityCategoryGroups.partner.map((cat) => (
                              <label
                                key={cat.value}
                                className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 cursor-pointer font-mono text-xs border border-gray-200"
                              >
                                <div className="w-4 h-4 border-2 border-black flex items-center justify-center flex-shrink-0">
                                  {selectedEntityCategories.has(cat.value) && <Check className="w-3 h-3" />}
                                </div>
                                <input
                                  type="checkbox"
                                  checked={selectedEntityCategories.has(cat.value)}
                                  onChange={() => onToggleEntityCategory(cat.value)}
                                  className="sr-only"
                                />
                                <span className="flex-1">{cat.label}</span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5">
                                  {statistics.entityCategoryCounts[cat.value] || 0}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedEntityTypes.has("government") && entityCategoryGroups.government.length > 0 && (
                        <div>
                          <div className="text-xs font-mono font-bold text-slate-700 mb-2 pb-1 border-b border-slate-200">
                            GOVERNMENT CATEGORIES
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {entityCategoryGroups.government.map((cat) => (
                              <label
                                key={cat.value}
                                className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 cursor-pointer font-mono text-xs border border-gray-200"
                              >
                                <div className="w-4 h-4 border-2 border-black flex items-center justify-center flex-shrink-0">
                                  {selectedEntityCategories.has(cat.value) && <Check className="w-3 h-3" />}
                                </div>
                                <input
                                  type="checkbox"
                                  checked={selectedEntityCategories.has(cat.value)}
                                  onChange={() => onToggleEntityCategory(cat.value)}
                                  className="sr-only"
                                />
                                <span className="flex-1">{cat.label}</span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5">
                                  {statistics.entityCategoryCounts[cat.value] || 0}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedEntityTypes.has("investor") && (
                        <div className="text-xs font-mono text-gray-500 italic py-2">
                          No entity categories available for investors
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Level 3: Company Type (only for companies) */}
            {showCompanyTypeFilter && (
              <div>
                <button
                  onClick={() => toggleSection("company-type")}
                  className="w-full px-4 py-3 flex items-center justify-between bg-purple-50 hover:bg-purple-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-purple-600 text-white px-2 py-0.5">LEVEL 3</span>
                    <span className="font-mono text-sm font-bold text-black">Company Type</span>
                    <span className="text-xs text-gray-500 font-mono">({selectedCompanyTypes.size} selected)</span>
                  </div>
                  {expandedSections.has("company-type") ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.has("company-type") && (
                  <div className="p-4 bg-white">
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={onSelectAllCompanyTypes}
                        className="text-xs font-mono px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300"
                      >
                        SELECT ALL
                      </button>
                      <button
                        onClick={onDeselectAllCompanyTypes}
                        className="text-xs font-mono px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300"
                      >
                        CLEAR
                      </button>
                    </div>
                    <div className="text-xs text-gray-600 mb-2 font-mono italic">
                      Maturity stage classification (only applies to companies)
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {companyTypes.map((type) => (
                        <label
                          key={type.value}
                          className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 cursor-pointer font-mono text-xs border border-gray-200"
                        >
                          <div className="w-4 h-4 border-2 border-black flex items-center justify-center flex-shrink-0">
                            {selectedCompanyTypes.has(type.value) && <Check className="w-3 h-3" />}
                          </div>
                          <input
                            type="checkbox"
                            checked={selectedCompanyTypes.has(type.value)}
                            onChange={() => onToggleCompanyType(type.value)}
                            className="sr-only"
                          />
                          <span className="flex-1">{type.label}</span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5">
                            {statistics.companyTypeCounts[type.value] || 0}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Dialog */}
      <FilterInfoDialog isOpen={infoDialogOpen} onClose={() => setInfoDialogOpen(false)} />
    </div>
  );
}
