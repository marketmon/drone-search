"use client";

import { useState, useMemo, useEffect } from "react";
import { Filter, Minus, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";

// Types
import { Company, ContractData, Vehicle } from "./types";

// Hooks
import { useMarketData } from "./hooks/useMarketData";
import { useFilters } from "./hooks/useFilters";
import { useStatistics } from "./hooks/useStatistics";

// Utils
import { isRecentlyAdded } from "./utils";

// Components
import { HeroHeader } from "./components/HeroHeader";
import { DatabaseSummary } from "./components/DatabaseSummary";
import { ViewToggle } from "./components/ViewToggle";
import { SearchAndFilters } from "./components/SearchAndFilters";
import { EntityGrid } from "./components/EntityGrid";
import { EntityTable } from "./components/EntityTable";
import { ContractGrid } from "./components/ContractGrid";
import { ContractTable } from "./components/ContractTable";
import { VehicleGrid } from "./components/VehicleGrid";
import { VehicleTable } from "./components/VehicleTable";
import { CompanyDrawer } from "./components/CompanyDrawer";
import { ContractDrawer } from "./components/ContractDrawer";
import { VehicleDrawer } from "./components/VehicleDrawer";
import { VehicleDialog } from "./components/VehicleDialog";
import { StructuredData } from "./components/StructuredData";

// Dynamically import map component (Leaflet needs window object)
const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function USVMarketInteractive() {
  // State
  const [viewType, setViewType] = useState<"grid" | "table" | "map">("grid");
  const [dataView, setDataView] = useState<"entities" | "contracts" | "vehicles">("entities");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedContract, setSelectedContract] = useState<ContractData | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedCompanyForVehicles, setSelectedCompanyForVehicles] = useState<string | null>(null);

  // Map-specific state
  const [mapSearchTerm, setMapSearchTerm] = useState("");
  const [showOnlyMarketPlayers, setShowOnlyMarketPlayers] = useState(false);

  // Pagination state
  const [itemsToShow, setItemsToShow] = useState(20);

  // Custom hooks
  const { marketCompanies, contractData, vehicles, vehiclesByCompany, isLoadingCompanies, isLoadingContracts } = useMarketData();
  const filters = useFilters(marketCompanies);
  const statistics = useStatistics(marketCompanies);

  // Reset pagination when filters change
  useEffect(() => {
    setItemsToShow(20);
  }, [filters.filteredCompanies.length]);

  // Calculate new entities this week
  const newEntities = useMemo(() => {
    return marketCompanies.filter((entity) => isRecentlyAdded(entity.dateAdded, 7));
  }, [marketCompanies]);

  // Filtered companies for map
  const filteredMapCompanies = useMemo(() => {
    if (!mapSearchTerm) return marketCompanies;
    const lowerSearch = mapSearchTerm.toLowerCase();
    return marketCompanies.filter(
      (company) =>
        company.name.toLowerCase().includes(lowerSearch) ||
        company.description.toLowerCase().includes(lowerSearch)
    );
  }, [marketCompanies, mapSearchTerm]);

  // Filtered contracts for map
  const filteredMapContracts = useMemo(() => {
    if (!mapSearchTerm) return contractData;
    const lowerSearch = mapSearchTerm.toLowerCase();
    return contractData.filter(
      (contract) =>
        contract.company_name.toLowerCase().includes(lowerSearch) ||
        contract.product.toLowerCase().includes(lowerSearch)
    );
  }, [contractData, mapSearchTerm]);

  // Filtered contracts for grid/table view
  const filteredContracts = useMemo(() => {
    if (!filters.searchTerm) return contractData;
    const lowerSearch = filters.searchTerm.toLowerCase();
    return contractData.filter(
      (contract) =>
        contract.company_name.toLowerCase().includes(lowerSearch) ||
        contract.product.toLowerCase().includes(lowerSearch) ||
        contract.city.toLowerCase().includes(lowerSearch) ||
        contract.state.toLowerCase().includes(lowerSearch)
    );
  }, [contractData, filters.searchTerm]);

  // Filtered vehicles for grid/table view
  const filteredVehicles = useMemo(() => {
    if (!filters.searchTerm) return vehicles;
    const lowerSearch = filters.searchTerm.toLowerCase();
    return vehicles.filter(
      (vehicle) =>
        vehicle.name.toLowerCase().includes(lowerSearch) ||
        vehicle.company.toLowerCase().includes(lowerSearch) ||
        (vehicle.propulsion && vehicle.propulsion.toLowerCase().includes(lowerSearch))
    );
  }, [vehicles, filters.searchTerm]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <StructuredData companies={marketCompanies} />

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Navigation */}
      <SiteHeader />

      {/* Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1 sm:py-2">
          {/* Hero Header */}
          <div className="mb-6 sm:mb-8">
            <HeroHeader />
            <DatabaseSummary
              totalCompanies={statistics.entityTypeCounts["company"] || 0}
              totalInvestors={statistics.entityTypeCounts["investor"] || 0}
              totalPartners={statistics.entityTypeCounts["partner"] || 0}
              totalGovernment={statistics.entityTypeCounts["government"] || 0}
              totalVehicles={vehicles.length}
              totalContracts={contractData.length}
              newEntities={newEntities}
            />
            <ViewToggle
              viewType={viewType}
              onViewTypeChange={setViewType}
              dataView={dataView}
              onDataViewChange={setDataView}
            />
            <SearchAndFilters
              searchTerm={viewType === "map" ? mapSearchTerm : filters.searchTerm}
              onSearchChange={viewType === "map" ? setMapSearchTerm : filters.setSearchTerm}
              selectedEntityTypes={filters.selectedEntityTypes}
              selectedEntityCategories={filters.selectedEntityCategories}
              selectedCompanyTypes={filters.selectedCompanyTypes}
              selectedRegions={filters.selectedRegions}
              selectedCountries={filters.selectedCountries}
              onToggleEntityType={filters.toggleEntityType}
              onToggleEntityCategory={filters.toggleEntityCategory}
              onToggleCompanyType={filters.toggleCompanyType}
              onToggleRegion={filters.toggleRegion}
              onToggleCountry={filters.toggleCountry}
              onSelectAllEntityTypes={filters.selectAllEntityTypes}
              onDeselectAllEntityTypes={filters.deselectAllEntityTypes}
              onSelectAllEntityCategories={filters.selectAllEntityCategories}
              onDeselectAllEntityCategories={filters.deselectAllEntityCategories}
              onSelectAllCompanyTypes={filters.selectAllCompanyTypes}
              onDeselectAllCompanyTypes={filters.deselectAllCompanyTypes}
              onSelectAllRegions={filters.selectAllRegions}
              onDeselectAllRegions={filters.deselectAllRegions}
              onSelectAllCountries={filters.selectAllCountries}
              onDeselectAllCountries={filters.deselectAllCountries}
              availableEntityCategories={filters.availableEntityCategories}
              availableCountries={filters.availableCountries}
              availableRegions={filters.availableRegions}
              statistics={filters.dynamicFilterCounts}
              showFilters={viewType !== "map" && dataView === "entities"}
              showMapFilter={viewType === "map"}
              onToggleMapFilter={() => setShowOnlyMarketPlayers(!showOnlyMarketPlayers)}
              mapFilterActive={showOnlyMarketPlayers}
            />
          </div>

          {/* List/Table View Content */}
          {viewType !== "map" && (
            <>

              {/* Data List */}
              {isLoadingCompanies ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="font-mono text-sm text-gray-600">Loading data...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Results Count */}
                  <div className="mb-4 px-1">
                    <p className="text-sm font-mono text-gray-600">
                      Showing{" "}
                      <span className="font-bold text-black">
                        {dataView === "entities"
                          ? filters.filteredCompanies.length
                          : dataView === "contracts"
                            ? filteredContracts.length
                            : filteredVehicles.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-black">
                        {dataView === "entities"
                          ? statistics.totalEntities
                          : dataView === "contracts"
                            ? contractData.length
                            : vehicles.length}
                      </span>{" "}
                      {dataView === "entities" ? "entities" : dataView === "contracts" ? "contracts" : "vehicles"}
                    </p>
                  </div>

                  {/* Entities View */}
                  {dataView === "entities" && (
                    <>
                      {viewType === "grid" ? (
                        <EntityGrid
                          companies={filters.filteredCompanies.slice(0, itemsToShow)}
                          vehiclesByCompany={vehiclesByCompany}
                          onCompanyClick={setSelectedCompany}
                        />
                      ) : (
                        <EntityTable
                          companies={filters.filteredCompanies.slice(0, itemsToShow)}
                          vehiclesByCompany={vehiclesByCompany}
                          onCompanyClick={setSelectedCompany}
                        />
                      )}
                      {filters.filteredCompanies.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300">
                          <p className="text-gray-500 font-mono text-sm">No entities match your search</p>
                        </div>
                      )}
                      {filters.filteredCompanies.length > itemsToShow && (
                        <div className="text-center py-8">
                          <Button
                            onClick={() => setItemsToShow(prev => prev + 20)}
                            className="font-mono cursor-pointer text-sm px-6 py-3 bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none"
                          >
                            LOAD MORE ({filters.filteredCompanies.length - itemsToShow} remaining)
                          </Button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Contracts View */}
                  {dataView === "contracts" && (
                    <>
                      {viewType === "grid" ? (
                        <ContractGrid contracts={filteredContracts} onContractClick={setSelectedContract} />
                      ) : (
                        <ContractTable contracts={filteredContracts} onContractClick={setSelectedContract} />
                      )}
                      {filteredContracts.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300">
                          <p className="text-gray-500 font-mono text-sm">No contracts match your search</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Vehicles View */}
                  {dataView === "vehicles" && (
                    <>
                      {viewType === "grid" ? (
                        <VehicleGrid vehicles={filteredVehicles} onVehicleClick={setSelectedVehicle} />
                      ) : (
                        <VehicleTable vehicles={filteredVehicles} onVehicleClick={setSelectedVehicle} />
                      )}
                      {filteredVehicles.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300">
                          <p className="text-gray-500 font-mono text-sm">No vehicles match your search</p>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* Map View */}
        {viewType === "map" && (
          <div className="w-full py-1 sm:py-2 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto h-[calc(100vh-200px)] min-h-[500px] relative border-2 border-black">


              {isLoadingContracts ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="font-mono text-sm text-gray-600">Loading government contract data...</p>
                  </div>
                </div>
              ) : (
                <>
                  <MapView
                    contractData={filteredMapContracts}
                    marketCompanies={filteredMapCompanies}
                    showOnlyMarketPlayers={showOnlyMarketPlayers}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-2 border-black px-3 py-2 z-[999]">
                    <p className="text-[9px] sm:text-xs text-gray-600 font-mono text-center">
                      Government contract data sourced from{" "}
                      <a href="https://www.usaspending.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                        USAspending.gov
                      </a>
                      {" "}and{" "}
                      <a href="https://www.sbir.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                        SBIR.gov
                      </a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Company Drawer */}
      {selectedCompany && (
        <CompanyDrawer
          company={selectedCompany}
          vehicleCount={vehiclesByCompany.get(selectedCompany.name)?.length || 0}
          onViewVehicles={() => {
            setSelectedCompanyForVehicles(selectedCompany.name);
            setSelectedCompany(null);
          }}
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}

      {/* Vehicle Dialog */}
      {selectedCompanyForVehicles && (
        <VehicleDialog
          companyName={selectedCompanyForVehicles}
          vehicles={vehiclesByCompany.get(selectedCompanyForVehicles) || []}
          isOpen={!!selectedCompanyForVehicles}
          onClose={() => setSelectedCompanyForVehicles(null)}
        />
      )}

      {/* Contract Drawer */}
      {selectedContract && (
        <ContractDrawer
          contract={selectedContract}
          isOpen={!!selectedContract}
          onClose={() => setSelectedContract(null)}
        />
      )}

      {/* Vehicle Drawer */}
      {selectedVehicle && (
        <VehicleDrawer
          vehicle={selectedVehicle}
          isOpen={!!selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
