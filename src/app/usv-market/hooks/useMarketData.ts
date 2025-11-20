import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Company, ContractData, Vehicle } from "../types";

export function useMarketData() {
  const [marketCompanies, setMarketCompanies] = useState<Company[]>([]);
  const [contractData, setContractData] = useState<ContractData[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehiclesByCompany, setVehiclesByCompany] = useState<Map<string, Vehicle[]>>(new Map());
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [isLoadingContracts, setIsLoadingContracts] = useState(false);

  const loadCompanyData = async () => {
    setIsLoadingCompanies(true);
    try {
      const response = await fetch("/usv_key_entities.csv");
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const data = results.data as any[];
          const companies: Company[] = data
            .filter(row => row["Entity Name"] && row.Website)
            .map(row => ({
              name: row["Entity Name"],
              website: row.Website,
              location: row.Location || "",
              category: row["Category (for usv platform & boatbuilder)"]?.toLowerCase() || "",
              description: row.Description || "",
              lat: row.Lat || 0,
              lng: row.Lng || 0,
              imageUrl: row["Image URL"] || "",
              funding: row.Funding || 0,
              entityType: row["Entity Type"]?.toLowerCase() || "usv platform",
              country: row.Country || "",
              portfolioCompanies: row["USVs in Portfolio (For investor)"] || "",
            }));
          setMarketCompanies(companies);
          setIsLoadingCompanies(false);
        },
      });
    } catch (error) {
      console.error("Error loading company data:", error);
      setIsLoadingCompanies(false);
    }
  };

  const loadVehicleData = async () => {
    try {
      const response = await fetch("/usv_vehicles_matched_to_company.csv");
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const data = results.data as any[];
          const vehicleData: Vehicle[] = data
            .filter(row => row.Name && row.Company)
            .map(row => ({
              name: row.Name,
              company: row.Company,
              length: row["Length (ft)"] || "",
              range: row["Range (nm)"] || "",
              endurance: row["Endurance (days)"] || "",
              topSpeed: row["Top Speed (kts)"] || "",
              payload: row["Payload (lbs)"] || "",
              propulsion: row.Propulsion || "",
              auxPropulsion: row["Aux Propulsion"] || "",
              seastate: row.Seastate || "",
              source: row.Source || "",
              googleLink: row["Google Link"] || "",
            }));

          setVehicles(vehicleData);

          // Group vehicles by company
          const grouped = new Map<string, Vehicle[]>();
          vehicleData.forEach(vehicle => {
            const existing = grouped.get(vehicle.company) || [];
            existing.push(vehicle);
            grouped.set(vehicle.company, existing);
          });
          setVehiclesByCompany(grouped);
        },
      });
    } catch (error) {
      console.error("Error loading vehicle data:", error);
    }
  };

  const loadContractData = async () => {
    setIsLoadingContracts(true);
    try {
      const response = await fetch("/usv_contracts.csv");
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const data = results.data as any[];
          const contracts: ContractData[] = data
            .filter(row => row.company_name && row.lat && row.lng)
            .map(row => ({
              company_name: row.company_name,
              product: row.product || "Unknown Product",
              contract_amount: row.contract_amount || 0,
              start_date: row.start_date || "",
              lat: row.lat,
              lng: row.lng,
              city: row.city || "",
              state: row.state || "",
              contract_id: row.contract_id || "",
              company_url: row.company_url || "",
              source: row.source || "",
            }));
          setContractData(contracts);
          setIsLoadingContracts(false);
        },
      });
    } catch (error) {
      console.error("Error loading contract data:", error);
      setIsLoadingContracts(false);
    }
  };

  useEffect(() => {
    loadCompanyData();
    loadVehicleData();
    loadContractData();
  }, []);

  return {
    marketCompanies,
    contractData,
    vehicles,
    vehiclesByCompany,
    isLoadingCompanies,
    isLoadingContracts,
    loadContractData,
  };
}
