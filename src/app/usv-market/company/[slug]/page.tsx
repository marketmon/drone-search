import { Metadata } from "next";
import { notFound } from "next/navigation";
import Papa from "papaparse";
import fs from "fs";
import path from "path";
import { Company, Vehicle } from "../../types";
import { createSlug } from "../../utils";
import CompanyPageClient from "./CompanyPageClient";

// Function to load company data server-side
async function loadCompanyData(): Promise<Company[]> {
  try {
    let csvText: string;

    // During build time, read from file system
    if (process.env.NODE_ENV === "production" || !process.env.NEXT_PUBLIC_BASE_URL) {
      const filePath = path.join(process.cwd(), "public", "usv_key_entities.csv");
      csvText = fs.readFileSync(filePath, "utf-8");
    } else {
      // During runtime, fetch from URL
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/usv_key_entities.csv`,
        { cache: "no-store" }
      );
      csvText = await response.text();
    }

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const data = results.data as any[];
          const companies: Company[] = data
            .filter((row) => row["Entity Name"])
            .map((row) => ({
              name: row["Entity Name"],
              website: row.Website,
              location: row.Location || "",
              companyType: row["Company Type"]?.toLowerCase() || "",
              description: row.Description || "",
              lat: row.Lat || 0,
              lng: row.Lng || 0,
              imageUrl: row["Image URL"] || "",
              funding: row.Funding || 0,
              entityType: row["Entity Type"]?.toLowerCase() || "company",
              entityCategory: row["Entity Category"]?.toLowerCase() || "",
              country: row.Country || "",
              portfolioCompanies: row["USVs in Portfolio (For investor)"] || "",
              dateAdded: row["Date Added"] || "",
            }));
          resolve(companies);
        },
      });
    });
  } catch (error) {
    console.error("Error loading company data:", error);
    return [];
  }
}

// Function to load vehicle data server-side
async function loadVehicleData(): Promise<Vehicle[]> {
  try {
    let csvText: string;

    // During build time, read from file system
    if (process.env.NODE_ENV === "production" || !process.env.NEXT_PUBLIC_BASE_URL) {
      const filePath = path.join(process.cwd(), "public", "usv_vehicles_matched_to_company.csv");
      csvText = fs.readFileSync(filePath, "utf-8");
    } else {
      // During runtime, fetch from URL
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/usv_vehicles_matched_to_company.csv`,
        { cache: "no-store" }
      );
      csvText = await response.text();
    }

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const data = results.data as any[];
          const vehicleData: Vehicle[] = data
            .filter((row) => row.Name && row.Company)
            .map((row) => ({
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
          resolve(vehicleData);
        },
      });
    });
  } catch (error) {
    console.error("Error loading vehicle data:", error);
    return [];
  }
}

// Generate static params for all companies at build time
export async function generateStaticParams() {
  const companies = await loadCompanyData();

  return companies.map((company) => ({
    slug: createSlug(company.name),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const companies = await loadCompanyData();
  const company = companies.find((c) => createSlug(c.name) === slug);

  if (!company) {
    return {
      title: "Company Not Found",
    };
  }

  const description =
    company.description.length > 160
      ? company.description.substring(0, 157) + "..."
      : company.description;

  return {
    title: `${company.name} | USV Hub`,
    description: description || `Learn about ${company.name} in the USV industry`,
    openGraph: {
      title: company.name,
      description: description,
      type: "website",
      images: company.imageUrl ? [company.imageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: company.name,
      description: description,
      images: company.imageUrl ? [company.imageUrl] : [],
    },
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const companies = await loadCompanyData();
  const vehicles = await loadVehicleData();

  const company = companies.find((c) => createSlug(c.name) === slug);

  if (!company) {
    notFound();
  }

  // Filter vehicles for this company
  const companyVehicles = vehicles.filter(
    (v) => v.company.toLowerCase() === company.name.toLowerCase()
  );

  return <CompanyPageClient company={company} vehicles={companyVehicles} />;
}
