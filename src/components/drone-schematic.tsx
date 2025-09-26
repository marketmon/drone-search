"use client";

import { useState } from "react";
import { droneSystems } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ClickableRegion {
  systemId: string;
  path: string;
  name: string;
}

const clickableRegions: ClickableRegion[] = [
  {
    systemId: "flight-controller",
    path: "M290,185 L350,185 L350,215 L290,215 Z",
    name: "Flight Controller"
  },
  {
    systemId: "frame",
    path: "M200,120 L440,120 L440,280 L200,280 Z M270,170 L370,170 L370,230 L270,230 Z M150,50 L190,90 M190,90 L270,170 M370,170 L450,90 M450,90 L490,50 M150,350 L190,310 M190,310 L270,230 M370,230 L450,310 M450,310 L490,350",
    name: "Frame & Structure"
  },
  {
    systemId: "propulsion",
    path: "M170,70 C170,55 180,40 200,40 C220,40 230,55 230,70 C230,85 220,100 200,100 C180,100 170,85 170,70 Z M410,70 C410,55 420,40 440,40 C460,40 470,55 470,70 C470,85 460,100 440,100 C420,100 410,85 410,70 Z M170,330 C170,315 180,300 200,300 C220,300 230,315 230,330 C230,345 220,360 200,360 C180,360 170,345 170,330 Z M410,330 C410,315 420,300 440,300 C460,300 470,315 470,330 C470,345 460,360 440,360 C420,360 410,345 410,330 Z",
    name: "Propulsion Systems"
  },
  {
    systemId: "imaging-comms",
    path: "M305,110 L335,110 L335,165 L305,165 Z M315,95 L325,95 L325,110 L315,110 Z",
    name: "Camera & Imaging"
  },
  {
    systemId: "control-systems",
    path: "M265,170 L275,170 L275,185 L265,185 Z M365,170 L375,170 L375,185 L365,185 Z M265,215 L275,215 L275,230 L265,230 Z M365,215 L375,215 L375,230 L365,230 Z",
    name: "Control & Telemetry"
  },
  {
    systemId: "power-systems",
    path: "M295,235 L345,235 L345,275 L295,275 Z",
    name: "Power & Battery"
  },
  {
    systemId: "navigation-sensors",
    path: "M312,140 L328,140 L328,156 L312,156 Z M310,125 C310,120 315,115 320,115 C325,115 330,120 330,125 C330,130 325,135 320,135 C315,135 310,130 310,125 Z",
    name: "GPS & Sensors"
  }
];

