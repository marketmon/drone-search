"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Company, Vehicle } from "../../types";
import {
  entityCategoryLabels,
  entityCategoryColors,
  companyTypeLabels,
  companyTypeColors,
  entityTypeLabels,
  entityTypeColors,
  formatFunding,
  formatSpec,
} from "../../utils";
import { Share2, ArrowLeft, Check, Building2, Landmark, Ship, Users, DollarSign } from "lucide-react";

interface CompanyPageClientProps {
  company: Company;
  vehicles: Vehicle[];
}

export default function CompanyPageClient({
  company,
  vehicles,
}: CompanyPageClientProps) {
  const [logoError, setLogoError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: company.name,
          text: company.description,
          url: url,
        });
        return;
      } catch (err) {
        // Fall through to clipboard copy
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button and share */}
      <div className="border-b-2 border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/usv-market"
            className="flex items-center gap-2 text-sm font-mono text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO MARKET
          </Link>
          <Button
            onClick={handleShare}
            className="flex items-center gap-2 font-mono text-xs bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 rounded-none px-4 py-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                COPIED
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                SHARE
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Company Name */}
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6">
          {company.name}
        </h1>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {/* Entity Type Badge */}
          <span
            className={`text-xs font-mono tracking-wider px-3 py-1.5 border ${entityTypeColors[company.entityType]
              }`}
          >
            {entityTypeLabels[company.entityType]}
          </span>

          {/* Entity Category Badge */}
          {company.entityCategory && (
            <span
              className={`text-xs font-mono tracking-wider px-3 py-1.5 border ${entityCategoryColors[company.entityCategory]
                }`}
            >
              {entityCategoryLabels[company.entityCategory]}
            </span>
          )}

          {/* Company Type Badge */}
          {company.entityType === "company" && company.companyType && (
            <span
              className={`text-xs font-mono tracking-wider px-3 py-1.5 border ${companyTypeColors[company.companyType]
                }`}
            >
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
          {vehicles.length > 0 && (
            <span className="text-xs font-mono text-blue-700 bg-blue-50 px-3 py-1.5 border border-blue-300">
              {vehicles.length} {vehicles.length === 1 ? "VEHICLE" : "VEHICLES"}
            </span>
          )}
        </div>

        {/* Logo */}
        <div className="w-full max-w-md h-48 bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden mb-8">
          {company.imageUrl && !logoError ? (
            <img
              src={company.imageUrl}
              alt={`${company.name} logo`}
              className="max-w-full max-h-full object-contain p-6"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-sm text-gray-500 font-mono">NO IMAGE</span>
          )}
        </div>

        {/* Location */}
        {company.location && (
          <div className="mb-6">
            <h2 className="text-xs font-mono text-gray-600 font-bold mb-2">
              LOCATION
            </h2>
            <p className="text-base text-gray-700">{company.location}</p>
          </div>
        )}

        {/* Description */}
        {company.description && (
          <div className="mb-6">
            <h2 className="text-xs font-mono text-gray-600 font-bold mb-2">
              DESCRIPTION
            </h2>
            <div
              className="text-base text-gray-700 leading-relaxed [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800 [&_p]:mb-3 [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: company.description }}
            />
          </div>
        )}

        {/* Portfolio Companies - Only for Investors */}
        {company.entityType === "investor" && company.portfolioCompanies && (
          <div className="mb-6">
            <h2 className="text-xs font-mono text-gray-600 font-bold mb-2">
              PORTFOLIO COMPANIES
            </h2>
            <div className="flex flex-wrap gap-2">
              {company.portfolioCompanies.split(",").map((companyName, index) => (
                <span
                  key={index}
                  className="text-xs font-mono text-blue-700 bg-blue-50 px-3 py-1.5 border border-blue-300"
                >
                  {companyName.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Vehicles */}
        {vehicles.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-mono text-gray-600 font-bold mb-3">
              VEHICLES ({vehicles.length})
            </h2>
            <div className="space-y-4">
              {vehicles.map((vehicle, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 p-4 hover:border-blue-500 transition-colors text-black"
                >
                  <h3 className="font-bold text-lg mb-3">{vehicle.name}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-xs font-mono text-gray-500">
                        LENGTH
                      </span>
                      <p className="text-sm font-medium">
                        {formatSpec(vehicle.length, "ft")}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-gray-500">
                        RANGE
                      </span>
                      <p className="text-sm font-medium">
                        {formatSpec(vehicle.range, "nm")}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-gray-500">
                        ENDURANCE
                      </span>
                      <p className="text-sm font-medium">
                        {formatSpec(vehicle.endurance, "days")}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-gray-500">
                        TOP SPEED
                      </span>
                      <p className="text-sm font-medium">
                        {formatSpec(vehicle.topSpeed, "kts")}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-gray-500">
                        PAYLOAD
                      </span>
                      <p className="text-sm font-medium">
                        {formatSpec(vehicle.payload, "lbs")}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-gray-500">
                        SEA STATE
                      </span>
                      <p className="text-sm font-medium">
                        {formatSpec(vehicle.seastate)}
                      </p>
                    </div>
                  </div>
                  {vehicle.propulsion && (
                    <div className="mt-3">
                      <span className="text-xs font-mono text-gray-500">
                        PROPULSION
                      </span>
                      <p className="text-sm">{vehicle.propulsion}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Website */}
        {company.website && (
          <div className="mb-8 pb-8 border-b-2 border-gray-200">
            <h2 className="text-xs font-mono text-gray-600 font-bold mb-2">
              WEBSITE
            </h2>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-mono text-blue-600 hover:text-blue-800 transition-colors inline-block border-b-2 border-blue-400 hover:border-blue-800 break-all"
            >
              {company.website.replace(/^https?:\/\//, "").replace(/^www\./, "")}
            </a>
          </div>
        )}

        {/* Explore the Database CTA */}
        <div className="mb-8 border-2 border-blue-600 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-black mb-2">
            Explore the Full Database
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            USV Hub tracks the entire autonomous maritime ecosystem. Discover companies, government programs, and investors shaping the future of unmanned surface vehicles.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-black">$600M+</p>
              <p className="text-xs font-mono text-gray-600">GOV CONTRACTS</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-black">249</p>
              <p className="text-xs font-mono text-gray-600">ENTITIES</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Landmark className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-black">28</p>
              <p className="text-xs font-mono text-gray-600">GOV ORGS</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-black">60</p>
              <p className="text-xs font-mono text-gray-600">INVESTORS</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Ship className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-black">83</p>
              <p className="text-xs font-mono text-gray-600">VEHICLES</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/usv-market" className="flex-1">
              <Button className="w-full font-mono text-sm bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 rounded-none px-6 py-3">
                EXPLORE THE DATABASE
              </Button>
            </Link>
            <a
              href="https://forms.gle/Y1kJ34ZPvyaikgxq7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full font-mono text-sm bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-100 rounded-none px-6 py-3">
                JOIN THE CONVERSATION
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
