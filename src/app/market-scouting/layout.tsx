import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "USV Market Scouting | Connect with Maritime Tech Suppliers",
  description: "Connect with USV technology suppliers and maritime robotics experts. Tell us what you're building and get matched with the right components, systems, and partners.",
  keywords: [
    "USV components",
    "maritime technology suppliers",
    "USV procurement",
    "unmanned surface vehicle parts",
    "maritime tech partners",
    "USV system integration",
    "marine robotics suppliers",
    "USV consulting"
  ],
  openGraph: {
    title: "USV Market Scouting | Connect with Maritime Tech Suppliers",
    description: "Connect with USV technology suppliers and maritime robotics experts. Get matched with the right components and partners.",
    type: "website",
    images: ["/usvhub_logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "USV Market Scouting",
    description: "Connect with USV technology suppliers and maritime robotics experts.",
    images: ["/usvhub_logo.jpg"],
  },
};

export default function MarketScoutingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
