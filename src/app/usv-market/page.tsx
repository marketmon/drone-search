"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { Search, MapPin, Grid3x3, Filter, Minus, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import Papa from "papaparse";

// Types
import { Company, ContractData, Vehicle } from "./types";

// Utils
import { locationMatchesSearch } from "./utils";

// Components
import { CompanyDrawer } from "./components/CompanyDrawer";
import { VehicleDialog } from "./components/VehicleDialog";
import { CompanyGridCard } from "./components/CompanyGridCard";
import { StructuredData } from "./components/StructuredData";

// Dynamically import map component (Leaflet needs window object)
const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function USVMarketInteractive() {
  const [view, setView] = useState<"list" | "map">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(["startup", "legacy", "mid-tier"]));
  const [contractData, setContractData] = useState<ContractData[]>([]);
  const [marketCompanies, setMarketCompanies] = useState<Company[]>([]);
  const [isLoadingContracts, setIsLoadingContracts] = useState(false);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [showOnlyMarketPlayers, setShowOnlyMarketPlayers] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehiclesByCompany, setVehiclesByCompany] = useState<Map<string, Vehicle[]>>(new Map());
  const [selectedCompanyForVehicles, setSelectedCompanyForVehicles] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false);
  const [mapSearchTerm, setMapSearchTerm] = useState("");
  const [selectedMapCompany, setSelectedMapCompany] = useState<Company | null>(null);
  const [selectedMapContract, setSelectedMapContract] = useState<ContractData | null>(null);

  // Load company data on mount
  useEffect(() => {
    loadCompanyData();
    loadVehicleData();
  }, []);

  // Load contract data when switching to map view
  useEffect(() => {
    if (view === "map" && contractData.length === 0 && !isLoadingContracts) {
      loadContractData();
    }
  }, [view]);

  const loadCompanyData = async () => {
    setIsLoadingCompanies(true);
    try {
      const response = await fetch("/usv_key_players.csv");
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const data = results.data as any[];
          const companies: Company[] = data
            .filter(row => row["Company Name"] && row.Website)
            .map(row => ({
              name: row["Company Name"],
              website: row.Website,
              location: row.Location || "",
              category: row.Category?.toLowerCase() || "startup",
              description: row.Description || "",
              lat: row.Lat || 0,
              lng: row.Lng || 0,
              imageUrl: row["Image URL"] || "",
            }));
          setMarketCompanies(companies);
          setIsLoadingCompanies(false);
        },
        error: (error: Error) => {
          console.error("Error parsing company CSV:", error);
          setIsLoadingCompanies(false);
        }
      });
    } catch (error) {
      console.error("Error loading company data:", error);
      setIsLoadingCompanies(false);
    }
  };

  const loadContractData = async () => {
    setIsLoadingContracts(true);
    try {
      const response = await fetch("/usv_contracts.csv");
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const data = results.data as ContractData[];
          setContractData(data.filter(row => row.lat && row.lng && row.company_name));
          setIsLoadingContracts(false);
        },
        error: (error: Error) => {
          console.error("Error parsing CSV:", error);
          setIsLoadingContracts(false);
        }
      });
    } catch (error) {
      console.error("Error loading contract data:", error);
      setIsLoadingContracts(false);
    }
  };

  const loadVehicleData = async () => {
    try {
      const response = await fetch("/usv_vehicles_matched_to_company.csv");
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const data = results.data as any[];
          const vehicleData: Vehicle[] = data
            .filter(row => row.Name && row.Company)
            .map(row => ({
              name: row.Name || "",
              length: row["Length (ft)"] || "",
              range: row["Range (nm)"] || "",
              endurance: row["Endurance (days)"] || "",
              seastate: row.Seastate || "",
              topSpeed: row["Top Speed (kts)"] || "",
              payload: row["Payload (lbs)"] || "",
              propulsion: row.Propulsion || "",
              auxPropulsion: row["Aux Propulsion"] || "",
              company: row.Company || "",
              source: row.Source || "",
              googleLink: row["Google Link"] || "",
            }));

          setVehicles(vehicleData);

          // Group vehicles by company
          const grouped = new Map<string, Vehicle[]>();
          vehicleData.forEach(vehicle => {
            const companyVehicles = grouped.get(vehicle.company) || [];
            companyVehicles.push(vehicle);
            grouped.set(vehicle.company, companyVehicles);
          });
          setVehiclesByCompany(grouped);
        },
        error: (error: Error) => {
          console.error("Error parsing vehicle CSV:", error);
        }
      });
    } catch (error) {
      console.error("Error loading vehicle data:", error);
    }
  };

  const toggleCategory = (category: string) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
  };

  const filteredCompanies = useMemo(() => {
    return marketCompanies.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        locationMatchesSearch(company.location, searchTerm);
      const matchesCategory = selectedCategories.has(company.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories, marketCompanies]);

  const filteredMapCompanies = useMemo(() => {
    return marketCompanies.filter((company) => {
      if (!mapSearchTerm) return true;
      return company.name.toLowerCase().includes(mapSearchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(mapSearchTerm.toLowerCase()) ||
        locationMatchesSearch(company.location, mapSearchTerm);
    });
  }, [mapSearchTerm, marketCompanies]);

  const filteredMapContracts = useMemo(() => {
    if (!mapSearchTerm) return contractData;
    return contractData.filter((contract) => {
      return contract.company_name.toLowerCase().includes(mapSearchTerm.toLowerCase()) ||
        contract.product.toLowerCase().includes(mapSearchTerm.toLowerCase()) ||
        contract.city.toLowerCase().includes(mapSearchTerm.toLowerCase()) ||
        locationMatchesSearch(`${contract.city}, ${contract.state}`, mapSearchTerm);
    });
  }, [mapSearchTerm, contractData]);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Structured Data for SEO */}
      <StructuredData companies={marketCompanies} />

      {/* Wave background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-market" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 25 10, 50 20 T 100 20" fill="none" stroke="#3b82f630" strokeWidth="1.5" />
              <path d="M0 25 Q 25 15, 50 25 T 100 25" fill="none" stroke="#3b82f620" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-market)" />
        </svg>
      </div>

      {/* Navigation */}
      <SiteHeader />

      {/* Content */}
      <div className="relative">
        {view === "list" ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            {/* Hero Header */}
            <div className="mb-6 sm:mb-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-black p-8 sm:p-12">
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-block bg-blue-800 border-2 border-blue-400 px-3 py-1 mb-4">
                      <span className="text-xs font-mono tracking-wider text-blue-100 font-bold">DATABASE</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-none mb-4">
                      USV Hub
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl text-blue-100 font-medium mb-3">
                      Key Players in the US
                    </p>
                    <p className="text-sm sm:text-base text-blue-200 max-w-2xl">
                      {marketCompanies.length} companies shaping the unmanned maritime future
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() => setView("map")}
                      className="bg-white hover:bg-gray-100 text-blue-600 border-2 border-white font-mono text-sm sm:text-base tracking-wider px-6 py-4
                      rounded-none whitespace-nowrap transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(255,255,255,0.5)]
                      cursor-pointer"
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      VIEW MAP
                    </Button>
                    <Link href="/usv-market/contribution">
                      <Button
                        className="bg-white hover:bg-blue-900 hover:text-white text-black border-2 border-blue-400 font-mono text-sm sm:text-base tracking-wider px-6 py-4
                        rounded-none whitespace-nowrap transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(59,130,246,0.5)]
                        cursor-pointer w-full"
                      >
                        CONTRIBUTE TO DATABASE
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-white border-2 border-black border-t-0 p-6">
                <div className="flex flex-col gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search companies, locations, or descriptions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-2 border-gray-300 focus:border-blue-600 rounded-none font-mono text-sm h-12"
                    />
                  </div>
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-xs font-mono text-gray-600 font-bold mr-2">FILTER:</span>
                    <Button
                      onClick={() => toggleCategory("startup")}
                      className={`border-2 rounded-none font-mono text-xs px-4 py-2 transition-all cursor-pointer ${selectedCategories.has("startup")
                        ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                        : "bg-white border-black text-black hover:bg-gray-100"
                        }`}
                    >
                      STARTUP
                    </Button>
                    <Button
                      onClick={() => toggleCategory("mid-tier")}
                      className={`border-2 rounded-none font-mono text-xs px-4 py-2 whitespace-nowrap transition-all cursor-pointer ${selectedCategories.has("mid-tier")
                        ? "bg-green-600 border-green-600 text-white hover:bg-green-700"
                        : "bg-white border-black text-black hover:bg-gray-100"
                        }`}
                    >
                      MID-TIER
                    </Button>
                    <Button
                      onClick={() => toggleCategory("legacy")}
                      className={`border-2 rounded-none font-mono text-xs px-4 py-2 whitespace-nowrap transition-all cursor-pointer ${selectedCategories.has("legacy")
                        ? "bg-purple-600 border-purple-600 text-white hover:bg-purple-700"
                        : "bg-white border-black text-black hover:bg-gray-100"
                        }`}
                    >
                      LEGACY PRIME
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Company List */}
            {isLoadingCompanies ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                  <p className="font-mono text-sm text-gray-600">Loading company data...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                  {filteredCompanies.map((company) => (
                    <CompanyGridCard
                      key={company.name}
                      company={company}
                      vehicleCount={vehiclesByCompany.get(company.name)?.length || 0}
                      onClick={() => setSelectedCompany(company)}
                    />
                  ))}
                </div>

                {filteredCompanies.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300">
                    <p className="text-gray-500 font-mono text-sm">No companies match your filters</p>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="w-full py-4 sm:py-6 px-4 sm:px-6">
            {/* Desktop: Flex row with sidebar left, Mobile: Flex column with sidebar bottom */}
            <div className="max-w-7xl mx-auto h-[calc(100vh-200px)] min-h-[500px] relative border-2 border-black">
              {/* Map Hero Controls */}
              {!isLegendCollapsed ? (
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-[1000] bg-white border-2 border-black shadow-lg max-w-[280px] sm:max-w-[360px] max-h-[calc(100%-80px)] overflow-y-auto">
                  {/* Hero Header */}
                  <div className="bg-blue-600 p-3 sm:p-5 border-b-2 border-black relative">
                    <button
                      onClick={() => setIsLegendCollapsed(true)}
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white hover:bg-gray-100 border border-blue-400 transition-colors"
                      title="Collapse legend"
                    >
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    </button>
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-tight pr-8">
                      USV Market Database
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-blue-100 mt-1 sm:mt-2 font-medium">
                      Geographic View
                    </p>
                    <p className="text-[10px] sm:text-xs text-blue-200 mt-1">
                      {marketCompanies.length} key players mapped
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="p-2 sm:p-4">
                    <Button
                      onClick={() => setView("list")}
                      className="bg-white hover:bg-gray-100 text-black border-2 border-black font-mono text-[10px] sm:text-xs tracking-wider px-2 sm:px-4 py-2 sm:py-3 rounded-none mb-2 sm:mb-4 w-full"
                    >
                      <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      VIEW LIST
                    </Button>

                    <div className="border-t-2 border-gray-200 pt-2 sm:pt-4 mb-2 sm:mb-4">
                      <div className="text-[10px] sm:text-xs font-mono text-gray-600 mb-2 sm:mb-3 font-bold">FILTER:</div>
                      <Button
                        onClick={() => setShowOnlyMarketPlayers(!showOnlyMarketPlayers)}
                        className={`w-full font-mono text-[10px] sm:text-xs tracking-wider px-2 sm:px-4 py-2 sm:py-3 rounded-none transition-all ${showOnlyMarketPlayers
                          ? "bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700"
                          : "bg-white text-black border-2 border-gray-300 hover:bg-gray-100"
                          }`}
                      >
                        <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">{showOnlyMarketPlayers ? "SHOW ALL CONTRACTORS" : "SHOW ONLY KEY PLAYERS"}</span>
                        <span className="sm:hidden">{showOnlyMarketPlayers ? "ALL" : "KEY ONLY"}</span>
                      </Button>
                    </div>

                    <div className="space-y-2 sm:space-y-3 border-t-2 border-gray-200 pt-2 sm:pt-4">
                      <div className="text-[10px] sm:text-xs font-mono text-gray-600 font-bold">
                        {mapSearchTerm ? `RESULTS (${filteredMapCompanies.length + (showOnlyMarketPlayers ? 0 : filteredMapContracts.length)})` : 'LEGEND:'}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full border-2 border-white shadow flex-shrink-0"></div>
                        <span className="text-[10px] sm:text-xs font-medium">Key Players ({filteredMapCompanies.length})</span>
                      </div>
                      {!showOnlyMarketPlayers && (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 rounded-full flex-shrink-0"></div>
                          <span className="text-[10px] sm:text-xs font-medium">Organizations with Gov. Contracts ({filteredMapContracts.length})</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsLegendCollapsed(false)}
                  className="absolute top-2 left-2 sm:top-4 sm:left-4 z-[1000] bg-white hover:bg-gray-100 border-2 border-black shadow-lg p-2 sm:p-3 transition-all group"
                  title="Expand legend"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:text-blue-600 transition-colors" />
                </button>
              )}

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
                  {/* Data Attribution Footer */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-2 border-black px-3 py-2 z-[999]">
                    <p className="text-[9px] sm:text-xs text-gray-600 font-mono text-center">
                      Government contract data sourced from{" "}
                      <a
                        href="https://www.usaspending.gov"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        USAspending.gov
                      </a>
                      {" "}and{" "}
                      <a
                        href="https://www.sbir.gov"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
