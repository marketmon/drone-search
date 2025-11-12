"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContentFeedbackWidget } from "@/components/content-feedback-widget";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { Search, MapPin, Grid3x3, Filter, ExternalLink, FileText, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import dynamic from "next/dynamic";
import Papa from "papaparse";

// Dynamically import map component (Leaflet needs window object)
const MapView = dynamic(() => import("./MapView"), { ssr: false });

interface Company {
  name: string;
  website: string;
  description: string;
  category: "startup" | "legacy" | "mid-tier";
  location: string;
  lat: number;
  lng: number;
  imageUrl: string;
}

interface ContractData {
  lat: number;
  lng: number;
  company_name: string;
  product: string;
  contract_amount: number;
  start_date: string;
  city: string;
  state: string;
  contract_id: string;
  source: string;
  company_url: string;
}

interface Vehicle {
  name: string;
  length: string;
  range: string;
  endurance: string;
  seastate: string;
  topSpeed: string;
  payload: string;
  propulsion: string;
  auxPropulsion: string;
  company: string;
  source: string;
  googleLink: string;
}

// State name to abbreviation mapping
const stateMapping: Record<string, string> = {
  "alabama": "al", "alaska": "ak", "arizona": "az", "arkansas": "ar", "california": "ca",
  "colorado": "co", "connecticut": "ct", "delaware": "de", "florida": "fl", "georgia": "ga",
  "hawaii": "hi", "idaho": "id", "illinois": "il", "indiana": "in", "iowa": "ia",
  "kansas": "ks", "kentucky": "ky", "louisiana": "la", "maine": "me", "maryland": "md",
  "massachusetts": "ma", "michigan": "mi", "minnesota": "mn", "mississippi": "ms", "missouri": "mo",
  "montana": "mt", "nebraska": "ne", "nevada": "nv", "new hampshire": "nh", "new jersey": "nj",
  "new mexico": "nm", "new york": "ny", "north carolina": "nc", "north dakota": "nd", "ohio": "oh",
  "oklahoma": "ok", "oregon": "or", "pennsylvania": "pa", "rhode island": "ri", "south carolina": "sc",
  "south dakota": "sd", "tennessee": "tn", "texas": "tx", "utah": "ut", "vermont": "vt",
  "virginia": "va", "washington": "wa", "west virginia": "wv", "wisconsin": "wi", "wyoming": "wy",
  "district of columbia": "dc", "washington dc": "dc"
};

// Helper function to check if location matches search term (including state name/abbreviation matching)
function locationMatchesSearch(location: string, searchTerm: string): boolean {
  const locationLower = location.toLowerCase();
  const searchLower = searchTerm.toLowerCase().trim();

  // Direct match
  if (locationLower.includes(searchLower)) {
    return true;
  }

  // Check if search term is a full state name - if so, also check for abbreviation
  if (stateMapping[searchLower]) {
    const abbreviation = stateMapping[searchLower];
    // Check for abbreviation with word boundaries (e.g., "RI" not in "MARINE")
    const abbrevRegex = new RegExp(`\\b${abbreviation}\\b`, 'i');
    if (abbrevRegex.test(location)) {
      return true;
    }
  }

  // Check if search term is a partial match for any state name
  // For example, "flo" should match "florida" → "fl"
  for (const [stateName, abbrev] of Object.entries(stateMapping)) {
    if (stateName.startsWith(searchLower) && searchLower.length >= 2) {
      // Found a state that starts with the search term
      const stateAbbrevRegex = new RegExp(`\\b${abbrev}\\b`, 'i');
      if (stateAbbrevRegex.test(location)) {
        return true;
      }
      // Also check if the full state name is in the location
      if (locationLower.includes(stateName)) {
        return true;
      }
    }
  }

  // Check if search term is a state abbreviation - if so, also check for full name
  const abbrevRegex = new RegExp(`\\b${searchLower}\\b`, 'i');
  if (abbrevRegex.test(location)) {
    // Found exact abbreviation match
    return true;
  }

  // Check if the location contains a state abbreviation that matches the search term's full name
  for (const [stateName, abbrev] of Object.entries(stateMapping)) {
    if (stateName === searchLower) {
      const stateAbbrevRegex = new RegExp(`\\b${abbrev}\\b`, 'i');
      if (stateAbbrevRegex.test(location)) {
        return true;
      }
    }
  }

  return false;
}

