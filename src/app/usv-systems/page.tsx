"use client";

import Link from "next/link";
import { useState } from "react";
import { ContentFeedbackWidget } from "@/components/content-feedback-widget";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SystemComponent {
  name: string;
  description: string;
  keyCapabilities: string[];
  typicalSuppliers: string[];
}

const systemComponents: SystemComponent[] = [
  {
    name: "Hull & Platform",
    description: "The physical structure that provides buoyancy, stability, and mounting points for all other systems. Design varies significantly based on mission profile and operating environment.",
    keyCapabilities: [
      "Hydrodynamic efficiency for speed and endurance",
      "Structural integrity for payload and rough seas",
      "Modular design for different mission configurations",
      "Corrosion resistance for saltwater operation"
    ],
    typicalSuppliers: ["Metal Shark", "Safe Boats", "Vigor Industrial", "Austal USA"]
  },
  {
    name: "Electric Propulsion System",
    description: "Motors, drives, and thrusters that convert electrical energy into motion. Electric propulsion offers efficiency, reliability, and reduced acoustic signature compared to combustion engines.",
    keyCapabilities: [
      "High power density motors (kW per kg)",
      "Variable speed control and precise maneuvering",
      "Redundant thruster configurations",
      "Waterproof and saltwater-resistant housings"
    ],
    typicalSuppliers: ["H3X", "Torqeedo", "Thrustmaster", "Rolls-Royce"]
  },
  {
    name: "Energy Storage & Power Management",
    description: "Batteries, power distribution, and management systems that provide energy for propulsion, sensors, communications, and mission payloads.",
    keyCapabilities: [
      "High energy density (Wh per kg) for extended range",
      "Fast charging and long cycle life",
      "Thermal management in harsh environments",
      "Smart battery management systems (BMS)"
    ],
    typicalSuppliers: ["OSK", "Saft", "EnerSys", "XALT Energy"]
  },
  {
    name: "Autonomous Navigation System",
    description: "Software and hardware that enable the USV to plan routes, avoid obstacles, and navigate safely without human intervention.",
    keyCapabilities: [
      "GPS/GNSS positioning with RTK accuracy",
      "Sensor fusion (radar, lidar, cameras, AIS)",
      "Collision avoidance and path planning",
      "Compliance with maritime navigation rules (COLREGs)"
    ],
    typicalSuppliers: ["Sea Machines", "ASV Global", "Kongsberg", "L3Harris"]
  },
  {
    name: "Communication Systems",
    description: "Radio, satellite, and data link systems that enable command and control, telemetry, and coordination with other assets.",
    keyCapabilities: [
      "Long-range radio (VHF/UHF) and satellite links",
      "Encrypted communications for secure operations",
      "Mesh networking for multi-vehicle coordination",
      "Real-time video and data transmission"
    ],
    typicalSuppliers: ["L3Harris", "Collins Aerospace", "Persistent Systems", "Silvus"]
  },
  {
    name: "Sensor Suite",
    description: "Cameras, radar, lidar, sonar, and other sensors that provide situational awareness, navigation data, and mission intelligence.",
    keyCapabilities: [
      "EO/IR cameras for day/night observation",
      "Surface search radar for detection and tracking",
      "Acoustic sensors for underwater threats",
      "Weather and environmental sensors"
    ],
    typicalSuppliers: ["FLIR (Teledyne)", "Raytheon", "Kongsberg", "EdgeTech"]
  },
  {
    name: "Mission Payload Integration",
    description: "Modular mounting systems and interfaces that allow USVs to carry different payloads for various missions (ISR, mine countermeasures, etc.).",
    keyCapabilities: [
      "Standardized payload interfaces (mechanical, electrical, data)",
      "Quick-change payload configurations",
      "Power and cooling for high-demand payloads",
      "Payload control and data integration"
    ],
    typicalSuppliers: ["Textron Systems", "General Dynamics", "Huntington Ingalls"]
  },
  {
    name: "Control Software & AI",
    description: "The brains of the operation—software that processes sensor data, makes decisions, and coordinates all subsystems.",
    keyCapabilities: [
      "Autonomy levels 1-5 (human-supervised to fully autonomous)",
      "Machine learning for object recognition and classification",
      "Mission planning and re-planning",
      "Fault detection and system health monitoring"
    ],
    typicalSuppliers: ["Shield AI", "Anduril", "Sea Machines", "Auriga"]
  },
  {
    name: "Cybersecurity Systems",
    description: "Hardware and software protections against cyber threats, ensuring secure operations and data integrity.",
    keyCapabilities: [
      "Encrypted data storage and communications",
      "Intrusion detection and prevention",
      "Secure boot and firmware validation",
      "Zero-trust architecture for network access"
    ],
    typicalSuppliers: ["Shift5", "CACI", "Raytheon", "Northrop Grumman"]
  }
];

