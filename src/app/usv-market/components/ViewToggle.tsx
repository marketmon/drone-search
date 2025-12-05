"use client";

import { Button } from "@/components/ui/button";
import { Grid2x2, List, Map, Building2, FileText, Ship } from "lucide-react";

interface ViewToggleProps {
  viewType: "grid" | "table" | "map";
  onViewTypeChange: (viewType: "grid" | "table" | "map") => void;
  dataView?: "entities" | "contracts" | "vehicles";
  onDataViewChange?: (dataView: "entities" | "contracts" | "vehicles") => void;
}

export function ViewToggle({ viewType, onViewTypeChange, dataView = "entities", onDataViewChange }: ViewToggleProps) {
  return (
    <div className="bg-gray-100 border-2 border-black border-t-0 px-6 py-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        {/* Data View Toggle - only show in grid/table view */}
        {viewType !== "map" && onDataViewChange && (
          <div className="flex gap-2 items-center flex-wrap justify-center w-full sm:w-auto">
            <span className="text-xs font-mono text-gray-600 font-bold mr-1">DATA:</span>
            <div className="flex gap-2">
              <Button
                onClick={() => onDataViewChange("entities")}
                className={`border-2 cursor-pointer rounded-none font-mono px-2 sm:px-3 py-2 transition-all text-xs flex items-center overflow-hidden group ${dataView === "entities"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black hover:bg-gray-100"
                  }`}
                title="Entities"
              >
                <Building2 className="w-4 h-4 flex-shrink-0" />
                <span className={`ml-1.5 sm:ml-2 whitespace-nowrap transition-all duration-200 ease-in-out ${dataView === "entities"
                    ? "max-w-[100px] opacity-100"
                    : "max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100"
                  }`}>
                  ORGANIZATIONS
                </span>
              </Button>
              <Button
                onClick={() => onDataViewChange("contracts")}
                className={`border-2 cursor-pointer rounded-none font-mono px-2 sm:px-3 py-2 transition-all text-xs flex items-center overflow-hidden group ${dataView === "contracts"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black hover:bg-gray-100"
                  }`}
                title="Contracts"
              >
                <FileText className="w-4 h-4 flex-shrink-0" />
                <span className={`ml-1.5 sm:ml-2 whitespace-nowrap transition-all duration-200 ease-in-out ${dataView === "contracts"
                    ? "max-w-[100px] opacity-100"
                    : "max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100"
                  }`}>
                  CONTRACTS
                </span>
              </Button>
              <Button
                onClick={() => onDataViewChange("vehicles")}
                className={`border-2 cursor-pointer rounded-none font-mono px-2 sm:px-3 py-2 transition-all text-xs flex items-center overflow-hidden group ${dataView === "vehicles"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black hover:bg-gray-100"
                  }`}
                title="Vehicles"
              >
                <Ship className="w-4 h-4 flex-shrink-0" />
                <span className={`ml-1.5 sm:ml-2 whitespace-nowrap transition-all duration-200 ease-in-out ${dataView === "vehicles"
                    ? "max-w-[100px] opacity-100"
                    : "max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100"
                  }`}>
                  VEHICLES
                </span>
              </Button>
            </div>
          </div>
        )}

        {/* View Type Toggle */}
        <div className="flex gap-2 items-center">
          <span className="text-xs font-mono text-gray-600 font-bold mr-1">VIEW:</span>
          <Button
            onClick={() => onViewTypeChange("grid")}
            className={`border-2 cursor-pointer rounded-none font-mono text-xs px-3 py-2 transition-all ${viewType === "grid"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
              }`}
          >
            <Grid2x2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => onViewTypeChange("table")}
            className={`border-2 cursor-pointer rounded-none font-mono text-xs px-3 py-2 transition-all ${viewType === "table"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
              }`}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => onViewTypeChange("map")}
            className={`border-2 cursor-pointer rounded-none font-mono text-xs px-3 py-2 transition-all ${viewType === "map"
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black hover:bg-gray-100"
              }`}
          >
            <Map className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
