"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ContentFeedbackWidget } from "@/components/content-feedback-widget";

interface Company {
  name: string;
  website: string;
  description: string;
  image: string;
}

const legacy: Company[] = [
  {
    name: "Lockheed Martin",
    website: "https://www.lockheedmartin.com",
    description: "Defense contractor developing advanced autonomous surface vessels for naval operations. Leading integration of AI systems for maritime domain awareness.",
    image: "/placeholder-company.jpg"
  },
  {
    name: "General Dynamics",
    website: "https://www.gd.com",
    description: "Major defense systems integrator producing large-scale unmanned surface vehicles with advanced sensor suites and communication systems.",
    image: "/placeholder-company.jpg"
  },
  {
    name: "Northrop Grumman",
    website: "https://www.northropgrumman.com",
    description: "Aerospace and defense technology company developing autonomous maritime systems with focus on ISR and fleet protection capabilities.",
    image: "/placeholder-company.jpg"
  },
  {
    name: "Textron Systems",
    website: "https://www.textronsystems.com",
    description: "Defense and aerospace manufacturer producing Common Unmanned Surface Vehicle (CUSV) for mine countermeasures.",
    image: "/placeholder-company.jpg"
  },
  {
    name: "L3Harris Technologies",
    website: "https://www.l3harris.com",
    description: "Defense technology company developing autonomous maritime systems with advanced communications and electronic warfare capabilities.",
    image: "/placeholder-company.jpg"
  },
  {
    name: "Raytheon",
    website: "https://www.rtx.com",
    description: "Aerospace and defense company integrating sensor systems and weapons platforms onto unmanned surface vessels.",
    image: "/placeholder-company.jpg"
  }
];


const smallShipbuilders: Company[] = [
  {
    name: "Metal Shark",
    website: "https://www.metalsharkboats.com",
    description: "High-performance vessel manufacturer specializing in autonomous patrol boats and harbor security USVs.",
    image: "/placeholder-company.jpg"
  },
  {
    name: "Safe Boats International",
    website: "https://www.safeboats.com",
    description: "Custom patrol boat builder developing unmanned variants for coastal defense and surveillance missions.",
    image: "/placeholder-company.jpg"
  },
  {
    name: "Vigor Industrial",
    website: "https://www.vigor.net",
    description: "Shipbuilder and ship repair company entering the autonomous surface vehicle market with focus on multi-mission platforms.",
    image: "/placeholder-company.jpg"
  }
];

const startups: Company[] = [
  {
    name: "Saildrone",
    website: "https://www.saildrone.com",
    description: "Ocean data company operating fleet of wind and solar-powered autonomous surface vehicles for maritime intelligence.",
    image: "/placeholder-company.jpg"
  },
  {
    name: "Martac",
    website: "https://www.martacsystems.com",
    description: "Developer of MANTAS unmanned surface vessels for defense, security, and commercial applications with modular mission payloads.",
    image: "/placeholder-company.jpg"
  },
  {
    name: "Sea Machines",
    website: "https://www.sea-machines.com",
    description: "Autonomous technology provider delivering remote command and autonomous control systems for commercial and government vessels.",
    image: "/placeholder-company.jpg"
  }
];

interface Collaboration {
  partners: [string, string];
  description: string;
  pressReleaseUrl: string;
}

const collaborations: Collaboration[] = [
  {
    partners: ["Lockheed Martin", "Saildrone"],
    description: "Joint development of autonomous ocean surveillance systems combining defense-grade sensors with long-endurance platforms",
    pressReleaseUrl: "#"
  },
  {
    partners: ["General Dynamics", "Metal Shark"],
    description: "Partnership to integrate advanced autonomous control systems into high-performance patrol vessels",
    pressReleaseUrl: "#"
  },
  {
    partners: ["Huntington Ingalls", "Sea Machines"],
    description: "Collaboration on autonomous navigation and control systems for large-scale unmanned surface vehicles",
    pressReleaseUrl: "#"
  },
  {
    partners: ["Textron Systems", "Safe Boats"],
    description: "Development of modular unmanned platforms for mine countermeasures and harbor security",
    pressReleaseUrl: "#"
  }
];