function ComponentCard({ component }: { component: SystemComponent }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="border-2 border-black bg-white p-6 hover:bg-gray-50 transition-colors text-left">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold tracking-tight">{component.name}</h3>
            <span className="text-black text-2xl font-bold ml-4 font-mono flex-shrink-0">
              {isOpen ? "−" : "+"}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{component.description}</p>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-x-2 border-b-2 border-black bg-gray-50 p-6 -mt-[2px]">
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-mono tracking-wider text-gray-600 mb-3">KEY CAPABILITIES</h4>
              <ul className="space-y-2">
                {component.keyCapabilities.map((capability, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-gray-800">
                    <span className="font-mono text-black">•</span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono tracking-wider text-gray-600 mb-3">TYPICAL SUPPLIERS</h4>
              <div className="flex flex-wrap gap-2">
                {component.typicalSuppliers.map((supplier, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white border-2 border-black text-xs font-mono tracking-wider"
                  >
                    {supplier}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function USVSystems() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Grid background pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/markets" className="font-mono text-xs tracking-wider text-gray-600 hover:text-black transition-colors">
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
                <Link href="/usv-market" className="text-gray-600 hover:text-black transition-colors">
                  MARKET LANDSCAPE
                </Link>
                <Link href="/usv-systems" className="text-black font-bold transition-colors">
                  SYSTEM ARCHITECTURE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12 border-2 border-black bg-white p-8">
          <div className="border-b-2 border-black pb-4 mb-4">
            <span className="text-xs font-mono tracking-wider text-gray-600">TECHNICAL PUBLICATION</span>
            <h1 className="text-4xl font-bold tracking-tight mt-2">
              USV SYSTEM ARCHITECTURE BREAKDOWN
            </h1>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            A comprehensive guide to the major subsystems that comprise modern unmanned surface vehicles,
            from hull design to autonomous software. Understanding these components is essential for
            systems integrators, suppliers, and defense planners.
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-8 border-2 border-black bg-white p-8">
          <div className="border-l-4 border-black pl-4 mb-6">
            <h2 className="text-2xl font-bold tracking-tight">System Architecture Overview</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Modern USVs are complex systems-of-systems, integrating mechanical, electrical, and software
              components into a cohesive platform capable of autonomous operation. The architecture must
              balance performance, reliability, modularity, and cost.
            </p>
            <p>
              Unlike traditional manned vessels, USVs must operate without direct human oversight for
              extended periods. This requires robust autonomy, redundant systems, and sophisticated
              failure handling. Additionally, USVs often need to support multiple mission types through
              modular payload integration.
            </p>
            <p>
              Below, we break down the nine major subsystems that define USV capabilities. Click each
              component to explore key capabilities and typical suppliers in the American defense
              industrial base.
            </p>
          </div>
        </div>

        {/* System Components */}
        <div className="space-y-4 mb-12">
          {systemComponents.map((component, idx) => (
            <ComponentCard key={idx} component={component} />
          ))}
        </div>

        {/* Integration Challenges */}
        <div className="border-2 border-black bg-white p-8">
          <div className="border-l-4 border-black pl-4 mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Integration Challenges</h2>
            <span className="text-xs font-mono text-gray-600 tracking-wider">SYSTEM-LEVEL CONSIDERATIONS</span>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2 tracking-tight">Power Budgets</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Balancing energy consumption across propulsion, sensors, communications, and payloads is
                critical. Mission endurance depends on efficient power management and battery capacity.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 tracking-tight">Data Architecture</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Integrating data streams from multiple sensors requires standardized interfaces,
                synchronized timestamps, and sufficient bandwidth for real-time processing.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 tracking-tight">Environmental Hardening</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Saltwater, UV exposure, shock, and vibration place extreme demands on components. Mil-spec
                or marine-grade components are essential for reliability.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 tracking-tight">Supply Chain Security</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Defense applications require trusted, non-adversarial supply chains. Identifying and
                qualifying American-made components is a strategic imperative.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Validation Widget */}
      <ContentFeedbackWidget contentType="usv-systems-schematic" />
    </div>
  );
}
