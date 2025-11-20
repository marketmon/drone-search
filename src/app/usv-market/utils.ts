// State name to abbreviation mapping
export const stateMapping: Record<string, string> = {
  "alabama": "al", "alaska": "ak", "arizona": "az", "arkansas": "ar", "california": "ca",
  "colorado": "co", "connecticut": "ct", "delaware": "de", "florida": "fl", "georgia": "ga",
  "hawaii": "hi", "idaho": "id", "illinois": "il", "indiana": "in", "iowa": "ia",
  "kansas": "ks", "kentucky": "ky", "louisiana": "la", "maine": "me", "maryland": "md",
  "massachusetts": "ma", "michigan": "mi", "minnesota": "mn", "mississippi": "ms", "missouri": "mo",
  "montana": "mt", "nebraska": "ne", "nevada": "nv", "new hampshire": "nh", "new jersey": "nj",
  "new mexico": "nm", "new york": "ny", "north carolina": "nc", "north dakota": "nd", "ohio": "oh",
  "oklahoma": "ok", "oregon": "or", "pennsylvania": "pa", "rhode island": "ri", "south carolina": "sc",
  "south dakota": "sd", "tennessee": "tn", "texas": "tx", "utah": "ut", "vermont": "vt",
  "virginia": "va", "washington": "wa", "west virginia": "wv", "wisconsin": "wi", "wyoming": "wy",
  "district of columbia": "dc", "washington dc": "dc"
};

// Helper function to check if location matches search term (including state name/abbreviation matching)
export function locationMatchesSearch(location: string, searchTerm: string): boolean {
  const locationLower = location.toLowerCase();
  const searchLower = searchTerm.toLowerCase().trim();

  // Direct match
  if (locationLower.includes(searchLower)) {
    return true;
  }

  // Check if search term is a full state name - if so, also check for abbreviation
  if (stateMapping[searchLower]) {
    const abbreviation = stateMapping[searchLower];
    // Check for abbreviation with word boundaries (e.g., "RI" not in "MARINE")
    const abbrevRegex = new RegExp(`\\b${abbreviation}\\b`, 'i');
    if (abbrevRegex.test(location)) {
      return true;
    }
  }

  // Check if search term is a partial match for any state name
  // For example, "flo" should match "florida" → "fl"
  for (const [stateName, abbrev] of Object.entries(stateMapping)) {
    if (stateName.startsWith(searchLower) && searchLower.length >= 2) {
      // Found a state that starts with the search term
      const stateAbbrevRegex = new RegExp(`\\b${abbrev}\\b`, 'i');
      if (stateAbbrevRegex.test(location)) {
        return true;
      }
      // Also check if the full state name is in the location
      if (locationLower.includes(stateName)) {
        return true;
      }
    }
  }

  // Check if search term is a state abbreviation - if so, also check for full name
  const abbrevRegex = new RegExp(`\\b${searchLower}\\b`, 'i');
  if (abbrevRegex.test(location)) {
    // Found exact abbreviation match
    return true;
  }

  // Check if the location contains a state abbreviation that matches the search term's full name
  for (const [stateName, abbrev] of Object.entries(stateMapping)) {
    if (stateName === searchLower) {
      const stateAbbrevRegex = new RegExp(`\\b${abbrev}\\b`, 'i');
      if (stateAbbrevRegex.test(location)) {
        return true;
      }
    }
  }

  return false;
}

// Helper function to format spec value or show N/A
export function formatSpec(value: string, unit: string = ""): string {
  if (!value || value.trim() === "") return "N/A";
  return `${value}${unit ? " " + unit : ""}`;
}

// Category labels and colors
export const categoryLabels: Record<string, string> = {
  startup: "STARTUP",
  legacy: "LEGACY",
  "mid-tier": "MID-TIER",
  "new prime": "NEW PRIME",
  "": "",
};

export const categoryColors: Record<string, string> = {
  startup: "bg-blue-100 text-blue-700 border-blue-500",
  legacy: "bg-purple-100 text-purple-700 border-purple-500",
  "mid-tier": "bg-green-100 text-green-700 border-green-500",
  "new prime": "bg-orange-100 text-orange-700 border-orange-500",
  "": "",
};

// Entity type labels and colors
export const entityTypeLabels: Record<string, string> = {
  "usv platform": "USV PLATFORM",
  "boatbuilder": "BOATBUILDER",
  "investor": "INVESTOR",
  "university": "UNIVERSITY",
  "research institute": "RESEARCH",
  "incubator": "INCUBATOR",
  "gov. agency": "GOV. AGENCY",
  "association": "ASSOCIATION",
};

export const entityTypeColors: Record<string, string> = {
  "usv platform": "bg-blue-100 text-blue-700 border-blue-500",
  "boatbuilder": "bg-blue-100 text-blue-700 border-blue-500",
  "investor": "bg-amber-100 text-amber-700 border-amber-500",
  "university": "bg-indigo-100 text-indigo-700 border-indigo-500",
  "research institute": "bg-teal-100 text-teal-700 border-teal-500",
  "incubator": "bg-pink-100 text-pink-700 border-pink-500",
  "gov. agency": "bg-slate-100 text-slate-700 border-slate-500",
  "association": "bg-cyan-100 text-cyan-700 border-cyan-500",
};

// Helper function to format funding amount
export function formatFunding(funding?: number): string {
  if (!funding || funding === 0) return "";
  if (funding >= 1000000000) {
    return `$${(funding / 1000000000).toFixed(1)}B`;
  }
  if (funding >= 1000000) {
    return `$${(funding / 1000000).toFixed(0)}M`;
  }
  if (funding >= 1000) {
    return `$${(funding / 1000).toFixed(0)}K`;
  }
  return `$${funding}`;
}
