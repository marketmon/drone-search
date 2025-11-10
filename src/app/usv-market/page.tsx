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
  category: "startup" | "legacy" | "shipbuilder";
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

const marketCompanies: Company[] = [
  // Startups
  {
    name: "Saildrone",
    category: "startup",
    website: "https://www.saildrone.com",
    description: "Ocean data company operating fleet of wind and solar-powered autonomous surface vehicles for maritime intelligence.",
  },
  {
    name: "Martac",
    category: "startup",
    website: "https://www.martacsystems.com",
    description: "Developer of MANTAS unmanned surface vessels for defense, security, and commercial applications with modular mission payloads.",
  },
  {
    name: "Sea Machines",
    category: "startup",
    website: "https://www.sea-machines.com",
    description: "Autonomous technology provider delivering remote command and autonomous control systems for commercial and government vessels.",
  },
  // Legacy
  {
    name: "Lockheed Martin",
    category: "legacy",
    website: "https://www.lockheedmartin.com",
    description: "Defense contractor developing advanced autonomous surface vessels for naval operations. Leading integration of AI systems for maritime domain awareness.",
  },
  {
    name: "General Dynamics",
    category: "legacy",
    website: "https://www.gd.com",
    description: "Major defense systems integrator producing large-scale unmanned surface vehicles with advanced sensor suites and communication systems.",
  },
  {
    name: "Northrop Grumman",
    category: "legacy",
    website: "https://www.northropgrumman.com",
    description: "Aerospace and defense technology company developing autonomous maritime systems with focus on ISR and fleet protection capabilities.",
  },
  {
    name: "Textron Systems",
    category: "legacy",
    website: "https://www.textronsystems.com",
    description: "Defense and aerospace manufacturer producing Common Unmanned Surface Vehicle (CUSV) for mine countermeasures.",
  },
  {
    name: "L3Harris Technologies",
    category: "legacy",
    website: "https://www.l3harris.com",
    description: "Defense technology company developing autonomous maritime systems with advanced communications and electronic warfare capabilities.",
  },
  {
    name: "Raytheon",
    category: "legacy",
    website: "https://www.rtx.com",
    description: "Aerospace and defense company integrating sensor systems and weapons platforms onto unmanned surface vessels.",
  },
  // Small Shipbuilders
  {
    name: "Metal Shark",
    category: "shipbuilder",
    website: "https://www.metalsharkboats.com",
    description: "High-performance vessel manufacturer specializing in autonomous patrol boats and harbor security USVs.",
  },
  {
    name: "Safe Boats International",
    category: "shipbuilder",
    website: "https://www.safeboats.com",
    description: "Custom patrol boat builder developing unmanned variants for coastal defense and surveillance missions.",
  },
  {
    name: "Vigor Industrial",
    category: "shipbuilder",
    website: "https://www.vigor.net",
    description: "Shipbuilder and ship repair company entering the autonomous surface vehicle market with focus on multi-mission platforms.",
  },
];

function CompanyGridCard({ company }: { company: Company }) {
  const [isOpen, setIsOpen] = useState(false);

  const categoryLabels = {
    startup: "STARTUP",
    legacy: "LEGACY DEFENSE",
    shipbuilder: "SHIPBUILDER",
  };

  const categoryColors = {
    startup: "bg-blue-100 text-blue-700 border-blue-500",
    legacy: "bg-purple-100 text-purple-700 border-purple-500",
    shipbuilder: "bg-green-100 text-green-700 border-green-500",
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
            <div className="w-full h-24 bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-500 font-mono mb-3">
              IMG
            </div>
            <CardTitle className="text-base font-bold tracking-tight text-left">
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
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(["startup", "legacy", "shipbuilder"]));
  const [contractData, setContractData] = useState<ContractData[]>([]);
  const [isLoadingContracts, setIsLoadingContracts] = useState(false);
  const [showOnlyMarketPlayers, setShowOnlyMarketPlayers] = useState(false);

  // Load contract data when switching to map view
  useEffect(() => {
    if (view === "map" && contractData.length === 0 && !isLoadingContracts) {
      loadContractData();
    }
  }, [view]);

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
  }, [searchTerm, selectedCategories]);

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
            {/* Compact Header with Search and Filters */}
            <div className="mb-4 sm:mb-6 bg-white border-2 border-black p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
                <div>
                  <span className="text-[10px] sm:text-xs font-mono tracking-wider text-blue-600 font-bold">USV MARKET DATABASE</span>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                    Key Market Players
                  </h1>
                </div>
                <Button
                  onClick={() => setView("map")}
                  className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600 font-mono text-[10px] sm:text-xs tracking-wider px-3 sm:px-4 py-2 rounded-none whitespace-nowrap"
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  VIEW MAP
                </Button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                  <Input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 sm:pl-10 border-2 border-gray-300 focus:border-black rounded-none font-mono text-xs sm:text-sm"
                  />
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                  <Button
                    onClick={() => toggleCategory("startup")}
                    variant="outline"
                    className={`border-2 rounded-none font-mono text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-2 ${selectedCategories.has("startup")
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-600"
                      }`}
                  >
                    STARTUPS
                  </Button>
                  <Button
                    onClick={() => toggleCategory("legacy")}
                    variant="outline"
                    className={`border-2 rounded-none font-mono text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-2 whitespace-nowrap ${selectedCategories.has("legacy")
                      ? "bg-purple-100 border-purple-500 text-purple-700"
                      : "border-gray-300 text-gray-600"
                      }`}
                  >
                    LEGACY DEFENSE
                  </Button>
                  <Button
                    onClick={() => toggleCategory("shipbuilder")}
                    variant="outline"
                    className={`border-2 rounded-none font-mono text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-2 ${selectedCategories.has("shipbuilder")
                      ? "bg-green-100 border-green-500 text-green-700"
                      : "border-gray-300 text-gray-600"
                      }`}
                  >
                    SHIPBUILDERS
                  </Button>
                </div>
              </div>
            </div>

            {/* Company List */}
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
          </div>
        ) : (
          <div className="h-[calc(100vh-80px)] w-full relative">
            {/* Map View Controls */}
            <div className="absolute top-4 left-4 z-[1000] bg-white border-2 border-black p-4 shadow-lg max-w-[280px]">
              <Button
                onClick={() => setView("list")}
                className="bg-white hover:bg-gray-100 text-black border-2 border-black font-mono text-xs tracking-wider px-4 py-2 rounded-none mb-4 w-full"
              >
                <Grid3x3 className="w-4 h-4 mr-2" />
                VIEW KEY PLAYERS LIST
              </Button>

              <div className="border-t-2 border-gray-200 pt-4 mb-4">
                <div className="text-xs font-mono text-gray-600 mb-3">FILTER:</div>
                <Button
                  onClick={() => setShowOnlyMarketPlayers(!showOnlyMarketPlayers)}
                  className={`w-full font-mono text-xs tracking-wider px-4 py-2 rounded-none transition-all ${showOnlyMarketPlayers
                    ? "bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700"
                    : "bg-white text-black border-2 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showOnlyMarketPlayers ? "SHOW ALL CONTRACTORS" : "SHOW ONLY KEY PLAYERS"}
                </Button>
              </div>

              <div className="space-y-2 border-t-2 border-gray-200 pt-4">
                <div className="text-xs font-mono text-gray-600">LEGEND:</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow"></div>
                  <span className="text-xs">Market Defining Organizations ({marketCompanies.length})</span>
                </div>
                {!showOnlyMarketPlayers && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-xs">Government Funded Landscape ({contractData.length})</span>
                  </div>
                )}
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
