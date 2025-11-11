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
import { Search, MapPin, Grid3x3, Filter } from "lucide-react";
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

function CompanyGridCard({ company }: { company: Company }) {
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

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border border-gray-300 rounded-none shadow-none hover:shadow-md hover:border-gray-400 transition-all h-full flex flex-col bg-white">
        <CollapsibleTrigger className="w-full flex-1 flex flex-col">
          <CardHeader className="p-4 border-b border-gray-200">
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className={`text-[10px] font-mono tracking-wider px-2 py-1 border ${categoryColors[company.category]}`}>
                {categoryLabels[company.category]}
              </span>
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
            <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-left text-black leading-tight">
              {company.name}
            </CardTitle>
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
          <div className="px-4 pb-4 border-t border-gray-200">
            <p className="text-xs text-gray-700 leading-relaxed">{company.description}</p>
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

  // Load company data on mount
  useEffect(() => {
    loadCompanyData();
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
              <span className="text-[10px] sm:text-xs font-mono tracking-wider text-black font-bold hidden sm:inline">NEW MARITIME HUB</span>
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
                    <CompanyGridCard key={company.name} company={company} />
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
    </div>
  );
}
