"use client";

import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ContractData } from "../types";
import { ExternalLink, DollarSign, Calendar, MapPin, FileText } from "lucide-react";

interface ContractDrawerProps {
  contract: ContractData;
  isOpen: boolean;
  onClose: () => void;
}

export function ContractDrawer({ contract, isOpen, onClose }: ContractDrawerProps) {
  const [showFullProduct, setShowFullProduct] = useState(false);

  // Reset state when drawer opens with new contract
  useEffect(() => {
    if (isOpen) {
      setShowFullProduct(false);
    }
  }, [isOpen, contract.contract_id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const ensureProtocol = (url: string) => {
    if (!url) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  };

  const truncatedProduct = contract.product && contract.product.length > 200
    ? contract.product.substring(0, 200).trim() + "..."
    : contract.product;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] bg-white border-t-2 border-black rounded-none flex flex-col">
        <DrawerHeader className="border-b border-gray-300 pb-3 bg-white flex-shrink-0">
          <DrawerTitle className="text-lg sm:text-2xl font-bold text-black">
            {contract.company_name}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="space-y-4">
            {/* Source Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono tracking-wider px-3 py-1.5 border bg-gray-100 text-gray-700 border-gray-300">
                {contract.source}
              </span>
            </div>

            {/* Contract Amount */}
            <div className="bg-green-50 border-2 border-green-300 p-4">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-5 h-5 text-green-700" />
                <span className="text-xs font-mono text-green-700 font-bold">CONTRACT AMOUNT</span>
              </div>
              <p className="text-2xl font-bold text-green-700 font-mono">
                {formatCurrency(contract.contract_amount || 0)}
              </p>
            </div>

            {/* Location */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-mono text-gray-600 font-bold">LOCATION</span>
              </div>
              <p className="text-sm text-gray-700">{contract.city}, {contract.state}</p>
            </div>

            {/* Contract Date */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-mono text-gray-600 font-bold">START DATE</span>
              </div>
              <p className="text-sm text-gray-700 font-mono">{contract.start_date}</p>
            </div>

            {/* Product/Service Description */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-mono text-gray-600 font-bold">PRODUCT/SERVICE</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {showFullProduct ? contract.product : truncatedProduct}
              </p>
              {contract.product && contract.product.length > 200 && (
                <button
                  onClick={() => setShowFullProduct(!showFullProduct)}
                  className="text-xs font-mono text-blue-600 hover:text-blue-800 mt-2 underline cursor-pointer"
                >
                  {showFullProduct ? "SEE LESS" : "SEE MORE"}
                </button>
              )}
            </div>

            {/* Contract ID */}
            <div>
              <span className="text-xs font-mono text-gray-600 font-bold block mb-2">CONTRACT ID</span>
              <p className="text-xs font-mono text-gray-600 break-all bg-gray-50 p-2 border border-gray-200">
                {contract.contract_id}
              </p>
            </div>

            {/* Company Website */}
            {contract.company_url && (
              <div className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-mono text-gray-600 font-bold">COMPANY WEBSITE</span>
                </div>
                <a
                  href={ensureProtocol(contract.company_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-blue-600 hover:text-blue-800 transition-colors inline-block border-b border-blue-400 hover:border-blue-800 break-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  {contract.company_url.replace(/^https?:\/\//, '').replace(/^www\./, '')}
                </a>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
