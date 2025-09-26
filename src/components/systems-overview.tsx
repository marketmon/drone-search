import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { droneSystems, getSubsystemsBySystem, getProductsBySystem } from "@/lib/data";
import { ChevronRight } from "lucide-react";

export function SystemsOverview() {
  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Drone System Categories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive catalog of NDAA-compliant drone components organized by system type
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {droneSystems.map((system) => {
            const subsystems = getSubsystemsBySystem(system.id);
            const products = getProductsBySystem(system.id);
            
            return (
              <Card key={system.id} className="bg-gray-900 border-gray-700 hover:border-green-400 transition-colors group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{system.icon}</span>
                      <div>
                        <CardTitle className="text-white group-hover:text-green-400 transition-colors">
                          {system.name}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs text-gray-400 border-gray-600 mt-1">
                          {products.length} Products
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                  </div>
                  <CardDescription className="text-gray-300">
                    {system.description}
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
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-white hover:bg-green-600 hover:border-green-600 hover:text-white transition-colors"
                  >
                    Explore {system.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}