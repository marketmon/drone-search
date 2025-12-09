// Simple country to region mapping from countries_to_regions.csv
export const COUNTRY_TO_REGION: Record<string, string> = {
  "USA": "North America",
  "Netherlands": "Europe",
  "UK": "Europe",
  "Brazil": "South America",
  "Czechia": "Europe",
  "Singapore": "Asia",
  "Australia": "Oceania",
  "Portugal": "Europe",
  "Canada": "North America",
  "Norway": "Europe",
  "Ukraine": "Europe",
  "New Zealand": "Oceania",
  "India": "Asia",
  "China": "Asia",
  "Taiwan": "Asia",
  "Italy": "Europe",
  "Germany": "Europe",
  "Austria": "Europe",
  "Sweden": "Europe",
  "Finland": "Europe",
  "South Africa": "Africa",
  "Uruguay": "South America",
  "Israel": "Middle East",
  "Belgium": "Europe",
  "UAE": "Middle East",
  "South Korea": "Asia",
  "Japan": "Asia"
};

// Get region from country
export function getRegionFromCountry(country: string): string | null {
  if (!country) return null;
  const trimmedCountry = country.trim();
  return COUNTRY_TO_REGION[trimmedCountry] || null;
}

// Get unique countries from entities
export function getUniqueCountries(entities: { country: string }[]): string[] {
  const countries = new Set<string>();
  entities.forEach(entity => {
    if (entity.country && entity.country.trim()) {
      countries.add(entity.country.trim());
    }
  });
  return Array.from(countries).sort();
}

// Get all unique regions from entities
export function getUniqueRegions(entities: { country: string }[]): string[] {
  const regions = new Set<string>();
  entities.forEach(entity => {
    const region = getRegionFromCountry(entity.country);
    if (region) {
      regions.add(region);
    }
  });
  return Array.from(regions).sort();
}

// Get countries for a specific region from entities
export function getCountriesForRegion(entities: { country: string }[], region: string): string[] {
  const countries = new Set<string>();
  entities.forEach(entity => {
    if (getRegionFromCountry(entity.country) === region) {
      countries.add(entity.country.trim());
    }
  });
  return Array.from(countries).sort();
}
