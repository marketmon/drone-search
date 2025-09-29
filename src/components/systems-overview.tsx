'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemoButton } from "@/components/ui/demo-button";
import { unmannedSystems, getSubsystemsBySystem, getProductsBySystem, getSystemsByDomain } from "@/lib/data";
import { ChevronRight, Plane, Ship } from "lucide-react";
import { useState } from "react";

export function SystemsOverview() {
  const [selectedDomain, setSelectedDomain] = useState<'aerial' | 'marine' | 'all'>('all');

  const getFilteredSystems = () => {
    if (selectedDomain === 'all') return unmannedSystems;
    return getSystemsByDomain(selectedDomain);
  };

  const getDomainIcon = (domain: string) => {
    return domain === 'aerial' ? <Plane className="h-5 w-5" /> : <Ship className="h-5 w-5" />;
  };

  const systems = getFilteredSystems();

  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Unmanned System Categories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore our comprehensive catalog of NDAA-compliant components for aerial and marine unmanned systems
          </p>

          {/* Domain Filter Tabs */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant={selectedDomain === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedDomain('all')}
              className="flex items-center space-x-2"
            >
              <span>All Systems</span>
            </Button>
            <Button
              variant={selectedDomain === 'aerial' ? 'default' : 'outline'}
              onClick={() => setSelectedDomain('aerial')}
              className="flex items-center space-x-2"
            >
              <Plane className="h-4 w-4" />
              <span>Aerial</span>
            </Button>
            <Button
              variant={selectedDomain === 'marine' ? 'default' : 'outline'}
              onClick={() => setSelectedDomain('marine')}
              className="flex items-center space-x-2"
            >
              <Ship className="h-4 w-4" />
              <span>Marine</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system) => {
            const subsystems = getSubsystemsBySystem(system.id);
            const products = getProductsBySystem(system.id);

            return (
              <Card key={system.id} className="bg-gray-900 border-gray-700 hover:border-green-400 transition-colors group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col items-center space-y-1">
                        {getDomainIcon(system.domain)}
                        <span className="text-2xl">{system.icon}</span>
                      </div>
                      <div>
                        <CardTitle className="text-white group-hover:text-green-400 transition-colors">
                          {system.name}
                        </CardTitle>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                            {products.length} Products
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {system.vehicleType}
                          </Badge>
                          {'vehicleCategory' in system && (
                            <Badge variant="secondary" className="text-xs">
                              {system.vehicleCategory}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                  </div>
                  <CardDescription className="text-gray-300">
                    {system.description}
                    {'hullLengthRange' in system && system.hullLengthRange && (
                      <div className="text-xs text-gray-400 mt-1">
                        Hull Length: {system.hullLengthRange.min}-{system.hullLengthRange.max} {system.hullLengthRange.unit}
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                      Subsystems ({subsystems.length})
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {subsystems.slice(0, 3).map((subsystem) => (
                        <div
                          key={subsystem.id}
                          className="flex items-center justify-between p-2 rounded border border-gray-700 hover:border-gray-600 transition-colors"
                        >
                          <span className="text-sm text-white">{subsystem.name}</span>
                          <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                            {getProductsBySystem(system.id).filter(p => p.subsystemId === subsystem.id).length}
                          </Badge>
                        </div>
                      ))}
                      {subsystems.length > 3 && (
                        <div className="text-xs text-gray-400 text-center py-1">
                          +{subsystems.length - 3} more subsystems
                        </div>
                      )}
                    </div>
                  </div>

                  <DemoButton
                    variant="outline"
                    className="w-full"
                  >
                    Explore {system.name}
                  </DemoButton>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}