export function DroneSchematic() {
  const [hoveredSystem, setHoveredSystem] = useState<string | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getSystemInfo = (systemId: string) => {
    return droneSystems.find(system => system.id === systemId);
  };

  const handleRegionClick = (systemId: string) => {
    setSelectedSystem(systemId);
    setDialogOpen(true);
  };

  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Components
          </h2>
          <p className="text-lg text-gray-300">
            Click on different parts of the drone to view available systems
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* SVG Drone Schematic */}
            <svg
              viewBox="0 0 640 400"
              className="w-full h-auto"
              style={{ maxHeight: "500px" }}
            >
              {/* Main frame structure */}
              <g fill="none" stroke="white" strokeWidth="2">
                {/* Center body */}
                <rect x="280" y="180" width="80" height="40" fill="white" />

                {/* Arms */}
                <line x1="200" y1="100" x2="280" y2="180" strokeWidth="4" />
                <line x1="360" y1="180" x2="440" y2="100" strokeWidth="4" />
                <line x1="200" y1="300" x2="280" y2="220" strokeWidth="4" />
                <line x1="360" y1="220" x2="440" y2="300" strokeWidth="4" />
              </g>

              {/* Motors */}
              <rect x="190" y="90" width="20" height="20" fill="white" stroke="white" strokeWidth="2" />
              <rect x="430" y="90" width="20" height="20" fill="white" stroke="white" strokeWidth="2" />
              <rect x="190" y="290" width="20" height="20" fill="white" stroke="white" strokeWidth="2" />
              <rect x="430" y="290" width="20" height="20" fill="white" stroke="white" strokeWidth="2" />

              {/* Propellers */}
              <line x1="175" y1="100" x2="225" y2="100" stroke="white" strokeWidth="2" />
              <line x1="200" y1="75" x2="200" y2="125" stroke="white" strokeWidth="2" />
              <line x1="415" y1="100" x2="465" y2="100" stroke="white" strokeWidth="2" />
              <line x1="440" y1="75" x2="440" y2="125" stroke="white" strokeWidth="2" />
              <line x1="175" y1="300" x2="225" y2="300" stroke="white" strokeWidth="2" />
              <line x1="200" y1="275" x2="200" y2="325" stroke="white" strokeWidth="2" />
              <line x1="415" y1="300" x2="465" y2="300" stroke="white" strokeWidth="2" />
              <line x1="440" y1="275" x2="440" y2="325" stroke="white" strokeWidth="2" />

              {/* Flight Controller */}
              <rect x="295" y="190" width="50" height="20" fill="black" stroke="white" strokeWidth="2" />

              {/* Camera */}
              <rect x="310" y="125" width="20" height="35" fill="black" stroke="white" strokeWidth="2" />

              {/* Battery */}
              <rect x="295" y="235" width="50" height="25" fill="black" stroke="white" strokeWidth="2" />

              {/* GPS */}
              <rect x="315" y="145" width="10" height="10" fill="white" stroke="white" strokeWidth="1" />

              {/* Antennas */}
              <rect x="270" y="175" width="6" height="15" fill="white" stroke="white" strokeWidth="1" />
              <rect x="364" y="175" width="6" height="15" fill="white" stroke="white" strokeWidth="1" />
              <rect x="270" y="210" width="6" height="15" fill="white" stroke="white" strokeWidth="1" />
              <rect x="364" y="210" width="6" height="15" fill="white" stroke="white" strokeWidth="1" />

              {/* Component labels */}
              <text x="320" y="185" textAnchor="middle" fill="white" fontSize="10" fontWeight="normal">Flight Controller</text>
              <text x="320" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="normal">Camera</text>
              <text x="320" y="285" textAnchor="middle" fill="white" fontSize="10" fontWeight="normal">Battery</text>
              <text x="200" y="85" textAnchor="middle" fill="white" fontSize="8">Motor</text>
              <text x="440" y="85" textAnchor="middle" fill="white" fontSize="8">Motor</text>
              <text x="200" y="340" textAnchor="middle" fill="white" fontSize="8">Motor</text>
              <text x="440" y="340" textAnchor="middle" fill="white" fontSize="8">Motor</text>

              {/* Clickable regions */}
              {clickableRegions.map((region) => (
                <path
                  key={region.systemId}
                  d={region.path}
                  fill={
                    selectedSystem === region.systemId
                      ? "rgba(59, 130, 246, 0.5)"
                      : hoveredSystem === region.systemId
                      ? "rgba(59, 130, 246, 0.3)"
                      : "transparent"
                  }
                  stroke={
                    selectedSystem === region.systemId || hoveredSystem === region.systemId
                      ? "#3b82f6"
                      : "transparent"
                  }
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredSystem(region.systemId)}
                  onMouseLeave={() => setHoveredSystem(null)}
                  onClick={() => handleRegionClick(region.systemId)}
                />
              ))}
            </svg>

            {/* Hover tooltip */}
            {hoveredSystem && (
              <div className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-2 rounded-md text-sm pointer-events-none">
                {clickableRegions.find(r => r.systemId === hoveredSystem)?.name}
              </div>
            )}
          </div>

        </div>

        {/* Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-black border-gray-800 text-white">
            {selectedSystem && (() => {
              const systemInfo = getSystemInfo(selectedSystem);
              return systemInfo ? (
                <div>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">
                      {systemInfo.name}
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 text-base">
                      {systemInfo.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-6">
                    <a
                      href={systemInfo.id === 'propulsion' ? '/systems/propulsion' : '#'}
                      className="bg-white text-black px-6 py-3 hover:bg-gray-200 transition-colors font-medium inline-block"
                      onClick={() => setDialogOpen(false)}
                    >
                      View {systemInfo.name} Products →
                    </a>
                  </div>
                </div>
              ) : null;
            })()}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}