// Helper function to format spec value or show N/A
function formatSpec(value: string, unit: string = ""): string {
  if (!value || value.trim() === "") return "N/A";
  return `${value}${unit ? " " + unit : ""}`;
}

function CompanyDrawer({ company, vehicleCount, onViewVehicles, isOpen, onClose }: {
  company: Company;
  vehicleCount: number;
  onViewVehicles: () => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [logoError, setLogoError] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Reset description state when drawer opens with new company
  useEffect(() => {
    if (isOpen) {
      setShowFullDescription(false);
    }
  }, [isOpen, company.name]);

  const categoryLabels = {
    startup: "STARTUP",
    legacy: "LEGACY",
    "mid-tier": "MID-TIER",
  };

  const categoryColors = {
    startup: "bg-blue-100 text-blue-700 border-blue-500",
    legacy: "bg-purple-100 text-purple-700 border-purple-500",
    "mid-tier": "bg-green-100 text-green-700 border-green-500",
  };

  // Truncate description to ~150 characters
  const truncatedDescription = company.description && company.description.length > 150
    ? company.description.substring(0, 150).trim() + "..."
    : company.description;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] bg-white border-t-2 border-black rounded-none flex flex-col">
        <DrawerHeader className="border-b border-gray-300 pb-3 bg-white">
          <DrawerTitle className="text-lg sm:text-2xl font-bold text-black">
            {company.name}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="space-y-4">
            {/* Category Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-mono tracking-wider px-3 py-1.5 border ${categoryColors[company.category]}`}>
                {categoryLabels[company.category]}
              </span>
              {vehicleCount > 0 && (
                <span className="text-xs font-mono text-blue-700 bg-blue-50 px-3 py-1.5 border border-blue-300">
                  {vehicleCount} {vehicleCount === 1 ? 'VEHICLE' : 'VEHICLES'}
                </span>
              )}
            </div>

            {/* Logo */}
            <div className="w-full h-32 bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden">
              {company.imageUrl && !logoError ? (
                <img
                  src={company.imageUrl}
                  alt={`${company.name} logo`}
                  className="max-w-full max-h-full object-contain p-4"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-sm text-gray-500 font-mono">NO IMAGE</span>
              )}
            </div>

            {/* Location */}
            {company.location && (
              <div>
                <span className="text-xs font-mono text-gray-600 font-bold block mb-1">LOCATION</span>
                <p className="text-sm text-gray-700">{company.location}</p>
              </div>
            )}

            {/* Description */}
            {company.description && (
              <div>
                <span className="text-xs font-mono text-gray-600 font-bold block mb-1">DESCRIPTION</span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {showFullDescription ? company.description : truncatedDescription}
                </p>
                {company.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-xs font-mono text-blue-600 hover:text-blue-800 mt-2 underline cursor-pointer"
                  >
                    {showFullDescription ? "SEE LESS" : "SEE MORE"}
                  </button>
                )}
              </div>
            )}

            {/* Website */}
            <div>
              <span className="text-xs font-mono text-gray-600 font-bold block mb-1">WEBSITE</span>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-blue-600 hover:text-blue-800 transition-colors inline-block border-b border-blue-400 hover:border-blue-800 break-all"
                onClick={(e) => e.stopPropagation()}
              >
                {company.website.replace(/^https?:\/\//, '').replace(/^www\./, '')}
              </a>
            </div>

            {/* Vehicle Button */}
            <Button
              onClick={onViewVehicles}
              disabled={vehicleCount === 0}
              className={`w-full font-mono text-xs tracking-wider px-4 py-3 rounded-none transition-all ${vehicleCount > 0
                ? "bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed"
                }`}
            >
              {vehicleCount > 0
                ? `VIEW ${vehicleCount} VEHICLE${vehicleCount > 1 ? 'S' : ''}`
                : 'NO VEHICLES AVAILABLE'}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function VehicleDialog({ companyName, vehicles, isOpen, onClose }: {
  companyName: string;
  vehicles: Vehicle[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleSpecSheetClick = (vehicle: Vehicle) => {
    const params = new URLSearchParams({
      vehicle: vehicle.name,
      company: companyName,
      link: vehicle.googleLink,
    });
    window.open(`/spec-sheet?${params.toString()}`, '_blank');
  };

  // Mobile Card View Component
  const MobileCardView = () => (
    <div className="space-y-3">
      {vehicles.map((vehicle, index) => (
        <div key={index} className="border-2 border-gray-300 bg-white">
          <div className="bg-gray-100 border-b-2 border-gray-300 p-3 flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base text-black mb-1 break-words">{vehicle.name}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {vehicle.source && (
                  <a
                    href={vehicle.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
            {vehicle.googleLink && (
              <button
                onClick={() => handleSpecSheetClick(vehicle)}
                className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 flex items-center gap-1 font-mono text-xs tracking-wider whitespace-nowrap flex-shrink-0"
                title="View spec sheet"
              >
                <FileText className="w-4 h-4" />
                SPEC
              </button>
            )}
          </div>
          <div className="p-3 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="font-mono text-gray-600 font-bold block mb-0.5">LENGTH</span>
              <span className="font-mono text-black">{formatSpec(vehicle.length, 'ft')}</span>
            </div>
            <div>
              <span className="font-mono text-gray-600 font-bold block mb-0.5">RANGE</span>
              <span className="font-mono text-black">{formatSpec(vehicle.range, 'nm')}</span>
            </div>
            <div>
              <span className="font-mono text-gray-600 font-bold block mb-0.5">TOP SPEED</span>
              <span className="font-mono text-black">{formatSpec(vehicle.topSpeed, 'kts')}</span>
            </div>
            <div>
              <span className="font-mono text-gray-600 font-bold block mb-0.5">PAYLOAD</span>
              <span className="font-mono text-black">{formatSpec(vehicle.payload, 'lbs')}</span>
            </div>
            <div className="col-span-2">
              <span className="font-mono text-gray-600 font-bold block mb-0.5">PROPULSION</span>
              <span className="font-mono text-black">{formatSpec(vehicle.propulsion)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Desktop Table View Component
  const TableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="text-left p-3 font-mono text-xs font-bold text-gray-700">NAME</th>
            <th className="text-left p-3 font-mono text-xs font-bold text-gray-700">LENGTH</th>
            <th className="text-left p-3 font-mono text-xs font-bold text-gray-700">RANGE</th>
            <th className="text-left p-3 font-mono text-xs font-bold text-gray-700">TOP SPEED</th>
            <th className="text-left p-3 font-mono text-xs font-bold text-gray-700">PAYLOAD</th>
            <th className="text-left p-3 font-mono text-xs font-bold text-gray-700">PROPULSION</th>
            <th className="text-left p-3 font-mono text-xs font-bold text-gray-700">SPEC SHEET</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {vehicles.map((vehicle, index) => {
            return (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 text-black">
                  <div className="flex items-center gap-2">
                    {vehicle.name}
                    {vehicle.source && (
                      <a
                        href={vehicle.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </td>
                <td className="p-3 font-mono text-black">{formatSpec(vehicle.length, 'ft')}</td>
                <td className="p-3 font-mono text-black">{formatSpec(vehicle.range, 'nm')}</td>
                <td className="p-3 font-mono text-black">{formatSpec(vehicle.topSpeed, 'kts')}</td>
                <td className="p-3 font-mono text-black">{formatSpec(vehicle.payload, 'lbs')}</td>
                <td className="p-3 font-mono text-black">{formatSpec(vehicle.propulsion)}</td>
                <td className="p-3">
                  {vehicle.googleLink ? (
                    <button
                      onClick={() => handleSpecSheetClick(vehicle)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:cursor-pointer"
                      title="View spec sheet"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] bg-white border-t-2 border-black rounded-none flex flex-col">
        <DrawerHeader className="border-b border-gray-300 pb-3 bg-white">
          <DrawerTitle className="text-lg sm:text-2xl font-bold text-black">
            {companyName} — {vehicles.length} Vehicle{vehicles.length > 1 ? 's' : ''}
          </DrawerTitle>
        </DrawerHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4">
          {/* Show card view on mobile, table view on desktop */}
          <div className="md:hidden">
            <MobileCardView />
          </div>
          <div className="hidden md:block">
            <TableView />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CompanyGridCard({ company, vehicleCount, onClick }: {
  company: Company;
  vehicleCount: number;
  onClick: () => void;
}) {
  const [logoError, setLogoError] = useState(false);

  const categoryLabels = {
    startup: "STARTUP",
    legacy: "LEGACY",
    "mid-tier": "MID-TIER",
  };

  const categoryColors = {
    startup: "bg-blue-100 text-blue-700 border-blue-500",
    legacy: "bg-purple-100 text-purple-700 border-purple-500",
    "mid-tier": "bg-green-100 text-green-700 border-green-500",
  };

  const description = company.description || "";

  return (
    <Card
      className="border border-gray-300 rounded-none shadow-none hover:shadow-md hover:border-gray-400 transition-all flex flex-col bg-white cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className={`text-[9px] sm:text-[10px] font-mono tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 border ${categoryColors[company.category]}`}>
              {categoryLabels[company.category]}
            </span>
            {vehicleCount > 0 && (
              <span className="text-[10px] sm:text-xs font-mono text-blue-700 bg-blue-50 px-1.5 sm:px-2 py-0.5 sm:py-1 border border-blue-300">
                {vehicleCount} {vehicleCount === 1 ? 'VEHICLE' : 'VEHICLES'}
              </span>
            )}
          </div>
        </div>
        <div className="w-full h-20 sm:h-24 bg-gray-100 border border-gray-200 flex items-center justify-center mb-2 sm:mb-3 overflow-hidden">
          {company.imageUrl && !logoError ? (
            <img
              src={company.imageUrl}
              alt={`${company.name} logo`}
              className="max-w-full max-h-full object-contain p-2"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-xs text-gray-500 font-mono">NO IMAGE</span>
          )}
        </div>
        <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-left text-black leading-tight mb-2">
          {company.name}
        </CardTitle>

        {/* Company Description - 2 lines max */}
        {description && (
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </CardHeader>
    </Card>
  );
}

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
  const [isFeedbackWidgetOpen, setIsFeedbackWidgetOpen] = useState(false);
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
                      USV Market Database
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl text-blue-100 font-medium mb-3">
                      Key Market Players in the US
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
                    <Button
                      onClick={() => setIsFeedbackWidgetOpen(true)}
                      className="bg-white hover:bg-blue-900 hover:text-white text-black border-2 border-blue-400 font-mono text-sm sm:text-base tracking-wider px-6 py-4
                      rounded-none whitespace-nowrap transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(59,130,246,0.5)]
                      cursor-pointer"
                    >
                      ADD TO DATABASE
                    </Button>
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
                          <span className="text-[10px] sm:text-xs font-medium">Gov. Contractors ({filteredMapContracts.length})</span>
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

      {/* Content Feedback Widget */}
      <ContentFeedbackWidget
        contentType="usv-market-landscape"
        isOpen={isFeedbackWidgetOpen}
        onOpenChange={setIsFeedbackWidgetOpen}
      />

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
