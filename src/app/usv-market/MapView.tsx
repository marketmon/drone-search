"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import { Icon, LatLngBounds, Control, DomUtil } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Company, ContractData, EntityType } from "./types";
import { formatFunding, entityTypeLabels, entityCategoryLabels, companyTypeLabels } from "./utils";

interface MapViewProps {
  contractData: ContractData[];
  marketCompanies: Company[];
  showOnlyMarketPlayers: boolean;
}

// Component for company popup content
function CompanyPopupContent({ company }: { company: Company }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription = company.description && company.description.length > 150
    ? company.description.substring(0, 150).trim() + "..."
    : company.description;

  const fundingDisplay = formatFunding(company.funding);

  return (
    <div className="min-w-[280px] max-w-[320px]">
      <div className="border-b-2 border-blue-500 pb-3 mb-3">
        <h3 className="font-bold text-xl text-blue-600 leading-tight mb-2">{company.name}</h3>
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-xs font-mono text-gray-500 uppercase font-bold">
            {entityTypeLabels[company.entityType]}
          </span>
          {company.entityCategory && (
            <>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs font-mono text-gray-500 uppercase font-bold">
                {entityCategoryLabels[company.entityCategory]}
              </span>
            </>
          )}
          {company.entityType === "company" && company.companyType && (
            <>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs font-mono text-blue-500 uppercase font-bold">
                {companyTypeLabels[company.companyType]}
              </span>
            </>
          )}
          {fundingDisplay && (
            <>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs font-mono text-green-600 font-bold">
                {fundingDisplay}
              </span>
            </>
          )}
        </div>
        <div className="text-xs text-gray-600 font-medium">{company.location}</div>
      </div>
      <div className="mb-4 max-h-[200px] overflow-y-auto">
        <p className="text-sm text-gray-700 leading-relaxed">
          {showFullDescription ? company.description : truncatedDescription}
        </p>
        {company.description && company.description.length > 150 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowFullDescription(!showFullDescription);
            }}
            className="text-xs font-mono text-blue-600 hover:text-blue-800 mt-2 underline"
          >
            {showFullDescription ? "SEE LESS" : "SEE MORE"}
          </button>
        )}
      </div>
      <a
        href={company.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 hover:text-blue-800 font-mono border-b-2 border-blue-400 hover:border-blue-600 font-medium inline-block"
      >
        Visit Website →
      </a>
    </div>
  );
}

// Custom icons based on entity type (4-color scheme)
const entityTypeIcons: Record<EntityType, Icon> = {
  company: new Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  partner: new Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  government: new Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  investor: new Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
};

// Icon for government contracts (smaller gray marker)
const contractIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  popupAnchor: [1, -28],
  shadowSize: [33, 33],
});

