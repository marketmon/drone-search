"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractData } from "../types";
import { ExternalLink } from "lucide-react";

interface ContractGridCardProps {
  contract: ContractData;
  onClick?: () => void;
}

export function ContractGridCard({ contract, onClick }: ContractGridCardProps) {
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

  const truncateProduct = (text: string, maxLength: number = 120) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <Card
      className="border border-gray-300 rounded-none shadow-none hover:shadow-md hover:border-gray-400 transition-all flex flex-col bg-white cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Source Badge */}
            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider px-2 py-1 border bg-gray-100 text-gray-700 border-gray-300">
              {contract.source}
            </span>

            {/* Amount Badge */}
            <span className="text-[10px] sm:text-xs font-mono text-green-700 bg-green-50 px-2 py-1 border border-green-300 font-bold">
              {formatCurrency(contract.contract_amount || 0)}
            </span>
          </div>
        </div>

        <CardTitle className="text-lg sm:text-xl font-bold tracking-tight text-left text-black leading-tight mb-2">
          {contract.company_name}
        </CardTitle>

        {/* Location */}
        <p className="text-xs text-gray-500 font-mono mb-3">
          {contract.city}, {contract.state}
        </p>

        {/* Product Description */}
        <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3">
          {truncateProduct(contract.product)}
        </p>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
          <span className="font-mono">{contract.start_date}</span>
          {contract.company_url && (
            <a
              href={ensureProtocol(contract.company_url)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-mono inline-flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3 h-3" />
              <span>Website</span>
            </a>
          )}
        </div>

        {/* Contract ID */}
        <p className="text-[10px] text-gray-400 font-mono mt-2 truncate">
          ID: {contract.contract_id}
        </p>
      </CardHeader>
    </Card>
  );
}
