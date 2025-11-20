"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, Check, Info } from "lucide-react";
import { FilterInfoDialog } from "./FilterInfoDialog";

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedEntityTypes: Set<string>;
  selectedCategories: Set<string>;
  onToggleEntityType: (type: string) => void;
  onToggleCategory: (category: string) => void;
  onSelectAllEntityTypes: () => void;
  onDeselectAllEntityTypes: () => void;
  onSelectAllCategories: () => void;
  onDeselectAllCategories: () => void;
  statistics: {
    entityTypeCounts: Record<string, number>;
    categoryCounts: Record<string, number>;
  };
  showFilters?: boolean;
  showMapFilter?: boolean;
  onToggleMapFilter?: () => void;
  mapFilterActive?: boolean;
}

export function SearchAndFilters({
  searchTerm,
  onSearchChange,
  selectedEntityTypes,
  selectedCategories,
  onToggleEntityType,
  onToggleCategory,
  onSelectAllEntityTypes,
  onDeselectAllEntityTypes,
  onSelectAllCategories,
  onDeselectAllCategories,
  statistics,
  showFilters = true,
  showMapFilter = false,
  onToggleMapFilter,
  mapFilterActive = false,
}: SearchAndFiltersProps) {
  const [entityTypeDropdownOpen, setEntityTypeDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.filter-dropdown')) {
        setEntityTypeDropdownOpen(false);
        setCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle entity type dropdown and close category dropdown
  const toggleEntityTypeDropdown = () => {
    setEntityTypeDropdownOpen(!entityTypeDropdownOpen);
    setCategoryDropdownOpen(false);
  };

  // Toggle category dropdown and close entity type dropdown
  const toggleCategoryDropdown = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen);
    setEntityTypeDropdownOpen(false);
  };

  const entityTypes = [
    { value: "usv platform", label: "USV Platform" },
    { value: "boatbuilder", label: "Boatbuilder" },
    { value: "investor", label: "Investor" },
    { value: "university", label: "University" },
    { value: "research institute", label: "Research Institute" },
    { value: "incubator", label: "Incubator" },
    { value: "gov. agency", label: "Gov. Agency" },
    { value: "association", label: "Association" },
  ];

  const categories = [
    { value: "startup", label: "Startup" },
    { value: "mid-tier", label: "Mid-Tier" },
    { value: "new prime", label: "New Prime" },
    { value: "legacy", label: "Legacy Prime" },
  ];

  const showCategoryFilter = selectedEntityTypes.has("usv platform") || selectedEntityTypes.has("boatbuilder");

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
        {/* Filter Dropdowns */}
        {showFilters && (
          <div className="flex gap-3 items-center flex-wrap justify-between">
            <div className="flex gap-3 items-center flex-wrap">
              <span className="text-xs font-mono text-gray-600 font-bold">FILTERS:</span>

              {/* Entity Type Dropdown */}
              <div className="relative filter-dropdown">
                <Button
                  onClick={toggleEntityTypeDropdown}
                  className="bg-white hover:bg-gray-50 text-black border-2 border-black font-mono text-xs px-4 py-2 rounded-none flex items-center gap-2"
                >
                  ENTITY TYPE ({selectedEntityTypes.size})
                  <ChevronDown className="w-4 h-4" />
                </Button>
                {entityTypeDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border-2 border-black shadow-lg z-[100] min-w-[250px] max-w-[280px]">
                    <div className="flex gap-2 p-2 border-b-2 border-gray-200">
                      <button
                        onClick={onSelectAllEntityTypes}
                        className="flex-1 text-xs font-mono px-2 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300"
                      >
                        SELECT ALL
                      </button>
                      <button
                        onClick={onDeselectAllEntityTypes}
                        className="flex-1 text-xs font-mono px-2 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300"
                      >
                        CLEAR
                      </button>
                    </div>
                    <div className="p-2 max-h-[240px] overflow-y-auto">
                      {entityTypes.map((type) => (
                        <label
                          key={type.value}
                          className="flex items-center justify-between gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer font-mono text-sm"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-4 h-4 border-2 border-black flex items-center justify-center flex-shrink-0">
                              {selectedEntityTypes.has(type.value) && <Check className="w-3 h-3" />}
                            </div>
                            <input
                              type="checkbox"
                              checked={selectedEntityTypes.has(type.value)}
                              onChange={() => onToggleEntityType(type.value)}
                              className="sr-only"
                            />
                            <span>{type.label}</span>
                          </div>
                          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {statistics.entityTypeCounts[type.value] || 0}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Category Dropdown */}
              {showCategoryFilter && (
                <div className="relative filter-dropdown">
                  <Button
                    onClick={toggleCategoryDropdown}
                    className="bg-white hover:bg-gray-50 text-black border-2 border-black font-mono text-xs px-4 py-2 rounded-none flex items-center gap-2"
                  >
                    CATEGORY ({selectedCategories.size})
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  {categoryDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border-2 border-black shadow-lg z-[100] min-w-[200px] max-w-[240px]">
                      <div className="flex gap-2 p-2 border-b-2 border-gray-200">
                        <button
                          onClick={onSelectAllCategories}
                          className="flex-1 text-xs font-mono px-2 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300"
                        >
                          SELECT ALL
                        </button>
                        <button
                          onClick={onDeselectAllCategories}
                          className="flex-1 text-xs font-mono px-2 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300"
                        >
                          CLEAR
                        </button>
                      </div>
                      <div className="p-2 max-h-[180px] overflow-y-auto">
                        {categories.map((cat) => (
                          <label
                            key={cat.value}
                            className="flex items-center justify-between gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer font-mono text-sm"
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <div className="w-4 h-4 border-2 border-black flex items-center justify-center flex-shrink-0">
                                {selectedCategories.has(cat.value) && <Check className="w-3 h-3" />}
                              </div>
                              <input
                                type="checkbox"
                                checked={selectedCategories.has(cat.value)}
                                onChange={() => onToggleCategory(cat.value)}
                                className="sr-only"
                              />
                              <span>{cat.label}</span>
                            </div>
                            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {statistics.categoryCounts[cat.value] || 0}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Info Button - Far Right */}
            <button
              onClick={() => setInfoDialogOpen(true)}
              className="w-9 h-9 border-2 border-black bg-white cursor-pointer flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-colors group"
              title="Learn about entity types and categories"
            >
              <Info className="w-5 h-5 text-black group-hover:text-white transition-colors" />
            </button>
          </div>
        )}
      </div>

      {/* Info Dialog */}
      <FilterInfoDialog isOpen={infoDialogOpen} onClose={() => setInfoDialogOpen(false)} />
    </div>
  );
}
