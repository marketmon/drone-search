"use client";

import { Vehicle } from "../types";
import { VehicleGridCard } from "./VehicleGridCard";

interface VehicleGridProps {
  vehicles: Vehicle[];
  onVehicleClick?: (vehicle: Vehicle) => void;
}

export function VehicleGrid({ vehicles, onVehicleClick }: VehicleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {vehicles.map((vehicle, idx) => (
        <VehicleGridCard
          key={`${vehicle.name}-${vehicle.company}-${idx}`}
          vehicle={vehicle}
          onClick={() => onVehicleClick?.(vehicle)}
        />
      ))}
    </div>
  );
}
