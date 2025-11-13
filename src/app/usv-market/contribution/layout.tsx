import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute to USV Database | Add Your Company or Technology",
  description: "Help expand the most comprehensive USV market database. Add your company, products, or unmanned surface vehicle technology to connect with the maritime robotics community.",
  keywords: [
    "add USV company",
    "submit maritime technology",
    "USV database contribution",
    "list USV product",
    "unmanned surface vehicle directory",
    "maritime robotics listing",
    "USV company registration"
  ],
  openGraph: {
    title: "Contribute to USV Database | Add Your Company",
    description: "Help expand the most comprehensive USV market database. Add your company or technology.",
    type: "website",
    images: ["/usvhub_logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contribute to USV Database",
    description: "Help expand the most comprehensive USV market database.",
    images: ["/usvhub_logo.jpg"],
  },
  robots: {
    index: false, // Don't index the form page
    follow: true,
  },
};

export default function ContributionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
