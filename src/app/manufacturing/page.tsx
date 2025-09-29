import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemoButton } from "@/components/ui/demo-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { companies } from "@/lib/data";
import { Factory, TrendingUp, DollarSign, Users, Calendar, MapPin, Clock, Target, ArrowRight, ChevronRight } from "lucide-react";

// Component manufacturing opportunities based on partner company needs
const componentOpportunities = [
  {
    id: "propulsion-systems",
    title: "Propulsion Components Manufacturing",
    category: "Motors & Electronic Speed Controllers",
    requestingCompany: "Apex Propulsion Dynamics",
    companyLocation: "Phoenix, Arizona, USA",
    manufacturingNeed: "US-based component suppliers for high-volume production to reduce supply chain risk and meet NDAA requirements",
    keyComponents: ["Brushless DC motor stators", "Rotor assemblies", "Motor windings", "ESC power boards", "Precision bearings"],
    volumeRequirements: "50,000 motors/month, 25,000 ESCs/month",
    qualityStandards: ["AS9100", "ISO 9001", "MIL-STD-810H"],
    opportunity: "Partner with established propulsion leader to become their primary domestic component supplier for critical motor and ESC subassemblies."
  },
  {
    id: "power-systems",
    title: "Battery & Power Management Manufacturing",
    category: "Energy Storage & Management Systems",
    requestingCompany: "Voltaic Marine Systems",
    companyLocation: "San Diego, California, USA",
    manufacturingNeed: "Specialized component suppliers for marine-grade battery systems and dual-environment power solutions",
    keyComponents: ["Waterproof battery housings", "Marine-grade BMS boards", "Corrosion-resistant connectors", "Charging port assemblies", "Environmental seals"],
    volumeRequirements: "15,000 battery cells/day, 2,500 BMS units/month",
    qualityStandards: ["UL 2089", "IEC 62133", "Marine Equipment Directive (MED)"],
    opportunity: "Supply specialized components for unique marine/aerial battery systems that require advanced manufacturing capabilities."
  },
  {
    id: "precision-manufacturing",
    title: "Precision Component Manufacturing",
    category: "Racing & High-Performance Components",
    requestingCompany: "Razor Dynamics FPV",
    companyLocation: "Austin, Texas, USA",
    manufacturingNeed: "Ultra-precision manufacturing partners for competitive racing components with sub-0.1g balance tolerances",
    keyComponents: ["Precision-balanced motor rotors", "Lightweight motor bells", "Racing propeller hubs", "Titanium motor shafts", "Performance magnets"],
    volumeRequirements: "8,000 motors/month, 20,000 precision parts/month",
    qualityStandards: ["Precision tolerances ±0.01mm", "Balance specifications <0.05g", "Racing certification standards"],
    opportunity: "Become the precision manufacturing partner for the competitive FPV racing market with extremely tight tolerances."
  },
  {
    id: "asian-transition",
    title: "Taiwan/South Korea Manufacturing Transition",
    category: "Supply Chain Localization",
    requestingCompany: "Multiple Asian Partners",
    companyLocation: "Taiwan, South Korea (seeking US presence)",
    manufacturingNeed: "US manufacturing partnerships to establish domestic production capabilities for NDAA compliance",
    keyComponents: ["Flight controller boards", "Sensor assemblies", "Communication modules", "Structural components", "Integration assemblies"],
    volumeRequirements: "Varies by partner - typically 10,000-100,000 units/month",
    qualityStandards: ["NDAA Section 848 compliance", "US final assembly", "Supply chain transparency"],
    opportunity: "Partner with established Asian companies transitioning to US manufacturing for government and defense market access."
  },
  {
    id: "integration-assembly",
    title: "System Integration & Final Assembly",
    category: "Complete System Manufacturing",
    requestingCompany: "Multiple Partners",
    companyLocation: "Various locations seeking US presence",
    manufacturingNeed: "US-based final assembly and integration services for complete unmanned systems",
    keyComponents: ["Final system assembly", "Quality testing", "System integration", "Packaging & logistics", "Technical documentation"],
    volumeRequirements: "500-5,000 complete systems/month depending on complexity",
    qualityStandards: ["FAA certification support", "ITAR compliance", "Complete system testing", "Technical documentation"],
    opportunity: "Establish complete system manufacturing capability serving multiple partner companies requiring US final assembly."
  }
];

