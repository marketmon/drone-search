"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function MarketScouting() {
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    contactName: "",
    contactEmail: "",
    phoneNumber: "",
    usvRequirement: "",
    intendedApplication: "",
    technicalRequirements: "",
    quantityNeeded: "",
    timeline: "",
    budgetRange: "",
    specificComponents: [] as string[],
    additionalInfo: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const componentOptions = [
    "Autonomous Navigation System",
    "Electric Propulsion",
    "Power Management System",
    "Communication Systems",
    "Sensor Suite (Radar, Lidar, Cameras)",
    "Mission Payload Integration",
    "Hull/Platform",
    "Control Software",
    "Cybersecurity Systems",
    "Energy Storage (Batteries)"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log for demo purposes
    console.log('Market scouting submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleComponentToggle = (component: string) => {
    setFormData({
      ...formData,
      specificComponents: formData.specificComponents.includes(component)
        ? formData.specificComponents.filter(c => c !== component)
        : [...formData.specificComponents, component]
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center px-6 relative">
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="relative max-w-2xl w-full border-2 border-black bg-white p-8">
          <div className="border-b-2 border-black pb-4 mb-4">
            <span className="text-xs font-mono tracking-wider text-gray-600">SUBMISSION CONFIRMED</span>
            <h1 className="text-3xl font-bold tracking-tight mt-2">THANK YOU FOR YOUR INTEREST</h1>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            We've received your demand signal and will analyze it as part of our market intelligence efforts.
            Our team may reach out to discuss potential solutions or partnerships.
          </p>
          <div className="flex gap-4">
            <Link href="/usv-market">
              <Button className="bg-black text-white hover:bg-gray-800 rounded-none border-2 border-black font-mono text-xs tracking-wider transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]">
                ← BACK TO USV MARKET
              </Button>
            </Link>
            <Link href="/collection">
              <Button className="bg-white text-black hover:bg-gray-50 rounded-none border-2 border-black font-mono text-xs tracking-wider transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]">
                ← BACK TO MARKETS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black relative">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/collection" className="font-mono text-xs tracking-wider text-gray-600 hover:text-black transition-colors">
              ← MARKETS
            </Link>
            <div className="flex gap-4 text-xs font-mono tracking-wider">
              <Link href="/portfolio" className="text-gray-600 hover:text-black transition-colors">
                PORTFOLIO
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
                ABOUT
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative max-w-3xl mx-auto px-6 pt-12">{/* Removed the previous back link section */}

        <div className="border-2 border-black bg-white p-8 mb-8">
          <div className="border-b-2 border-black pb-4 mb-6">
            <span className="text-xs font-mono tracking-wider text-gray-600">DEMAND SIGNAL COLLECTION</span>
            <h1 className="text-4xl font-bold tracking-tight mt-2">SUBMIT USV DEMAND SIGNAL</h1>
          </div>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              Syndicate 708 aggregates demand signals across the USV market to help manufacturers,
              systems integrators, and component suppliers understand real customer needs.
            </p>
            <p className="leading-relaxed">
              If your organization is seeking USV capabilities, components, or complete systems,
              please share your requirements below. This information helps us:
            </p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex gap-2">
                <span className="font-mono text-black">•</span>
                <span>Connect you with appropriate suppliers and manufacturers</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-black">•</span>
                <span>Aggregate market demand to justify domestic manufacturing investments</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-black">•</span>
                <span>Identify gaps in the American defense supply chain</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-black">•</span>
                <span>Enable portfolio companies to respond to real market needs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-2 border-black bg-white p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Organization Information */}
            <div className="border-l-4 border-black pl-4">
              <h2 className="text-2xl font-bold tracking-tight mb-4">ORGANIZATION INFORMATION</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="organizationName" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                    ORGANIZATION NAME *
                  </label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    type="text"
                    required
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="bg-white border-2 border-black text-black rounded-none focus:ring-0 focus:border-black"
                    placeholder="Your organization name"
                  />
                </div>

                <div>
                  <label htmlFor="organizationType" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                    ORGANIZATION TYPE *
                  </label>
                  <select
                    id="organizationType"
                    name="organizationType"
                    required
                    value={formData.organizationType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border-2 border-black text-black focus:outline-none focus:border-black rounded-none"
                  >
                    <option value="">Select organization type</option>
                    <option value="defense-contractor">Defense Contractor (Prime)</option>
                    <option value="systems-integrator">Systems Integrator</option>
                    <option value="dod-agency">DoD Agency</option>
                    <option value="military-branch">Military Branch</option>
                    <option value="shipyard">Shipyard</option>
                    <option value="research-institution">Research Institution</option>
                    <option value="commercial-operator">Commercial Operator</option>
                    <option value="startup">Startup</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                      CONTACT NAME *
                    </label>
                    <Input
                      id="contactName"
                      name="contactName"
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      className="bg-white border-2 border-black text-black rounded-none focus:ring-0 focus:border-black"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                      EMAIL *
                    </label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="bg-white border-2 border-black text-black rounded-none focus:ring-0 focus:border-black"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                    PHONE NUMBER (OPTIONAL)
                  </label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="bg-white border-2 border-black text-black rounded-none focus:ring-0 focus:border-black"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* USV Requirements */}
            <div className="border-l-4 border-black pl-4">
              <h2 className="text-2xl font-bold tracking-tight mb-4">USV REQUIREMENTS</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="usvRequirement" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                    WHAT ARE YOU LOOKING FOR? *
                  </label>
                  <select
                    id="usvRequirement"
                    name="usvRequirement"
                    required
                    value={formData.usvRequirement}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border-2 border-black text-black focus:outline-none focus:border-black rounded-none"
                  >
                    <option value="">Select requirement type</option>
                    <option value="complete-usv">Complete USV System</option>
                    <option value="usv-platform">USV Platform (Hull)</option>
                    <option value="specific-components">Specific Components</option>
                    <option value="integration-services">Integration Services</option>
                    <option value="technology-partner">Technology Partnership</option>
                    <option value="manufacturing-partner">Manufacturing Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="intendedApplication" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                    INTENDED APPLICATION *
                  </label>
                  <textarea
                    id="intendedApplication"
                    name="intendedApplication"
                    required
                    value={formData.intendedApplication}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 bg-white border-2 border-black text-black focus:outline-none focus:border-black rounded-none"
                    placeholder="e.g., Mine countermeasures, ISR operations, harbor patrol, etc."
                  />
                </div>

                <div>
                  <label htmlFor="technicalRequirements" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                    TECHNICAL REQUIREMENTS
                  </label>
                  <textarea
                    id="technicalRequirements"
                    name="technicalRequirements"
                    value={formData.technicalRequirements}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-white border-2 border-black text-black focus:outline-none focus:border-black rounded-none"
                    placeholder="Size, speed, endurance, payload capacity, operating environment, etc."
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wider text-gray-600 mb-3">
                    SPECIFIC COMPONENTS OF INTEREST
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {componentOptions.map((component) => (
                      <div
                        key={component}
                        onClick={() => handleComponentToggle(component)}
                        className={`p-3 border-2 cursor-pointer transition-colors ${
                          formData.specificComponents.includes(component)
                            ? "border-black bg-black text-white"
                            : "border-gray-300 bg-white text-black hover:border-black"
                        }`}
                      >
                        <span className="text-sm">{component}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Procurement Details */}
            <div className="border-l-4 border-black pl-4">
              <h2 className="text-2xl font-bold tracking-tight mb-4">PROCUREMENT DETAILS</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quantityNeeded" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                      QUANTITY NEEDED
                    </label>
                    <Input
                      id="quantityNeeded"
                      name="quantityNeeded"
                      type="text"
                      value={formData.quantityNeeded}
                      onChange={handleChange}
                      className="bg-white border-2 border-black text-black rounded-none focus:ring-0 focus:border-black"
                      placeholder="e.g., 10 units, 50-100 units, etc."
                    />
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                      TIMELINE *
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      required
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border-2 border-black text-black focus:outline-none focus:border-black rounded-none"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediate (0-3 months)</option>
                      <option value="near-term">Near term (3-6 months)</option>
                      <option value="mid-term">Mid term (6-12 months)</option>
                      <option value="long-term">Long term (1-2 years)</option>
                      <option value="planning">Planning phase (2+ years)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="budgetRange" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                    BUDGET RANGE *
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    required
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border-2 border-black text-black focus:outline-none focus:border-black rounded-none"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-100k">Under $100K</option>
                    <option value="100k-500k">$100K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m-5m">$1M - $5M</option>
                    <option value="5m-10m">$5M - $10M</option>
                    <option value="over-10m">Over $10M</option>
                    <option value="tbd">To be determined</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="block text-xs font-mono tracking-wider text-gray-600 mb-2">
                    ADDITIONAL INFORMATION
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-white border-2 border-black text-black focus:outline-none focus:border-black rounded-none"
                    placeholder="Any other relevant details about your requirements, constraints, or preferences..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-black">
              <p className="text-xs text-gray-600 mb-4 font-mono">
                All information provided is confidential and will be used solely for market intelligence
                and partnership development purposes.
              </p>
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 rounded-none border-2 border-black font-mono text-xs tracking-wider transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[-4px_-4px_0px_0px_rgba(0,0,0,1)]"
                size="lg"
              >
                SUBMIT DEMAND SIGNAL
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
