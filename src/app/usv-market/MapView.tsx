"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import { Icon, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";

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

interface Company {
  name: string;
  website: string;
  description: string;
  category: "startup" | "legacy" | "mid-tier";
  location: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  contractData: ContractData[];
  marketCompanies: Company[];
  showOnlyMarketPlayers: boolean;
}

// Custom icons
const marketCompanyIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const contractIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [15, 25],
  iconAnchor: [7, 25],
  popupAnchor: [1, -20],
  shadowSize: [25, 25],
});

// Component to fit bounds after markers are loaded
function FitBounds({ contractData }: { contractData: ContractData[] }) {
  const map = useMap();

  useEffect(() => {
    if (contractData.length > 0) {
      const bounds = new LatLngBounds(
        contractData.map(contract => [contract.lat, contract.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [contractData, map]);

  return null;
}

export default function MapView({ contractData, marketCompanies, showOnlyMarketPlayers }: MapViewProps) {
  // Use the lat/lng coordinates from the company data directly
  const marketCompanyMarkers = useMemo(() => {
    return marketCompanies
      .filter(company => company.lat && company.lng)
      .map(company => ({
        company,
        lat: company.lat,
        lng: company.lng,
      }));
  }, [marketCompanies]);

  // Filter out contracts that are from market companies to avoid duplicates
  const otherContracts = useMemo(() => {
    const marketCompanyNames = marketCompanies.map(c => c.name.toLowerCase());

    return contractData.filter((contract) => {
      return !marketCompanyNames.some(name =>
        contract.company_name.toLowerCase().includes(name)
      );
    });
  }, [contractData, marketCompanies]);

  // Group contracts by company for cleaner display
  const contractsByCompany = useMemo(() => {
    const grouped = new Map<string, ContractData[]>();

    otherContracts.forEach((contract) => {
      const existing = grouped.get(contract.company_name) || [];
      existing.push(contract);
      grouped.set(contract.company_name, existing);
    });

    return grouped;
  }, [otherContracts]);

  // Get one marker per company location
  const uniqueContractMarkers = useMemo(() => {
    const seen = new Set<string>();
    const markers: ContractData[] = [];

    otherContracts.forEach((contract) => {
      const key = `${contract.lat},${contract.lng}`;
      if (!seen.has(key)) {
        seen.add(key);
        markers.push(contract);
      }
    });

    return markers;
  }, [otherContracts]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const ensureProtocol = (url: string) => {
    if (!url) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  };

  const center: [number, number] = [39.8283, -98.5795]; // Geographic center of USA

  return (
    <MapContainer
      center={center}
      zoom={3}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='<a href="https://carto.com/basemaps">Carto</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <ZoomControl position="topright" />

      <FitBounds contractData={contractData} />

      {/* Market Company Markers (highlighted) */}
      {marketCompanyMarkers.map((marker, idx) => (
        <Marker
          key={`market-${idx}`}
          position={[marker.lat, marker.lng]}
          icon={marketCompanyIcon}
        >
          <Popup>
            <div className="min-w-[280px]">
              <div className="border-b-2 border-blue-500 pb-3 mb-3">
                <h3 className="font-bold text-2xl text-blue-600 leading-tight mb-2">{marker.company.name}</h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-500 uppercase font-bold">
                    {marker.company.category === "startup" && "STARTUP"}
                    {marker.company.category === "legacy" && "LEGACY"}
                    {marker.company.category === "mid-tier" && "MID-TIER"}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600 font-medium">{marker.company.location}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">{marker.company.description}</p>
              <a
                href={marker.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 font-mono border-b-2 border-blue-400 hover:border-blue-600 font-medium inline-block"
              >
                Visit Website →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Contract Markers - only show when not filtered */}
      {!showOnlyMarketPlayers && uniqueContractMarkers.map((contract, idx) => {
        // Get all contracts at this location
        const contractsAtLocation = otherContracts.filter(
          (c) => c.lat === contract.lat && c.lng === contract.lng
        );

        const totalAmount = contractsAtLocation.reduce(
          (sum, c) => sum + (c.contract_amount || 0),
          0
        );

        return (
          <Marker
            key={`contract-${idx}`}
            position={[contract.lat, contract.lng]}
            icon={contractIcon}
          >
            <Popup maxWidth={300}>
              <div className="min-w-[280px] max-h-[400px] overflow-y-auto">
                <div className="border-b-2 border-gray-400 pb-2 mb-3">
                  <h3 className="font-bold text-base">{contract.company_name}</h3>
                  <p className="text-xs text-gray-600">
                    {contract.city}, {contract.state}
                  </p>
                  {contract.company_url && (
                    <a
                      href={ensureProtocol(contract.company_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 font-mono border-b border-blue-400 inline-block mt-1"
                    >
                      Visit Website →
                    </a>
                  )}
                  <p className="text-xs font-mono text-gray-500 mt-1">
                    {contractsAtLocation.length} CONTRACT{contractsAtLocation.length > 1 ? "S" : ""} • {formatCurrency(totalAmount)}
                  </p>
                </div>

                <div className="space-y-3">
                  {contractsAtLocation.slice(0, 5).map((c, i) => (
                    <div key={i} className="border-l-2 border-gray-300 pl-3">
                      <p className="text-sm font-medium text-gray-800 mb-1">{c.product}</p>
                      <div className="flex justify-between items-center text-xs text-gray-600">
                        <span>{formatCurrency(c.contract_amount || 0)}</span>
                        <span>{c.start_date}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500 font-mono">{c.contract_id}</p>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded font-mono">
                          {c.source}
                        </span>
                      </div>
                    </div>
                  ))}
                  {contractsAtLocation.length > 5 && (
                    <p className="text-xs text-gray-500 italic">
                      + {contractsAtLocation.length - 5} more contracts
                    </p>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