// Component manufacturing transition pathways for traditional manufacturers
const manufacturingPathways = [
  {
    title: "Automotive Electronics → Unmanned System Components",
    description: "Apply automotive precision manufacturing to high-performance unmanned system electronics",
    currentCapabilities: ["Electronic control units", "Sensor manufacturing", "Automotive standards"],
    componentOpportunities: ["Flight controllers", "Motor controllers", "Power management units"],
    investmentRequired: "$2-5M",
    timeToMarket: "12-18 months",
    marketPotential: "$850M component market",
    supplyChainPosition: "Tier 1 component supplier to unmanned system integrators"
  },
  {
    title: "Precision Machining → Structural Components",
    description: "Leverage CNC and precision manufacturing for advanced unmanned system structures",
    currentCapabilities: ["CNC machining", "Metal fabrication", "Quality control"],
    componentOpportunities: ["Motor mounts", "Gimbal assemblies", "Landing gear", "Structural frames"],
    investmentRequired: "$1-3M",
    timeToMarket: "8-12 months",
    marketPotential: "$650M component market",
    supplyChainPosition: "Critical structural component manufacturer"
  },
  {
    title: "Industrial Electronics → Communication Systems",
    description: "Transform industrial communication expertise into unmanned system data links",
    currentCapabilities: ["RF systems", "Industrial networking", "Protocol development"],
    componentOpportunities: ["Radio transceivers", "Antenna assemblies", "Data link modules"],
    investmentRequired: "$3-6M",
    timeToMarket: "15-24 months",
    marketPotential: "$1.1B component market",
    supplyChainPosition: "Strategic communication component supplier"
  }
];

