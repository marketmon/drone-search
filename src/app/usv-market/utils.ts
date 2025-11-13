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
export const categoryLabels = {
  startup: "STARTUP",
  legacy: "LEGACY",
  "mid-tier": "MID-TIER",
};

export const categoryColors = {
  startup: "bg-blue-100 text-blue-700 border-blue-500",
  legacy: "bg-purple-100 text-purple-700 border-purple-500",
  "mid-tier": "bg-green-100 text-green-700 border-green-500",
};
