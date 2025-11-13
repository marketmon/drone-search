"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ExternalLink, FileText } from "lucide-react";
import { Vehicle } from "../types";
import { formatSpec } from "../utils";

interface VehicleDialogProps {
  companyName: string;
  vehicles: Vehicle[];
  isOpen: boolean;
  onClose: () => void;
}

export function VehicleDialog({
  companyName,
  vehicles,
  isOpen,
  onClose
}: VehicleDialogProps) {
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