export default function ManufacturingPage() {
  const compliantCompanies = companies.filter(company => company.ndaaCompliant);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Factory className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Component Manufacturing RFI
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Manufacturing opportunities from partner companies seeking US-based component suppliers and manufacturing presence
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="border-gray-600 px-4 py-2">
              Partner-Driven Opportunities
            </Badge>
            <Badge variant="outline" className="border-gray-600 px-4 py-2">
              NDAA Compliance Focus
            </Badge>
            <Badge variant="outline" className="border-gray-600 px-4 py-2">
              Established Companies
            </Badge>
          </div>
        </div>
      </section>

      {/* Market Vision */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Partner Company Manufacturing Needs
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our established partner companies are actively seeking US-based manufacturing relationships for component supply and domestic production capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-white" />
                  <CardTitle className="text-white">Established Demand</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Partner companies have immediate component needs with guaranteed volume requirements
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">US Partners:</span>
                    <span className="text-white font-semibold">Voltaic, Razor Dynamics, Apex</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Asian Partners:</span>
                    <span className="text-white font-semibold">Seeking US Manufacturing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Target className="h-8 w-8 text-white" />
                  <CardTitle className="text-white">Direct Partnerships</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Work directly with established companies rather than speculative market opportunities
                </p>
                <div className="mt-4 space-y-2">
                  <Badge variant="outline" className="text-xs border-gray-600">Verified Partners</Badge>
                  <Badge variant="outline" className="text-xs border-gray-600">Existing Product Lines</Badge>
                  <Badge variant="outline" className="text-xs border-gray-600">Volume Commitments</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Factory className="h-8 w-8 text-white" />
                  <CardTitle className="text-white">NDAA Compliance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Many partners need US manufacturing presence to meet government compliance requirements
                </p>
                <div className="mt-4 space-y-2">
                  <Badge variant="outline" className="text-xs border-gray-600">Government Requirements</Badge>
                  <Badge variant="outline" className="text-xs border-gray-600">Supply Chain Security</Badge>
                  <Badge variant="outline" className="text-xs border-gray-600">Domestic Production</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Opportunities */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Active Manufacturing Requests from Partners
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specific component manufacturing opportunities from established partner companies
            </p>
          </div>

          <div className="space-y-8">
            {componentOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">{opportunity.title}</h3>
                          <p className="text-lg text-gray-300 mb-3">{opportunity.category}</p>
                          <div className="flex items-center space-x-2 mb-4">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-400">{opportunity.companyLocation}</span>
                          </div>
                          <p className="text-gray-300 mb-4">{opportunity.manufacturingNeed}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white mb-3">COMPONENTS NEEDED</h4>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.keyComponents.map((component, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-600">
                              {component}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white mb-3">VOLUME REQUIREMENTS</h4>
                        <p className="text-gray-300">{opportunity.volumeRequirements}</p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white mb-3">QUALITY STANDARDS</h4>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.qualityStandards.map((standard, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-600">
                              {standard}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Alert className="border-gray-700 bg-gray-900">
                        <Factory className="h-4 w-4 text-white" />
                        <AlertDescription className="text-gray-300">
                          <strong>Partnership Opportunity:</strong> {opportunity.opportunity}
                        </AlertDescription>
                      </Alert>
                    </div>

                    <div className="space-y-4">
                      <Card className="bg-gray-900 border-gray-600">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <p className="text-sm font-semibold text-white mb-2">REQUESTING COMPANY</p>
                            <p className="text-lg font-bold text-white">{opportunity.requestingCompany}</p>
                            <p className="text-sm text-gray-400 mt-1">{opportunity.companyLocation}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <DemoButton className="w-full">
                        Contact Partner Company
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </DemoButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Upgrade Pathways */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Manufacturing Transition Pathways
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leverage your existing manufacturing capabilities to produce unmanned system components
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {manufacturingPathways.map((pathway, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white text-xl">{pathway.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {pathway.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">CURRENT CAPABILITIES</h4>
                    <div className="space-y-2">
                      {pathway.currentCapabilities.map((capability, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">COMPONENT OPPORTUNITIES</h4>
                    <div className="space-y-2">
                      {pathway.componentOpportunities.map((component, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-sm text-blue-300">{component}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-900 p-4 rounded border border-gray-600">
                    <h5 className="text-sm font-semibold text-white mb-2">SUPPLY CHAIN POSITION</h5>
                    <p className="text-xs text-green-400">{pathway.supplyChainPosition}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Investment:</span>
                      <span className="text-sm font-semibold text-white">{pathway.investmentRequired}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Time to Market:</span>
                      <span className="text-sm font-semibold text-white">{pathway.timeToMarket}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Market Potential:</span>
                      <span className="text-sm font-bold text-white">{pathway.marketPotential}</span>
                    </div>
                  </div>

                  <DemoButton className="w-full">
                    Get Transition Plan
                  </DemoButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Partner Companies
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Established companies in our network seeking manufacturing partnerships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compliantCompanies.slice(0, 3).map((company) => (
              <Card key={company.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg mb-2">{company.name}</h4>
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-400">{company.location}</p>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">{company.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-gray-600 text-xs">
                      NDAA Compliant
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-xs">
                      Established Partner
                    </Badge>
                  </div>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    <a href={`/companies/${company.id}`} className="w-full">
                      View Company Profile
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Enter the Component Supply Chain
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Become a critical component supplier within the high-growth unmanned systems industry
          </p>
          <div className="flex justify-center space-x-4">
            <DemoButton size="lg">
              Request Partner Introductions
              <ArrowRight className="h-5 w-5 ml-2" />
            </DemoButton>
            <DemoButton size="lg" variant="outline">
              Schedule Manufacturing Assessment
            </DemoButton>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">12</div>
              <p className="text-gray-300">Established Partner Companies</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5</div>
              <p className="text-gray-300">Active Manufacturing Requests</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <p className="text-gray-300">Asian Partners Seeking US Presence</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}