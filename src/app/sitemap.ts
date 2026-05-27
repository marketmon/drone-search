import { MetadataRoute } from 'next';
import Papa from 'papaparse';
import { createSlug } from './usv-market/utils';

const ENTITIES_SHEET_URL = process.env.USV_ENTITIES_SHEET_URL!;

// Function to load company data for sitemap
async function loadCompanies() {
  try {
    const response = await fetch(ENTITIES_SHEET_URL, { cache: 'no-store' });
    const csvText = await response.text();

    return new Promise<string[]>((resolve) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const data = results.data as any[];
          const companyNames = data
            .filter((row) => row['Entity Name'])
            .map((row) => row['Entity Name']);
          resolve(companyNames);
        },
      });
    });
  } catch (error) {
    console.error('Error loading companies for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://usvhub.com';
  const companies = await loadCompanies();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/usv-market`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/usv-market/contribution`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic company pages
  const companyPages: MetadataRoute.Sitemap = companies.map((companyName) => ({
    url: `${baseUrl}/usv-market/company/${createSlug(companyName)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...companyPages];
}
