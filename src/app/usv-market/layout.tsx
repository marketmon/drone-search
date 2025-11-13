import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "USV Market Database | Key Players in Unmanned Surface Vehicles",
  description: "Comprehensive database of USV manufacturers, defense contractors, and maritime robotics companies in the United States. Explore key players, vehicles, and government contracts.",
  keywords: [
    "USV companies",
    "unmanned surface vehicle manufacturers",
    "maritime robotics companies",
    "autonomous boat manufacturers",
    "USV contractors",
    "unmanned maritime systems",
    "defense contractors USV",
    "USV database",
    "marine technology companies"
  ],
  openGraph: {
    title: "USV Market Database | Key Players in Unmanned Surface Vehicles",
    description: "Comprehensive database of USV manufacturers and maritime robotics companies in the United States.",
    type: "website",
    images: ["/usvhub_logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "USV Market Database",
    description: "Comprehensive database of USV manufacturers and maritime robotics companies in the United States.",
    images: ["/usvhub_logo.jpg"],
  },
};

export default function USVMarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
