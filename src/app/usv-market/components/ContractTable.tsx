"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ContractData } from "../types";
import { ExternalLink } from "lucide-react";

interface ContractTableProps {
  contracts: ContractData[];
  onContractClick?: (contract: ContractData) => void;
}

export function ContractTable({ contracts, onContractClick }: ContractTableProps) {
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

  const truncateText = (text: string, maxLength: number = 80) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="border-2 border-black overflow-hidden text-black">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">COMPANY</TableHead>
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">PRODUCT/SERVICE</TableHead>
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">AMOUNT</TableHead>
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">LOCATION</TableHead>
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">DATE</TableHead>
              <TableHead className="font-mono text-xs text-black border-r border-gray-300 whitespace-nowrap">SOURCE</TableHead>
              <TableHead className="font-mono text-xs text-black whitespace-nowrap">LINK</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract, idx) => (
              <TableRow
                key={idx}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onContractClick?.(contract)}
              >
                <TableCell className="font-medium text-sm border-r border-gray-200 min-w-[150px] max-w-[200px]">
                  <div className="truncate">{contract.company_name}</div>
                </TableCell>
                <TableCell className="text-sm text-gray-700 border-r border-gray-200 min-w-[300px] max-w-[400px]">
                  <div className="line-clamp-2 break-words">{contract.product}</div>
                </TableCell>
                <TableCell className="font-mono text-sm text-green-700 font-bold border-r border-gray-200 whitespace-nowrap">
                  {formatCurrency(contract.contract_amount || 0)}
                </TableCell>
                <TableCell className="text-xs text-gray-600 border-r border-gray-200 whitespace-nowrap">
                  {contract.city}, {contract.state}
                </TableCell>
                <TableCell className="font-mono text-xs text-gray-600 border-r border-gray-200 whitespace-nowrap">
                  {contract.start_date}
                </TableCell>
                <TableCell className="font-mono text-xs text-gray-600 border-r border-gray-200">
                  {contract.source}
                </TableCell>
                <TableCell className="text-center">
                  {contract.company_url ? (
                    <a
                      href={ensureProtocol(contract.company_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
