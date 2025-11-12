"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ContentFeedbackWidget } from "@/components/content-feedback-widget";
import { Search, MapPin, Grid3x3, Filter, ExternalLink, FileText } from "lucide-react";
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

// Helper function to extract domain from URL for logo API
function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

// Helper function to get logo URL from company website
function getLogoUrl(websiteUrl: string): string {
  const domain = getDomainFromUrl(websiteUrl);
  // Using Clearbit Logo API - provides high quality company logos
  return `https://logo.clearbit.com/${domain}`;
}

// Helper function to format spec value or show N/A
function formatSpec(value: string, unit: string = ""): string {
  if (!value || value.trim() === "") return "N/A";
  return `${value}${unit ? " " + unit : ""}`;
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

  // Table View Component
  const TableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="text-left p-3 font-mono text-xs font-bold text-gray-700">NAME</th>
            <th className="text-left p-3 font-mono text-xs font-bold text-gray-700">LENGTH</th>
            <th className="text-left p-3 font-mono text-xs font-bold text-gray-700">RANGE</th>
            <th className="text-left p-3 font-mono text-xs font-bold text-gray-700">SPEED</th>
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
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
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
          <DrawerTitle className="text-2xl font-bold text-black">
            {companyName} — {vehicles.length} Vehicle{vehicles.length > 1 ? 's' : ''}
          </DrawerTitle>
        </DrawerHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <TableView />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CompanyGridCard({ company, vehicleCount, onViewVehicles, vehicles }: {
  company: Company;
  vehicleCount: number;
  onViewVehicles: () => void;
  vehicles?: Vehicle[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const categoryLabels = {
    startup: "STARTUP",
    legacy: "LEGACY DEFENSE",
    "mid-tier": "MID-TIER",
  };

  const categoryColors = {
    startup: "bg-blue-100 text-blue-700 border-blue-500",
    legacy: "bg-purple-100 text-purple-700 border-purple-500",
    "mid-tier": "bg-green-100 text-green-700 border-green-500",
  };

  // Calculate quick stats for preview
  const quickStats = useMemo(() => {
    if (!vehicles || vehicles.length === 0) return null;

    const lengths = vehicles.map(v => parseFloat(v.length)).filter(v => !isNaN(v));
    const ranges = vehicles.map(v => parseFloat(v.range?.replace(/,/g, '') || '0')).filter(v => !isNaN(v) && v > 0);
    const speeds = vehicles.map(v => parseFloat(v.topSpeed)).filter(v => !isNaN(v));

    return {
      lengthRange: lengths.length ? `${Math.min(...lengths)}-${Math.max(...lengths)}ft` : null,
      maxRange: ranges.length ? `${Math.max(...ranges)}nm` : null,
      maxSpeed: speeds.length ? `${Math.max(...speeds)}kts` : null,
    };
  }, [vehicles]);

  const handleVehicleBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (vehicleCount > 0) {
      onViewVehicles();
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border border-gray-300 rounded-none shadow-none hover:shadow-md hover:border-gray-400 transition-all h-full flex flex-col bg-white">
        <CollapsibleTrigger className="w-full flex-1 flex flex-col">
          <CardHeader className="p-4 border-b border-gray-200">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-mono tracking-wider px-2 py-1 border ${categoryColors[company.category]}`}>
                  {categoryLabels[company.category]}
                </span>
                {vehicleCount > 0 && (
                  <div
                    onClick={handleVehicleBadgeClick}
                    className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-1 border border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-colors cursor-pointer"
                    title="Click to view vehicles"
                  >
                    {vehicleCount} {vehicleCount === 1 ? 'VEHICLE' : 'VEHICLES'}
                  </div>
                )}
              </div>
              <span className="text-black text-sm font-bold font-mono">
                {isOpen ? "−" : "+"}
              </span>
            </div>
            <div className="w-full h-24 bg-gray-100 border border-gray-200 flex items-center justify-center mb-3 overflow-hidden">
              {!logoError ? (
                <img
                  src={getLogoUrl(company.website)}
                  alt={`${company.name} logo`}
                  className="max-w-full max-h-full object-contain p-2"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-xs text-gray-500 font-mono">IMG</span>
              )}
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-left text-black leading-tight mb-2">
              {company.name}
            </CardTitle>

            {/* Quick Stats Preview */}
            {quickStats && (
              <div className="flex gap-2 flex-wrap text-[10px] font-mono text-gray-700">
                {quickStats.lengthRange && (
                  <span className="bg-gray-100 px-2 py-1 border border-gray-200">
                    {quickStats.lengthRange}
                  </span>
                )}
                {quickStats.maxSpeed && (
                  <span className="bg-gray-100 px-2 py-1 border border-gray-200">
                    ↑{quickStats.maxSpeed}
                  </span>
                )}
                {quickStats.maxRange && (
                  <span className="bg-gray-100 px-2 py-1 border border-gray-200">
                    {quickStats.maxRange}
                  </span>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent className="p-4 pt-3 flex-1">
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-gray-600 hover:text-black transition-colors inline-block border-b border-gray-400 hover:border-black"
              onClick={(e) => e.stopPropagation()}
            >
              {company.website.replace(/^https?:\/\//, '').replace(/^www\./, '')}
            </a>
          </CardContent>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 border-t border-gray-200 space-y-3">
            <p className="text-xs text-gray-700 leading-relaxed">{company.description}</p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                if (vehicleCount > 0) {
                  onViewVehicles();
                }
              }}
              disabled={vehicleCount === 0}
              className={`w-full font-mono text-xs tracking-wider px-4 py-2 rounded-none transition-all ${
                vehicleCount > 0
                  ? "bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700"
                  : "bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed"
              }`}
            >
              {vehicleCount > 0
                ? `VIEW ${vehicleCount} VEHICLE${vehicleCount > 1 ? 'S' : ''}`
                : 'NO VEHICLES AVAILABLE'}
            </Button>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
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
        company.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.has(company.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories, marketCompanies]);

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
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 sm:gap-6">
              <Link href="/" className="font-mono text-[10px] sm:text-xs tracking-wider text-gray-600 hover:text-black transition-colors whitespace-nowrap">
                ← HOME
              </Link>
              <span className="text-[10px] sm:text-xs font-mono tracking-wider text-black font-bold hidden sm:inline">USV TECH HUB</span>
            </div>
            <div className="flex gap-2 sm:gap-4 items-center flex-wrap">
              <Link href="/market-scouting">
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none font-mono text-[10px] sm:text-xs tracking-wider transition-all whitespace-nowrap">
                  BUILD TECH FASTER
                </button>
              </Link>
              <div className="hidden md:flex gap-4 text-xs font-mono tracking-wider">
                <Link href="/usv-market" className="text-black font-bold transition-colors">
                  MARKET DATABASE
                </Link>

                <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
                  ABOUT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
                      Key Market Players
                    </p>
                    <p className="text-sm sm:text-base text-blue-200 max-w-2xl">
                      {marketCompanies.length} companies shaping the unmanned maritime future
                    </p>
                  </div>
                  <Button
                    onClick={() => setView("map")}
                    className="bg-white hover:bg-gray-100 text-blue-600 border-2 border-white font-mono text-sm sm:text-base tracking-wider px-6 py-4 rounded-none whitespace-nowrap transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(255,255,255,0.5)]"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    VIEW MAP
                  </Button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-white border-2 border-black border-t-0 p-6">
                <div className="flex flex-col gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-2 border-gray-300 focus:border-blue-600 rounded-none font-mono text-sm h-12"
                    />
                  </div>
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-xs font-mono text-gray-600 font-bold mr-2">FILTER:</span>
                    <Button
                      onClick={() => toggleCategory("startup")}
                      className={`border-2 rounded-none font-mono text-xs px-4 py-2 transition-all ${selectedCategories.has("startup")
                        ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                        : "bg-white border-black text-black hover:bg-gray-100"
                        }`}
                    >
                      STARTUPS
                    </Button>
                    <Button
                      onClick={() => toggleCategory("mid-tier")}
                      className={`border-2 rounded-none font-mono text-xs px-4 py-2 whitespace-nowrap transition-all ${selectedCategories.has("mid-tier")
                        ? "bg-green-600 border-green-600 text-white hover:bg-green-700"
                        : "bg-white border-black text-black hover:bg-gray-100"
                        }`}
                    >
                      MID-TIER
                    </Button>
                    <Button
                      onClick={() => toggleCategory("legacy")}
                      className={`border-2 rounded-none font-mono text-xs px-4 py-2 whitespace-nowrap transition-all ${selectedCategories.has("legacy")
                        ? "bg-purple-600 border-purple-600 text-white hover:bg-purple-700"
                        : "bg-white border-black text-black hover:bg-gray-100"
                        }`}
                    >
                      LEGACY
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredCompanies.map((company) => (
                    <CompanyGridCard
                      key={company.name}
                      company={company}
                      vehicleCount={vehiclesByCompany.get(company.name)?.length || 0}
                      vehicles={vehiclesByCompany.get(company.name)}
                      onViewVehicles={() => setSelectedCompanyForVehicles(company.name)}
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
          <div className="h-[calc(100vh-80px)] w-full relative">
            {/* Map Hero Controls */}
            <div className="absolute top-4 left-4 z-[1000] bg-white border-2 border-black shadow-lg max-w-[360px]">
              {/* Hero Header */}
              <div className="bg-blue-600 p-5 border-b-2 border-black">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  USV Market Database
                </h2>
                <p className="text-base sm:text-lg text-blue-100 mt-2 font-medium">
                  Geographic View
                </p>
                <p className="text-xs text-blue-200 mt-1">
                  {marketCompanies.length} key players mapped
                </p>
              </div>

              {/* Controls */}
              <div className="p-4">
                <Button
                  onClick={() => setView("list")}
                  className="bg-white hover:bg-gray-100 text-black border-2 border-black font-mono text-xs tracking-wider px-4 py-3 rounded-none mb-4 w-full"
                >
                  <Grid3x3 className="w-4 h-4 mr-2" />
                  VIEW KEY PLAYERS LIST
                </Button>

                <div className="border-t-2 border-gray-200 pt-4 mb-4">
                  <div className="text-xs font-mono text-gray-600 mb-3 font-bold">FILTER:</div>
                  <Button
                    onClick={() => setShowOnlyMarketPlayers(!showOnlyMarketPlayers)}
                    className={`w-full font-mono text-xs tracking-wider px-4 py-3 rounded-none transition-all ${showOnlyMarketPlayers
                      ? "bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700"
                      : "bg-white text-black border-2 border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {showOnlyMarketPlayers ? "SHOW ALL CONTRACTORS" : "SHOW ONLY KEY PLAYERS"}
                  </Button>
                </div>

                <div className="space-y-3 border-t-2 border-gray-200 pt-4">
                  <div className="text-xs font-mono text-gray-600 font-bold">LEGEND:</div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow"></div>
                    <span className="text-xs font-medium">Market Defining ({marketCompanies.length})</span>
                  </div>
                  {!showOnlyMarketPlayers && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-xs font-medium">Gov. Contractors ({contractData.length})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isLoadingContracts ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                  <p className="font-mono text-sm text-gray-600">Loading government contract data...</p>
                </div>
              </div>
            ) : (
              <MapView
                contractData={contractData}
                marketCompanies={marketCompanies}
                showOnlyMarketPlayers={showOnlyMarketPlayers}
              />
            )}
          </div>
        )}
      </div>

      {/* Content Feedback Widget */}
      <ContentFeedbackWidget contentType="usv-market-landscape" />

      {/* Vehicle Dialog */}
      {selectedCompanyForVehicles && (
        <VehicleDialog
          companyName={selectedCompanyForVehicles}
          vehicles={vehiclesByCompany.get(selectedCompanyForVehicles) || []}
          isOpen={!!selectedCompanyForVehicles}
          onClose={() => setSelectedCompanyForVehicles(null)}
        />
      )}
    </div>
  );
}
