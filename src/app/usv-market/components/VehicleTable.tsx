"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Vehicle } from "../types";

interface VehicleTableProps {
  vehicles: Vehicle[];
  onVehicleClick?: (vehicle: Vehicle) => void;
}

export function VehicleTable({ vehicles, onVehicleClick }: VehicleTableProps) {
  return (
    <div className="border-2 border-black overflow-hidden text-black">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">NAME</TableHead>
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">COMPANY</TableHead>
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">LENGTH</TableHead>
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">RANGE</TableHead>
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">ENDURANCE</TableHead>
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">TOP SPEED</TableHead>
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">PAYLOAD</TableHead>
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">PROPULSION</TableHead>
              <TableHead className="font-mono text-xs text-black whitespace-nowrap">SEA STATE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle, idx) => (
              <TableRow
                key={idx}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onVehicleClick?.(vehicle)}
              >
                <TableCell className="font-medium text-sm border-r border-gray-200">
                  {vehicle.name}
                </TableCell>
                <TableCell className="text-sm text-gray-700 border-r border-gray-200">
                  {vehicle.company}
                </TableCell>
                <TableCell className="text-xs text-gray-600 border-r border-gray-200 whitespace-nowrap">
                  {vehicle.length || "-"}
                </TableCell>
                <TableCell className="text-xs text-gray-600 border-r border-gray-200 whitespace-nowrap">
                  {vehicle.range || "-"}
                </TableCell>
                <TableCell className="text-xs text-gray-600 border-r border-gray-200 whitespace-nowrap">
                  {vehicle.endurance || "-"}
                </TableCell>
                <TableCell className="text-xs text-gray-600 border-r border-gray-200 whitespace-nowrap">
                  {vehicle.topSpeed || "-"}
                </TableCell>
                <TableCell className="text-xs text-gray-600 border-r border-gray-200 whitespace-nowrap">
                  {vehicle.payload || "-"}
                </TableCell>
                <TableCell className="text-xs text-gray-600 border-r border-gray-200">
                  {vehicle.propulsion || "-"}
                </TableCell>
                <TableCell className="text-xs text-gray-600">
                  {vehicle.seastate || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