function CompanyCard({ company }: { company: Company }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex gap-4 items-start p-4 bg-white border-2 border-black hover:bg-gray-50 transition-colors">
          <div className="w-16 h-16 flex-shrink-0 bg-gray-200 border border-black flex items-center justify-center text-xs text-gray-600 font-mono">
            IMG
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-black tracking-tight">{company.name}</h3>
              <span className="text-black text-lg font-bold ml-2 font-mono">
                {isOpen ? "−" : "+"}
              </span>
            </div>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-gray-600 hover:text-black transition-colors inline-block border-b border-gray-400 hover:border-black"
              onClick={(e) => e.stopPropagation()}
            >
              {company.website}
            </a>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 py-4 bg-gray-50 border-x-2 border-b-2 border-black -mt-[2px]">
          <p className="text-sm text-gray-800 leading-relaxed">{company.description}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function CategorySection({
  title,
  companies
}: {
  title: string;
  companies: Company[];
}) {
  return (
    <div>
      <div className="mb-4 border-l-4 border-black pl-4">
        <h2 className="text-2xl font-bold text-black tracking-tight">{title}</h2>
        <span className="text-xs font-mono text-gray-600 tracking-wider">{companies.length} ENTITIES</span>
      </div>
      <div className="space-y-2">
        {companies.map((company) => (
          <CompanyCard key={company.name} company={company} />
        ))}
      </div>
    </div>
  );
}

function CollaborationCard({ collaboration }: { collaboration: Collaboration }) {
  return (
    <div className="p-6 bg-white border-2 border-black">
      <h3 className="text-black font-bold mb-3 tracking-tight">
        {collaboration.partners[0]} <span className="font-mono">×</span> {collaboration.partners[1]}
      </h3>
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{collaboration.description}</p>
      <a
        href={collaboration.pressReleaseUrl}
        className="text-xs font-mono text-gray-600 hover:text-black transition-colors border-b border-gray-400 hover:border-black pb-1 tracking-wider"
      >
        READ PRESS RELEASE →
      </a>
    </div>
  );
}

export default function USVMarket() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Grid background pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/collection" className="font-mono text-xs tracking-wider text-gray-600 hover:text-black transition-colors">
                ← MARKETS
              </Link>
              <span className="text-xs font-mono tracking-wider text-black">USV DOMAIN</span>
            </div>
            <div className="flex gap-4 items-center">
              <Link href="/market-scouting">
                <button className="px-4 py-2 bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none font-mono text-xs tracking-wider transition-all">
                  SUBMIT DEMAND SIGNAL
                </button>
              </Link>
              <div className="flex gap-4 text-xs font-mono tracking-wider">
                <Link href="/usv-market" className="text-black font-bold transition-colors">
                  MARKET LANDSCAPE
                </Link>
                <Link href="/usv-systems" className="text-gray-600 hover:text-black transition-colors">
                  SYSTEM ARCHITECTURE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12 border-2 border-black bg-white p-8">
          <div className="border-b-2 border-black pb-4 mb-4">
            <span className="text-xs font-mono tracking-wider text-gray-600">MARKET INTELLIGENCE</span>
            <h1 className="text-4xl font-bold tracking-tight mt-2">
              THE US USV MARKET LANDSCAPE
            </h1>
          </div>
          <p className="text-gray-700 leading-relaxed">
            An overview of unmanned surface vehicle manufacturers and innovators
            shaping America's maritime autonomy capabilities
          </p>
        </div>

        <div className="space-y-8">
          <div id="startups">
            <CategorySection title="Startups" companies={startups} />
          </div>

          <div id="legacy">
            <CategorySection title="Legacy" companies={legacy} />
          </div>

          <div id="small-shipbuilders">
            <CategorySection title="Small Shipbuilders" companies={smallShipbuilders} />
          </div>

        </div>

        <div id="collaborations" className="mt-12 pt-12 border-t-2 border-black">
          <div className="mb-6 border-l-4 border-black pl-4">
            <h2 className="text-3xl font-bold tracking-tight">Industry Collaborations</h2>
            <p className="text-xs font-mono text-gray-600 tracking-wider mt-1">
              STRATEGIC PARTNERSHIPS
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collaborations.map((collab, idx) => (
              <CollaborationCard key={idx} collaboration={collab} />
            ))}
          </div>
        </div>
      </div>

      {/* Content Feedback Widget */}
      <ContentFeedbackWidget contentType="usv-market-landscape" />
    </div>
  );
}
