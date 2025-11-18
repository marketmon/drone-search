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
  title: "USV Hub | Unmanned Surface Vehicle Market Database",
  description: "Explore the comprehensive USV market database featuring key players in unmanned surface vehicles. Browse companies, vehicles, government contracts, and maritime robotics capabilities in the United States.",
  keywords: [
    "USV companies",
    "unmanned surface vehicle manufacturers",
    "maritime robotics companies",
    "autonomous boat manufacturers",
    "USV contractors",
    "unmanned maritime systems",
    "defense contractors USV",
    "USV database",
    "marine technology companies",
    "USV Tech Hub",
    "naval robotics"
  ],
  openGraph: {
    title: "USV Hub | Unmanned Surface Vehicle Market Database",
    description: "Explore the comprehensive USV market database featuring key players, vehicles, and government contracts in unmanned maritime systems.",
    type: "website",
    url: "https://usvhub.com",
    images: ["/usvhub_logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "USV Hub | USV Market Database",
    description: "Explore the comprehensive USV market database featuring key players, vehicles, and government contracts in unmanned maritime systems.",
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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5N3Q8BKLBT"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5N3Q8BKLBT');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased font-inter bg-black text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
