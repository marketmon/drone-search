"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSystemsByDomain, getSubsystemsBySystem, getProductsBySystem, MarineSystem } from "@/lib/data";
import { Ship, Waves, ChevronRight, Anchor } from "lucide-react";

export default function MarineSystemsPage() {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const marineSystems = getSystemsByDomain('marine') as MarineSystem[];

  const handleSystemClick = (systemId: string) => {
    setSelectedSystem(selectedSystem === systemId ? null : systemId);
  };

  const surfaceSystems = marineSystems.filter(system => system.vehicleCategory === 'surface');
  const underseaSystems = marineSystems.filter(system => system.vehicleCategory === 'undersea');

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Ship className="h-16 w-16 text-cyan-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Marine Systems
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Comprehensive breakdown of unmanned marine vehicle systems for surface vessels (USV) and undersea vehicles (UUV)
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="text-cyan-400 border-cyan-400 px-4 py-2">
              {surfaceSystems.length} Surface Systems
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400 px-4 py-2">
              {underseaSystems.length} Undersea Systems
            </Badge>
          </div>
        </div>
      </section>

      {/* Surface Systems */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <Waves className="h-10 w-10 text-cyan-400" />
              <h2 className="text-4xl font-bold text-white">
                Surface Systems (USV)
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Unmanned Surface Vehicles - Click on any system below to explore subsystems and components
            </p>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-3 h-3 bg-cyan-500 rounded pulse"></div>
                <span>Click to expand system details</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {surfaceSystems.map((system) => {
              const subsystems = getSubsystemsBySystem(system.id);
              const products = getProductsBySystem(system.id);
              const isSelected = selectedSystem === system.id;

              return (
                <Card
                  key={system.id}
                  className={`transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    isSelected
                      ? 'bg-cyan-900 border-cyan-500 shadow-lg shadow-cyan-500/25'
                      : 'bg-gray-900 border-gray-700 hover:border-cyan-400'
                  }`}
                  onClick={() => handleSystemClick(system.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex flex-col items-center space-y-1">
                          <Ship className="h-6 w-6 text-cyan-400" />
                          <span className="text-2xl">{system.icon}</span>
                        </div>
                        <div>
                          <CardTitle className={`transition-colors ${
                            isSelected ? 'text-cyan-300' : 'text-white group-hover:text-cyan-400'
                          }`}>
                            {system.name}
                          </CardTitle>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                              {products.length} Products
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {system.vehicleType}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {system.vehicleCategory}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`h-5 w-5 transition-transform duration-300 ${
                        isSelected ? 'rotate-90 text-cyan-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <CardDescription className="text-gray-300">
                      {system.description}
                      {system.hullLengthRange && (
                        <div className="text-xs text-cyan-400 mt-2 font-medium">
                          Hull Length: {system.hullLengthRange.min}-{system.hullLengthRange.max} {system.hullLengthRange.unit}
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>

                  {isSelected && (
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="border-t border-gray-700 pt-4">
                          <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">
                            Subsystems ({subsystems.length})
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {subsystems.map((subsystem) => {
                              const subsystemProducts = products.filter(p => p.subsystemId === subsystem.id);
                              return (
                                <div
                                  key={subsystem.id}
                                  className="flex items-center justify-between p-3 rounded border border-gray-600 hover:border-cyan-500 transition-colors bg-gray-800"
                                >
                                  <div>
                                    <span className="text-sm text-white font-medium">{subsystem.name}</span>
                                    <p className="text-xs text-gray-400 mt-1">{subsystem.description}</p>
                                  </div>
                                  <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                                    {subsystemProducts.length}
                                  </Badge>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:border-cyan-600 hover:text-white transition-colors"
                        >
                          View All {system.name} Products →
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Undersea Systems */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <Anchor className="h-10 w-10 text-blue-400" />
              <h2 className="text-4xl font-bold text-white">
                Undersea Systems (UUV)
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Unmanned Undersea Vehicles - Click on any system below to explore subsystems and components
            </p>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-3 h-3 bg-blue-500 rounded pulse"></div>
                <span>Click to expand system details</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {underseaSystems.map((system) => {
              const subsystems = getSubsystemsBySystem(system.id);
              const products = getProductsBySystem(system.id);
              const isSelected = selectedSystem === system.id;

              return (
                <Card
                  key={system.id}
                  className={`transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    isSelected
                      ? 'bg-blue-900 border-blue-500 shadow-lg shadow-blue-500/25'
                      : 'bg-gray-900 border-gray-700 hover:border-blue-400'
                  }`}
                  onClick={() => handleSystemClick(system.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex flex-col items-center space-y-1">
                          <Anchor className="h-6 w-6 text-blue-400" />
                          <span className="text-2xl">{system.icon}</span>
                        </div>
                        <div>
                          <CardTitle className={`transition-colors ${
                            isSelected ? 'text-blue-300' : 'text-white group-hover:text-blue-400'
                          }`}>
                            {system.name}
                          </CardTitle>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                              {products.length} Products
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {system.vehicleType}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {system.vehicleCategory}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`h-5 w-5 transition-transform duration-300 ${
                        isSelected ? 'rotate-90 text-blue-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <CardDescription className="text-gray-300">
                      {system.description}
                      {system.hullLengthRange && (
                        <div className="text-xs text-blue-400 mt-2 font-medium">
                          Hull Length: {system.hullLengthRange.min}-{system.hullLengthRange.max} {system.hullLengthRange.unit}
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>

                  {isSelected && (
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="border-t border-gray-700 pt-4">
                          <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-3">
                            Subsystems ({subsystems.length})
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {subsystems.map((subsystem) => {
                              const subsystemProducts = products.filter(p => p.subsystemId === subsystem.id);
                              return (
                                <div
                                  key={subsystem.id}
                                  className="flex items-center justify-between p-3 rounded border border-gray-600 hover:border-blue-500 transition-colors bg-gray-800"
                                >
                                  <div>
                                    <span className="text-sm text-white font-medium">{subsystem.name}</span>
                                    <p className="text-xs text-gray-400 mt-1">{subsystem.description}</p>
                                  </div>
                                  <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                                    {subsystemProducts.length}
                                  </Badge>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full border-blue-600 text-blue-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
                        >
                          View All {system.name} Products →
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Marine Vehicle Specifications */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Marine Vehicle Specifications
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Different marine platforms optimized for specific operational environments and mission requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Surface Vehicles */}
            <Card className="bg-gray-900 border-cyan-500">
              <CardHeader className="text-center">
                <Ship className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
                <CardTitle className="text-white text-2xl">Surface Vehicles (USV)</CardTitle>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  Hull Length: 1-50 meters
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Operational Environment</h4>
                    <p className="text-gray-300 text-sm">Surface operations, coastal patrol, cargo transport, surveillance</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Key Systems</h4>
                    <div className="flex flex-wrap gap-2">
                      {surfaceSystems.map((system) => (
                        <Badge key={system.id} variant="secondary" className="text-xs">
                          {system.name.replace('Surface ', '')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-cyan-600 text-cyan-400 hover:bg-cyan-600">
                    Explore Surface Systems
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Undersea Vehicles */}
            <Card className="bg-gray-900 border-blue-500">
              <CardHeader className="text-center">
                <Anchor className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white text-2xl">Undersea Vehicles (UUV)</CardTitle>
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  Hull Length: 0.5-30 meters
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Operational Environment</h4>
                    <p className="text-gray-300 text-sm">Underwater operations, deep-sea exploration, submarine reconnaissance</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Key Systems</h4>
                    <div className="flex flex-wrap gap-2">
                      {underseaSystems.map((system) => (
                        <Badge key={system.id} variant="secondary" className="text-xs">
                          {system.name.replace('Undersea ', '')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-blue-600 text-blue-400 hover:bg-blue-600">
                    Explore Undersea Systems
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}