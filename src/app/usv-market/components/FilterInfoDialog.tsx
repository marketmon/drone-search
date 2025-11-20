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
  const entityTypeDefinitions = [
    {
      label: "USV Platform",
      description: "Companies that design, manufacture, or integrate complete unmanned surface vehicle systems."
    },
    {
      label: "Boatbuilder",
      description: "Traditional boat manufacturers that build hulls and platforms for USV applications."
    },
    {
      label: "Investor",
      description: "Venture capital firms, investment groups, and financial institutions funding USV companies."
    },
    {
      label: "University",
      description: "Academic institutions conducting research and development relevant to USV technology as well as educating future the future maritime workforce."
    },
    {
      label: "Research Institute",
      description: "Non-academic research organizations focused on marine technology and autonomous systems development."
    },
    {
      label: "Incubator",
      description: "Business incubators and accelerators supporting early-stage startups."
    },
    {
      label: "Gov. Agency",
      description: "Government organizations involved in USV procurement, regulation, or research initiatives."
    },
    {
      label: "Association",
      description: "Industry associations and professional organizations supporting the  sector."
    },
  ];

  const categoryDefinitions = [
    {
      label: "Startup",
      description: "Early-stage companies focused on innovative USV solutions, typically less than 5 years old with emerging technology."
    },
    {
      label: "Mid-Tier",
      description: "Established companies with proven USV products and growing market presence, often with multiple contracts."
    },
    {
      label: "New Prime",
      description: "New entrants to the government contracting space who have received massive amounts of funding (>$1B) and completing and competing for many different D.o.D. contracts."
    },
    {
      label: "Legacy Prime",
      description: "Major defense contractors and established firms with long histories of prime contracts in maritime systems."
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white text-white border-2 border-black rounded-none" showCloseButton={false}>
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
            Explanations of entity types and categories used in the USV market database
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Entity Types Section */}
          <div>
            <h3 className="font-mono font-bold text-sm text-gray-600 mb-3 uppercase tracking-wider">
              Entity Types
            </h3>
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

          {/* Categories Section */}
          <div>
            <h3 className="font-mono font-bold text-sm text-gray-600 mb-3 uppercase tracking-wider">
              Categories
            </h3>
            <p className="text-xs text-gray-600 mb-3 font-mono">
              Categories apply to USV Platform and Boatbuilder entities
            </p>
            <div className="space-y-3">
              {categoryDefinitions.map((category) => (
                <div key={category.label} className="border-l-4 border-green-600 pl-3 py-1">
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
      </DialogContent>
    </Dialog>
  );
}
