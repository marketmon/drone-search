import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { companies } from "@/lib/data";
import { AlertTriangle, X, Shield } from "lucide-react";

export function RestrictedSuppliers() {
  const restrictedCompanies = companies.filter(company => !company.ndaaCompliant);
  const compliantCompanies = companies.filter(company => company.ndaaCompliant);

  return (
    <section className="py-16 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Supply Chain Transparency
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Clear identification of compliant and restricted suppliers for informed procurement decisions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* NDAA Compliant Suppliers */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-8 w-8 text-green-400" />
              <h3 className="text-2xl font-serif font-bold text-white">
                NDAA Compliant Suppliers
              </h3>
              <Badge variant="outline" className="text-green-400 border-green-400">
                {compliantCompanies.length} Verified
              </Badge>
            </div>
            
            <div className="space-y-4">
              {compliantCompanies.slice(0, 4).map((company) => (
                <Card key={company.id} className="bg-gray-800 border-green-700 hover:border-green-500 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{company.name}</h4>
                        <p className="text-sm text-gray-400">{company.location}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          {company.certifications.includes("US Final Assembly") && (
                            <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                              US Assembly
                            </Badge>
                          )}
                          {company.certifications.includes("Open Source") && (
                            <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                              Open Source
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Shield className="h-6 w-6 text-green-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Restricted Suppliers */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-red-400" />
              <h3 className="text-2xl font-serif font-bold text-white">
                Restricted Suppliers
              </h3>
              <Badge variant="destructive" className="bg-red-900 text-red-300">
                Limited/No Compliance
              </Badge>
            </div>
            
            <Alert className="mb-6 border-red-700 bg-red-950">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">
                These suppliers may not meet NDAA Section 848 requirements for government procurement. 
                Use for commercial applications only or verify specific compliance status.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              {restrictedCompanies.map((company) => (
                <Card key={company.id} className="bg-gray-800 border-red-700 hover:border-red-500 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{company.name}</h4>
                        <p className="text-sm text-gray-400">{company.location}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="destructive" className="bg-red-900 text-red-300 text-xs">
                            Restricted
                          </Badge>
                          <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                            Commercial Only
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          High-quality products available for commercial/civilian use
                        </p>
                      </div>
                      <X className="h-6 w-6 text-red-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gray-800 border-gray-700 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Supply Chain Strategy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">Component Sourcing</h4>
                  <p>Taiwan/Asia manufacturing with disclosed origins and quality verification</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">US Integration</h4>
                  <p>Final assembly, testing, and quality assurance in US defense contractor facilities</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-2">Open Source Security</h4>
                  <p>Auditable firmware (Betaflight, ArduPilot) eliminates black-box security concerns</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}