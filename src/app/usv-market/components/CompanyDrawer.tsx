"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Company } from "../types";
import { entityCategoryLabels, entityCategoryColors, companyTypeLabels, companyTypeColors, entityTypeLabels, entityTypeColors, formatFunding } from "../utils";

interface CompanyDrawerProps {
  company: Company;
  vehicleCount: number;
  onViewVehicles: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function CompanyDrawer({
  company,
  vehicleCount,
  onViewVehicles,
  isOpen,
  onClose
}: CompanyDrawerProps) {
  const [logoError, setLogoError] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Reset description state when drawer opens with new company
  useEffect(() => {
    if (isOpen) {
      setShowFullDescription(false);
    }
  }, [isOpen, company.name]);

  // Truncate description to ~150 characters
  const truncatedDescription = company.description && company.description.length > 150
    ? company.description.substring(0, 150).trim() + "..."
    : company.description;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] bg-white border-t-2 border-black rounded-none flex flex-col">
        <DrawerHeader className="border-b border-gray-300 pb-3 bg-white flex-shrink-0">
          <DrawerTitle className="text-lg sm:text-2xl font-bold text-black">
            {company.name}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="space-y-4">
            {/* Entity Type & Category Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Entity Type Badge */}
              <span className={`text-xs font-mono tracking-wider px-3 py-1.5 border ${entityTypeColors[company.entityType]}`}>
                {entityTypeLabels[company.entityType]}
              </span>

              {/* Entity Category Badge */}
              {company.entityCategory && (
                <span className={`text-xs font-mono tracking-wider px-3 py-1.5 border ${entityCategoryColors[company.entityCategory]}`}>
                  {entityCategoryLabels[company.entityCategory]}
                </span>
              )}

              {/* Company Type Badge - only for companies */}
              {company.entityType === "company" && company.companyType && (
                <span className={`text-xs font-mono tracking-wider px-3 py-1.5 border ${companyTypeColors[company.companyType]}`}>
                  {companyTypeLabels[company.companyType]}
                </span>
              )}

              {/* Funding Badge */}
              {company.funding && (
                <span className="text-xs font-mono text-green-700 bg-green-50 px-3 py-1.5 border border-green-300 font-bold">
                  {formatFunding(company.funding)} RAISED
                </span>
              )}

              {/* Vehicle Count Badge */}
              {vehicleCount > 0 && (
                <span onClick={onViewVehicles}
                  className="text-xs font-mono text-blue-700 bg-blue-50 px-3
                py-1.5 border border-blue-300
                cursor-pointer hover:bg-blue-200 hover:border-blue-700">
                  {vehicleCount} {vehicleCount === 1 ? 'VEHICLE' : 'VEHICLES'}
                </span>
              )}
            </div>

            {/* Logo */}
            <div className="w-full h-32 bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden">
              {company.imageUrl && !logoError ? (
                <img
                  src={company.imageUrl}
                  alt={`${company.name} logo`}
                  className="max-w-full max-h-full object-contain p-4"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-sm text-gray-500 font-mono">NO IMAGE</span>
              )}
            </div>

            {/* Location */}
            {company.location && (
              <div>
                <span className="text-xs font-mono text-gray-600 font-bold block mb-1">LOCATION</span>
                <p className="text-sm text-gray-700">{company.location}</p>
              </div>
            )}

            {/* Description */}
            {company.description && (
              <div>
                <span className="text-xs font-mono text-gray-600 font-bold block mb-1">DESCRIPTION</span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {showFullDescription ? company.description : truncatedDescription}
                </p>
                {company.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-xs font-mono text-blue-600 hover:text-blue-800 mt-2 underline cursor-pointer"
                  >
                    {showFullDescription ? "SEE LESS" : "SEE MORE"}
                  </button>
                )}
              </div>
            )}

            {/* Portfolio Companies - Only for Investors */}
            {company.entityType === "investor" && company.portfolioCompanies && (
              <div>
                <span className="text-xs font-mono text-gray-600 font-bold block mb-1">PORTFOLIO COMPANIES</span>
                <div className="flex flex-wrap gap-2">
                  {company.portfolioCompanies.split(',').map((companyName, index) => (
                    <span
                      key={index}
                      className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-1 border border-blue-300"
                    >
                      {companyName.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Website */}
            <div className="pb-2">
              <span className="text-xs font-mono text-gray-600 font-bold block mb-1">WEBSITE</span>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-blue-600 hover:text-blue-800 transition-colors inline-block border-b border-blue-400 hover:border-blue-800 break-all"
                onClick={(e) => e.stopPropagation()}
              >
                {company.website.replace(/^https?:\/\//, '').replace(/^www\./, '')}
              </a>
            </div>
          </div>
        </div>

        {/* Fixed Footer with Vehicle Button */}
        <div className="border-t-2 border-gray-200 bg-white px-3 sm:px-4 py-3 flex-shrink-0">
          <Button
            onClick={onViewVehicles}
            disabled={vehicleCount === 0}
            className={`w-full font-mono text-xs tracking-wider px-4 py-3 rounded-none transition-all ${vehicleCount > 0
              ? "bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-gray-200 text-gray-500 border-2 border-gray-300 cursor-not-allowed"
              }`}
          >
            {vehicleCount > 0
              ? `VIEW ${vehicleCount} VEHICLE${vehicleCount > 1 ? 'S' : ''}`
              : 'NO VEHICLES AVAILABLE'}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