// Component to fit bounds to show all markers
function FitBounds({ allMarkers }: { allMarkers: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (allMarkers.length > 0) {
      const bounds = new LatLngBounds(allMarkers);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [allMarkers, map]);

  return null;
}

// Legend data with colors and descriptions (4-color scheme)
const legendItems = [
  { color: "#2A81CB", label: "Company", entityType: "company" as EntityType },
  { color: "#2AAD27", label: "Partner", entityType: "partner" as EntityType },
  { color: "#7B7B7B", label: "Government", entityType: "government" as EntityType },
  { color: "#CB8427", label: "Investor", entityType: "investor" as EntityType },
];

// Custom Legend Control Component
function MapLegend({
  showOnlyMarketPlayers,
  marketCompanyCount,
  contractCount
}: {
  showOnlyMarketPlayers: boolean;
  marketCompanyCount: number;
  contractCount: number;
}) {
  const map = useMap();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const legend = new Control({ position: "topright" });

    legend.onAdd = () => {
      const div = DomUtil.create("div", "leaflet-control-legend");
      div.style.backgroundColor = "white";
      div.style.border = "2px solid #000";
      div.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

      const root = createRoot(div);

      const updateLegend = () => {
        root.render(
          <div className="text-black">
            {isCollapsed ? (
              // Collapsed view
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-2 hover:bg-gray-100 transition-colors"
                title="Expand legend"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            ) : (
              // Expanded view
              <div className="max-w-[280px] max-h-[calc(100vh-180px)] overflow-y-auto p-3">
                <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-gray-200">
                  <h3 className="font-bold text-sm">Map Legend</h3>
                  <button
                    onClick={() => setIsCollapsed(true)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Collapse legend"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="text-xs font-mono text-gray-600 font-bold mb-2">ENTITY TYPES:</div>
                  {legendItems.map((item) => (
                    <div key={item.entityType} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full border-2 border-white shadow flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-xs font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
                {!showOnlyMarketPlayers && (
                  <div className="border-t-2 border-gray-200 pt-3">
                    <div className="text-xs font-mono text-gray-600 font-bold mb-2">GOV. CONTRACTS:</div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#7B7B7B" }}
                      ></div>
                      <span className="text-xs font-medium">Organizations with Contracts ({contractCount})</span>
                    </div>
                  </div>
                )}
                <div className="border-t-2 border-gray-200 pt-3 mt-3">
                  <div className="text-xs text-gray-500 font-mono">
                    Total Entities: <span className="font-bold text-black">{marketCompanyCount}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      };

      updateLegend();
      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map, showOnlyMarketPlayers, marketCompanyCount, contractCount, isCollapsed]);

  return null;
}

export default function MapView({ contractData, marketCompanies, showOnlyMarketPlayers }: MapViewProps) {
  // Market company markers
  const marketCompanyMarkers = useMemo(() => {
    return marketCompanies
      .filter(company => company.lat && company.lng)
      .map(company => ({
        company,
        lat: company.lat,
        lng: company.lng,
      }));
  }, [marketCompanies]);

  // Group contracts by unique location
  const contractMarkers = useMemo(() => {
    console.log('Total contract data received:', contractData.length);
    const locationMap = new Map<string, ContractData[]>();

    contractData.forEach((contract) => {
      if (contract.lat && contract.lng) {
        const key = `${contract.lat.toFixed(4)},${contract.lng.toFixed(4)}`;
        const existing = locationMap.get(key) || [];
        existing.push(contract);
        locationMap.set(key, existing);
      }
    });

    const markers = Array.from(locationMap.entries()).map(([_, contracts]) => ({
      contracts,
      lat: contracts[0].lat,
      lng: contracts[0].lng,
      company_name: contracts[0].company_name,
    }));

    console.log('Contract markers to display:', markers.length);
    console.log('showOnlyMarketPlayers:', showOnlyMarketPlayers);

    return markers;
  }, [contractData, showOnlyMarketPlayers]);

  // All marker positions for fitting bounds
  const allMarkerPositions = useMemo(() => {
    const positions: [number, number][] = [];
    marketCompanyMarkers.forEach(m => positions.push([m.lat, m.lng]));
    if (!showOnlyMarketPlayers) {
      contractMarkers.forEach(m => positions.push([m.lat, m.lng]));
    }
    return positions;
  }, [marketCompanyMarkers, contractMarkers, showOnlyMarketPlayers]);

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
      zoom={4}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='<a href="https://carto.com/basemaps">Carto</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <ZoomControl position="topleft" />

      <FitBounds allMarkers={allMarkerPositions} />

      <MapLegend
        showOnlyMarketPlayers={showOnlyMarketPlayers}
        marketCompanyCount={marketCompanyMarkers.length}
        contractCount={contractMarkers.length}
      />

      {/* Market Company Markers */}
      {marketCompanyMarkers.map((marker, idx) => (
        <Marker
          key={`market-${idx}`}
          position={[marker.lat, marker.lng]}
          icon={entityTypeIcons[marker.company.entityType]}
        >
          <Popup maxWidth={320}>
            <CompanyPopupContent company={marker.company} />
          </Popup>
        </Marker>
      ))}

      {/* Government Contract Markers */}
      {!showOnlyMarketPlayers && contractMarkers.map((marker, idx) => {
        const totalAmount = marker.contracts.reduce(
          (sum, c) => sum + (c.contract_amount || 0),
          0
        );

        return (
          <Marker
            key={`contract-${idx}`}
            position={[marker.lat, marker.lng]}
            icon={contractIcon}
          >
            <Popup maxWidth={320}>
              <div className="min-w-[280px] max-w-[300px] max-h-[400px] overflow-y-auto">
                <div className="border-b-2 border-gray-400 pb-2 mb-3">
                  <h3 className="font-bold text-base text-gray-800">{marker.company_name}</h3>
                  <p className="text-xs text-gray-600">
                    {marker.contracts[0].city}, {marker.contracts[0].state}
                  </p>
                  {marker.contracts[0].company_url && (
                    <a
                      href={ensureProtocol(marker.contracts[0].company_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 font-mono border-b border-blue-400 inline-block mt-1"
                    >
                      Visit Website →
                    </a>
                  )}
                  <p className="text-xs font-mono text-gray-500 mt-2">
                    {marker.contracts.length} CONTRACT{marker.contracts.length > 1 ? "S" : ""} • {formatCurrency(totalAmount)}
                  </p>
                </div>

                <div className="space-y-3">
                  {marker.contracts.slice(0, 10).map((contract, i) => (
                    <div key={i} className="border-l-2 border-gray-300 pl-3">
                      <p className="text-sm font-medium text-gray-800 mb-1">{contract.product}</p>
                      <div className="flex justify-between items-center text-xs text-gray-600">
                        <span>{formatCurrency(contract.contract_amount || 0)}</span>
                        <span>{contract.start_date}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500 font-mono">{contract.contract_id}</p>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded font-mono">
                          {contract.source}
                        </span>
                      </div>
                    </div>
                  ))}
                  {marker.contracts.length > 10 && (
                    <p className="text-xs text-gray-500 italic">
                      + {marker.contracts.length - 10} more contracts
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
