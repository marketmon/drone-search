"use client";

import { useEffect, useState } from "react";
import { Company } from "../types";

interface StructuredDataProps {
  companies: Company[];
}

export function StructuredData({ companies }: StructuredDataProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || companies.length === 0) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "USV Market Database - Key Players in Unmanned Surface Vehicles",
    "description": "Comprehensive database of USV manufacturers, defense contractors, and maritime robotics companies in the United States",
    "numberOfItems": companies.length,
    "itemListElement": companies.slice(0, 50).map((company, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Organization",
        "name": company.name,
        "url": company.website,
        "description": company.description,
        "address": company.location ? {
          "@type": "PostalAddress",
          "addressLocality": company.location.split(",")[0]?.trim(),
          "addressRegion": company.location.split(",")[1]?.trim(),
          "addressCountry": "US"
        } : undefined,
        "geo": company.lat && company.lng ? {
          "@type": "GeoCoordinates",
          "latitude": company.lat,
          "longitude": company.lng
        } : undefined,
        "logo": company.imageUrl || undefined,
        "industry": "Maritime Technology",
        "knowsAbout": ["Unmanned Surface Vehicles", "Maritime Robotics", "Autonomous Maritime Systems"]
      }
    }))
  };

  // Organization schema for USV Tech Hub itself
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "USV Tech Hub",
    "description": "Enabling Scale for American Onshore Initiatives",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "logo": "/usvhub_logo.jpg",
    "sameAs": [],
    "knowsAbout": [
      "Unmanned Surface Vehicles",
      "Maritime Robotics",
      "Marine Technology",
      "Defense Contractors",
      "Autonomous Maritime Systems"
    ]
  };

  // WebSite schema for better search appearance
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "USV Tech Hub",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": typeof window !== 'undefined' ? `${window.location.origin}/usv-market?search={search_term_string}` : ''
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
