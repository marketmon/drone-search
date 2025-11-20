"use client";

import { ContractData } from "../types";
import { ContractGridCard } from "./ContractGridCard";

interface ContractGridProps {
  contracts: ContractData[];
  onContractClick?: (contract: ContractData) => void;
}

export function ContractGrid({ contracts, onContractClick }: ContractGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {contracts.map((contract, idx) => (
        <ContractGridCard
          key={`${contract.contract_id}-${idx}`}
          contract={contract}
          onClick={() => onContractClick?.(contract)}
        />
      ))}
    </div>
  );
}
