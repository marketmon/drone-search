"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Vehicle } from "../types";
import { Ship, Ruler, Gauge, Clock, Zap } from "lucide-react";

interface VehicleGridCardProps {
  vehicle: Vehicle;
  onClick?: () => void;
}

export function VehicleGridCard({ vehicle, onClick }: VehicleGridCardProps) {
  return (
    <Card
      className="border border-gray-300 rounded-none shadow-none hover:shadow-md hover:border-gray-400 transition-all flex flex-col bg-white cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Company Badge */}
            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider px-2 py-1 border bg-blue-50 text-blue-700 border-blue-300">
              {vehicle.company}
            </span>
          </div>
        </div>

        <CardTitle className="text-lg sm:text-xl font-bold tracking-tight text-left text-black leading-tight mb-4">
          {vehicle.name}
        </CardTitle>

        {/* Vehicle Specs */}
        <div className="space-y-2">
          {vehicle.length && (
            <div className="flex items-center gap-2 text-xs">
              <Ruler className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 font-mono">Length:</span>
              <span className="text-black font-medium">{vehicle.length}</span>
            </div>
          )}

          {vehicle.range && (
            <div className="flex items-center gap-2 text-xs">
              <Ship className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 font-mono">Range:</span>
              <span className="text-black font-medium">{vehicle.range}</span>
            </div>
          )}

          {vehicle.endurance && (
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 font-mono">Endurance:</span>
              <span className="text-black font-medium">{vehicle.endurance}</span>
            </div>
          )}

          {vehicle.topSpeed && (
            <div className="flex items-center gap-2 text-xs">
              <Gauge className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 font-mono">Top Speed:</span>
              <span className="text-black font-medium">{vehicle.topSpeed}</span>
            </div>
          )}

          {vehicle.payload && (
            <div className="flex items-center gap-2 text-xs">
              <Zap className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 font-mono">Payload:</span>
              <span className="text-black font-medium">{vehicle.payload}</span>
            </div>
          )}
        </div>

        {/* Additional Info */}
        {(vehicle.propulsion || vehicle.seastate) && (
          <div className="mt-4 pt-3 border-t border-gray-200 space-y-1">
            {vehicle.propulsion && (
              <p className="text-xs text-gray-600">
                <span className="font-mono font-bold">Propulsion:</span> {vehicle.propulsion}
              </p>
            )}
            {vehicle.seastate && (
              <p className="text-xs text-gray-600">
                <span className="font-mono font-bold">Sea State:</span> {vehicle.seastate}
              </p>
            )}
          </div>
        )}
      </CardHeader>
    </Card>
  );
}
