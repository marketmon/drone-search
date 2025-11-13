import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "USV Tech Hub | Unmanned Surface Vehicle Technology & Market Intelligence",
  description: "Enabling Scale for American Onshore Initiatives. Comprehensive database of USV companies, market intelligence, and maritime robotics technology.",
  keywords: ["USV", "unmanned surface vehicles", "maritime robotics", "autonomous boats", "marine technology", "defense contractors"],
  authors: [{ name: "USV Tech Hub" }],
  openGraph: {
    title: "USV Tech Hub",
    description: "Enabling Scale for American Onshore Initiatives",
    type: "website",
    images: ["/usvhub_logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "USV Tech Hub",
    description: "Enabling Scale for American Onshore Initiatives",
    images: ["/usvhub_logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased font-inter bg-black text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
