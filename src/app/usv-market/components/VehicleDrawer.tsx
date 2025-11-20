"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Vehicle } from "../types";
import { Ship, Ruler, Gauge, Clock, Zap, ExternalLink, Waves, Wind } from "lucide-react";

interface VehicleDrawerProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
}

export function VehicleDrawer({ vehicle, isOpen, onClose }: VehicleDrawerProps) {
  const handleSpecSheetClick = () => {
    const params = new URLSearchParams({
      vehicle: vehicle.name,
      company: vehicle.company,
      link: vehicle.googleLink,
    });
    window.open(`/spec-sheet?${params.toString()}`, '_blank');
  };

  const specItems = [
    { icon: Ruler, label: "Length", value: vehicle.length, unit: "ft" },
    { icon: Ship, label: "Range", value: vehicle.range, unit: "nm" },
    { icon: Clock, label: "Endurance", value: vehicle.endurance, unit: "days" },
    { icon: Gauge, label: "Top Speed", value: vehicle.topSpeed, unit: "kts" },
    { icon: Zap, label: "Payload", value: vehicle.payload, unit: "lbs" },
    { icon: Waves, label: "Sea State", value: vehicle.seastate, unit: "" },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] bg-white border-t-2 border-black rounded-none flex flex-col">
        <DrawerHeader className="border-b border-gray-300 pb-3 bg-white flex-shrink-0">
          <DrawerTitle className="text-lg sm:text-2xl font-bold text-black">
            {vehicle.name}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="space-y-4">
            {/* Company Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono tracking-wider px-3 py-1.5 border bg-blue-50 text-blue-700 border-blue-300">
                {vehicle.company}
              </span>
              {vehicle.source && (
                <span className="text-xs font-mono tracking-wider px-3 py-1.5 border bg-gray-100 text-gray-700 border-gray-300">
                  {vehicle.source}
                </span>
              )}
            </div>

            {/* Specifications Header */}
            <div className="bg-gray-50 border-2 border-gray-300 p-3">
              <h3 className="text-xs font-mono text-gray-700 font-bold mb-3">VEHICLE SPECIFICATIONS</h3>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3">
                {specItems.map((spec) => {
                  const Icon = spec.icon;
                  return spec.value ? (
                    <div key={spec.label} className="bg-white border border-gray-200 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-gray-500" />
                        <span className="text-xs font-mono text-gray-600">{spec.label}</span>
                      </div>
                      <p className="text-lg font-bold text-black font-mono">
                        {spec.value}
                        {spec.unit && <span className="text-sm text-gray-500 ml-1">{spec.unit}</span>}
                      </p>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Propulsion Systems */}
            {(vehicle.propulsion || vehicle.auxPropulsion) && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-mono text-gray-600 font-bold">PROPULSION</span>
                </div>
                <div className="space-y-2">
                  {vehicle.propulsion && (
                    <div className="bg-gray-50 border border-gray-200 p-3">
                      <span className="text-xs font-mono text-gray-500 block mb-1">PRIMARY</span>
                      <p className="text-sm text-gray-700">{vehicle.propulsion}</p>
                    </div>
                  )}
                  {vehicle.auxPropulsion && (
                    <div className="bg-gray-50 border border-gray-200 p-3">
                      <span className="text-xs font-mono text-gray-500 block mb-1">AUXILIARY</span>
                      <p className="text-sm text-gray-700">{vehicle.auxPropulsion}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Spec Sheet Button */}
            {vehicle.googleLink && (
              <div className="pb-2">
                <div className="flex items-center gap-2 mb-3">
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-mono text-gray-600 font-bold">SPEC SHEET</span>
                </div>
                <button
                  onClick={handleSpecSheetClick}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-3 flex items-center justify-center gap-2 font-mono text-xs tracking-wider border-2 border-blue-600 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  VIEW SPEC SHEET
                </button>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
