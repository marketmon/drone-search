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
          <div className="flex gap-2 items-center">
            <span className="text-xs font-mono text-gray-600 font-bold mr-1">DATA:</span>
            <Button
              onClick={() => onDataViewChange("entities")}
              className={`border-2 cursor-pointer rounded-none font-mono text-xs px-3 py-2 transition-all ${dataView === "entities"
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black hover:bg-gray-100"
                }`}
            >
              <Building2 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">ENTITIES</span>
            </Button>
            <Button
              onClick={() => onDataViewChange("contracts")}
              className={`border-2 cursor-pointer rounded-none font-mono text-xs px-3 py-2 transition-all ${dataView === "contracts"
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black hover:bg-gray-100"
                }`}
            >
              <FileText className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">CONTRACTS</span>
            </Button>
            <Button
              onClick={() => onDataViewChange("vehicles")}
              className={`border-2 cursor-pointer rounded-none font-mono text-xs px-3 py-2 transition-all ${dataView === "vehicles"
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black hover:bg-gray-100"
                }`}
            >
              <Ship className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">VEHICLES</span>
            </Button>
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
