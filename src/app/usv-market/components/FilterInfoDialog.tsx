"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface FilterInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterInfoDialog({ isOpen, onClose }: FilterInfoDialogProps) {
  // Level 1: Entity Types (high-level classification)
  const entityTypeDefinitions = [
    {
      label: "Company",
      description: "Commercial entities developing, manufacturing, or providing USV technology, platforms, autonomy systems, or payload solutions."
    },
    {
      label: "Partner",
      description: "Organizations that support the USV ecosystem through research, education, incubation, or advocacy, including universities, research institutes, incubators, and non-profits."
    },
    {
      label: "Government",
      description: "Government entities involved in USV procurement, regulation, research, or operational deployment at civil or military levels."
    },
    {
      label: "Investor",
      description: "Venture capital firms, investment groups, and financial institutions providing funding to USV companies and startups."
    },
  ];

  // Level 2: Entity Categories (specific classification)
  const entityCategoryDefinitions = [
    {
      label: "USV Platform",
      category: "Company",
      description: "Companies that design, manufacture, or integrate complete unmanned surface vehicle systems."
    },
    {
      label: "USV Integrator",
      category: "Company",
      description: "Companies that produce a USV on behalf for an organization"
    },
    {
      label: "USV Operator",
      category: "Company",
      description: "Companies who operate or use USVs to accomplish their mission."
    },
    {
      label: "Autonomy Provider",
      category: "Company",
      description: "Companies developing autonomous navigation, control systems, and AI/ML software for unmanned vessels."
    },
    {
      label: "Component Manufacturer",
      category: "Company",
      description: "Companies producing necessary components for USV platform companies. Can include hulls, PCBs, payloads, etc."
    },
    {
      label: "University",
      category: "Partner",
      description: "Academic institutions conducting research and development in marine robotics, autonomous systems, and educating the future maritime workforce."
    },
    {
      label: "Research Institute",
      category: "Partner",
      description: "Non-academic research organizations focused on marine technology, autonomous systems development, and ocean science."
    },
    {
      label: "Incubator",
      category: "Partner",
      description: "Business incubators and accelerators supporting early-stage maritime technology startups and entrepreneurs."
    },
    {
      label: "Non-Profit/Association",
      category: "Partner",
      description: "Industry associations, professional organizations, and non-profits supporting the maritime autonomy sector."
    },
    {
      label: "Civil",
      category: "Government",
      description: "Civilian government agencies involved in maritime operations, environmental monitoring, coast guard, or regulatory oversight."
    },
    {
      label: "Military",
      category: "Government",
      description: "Military organizations and defense agencies procuring, testing, or deploying USVs for naval operations and defense applications."
    },
  ];

  // Level 3: Company Types (maturity stage - only applies to companies)
  const companyTypeDefinitions = [
    {
      label: "Startup",
      description: "Early-stage companies focused on innovative USV solutions, typically less than 5 years old with emerging technology and seeking initial market traction."
    },
    {
      label: "Mid-Tier",
      description: "Established companies with proven USV products and growing market presence, often with multiple commercial or government contracts."
    },
    {
      label: "New Prime",
      description: "New entrants to the government contracting space who have received significant funding (typically >$1B) and are actively competing for major Department of Defense contracts."
    },
    {
      label: "Legacy",
      description: "Major defense contractors and established firms with long histories of prime contracts in maritime systems and naval platforms."
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white text-white border-2 border-black rounded-none" showCloseButton={false}>
        {/* Custom Close Button */}
        <DialogClose className="absolute top-4 right-4 cursor-pointer w-8 h-8 border-2 border-black bg-white hover:bg-black hover:border-black transition-colors group flex items-center justify-center">
          <X className="w-5 h-5 text-black group-hover:text-white transition-colors" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="font-mono text-xl border-b-2 border-black pb-3 text-black">
            Filter Definitions
          </DialogTitle>
          <DialogDescription className="sr-only">
            Explanations of the three-level filtering hierarchy used in the USV market database
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Hierarchy Explanation */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
            <h3 className="font-mono font-bold text-sm text-black mb-2">
              Three-Level Filtering Hierarchy
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              The database uses a hierarchical classification system with three levels:
            </p>
            <ol className="text-sm text-gray-700 space-y-1 ml-4 list-decimal">
              <li><strong>Entity Type:</strong> High-level classification (Company, Partner, Government, Investor)</li>
              <li><strong>Entity Category:</strong> Specific role or function within the ecosystem</li>
              <li><strong>Company Type:</strong> Maturity stage (only applies to companies)</li>
            </ol>
          </div>

          {/* Level 1: Entity Types Section */}
          <div>
            <h3 className="font-mono font-bold text-base text-black mb-1 flex items-center gap-2">
              <span className="bg-blue-600 text-white px-2 py-0.5 text-xs">LEVEL 1</span>
              Entity Types
            </h3>
            <p className="text-xs text-gray-600 mb-3 font-mono">
              Primary classification of organizations in the USV ecosystem
            </p>
            <div className="space-y-3">
              {entityTypeDefinitions.map((type) => (
                <div key={type.label} className="border-l-4 border-blue-600 pl-3 py-1">
                  <h4 className="font-mono font-bold text-sm text-black mb-1">
                    {type.label}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Level 2: Entity Categories Section */}
          <div>
            <h3 className="font-mono font-bold text-base text-black mb-1 flex items-center gap-2">
              <span className="bg-green-600 text-white px-2 py-0.5 text-xs">LEVEL 2</span>
              Entity Categories
            </h3>
            <p className="text-xs text-gray-600 mb-3 font-mono">
              Specific roles and functions within each Entity Type
            </p>

            {/* Group by Entity Type */}
            <div className="space-y-4">
              {/* Company Categories */}
              <div>
                <div className="text-xs font-mono font-bold text-blue-700 mb-2 bg-blue-50 px-2 py-1">
                  COMPANY CATEGORIES
                </div>
                <div className="space-y-3">
                  {entityCategoryDefinitions
                    .filter(cat => cat.category === "Company")
                    .map((category) => (
                      <div key={category.label} className="border-l-4 border-sky-500 pl-3 py-1">
                        <h4 className="font-mono font-bold text-sm text-black mb-1">
                          {category.label}
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Partner Categories */}
              <div>
                <div className="text-xs font-mono font-bold text-green-700 mb-2 bg-green-50 px-2 py-1">
                  PARTNER CATEGORIES
                </div>
                <div className="space-y-3">
                  {entityCategoryDefinitions
                    .filter(cat => cat.category === "Partner")
                    .map((category) => (
                      <div key={category.label} className="border-l-4 border-emerald-500 pl-3 py-1">
                        <h4 className="font-mono font-bold text-sm text-black mb-1">
                          {category.label}
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Government Categories */}
              <div>
                <div className="text-xs font-mono font-bold text-gray-700 mb-2 bg-gray-50 px-2 py-1">
                  GOVERNMENT CATEGORIES
                </div>
                <div className="space-y-3">
                  {entityCategoryDefinitions
                    .filter(cat => cat.category === "Government")
                    .map((category) => (
                      <div key={category.label} className="border-l-4 border-stone-500 pl-3 py-1">
                        <h4 className="font-mono font-bold text-sm text-black mb-1">
                          {category.label}
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Level 3: Company Types Section */}
          <div>
            <h3 className="font-mono font-bold text-base text-black mb-1 flex items-center gap-2">
              <span className="bg-purple-600 text-white px-2 py-0.5 text-xs">LEVEL 3</span>
              Company Types
            </h3>
            <p className="text-xs text-gray-600 mb-3 font-mono">
              Maturity stage classification (only applies to entities with Entity Type = Company)
            </p>
            <div className="space-y-3">
              {companyTypeDefinitions.map((type) => (
                <div key={type.label} className="border-l-4 border-purple-600 pl-3 py-1">
                  <h4 className="font-mono font-bold text-sm text-black mb-1">
                    {type.label}
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
