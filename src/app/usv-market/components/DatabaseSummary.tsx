"use client";

import { Sparkles, Building2, Handshake, Landmark, TrendingUp, Ship, FileText } from "lucide-react";
import { NewEntitiesDrawer } from "./NewEntitiesDrawer";
import { Company } from "../types";

interface DatabaseSummaryProps {
  totalCompanies: number;
  totalInvestors: number;
  totalPartners: number;
  totalGovernment: number;
  totalVehicles: number;
  totalContracts: number;
  newEntities: Company[];
  newEntitiesDate: string | null;
}

export function DatabaseSummary({
  totalCompanies,
  totalInvestors,
  totalPartners,
  totalGovernment,
  totalVehicles,
  totalContracts,
  newEntities,
  newEntitiesDate,
}: DatabaseSummaryProps) {
  const stats = [
    {
      label: "Companies",
      value: totalCompanies,
      icon: Building2,
      color: "bg-blue-50 border-blue-500 text-blue-700",
    },
    {
      label: "Investors",
      value: totalInvestors,
      icon: TrendingUp,
      color: "bg-amber-50 border-amber-500 text-amber-700",
    },
    {
      label: "Partners",
      value: totalPartners,
      icon: Handshake,
      color: "bg-green-50 border-green-500 text-green-700",
    },
    {
      label: "Government",
      value: totalGovernment,
      icon: Landmark,
      color: "bg-slate-50 border-slate-500 text-slate-700",
    },
    {
      label: "Vehicles",
      value: totalVehicles,
      icon: Ship,
      color: "bg-cyan-50 border-cyan-500 text-cyan-700",
    },
    {
      label: "Contracts",
      value: totalContracts,
      icon: FileText,
      color: "bg-purple-50 border-purple-500 text-purple-700",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-black p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-mono text-xs sm:text-sm font-bold text-black tracking-wider">
          DATABASE OVERVIEW
        </h2>
        {newEntities.length > 0 && newEntitiesDate && (
          <NewEntitiesDrawer newEntities={newEntities} dateAdded={newEntitiesDate} />
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`${stat.color} border-2 p-3 transition-all hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex flex-col items-center gap-1.5">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold font-mono">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wide mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
