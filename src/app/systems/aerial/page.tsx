"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSystemsByDomain, getSubsystemsBySystem, getProductsBySystem } from "@/lib/data";
import { Plane, ChevronRight } from "lucide-react";

export default function AerialSystemsPage() {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const aerialSystems = getSystemsByDomain('aerial');

  const handleSystemClick = (systemId: string) => {
    setSelectedSystem(selectedSystem === systemId ? null : systemId);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Plane className="h-16 w-16 text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Aerial Systems
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Comprehensive breakdown of unmanned aerial vehicle systems across FPV, multi-rotor, fixed-wing, and VTOL platforms
          </p>
          <div className="flex justify-center">
            <Badge variant="outline" className="text-blue-400 border-blue-400 px-4 py-2">
              {aerialSystems.length} System Categories
            </Badge>
          </div>
        </div>
      </section>

      {/* Interactive Systems Breakdown */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Interactive Systems Breakdown
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Click on any system below to explore subsystems and available components
            </p>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-3 h-3 bg-blue-500 rounded pulse"></div>
                <span>Click to expand system details</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aerialSystems.map((system) => {
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
                          <Plane className="h-6 w-6 text-blue-400" />
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
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`h-5 w-5 transition-transform duration-300 ${
                        isSelected ? 'rotate-90 text-blue-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <CardDescription className="text-gray-300">
                      {system.description}
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

                        <div className="border-t border-gray-700 pt-4">
                          <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-3">
                            Featured Products
                          </h4>
                          <div className="space-y-2">
                            {products.slice(0, 3).map((product) => (
                              <div key={product.id} className="flex items-center justify-between p-2 rounded bg-gray-800">
                                <div>
                                  <span className="text-sm text-white">{product.name}</span>
                                  <p className="text-xs text-gray-400">{product.price}</p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {product.availability}
                                </Badge>
                              </div>
                            ))}
                            {products.length > 3 && (
                              <div className="text-xs text-gray-400 text-center py-2">
                                +{products.length - 3} more products
                              </div>
                            )}
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

      {/* Vehicle Type Categories */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Aerial Vehicle Categories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Different aerial platforms optimized for specific mission requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['FPV', 'Multi-rotor', 'Fixed Wing', 'VTOL'].map((vehicleType) => {
              const systemsOfType = aerialSystems.filter(system => system.vehicleType === vehicleType);
              const totalProducts = systemsOfType.reduce((acc, system) =>
                acc + getProductsBySystem(system.id).length, 0
              );

              return (
                <Card key={vehicleType} className="bg-gray-800 border-gray-700 hover:border-blue-400 transition-colors">
                  <CardHeader className="text-center">
                    <Plane className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                    <CardTitle className="text-white">{vehicleType}</CardTitle>
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      {systemsOfType.length} Systems
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-sm text-gray-300 mb-4">
                        {totalProducts} total products available across {systemsOfType.length} system categories
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Explore {vehicleType} Systems
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}